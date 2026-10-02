import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusJournalism from "@/assets/focus-journalism.jpg";
import focusMedia from "@/assets/focus-media.jpg";
import { ArrowRight, BookOpen, Lightbulb, Network, Award } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: BookOpen, title: "Academic Partnerships", desc: "We collaborate with universities and polytechnics to co-design curriculum that reflects industry realities." },
  { icon: Lightbulb, title: "Industry Immersion", desc: "Students and fresh graduates are placed in media organisations, PR firms and development agencies for hands-on experience." },
  { icon: Network, title: "Professional Network", desc: "JAC connects participants with a wide network of journalism and communication professionals across Nigeria and beyond." },
  { icon: Award, title: "Research & Publication", desc: "JAC members produce and publish cutting-edge research bridging academic theory and communication practice." },
];

const JAC = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />

    <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusJournalism})` }} />
      <div className="container mx-auto text-center relative">
        <span className="section-tag mb-6 inline-block">Programmes</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
          Journalism & Communication <em className="text-italic-accent">(JAC)</em>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
          Bridging the gap between communication academia and industry for a stronger, more capable media sector.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/contact" className="btn-gold">Join JAC <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-accent opacity-20" />
            <img src={focusJournalism} alt="Journalism and Communication" className="relative rounded-3xl object-cover w-full h-[450px] shadow-hover" />
          </div>
          <div>
            <span className="section-tag mb-4">About JAC</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Theory meets <em className="text-italic-accent">practice</em>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              The Journalism and Communication (JAC) programme is MADE-F's core capacity-building initiative for
              journalism students, graduates and early-career communication professionals.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              JAC provides structured pathways from university training into professional media and development
              communication practice — through placements, workshops, mentorship and collaborative research.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              As a living laboratory, JAC participants contribute to real MADE-F projects and publications,
              gaining portfolio-ready experience while making a measurable development impact.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag">What JAC Offers</span>
          <h2 className="font-display text-4xl font-bold text-foreground mt-4">Programme <em className="text-italic-accent">highlights</em></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-card rounded-3xl p-8 border border-border shadow-card hover-lift flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto text-center">
        <div className="bg-primary rounded-3xl p-14 max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusMedia})` }} />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">Join the JAC Network</h2>
            <p className="font-body text-primary-foreground/70 mb-8">Are you a communication student or fresh graduate? Take the next step with MADE-F's JAC programme.</p>
            <Link to="/contact" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
);

export default JAC;
