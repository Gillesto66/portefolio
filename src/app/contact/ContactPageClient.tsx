'use client';
import { useState } from 'react';
import ContactForm from '@/components/forms/contact-form';
import ServiceForm from '@/components/forms/service-form';
import type { Testimonial } from '@/types';

const expertises = [
  { icon: 'smart_toy', label: 'Agents IA\nAutonomes', active: true },
  { icon: 'settings_input_component', label: 'Workflow\nAutomation', active: false },
  { icon: 'monitoring', label: 'Audit de\nSécurité', active: false },
];

export default function ContactPageClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [tab, setTab] = useState<'message' | 'service'>('message');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <div className="technical-grid min-h-screen pb-24">
      <main className="pt-24 px-6 max-w-md mx-auto space-y-12">
        {/* Hero */}
        <section className="space-y-4">
          <h1 className="font-['Space_Grotesk'] text-5xl font-extrabold uppercase tracking-tighter leading-none">
            <span className="block">CONTACT</span>
            <span className="block text-[#ff5722]">&amp; SERVICES</span>
          </h1>
          <p className="text-[#e4beb4]/60 text-sm leading-relaxed max-w-[280px] uppercase tracking-wider">
            Concevoir l&apos;infrastructure de vos ambitions numériques.
          </p>
        </section>

        {/* Form Card */}
        <section className="bg-[#0e0e0e] border border-[#5b4039]/15 p-1 relative overflow-hidden">
          {/* Toggle */}
          <div className="flex bg-[#1c1b1b] p-1 mb-8">
            <button
              onClick={() => setTab('message')}
              className={`flex-1 py-3 text-[10px] font-['Space_Grotesk'] font-bold uppercase tracking-widest transition-all ${
                tab === 'message' ? 'bg-[#ff5722] text-[#541200]' : 'text-[#e4beb4]/40 hover:text-[#e5e2e1]'
              }`}
            >
              Envoyer un Message
            </button>
            <button
              onClick={() => setTab('service')}
              className={`flex-1 py-3 text-[10px] font-['Space_Grotesk'] font-bold uppercase tracking-widest transition-all ${
                tab === 'service' ? 'bg-[#ff5722] text-[#541200]' : 'text-[#e4beb4]/40 hover:text-[#e5e2e1]'
              }`}
            >
              Demander un Service
            </button>
          </div>

          {tab === 'message' ? <ContactForm /> : <ServiceForm />}
        </section>

        {/* Expertises */}
        <section className="space-y-6">
          <h3 className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.4em] text-[#e4beb4]/40">
            Expertises disponibles
          </h3>
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4">
            {expertises.map((e, i) => (
              <div
                key={i}
                className={`min-w-[160px] bg-[#1c1b1b] p-6 space-y-4 border-l-2 ${e.active ? 'border-[#ff5722]' : 'border-[#5b4039]/20'}`}
              >
                <span className={`material-symbols-outlined ${e.active ? 'text-[#ff5722]' : 'text-[#e4beb4]/40'}`}>{e.icon}</span>
                <p className="font-['Space_Grotesk'] text-xs font-bold uppercase leading-tight whitespace-pre-line">{e.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="space-y-6 pt-12 pb-20">
            <div className="flex items-center gap-4">
              <h3 className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.4em] text-[#e4beb4]/40 whitespace-nowrap">
                Retours d&apos;expérience
              </h3>
              <div className="h-[1px] w-full bg-[#5b4039]/20" />
            </div>
            <div className="relative bg-[#0e0e0e] p-8 border border-[#5b4039]/10">
              <span className="material-symbols-outlined text-4xl text-[#ffb5a0]/10 absolute top-4 left-4">format_quote</span>
              <div className="space-y-6 relative z-10">
                <p className="text-sm italic leading-relaxed text-[#e5e2e1]/80">
                  &ldquo;{testimonials[testimonialIdx].content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2a2a2a] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#ffb5a0]">person</span>
                  </div>
                  <div>
                    <p className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-widest">
                      {testimonials[testimonialIdx].author_name}
                    </p>
                    <p className="text-[9px] text-[#ff5722] uppercase tracking-tighter">
                      {testimonials[testimonialIdx].author_role}
                    </p>
                  </div>
                </div>
              </div>
              {testimonials.length > 1 && (
                <div className="flex gap-1 mt-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIdx(i)}
                      className={`h-1 transition-all ${i === testimonialIdx ? 'w-8 bg-[#ff5722]' : 'w-4 bg-[#5b4039]/30'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
