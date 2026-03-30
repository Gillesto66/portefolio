import { supabase } from '@/lib/supabase';
import type { Experience } from '@/types';
import ParcoursClient from './parcours-client';

export const revalidate = 0;

export default async function AdminParcoursPage() {
  const { data } = await supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });

  return <ParcoursClient experiences={(data as Experience[]) ?? []} />;
}
