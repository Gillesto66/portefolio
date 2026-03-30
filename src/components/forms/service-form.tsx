'use client';
import { useState, useEffect } from 'react';
import type { Service } from '@/types';

export default function ServiceForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({ client_name: '', client_contact: '', service_id: '', project_description: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    console.log('[ServiceForm] 📥 Chargement des services...');
    fetch('/api/service')
      .then((r) => r.json())
      .then((d) => {
        console.log('[ServiceForm] ✅', d.services?.length ?? 0, 'services chargés →', d.services?.map((s: Service) => s.label));
        setServices(d.services || []);
      })
      .catch((err) => console.error('[ServiceForm] ❌ Erreur chargement services →', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    console.log('[ServiceForm] 📤 Envoi de la demande...', { client_name: form.client_name, service_id: form.service_id });
    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error('[ServiceForm] ❌ Réponse API →', res.status, err);
        throw new Error();
      }
      console.log('[ServiceForm] ✅ Demande envoyée avec succès');
      setStatus('success');
      setForm({ client_name: '', client_contact: '', service_id: '', project_description: '' });
    } catch {
      console.error('[ServiceForm] ❌ Échec de l\'envoi');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-8 space-y-8">
      <div className="space-y-1">
        <label className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ff5722]">Nom / Entreprise</label>
        <input type="text" required value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })}
          placeholder="VOTRE NOM OU SOCIÉTÉ"
          className="w-full bg-transparent border-0 border-b border-[#5b4039]/30 focus:outline-none focus:border-[#ff5722] text-sm py-2 placeholder:text-[#e4beb4]/20 transition-colors" />
      </div>
      <div className="space-y-1">
        <label className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ff5722]">Contact (Email / Tél)</label>
        <input type="text" required value={form.client_contact} onChange={(e) => setForm({ ...form, client_contact: e.target.value })}
          placeholder="EMAIL OU NUMÉRO"
          className="w-full bg-transparent border-0 border-b border-[#5b4039]/30 focus:outline-none focus:border-[#ff5722] text-sm py-2 placeholder:text-[#e4beb4]/20 transition-colors" />
      </div>
      <div className="space-y-1">
        <label className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ff5722]">Service souhaité</label>
        <select required value={form.service_id} onChange={(e) => setForm({ ...form, service_id: e.target.value })}
          className="w-full bg-[#1c1b1b] border-0 border-b border-[#5b4039]/30 focus:outline-none focus:border-[#ff5722] text-sm py-2 text-[#e5e2e1] transition-colors">
          <option value="">SÉLECTIONNER UN SERVICE</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#ff5722]">Description du projet</label>
        <textarea required rows={4} value={form.project_description} onChange={(e) => setForm({ ...form, project_description: e.target.value })}
          placeholder="DÉCRIVEZ VOTRE PROJET..."
          className="w-full bg-transparent border-0 border-b border-[#5b4039]/30 focus:outline-none focus:border-[#ff5722] text-sm py-2 placeholder:text-[#e4beb4]/20 resize-none transition-colors" />
      </div>
      {status === 'success' && <p className="text-[#ffb5a0] text-xs uppercase tracking-widest font-['Space_Grotesk']">Demande enregistrée. Je vous contacte sous 48h.</p>}
      {status === 'error' && <p className="text-[#ffb4ab] text-xs uppercase tracking-widest font-['Space_Grotesk']">Erreur lors de l&apos;envoi. Réessayez.</p>}
      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-[#ff5722] text-[#541200] py-4 font-['Space_Grotesk'] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 group active:scale-95 transition-all disabled:opacity-60">
        {status === 'loading' ? 'ENVOI...' : 'SOUMETTRE LA DEMANDE'}
        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
      </button>
    </form>
  );
}
