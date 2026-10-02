import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusData from "@/assets/focus-data.jpg";
import focusMedia from "@/assets/focus-media.jpg";
import { ArrowRight, MessageSquare, Users, Globe, Mic2 } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: MessageSquare, title: "Policy Dialogues", desc: "Structured conversations between policymakers, civil society, academics and the media on critical development issues." },
  { icon: Users, title: "Multi-Stakeholder Forums", desc: "We convene diverse actors to build consensus and translate dialogue into actionable policy recommendations." },
  { icon: Globe, title: "National & Regional Reach", desc: "Events span state capitals, Abuja, and regional hubs — bringing local voices into national conversations." },
  { icon: Mic2, title: "Media Coverage", desc: "Every dialogue is covered and packaged for broadcast, digital and print distribution through our Newsroom." },
];

const DialoguePolicySeries = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />

    <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusData})` }} />
      <div className="container mx-auto text-center relative">
        <span className="section-tag mb-6 inline-block">Programmes</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
          Dialogue & Policy <em className="text-italic-accent">Series</em>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
          Convening evidence-based conversations that bridge research, policy and practice for sustainable development.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/contact" className="btn-gold">Partner With Us <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-accent opacity-20" />
            <img src={focusData} alt="Dialogue and Policy" className="relative rounded-3xl object-cover w-full h-[450px] shadow-hover" />
          </div>
          <div>
            <span className="section-tag mb-4">About the Series</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Where evidence meets <em className="text-italic-accent">policy</em>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              The Dialogue and Policy Series is MADE-F's platform for structured, evidence-driven conversations on Nigeria's
              most pressing development challenges — from health and education to governance, climate and gender equity.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Each session brings together policymakers, researchers, journalists, civil society leaders and community
              representatives to interrogate data, share perspectives and co-create solutions.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Outputs include policy briefs, communiqués and media packages distributed through MADE-F's Newsroom
              to maximise reach and influence.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag">What We Offer</span>
          <h2 className="font-display text-4xl font-bold text-foreground mt-4">Series <em className="text-italic-accent">highlights</em></h2>
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
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">Host a Dialogue</h2>
            <p className="font-body text-primary-foreground/70 mb-8">Want to convene a policy dialogue on an issue you care about? Partner with MADE-F.</p>
            <Link to="/contact" className="btn-gold">Contact Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
);

export default DialoguePolicySeries;
