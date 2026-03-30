'use client';

import { useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';
import type { Testimonial } from '@/types';

export default function AvisClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [data, setData] = useState(testimonials);

  async function toggleVisible(id: string, current: boolean) {
    const supabase = createSupabaseBrowser();
    const { error } = await supabase
      .from('testimonials')
      .update({ is_visible: !current })
      .eq('id', id);
    if (!error) {
      setData((prev) => prev.map((t) => (t.id === id ? { ...t, is_visible: !current } : t)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet avis ?')) return;
    const supabase = createSupabaseBrowser();
    await supabase.from('testimonials').delete().eq('id', id);
    setData((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="mb-8">
        <span className="font-['Space_Grotesk'] text-[#ff5722] text-xs tracking-[0.3em] uppercase block mb-1">Admin</span>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold uppercase tracking-tighter">Avis clients</h1>
        <p className="text-white/30 text-xs mt-2 uppercase tracking-widest">
          {data.filter((t) => t.is_visible).length} approuvé(s) · {data.filter((t) => !t.is_visible).length} en attente
        </p>
      </div>

      <div className="space-y-3">
        {data.map((t) => (
          <div
            key={t.id}
            className={`bg-[#0e0e0e] border p-5 flex items-start gap-4 transition-colors ${
              t.is_visible ? 'border-white/10' : 'border-white/5 opacity-60'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-['Space_Grotesk'] font-bold text-sm uppercase tracking-tight">
                  {t.author_name}
                </span>
                {t.author_role && (
                  <span className="text-white/30 text-[10px] uppercase tracking-widest">{t.author_role}</span>
                )}
                <span className="ml-auto text-[#ff5722] text-xs font-bold">
                  {'★'.repeat(Math.round(t.rating))} {t.rating}
                </span>
              </div>
              {t.content && (
                <p className="text-white/50 text-xs leading-relaxed">{t.content}</p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Toggle visibilité */}
              <button
                onClick={() => toggleVisible(t.id, t.is_visible)}
                title={t.is_visible ? 'Masquer' : 'Approuver'}
                className={`flex items-center gap-1.5 px-3 py-1.5 border text-[9px] uppercase tracking-widest font-['Space_Grotesk'] font-bold transition-colors ${
                  t.is_visible
                    ? 'border-[#ff5722] text-[#ff5722] hover:bg-[#ff5722]/10'
                    : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white/60'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {t.is_visible ? 'visibility' : 'visibility_off'}
                </span>
                {t.is_visible ? 'Visible' : 'Masqué'}
              </button>

              <button
                onClick={() => handleDelete(t.id)}
                className="p-1.5 text-white/20 hover:text-red-400 transition-colors"
                title="Supprimer"
              >
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-20 text-white/20">
            <span className="material-symbols-outlined text-5xl block mb-3">reviews</span>
            <p className="font-['Space_Grotesk'] uppercase tracking-widest text-xs">Aucun avis reçu</p>
          </div>
        )}
      </div>
    </div>
  );
}
