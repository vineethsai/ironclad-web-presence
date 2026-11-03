import React from 'react';
import { Fingerprint, Wrench, Gauge, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, StaggerGroup, StaggerItem, SectionHeading, SpotlightCard, TiltCard } from '@/components/motion';
import { profile, focusAreas } from '@/content/profile';

const focusIcons = {
  identity: Fingerprint,
  tools: Wrench,
  scoring: Gauge,
  defense: ShieldCheck,
} as const;

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="glow-blob w-[30rem] h-[30rem] top-0 -left-40" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading kicker="01 · Who I Am" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start max-w-6xl mx-auto">
          <Reveal className="lg:col-span-2">
            <TiltCard maxTilt={5}>
              <div className="glass-card p-3 shadow-glow-sm">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/conference.jpg"
                    alt="Vineeth Sai Narajala speaking at a conference"
                    width={1600}
                    height={1067}
                    loading="lazy"
                    className="w-full h-auto rounded-lg transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal className="lg:col-span-3 space-y-5" delay={0.1}>
            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-lg text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 text-cyber-green hover:text-cyber-green-light transition-colors"
            >
              Full experience
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="max-w-6xl mx-auto mt-16">
          <Reveal>
            <h3 className="text-2xl font-bold text-white mb-6">What I work on</h3>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area) => {
              const Icon = focusIcons[area.key];
              return (
                <StaggerItem key={area.key}>
                  <SpotlightCard className="cyber-card h-full p-6 bg-cyber-dark/80 border-cyber-green/10">
                    <Icon className="h-9 w-9 text-cyber-green mb-4 transition-transform duration-300 group-hover/spotlight:scale-110" />
                    <h4 className="text-lg font-semibold text-white mb-2">{area.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{area.description}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
