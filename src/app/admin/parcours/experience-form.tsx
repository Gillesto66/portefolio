'use client';

import { useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';
import type { Experience } from '@/types';

interface Props {
  experience: Experience | null;
  onClose: () => void;
  onSaved: (exp: Experience, isNew: boolean) => void;
}

export default function ExperienceForm({ experience, onClose, onSaved }: Props) {
  const isNew = !experience;
  const [form, setForm] = useState({
    title: experience?.title ?? '',
    organization: experience?.organization ?? '',
    period: experience?.period ?? '',
    category: experience?.category ?? 'tech',
    description: experience?.description ?? '',
    skills_demonstrated: experience?.skills_demonstrated?.join(', ') ?? '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createSupabaseBrowser();
    const payload = {
      title: form.title,
      organization: form.organization,
      period: form.period,
      category: form.category as Experience['category'],
      description: form.description,
      skills_demonstrated: form.skills_demonstrated.split(',').map((s) => s.trim()).filter(Boolean),
    };

    if (isNew) {
      const { data, error: err } = await supabase.from('experiences').insert(payload).select().single();
      if (err) { setError(err.message); setLoading(false); return; }
      onSaved(data as Experience, true);
    } else {
      const { data, error: err } = await supabase.from('experiences').update(payload).eq('id', experience.id).select().single();
      if (err) { setError(err.message); setLoading(false); return; }
      onSaved(data as Experience, false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0e0e0e] border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-['Space_Grotesk'] font-bold uppercase tracking-tight">
            {isNew ? 'Nouvelle expérience' : 'Modifier'}
          </h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            { key: 'title', label: 'Titre *', required: true },
            { key: 'organization', label: 'Organisation *', required: true },
            { key: 'period', label: 'Période * (ex: 2023 — Présent)', required: true },
            { key: 'skills_demonstrated', label: 'Compétences (séparées par virgule)' },
          ].map(({ key, label, required }) => (
            <div key={key}>
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-['Space_Grotesk'] block mb-1">{label}</label>
              <input
                type="text"
                value={(form as Record<string, string>)[key]}
                onChange={(e) => set(key, e.target.value)}
                required={required}
                className="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white/80 outline-none focus:border-[#ff5722] transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/30 font-['Space_Grotesk'] block mb-1">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              required
              rows={3}
              className="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white/80 outline-none focus:border-[#ff5722] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/30 font-['Space_Grotesk'] block mb-1">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white/80 outline-none"
            >
              <option value="tech">Engineering</option>
              <option value="leadership">Leadership</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-[10px] uppercase tracking-widest">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-white/10 py-2.5 text-xs font-['Space_Grotesk'] uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors">
              Annuler
            </button>
            <button type="submit" disabled={loading} className="flex-1 bg-[#ff5722] text-[#541200] py-2.5 text-xs font-['Space_Grotesk'] font-bold uppercase tracking-widest hover:bg-[#ffb5a0] transition-colors disabled:opacity-50">
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
