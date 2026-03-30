'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable, { type Column } from '@/components/admin/data-table';
import type { Project } from '@/types';
import { createSupabaseBrowser } from '@/lib/supabase-browser';
import ProjectForm from './project-form';

const columns: Column<Project>[] = [
  { key: 'name', label: 'Nom' },
  {
    key: 'privacy',
    label: 'Visibilité',
    render: (r) => (
      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-widest border ${r.privacy === 'public' ? 'border-[#ff5722] text-[#ff5722]' : 'border-white/10 text-white/40'}`}>
        {r.privacy}
      </span>
    ),
  },
  { key: 'project_type', label: 'Type' },
  {
    key: 'technos',
    label: 'Stack',
    render: (r) => <span className="text-white/40">{r.technos?.slice(0, 3).join(', ')}</span>,
  },
];

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [data, setData] = useState(projects);
  const [editing, setEditing] = useState<Project | null | 'new'>(null);

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce projet ?')) return;
    const supabase = createSupabaseBrowser();
    await supabase.from('projects').delete().eq('id', id);
    setData((prev) => prev.filter((p) => p.id !== id));
  }

  function handleSaved(project: Project, isNew: boolean) {
    if (isNew) setData((prev) => [project, ...prev]);
    else setData((prev) => prev.map((p) => (p.id === project.id ? project : p)));
    setEditing(null);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-['Space_Grotesk'] text-[#ff5722] text-xs tracking-[0.3em] uppercase block mb-1">Admin</span>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold uppercase tracking-tighter">Projets</h1>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="flex items-center gap-2 bg-[#ff5722] text-[#541200] px-5 py-2.5 font-['Space_Grotesk'] font-bold uppercase text-xs tracking-widest hover:bg-[#ffb5a0] transition-colors"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Nouveau
        </button>
      </div>

      <div className="bg-[#0e0e0e] border border-white/5 p-6">
        <DataTable
          columns={columns}
          data={data}
          searchKey="name"
          onEdit={(row) => setEditing(row)}
          onDelete={handleDelete}
        />
      </div>

      {editing !== null && (
        <ProjectForm
          project={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
