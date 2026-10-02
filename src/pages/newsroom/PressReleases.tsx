import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusData from "@/assets/focus-data.jpg";
import { Download, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewsItems } from "@/hooks/useNewsItems";

const STATIC_RELEASES = [
  { title: "MADE-F Launches 2025 Community Journalism Fellowship — Applications Now Open", date: "February 3, 2025", tag: "Fellowship", summary: "The Media Action and Development Foundation (MADE-F) is pleased to announce that applications for the 2025 Community Journalism Fellowship are now open. The programme will train 40 fellows across six geopolitical zones." },
  { title: "MADE-F and UNICEF Sign MOU to Expand Child-Rights Journalism Training", date: "January 14, 2025", tag: "Partnership", summary: "MADE-F and UNICEF Nigeria have signed a Memorandum of Understanding to jointly deliver a child-rights journalism training programme targeting 200 journalists across 15 states over two years." },
  { title: "MADE-F Hosts Inaugural Gender-Responsive Journalism Awards", date: "December 12, 2024", tag: "Event", summary: "MADE Foundation hosted the first-ever Gender-Responsive Journalism Awards in Abuja, recognising 10 journalists from across Nigeria for outstanding coverage of gender and social inclusion issues." },
  { title: "MADE-F Releases 2024 Annual Report — Impact Across 36 States", date: "November 20, 2024", tag: "Publication", summary: "MADE Foundation's 2024 Annual Report documents programme results across all six flagship initiatives, including 1,200+ beneficiaries, 36 states reached and 48 policy events convened." },
  { title: "MADE-F Secures Grant to Scale Youth Digital Leadership Programme", date: "October 8, 2024", tag: "Funding", summary: "MADE-F has received a significant grant from a leading international development organisation to scale the Youth Digital and Leadership Programme to six additional states in 2025." },
  { title: "Statement on the Role of Media in Combating Electoral Misinformation", date: "September 1, 2024", tag: "Statement", summary: "Ahead of upcoming state elections, MADE Foundation issues a statement calling on Nigerian media organisations to adopt editorial standards that protect the integrity of the electoral process." },
];

const TAG_COLORS: Record<string, string> = {
  Fellowship: "bg-primary/10 text-primary",
  Partnership: "bg-accent/20 text-foreground",
  Event: "bg-secondary text-secondary-foreground",
  Publication: "bg-muted text-muted-foreground",
  Funding: "bg-green-light text-primary",
  Statement: "bg-accent/10 text-foreground",
};

const PressReleases = () => {
  const { items, loading } = useNewsItems("press_release");
  const releases = items.length > 0 ? items : null;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusData})` }} />
        <div className="container mx-auto text-center relative">
          <span className="section-tag mb-6 inline-block">Newsroom</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            Press <em className="text-italic-accent">Releases</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Official communications from MADE Foundation — programme announcements, partnerships, reports and statements.
          </p>
          <p className="font-body text-primary-foreground/60 text-sm mt-4">
            Media enquiries: <span className="underline">media@madefoundation.org</span>
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-24"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : (
            <div className="space-y-5">
              {(releases ?? STATIC_RELEASES).map((release: any) => (
                <div
                  key={release.id ?? release.title}
                  className="bg-card rounded-3xl border border-border shadow-card p-8 hover-lift grid md:grid-cols-[1fr_auto] gap-6 items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {release.tag && (
                        <span className={`text-xs font-semibold rounded-full px-3 py-1 font-body ${TAG_COLORS[release.tag] || "bg-muted text-muted-foreground"}`}>
                          {release.tag}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                        <Calendar size={11} />
                        {release.date ?? new Date(release.published_at ?? release.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-snug">{release.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{release.summary ?? release.excerpt}</p>
                    {release.content && (
                      <div className="mt-4 prose prose-sm max-w-none font-body text-foreground/80 [&_a]:text-primary" dangerouslySetInnerHTML={{ __html: release.content }} />
                    )}
                  </div>
                  {release.external_url ? (
                    <a href={release.external_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors whitespace-nowrap">
                      <Download size={15} /> Download PDF
                    </a>
                  ) : (
                    <button className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors whitespace-nowrap">
                      <Download size={15} /> Download PDF
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="font-body text-muted-foreground mb-4">Need media assets or additional information?</p>
            <Link to="/contact" className="btn-primary">Contact Media Team <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default PressReleases;
