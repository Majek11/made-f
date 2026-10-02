import { Shield, BarChart2, Users, Lightbulb, Heart, Globe } from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    title: "Integrity",
    desc: "We lead with purpose and unwavering integrity in everything we do.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: BarChart2,
    title: "Evidence",
    desc: "We prioritize robust data and rigorous analysis to inform our strategies and interventions.",
    color: "bg-gold-light text-accent-foreground",
    border: "border-accent/30",
  },
  {
    icon: Users,
    title: "Inclusion",
    desc: "We champion social equity and ensure every voice is heard and amplified.",
    color: "bg-green-light text-primary",
    border: "border-primary/20",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We embrace creative, collaborative approaches to tackle complex development challenges.",
    color: "bg-secondary text-secondary-foreground",
    border: "border-border",
  },
  {
    icon: Heart,
    title: "Impact",
    desc: "We measure success by the positive, lasting change created in communities nationwide.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: Globe,
    title: "Sustainability",
    desc: "We design programmes built to endure, building resilient societies for future generations.",
    color: "bg-gold-light text-accent-foreground",
    border: "border-accent/30",
  },
];

const ValuesSection = () => {
  return (
    <section id="values" className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <span className="section-tag">What We Stand For</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
            Our core <em className="text-italic-accent">values</em>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Our values not only define our organisational culture but serve as guiding principles for
            decision-making, interactions and engagements with every stakeholder.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className={`bg-card rounded-2xl p-8 border ${v.border} hover-lift shadow-card group cursor-default`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{v.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
