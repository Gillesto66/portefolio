interface StatsCardProps {
  label: string;
  value: number | string;
  icon: string;
  sub?: string;
}

export default function StatsCard({ label, value, icon, sub }: StatsCardProps) {
  return (
    <div className="bg-[#0e0e0e] border border-white/5 p-6">
      <div className="flex items-start justify-between mb-4">
        <span className="material-symbols-outlined text-[#ff5722] text-2xl">{icon}</span>
        <span className="text-[9px] uppercase tracking-widest text-white/20 font-['Space_Grotesk']">
          {label}
        </span>
      </div>
      <p className="font-['Space_Grotesk'] text-4xl font-bold tracking-tighter">{value}</p>
      {sub && <p className="text-white/30 text-[10px] uppercase tracking-widest mt-2">{sub}</p>}
    </div>
  );
}
