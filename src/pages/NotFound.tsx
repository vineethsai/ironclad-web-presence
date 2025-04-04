
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cyber-dark text-white flex flex-col">
      <Helmet>
        <title>Page Not Found | Vineeth Sai Narajala</title>
        <meta name="description" content="The page you're looking for cannot be found. Return to Vineeth Sai Narajala's cybersecurity portfolio." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-cyber-green mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-cyber-green text-black font-semibold rounded-md hover:bg-cyber-green-light transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
