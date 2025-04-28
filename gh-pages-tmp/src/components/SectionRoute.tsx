import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Index from '@/pages/Index';

interface SectionRouteProps {
  sectionId: string;
}

const SectionRoute: React.FC<SectionRouteProps> = ({ sectionId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the Index page and scroll to the section
    navigate('/', { replace: true });
    
    // Wait for a moment to ensure the Index page has mounted
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [navigate, sectionId]);

  return <Index />;
};

export default SectionRoute; 