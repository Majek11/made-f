import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusData from "@/assets/focus-data.jpg";
import focusMedia from "@/assets/focus-media.jpg";
import { ArrowRight, Calendar, Mic2, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: Mic2, title: "Keynote Addresses", desc: "Thought-provoking keynotes from leading scholars, policymakers and development communication practitioners." },
  { icon: Users, title: "Panel Discussions", desc: "Multi-disciplinary panels that spark critical conversations on media, development and social change." },
  { icon: BookOpen, title: "Paper Presentations", desc: "Academics and practitioners present cutting-edge research on communication for development." },
  { icon: Calendar, title: "Annual Convening", desc: "An annual flagship conference that brings together the brightest minds in media and development." },
];

const Conference = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />

    <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusData})` }} />
      <div className="container mx-auto text-center relative">
        <span className="section-tag mb-6 inline-block">Programmes</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
          MADE-F <em className="text-italic-accent">Conference</em>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
          An annual gathering of scholars, practitioners, policymakers and media professionals driving development through communication.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/contact" className="btn-gold">Register Interest <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-accent opacity-20" />
            <img src={focusData} alt="MADE-F Conference" className="relative rounded-3xl object-cover w-full h-[450px] shadow-hover" />
          </div>
          <div>
            <span className="section-tag mb-4">About the Conference</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Where knowledge meets <em className="text-italic-accent">action</em>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              The MADE-F Annual Conference is our flagship convening — a high-level gathering of communication scholars,
              media practitioners, development workers and policymakers dedicated to advancing the field of communication for development.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Each edition features peer-reviewed paper presentations, expert panels, policy dialogues and networking sessions
              designed to translate research into real-world development impact.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Conference proceedings are published and distributed through MADE-F's Newsroom and academic partners,
              ensuring the knowledge generated reaches the widest possible audience.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag">Conference Features</span>
          <h2 className="font-display text-4xl font-bold text-foreground mt-4">What to <em className="text-italic-accent">expect</em></h2>
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

    {/* Call for Papers */}
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-3xl p-10 border border-border shadow-card flex flex-col gap-4">
            <span className="section-tag w-fit">For Academics</span>
            <h3 className="font-display text-2xl font-bold text-foreground">Submit a Paper</h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              We welcome research papers on communication for development, media studies, SBCC, journalism innovation and related fields.
            </p>
            <Link to="/contact" className="btn-outline w-fit mt-2">Submit Abstract <ArrowRight size={16} /></Link>
          </div>
          <div className="bg-primary rounded-3xl p-10 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusMedia})` }} />
            <div className="relative">
              <span className="section-tag w-fit mb-4">For Practitioners</span>
              <h3 className="font-display text-2xl font-bold text-primary-foreground">Attend or Sponsor</h3>
              <p className="font-body text-primary-foreground/70 leading-relaxed mb-4">
                Join us as a delegate, panelist or sponsor and be part of Nigeria's leading development communication conference.
              </p>
              <Link to="/contact" className="btn-gold w-fit">Register Now <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
);

export default Conference;
