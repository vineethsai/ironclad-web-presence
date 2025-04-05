
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Shield } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    // Enhanced with more cybersecurity-related characters
    const cyberCharacters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#33CC66'; // Cyber-green color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = cyberCharacters.charAt(Math.floor(Math.random() * cyberCharacters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Create a glowing effect for some characters
        if (Math.random() > 0.98) {
          ctx.shadowColor = '#33CC66';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#FFFFFF';
        } else if (Math.random() > 0.9) {
          ctx.shadowColor = '#33CC66';
          ctx.shadowBlur = 5;
          ctx.fillStyle = '#33CC66';
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#33CC6699';
        }
        
        ctx.fillText(text, x, y);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 60);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
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
      
      <div className={`container mx-auto px-4 relative z-20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-cyber-green animate-pulse" />
          </div>
          
          <h2 className={`text-2xl md:text-3xl font-medium text-cyber-green tracking-wider transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            CYBERSECURITY ENGINEER
          </h2>
          
          <div className="typing-container">
            <h1 className="typing-text text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cyber-glow">
              Defending Digital Frontiers
            </h1>
          </div>
          
          <p className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Specialized in penetration testing, threat analysis, and implementing robust security frameworks to keep your systems impenetrable.
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a 
              href="#contact" 
              className="cyber-button hover:scale-105 transition-transform duration-300"
            >
              Get In Touch
            </a>
            <a 
              href="#about" 
              className="px-6 py-2 bg-transparent border border-cyber-green/30 text-white rounded transition-all duration-300 hover:border-cyber-green hover:bg-white/10 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-cyber-green transition-colors">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
