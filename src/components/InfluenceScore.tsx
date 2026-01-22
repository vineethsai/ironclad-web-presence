import React from 'react';
import { Badge } from '@/components/ui/badge';

interface InfluenceScoreProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const InfluenceScore: React.FC<InfluenceScoreProps> = ({ 
  score, 
  showLabel = true,
  size = 'md'
}) => {
  const getTier = (score: number): { label: string; color: string; bgColor: string } => {
    if (score >= 70) {
      return {
        label: 'High',
        color: 'text-cyber-green',
        bgColor: 'bg-cyber-green/20 border-cyber-green'
      };
    } else if (score >= 40) {
      return {
        label: 'Medium',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400/20 border-yellow-400'
      };
    } else {
      return {
        label: 'Low',
        color: 'text-gray-400',
        bgColor: 'bg-gray-400/20 border-gray-400'
      };
    }
  };

  const tier = getTier(score);
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="outline" 
        className={`${tier.bgColor} ${tier.color} ${sizeClasses[size]} border font-medium`}
      >
        {showLabel ? `${tier.label} (${score})` : score}
      </Badge>
    </div>
  );
};

export default InfluenceScore;
