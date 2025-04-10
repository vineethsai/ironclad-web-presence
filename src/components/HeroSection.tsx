import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Shield, Lock, Code, Key, Database, FileCode, Server, Wifi, Bug } from 'lucide-react';

// Component for animated text with character-by-character fade-in
const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cyber-glow ${className}`}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className={`text-animated-char animate-text-fade-in`}
          style={{ animationDelay: `${index * 0.04}s` }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Generate random icons for floating animation
  const floatingIcons = [
    { icon: Lock, class: 'top-[15%] left-[10%] animate-float-up-down', size: 24 },
    { icon: Code, class: 'top-[35%] right-[15%] animate-float-left-right', size: 28 },
    { icon: Key, class: 'bottom-[25%] left-[25%] animate-float-circle', size: 20 },
    { icon: Database, class: 'top-[50%] left-[8%] animate-float-left-right', size: 18 },
    { icon: FileCode, class: 'top-[20%] right-[8%] animate-float-up-down', size: 20 },
    { icon: Server, class: 'bottom-[30%] right-[20%] animate-float-circle', size: 24 },
    { icon: Wifi, class: 'top-[30%] left-[25%] animate-float-up-down', size: 22 },
    { icon: Bug, class: 'bottom-[20%] right-[10%] animate-float-left-right', size: 19 },
  ];

  useEffect(() => {
    setIsVisible(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }

    const cyberCharacters = '01';

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = cyberCharacters.charAt(Math.floor(Math.random() * cyberCharacters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 60);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-cyber-dark/70 z-10"></div>
      
      {/* Floating security icons */}
      {floatingIcons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className={`floating-icon ${item.class}`} style={{ animationDelay: `${index * 0.5}s` }}>
            <IconComponent size={item.size} />
          </div>
        );
      })}
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className={`h-16 w-16 text-cyber-green animate-pulse ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`} />
          </div>
          
          <h2 className={`text-2xl md:text-3xl font-medium text-cyber-green tracking-wider ${isVisible ? 'animate-text-fade-in-delay-1' : 'opacity-0'}`}>
            CYBERSECURITY ENGINEER
          </h2>
          
          {/* Animated text with character-by-character fade-in */}
          <AnimatedText text="Defending Digital Frontiers" />
          
          <p className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto ${isVisible ? 'animate-text-fade-in-delay-3' : 'opacity-0'}`}>
            Specialized in penetration testing, threat analysis, and implementing robust security frameworks to keep your systems impenetrable.
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 ${isVisible ? 'animate-text-fade-in-delay-3' : 'opacity-0'}`}>
            <a href="#contact" className="cyber-terminal-button animate-glow-pulse">
              Get In Touch
            </a>
            <a 
              href="#about" 
              className="px-6 py-2 bg-transparent border border-white/30 text-white rounded transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="mb-2 animate-scroll-hint opacity-0">
          <ArrowDown className="h-4 w-4 text-cyber-green" />
        </div>
        <a href="#about" className="text-white hover:text-cyber-green transition-colors animate-bounce">
          <ArrowDown className="h-8 w-8" />
        </a>
        <div className="mt-1 text-xs text-cyber-green font-mono opacity-70">scroll down</div>
      </div>
    </section>
  );
};

export default HeroSection;
