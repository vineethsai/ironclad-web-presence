import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const BOOT_LINES = [
  '> initializing secure session ...',
  '> loading security modules ..... OK',
  '> verifying integrity .......... OK',
  '> welcome, visitor_',
];

/** First-visit terminal boot preloader (once per session). */
const Preloader: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    if (sessionStorage.getItem('boot-complete')) return;
    // Deep-link/test escape hatch: ?boot=skip
    if (new URLSearchParams(window.location.search).get('boot') === 'skip') {
      sessionStorage.setItem('boot-complete', '1');
      return;
    }

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const lineInterval = setInterval(() => {
      setLineCount((prev) => {
        if (prev >= BOOT_LINES.length) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 320);

    const doneTimeout = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      sessionStorage.setItem('boot-complete', '1');
    }, 320 * BOOT_LINES.length + 750);

    return () => {
      clearInterval(lineInterval);
      clearTimeout(doneTimeout);
      document.body.style.overflow = '';
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] bg-cyber-black flex items-center justify-center"
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <div className="w-[min(90vw,26rem)]">
            <div className="font-mono text-sm text-cyber-green space-y-1.5">
              {BOOT_LINES.slice(0, lineCount).map((line) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {line}
                </motion.div>
              ))}
              <span className="inline-block w-2 h-4 bg-cyber-green animate-pulse" />
            </div>
            <div className="mt-5 h-px w-full bg-cyber-green/15 overflow-hidden">
              <motion.div
                className="h-full bg-cyber-green"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 320 * BOOT_LINES.length / 1000 + 0.5, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
