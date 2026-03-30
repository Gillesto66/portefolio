'use client';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Laravel', level: 95 },
  { name: 'Node.js', level: 80 },
  { name: 'Next.js', level: 75 },
];

const timeline = [
  {
    period: '2023 — Présent',
    title: 'Architecte Backend Freelance',
    desc: "Lead développeur sur des infrastructures Laravel & Supabase. Optimisation de pipelines CI/CD et gestion de bases de données distribuées pour clients fintech.",
    tags: ['LARAVEL', 'POSTGRESQL', 'DOCKER'],
    active: true,
  },
  {
    period: '2021 — 2026',
    title: 'Étudiant en Génie Informatique et Télécommunication',
    desc: "Spécialisation Backend & Systèmes à l'EPAC. Développement de solutions d'automatisation interne et architecture de services web scalables.",
    tags: ['NODE.JS', 'LINUX', 'PYTHON'],
    active: false,
  },
  {
    period: '2022 — Présent',
    title: 'Co-fondateur — AGC Space',
    desc: "Conception et déploiement de l'infrastructure technique de la startup. Gestion des systèmes d'information et automatisation des workflows internes.",
    tags: ['N8N', 'SUPABASE', 'NEXT.JS','FLUTTER'],
    active: true,
  },
];

export default function SkillsGrid() {
  return (
    <section className="py-24 bg-[#0e0e0e] px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16">
        <div className="md:col-span-7">
          <h2 className="font-['Space_Grotesk'] text-3xl font-bold uppercase tracking-tighter mb-12 flex items-center gap-4">
            <span className="text-[#ffb5a0]">01.</span> Parcours &amp; Expériences
          </h2>
          <div className="relative pl-8 border-l border-[#5b4039]/20 space-y-16">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className={`absolute -left-[36.5px] top-1 w-4 h-4 flex items-center justify-center ${item.active ? 'bg-[#ffb5a0]' : 'bg-[#5b4039]/50'}`}>
                  <div className={`w-2 h-2 ${item.active ? 'bg-[#5f1500]' : 'bg-[#0e0e0e]'}`} />
                </div>
                <span className={`font-['Space_Grotesk'] text-xs font-bold uppercase tracking-widest block mb-2 ${item.active ? 'text-[#ffb5a0]' : 'text-[#e4beb4]'}`}>
                  {item.period}
                </span>
                <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-2 uppercase">{item.title}</h3>
                <p className="text-[#e4beb4] leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-1 bg-[#2a2a2a] text-[10px] font-bold uppercase tracking-wider ${item.active ? 'text-[#ffb5a0]' : 'text-[#e4beb4]'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 space-y-12">
          <h2 className="font-['Space_Grotesk'] text-3xl font-bold uppercase tracking-tighter mb-12 flex items-center gap-4">
            <span className="text-[#ffb5a0]">02.</span> Stack Technique
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 p-6 bg-[#1c1b1b] border-b-2 border-[#ffb5a0]"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined text-[#ffb5a0] text-3xl">terminal</span>
                <span className="font-['Space_Grotesk'] text-[10px] font-bold uppercase tracking-widest opacity-40">Core</span>
              </div>
              <h4 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-4">Backend Development</h4>
              <div className="space-y-3">
                {skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between items-center text-sm font-['Space_Grotesk'] mb-1">
                      <span>{s.name}</span>
                      <span className="text-[#ffb5a0]">{s.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-[#2a2a2a]">
                      <motion.div
                        className="h-full bg-[#ffb5a0]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-6 bg-[#1c1b1b] hover:bg-[#2a2a2a] transition-colors"
            >
              <span className="material-symbols-outlined text-[#ffb5a0] mb-4 block">database</span>
              <h4 className="font-['Space_Grotesk'] text-sm font-bold uppercase">Database</h4>
              <p className="text-[10px] text-[#e4beb4] mt-2 uppercase tracking-tighter leading-tight">Supabase / Postgres / Redis</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-6 bg-[#1c1b1b] hover:bg-[#2a2a2a] transition-colors"
            >
              <span className="material-symbols-outlined text-[#ffb5a0] mb-4 block">smart_toy</span>
              <h4 className="font-['Space_Grotesk'] text-sm font-bold uppercase">Auto &amp; AI</h4>
              <p className="text-[10px] text-[#e4beb4] mt-2 uppercase tracking-tighter leading-tight">n8n / Python / OpenAI API</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 p-6 bg-[#ff5722] text-[#541200]"
            >
              <h4 className="font-['Space_Grotesk'] text-xl font-bold uppercase mb-2">Compétences Transverses</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-widest mt-4">
                {['Agile / Scrum', 'Project Management', 'System Design'].map((c) => (
                  <span key={c} className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
