'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import ProjectCard from './project-card';
import ExperienceSection from './experience-section';
import type { Project, Experience } from '@/types';

const TABS = [
  { key: 'projets', label: 'Projets' },
  { key: 'parcours', label: 'Expériences' },
] as const;

type Tab = (typeof TABS)[number]['key'];

const COPY: Record<Tab, { tag: string; title: string; sub: string; cta: string }> = {
  projets: {
    tag: 'Portfolio',
    title: 'Ingénierie de l\'ombre',
    sub: 'Des systèmes pensés pour durer. Architectures backend, pipelines robustes et logique métier sans compromis.',
    cta: 'Un projet en tête ? Parlons-en.',
  },
  parcours: {
    tag: 'Parcours',
    title: 'Ce qui m\'a forgé',
    sub: 'Chaque ligne de code, chaque équipe dirigée — une trace concrète d\'un profil qui construit autant qu\'il code.',
    cta: 'Ce profil vous intéresse ? Prenons contact.',
  },
};

interface Props {
  projects: Project[];
  experiences: Experience[];
}

export default function WorkView({ projects, experiences }: Props) {
  const [tab, setTab] = useState<Tab>('projets');
  const copy = COPY[tab];

  const publicProjects = projects.filter((p) => p.privacy === 'public');
  const privateProjects = projects.filter((p) => p.privacy === 'privé');

  return (
    <>
      {/* Header animé */}
      <AnimatePresence mode="wait">
        <motion.section
          key={tab + '-header'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mb-10"
        >
          <span className="font-['Space_Grotesk'] text-[#ff5722] text-xs tracking-[0.3em] uppercase block mb-2">
            {copy.tag}
          </span>
          <h1 className="font-['Space_Grotesk'] text-4xl font-bold uppercase tracking-tighter leading-none mb-4">
            {copy.title}
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-md">
            {copy.sub}
          </p>
        </motion.section>
      </AnimatePresence>

      {/* Switcher */}
      <div className="flex mb-10 border border-white/10 w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-6 py-2.5 font-['Space_Grotesk'] text-[10px] uppercase tracking-widest transition-colors ${
              tab === key
                ? 'bg-[#ff5722] text-[#541200]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contenu animé */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {tab === 'projets' ? (
            <div className="space-y-8">
              {publicProjects.length > 0 && (
                <div className="space-y-8">
                  {publicProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              )}

              {privateProjects.length > 0 && (
                <>
                  <div className="pt-8 pb-4 border-b border-white/5">
                    <h2 className="font-['Space_Grotesk'] text-lg font-bold uppercase tracking-[0.2em] text-[#ff5722]">
                      Business &amp; Logic
                    </h2>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">
                      Accès restreint • Études de cas internes
                    </p>
                  </div>
                  <div className="space-y-4">
                    {privateProjects.map((p) => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                </>
              )}

              {projects.length === 0 && (
                <div className="text-center py-24 text-white/30">
                  <span className="material-symbols-outlined text-6xl block mb-4">code_off</span>
                  <p className="font-['Space_Grotesk'] uppercase tracking-widest text-sm">
                    Projets en cours de chargement...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <ExperienceSection experiences={experiences} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* CTA bas de page */}
      <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-start gap-4">
        <p className="font-['Space_Grotesk'] text-white/40 text-xs uppercase tracking-[0.25em]">
          {copy.cta}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 border border-[#ff5722] text-[#ff5722] font-['Space_Grotesk'] font-bold uppercase text-xs tracking-widest hover:bg-[#ff5722] hover:text-[#541200] transition-all duration-300 active:scale-95 group"
        >
          Envoyer un signal
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_outward
          </span>
        </Link>
      </div>
    </>
  );
}
