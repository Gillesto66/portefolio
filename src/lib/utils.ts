import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '@/lib/supabase';
import type { Experience } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getExperiences(): Promise<Experience[]> {
  console.log('[Experiences] 📥 Chargement des expériences depuis Supabase...');
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('period', { ascending: false });
  if (error) {
    console.error('[Experiences] ❌ Supabase erreur →', error.message);
    return [];
  }
  console.log('[Experiences] ✅', data?.length ?? 0, 'expériences chargées');
  return data as Experience[];
}
