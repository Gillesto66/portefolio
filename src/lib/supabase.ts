import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SECRET_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('[Supabase] ❌ Variables manquantes — SUPABASE_URL ou SUPABASE_SECRET_KEY non définies');
} else {
  console.log('[Supabase] ✅ Client initialisé →', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseKey);
