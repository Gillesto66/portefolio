import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { trackVisit } from '@/lib/analytics';

export const metadata: Metadata = {
  title: 'Gilles MEDENOU | Architecte Backend',
  description: "Portfolio de Gilles MEDENOU — Ingénieur GIT & Architecte Backend. Conception d'écosystèmes digitaux robustes.",
  keywords: ['Gilles MEDENOU', 'Architecte Backend', 'Laravel', 'Supabase', 'Next.js', 'Freelance'],
  authors: [{ name: 'Gilles MEDENOU' }],
  openGraph: {
    title: 'Gilles MEDENOU | Architecte Backend',
    description: "Conception d'écosystèmes digitaux robustes et gestion centralisée des infrastructures.",
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Fire-and-forget: ne bloque pas le render
  trackVisit().catch((e) => console.error('[Analytics] ❌ trackVisit →', e));
  return (
    <html lang="fr" className="dark">
      <head>
        {/* Google Fonts chargées au runtime (pas au build) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-[#131313] text-[#e5e2e1]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
