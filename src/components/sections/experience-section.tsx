'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ExperienceCard from './experience-card';
import type { Experience } from '@/types';

const VIEWS = [
  { key: 'tech', label: 'Engineering' },
  { key: 'leadership', label: 'Leadership' },
] as const;

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const [view, setView] = useState<'tech' | 'leadership'>('tech');

  const filtered = experiences.filter((e) => e.category === view);

  return (
    <div>
      {/* Switcher */}
      <div className="flex gap-0 mb-10 border border-white/10 w-fit">
        {VIEWS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-5 py-2 font-['Space_Grotesk'] text-[10px] uppercase tracking-widest transition-colors ${
              view === key
                ? 'bg-[#ff5722] text-[#541200]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Liste animée */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
          {filtered.length > 0 ? (
            filtered.map((exp) => <ExperienceCard key={exp.id} experience={exp} />)
          ) : (
            <p className="text-white/30 text-xs uppercase tracking-widest py-12 text-center">
              Aucune expérience dans cette catégorie.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
