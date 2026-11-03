/**
 * Refresh GitHub star/fork counts for the projects in src/content/openSource.ts.
 *
 *   npm run fetch-github
 *
 * Writes src/data/github.json. Works without a token (60 requests/hour);
 * set GITHUB_TOKEN to raise the limit. If a request fails, the previous value is kept.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { openSourceProjects } from '../src/content/openSource';

interface RepoStats {
  stars: number;
  forks: number;
  description: string | null;
  pushedAt: string;
}

const outPath = resolve(import.meta.dirname, '../src/data/github.json');
const previous: { repos?: Record<string, RepoStats> } = existsSync(outPath)
  ? JSON.parse(readFileSync(outPath, 'utf8'))
  : {};

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'vineethsai.com-build',
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const repos: Record<string, RepoStats> = {};
for (const { repo } of openSourceProjects) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    repos[repo] = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      description: data.description,
      pushedAt: data.pushed_at,
    };
    console.log(`${repo}: ${data.stargazers_count}★`);
  } catch (err) {
    console.warn(`${repo}: kept previous value (${(err as Error).message})`);
    if (previous.repos?.[repo]) repos[repo] = previous.repos[repo];
  }
}

writeFileSync(outPath, JSON.stringify({ fetchedAt: new Date().toISOString(), repos }, null, 2) + '\n');
console.log(`Wrote ${outPath}`);
