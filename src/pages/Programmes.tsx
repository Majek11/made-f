import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { AnimateIn } from "@/components/AnimateIn";
import focusCommunity from "@/assets/focus-community.jpg";
import focusJournalism from "@/assets/focus-journalism.jpg";
import focusData from "@/assets/focus-data.jpg";
import focusMedia from "@/assets/focus-media.jpg";
import { ArrowRight, Users, MessageSquare, Heart, BookOpen, Zap, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const PROGRAMMES = [
  {
    icon: Users,
    tag: "Fellowship",
    title: "Community Journalism Fellowship",
    description:
      "A six-month, cohort-based fellowship training community-rooted journalists to report on local governance, health, climate and social issues across underserved communities in Nigeria.",
    highlights: ["6-month residential + field programme", "Open to Nigerians aged 21–40", "Next cohort: Q3 2025"],
    href: "/programmes/community-journalism-fellowship",
    image: focusCommunity,
    cta: "Apply Now",
  },
  {
    icon: MessageSquare,
    tag: "Policy",
    title: "Dialogue & Policy Series",
    description:
      "Structured, evidence-driven convenings that bring policymakers, civil society, researchers and the media together to co-create actionable solutions to Nigeria's development challenges.",
    highlights: ["Multi-stakeholder forums", "National & regional reach", "Outputs: briefs & communiqués"],
    href: "/programmes/dialogue-and-policy-series",
    image: focusData,
    cta: "Partner With Us",
  },
  {
    icon: Heart,
    tag: "Inclusion",
    title: "Gender & Social Inclusion",
    description:
      "An institution-wide commitment integrating gender equity and social inclusion principles across all MADE-F programming — from journalism training to community advocacy campaigns.",
    highlights: ["Gender-responsive design", "SBCC campaigns", "Community advocates training"],
    href: "/programmes/gender-and-social-inclusion",
    image: focusCommunity,
    cta: "Get Involved",
  },
  {
    icon: BookOpen,
    tag: "Capacity",
    title: "Journalism & Communication (JAC)",
    description:
      "MADE-F's core capacity-building programme for journalism students, graduates and early-career communication professionals — bridging the gap between academia and the media industry.",
    highlights: ["Industry placements", "Academic partnerships", "Research & publication"],
    href: "/programmes/jac",
    image: focusJournalism,
    cta: "Join JAC",
  },
  {
    icon: Zap,
    tag: "Youth",
    title: "Youth Digital & Leadership",
    description:
      "Intensive training in digital media, online advocacy, content creation, data literacy and leadership for young Nigerians aged 18–35 ready to drive change in their communities.",
    highlights: ["Open to ages 18–35", "Digital skills + leadership labs", "Innovation project pitches"],
    href: "/programmes/youth-digital-leadership",
    image: focusCommunity,
    cta: "Apply Today",
  },
  {
    icon: Calendar,
    tag: "Annual Event",
    title: "MADE-F Annual Conference",
    description:
      "A flagship annual gathering of communication scholars, media practitioners, development workers and policymakers — presenting research, debating policy and advancing the field.",
    highlights: ["Paper presentations welcome", "Sponsorship available", "Published proceedings"],
    href: "/programmes/conference",
    image: focusMedia,
    cta: "Register Interest",
  },
];

const Programmes = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusJournalism})` }} />
      <div className="container mx-auto text-center relative">
        <AnimateIn direction="up" duration={700}>
          <span className="section-tag mb-6 inline-block">Our Work</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            Programmes &amp; <em className="text-italic-accent">Initiatives</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Six flagship programmes spanning journalism training, policy dialogue, gender equity, youth leadership and
            development communication — all designed to create lasting impact.
          </p>
        </AnimateIn>
      </div>
    </section>

    {/* Stats bar */}
    <section className="py-10 bg-card border-b border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "6", label: "Active Programmes" },
            { value: "1,200+", label: "Beneficiaries Trained" },
            { value: "36", label: "States Reached" },
            { value: "8+", label: "Years of Impact" },
          ].map((stat, i) => (
            <AnimateIn key={stat.label} direction="up" delay={i * 80} duration={600}>
              <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
              <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>

    {/* Programme Cards */}
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <AnimateIn direction="up" className="text-center mb-16">
          <span className="section-tag">Explore</span>
          <h2 className="font-display text-4xl font-bold text-foreground mt-4">
            All <em className="text-italic-accent">Programmes</em>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto mt-4">
            Click any programme to learn more, view eligibility criteria and find out how to get involved.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMMES.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <AnimateIn key={prog.title} direction="up" delay={i * 80} duration={650}>
                <Link
                  to={prog.href}
                  className="group bg-card rounded-3xl border border-border shadow-card hover-lift overflow-hidden flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/40" />
                    <span className="absolute top-4 left-4 section-tag text-xs">{prog.tag}</span>
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1 gap-4">
                    <h3 className="font-display text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {prog.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                      {prog.description}
                    </p>
                    <ul className="space-y-1.5">
                      {prog.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1.5 text-primary font-semibold text-sm font-body mt-2 group-hover:gap-3 transition-all">
                      {prog.cta} <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-cream-dark">
      <div className="container mx-auto text-center">
        <AnimateIn direction="up" duration={700}>
          <div className="bg-primary rounded-3xl p-14 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusMedia})` }} />
            <div className="relative">
              <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
                Partner with MADE-F
              </h2>
              <p className="font-body text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                Whether you're a donor, government agency, academic institution or media organisation — there's a place for
                you in the MADE-F ecosystem.
              </p>
              <Link to="/contact" className="btn-gold">
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>

    <FooterSection />
  </div>
);

export default Programmes;
