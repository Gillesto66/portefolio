'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/projets', label: 'Projets' },
  { href: '/contact', label: 'Services' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#131313]/70 backdrop-blur-xl">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ff5722]">terminal</span>
          <span className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-xl font-bold text-[#ff5722]">
            GILLES MEDENOU
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {links.slice(0, 2).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-['Space_Grotesk'] uppercase tracking-tighter transition-colors duration-300 ${
                pathname === l.href
                  ? 'text-[#ff5722] border-b-2 border-[#ff5722] pb-1'
                  : 'text-white/60 hover:text-[#ff5722]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-6 py-2 bg-[#ff5722] text-[#541200] font-bold uppercase tracking-widest text-xs hover:bg-[#ffb5a0] transition-all active:scale-95"
          >
            Contact
          </Link>
        </div>

        {/* Mobile bottom nav placeholder */}
        <button className="md:hidden text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 bg-[#0e0e0e]/80 backdrop-blur-lg border-t border-white/5 z-50 shadow-[0_-10px_30px_rgba(255,87,34,0.1)]">
        <Link href="/" className={`flex flex-col items-center ${pathname === '/' ? 'text-[#ff5722] font-bold' : 'text-white/40'}`}>
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Inter'] text-[10px] uppercase tracking-widest mt-1">Accueil</span>
        </Link>
        <Link href="/projets" className={`flex flex-col items-center ${pathname === '/projets' ? 'text-[#ff5722] font-bold' : 'text-white/40'}`}>
          <span className="material-symbols-outlined">code</span>
          <span className="font-['Inter'] text-[10px] uppercase tracking-widest mt-1">Projets</span>
        </Link>
        <Link href="/contact" className={`flex flex-col items-center ${pathname === '/contact' ? 'text-[#ff5722] font-bold' : 'text-white/40'}`}>
          <span className="material-symbols-outlined">terminal</span>
          <span className="font-['Inter'] text-[10px] uppercase tracking-widest mt-1">Services</span>
        </Link>
      </nav>
    </header>
  );
}
