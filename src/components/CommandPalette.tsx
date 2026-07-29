import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Home, User, Briefcase, BookOpen, Mic, Newspaper, PenLine, Globe, TrendingUp,
  Mail, FileText, ExternalLink, Search,
} from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';
import type { Publication } from '@/types/citations';

const pages = [
  { name: 'Home', path: '/', icon: Home, keywords: 'index main' },
  { name: 'About', path: '/about', icon: User, keywords: 'bio who' },
  { name: 'Experience & Career', path: '/experience', icon: Briefcase, keywords: 'work jobs career history' },
  { name: 'Publications', path: '/publications', icon: BookOpen, keywords: 'papers research ieee' },
  { name: 'Speaking & Industry', path: '/speaking', icon: Mic, keywords: 'talks conferences presentations' },
  { name: 'Media', path: '/media', icon: Newspaper, keywords: 'press coverage podcasts' },
  { name: 'Blog', path: '/blog', icon: PenLine, keywords: 'articles writing posts' },
  { name: 'Citations (3D Globe)', path: '/citations', icon: Globe, keywords: 'research impact map globe' },
  { name: 'Research Impact', path: '/research-impact', icon: TrendingUp, keywords: 'analytics charts metrics' },
  { name: 'Contact', path: '/contact', icon: Mail, keywords: 'email reach connect' },
];

/** ⌘K / Ctrl+K fuzzy command palette. Blog posts & publications lazy-load on first open. */
const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onCustom = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onCustom);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onCustom);
    };
  }, []);

  // Lazy-load searchable content only when the palette is first opened
  useEffect(() => {
    if (!open || loaded) return;
    setLoaded(true);
    Promise.all([
      import('@/services/blogService').then((m) => m.getAllPosts()).catch(() => []),
      import('@/services/citationService').then((m) => m.getCitationData().publications).catch(() => []),
    ]).then(([p, pubs]) => {
      setPosts(p);
      setPublications(pubs);
    });
  }, [open, loaded]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const openExternal = (url: string) => {
    setOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="border border-cyber-green/25 bg-cyber-darker rounded-lg overflow-hidden">
        <CommandInput placeholder="Search pages, papers, posts…" className="text-gray-200" />
        <CommandList className="max-h-[420px]">
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-6 text-gray-400">
              <Search className="h-5 w-5 text-cyber-green/60" />
              <span>No results found.</span>
            </div>
          </CommandEmpty>

          <CommandGroup heading="Pages" className="[&_[cmdk-group-heading]]:text-cyber-green/70 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs">
            {pages.map((page) => (
              <CommandItem
                key={page.path}
                value={`${page.name} ${page.keywords}`}
                onSelect={() => go(page.path)}
                className="text-gray-300 aria-selected:bg-cyber-green/15 aria-selected:text-cyber-green-light"
              >
                <page.icon className="mr-2 h-4 w-4 text-cyber-green" />
                {page.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator className="bg-cyber-green/10" />

          {posts.length > 0 && (
            <CommandGroup heading="Blog Posts" className="[&_[cmdk-group-heading]]:text-cyber-green/70 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs">
              {posts.map((post) => (
                <CommandItem
                  key={post.id}
                  value={`${post.title} ${post.tags.join(' ')}`}
                  onSelect={() => go(`/blog/${post.id}`)}
                  className="text-gray-300 aria-selected:bg-cyber-green/15 aria-selected:text-cyber-green-light"
                >
                  <PenLine className="mr-2 h-4 w-4 text-cyber-green" />
                  <span className="truncate">{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {publications.length > 0 && (
            <>
              <CommandSeparator className="bg-cyber-green/10" />
              <CommandGroup heading="Publications" className="[&_[cmdk-group-heading]]:text-cyber-green/70 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs">
                {publications.map((pub) => (
                  <CommandItem
                    key={pub.title}
                    value={`${pub.title} ${pub.venue}`}
                    onSelect={() => (pub.link ? openExternal(pub.link) : go('/publications'))}
                    className="text-gray-300 aria-selected:bg-cyber-green/15 aria-selected:text-cyber-green-light"
                  >
                    <FileText className="mr-2 h-4 w-4 shrink-0 text-cyber-green" />
                    <span className="truncate flex-1">{pub.title}</span>
                    {pub.link && <ExternalLink className="ml-2 h-3 w-3 text-gray-500" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
        <div className="border-t border-cyber-green/15 px-4 py-2 flex items-center justify-between">
          <span className="text-[11px] font-mono text-gray-500">navigate with ↑↓ · select with ↵</span>
          <span className="text-[11px] font-mono text-cyber-green/60">⌘K</span>
        </div>
      </div>
    </CommandDialog>
  );
};

export default CommandPalette;
