'use client';

import { useState } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';
import type { Project } from '@/types';

interface Props {
  project: Project | null;
  onClose: () => void;
  onSaved: (project: Project, isNew: boolean) => void;
}

export default function ProjectForm({ project, onClose, onSaved }: Props) {
  const isNew = !project;
  const [form, setForm] = useState({
    name: project?.name ?? '',
    description: project?.description ?? '',
    project_type: project?.project_type ?? 'lucratif',
    privacy: project?.privacy ?? 'public',
    link: project?.link ?? '',
    image_url: project?.image_url ?? '',
    technos: project?.technos?.join(', ') ?? '',
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
      name: form.name,
      description: form.description || null,
      project_type: form.project_type as Project['project_type'],
      privacy: form.privacy as Project['privacy'],
      link: form.link || null,
      image_url: form.image_url || null,
      technos: form.technos.split(',').map((t) => t.trim()).filter(Boolean),
    };

    if (isNew) {
      const { data, error: err } = await supabase.from('projects').insert(payload).select().single();
      if (err) { setError(err.message); setLoading(false); return; }
      onSaved(data as Project, true);
    } else {
      const { data, error: err } = await supabase.from('projects').update(payload).eq('id', project.id).select().single();
      if (err) { setError(err.message); setLoading(false); return; }
      onSaved(data as Project, false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0e0e0e] border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-['Space_Grotesk'] font-bold uppercase tracking-tight">
            {isNew ? 'Nouveau projet' : 'Modifier le projet'}
          </h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            { key: 'name', label: 'Nom *', type: 'text', required: true },
            { key: 'link', label: 'Lien', type: 'url' },
            { key: 'image_url', label: 'Image URL', type: 'url' },
            { key: 'technos', label: 'Stack (séparés par virgule)', type: 'text' },
          ].map(({ key, label, type, required }) => (
            <div key={key}>
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-['Space_Grotesk'] block mb-1">{label}</label>
              <input
                type={type}
                value={(form as Record<string, string>)[key]}
                onChange={(e) => set(key, e.target.value)}
                required={required}
                className="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white/80 outline-none focus:border-[#ff5722] transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/30 font-['Space_Grotesk'] block mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              className="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white/80 outline-none focus:border-[#ff5722] transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-['Space_Grotesk'] block mb-1">Type</label>
              <select
                value={form.project_type}
                onChange={(e) => set('project_type', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white/80 outline-none"
              >
                <option value="lucratif">Lucratif</option>
                <option value="non-lucratif">Non-lucratif</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-['Space_Grotesk'] block mb-1">Visibilité</label>
              <select
                value={form.privacy}
                onChange={(e) => set('privacy', e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white/80 outline-none"
              >
                <option value="public">Public</option>
                <option value="privé">Privé</option>
              </select>
            </div>
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
