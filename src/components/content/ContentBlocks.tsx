import React, { useId, useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** A titled panel that can be collapsed. Used by the Research, Speaking, Media, Writing, and Open Source pages. */
export const CollapsibleSection: React.FC<{
  id?: string;
  icon: LucideIcon;
  title: string;
  badge?: string;
  intro?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ id, icon: Icon, title, badge, intro, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section id={id} className="bg-cyber-grey rounded-lg overflow-hidden border border-cyber-green/20 scroll-mt-24">
      <h2 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full p-6 md:p-8 flex justify-between items-center gap-4 text-left cursor-pointer hover:bg-cyber-grey-light transition-colors duration-200"
        >
          <span className="flex flex-wrap items-center gap-3">
            <Icon className="h-6 w-6 text-cyber-green shrink-0" aria-hidden="true" />
            <span className="text-xl md:text-2xl font-bold text-white">{title}</span>
            {badge && (
              <span className="px-3 py-1 bg-cyber-green/20 rounded-full text-cyber-green text-sm font-normal">{badge}</span>
            )}
          </span>
          <span className="bg-cyber-darker rounded-full p-2 border border-cyber-green/20 shrink-0">
            <ChevronDown
              className={`h-5 w-5 text-cyber-green transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </span>
        </button>
      </h2>
      {open && (
        <div id={panelId} className="px-6 md:px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
          {intro && <p className="text-gray-300 mb-6">{intro}</p>}
          {children}
        </div>
      )}
    </section>
  );
};

export const Chip: React.FC<{ children: React.ReactNode; tone?: 'green' | 'muted' }> = ({ children, tone = 'green' }) => (
  <span
    className={
      tone === 'green'
        ? 'px-2.5 py-0.5 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-xs md:text-sm'
        : 'px-2 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400 text-xs'
    }
  >
    {children}
  </span>
);

export const ExternalButton: React.FC<{ href: string; children: React.ReactNode; variant?: 'solid' | 'ghost' }> = ({
  href,
  children,
  variant = 'solid',
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={
      variant === 'solid'
        ? 'inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyber-green/15 border border-cyber-green/40 text-cyber-green rounded text-sm hover:bg-cyber-green/25 transition-colors whitespace-nowrap'
        : 'inline-flex items-center gap-1.5 text-cyber-green hover:text-cyber-green-light underline-offset-4 hover:underline text-sm whitespace-nowrap'
    }
  >
    {children}
    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
  </a>
);

/** "Jun 2025" style date from an ISO date or year-month string; plain years pass through. */
export const formatMonth = (date: string): string => {
  if (/^\d{4}$/.test(date)) return date;
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
};
