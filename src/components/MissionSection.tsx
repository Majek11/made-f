import { Eye, Target } from "lucide-react";

const MissionSection = () => {
  return (
    <section id="mission" className="py-24 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <span className="section-tag">Our Purpose</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
            Vision & <em className="text-italic-accent">Mission</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-primary rounded-3xl p-10 text-primary-foreground relative overflow-hidden hover-lift shadow-card">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
                <Eye size={24} className="text-foreground" />
              </div>
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-primary-foreground/60 mb-3">
                Our Vision
              </p>
              <h3 className="font-display text-3xl font-bold leading-tight mb-4">
                A future where every individual thrives.
              </h3>
              <p className="font-body text-primary-foreground/80 leading-relaxed">
                To create a future where every individual has the opportunity to thrive — regardless
                of background, geography or circumstance.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-card rounded-3xl p-10 border border-border relative overflow-hidden hover-lift shadow-card">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gold-light flex items-center justify-center mb-6">
                <Target size={24} className="text-primary" />
              </div>
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Our Mission
              </p>
              <h3 className="font-display text-3xl font-bold leading-tight mb-4 text-foreground">
                Bridging knowledge and action.
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                To design and implement impactful, evidence-driven media programmes that bridge the
                gap between knowledge and action — amplifying voices, promoting social equity and
                cultivating informed citizenry for sustainable development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
