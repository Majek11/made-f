import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusMedia from "@/assets/focus-media.jpg";
import { ExternalLink, Calendar, Loader2 } from "lucide-react";
import { useNewsItems } from "@/hooks/useNewsItems";

const STATIC_COVERAGE = [
  { outlet: "Channels Television", title: "MADE-F's Community Journalism Fellowship Graduates 120 Reporters Across Nigeria", date: "January 30, 2025", category: "Programme Impact", description: "Channels TV's morning show featured MADE-F's Executive Director discussing the graduation of the third cohort and the fellowship's measurable impact on local news coverage.", type: "Broadcast" },
  { outlet: "The Punch", title: "Media NGO Trains Youth in Digital Leadership to Combat Misinformation", date: "January 18, 2025", category: "Youth", description: "The Punch newspaper's development desk profiled MADE-F's Youth Digital and Leadership Programme, highlighting its role in equipping young people to counter disinformation.", type: "Print / Online" },
  { outlet: "Premium Times", title: "Policy Dialogues Must Bridge Research and Practice, Says MADE-F", date: "December 10, 2024", category: "Policy", description: "Premium Times covered MADE-F's Abuja policy dialogue on health communication, quoting panelists and summarising the communiqué issued at the end of the forum.", type: "Online" },
  { outlet: "NAN (News Agency of Nigeria)", title: "MADE Foundation Calls for Gender-Responsive Media Reporting in Nigeria", date: "November 25, 2024", category: "Gender", description: "NAN distributed a wire report featuring MADE-F's Director of Programmes on the launch of the 2024 gender-responsive journalism guidelines.", type: "Wire Service" },
  { outlet: "Guardian Nigeria", title: "Annual Conference to Examine Media's Role in Climate Advocacy", date: "October 14, 2024", category: "Conference", description: "The Guardian previewed MADE-F's annual conference, spotlighting the keynote speakers and the conference theme on environmental journalism.", type: "Print / Online" },
  { outlet: "Arise News", title: "MADE-F Partners UNICEF on Child-Rights Journalism Training", date: "September 5, 2024", category: "Partnership", description: "Arise News aired a segment on MADE-F's partnership with UNICEF, bringing child-rights journalism training to 15 states.", type: "Broadcast" },
];

const TYPE_COLORS: Record<string, string> = {
  Broadcast: "bg-primary/10 text-primary",
  "Print / Online": "bg-accent/20 text-foreground",
  Online: "bg-secondary text-secondary-foreground",
  "Wire Service": "bg-muted text-muted-foreground",
};

const MadeInTheNews = () => {
  const { items, loading } = useNewsItems("made_in_news");
  const hasDynamic = items.length > 0;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusMedia})` }} />
        <div className="container mx-auto text-center relative">
          <span className="section-tag mb-6 inline-block">Newsroom</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            MADE-F <em className="text-italic-accent">in the News</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Media coverage of MADE Foundation's programmes, people and impact across Nigeria and beyond.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-24"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : (
            <div className="space-y-6">
              {(hasDynamic ? items : STATIC_COVERAGE).map((item: any) => (
                <div
                  key={item.id ?? item.title}
                  className="bg-card rounded-3xl border border-border shadow-card p-8 hover-lift grid md:grid-cols-[1fr_auto] gap-6 items-start"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {item.type && (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 font-body ${TYPE_COLORS[item.type] || "bg-muted text-muted-foreground"}`}>
                          {item.type}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                        <Calendar size={11} />
                        {item.date ?? new Date(item.published_at ?? item.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                    {item.author && <p className="font-body text-sm font-bold text-primary mb-1">{item.author}</p>}
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-snug">{item.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description ?? item.excerpt}</p>
                    {item.content && (
                      <div className="mt-3 prose prose-sm max-w-none font-body text-foreground/80 [&_a]:text-primary" dangerouslySetInnerHTML={{ __html: item.content }} />
                    )}
                  </div>
                  {(item.external_url || item.outlet) && (
                    item.external_url ? (
                      <a href={item.external_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors whitespace-nowrap mt-1">
                        View Coverage <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors whitespace-nowrap mt-1">
                        View Coverage <ExternalLink size={14} />
                      </button>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default MadeInTheNews;
