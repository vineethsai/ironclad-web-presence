import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './easing';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/** Animated page header for inner pages: grid backdrop, glow, staggered title reveal. */
const PageHeader: React.FC<PageHeaderProps> = ({ kicker, title, subtitle, children }) => {
  const reduceMotion = useReducedMotion();

  const anim = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <section className="relative py-16 md:py-20 bg-cyber-darker overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="glow-blob w-[36rem] h-[36rem] -top-48 left-1/2 -translate-x-1/2 animate-aurora" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {kicker && (
            <motion.span
              className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-cyber-green/80 block mb-4"
              {...anim(0)}
            >
              {kicker}
            </motion.span>
          )}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white"
            {...anim(0.1)}
          >
            {title}
          </motion.h1>
          <motion.div
            className="h-1 w-24 mx-auto mt-5 rounded-full bg-gradient-to-r from-cyber-green via-cyber-green-light to-transparent"
            {...(reduceMotion
              ? {}
              : {
                  initial: { scaleX: 0, opacity: 0 },
                  animate: { scaleX: 1, opacity: 1 },
                  transition: { duration: 0.7, ease: EASE, delay: 0.25 },
                })}
            style={{ transformOrigin: 'center' }}
          />
          {subtitle && (
            <motion.p className="mt-5 text-lg text-gray-400" {...anim(0.3)}>
              {subtitle}
            </motion.p>
          )}
          {children && <motion.div {...anim(0.4)}>{children}</motion.div>}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
