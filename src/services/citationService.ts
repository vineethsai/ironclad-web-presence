import type { CitationData } from '@/types/citations';
import citationData from '@/data/citations.json';

export const getCitationData = (): CitationData => {
  return citationData as CitationData;
};
