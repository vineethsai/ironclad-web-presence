import React from 'react';
import { Shield } from 'lucide-react';

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Infinite horizontal ticker. Content is duplicated for a seamless loop. */
const Marquee: React.FC<MarqueeProps> = ({ items, className = '' }) => {
  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="font-mono text-sm tracking-[0.2em] uppercase text-gray-500 px-6 whitespace-nowrap">
            {item}
          </span>
          <Shield className="h-3.5 w-3.5 text-cyber-green/40 shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cyber-darker to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cyber-darker to-transparent pointer-events-none" />
    </div>
  );
};

export default Marquee;
