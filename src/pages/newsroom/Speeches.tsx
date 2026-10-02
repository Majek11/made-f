import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusMedia from "@/assets/focus-media.jpg";
import { Download, Calendar, User, Mic2, Loader2 } from "lucide-react";
import { useNewsItems } from "@/hooks/useNewsItems";

const STATIC_SPEECHES = [
  { speaker: "Executive Director, MADE Foundation", title: "Opening Address — MADE-F Annual Conference 2024", event: "MADE-F Annual Conference", date: "August 21, 2024", location: "Abuja, Nigeria", excerpt: "We stand at a critical inflection point. The media has never been more powerful, and never more under threat. Our task — our mission — is to ensure that media power is exercised in service of truth, equity and human development.", pages: 8 },
  { speaker: "Director of Programmes, MADE Foundation", title: "Keynote: Building Sustainable Community Media Ecosystems in Nigeria", event: "National Community Media Summit", date: "November 12, 2024", location: "Ibadan, Nigeria", excerpt: "Community media is not a lesser form of journalism. It is, in many ways, the most consequential — because it speaks directly to the people who live closest to the problems our society must solve.", pages: 12 },
  { speaker: "MADE-F Programme Coordinator (Gender & Inclusion)", title: "Statement on Gender-Responsive Journalism in Nigeria", event: "International Women's Day Symposium", date: "March 8, 2024", location: "Lagos, Nigeria", excerpt: "When a woman's story is told badly — or not told at all — it is not merely a journalism failure. It is a development failure. It is a democracy failure.", pages: 6 },
  { speaker: "Executive Director, MADE Foundation", title: "Remarks at the Signing of the MADE-F / UNICEF MOU", event: "Partnership Signing Ceremony", date: "January 14, 2025", location: "Abuja, Nigeria", excerpt: "This partnership is built on a shared belief: that every child in Nigeria deserves to have their story told with dignity, accuracy and care. Child-rights journalism is not optional — it is a moral imperative.", pages: 4 },
];

const Speeches = () => {
  const { items, loading } = useNewsItems("speech");
  const hasDynamic = items.length > 0;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusMedia})` }} />
        <div className="container mx-auto text-center relative">
          <span className="section-tag mb-6 inline-block">Newsroom</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            Speeches &amp; <em className="text-italic-accent">Remarks</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Keynote addresses, opening remarks and statements delivered by MADE-F leadership at key events and conferences.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto space-y-8">
          {loading ? (
            <div className="flex justify-center py-24"><Loader2 size={28} className="animate-spin text-primary" /></div>
          ) : hasDynamic ? (
            items.map((speech) => (
              <div key={speech.id} className="bg-card rounded-3xl border border-border shadow-card p-8 md:p-10 hover-lift">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {speech.excerpt && <span className="section-tag text-xs">{speech.excerpt.substring(0, 40)}…</span>}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                    <Calendar size={11} />
                    {new Date(speech.published_at ?? speech.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
                {speech.author && (
                  <div className="flex items-center gap-2 mb-3">
                    <User size={14} className="text-primary" />
                    <p className="font-body text-sm font-semibold text-primary">{speech.author}</p>
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold text-foreground mb-5 leading-snug">{speech.title}</h3>
                {speech.excerpt && (
                  <blockquote className="border-l-4 border-accent pl-6 mb-6">
                    <p className="font-display text-lg italic text-foreground/80 leading-relaxed">{speech.excerpt}</p>
                  </blockquote>
                )}
                {speech.content && (
                  <div className="prose prose-sm max-w-none font-body text-foreground/80 mb-6 [&_a]:text-primary [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic" dangerouslySetInnerHTML={{ __html: speech.content }} />
                )}
                {speech.external_url && (
                  <a href={speech.external_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors">
                    <Download size={15} /> Download Speech (PDF)
                  </a>
                )}
              </div>
            ))
          ) : (
            STATIC_SPEECHES.map((speech) => (
              <div key={speech.title} className="bg-card rounded-3xl border border-border shadow-card p-8 md:p-10 hover-lift">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="section-tag text-xs">{speech.event}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-body"><Calendar size={11} />{speech.date}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-body"><Mic2 size={11} />{speech.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <User size={14} className="text-primary" />
                  <p className="font-body text-sm font-semibold text-primary">{speech.speaker}</p>
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-5 leading-snug">{speech.title}</h3>
                <blockquote className="border-l-4 border-accent pl-6 mb-6">
                  <p className="font-display text-lg italic text-foreground/80 leading-relaxed">{speech.excerpt}</p>
                </blockquote>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors">
                    <Download size={15} /> Download Speech ({speech.pages} pages, PDF)
                  </button>
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

export default Speeches;
