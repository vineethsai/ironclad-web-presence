import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './easing';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

/** Consistent animated section heading: mono kicker, title, gradient underline. */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
}) => {
  const reduceMotion = useReducedMotion();
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  const content = (
    <>
      {kicker && (
        <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-cyber-green/80 mb-3 block">
          {kicker}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <motion.div
        className="h-1 mt-4 rounded-full bg-gradient-to-r from-cyber-green via-cyber-green-light to-transparent"
        initial={reduceMotion ? false : { width: 0, opacity: 0 }}
        whileInView={reduceMotion ? undefined : { width: 96, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        style={reduceMotion ? { width: 96 } : undefined}
      />
      {subtitle && (
        <p className={`mt-4 text-gray-400 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </>
  );

  if (reduceMotion) {
    return <div className={`flex flex-col ${alignClass} mb-12`}>{content}</div>;
  }

  return (
    <motion.div
      className={`flex flex-col ${alignClass} mb-12`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {content}
    </motion.div>
  );
};

export default SectionHeading;
