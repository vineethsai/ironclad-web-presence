import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE } from './easing';

export interface QuoteItem {
  quote: string;
  author: string;
  org: string;
}

interface QuoteCarouselProps {
  quotes: QuoteItem[];
  intervalMs?: number;
}

/** Auto-rotating endorsement quote spotlight with manual controls. */
const QuoteCarousel: React.FC<QuoteCarouselProps> = ({ quotes, intervalMs = 6500 }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const next = useCallback(() => setIndex((i) => (i + 1) % quotes.length), [quotes.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + quotes.length) % quotes.length), [quotes.length]);

  useEffect(() => {
    if (paused || reduceMotion || quotes.length <= 1) return;
    const t = setInterval(next, intervalMs);
    return () => clearInterval(t);
  }, [paused, next, intervalMs, reduceMotion, quotes.length]);

  if (quotes.length === 0) return null;
  const current = quotes[index];

  return (
    <div
      className="relative glass-card p-8 md:p-10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="glow-blob w-72 h-72 -top-20 -right-20" />
      <Quote className="h-8 w-8 text-cyber-green/50 mb-5" />

      <div className="min-h-[9rem] md:min-h-[7.5rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed italic">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-4">
              <span className="text-cyber-green font-semibold">{current.author}</span>
              <span className="text-gray-400"> · {current.org}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to quote ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-cyber-green' : 'w-3 bg-cyber-green/25 hover:bg-cyber-green/50'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous quote"
            className="p-2 rounded-full border border-cyber-green/25 text-cyber-green hover:bg-cyber-green/15 hover:border-cyber-green/60 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next quote"
            className="p-2 rounded-full border border-cyber-green/25 text-cyber-green hover:bg-cyber-green/15 hover:border-cyber-green/60 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCarousel;
