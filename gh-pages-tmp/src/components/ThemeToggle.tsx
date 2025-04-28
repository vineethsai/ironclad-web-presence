import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className={`rounded-full w-10 h-10 border transition-all duration-300 ${
        isDark 
          ? 'bg-cyber-dark/80 border-cyber-green/20 hover:bg-cyber-dark/90 hover:border-cyber-green/50' 
          : 'bg-white/90 border-cyber-green/30 hover:bg-white hover:border-cyber-green/70 shadow-sm'
      }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={theme}
      >
        {isDark ? (
          <Sun className="h-[1.2rem] w-[1.2rem] text-cyber-green" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] text-cyber-green" />
        )}
      </motion.div>
    </Button>
  );
};

export default ThemeToggle; 