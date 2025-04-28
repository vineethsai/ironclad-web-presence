import React, { useEffect } from 'react';
import { usePageViews } from '../services/analyticsService';
import { useLocation } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';

interface ViewCounterProps {
  postId: string;
  className?: string;
  showLabel?: boolean;
}

const ViewCounter: React.FC<ViewCounterProps> = ({ 
  postId, 
  className = '',
  showLabel = true
}) => {
  const location = useLocation();
  const path = `/blog/${postId}`;
  const { pageViews, loading, error } = usePageViews(path);
  
  // Log page view to GA on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Track this page view in GA
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title,
        page_location: window.location.href,
        send_to: 'G-LJJ5BYLGDH'
      });
    }
  }, [path]);
  
  // Format view count for better readability
  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}m`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };
  
  if (loading) {
    return (
      <div className={`flex items-center text-sm text-muted-foreground ${className}`}>
        <Skeleton className="h-4 w-12" />
        {showLabel && <Skeleton className="ml-1 h-4 w-16" />}
      </div>
    );
  }
  
  if (error) {
    console.error('Error fetching view count:', error);
    return null;
  }
  
  return (
    <div className={`flex items-center text-sm text-muted-foreground ${className}`}>
      <span>{formatViewCount(pageViews)}</span>
      {showLabel && <span className="ml-1">view{pageViews !== 1 ? 's' : ''}</span>}
    </div>
  );
};

export default ViewCounter; 