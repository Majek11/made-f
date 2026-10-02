import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FooterSection from "@/components/FooterSection";
import { AnimateIn } from "@/components/AnimateIn";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Mic2, BookOpen, Network, Shield, BarChart2, Users, Heart, Globe, Calendar, MessageSquare, Zap, Newspaper } from "lucide-react";
import aboutImg from "@/assets/about-img.jpg";
import { PartnersCarousel } from "@/components/PartnersCarousel";
import ctaBg from "@/assets/cta-bg.jpg";
import focusDataImg from "@/assets/focus-data.jpg";
import focusMediaImg from "@/assets/focus-media.jpg";
import focusJournalismImg from "@/assets/focus-journalism.jpg";
import focusCommunityImg from "@/assets/focus-community.jpg";
import type { NewsItem } from "@/hooks/useNewsItems";

const FOCUS_ICONS = [TrendingUp, Mic2, BookOpen, Network];
const FOCUS_IMGS = [focusDataImg, focusMediaImg, focusJournalismImg, focusCommunityImg];
const FOCUS_LINKS = ["/impact", "/impact", "/impact", "/impact"];

const VALUES_ICONS = [Shield, BarChart2, Users, Heart, Globe];

const PROGRAMMES = [
  { icon: BookOpen, title: "Journalism & Communication Lab", href: "/programmes/jac", desc: "Bridging academia and the media industry through hands-on training." },
  { icon: Users, title: "Community Journalism", href: "/programmes/community-journalism-fellowship", desc: "Training community-rooted journalists to report on local issues." },
  { icon: TrendingUp, title: "Development Reporting", href: "/programmes/dialogue-and-policy-series", desc: "Evidence-driven reporting on governance, health and climate." },
  { icon: Zap, title: "Youth Digital & Leadership", href: "/programmes/youth-digital-leadership", desc: "Digital skills and leadership for young change-makers." },
  { icon: MessageSquare, title: "Dialogue & Policy Series", href: "/programmes/dialogue-and-policy-series", desc: "Multi-stakeholder forums co-creating actionable policy solutions." },
  { icon: Calendar, title: "Conference", href: "/programmes/conference", desc: "Annual gathering of scholars, practitioners and policymakers." },
  { icon: Heart, title: "SBCC", href: "/programmes/gender-and-social-inclusion", desc: "Social and Behaviour Change Communication for development." },
];

const ALL_KEYS = [
  "home_about_tag", "home_about_heading", "home_about_heading_italic",
  "home_about_p1", "home_about_p2", "home_about_badge_title", "home_about_badge_sub", "home_about_btn",
  "img_about",
  "home_whatwedo_tag", "home_whatwedo_heading", "home_whatwedo_heading_italic",
  "focus_1_title", "focus_1_desc", "focus_1_img",
  "focus_2_title", "focus_2_desc", "focus_2_img",
  "focus_3_title", "focus_3_desc", "focus_3_img",
  "focus_4_title", "focus_4_desc", "focus_4_img",
  "home_values_tag", "home_values_heading", "home_values_heading_italic",
  "home_values_subtext", "home_values_cta",
  "value_1_title", "value_1_desc", "value_2_title", "value_2_desc",
  "value_3_title", "value_3_desc", "value_4_title", "value_4_desc",
  "value_5_title", "value_5_desc", "value_6_title", "value_6_desc",
  "home_cta_tag", "home_cta_heading", "home_cta_heading_italic",
  "home_cta_body", "home_cta_btn1", "home_cta_btn2",
  "img_cta_bg",
];

