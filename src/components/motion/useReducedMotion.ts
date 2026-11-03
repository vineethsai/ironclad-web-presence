import { useState } from 'react';
import { useReducedMotion as useSystemReducedMotion } from 'framer-motion';
import { boot } from '@/lib/boot';

/**
 * True when the visitor prefers reduced motion, or when this component first rendered while the
 * app was taking over a prerendered page (it's already visible, so there's nothing to animate in).
 */
export const useReducedMotion = (): boolean => {
  const systemReduced = useSystemReducedMotion();
  const [mountedDuringBoot] = useState(() => boot.prerendered);
  return Boolean(systemReduced) || mountedDuringBoot;
};
