import { TrendingUp, Mic2, BookOpen, Network } from "lucide-react";

const PILLARS = [
  {
    icon: TrendingUp,
    title: "Data-Driven Insights",
    sub: "Research & Analytics",
    desc: "We deploy evidence-based approaches, using robust data and rigorous analysis to shape every media programme and intervention.",
    accent: "bg-accent",
  },
  {
    icon: Mic2,
    title: "Media Action",
    sub: "Strategic Communication",
    desc: "From broadcast to digital, we leverage the full spectrum of media to amplify voices and promote social change at scale.",
    accent: "bg-primary",
  },
  {
    icon: BookOpen,
    title: "Journalism Lab",
    sub: "Professional Development",
    desc: "MADE-F serves as a bridge between classroom and industry, nurturing the next generation of communication professionals.",
    accent: "bg-accent",
  },
  {
    icon: Network,
    title: "Community Engagement",
    sub: "RC&CE",
    desc: "Through Risk Communication & Community Engagement, we build resilient, informed communities capable of responding to challenges.",
    accent: "bg-primary",
  },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <span className="section-tag">How We Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
            Our four <em className="text-italic-accent">pillars</em>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            Through collaboration and innovation, MADE Foundation operates across four interconnected
            areas of development impact.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-card rounded-2xl p-7 border border-border shadow-card hover-lift group flex flex-col"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${p.accent} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:rotate-6`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                  {p.sub}
                </p>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{p.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed flex-1">{p.desc}</p>
                <div
                  className={`h-1 w-12 rounded-full mt-6 transition-all duration-300 group-hover:w-full ${p.accent}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