const DEFAULTS: Record<string, string> = {
  home_about_tag: "Who We Are",
  home_about_heading: "Practice beyond",
  home_about_heading_italic: "classroom",
  home_about_p1: "Media Action & Development Foundation (MADE-F) is a social enterprise and brainchild of Professor Abigail Ogwezzy-Ndisika, founded to mark her golden jubilee — a platform dedicated to practising development beyond the classroom.",
  home_about_p2: "MADE-F deploys data-driven insights, media action, strategic communication, SBCC and RC&CE to promote sustainable development — while serving as a laboratory for growing budding journalism and communication professionals.",
  home_about_badge_title: "Prof.",
  home_about_badge_sub: "Founded by Abigail Ogwezzy-Ndisika",
  home_about_btn: "Learn More",
  home_whatwedo_tag: "What We Do",
  home_whatwedo_heading: "Areas",
  home_whatwedo_heading_italic: "we work on",
  focus_1_title: "Data-Driven Insights",
  focus_1_desc: "We deploy evidence-based approaches, using robust data and rigorous analysis to shape every media programme and intervention for maximum impact.",
  focus_2_title: "Media Action",
  focus_2_desc: "From broadcast to digital, we leverage the full spectrum of media to amplify voices and promote social change at scale across Nigeria.",
  focus_3_title: "Journalism Lab",
  focus_3_desc: "MADE-F serves as a bridge between classroom and industry, nurturing the next generation of communication professionals.",
  focus_4_title: "Community Engagement",
  focus_4_desc: "Through Risk Communication & Community Engagement (RC&CE), we build resilient, informed communities capable of responding to challenges.",
  home_values_tag: "What We Stand For",
  home_values_heading: "Our core",
  home_values_heading_italic: "values",
  home_values_subtext: "Guiding principles that shape every decision, engagement and programme we deliver.",
  home_values_cta: "Explore Our Values",
  value_1_title: "Making a Difference", value_1_desc: "We are committed to creating meaningful and tangible positive impacts in communities by prioritizing their unique needs and aspirations based on evidence.",
  value_2_title: "Accountability", value_2_desc: "We hold ourselves accountable to our stakeholders, partners, communities, and the environment with transparency in our decisions, processes and outcomes.",
  value_3_title: "Diversity, Equity, Inclusion & Accessibility", value_3_desc: "We embrace diversity in all its forms and recognise that varied perspectives enrich our understanding of complex challenges.",
  value_4_title: "Empathy", value_4_desc: "We approach our work with compassion and understanding, recognizing the unique experiences and challenges faced by different communities.",
  value_5_title: "Fidelity", value_5_desc: "We are dedicated to maintaining integrity to evidence-based practices and principles in all our programming efforts.",
  home_cta_tag: "Get Involved",
  home_cta_heading: "Join us in building",
  home_cta_heading_italic: "informed communities",
  home_cta_body: "Whether you're a researcher, journalist, communicator or community advocate — MADE-F has a place for you. Let's bridge knowledge and action together.",
  home_cta_btn1: "Contact Us",
  home_cta_btn2: "Learn More",
};

