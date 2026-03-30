import { supabase } from '@/lib/supabase';
import { getExperiences } from '@/lib/utils';
import type { Project } from '@/types';
import WorkView from '@/components/sections/work-view';

export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  console.log('[Projets] 📥 Chargement des projets depuis Supabase...');
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[Projets] ❌ Supabase erreur →', error.message);
    return [];
  }
  console.log('[Projets] ✅', data?.length ?? 0, 'projets chargés');
  return data as Project[];
}

export default async function ProjetsPage() {
  const [projects, experiences] = await Promise.all([getProjects(), getExperiences()]);

  return (
    <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto">
      <WorkView projects={projects} experiences={experiences} />
    </div>
  );
}
