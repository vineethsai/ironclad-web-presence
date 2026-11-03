import React, { useState } from 'react';
import { Youtube } from '@/components/icons/BrandIcons';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';

const getYouTubeId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  return match ? match[1] : null;
};

/** "Watch" button that plays a YouTube video in a dialog (falls back to a plain link for other hosts). */
const VideoButton: React.FC<{ url: string; title: string; label?: string }> = ({ url, title, label = 'Watch' }) => {
  const [open, setOpen] = useState(false);
  const id = getYouTubeId(url);
  const className = 'inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm';

  if (!id) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        <Youtube className="h-4 w-4" aria-hidden="true" /> {label}
      </a>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <Youtube className="h-4 w-4" aria-hidden="true" /> {label}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="bg-cyber-dark/85 backdrop-blur-sm" />
        <DialogContent className="max-w-3xl bg-cyber-darker border border-cyber-green/30 p-0 overflow-hidden">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="aspect-video w-full">
            {open && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
          <div className="px-5 py-3 border-t border-cyber-green/15 flex items-center justify-between gap-3">
            <span className="text-sm text-gray-400 truncate">{title}</span>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-red-400 hover:text-red-300 shrink-0">
              Open on YouTube ↗
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoButton;
