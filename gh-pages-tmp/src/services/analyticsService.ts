import { useEffect, useState } from 'react';

/**
 * Interface for the analytics data
 */
export interface PageViewData {
  path: string;
  views: number;
}

/**
 * Cache for page views to minimize API calls
 */
const pageViewsCache: Record<string, number> = {};

/**
 * Fetches page view count for a specific path
 * @param path The page path to get view count for
 * @returns Promise with page view count
 */
export const getPageViews = async (path: string): Promise<number> => {
  // If we have cached data, return it
  if (pageViewsCache[path] !== undefined) {
    return pageViewsCache[path];
  }
  
  try {
    // Try to get data from Google Analytics API
    if (typeof window !== 'undefined' && window.gtag) {
      // In a real implementation, we would call the GA API here
      // For now, we'll use localStorage as a demo implementation
      
      // For demo purposes, increment view count in localStorage
      const storageKey = `pageViews-${path}`;
      const currentViews = localStorage.getItem(storageKey) 
        ? parseInt(localStorage.getItem(storageKey) || '0', 10)
        : Math.floor(Math.random() * 1000) + 50; // Start with a random number for demo
      
      const newViewCount = currentViews + 1;
      localStorage.setItem(storageKey, newViewCount.toString());
      
      // Cache the result
      pageViewsCache[path] = newViewCount;
      
      return newViewCount;
    }
    
    return 0;
  } catch (error) {
    console.error('Error fetching page views:', error);
    return 0;
  }
};

/**
 * React hook for getting page view data
 * @param path Page path to get view count for
 * @returns Object with page view data and loading state
 */
export const usePageViews = (path: string) => {
  const [pageViews, setPageViews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchPageViews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const views = await getPageViews(path);
        if (isMounted) {
          setPageViews(views);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in usePageViews hook:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    };
    
    fetchPageViews();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [path]);
  
  return { pageViews, loading, error };
};

// Add this to the global Window interface to use gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        page_path?: string;
        send_to?: string;
        [key: string]: any;
      }
    ) => void;
  }
} 