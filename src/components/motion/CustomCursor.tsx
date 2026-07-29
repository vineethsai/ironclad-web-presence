import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/** Green dot + trailing ring cursor. Desktop (fine pointer) only; native cursor stays as fallback. */
const CustomCursor: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer || reduceMotion) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]'));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [x, y, reduceMotion]);

  if (!enabled) return null;

  return (
    <>
      {/* Center dot — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full bg-cyber-green-light"
        style={{ x, y, width: 7, height: 7, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full border border-cyber-green/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 46 : 32,
          height: hovering ? 46 : 32,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  );
};

export default CustomCursor;
