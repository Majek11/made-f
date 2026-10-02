import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusCommunity from "@/assets/focus-community.jpg";
import focusMedia from "@/assets/focus-media.jpg";
import { ArrowRight, Zap, Globe, Users, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: Zap, title: "Digital Skills Training", desc: "From social media strategy to data journalism — we equip young people with 21st-century communication skills." },
  { icon: Globe, title: "Online Advocacy", desc: "Fellows learn to run effective digital advocacy campaigns on issues that matter to their communities." },
  { icon: Users, title: "Leadership Labs", desc: "Interactive leadership development workshops that build confidence, critical thinking and civic responsibility." },
  { icon: Lightbulb, title: "Innovation Projects", desc: "Fellows pitch and develop digital solutions to community challenges in a supported innovation environment." },
];

const YouthDigitalLeadership = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />

    <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusMedia})` }} />
      <div className="container mx-auto text-center relative">
        <span className="section-tag mb-6 inline-block">Programmes</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
          Youth Digital & Leadership <em className="text-italic-accent">Programmes</em>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
          Empowering young Nigerians with digital literacy, media skills and leadership capacity to drive change.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/contact" className="btn-gold">Apply Now <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag mb-4">About the Programme</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Digital skills for <em className="text-italic-accent">young change-makers</em>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              The Youth Digital and Leadership Programme is MADE-F's investment in Nigeria's next generation of
              informed, digitally empowered civic leaders and communicators.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              We work with young people aged 18–35, providing intensive training in digital media, online advocacy,
              content creation, data literacy and leadership — equipping them to engage meaningfully in public discourse.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Participants leave the programme as confident communicators and community leaders, ready to amplify
              development messages and hold institutions accountable through digital platforms.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-accent opacity-20" />
            <img src={focusCommunity} alt="Youth Digital Leadership" className="relative rounded-3xl object-cover w-full h-[450px] shadow-hover" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag">What We Offer</span>
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
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">Are you 18–35?</h2>
            <p className="font-body text-primary-foreground/70 mb-8">Join a cohort of passionate young Nigerians building digital skills for development impact.</p>
            <Link to="/contact" className="btn-gold">Apply Today <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
);

export default YouthDigitalLeadership;
