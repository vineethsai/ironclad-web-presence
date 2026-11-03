import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { PageHeader } from '@/components/motion';
import { profile } from '@/content/profile';

/** Standard inner page: metadata, navbar, animated header, content area, footer. */
const PageShell: React.FC<{
  /** Short page name; the browser title becomes "<metaTitle> | Vineeth Sai Narajala". */
  metaTitle: string;
  description: string;
  path: string;
  kicker: string;
  title: string;
  subtitle?: string;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
}> = ({ metaTitle, description, path, kicker, title, subtitle, headerExtra, children }) => {
  const fullTitle = `${metaTitle} | ${profile.name}`;
  const url = `${profile.siteUrl}${path}`;
  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>{fullTitle}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={fullTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <link rel="canonical" href={url} />
        </Helmet>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <PageHeader kicker={kicker} title={title} subtitle={subtitle}>
            {headerExtra}
          </PageHeader>
          <section className="pt-10 pb-20 bg-cyber-darker relative overflow-hidden">
            <div className="absolute inset-0 bg-grid" />
            <div className="container mx-auto px-4 relative z-10">{children}</div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default PageShell;
