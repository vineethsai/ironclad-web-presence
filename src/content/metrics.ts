/** Numbers shown around the site, computed from the content and data files rather than typed in. */
import citationData from '@/data/citations.json';
import scholar from '@/data/scholarMetrics.json';
import { papers, type Paper } from '@/content/research';
import { talks } from '@/content/talks';
import { press } from '@/content/media';

const normalize = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Google Scholar citation count for a paper, matched by title. Scholar sometimes lists the
 * arXiv and IEEE versions separately, so counts for every matching entry are added together.
 */
export const citationCountFor = (paper: Paper): number => {
  const keys = [paper.title, ...(paper.altTitles ?? [])].map((t) => normalize(t).slice(0, 48));
  return (citationData.publications as { title: string; citationCount: number }[])
    .filter((p) => keys.some((k) => normalize(p.title).startsWith(k) || k.startsWith(normalize(p.title).slice(0, 48))))
    .reduce((sum, p) => sum + p.citationCount, 0);
};

export const siteStats = {
  citations: scholar.totalCitations,
  hIndex: scholar.hIndex,
  peerReviewed: papers.filter((p) => p.status === 'published').length,
  papers: papers.length,
  talks: talks.length,
  press: press.length,
  scholarUpdated: scholar.lastUpdated,
};
