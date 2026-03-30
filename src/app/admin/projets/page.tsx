import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';
import ProjectsClient from './projects-client';

export const revalidate = 0;

export default async function AdminProjetsPage() {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return <ProjectsClient projects={(data as Project[]) ?? []} />;
}
