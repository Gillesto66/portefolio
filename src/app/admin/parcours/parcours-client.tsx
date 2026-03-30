'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable, { type Column } from '@/components/admin/data-table';
import type { Experience } from '@/types';
import { createSupabaseBrowser } from '@/lib/supabase-browser';
import ExperienceForm from './experience-form';

const columns: Column<Experience>[] = [
  { key: 'title', label: 'Titre' },
  { key: 'organization', label: 'Organisation' },
  { key: 'period', label: 'Période' },
  {
    key: 'category',
    label: 'Catégorie',
    render: (r) => (
      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-widest border ${r.category === 'tech' ? 'border-[#ff5722] text-[#ff5722]' : 'border-white/10 text-white/40'}`}>
        {r.category}
      </span>
    ),
  },
];

export default function ParcoursClient({ experiences }: { experiences: Experience[] }) {
  const router = useRouter();
  const [data, setData] = useState(experiences);
  const [editing, setEditing] = useState<Experience | null | 'new'>(null);

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette expérience ?')) return;
    const supabase = createSupabaseBrowser();
    await supabase.from('experiences').delete().eq('id', id);
    setData((prev) => prev.filter((e) => e.id !== id));
  }

  function handleSaved(exp: Experience, isNew: boolean) {
    if (isNew) setData((prev) => [exp, ...prev]);
    else setData((prev) => prev.map((e) => (e.id === exp.id ? exp : e)));
    setEditing(null);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-['Space_Grotesk'] text-[#ff5722] text-xs tracking-[0.3em] uppercase block mb-1">Admin</span>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold uppercase tracking-tighter">Parcours</h1>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="flex items-center gap-2 bg-[#ff5722] text-[#541200] px-5 py-2.5 font-['Space_Grotesk'] font-bold uppercase text-xs tracking-widest hover:bg-[#ffb5a0] transition-colors"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Nouvelle expérience
        </button>
      </div>

      <div className="bg-[#0e0e0e] border border-white/5 p-6">
        <DataTable
          columns={columns}
          data={data}
          searchKey="title"
          onEdit={(row) => setEditing(row)}
          onDelete={handleDelete}
        />
      </div>

      {editing !== null && (
        <ExperienceForm
          experience={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
