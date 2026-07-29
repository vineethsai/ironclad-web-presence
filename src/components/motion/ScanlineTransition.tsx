import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Fast cyber scanline wipe shown on each route change. Keyed by pathname by the parent. */
const ScanlineTransition: React.FC = () => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Sweeping scanline bar */}
      <motion.div
        className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyber-green to-transparent shadow-glow"
        initial={{ top: '-1%' }}
        animate={{ top: '101%' }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Faint trailing glow */}
      <motion.div
        className="absolute left-0 right-0 h-24 bg-gradient-to-b from-cyber-green/10 to-transparent"
        initial={{ top: '-10%' }}
        animate={{ top: '101%' }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>
  );
};

export default ScanlineTransition;
