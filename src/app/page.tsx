import Hero from '@/components/sections/hero';
import SkillsGrid from '@/components/sections/skills-grid';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SkillsGrid />
      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-[#5b4039]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
            Prêt à <span className="text-[#ffb5a0] italic">scaler</span> votre infrastructure ?
          </h2>
          <p className="text-[#e4beb4] mb-12 text-lg">
            Disponible pour de nouvelles collaborations techniques ou des consultations en architecture backend.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-6 border-2 border-[#ffb5a0] text-[#ffb5a0] font-bold uppercase tracking-[0.3em] hover:bg-[#ffb5a0] hover:text-[#5f1500] transition-all duration-300 active:scale-95"
          >
            Envoyer un Manifeste
          </Link>
        </div>
      </section>
    </>
  );
}
