import { supabase } from '@/lib/supabase';
import StatsCard from '@/components/admin/stats-card';

export const revalidate = 0;

async function getAnalytics() {
  const today = new Date().toISOString().split('T')[0];
  const firstOfMonth = today.slice(0, 7) + '-01';

  const [{ data: todayData }, { data: monthData }, { data: totalData }] = await Promise.all([
    supabase.from('analytics').select('views').eq('day', today).single(),
    supabase.from('analytics').select('views').gte('day', firstOfMonth),
    supabase.from('analytics').select('views'),
  ]);

  const todayViews = todayData?.views ?? 0;
  const monthViews = (monthData ?? []).reduce((s: number, r: { views: number }) => s + r.views, 0);
  const totalViews = (totalData ?? []).reduce((s: number, r: { views: number }) => s + r.views, 0);

  return { todayViews, monthViews, totalViews };
}

async function getCounts() {
  const [{ count: projects }, { count: experiences }, { count: messages }, { count: pending }] =
    await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('experiences').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      supabase.from('service_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);
  return { projects: projects ?? 0, experiences: experiences ?? 0, messages: messages ?? 0, pending: pending ?? 0 };
}

export default async function AdminDashboard() {
  const [analytics, counts] = await Promise.all([getAnalytics(), getCounts()]);

  return (
    <div>
      <div className="mb-10">
        <span className="font-['Space_Grotesk'] text-[#ff5722] text-xs tracking-[0.3em] uppercase block mb-1">
          Admin
        </span>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold uppercase tracking-tighter">
          Dashboard
        </h1>
      </div>

      <section className="mb-10">
        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4">Visites</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard label="Aujourd'hui" value={analytics.todayViews} icon="today" sub="vues ce jour" />
          <StatsCard label="Ce mois" value={analytics.monthViews} icon="calendar_month" sub="vues ce mois" />
          <StatsCard label="Total" value={analytics.totalViews} icon="bar_chart" sub="vues cumulées" />
        </div>
      </section>

      <section>
        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4">Contenu</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatsCard label="Projets" value={counts.projects} icon="code" />
          <StatsCard label="Expériences" value={counts.experiences} icon="timeline" />
          <StatsCard label="Messages" value={counts.messages} icon="mail" />
          <StatsCard label="Demandes en attente" value={counts.pending} icon="pending_actions" sub="à traiter" />
        </div>
      </section>
    </div>
  );
}
