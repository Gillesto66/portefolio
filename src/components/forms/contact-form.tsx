'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    console.log('[ContactForm] 📤 Envoi du message...', { name: form.name, contact: form.contact });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error('[ContactForm] ❌ Réponse API →', res.status, err);
        throw new Error();
      }
      console.log('[ContactForm] ✅ Message envoyé avec succès');
      setStatus('success');
      setForm({ name: '', contact: '', message: '' });
    } catch {
      console.error('[ContactForm] ❌ Échec de l\'envoi');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-8 space-y-8">
      <div className="space-y-1">
        <label className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ff5722]">Nom complet</label>
        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="JEAN DUPONT"
          className="w-full bg-transparent border-0 border-b border-[#5b4039]/30 focus:outline-none focus:border-[#ff5722] text-sm py-2 placeholder:text-[#e4beb4]/20 transition-colors" />
      </div>
      <div className="space-y-1">
        <label className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ff5722]">Email professionnel</label>
        <input type="email" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })}
          placeholder="JEAN@SOCIETE.FR"
          className="w-full bg-transparent border-0 border-b border-[#5b4039]/30 focus:outline-none focus:border-[#ff5722] text-sm py-2 placeholder:text-[#e4beb4]/20 transition-colors" />
      </div>
      <div className="space-y-1">
        <label className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ff5722]">Message</label>
        <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="DÉCRIVEZ VOTRE BESOIN..."
          className="w-full bg-transparent border-0 border-b border-[#5b4039]/30 focus:outline-none focus:border-[#ff5722] text-sm py-2 placeholder:text-[#e4beb4]/20 resize-none transition-colors" />
      </div>
      {status === 'success' && <p className="text-[#ffb5a0] text-xs uppercase tracking-widest font-['Space_Grotesk']">Message transmis avec succès.</p>}
      {status === 'error' && <p className="text-[#ffb4ab] text-xs uppercase tracking-widest font-['Space_Grotesk']">Erreur lors de l&apos;envoi. Réessayez.</p>}
      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-[#ff5722] text-[#541200] py-4 font-['Space_Grotesk'] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 group active:scale-95 transition-all disabled:opacity-60">
        {status === 'loading' ? 'ENVOI...' : 'TRANSMETTRE'}
        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
      </button>
    </form>
  );
}
