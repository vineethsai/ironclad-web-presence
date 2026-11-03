/**
 * refreshCitations.ts — regenerate src/data/citations.json from free sources (no API key needed).
 *
 *   npx tsx scripts/refreshCitations.ts
 *
 * What it does (safe to re-run, e.g. from a monthly GitHub Action):
 *   1. Google Scholar: one fetch of the public profile page to refresh per-paper citation counts in
 *      `publications`. If Scholar blocks the request (CAPTCHA/429), the existing counts are kept.
 *   2. OpenAlex (https://api.openalex.org): finds Vineeth's works (ORCID, author search, raw author
 *      name, arXiv versions), fetches every work that cites them, and looks up institution geo.
 *   3. Merges, never regresses: every existing `citingPapers` entry is kept (the Google Scholar /
 *      CitationMap set); OpenAlex only fills gaps (venue, year, link, counts, affiliations) and adds
 *      new citing papers, deduped by DOI / arXiv id / title. Co-authored "self" citations are kept,
 *      but Narajala is removed from their author lists (same as scripts/merge_all_data.py).
 *   4. Recomputes tier/scores, `locations` and `stats` the same way merge_all_data.py did.
 *      `locations` = the frozen CitationMap export (scripts/citation_info.csv — keep it) plus
 *      OpenAlex institution geo for papers that export doesn't place.
 * The `scholar` totals block is left untouched. If OpenAlex fails or validation (no NaN, valid
 * coordinates, no duplicate/dropped citing papers) fails, nothing is written.
 *
 * Optional env: OPENALEX_MAILTO (polite pool), OPENALEX_API_KEY (bigger daily budget; anonymous use is ~$0.003 of the free $0.10/day),
 * SCHOLAR_HTML=<saved profile page> to parse a saved Scholar page instead of fetching it.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { CitationData, CitationLocation, CitationStats, CitingPaper, Publication } from '../src/types/citations.ts';

const OUT = fileURLToPath(new URL('../src/data/citations.json', import.meta.url));
const CSV = fileURLToPath(new URL('./citation_info.csv', import.meta.url));
// Optional: set OPENALEX_MAILTO to join OpenAlex's "polite pool" (faster, more reliable responses).
const MAILTO = process.env.OPENALEX_MAILTO;
const ORCID = '0009-0007-4553-9930';
const SCHOLAR_ID = 'hIVoKbIAAAAJ';
const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

// ---- Classification rules, ported from scripts/merge_all_data.py (the pipeline behind the current data) ----
const SELF_NAMES = ['vineeth sai', 'vs narajala', 'v. s. narajala', 'narajala, v', 'v s narajala', 'vineeth narajala',
  'v narajala', 'narajala v', 'narajala vs', 'vineeth s', 'v. narajala'];
const TIER1 = [/\bieee\b/, /\bacm\b/, /\busenix\b/, /\bndss\b/, /\bccs\b/, /\bs&p\b/, /\binfocom\b/, /\bneurips\b/,
  /\bicml\b/, /\biclr\b/, /\bcvpr\b/, /\baaai\b/, /\bijcai\b/, /\bsosp\b/, /\bosdi\b/, /\bnsdi\b/, /\bsigcomm\b/,
  /\bmobicom\b/, /\bicse\b/, /\bfse\b/, /\bpldi\b/, /\bpopl\b/, /\bsigmod\b/, /\bvldb\b/];
const TIER2 = [/\bspringer\b/, /\belsevier\b/, /\bnature\b/, /\bscience\b/, /\bplos\b/, /\bwiley\b/, /\bmdpi\b/,
  /\bsensors\b/, /\belectronics\b/, /\bjournal of\b/, /\btransactions on\b/, /\binternational journal\b/,
  /\bconference on\b/, /\bsymposium on\b/, /\bworkshop on\b/, /\bproceedings\b/, /\bceur-ws\b/, /\bopenreview\b/,
  /\bpubmed\b/, /\bncbi\b/];
const PREPRINT = [/\barxiv\b/, /\bpreprint\b/, /\bssrn\b/, /\bbiorxiv\b/, /\bmedrxiv\b/, /\bresearchgate\b/,
  /\bresearchsquare\b/, /\bzenodo\b/, /\bosf\.io\b/, /\bdigitalcommons\b/, /\brepository\b/, /\bproquest\b/, /\bthesis\b/];
const VENUE_SCORE: Record<string, number> = { tier1: 50, tier2: 35, preprint: 10, other: 20 };
// Matched on whole words (the Python substring match flagged e.g. "San Francisco" as "cisco").
const PRESTIGIOUS = ['stanford', 'mit(?! art| world peace)', 'massachusetts institute', 'berkeley', 'uc berkeley', 'carnegie mellon', 'cmu',
  'harvard', 'princeton', 'cornell', 'georgia tech', 'purdue', 'oxford', 'cambridge', 'eth zurich', 'tsinghua', 'peking',
  'zhejiang', 'national university of singapore', 'nus', 'kaist', 'google', 'microsoft', 'meta', 'deepmind', 'amazon',
  'nvidia', 'openai', 'anthropic', 'cisco', 'yale', 'columbia', 'ucla', 'caltech', 'nyu', 'johns hopkins', 'duke',
  'ben-gurion', 'ben gurion', 'technion', 'tel aviv', 'tokyo', 'kyoto'].map((p) => new RegExp(`\\b${p}\\b`, 'i'));
const PLACEHOLDER_AFFILIATIONS = ['AI_ML', 'GENAI', 'Security', 'No_author_info', 'No_author_found'];
const EXCLUDED_COUNTRIES = ['Papua New Guinea', 'Mali']; // CitationMap geocoding noise
const COUNTRY_ALIASES: Record<string, string> = {
  USA: 'United States', US: 'United States', 'United States of America': 'United States', UK: 'United Kingdom',
  'Korea, Republic of': 'South Korea', 'Republic of Korea': 'South Korea', Korea: 'South Korea',
  'Russian Federation': 'Russia', Türkiye: 'Turkey', 'Viet Nam': 'Vietnam', 'Iran, Islamic Republic of': 'Iran',
  'Taiwan, Province of China': 'Taiwan', Netherlands: 'The Netherlands', 'Hong Kong': 'China', // match legacy names
};
const DOI_PUBLISHERS: Record<string, string> = {
  '10.1109': 'IEEE', '10.1145': 'ACM', '10.1007': 'Springer', '10.1038': 'Springer', '10.1186': 'Springer',
  '10.1016': 'Elsevier', '10.3390': 'MDPI', '10.1002': 'Wiley', '10.1080': 'Taylor & Francis', '10.2139': 'SSRN',
  '10.48550': 'arXiv', '10.21203': 'Research Square', '10.3389': 'Frontiers', '10.12688': 'F1000Research',
};

const venueTier = (venue: string) => {
  const v = venue.toLowerCase();
  if (!v) return 'other';
  if (PREPRINT.some((re) => re.test(v))) return 'preprint';
  if (TIER1.some((re) => re.test(v))) return 'tier1';
  if (TIER2.some((re) => re.test(v))) return 'tier2';
  return 'other';
};
const isPrestigious = (texts: string[]) => texts.some((t) => PRESTIGIOUS.some((re) => re.test(t)));
const normCountry = (c?: string | null) => (c ? COUNTRY_ALIASES[c.trim()] ?? c.trim() : '') || 'Unknown';

// ---- Title / id helpers ----
const decode = (s: string) =>
  s.replace(/<[^>]+>/g, '').replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d))).replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const normTitle = (t: string) =>
  t.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const tokens = (t: string) => new Set(normTitle(t).split(' ').filter(Boolean));
/** Token overlap / larger set size; `contain` also accepts a ≥5-word title fully contained in the other. */
function similar(a: string, b: string, threshold: number, contain = false) {
  const A = tokens(a), B = tokens(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  const min = Math.min(A.size, B.size);
  return inter / Math.max(A.size, B.size, 1) >= threshold || (contain && min >= 5 && inter === min);
}
const findDoi = (s?: string | null) => s?.match(/10\.\d{4,9}\/[^\s"<>?#]+/)?.[0].toLowerCase().replace(/[.,;)]+$/, '');
const findArxiv = (s?: string | null) => s?.match(/arxiv(?:\.org)?[.:/\s]*(?:abs\/|pdf\/)?(\d{4}\.\d{4,5})/i)?.[1];
const shortId = (id: string) => id.replace('https://openalex.org/', '');
const normAuthor = (a: string) => a.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
/** Run `fn` over `items` with a couple of workers (OpenAlex rate-limits bursts of single-entity lookups). */
async function each<T>(items: T[], fn: (item: T) => Promise<void>, workers = 2) {
  const queue = [...items];
  await Promise.all(Array.from({ length: workers }, async () => {
    for (let item = queue.shift(); item !== undefined; item = queue.shift()) await fn(item);
  }));
}

// ---- OpenAlex ----
interface OAInstitution { id: string; display_name: string }
interface OAAuthorship { author: { id?: string | null; display_name?: string }; raw_author_name?: string; institutions?: OAInstitution[] }
interface OASource { display_name?: string; type?: string; host_organization_name?: string | null }
interface OALocation { landing_page_url?: string | null; source?: OASource | null }
interface OAWork {
  id: string; doi?: string | null; display_name: string; publication_year?: number; type?: string; cited_by_count?: number;
  authorships: OAAuthorship[]; primary_location?: OALocation | null; locations?: OALocation[]; referenced_works?: string[];
}
interface OAGeo { city?: string | null; country?: string | null; latitude?: number | null; longitude?: number | null }
interface Place { latitude: number; longitude: number; city: string; country: string }

let nextSlot = 0; // OpenAlex allows 10 requests/second per IP — stay under it.
async function openAlex<T>(path: string, params: Record<string, string> = {}): Promise<T | null> {
  const url = new URL(path, 'https://api.openalex.org');
  const auth: Record<string, string> = process.env.OPENALEX_API_KEY ? { api_key: process.env.OPENALEX_API_KEY } : {};
  for (const [k, v] of Object.entries({ ...params, ...(MAILTO ? { mailto: MAILTO } : {}), ...auth })) url.searchParams.set(k, v);
  for (let attempt = 0; attempt < 6; attempt++) {
    const slot = Math.max(Date.now(), nextSlot);
    nextSlot = slot + 125;
    await sleep(slot - Date.now());
    const res = await fetch(url, { headers: { 'User-Agent': 'vineethsai.com-citation-refresh' } });
    if (res.ok) return (await res.json()) as T;
    if (res.status === 404) return null;
    const body = await res.text();
    if (res.status !== 429 && res.status < 500) throw new Error(`OpenAlex ${res.status} for ${path}: ${body.slice(0, 200)}`);
    const retryAfter = Number(res.headers.get('retry-after')) || Number(body.match(/"retryAfter":\s*(\d+)/)?.[1]) || 0;
    if (retryAfter > 120) throw new Error(`OpenAlex daily budget exhausted (retry in ${retryAfter}s): ${body.slice(0, 200)}`);
    const wait = Math.max(retryAfter * 1000, 2 ** attempt * 1000);
    console.warn(`  OpenAlex ${res.status}, retrying in ${wait / 1000}s…`);
    await sleep(wait);
  }
  throw new Error(`OpenAlex: giving up on ${path}`);
}

type WorksPage = { results: OAWork[]; meta: { next_cursor: string | null } };
async function listWorks(filter: string, select: string): Promise<OAWork[]> {
  const out: OAWork[] = [];
  for (let cursor: string | null = '*'; cursor; ) {
    const page: WorksPage | null = await openAlex<WorksPage>('/works', {
      filter, select, per_page: '100', cursor, corpus: 'all',
    });
    if (!page?.results.length) break;
    out.push(...page.results);
    cursor = page.meta.next_cursor;
  }
  return out;
}

const workArxivIds = (w: OAWork) =>
  [w.doi, ...(w.locations ?? []).map((l) => l.landing_page_url)].map(findArxiv).filter((x): x is string => !!x);

function workVenue(w: OAWork) {
  const loc = w.primary_location?.source ? w.primary_location : w.locations?.find((l) => l.source) ?? w.primary_location;
  const arxiv = workArxivIds(w)[0];
  const sourceName = loc?.source?.display_name ?? '';
  const isArxiv = /arxiv/i.test(sourceName) || (!sourceName && !!arxiv);
  let label = isArxiv && arxiv ? `arXiv preprint arXiv:${arxiv}` : sourceName;
  if (w.type === 'preprint' && !/arxiv|preprint|ssrn/i.test(label)) label = label ? `${label} (preprint)` : 'Preprint';
  const doi = findDoi(w.doi);
  const host = loc?.source?.host_organization_name ?? '';
  const publisher = (doi && DOI_PUBLISHERS[doi.split('/')[0]]) ||
    (/electrical and electronics/i.test(host) ? 'IEEE' : /computing machinery/i.test(host) ? 'ACM'
      : /springer|nature portfolio/i.test(host) ? 'Springer' : /elsevier|relx/i.test(host) ? 'Elsevier'
      : /multidisciplinary digital/i.test(host) ? 'MDPI' : host);
  if (!label) return publisher;
  return publisher && !label.toLowerCase().includes(publisher.toLowerCase()) ? `${label} - ${publisher}` : label;
}

function workLink(w: OAWork) {
  const doi = findDoi(w.doi);
  if (doi) return `https://doi.org/${doi}`;
  const arxiv = workArxivIds(w)[0];
  if (arxiv) return `https://arxiv.org/abs/${arxiv}`;
  return w.primary_location?.landing_page_url ?? `https://scholar.google.com/scholar?q=${encodeURIComponent(w.display_name)}`;
}

// ---- Google Scholar (per-paper counts) ----
async function refreshPublications(existing: Publication[]): Promise<Publication[]> {
  let html: string;
  try {
    if (process.env.SCHOLAR_HTML) html = readFileSync(process.env.SCHOLAR_HTML, 'utf8');
    else {
      const res = await fetch(`https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en&cstart=0&pagesize=100`, {
        headers: { 'User-Agent': BROWSER_UA, 'Accept-Language': 'en-US,en;q=0.9' },
      });
      html = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn(`! Google Scholar fetch failed (${(err as Error).message}); keeping existing publication counts.`);
    return existing;
  }
  const rows = [...html.matchAll(/<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  if (!rows.length || /captcha|unusual traffic/i.test(html)) {
    console.warn('! Google Scholar returned no publication rows (blocked/CAPTCHA?); keeping existing publication counts.');
    return existing;
  }
  const byId = new Map(existing.map((p) => [p.resultId, p]));
  const pubs = rows.map((row): Publication => {
    const href = decode(row.match(/<a href="([^"]+)" class="gsc_a_at"/)?.[1] ?? '');
    const resultId = href.match(/citation_for_view=([\w:-]+)/)?.[1] ?? '';
    const old = byId.get(resultId);
    const [authors = '', venue = ''] = [...row.matchAll(/<div class="gs_gray">([\s\S]*?)<\/div>/g)].map((m) => decode(m[1]));
    const year = Number(row.match(/class="gsc_a_h gsc_a_hc gs_ibl">(\d{4})</)?.[1]) || old?.year || 0;
    const title = decode(row.match(/class="gsc_a_at">([\s\S]*?)<\/a>/)?.[1] ?? '');
    return {
      // Keep an existing title when only casing/punctuation differs (Scholar lower-cases acronyms).
      title: old && (!title || normTitle(old.title) === normTitle(title)) ? old.title : title,
      authors: authors ? authors.split(', ') : old?.authors ?? [],
      year,
      venue: venue || old?.venue || '',
      citationCount: Number(row.match(/class="gsc_a_ac gs_ibl">(\d+)</)?.[1] ?? 0),
      resultId,
      citesId: row.match(/[?&;]cites=([\d,]+)/)?.[1] ?? '',
      link: href ? `https://scholar.google.com${href}` : old?.link ?? '',
    };
  });
  const dropped = existing.filter((p) => !pubs.some((n) => n.resultId === p.resultId));
  console.log(`✓ Google Scholar: ${pubs.length} publications (${pubs.filter((p) => !byId.has(p.resultId)).length} new` +
    `${dropped.length ? `; no longer on profile, merged by Scholar: ${dropped.map((p) => `"${p.title.slice(0, 50)}"`).join(', ')}` : ''})`);
  return pubs;
}

// ---- Legacy CitationMap export (scripts/citation_info.csv) ----
function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [[]];
  let field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { rows[rows.length - 1].push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      rows[rows.length - 1].push(field); field = ''; rows.push([]);
    } else field += c;
  }
  rows[rows.length - 1].push(field);
  const [header, ...body] = rows;
  return body.filter((r) => r.length > 1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

async function main() {
  const data = JSON.parse(readFileSync(OUT, 'utf8')) as CitationData;
  const publications = await refreshPublications(data.publications);

  // 1. Vineeth's works in OpenAlex (profiles can be split, and arXiv/IEEE versions can be separate works).
  const authorIds = new Set<string>();
  const byOrcid = await openAlex<{ id: string }>(`/authors/orcid:${ORCID}`);
  if (byOrcid) authorIds.add(shortId(byOrcid.id));
  const found = await openAlex<{ results: { id: string; display_name: string }[] }>('/authors', { search: 'Narajala' });
  for (const a of found?.results ?? []) if (/narajala/i.test(a.display_name)) authorIds.add(shortId(a.id));
  const isSelf = (a: OAAuthorship) =>
    (!!a.author.id && authorIds.has(shortId(a.author.id))) || /narajala/i.test(`${a.author.display_name} ${a.raw_author_name}`);

  const mine = new Map<string, OAWork>();
  const WORK_SELECT = 'id,doi,display_name,publication_year,type,cited_by_count,authorships,primary_location,locations';
  const candidates = [
    ...(authorIds.size ? await listWorks(`author.id:${[...authorIds].join('|')}`, WORK_SELECT) : []),
    ...(await listWorks('raw_author_name.search:Narajala', WORK_SELECT)),
  ];
  for (const p of publications) {
    const arxiv = findArxiv(p.venue);
    const w = arxiv && (await openAlex<OAWork>(`/works/doi:10.48550/arxiv.${arxiv}`, { select: WORK_SELECT }));
    if (w) candidates.push(w);
  }
  for (const w of candidates) if (w.authorships.some(isSelf)) mine.set(shortId(w.id), w);
  console.log(`✓ OpenAlex: author ids [${[...authorIds].join(', ')}], ${mine.size} works by Narajala`);

  // Cited-title labels reuse the strings already in the data (legacy first, then Scholar titles).
  const labels = [...new Set([...data.citingPapers.flatMap((p) => p.citedPublications ?? [p.citedPublication]), ...publications.map((p) => p.title)])];
  const citedLabel = (t: string) => labels.find((l) => similar(l, t, 0.75, true)) ?? decode(t);
  const mineLabel = new Map([...mine].map(([id, w]) => [id, citedLabel(w.display_name)]));

  // 2. Every work citing any of them (a single paged query per 50 works).
  const citing = new Map<string, OAWork>();
  const ids = [...mine.keys()];
  for (let i = 0; i < ids.length; i += 50) {
    const works = await listWorks(`cites:${ids.slice(i, i + 50).join('|')}`, `${WORK_SELECT},referenced_works`);
    for (const w of works) citing.set(shortId(w.id), w);
  }
  console.log(`✓ OpenAlex: ${citing.size} citing works`);

  // 3. Merge into the existing citing papers.
  const papers = data.citingPapers.map((p) => ({ ...p }));
  const before = papers.length;
  const index = new Map<string, CitingPaper>();
  const keysOf = (title: string, doi?: string, arxivIds: (string | undefined)[] = []) =>
    [`t:${normTitle(title)}`, doi && `d:${doi}`, ...arxivIds.map((a) => a && `a:${a}`)].filter((k): k is string => !!k);
  const register = (p: CitingPaper, keys: string[]) => keys.forEach((k) => index.has(k) || index.set(k, p));
  for (const p of papers) register(p, keysOf(p.title, findDoi(p.link), [findArxiv(p.link), findArxiv(p.venue)]));

  const oaFor = new Map<CitingPaper, OAWork>();
  const match = (title: string, keys: string[]) =>
    keys.map((k) => index.get(k)).find(Boolean) ?? papers.find((p) => similar(p.title, title, 0.9));
  /** Fill gaps only — never overwrite existing (Scholar-sourced) values. */
  const fill = (paper: CitingPaper, w: OAWork) => {
    const authors = w.authorships.filter((a) => !isSelf(a));
    if (!paper.venue) paper.venue = workVenue(w);
    if (!paper.year && w.publication_year) paper.year = w.publication_year;
    if (!paper.link || paper.link.includes('scholar.google.')) paper.link = workLink(w);
    if (!paper.authors.length) paper.authors = authors.map((a) => a.author.display_name ?? a.raw_author_name ?? '').filter(Boolean);
    if (!paper.affiliations?.length) paper.affiliations = [...new Set(authors.flatMap((a) => (a.institutions ?? []).map((i) => i.display_name)))];
    if (!paper.affiliation || paper.affiliation === 'Unknown') paper.affiliation = paper.affiliations[0] ?? 'Unknown';
    paper.citationCount = Math.max(paper.citationCount ?? 0, w.cited_by_count ?? 0);
    if (!oaFor.has(paper)) oaFor.set(paper, w);
  };

  for (const w of [...citing.values()].sort((a, b) => (b.cited_by_count ?? 0) - (a.cited_by_count ?? 0))) {
    const title = decode(w.display_name ?? '').trim();
    // Cited works, minus another version of this same paper; drop pure self-citations (no other authors).
    const cited = [...new Set((w.referenced_works ?? []).map(shortId).filter((id) => mine.has(id)).map((id) => mineLabel.get(id)!))]
      .filter((l) => !similar(l, title, 0.75, true));
    if (!title || !cited.length || !w.authorships.some((a) => !isSelf(a))) continue;

    const keys = keysOf(title, findDoi(w.doi), workArxivIds(w));
    let paper = match(title, keys);
    if (!paper) {
      paper = {
        title, authors: [], venue: '', link: '', citationCount: 0, influenceScore: 0, venueScore: 0, citationScore: 0,
        citedPublication: cited[0], citedPublications: [], affiliation: 'Unknown', affiliations: [], country: 'Unknown',
      };
      papers.push(paper);
    }
    fill(paper, w);
    const citedAll = [...(paper.citedPublications ?? [paper.citedPublication])];
    for (const c of cited) if (!citedAll.some((x) => similar(x, c, 0.75, true))) citedAll.push(c);
    paper.citedPublications = citedAll.filter(Boolean);
    paper.citedPublication ||= paper.citedPublications[0];
    register(paper, keys);
  }

  // Fill gaps in entries OpenAlex didn't list as citing: his own co-authored papers, then free DOI/arXiv lookups.
  for (const w of [...mine.values()].sort((a, b) => Number(a.type === 'preprint') - Number(b.type === 'preprint'))) {
    const p = match(decode(w.display_name), keysOf(w.display_name, findDoi(w.doi), workArxivIds(w)));
    if (p && !oaFor.has(p)) fill(p, w);
  }
  const lookups = papers.filter((p) => !oaFor.has(p) && (findDoi(p.link) || findArxiv(p.link) || findArxiv(p.venue)));
  await each(lookups, async (p) => {
    const w = await openAlex<OAWork>(`/works/doi:${findDoi(p.link) ?? `10.48550/arxiv.${findArxiv(p.link) ?? findArxiv(p.venue)}`}`,
      { select: WORK_SELECT });
    if (w && similar(decode(w.display_name ?? ''), p.title, 0.6)) fill(p, w);
  });
  console.log(`✓ OpenAlex: ${papers.length - before} new citing papers; matched ${[...oaFor.keys()].filter((p) => data.citingPapers.some((q) => q.title === p.title)).length} existing ones (gaps filled)`);

  // 4. Institution geo (single-entity lookups are free; each institution fetched once).
  const geo = new Map<string, Place | null>();
  const instIds = [...new Set([...oaFor.values()].flatMap((w) =>
    w.authorships.filter((a) => !isSelf(a)).flatMap((a) => (a.institutions ?? []).map((i) => shortId(i.id)))))];
  await each(instIds, async (id) => {
    const g = (await openAlex<{ geo?: OAGeo }>(`/institutions/${id}`, { select: 'geo' }))?.geo;
    geo.set(id, g && typeof g.latitude === 'number' && typeof g.longitude === 'number'
      ? { latitude: g.latitude, longitude: g.longitude, city: g.city ?? '', country: normCountry(g.country) } : null);
  });
  console.log(`✓ OpenAlex: geo for ${[...geo.values()].filter(Boolean).length}/${instIds.length} institutions`);
  const placed = (a: OAAuthorship) => (a.institutions ?? []).map((i) => ({ name: i.display_name, g: geo.get(shortId(i.id)) }))
    .find((x) => x.g) as { name: string; g: Place } | undefined;
  for (const [paper, w] of oaFor) {
    if (!paper.country || paper.country === 'Unknown') {
      const first = w.authorships.filter((a) => !isSelf(a)).map(placed).find(Boolean);
      paper.country = first ? first.g.country : 'Unknown';
    }
  }

  // 5. Derived fields (merge_all_data.py formulas; citation score as in scripts/fetchCitations.ts).
  for (const p of papers) {
    p.tier = venueTier(p.venue);
    p.venueScore = VENUE_SCORE[p.tier];
    p.citationScore = Math.round(Math.min(50, Math.log10((p.citationCount || 0) + 1) * 20));
    p.influenceScore = Math.min(100, p.venueScore + p.citationScore);
    p.isPrestigious = !!p.isPrestigious || isPrestigious(p.affiliations ?? []);
    p.country = normCountry(p.country);
  }

  // 6. Locations: CitationMap rows (exactly as merge_all_data.py) + OpenAlex geo for papers it didn't place.
  const locations = new Map<string, CitationLocation>();
  const addTo = (key: string, base: Omit<CitationLocation, 'count' | 'papers' | 'affiliations'>, title: string, aff: string, n: number) => {
    const loc = locations.get(key) ?? { ...base, count: 0, papers: [], affiliations: [] };
    locations.set(key, loc);
    loc.count += n;
    if (loc.papers.length < 10 && !loc.papers.includes(title)) loc.papers.push(title);
    if (aff && !loc.affiliations.includes(aff)) loc.affiliations.push(aff);
  };
  const csvPlaced = new Set<string>();
  if (existsSync(CSV)) {
    for (const r of parseCsv(readFileSync(CSV, 'utf8'))) {
      const author = r['citing author name'] ?? '', title = r['citing paper title'] ?? '', country = r.country ?? '';
      if (SELF_NAMES.some((n) => author.toLowerCase().trim().includes(n)) || !title || EXCLUDED_COUNTRIES.includes(country)) continue;
      const lat = Number(r.latitude), lng = Number(r.longitude);
      if (!r.latitude || !r.longitude || !lat || !lng || !country) continue;
      const aff = PLACEHOLDER_AFFILIATIONS.includes(r.affiliation) ? '' : r.affiliation ?? '';
      addTo(`${lat.toFixed(1)},${lng.toFixed(1)}`, { latitude: lat, longitude: lng, country: normCountry(country), city: r.city ?? '' }, title, aff, 1);
      csvPlaced.add(normTitle(title));
    }
  } else {
    console.warn(`! ${CSV} missing — keeping existing locations; OpenAlex locations are not added.`);
    data.locations.forEach((l, i) => locations.set(`legacy${i}`, l));
  }
  for (const [paper, w] of existsSync(CSV) ? oaFor : []) {
    if (csvPlaced.has(normTitle(paper.title))) continue;
    for (const a of w.authorships.filter((x) => !isSelf(x))) {
      const hit = placed(a);
      if (!hit) continue;
      const { latitude, longitude, city, country } = hit.g;
      const sameCity = [...locations].find(([, l]) => city && l.country === country && normTitle(l.city ?? '') === normTitle(city));
      const key = sameCity?.[0] ?? `${latitude.toFixed(1)},${longitude.toFixed(1)}`;
      addTo(key, { latitude, longitude, country, city }, paper.title, hit.name, Math.max(1, paper.citedPublications?.length ?? 1));
    }
  }
  const locationList = [...locations.values()].sort((a, b) => b.count - a.count);

  // 7. Stats (same definitions as merge_all_data.py).
  const tierCounts: Record<string, number> = { tier1: 0, tier2: 0, other: 0, preprint: 0 };
  const venues = new Map<string, number>(), countries = new Map<string, number>(), authors = new Set<string>();
  let authorCitations = 0;
  for (const p of papers) {
    tierCounts[p.tier ?? 'other']++;
    if (p.venue) venues.set(p.venue, (venues.get(p.venue) ?? 0) + 1);
    if (p.country && p.country !== 'Unknown') countries.set(p.country, (countries.get(p.country) ?? 0) + 1);
    p.authors.forEach((a) => authors.add(normAuthor(a)));
    authorCitations += p.authors.length * Math.max(1, p.citedPublications?.length ?? 0);
  }
  const top = (m: Map<string, number>, n: number) =>
    [...m].sort((a, b) => b[1] - a[1]).slice(0, n).map(([name, count]) => ({ name, count }));
  const prestigiousCount = papers.filter((p) => p.isPrestigious).length;
  const stats: CitationStats = {
    totalCitations: papers.length,
    uniqueLocations: locationList.length,
    topVenues: top(venues, 15),
    influenceDistribution: {
      high: tierCounts.tier1 + prestigiousCount,
      medium: tierCounts.tier2,
      low: tierCounts.other + tierCounts.preprint,
    },
    tierDistribution: tierCounts,
    topCountries: top(countries, 10),
    prestigiousCount,
    uniqueAuthors: authors.size,
    totalAuthorCitations: authorCitations,
  };

  // 8. Validate, then write (re-read `scholar` so concurrent manual edits to it are kept).
  const order = (p: CitingPaper): CitingPaper => {
    const { title, authors: a, year, venue, link, citationCount, influenceScore, venueScore, citationScore, citedPublication,
      citedPublications, affiliation, affiliations, country, tier, isPrestigious: prest, ...rest } = p;
    return { title, authors: a, ...(year ? { year } : {}), venue, link, citationCount, influenceScore, venueScore, citationScore,
      citedPublication, citedPublications, affiliation, affiliations, country, tier, isPrestigious: prest, ...rest };
  };
  const out: CitationData = {
    lastUpdated: new Date().toISOString(),
    scholarId: data.scholarId,
    scholar: (JSON.parse(readFileSync(OUT, 'utf8')) as CitationData).scholar,
    publications,
    citingPapers: papers.map(order),
    locations: locationList,
    stats,
  };
  const problems: string[] = [];
  JSON.stringify(out, (k, v) => (typeof v === 'number' && !Number.isFinite(v) && problems.push(`non-finite number at "${k}"`), v));
  for (const l of out.locations) {
    if (!(Math.abs(l.latitude) <= 90 && Math.abs(l.longitude) <= 180)) problems.push(`bad coordinates for ${l.city}, ${l.country}`);
  }
  const seen = new Map<string, string>();
  for (const p of out.citingPapers) {
    for (const k of keysOf(p.title, findDoi(p.link))) {
      if (seen.has(k)) problems.push(`duplicate citing paper: "${p.title}" / "${seen.get(k)}"`);
      seen.set(k, p.title);
    }
  }
  if (out.citingPapers.length < before) problems.push('citing papers would regress');
  if (problems.length) throw new Error(`Validation failed, not writing:\n  ${problems.join('\n  ')}`);

  writeFileSync(OUT, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`✓ Wrote ${OUT}`);
  console.log(`  citing papers: ${before} existing + ${papers.length - before} new = ${papers.length}`);
  console.log(`  locations: ${stats.uniqueLocations}, countries: ${countries.size}, prestigious: ${prestigiousCount}, ` +
    `unique authors: ${stats.uniqueAuthors}, tiers: ${JSON.stringify(tierCounts)}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
