import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { ArrowDown, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MagneticButton } from '@/components/motion';
import { EASE } from '@/components/motion/easing';

const HeroScene = lazy(() => import('@/components/three/HeroScene'));

const HERO_PHRASES = [
  'Defending Digital Frontiers',
  'Securing Applications',
  'Protecting the Nation',
  'Building Secure Systems',
  'Empowering Developer Security',
  'Safeguarding Digital Assets',
  'Enhancing Cyber Resilience',
  'Leading Security Innovation',
];

// Component for animated text with typing and cursor effect
const AnimatedText = ({ phrases, className }: { phrases: string[], className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(phrases[0] ?? '');
      return;
    }

    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[currentPhraseIndex] ?? '';

    const typePhrase = () => {
      if (currentIndex <= currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typePhrase, 90);
      } else {
        timeout = setTimeout(
          () => setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length),
          2100
        );
      }
    };

    typePhrase();

    return () => clearTimeout(timeout);
  }, [currentPhraseIndex, phrases, reduceMotion]);

  // Cursor blink effect
  useEffect(() => {
    if (reduceMotion) {
      setShowCursor(true);
      return;
    }
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [reduceMotion]);

  return (
    <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 min-h-[1.2em] ${className}`}>
      <span className="text-gradient cyber-glow-soft">{displayText}</span>
      <span
        className={`inline-block w-[3px] h-[0.9em] align-[-0.08em] bg-cyber-green-light ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </h1>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  const entrance = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-cyber-darker"
    >
      {/* 3D particle-network backdrop (lazy) with static fallback */}
      <motion.div className="absolute inset-0 z-0" style={reduceMotion ? undefined : { opacity: sceneOpacity }}>
        <Suspense fallback={<div className="absolute inset-0 bg-grid opacity-60" />}>
          <HeroScene />
        </Suspense>
      </motion.div>

      {/* Content with scroll parallax */}
      <motion.div
        className="container mx-auto px-4 relative z-20"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <motion.div className="flex items-center justify-center mb-2" {...entrance(0)}>
            <div className="relative">
              <Shield className="h-16 w-16 text-cyber-green" />
              <div className="absolute inset-0 blur-xl bg-cyber-green/40 rounded-full animate-pulse-soft" />
            </div>
          </motion.div>

          {/* Availability badge */}
          <motion.div className="flex justify-center" {...entrance(0.1)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyber-green/30 bg-cyber-green/10 px-4 py-1.5 text-xs font-mono tracking-wider text-cyber-green-light backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-green-light" />
              </span>
              CYBERSECURITY ENGINEER
            </span>
          </motion.div>

          {/* Animated text with rotating phrases and typing effect */}
          <motion.div {...entrance(0.2)}>
            <AnimatedText phrases={HERO_PHRASES} />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
            {...entrance(0.35)}
          >
            Specialized in penetration testing, threat analysis, and implementing robust security frameworks to keep your systems impenetrable.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            {...entrance(0.5)}
          >
            <MagneticButton>
              <Link to="/blog" className="cyber-terminal-button animate-glow-pulse inline-block">
                Read my Blog
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-block px-6 py-2 bg-white/[0.03] backdrop-blur-sm border border-white/20 text-white rounded transition-all duration-300 hover:border-cyber-green/60 hover:text-cyber-green-light hover:shadow-glow"
              >
                Get in Touch
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-cyber-green/60">scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-cyber-green/40 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-cyber-green-light"
            animate={reduceMotion ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <ArrowDown className="h-4 w-4 text-cyber-green/60 animate-scroll-hint" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
