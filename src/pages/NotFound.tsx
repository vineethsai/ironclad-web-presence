
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix rain effect
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }

    // Use 404 and error-related characters for the matrix rain
    const errorChars = "404ERROR";

    const draw = () => {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#33CC66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = errorChars.charAt(Math.floor(Math.random() * errorChars.length));
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
    <div className="min-h-screen bg-cyber-dark text-white flex flex-col">
      <Helmet>
        <title>Page Not Found | Vineeth Sai Narajala</title>
        <meta name="description" content="The page you're looking for cannot be found. Return to Vineeth Sai Narajala's cybersecurity portfolio." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-cyber-dark/80 z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-20">
          <div className="cyber-glow text-6xl md:text-9xl font-bold mb-6 animate-pulse">404</div>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-cyber-green">SYSTEM BREACH DETECTED</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto slide-in-left">
            The page you're looking for has been compromised or doesn't exist.
          </p>
          <Link 
            to="/" 
            className="inline-block px-8 py-4 bg-cyber-green text-black font-semibold rounded-md hover:bg-cyber-green-muted transition-colors hover:scale-105 transform duration-300"
          >
            RETURN TO SECURE ZONE
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
