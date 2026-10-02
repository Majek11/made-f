import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { TrendingUp, Mic2, BookOpen, Network, ArrowRight } from "lucide-react";

const PILLARS = [
  {
    icon: TrendingUp,
    title: "Data-Driven Insights",
    sub: "Research & Analytics",
    desc: "We deploy evidence-based approaches, using robust data and rigorous analysis to shape every media programme and intervention.",
    accent: "bg-accent",
    border: "border-accent/30",
  },
  {
    icon: Mic2,
    title: "Media Action",
    sub: "Strategic Communication",
    desc: "From broadcast to digital, we leverage the full spectrum of media to amplify voices and promote social change at scale.",
    accent: "bg-primary",
    border: "border-primary/20",
  },
  {
    icon: BookOpen,
    title: "Journalism Lab",
    sub: "Professional Development",
    desc: "MADE-F serves as a bridge between classroom and industry, nurturing the next generation of communication professionals.",
    accent: "bg-accent",
    border: "border-accent/30",
  },
  {
    icon: Network,
    title: "Community Engagement",
    sub: "RC&CE",
    desc: "Through Risk Communication & Community Engagement, we build resilient, informed communities capable of responding to challenges.",
    accent: "bg-primary",
    border: "border-primary/20",
  },
];

const FOCUS_AREAS = [
  { label: "Health Communication", desc: "Driving behaviour change for better health outcomes across communities." },
  { label: "Governance & Civic Education", desc: "Empowering citizens with knowledge to hold institutions accountable." },
  { label: "Climate & Environment", desc: "Communicating climate risks and promoting sustainable practices." },
  { label: "Gender & Social Equity", desc: "Amplifying marginalised voices and championing inclusion." },
  { label: "Emergency & Crisis Communication", desc: "Rapid, trusted communication during public health and humanitarian crises." },
];

const Impact = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto text-center">
          <span className="section-tag mb-6 inline-block">How We Work</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            Our <em className="text-italic-accent">Impact</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Four interconnected pillars of work driving sustainable development across Nigeria.
          </p>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="section-tag">Our Pillars</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
              The four <em className="text-italic-accent">pillars</em> of MADE-F
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`bg-card rounded-3xl p-10 border ${p.border} shadow-card hover-lift group flex gap-6`}
                >
                  <div className={`w-16 h-16 min-w-16 rounded-2xl ${p.accent} flex items-center justify-center transition-transform duration-300 group-hover:rotate-6`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">{p.sub}</p>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">{p.title}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 bg-cream-dark">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="section-tag">What We Do</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
              Focus <em className="text-italic-accent">areas</em> we work on
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {FOCUS_AREAS.map((area, i) => (
              <div
                key={area.label}
                className="bg-card rounded-2xl p-8 border border-border shadow-card hover-lift flex items-center gap-8 group"
              >
                <span className="font-display text-5xl font-bold text-muted/60 w-12 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{area.label}</h3>
                  <p className="font-body text-muted-foreground text-sm">{area.desc}</p>
                </div>
                <ArrowRight size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Impact;
