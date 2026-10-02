import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusJournalism from "@/assets/focus-journalism.jpg";
import focusMedia from "@/assets/focus-media.jpg";
import { Download, Calendar, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const EDITIONS = [
  {
    volume: "Vol. 5, Issue 1",
    title: "Community Voices — January 2025",
    date: "January 31, 2025",
    highlights: ["Fellowship applications now open", "2024 impact: 1,200+ trained", "New gender journalism guidelines launched"],
    pages: 16,
    cover: focusJournalism,
  },
  {
    volume: "Vol. 4, Issue 4",
    title: "Community Voices — October 2024",
    date: "October 31, 2024",
    highlights: ["Annual conference recap", "Youth summit highlights", "JAC new academic partnerships"],
    pages: 20,
    cover: focusMedia,
  },
  {
    volume: "Vol. 4, Issue 3",
    title: "Community Voices — July 2024",
    date: "July 31, 2024",
    highlights: ["Gender roundtable communiqué", "New UNICEF partnership", "Alumni spotlight: Amina Bello"],
    pages: 18,
    cover: focusJournalism,
  },
  {
    volume: "Vol. 4, Issue 2",
    title: "Community Voices — April 2024",
    date: "April 30, 2024",
    highlights: ["Q1 programme updates", "Policy dialogue outcomes", "Funding opportunities for journalists"],
    pages: 14,
    cover: focusMedia,
  },
  {
    volume: "Vol. 4, Issue 1",
    title: "Community Voices — January 2024",
    date: "January 31, 2024",
    highlights: ["2024 programme calendar", "MADE-F at 8 years", "Interview: Executive Director"],
    pages: 22,
    cover: focusJournalism,
  },
];

const Newsletters = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusJournalism})` }} />
        <div className="container mx-auto text-center relative">
          <span className="section-tag mb-6 inline-block">Newsroom</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            <em className="text-italic-accent">Newsletters</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Subscribe to <strong className="text-primary-foreground">Community Voices</strong> — MADE-F's quarterly newsletter covering programme updates, stories from the field and development media news.
          </p>

          {/* Subscribe form */}
          <div className="mt-8 max-w-md mx-auto">
            {subscribed ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-primary-foreground font-body">
                ✓ Thank you! You'll receive the next edition in your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-full font-body text-sm text-foreground bg-white/90 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button type="submit" className="btn-gold whitespace-nowrap">
                  Subscribe <Mail size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Archive</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-4">Past <em className="text-italic-accent">Editions</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {EDITIONS.map((edition) => (
              <div key={edition.volume} className="bg-card rounded-3xl border border-border shadow-card hover-lift overflow-hidden flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img src={edition.cover} alt={edition.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-primary/50 flex flex-col justify-end p-5">
                    <p className="font-body text-xs font-semibold text-white/70 mb-1">{edition.volume}</p>
                    <h3 className="font-display text-lg font-bold text-white leading-snug">{edition.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                    <Calendar size={11} /> {edition.date} · {edition.pages} pages
                  </span>
                  <ul className="space-y-1.5 flex-1">
                    {edition.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <button className="flex items-center gap-2 text-sm font-semibold text-primary font-body hover:text-accent transition-colors">
                    <Download size={14} /> Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Newsletters;
