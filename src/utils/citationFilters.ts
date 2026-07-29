import type { CitingPaper } from '@/types/citations';

// Self-citation patterns to filter out
export const SELF_NAME_PATTERNS = [
  'vineeth sai',
  'vs narajala',
  'vineeth sai narajala',
  'v. s. narajala',
  'narajala, v',
  'narajala, vineeth',
  'v s narajala',
  'vineeth narajala'
];

export const isSelfCitation = (authors: string[]): boolean => {
  return authors.some(author => {
    const authorLower = author.toLowerCase();
    return SELF_NAME_PATTERNS.some(pattern => authorLower.includes(pattern));
  });
};

// Prestigious institutions for high-influence scoring
export const PRESTIGIOUS_INSTITUTIONS = [
  'stanford', 'mit ', 'massachusetts institute', 'berkeley', 'uc berkeley',
  'carnegie mellon', 'cmu', 'harvard', 'princeton', 'cornell', 'georgia tech',
  'georgia institute', 'purdue', 'oxford', 'cambridge', 'eth zurich', 'eth zürich',
  'tsinghua', 'peking', 'zhejiang', 'national university of singapore', 'nus',
  'kaist', 'google', 'microsoft', 'meta', 'facebook', 'cern', 'deepmind',
  'amazon', 'aws', 'ibm research', 'nvidia', 'intel', 'openai', 'anthropic',
  'yale', 'columbia', 'ucla', 'caltech', 'nyu', 'usc', 'university of washington',
  'university of michigan', 'uiuc', 'university of illinois', 'ut austin',
  'university of texas', 'umass', 'johns hopkins', 'duke', 'northwestern',
  'university of toronto', 'waterloo', 'mcgill', 'epfl', 'imperial college',
  'ucl', 'university college london', 'king\'s college', 'tu munich', 'max planck',
  'inria', 'cnrs', 'national institute', 'darpa', 'nist', 'sandia'
];

// Top-tier venue patterns
export const TOP_TIER_VENUES = [
  'ieee', 'acm', 'usenix', 'ndss', 'ccs', 's&p', 'sp ', 'infocom',
  'security', 'oakland', 'crypto', 'eurocrypt', 'asiacrypt',
  'acsac', 'esorics', 'wisec', 'isca', 'micro', 'hpca', 'sigcomm',
  'mobicom', 'nsdi', 'sosp', 'osdi', 'eurosys', 'pldi', 'popl', 'icse',
  'fse', 'ase', 'issta', 'sigmod', 'vldb', 'neurips', 'nips', 'icml',
  'iclr', 'cvpr', 'iccv', 'eccv', 'aaai', 'ijcai'
];

// Peer-reviewed venue patterns
export const PEER_REVIEWED_VENUES = [
  'springer', 'elsevier', 'nature', 'science', 'plos', 'wiley',
  'taylor & francis', 'mdpi', 'journal of', 'transactions on',
  'international journal', 'conference on', 'symposium on'
];

// Check if a paper is high influence (from prestigious institution or top venue)
export const isHighInfluence = (paper: CitingPaper): boolean => {
  // Check venue
  const venueLower = (paper.venue || '').toLowerCase();
  const isTopVenue = TOP_TIER_VENUES.some(p => venueLower.includes(p));
  const isPeerReviewed = PEER_REVIEWED_VENUES.some(p => venueLower.includes(p));

  // Check affiliations
  const affiliationsLower = paper.affiliations?.map(a => a.toLowerCase()).join(' ') || '';
  const authorsLower = paper.authors.join(' ').toLowerCase();
  const combinedText = `${affiliationsLower} ${authorsLower}`;
  const isPrestigiousInstitution = PRESTIGIOUS_INSTITUTIONS.some(p => combinedText.includes(p));

  return isTopVenue || isPeerReviewed || isPrestigiousInstitution;
};
