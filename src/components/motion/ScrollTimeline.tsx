import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { EASE } from './easing';

interface ScrollTimelineProps {
  children: React.ReactNode;
  className?: string;
}

/** Vertical timeline whose progress line draws itself as you scroll. */
export const ScrollTimeline: React.FC<ScrollTimelineProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.55'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.6 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Track */}
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 rounded bg-cyber-green/15" />
      {/* Scroll-driven progress line */}
      {reduceMotion ? (
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 rounded bg-cyber-green" />
      ) : (
        <motion.div
          className="absolute left-[15px] top-2 bottom-2 w-0.5 rounded bg-gradient-to-b from-cyber-green-light via-cyber-green to-cyber-green-muted origin-top shadow-glow-sm"
          style={{ scaleY }}
        />
      )}
      <div className="space-y-8">{children}</div>
    </div>
  );
};

interface TimelineItemProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  side?: 'left' | 'right';
}

/** One node on the ScrollTimeline: glowing dot + card sliding in. */
export const TimelineItem: React.FC<TimelineItemProps> = ({ children, icon, side = 'right' }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative pl-12"
      initial={reduceMotion ? false : { opacity: 0, x: side === 'right' ? 36 : -36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-cyber-dark border-2 border-cyber-green flex items-center justify-center shadow-glow-sm z-10">
        {icon}
      </div>
      {children}
    </motion.div>
  );
};

export default ScrollTimeline;
