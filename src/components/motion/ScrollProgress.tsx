import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/** Thin green scroll-progress bar fixed to the top of the viewport. */
const ScrollProgress: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-cyber-green-muted via-cyber-green to-cyber-green-light"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
