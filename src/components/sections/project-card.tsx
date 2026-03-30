import Link from 'next/link';
import type { Project } from '@/types';

export default function ProjectCard({ project }: { project: Project }) {
  const isPublic = project.privacy === 'public';

  return (
    <article className={`bg-[#0e0e0e] ${isPublic ? 'border-l-2 border-[#ff5722]' : 'border border-white/5'} group`}>
      {isPublic ? (
        <div className="relative h-48 overflow-hidden bg-[#201f1f]">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.name}
              className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white/10 text-6xl">code</span>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-[#0e0e0e]/80 backdrop-blur px-3 py-1 border border-white/5">
            <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#ff5722]">Public</span>
          </div>
        </div>
      ) : (
        <div className="p-6 pb-0">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-white/20 text-4xl">business_center</span>
            <div className="bg-black/40 px-2 py-1 flex items-center gap-2 border border-white/10">
              <span className="material-symbols-outlined text-[12px] text-[#ffb5a0]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#ffb5a0]">Privé</span>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="font-['Space_Grotesk'] text-2xl font-bold uppercase tracking-tight mb-2">{project.name}</h3>
        <p className="text-white/50 text-xs mb-6 font-['Inter'] leading-relaxed">{project.description}</p>

        {project.technos?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technos.map((t) => (
              <span key={t} className="px-2 py-1 bg-[#2a2a2a] text-[10px] font-bold uppercase tracking-wider text-[#ffb5a0]">{t}</span>
            ))}
          </div>
        )}

        {isPublic && project.link ? (
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#ff5722] text-[#541200] px-5 py-3 font-['Space_Grotesk'] font-bold uppercase text-xs tracking-widest hover:bg-[#ffb5a0] transition-colors"
          >
            Lien Direct
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </Link>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-3 border border-white/10 py-4 hover:bg-white/5 transition-colors group/btn cursor-not-allowed opacity-60"
          >
            <span className="material-symbols-outlined text-[#ffb5a0]">description</span>
            <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">Confidentiel</span>
          </button>
        )}
      </div>
    </article>
  );
}
