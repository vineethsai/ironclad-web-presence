import React from 'react';
import { Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full w-10 h-10 border transition-all duration-300 bg-cyber-dark/80 border-cyber-green/20 hover:bg-cyber-dark/90 hover:border-cyber-green/50"
      aria-label="Dark Mode Enabled"
      disabled
    >
      <Moon className="h-[1.2rem] w-[1.2rem] text-cyber-green" />
    </Button>
  );
};

export default ThemeToggle; 