const DEFAULT_NEWS_ITEMS: NewsItem[] = [
  {
    id: "default-1",
    title: "Empowering Local Journalists through Data-Driven Development Reporting",
    slug: "empowering-local-journalists",
    type: "Blogs",
    excerpt: "MADE Foundation launches a new training series focused on equipping community reporters with modern data tools and investigative techniques.",
    content: "",
    image_url: focusJournalismImg,
    published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "default-2",
    title: "MADE Foundation Hosts Policy Dialogue on Gender and Social Inclusion",
    slug: "policy-dialogue-gender-inclusion",
    type: "Press Releases",
    excerpt: "Bringing together policymakers, researchers, and civil society leaders to discuss actionable strategies for inclusive development.",
    content: "",
    image_url: focusMediaImg,
    published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "default-3",
    title: "Youth Digital Leadership Workshop Kicks Off in Lagos",
    slug: "youth-digital-leadership-workshop",
    type: "Blogs",
    excerpt: "Over 100 young communicators gather for a three-day intensive workshop on digital storytelling and public advocacy.",
    content: "",
    image_url: focusDataImg,
    published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

const Index = () => {
  const [cfg, setCfg] = useState<Record<string, string>>(DEFAULTS);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ALL_KEYS)
      .then(({ data }) => {
        if (data?.length) {
          const map: Record<string, string> = { ...DEFAULTS };
          data.forEach((r) => { if (r.value) map[r.key] = r.value; });
          setCfg(map);
        }
      })
      .catch((err) => console.warn("Supabase fetch site_settings error:", err));

    supabase
      .from("news_items")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data && data.length > 0) setNewsItems(data as NewsItem[]); })
      .catch((err) => console.warn("Supabase fetch news_items error:", err));
  }, []);

  const g = (key: string) => cfg[key] ?? DEFAULTS[key] ?? "";

  const focusAreas = [1, 2, 3, 4].map((n, i) => ({
    icon: FOCUS_ICONS[i],
    title: g(`focus_${n}_title`),
    desc: g(`focus_${n}_desc`),
    link: FOCUS_LINKS[i],
    img: g(`focus_${n}_img`) || FOCUS_IMGS[i],
  }));

  const valuesCards = [1, 2, 3, 4, 5].map((n, i) => ({
    icon: VALUES_ICONS[i],
    title: g(`value_${n}_title`),
    desc: g(`value_${n}_desc`),
  }));

  const activeNewsItems = newsItems.length > 0 ? newsItems : DEFAULT_NEWS_ITEMS;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />

      {/* ── About Teaser ──────────────────────────────────────── */}
      <section className="pt-20 pb-24 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimateIn direction="left" duration={750}>
              <div className="relative group">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-accent opacity-30 group-hover:opacity-60 group-hover:scale-102 transition-all duration-500" />
                <img
                  src={g("img_about") || aboutImg}
                  alt="Community engagement session"
                  className="relative rounded-3xl object-cover w-full h-[480px] shadow-hover transition-transform duration-700 group-hover:scale-[1.01]"
                />
                <div className="absolute -bottom-6 -right-4 bg-primary text-primary-foreground rounded-2xl px-6 py-4 shadow-hover animate-float-slow border border-accent/30">
                  <p className="font-display text-3xl font-bold">{g("home_about_badge_title")}</p>
                  <p className="font-body text-xs text-primary-foreground/80 mt-1">{g("home_about_badge_sub")}</p>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={150} duration={750}>
              <span className="section-tag mb-4">{g("home_about_tag")}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                {g("home_about_heading")} <em className="text-italic-accent">{g("home_about_heading_italic")}</em>
              </h2>
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-5">{g("home_about_p1")}</p>
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">{g("home_about_p2")}</p>
              <Link to="/about" className="btn-gold inline-flex group/btn">
                <span>{g("home_about_btn")}</span> <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── What We Do ────────────────────────────────────────── */}
      <section className="py-24 bg-cream-dark">
        <div className="container mx-auto">
          <AnimateIn direction="up" className="text-center mb-16">
            <span className="section-tag">{g("home_whatwedo_tag")}</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
              {g("home_whatwedo_heading")} <em className="text-italic-accent">{g("home_whatwedo_heading_italic")}</em>
            </h2>
          </AnimateIn>

          <div className="flex flex-col gap-6">
            {focusAreas.map((area, i) => {
              const isEven = i % 2 === 0;
              return (
                <AnimateIn key={area.title} direction={isEven ? "left" : "right"} delay={i * 80} duration={700}>
                  <div className={`group bg-card rounded-3xl border border-border shadow-card hover:shadow-hover hover:border-accent/40 transition-all duration-500 overflow-hidden flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"}`}>
                    <div className="flex-1 min-h-[260px] md:min-h-[300px] overflow-hidden">
                      <img src={area.img} alt={area.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex-[1.4] p-10 md:p-14 flex flex-col justify-center">
                      <h3 className="font-display text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">{area.title}</h3>
                      <p className="font-body text-muted-foreground text-base leading-relaxed mb-6">{area.desc}</p>
                      <Link to={area.link} className="btn-outline w-fit group/btn hover:scale-105">
                        <span>Read More</span> <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="py-24 bg-primary overflow-hidden relative">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary-foreground/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full bg-accent/10 pointer-events-none" />

        <div className="container mx-auto relative">
          <AnimateIn direction="up" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="section-tag mb-4">{g("home_values_tag")}</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-4 leading-tight">
                {g("home_values_heading")} <em className="text-accent" style={{ fontStyle: "italic" }}>{g("home_values_heading_italic")}</em>
              </h2>
            </div>
            <p className="font-body text-primary-foreground/60 max-w-sm text-sm leading-relaxed md:text-right">
              {g("home_values_subtext")}
            </p>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/10 rounded-3xl overflow-hidden border border-primary-foreground/10">
            {valuesCards.map((v, i) => {
              const Icon = v.icon;
              return (
                <AnimateIn key={v.title} direction="up" delay={i * 90} duration={600}
                  className="group relative bg-primary hover:bg-primary-foreground/5 transition-colors duration-300 p-8 md:p-10 flex flex-col gap-6">
                  <span className="absolute top-4 right-6 font-display text-7xl font-bold text-primary-foreground/5 select-none leading-none group-hover:text-accent/10 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/25">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">{v.title}</h3>
                    <p className="font-body text-primary-foreground/55 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </AnimateIn>
              );
            })}
          </div>

          <AnimateIn direction="up" delay={200} className="mt-12 text-center">
            <Link to="/values" className="btn-gold inline-flex">
              {g("home_values_cta")} <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Our Programmes ─────────────────────────────────────── */}
      <section className="py-24 bg-cream-dark overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gold-light/30 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto relative">
          <AnimateIn direction="up" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="section-tag mb-4">Our Programmes</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
                Flagship <em className="text-italic-accent">initiatives</em>
              </h2>
            </div>
            <p className="font-body text-muted-foreground max-w-sm text-sm leading-relaxed md:text-right">
              Seven programmes spanning journalism, policy, youth leadership and development communication.
            </p>
          </AnimateIn>

          {/* Top row — 3 featured programmes */}
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {PROGRAMMES.slice(0, 3).map((prog, i) => {
              const Icon = prog.icon;
              return (
                <AnimateIn key={prog.title} direction="up" delay={i * 80} duration={650}>
                   <Link
                    to={prog.href}
                    className="group relative bg-card hover:shadow-hover hover:border-accent/40 border border-border rounded-2xl p-8 flex flex-col gap-5 h-full transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <span className="absolute top-5 right-6 font-display text-6xl font-bold text-foreground/5 select-none leading-none group-hover:text-accent/20 transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/25">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                      {prog.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                      {prog.desc}
                    </p>
                    <span className="flex items-center gap-1.5 text-accent font-semibold text-sm font-body group-hover:gap-3 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                    <div className="absolute bottom-0 left-8 right-8 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>
                </AnimateIn>
              );
            })}
          </div>

          {/* Bottom row — 4 compact programmes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAMMES.slice(3).map((prog, i) => {
              const Icon = prog.icon;
              return (
                <AnimateIn key={prog.title} direction="up" delay={(i + 3) * 80} duration={650}>
                   <Link
                    to={prog.href}
                    className="group relative bg-card hover:shadow-hover hover:border-accent/40 border border-border rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center text-accent flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-display text-base font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                        {prog.title}
                      </h3>
                    </div>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1">
                      {prog.desc}
                    </p>
                    <span className="flex items-center gap-1 text-accent font-semibold text-xs font-body group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={12} />
                    </span>
                    <div className="absolute bottom-0 left-6 right-6 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>
                </AnimateIn>
              );
            })}
          </div>

          <AnimateIn direction="up" delay={300} className="mt-14 text-center">
            <Link to="/programmes" className="btn-gold inline-flex">
              View All Programmes <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Latest News ────────────────────────────────────────── */}
      <section className="py-24 bg-cream-dark">
        <div className="container mx-auto">
          <AnimateIn direction="up" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="section-tag mb-4">Newsroom</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
                Latest <em className="text-italic-accent">stories</em>
              </h2>
            </div>
            <Link to="/newsroom/blogs" className="btn-outline inline-flex text-sm">
              View All <ArrowRight size={14} />
            </Link>
          </AnimateIn>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Featured (first) article — large */}
            {activeNewsItems[0] && (
              <AnimateIn direction="left" duration={700}>
                <Link
                  to={activeNewsItems[0].slug ? `/newsroom/blogs/${activeNewsItems[0].slug}` : `/newsroom/blogs`}
                  className="group bg-card rounded-3xl border border-border shadow-card hover-lift overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    {activeNewsItems[0].image_url ? (
                      <img
                        src={activeNewsItems[0].image_url}
                        alt={activeNewsItems[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <Newspaper size={48} className="text-primary/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="section-tag text-xs mb-3 inline-block">{activeNewsItems[0].type}</span>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white leading-snug">
                        {activeNewsItems[0].title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1 gap-3">
                    {activeNewsItems[0].excerpt && (
                      <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {activeNewsItems[0].excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      {activeNewsItems[0].published_at && (
                        <span className="font-body text-xs text-muted-foreground">
                          {new Date(activeNewsItems[0].published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-primary font-semibold text-sm font-body group-hover:gap-3 transition-all">
                        Read Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            )}

            {/* Secondary articles — stacked */}
            <div className="flex flex-col gap-6">
              {activeNewsItems.slice(1, 3).map((item, i) => (
                <AnimateIn key={item.id} direction="right" delay={i * 100} duration={700}>
                  <Link
                    to={item.slug ? `/newsroom/blogs/${item.slug}` : `/newsroom/blogs`}
                    className="group bg-card rounded-2xl border border-border shadow-card hover-lift overflow-hidden flex flex-row h-full"
                  >
                    <div className="relative w-40 md:w-52 flex-shrink-0 overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center min-h-[160px]">
                          <Newspaper size={28} className="text-primary/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/10" />
                    </div>
                    <div className="p-6 flex flex-col justify-center gap-3 flex-1">
                      <span className="font-body text-xs font-medium text-accent uppercase tracking-wider">{item.type}</span>
                      <h3 className="font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto">
                        {item.published_at && (
                          <span className="font-body text-xs text-muted-foreground">
                            {new Date(item.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-primary font-semibold text-xs font-body group-hover:gap-2 transition-all">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PartnersCarousel />

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          <AnimateIn direction="up" duration={800}>
            <div className="rounded-3xl overflow-hidden shadow-hover relative min-h-[420px] flex">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${g("img_cta_bg") || ctaBg})` }} />
              <div className="absolute inset-0 bg-gradient-hero" />
              <div className="relative flex flex-col justify-center p-12 md:p-20 max-w-xl">
                <AnimateIn direction="up" delay={100}>
                  <span className="section-tag mb-6 w-fit">{g("home_cta_tag")}</span>
                </AnimateIn>
                <AnimateIn direction="up" delay={200}>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                    {g("home_cta_heading")}<br />
                    <em className="text-italic-accent">{g("home_cta_heading_italic")}</em>
                  </h2>
                </AnimateIn>
                <AnimateIn direction="up" delay={300}>
                  <p className="font-body text-white/80 text-base leading-relaxed mb-10">{g("home_cta_body")}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="btn-gold">{g("home_cta_btn1")}</Link>
                    <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-foreground">
                      {g("home_cta_btn2")} <ArrowRight size={16} />
                    </Link>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Index;

