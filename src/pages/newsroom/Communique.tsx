import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusData from "@/assets/focus-data.jpg";
import { Download, Calendar, MapPin, Users, Loader2 } from "lucide-react";
import { useNewsItems } from "@/hooks/useNewsItems";

const STATIC_COMMUNIQUES = [
  { title: "Communiqué of the National Health Communication Policy Dialogue", event: "Dialogue & Policy Series — Health Track", location: "Abuja, FCT", date: "January 22, 2025", participants: "87 participants", excerpt: "Stakeholders at the National Health Communication Policy Dialogue called on the Federal Ministry of Health to adopt a National Health Communication Strategy integrating community media, digital platforms and traditional channels.", recommendations: ["Establishment of a dedicated health communication desk in all 36 state ministries of health", "Mandatory gender and disability inclusion clauses in all health media contracts", "Quarterly review of health messaging by a multi-sector technical working group"] },
  { title: "Communiqué of the Media & Electoral Integrity Forum", event: "Dialogue & Policy Series — Governance Track", location: "Lagos, Nigeria", date: "October 15, 2024", participants: "64 participants", excerpt: "Representatives of media organisations, civil society and INEC convened to develop shared standards for responsible electoral reporting.", recommendations: ["Adoption of a Code of Conduct for Electoral Reporting by all mainstream media houses", "INEC to establish a dedicated media liaison desk during election periods", "Media organisations to appoint dedicated fact-checkers for electoral content"] },
  { title: "Communiqué of the Gender & Media Roundtable", event: "Gender & Social Inclusion Programme", location: "Kano, Nigeria", date: "July 30, 2024", participants: "52 participants", excerpt: "Journalists, women's rights advocates and policymakers gathered to develop a gender-responsive journalism framework for Nigerian newsrooms.", recommendations: ["All Nigerian newsrooms to develop and publish gender editorial policies by December 2024", "Mandatory trauma-informed reporting training for journalists covering GBV", "National Press Council to include gender equity in its self-regulation guidelines"] },
];

const Communique = () => {
  const { items, loading } = useNewsItems("communique");
  const hasDynamic = items.length > 0;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusData})` }} />
        <div className="container mx-auto text-center relative">
          <span className="section-tag mb-6 inline-block">Newsroom</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            <em className="text-italic-accent">Communiqués</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Official outcome statements and policy recommendations from MADE-F's Dialogue and Policy Series events.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto space-y-10">
          {loading ? (
            <div className="flex justify-center py-24"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : hasDynamic ? (
            items.map((doc) => (
              <div key={doc.id} className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-body"><Calendar size={11} />{new Date(doc.published_at ?? doc.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                    {doc.author && <span className="flex items-center gap-1 text-xs text-muted-foreground font-body"><Users size={11} />{doc.author}</span>}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 leading-snug">{doc.title}</h3>
                  {doc.excerpt && <p className="font-body text-muted-foreground leading-relaxed mb-6">{doc.excerpt}</p>}
                  {doc.content && (
                    <div className="bg-secondary/50 rounded-2xl p-6 prose prose-sm max-w-none font-body text-foreground/80 [&_a]:text-primary" dangerouslySetInnerHTML={{ __html: doc.content }} />
                  )}
                  {doc.external_url && (
                    <div className="mt-6">
                      <a href={doc.external_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors">
                        <Download size={15} /> Download Full Communiqué (PDF)
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            STATIC_COMMUNIQUES.map((doc) => (
              <div key={doc.title} className="bg-card rounded-3xl border border-border shadow-card overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="section-tag text-xs">{doc.event}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-body"><Calendar size={11} />{doc.date}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-body"><MapPin size={11} />{doc.location}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-body"><Users size={11} />{doc.participants}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 leading-snug">{doc.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">{doc.excerpt}</p>
                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <p className="font-body text-sm font-semibold text-foreground mb-3">Key Recommendations:</p>
                    <ul className="space-y-2">
                      {doc.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-accent text-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">{i + 1}</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors">
                      <Download size={15} /> Download Full Communiqué (PDF)
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Communique;
