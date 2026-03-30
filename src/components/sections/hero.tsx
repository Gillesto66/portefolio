'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function Hero() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCV = async () => {
    setDownloading(true);
    console.log('[Hero] 📥 Téléchargement du CV...');
    try {
      const res = await fetch('/api/cv');
      if (!res.ok) throw new Error('CV non disponible');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV_MEDENOU_Gilles.pdf';
      a.click();
      URL.revokeObjectURL(url);
      console.log('[Hero] ✅ CV téléchargé');
    } catch (err) {
      console.error('[Hero] ❌ Erreur téléchargement CV →', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden bg-[#131313]">
      {/* Particles background */}
      <ParticlesBackground />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(255,87,34,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 border border-[#5b4039]/30 bg-[#0e0e0e]"
        >
          <span className="w-2 h-2 bg-[#ff5722] animate-pulse inline-block" />
          <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.3em] text-[#ff5722]">
            System: Online
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-['Space_Grotesk'] text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-8"
        >
          Gilles{' '}
          <span className="text-transparent" style={{ WebkitTextStroke: '1px #ff5722' }}>
            MEDENOU
          </span>
          <br />
          <span className="text-[#ffb5a0] drop-shadow-[0_0_15px_rgba(255,87,34,0.4)]">Ingénieur GIT</span>
          <br />
          Architecte Backend
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-['Inter'] text-lg md:text-2xl text-[#e4beb4] max-w-2xl font-light leading-relaxed mb-12 border-l-4 border-[#ff5722] pl-6"
        >
          Conception d&apos;écosystèmes digitaux robustes et gestion centralisée des infrastructures.
          L&apos;architecture de l&apos;ombre au service de la performance visible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >

          <Link
            href="/projets"
            className="group relative px-8 py-4 bg-[#ff5722] text-[#541200] font-bold uppercase tracking-[0.2em] text-sm overflow-hidden transition-all active:scale-95"
          >
            <span className="relative z-10">Consulter les Projets</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <button
            onClick={handleDownloadCV}
            disabled={downloading}
            className="group px-8 py-4 border border-[#5b4039]/30 text-[#ffb5a0] font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#2a2a2a] transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-sm group-hover:translate-y-0.5 transition-transform">
              {downloading ? 'hourglass_empty' : 'download'}
            </span>
            {downloading ? 'Téléchargement...' : 'Télécharger mon CV'}
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#ffb5a0] to-transparent" />
      </div>
    </section>
  );
}
