import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/types';
import AvisClient from './avis-client';

export const revalidate = 0;

export default async function AdminAvisPage() {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('is_visible', { ascending: false });

  return <AvisClient testimonials={(data as Testimonial[]) ?? []} />;
}
