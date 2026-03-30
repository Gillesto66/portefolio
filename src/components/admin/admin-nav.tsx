'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/projets', label: 'Projets', icon: 'code' },
  { href: '/admin/parcours', label: 'Parcours', icon: 'timeline' },
  { href: '/admin/avis', label: 'Avis', icon: 'reviews' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <aside className="w-56 min-h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col">
      <div className="px-6 py-6 border-b border-white/5">
        <span className="font-['Space_Grotesk'] text-[#ff5722] text-xs uppercase tracking-[0.3em] block">
          Admin
        </span>
        <p className="font-['Space_Grotesk'] font-bold uppercase tracking-tight text-lg mt-1">
          Gilles M.
        </p>
      </div>

      <nav className="flex-1 py-6 space-y-1 px-3">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 font-['Space_Grotesk'] text-xs uppercase tracking-widest transition-colors ${
                active
                  ? 'bg-[#ff5722]/10 text-[#ff5722] border-l-2 border-[#ff5722]'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-white/30 hover:text-white/60 font-['Space_Grotesk'] text-xs uppercase tracking-widest transition-colors"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
