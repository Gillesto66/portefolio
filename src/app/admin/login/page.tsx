'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createSupabaseBrowser();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Identifiants incorrects.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <span className="material-symbols-outlined text-[#ff5722] text-3xl block mb-4">terminal</span>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold uppercase tracking-tighter">
            Accès Admin
          </h1>
          <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">
            Zone restreinte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border border-white/10 flex items-center gap-3 px-4 py-3">
            <span className="material-symbols-outlined text-white/20 text-base">mail</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent flex-1 text-sm font-['Space_Grotesk'] text-white/80 placeholder:text-white/20 outline-none"
            />
          </div>

          <div className="border border-white/10 flex items-center gap-3 px-4 py-3">
            <span className="material-symbols-outlined text-white/20 text-base">lock</span>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent flex-1 text-sm font-['Space_Grotesk'] text-white/80 placeholder:text-white/20 outline-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-[10px] uppercase tracking-widest">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff5722] text-[#541200] py-3 font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs hover:bg-[#ffb5a0] transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Entrer'}
          </button>
        </form>
      </div>
    </div>
  );
}
