import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loadingPriority?: 'lazy' | 'eager';
}

/**
 * OptimizedImage component for better SEO and performance
 * - Adds proper alt text for accessibility and SEO
 * - Supports lazy loading for performance
 * - Adds structured data for images
 * - Handles loading states with placeholder
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  loadingPriority = 'lazy'
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state when src changes
    setLoaded(false);
    setError(false);
    
    // Preload image
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Generate a descriptive alt text if none provided
  const finalAlt = alt || getDescriptiveAltFromSrc(src);
  
  return (
    <>
      {/* Structured data for image */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "contentUrl": src,
          "description": finalAlt
        })}
      </script>
      
      <div className={`relative ${className}`} style={{ width, height }}>
        {!loaded && !error && (
          <div className="absolute inset-0 bg-cyber-grey/30 animate-pulse rounded" 
            style={{ width, height }} 
            aria-hidden="true"
          />
        )}
        
        {error ? (
          <div className="flex items-center justify-center text-gray-400 border border-cyber-green/20 rounded p-4 bg-cyber-grey/20"
            style={{ width, height: height || 200 }}>
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={src}
            alt={finalAlt}
            width={width}
            height={height}
            loading={loadingPriority}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-auto rounded ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          />
        )}
      </div>
    </>
  );
};

/**
 * Generates a descriptive alt text from image filename if none is provided
 */
function getDescriptiveAltFromSrc(src: string): string {
  try {
    // Extract filename from URL
    const filename = src.split('/').pop() || '';
    
    // Remove extension
    const nameWithoutExt = filename.split('.')[0];
    
    // Replace dashes and underscores with spaces
    const formatted = nameWithoutExt
      .replace(/[-_]/g, ' ')
      .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
      .trim();
    
    // Capitalize first letter of each word
    return formatted
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (error) {
    return 'Image';
  }
}

export default OptimizedImage; 