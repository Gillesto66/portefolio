import { supabase } from '@/lib/supabase';

export async function trackVisit(page: string = '/'): Promise<void> {
  console.log('[Analytics] 📊 Tracking visite →', page);
  const { error } = await supabase.rpc('increment_visit');
  if (error) {
    console.error('[Analytics] ❌ Erreur tracking →', error.message);
  }
}
