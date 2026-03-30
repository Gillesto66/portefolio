import type { Experience } from '@/types';

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="border-l border-white/10 pl-5 py-1">
      <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#ff5722] block mb-1">
        {experience.period}
      </span>
      <h3 className="font-['Space_Grotesk'] text-lg font-bold uppercase tracking-tight leading-tight">
        {experience.title}
      </h3>
      <p className="text-white/40 text-[11px] uppercase tracking-widest mb-3">
        {experience.organization}
      </p>
      <p className="text-white/60 text-xs leading-relaxed mb-4">
        {experience.description}
      </p>
      {experience.skills_demonstrated?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {experience.skills_demonstrated.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-white/50"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
