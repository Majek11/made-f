import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Image, Settings, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AdminOverview = () => {
  const [counts, setCounts] = useState({ news: 0, media: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [newsRes, mediaRes] = await Promise.all([
        supabase.from("news_items").select("id", { count: "exact", head: true }),
        supabase.from("media_uploads").select("id", { count: "exact", head: true }),
      ]);
      setCounts({ news: newsRes.count ?? 0, media: mediaRes.count ?? 0 });
    };
    fetchCounts();
  }, []);

  const STATS = [
    { label: "Total News Items", value: counts.news, icon: FileText, href: "/admin/newsroom", color: "bg-primary text-primary-foreground" },
    { label: "Media Files", value: counts.media, icon: Image, href: "/admin/media", color: "bg-accent text-foreground" },
  ];

  const QUICK_LINKS = [
    { label: "Edit Site Settings", desc: "Update logo, hero text and site name", href: "/admin/settings", icon: Settings },
    { label: "Manage Newsroom", desc: "Add or edit blogs, press releases, speeches and more", href: "/admin/newsroom", icon: FileText },
    { label: "Media Library", desc: "Upload and manage images across the site", href: "/admin/media", icon: Image },
    { label: "Social & Contact", desc: "Update social media links and contact details", href: "/admin/social", icon: TrendingUp },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="font-body text-muted-foreground mt-1">Welcome back. Manage your site content below.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <Link to={s.href} key={s.label} className={`rounded-2xl p-6 flex items-center gap-5 ${s.color} hover:opacity-90 transition-opacity`}>
              <Icon size={28} />
              <div>
                <p className="font-display text-3xl font-bold">{s.value}</p>
                <p className="font-body text-sm opacity-80">{s.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <h2 className="font-display text-xl font-bold text-foreground mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {QUICK_LINKS.map((q) => {
          const Icon = q.icon;
          return (
            <Link
              to={q.href}
              key={q.label}
              className="bg-card rounded-2xl border border-border p-6 flex gap-4 hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon size={18} />
              </div>
              <div>
                <p className="font-body font-semibold text-foreground text-sm">{q.label}</p>
                <p className="font-body text-muted-foreground text-xs mt-0.5">{q.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOverview;
