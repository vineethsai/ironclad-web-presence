import React, { useEffect, useRef } from 'react';
import { ArrowDown, Shield } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-cyber-green animate-pulse" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-medium text-cyber-green tracking-wider">
            CYBERSECURITY ENGINEER
          </h2>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cyber-glow">
            Defending Digital Frontiers
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Specialized in penetration testing, threat analysis, and implementing robust security frameworks to keep your systems impenetrable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a href="#contact" className="cyber-button">
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
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-cyber-green transition-colors">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
