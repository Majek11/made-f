import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import focusCommunity from "@/assets/focus-community.jpg";
import focusData from "@/assets/focus-data.jpg";
import { ArrowRight, Heart, Shield, Users, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: Heart, title: "Gender-Responsive Programming", desc: "All MADE-F programmes are designed with explicit gender lenses to ensure women and girls are centred in every intervention." },
  { icon: Shield, title: "Safe Spaces", desc: "We create safe platforms for marginalised voices — women, youth, persons with disabilities and rural communities." },
  { icon: Users, title: "Community Advocates", desc: "We train local gender champions to lead SBCC campaigns within their own communities." },
  { icon: BarChart2, title: "Data & Evidence", desc: "Our gender work is grounded in sex-disaggregated data and evidence-based frameworks." },
];

const GenderSocialInclusion = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />

    <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusCommunity})` }} />
      <div className="container mx-auto text-center relative">
        <span className="section-tag mb-6 inline-block">Programmes</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
          Gender & Social <em className="text-italic-accent">Inclusion</em>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
          Advancing equity through gender-responsive communication, advocacy and community-driven social change.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/contact" className="btn-gold">Get Involved <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag mb-4">Our Approach</span>
            <h2 className="font-display text-4xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Leaving no one <em className="text-italic-accent">behind</em>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              MADE-F's Gender and Social Inclusion programme integrates gender equity and social inclusion principles
              across all our work — from journalism training to policy dialogues and community engagement.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              We design and implement targeted SBCC campaigns addressing gender-based violence, reproductive health,
              women's economic empowerment and the inclusion of persons with disabilities in public life.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Our media action work amplifies stories of resilience, challenges harmful social norms and builds
              community support for gender equality across Nigeria.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-accent opacity-20" />
            <img src={focusCommunity} alt="Gender and Social Inclusion" className="relative rounded-3xl object-cover w-full h-[450px] shadow-hover" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-cream-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="section-tag">Our Pillars</span>
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
          <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusData})` }} />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">Champion inclusion</h2>
            <p className="font-body text-primary-foreground/70 mb-8">Partner with us to build more equitable communities through media and communication.</p>
            <Link to="/contact" className="btn-gold">Work With Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
);

export default GenderSocialInclusion;
