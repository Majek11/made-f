import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { AnimateIn } from "@/components/AnimateIn";
import { supabase } from "@/integrations/supabase/client";
import { Star, Shield, Users, Heart, Award } from "lucide-react";

const VALUE_ICONS = [Star, Shield, Users, Heart, Award];
const VALUE_COLORS = [
  { color: "bg-primary/10 text-primary", border: "border-primary/20", accent: "bg-primary" },
  { color: "bg-gold-light text-accent-foreground", border: "border-accent/30", accent: "bg-accent" },
  { color: "bg-green-light text-primary", border: "border-primary/20", accent: "bg-primary" },
  { color: "bg-secondary text-secondary-foreground", border: "border-border", accent: "bg-accent" },
  { color: "bg-primary/10 text-primary", border: "border-primary/20", accent: "bg-primary" },
];

const KEYS = [
  "values_intro",
  "value_1_title", "value_1_desc",
  "value_2_title", "value_2_desc",
  "value_3_title", "value_3_desc",
  "value_4_title", "value_4_desc",
  "value_5_title", "value_5_desc",
  "value_1_full", "value_2_full", "value_3_full", "value_4_full", "value_5_full",
];

const DEFAULTS: Record<string, string> = {
  values_intro:
    "Our values capture what our organisation proritises. Media Action & Development Foundation (MADE-F) leads with purpose and integrity in the pursuit of sustainable development solutions that are impactful, inclusive and grounded in evidence. We prioritise the use of robust data and rigorous analysis to inform our strategies and interventions. Our values are deeply rooted in the principles that personify who we are; what we stand for; and how we work. Our values not only define the organisational culture but also serve as guiding principles for decision-making, interactions and engagements with stakeholders; and by embracing these values, our organisation effectively contributes to sustainable development through evidence-driven decision making and programming while fostering a positive impact on communities nationwide.",
  value_1_title: "Making a Difference",
  value_1_desc: "We are committed to creating meaningful and tangible positive impacts in communities by prioritizing their unique needs and aspirations based on evidence.",
  value_1_full: "We are committed to creating meaningful and tangible positive impacts in communities and ecosystems by prioritizing their unique needs and aspirations based on evidence. Our work is guided by the belief that every action counts, and we strive to implement solutions that foster sustainable development and improve quality of life. We measure our success by the meaningful changes we facilitate and the lasting legacies we leave behind.",
  value_2_title: "Accountability",
  value_2_desc: "We hold ourselves accountable to our stakeholders, partners, communities, and the environment with transparency in our decisions, processes and outcomes.",
  value_2_full: "We hold ourselves accountable to our stakeholders, partners, communities, and the environment. Transparency in our decisions, processes and outcomes is paramount, ensuring that we take responsibility for our actions and continuously evaluate our effectiveness in achieving our mission. Furthermore, we strive to maintain high ethical standards in all our endeavours. We believe that accountability fosters trust among stakeholders and partners; and drives continuous improvement in our programmes and initiatives.",
  value_3_title: "Diversity, Equity, Inclusion & Accessibility",
  value_3_desc: "We embrace diversity in all its forms and recognise that varied perspectives enrich our understanding of complex challenges.",
  value_3_full: "We embrace diversity in all its forms and recognise that varied perspectives enrich our understanding of complex challenges. Our commitment to equity ensures that all voices are heard and valued, while our focus on inclusion guarantees that everyone has access to opportunities within our organisation and the programmes we implement, particularly those from marginalised communities. We aim to create environments where all individuals can thrive.",
  value_4_title: "Empathy",
  value_4_desc: "We approach our work with compassion and understanding, recognizing the unique experiences and challenges faced by different communities.",
  value_4_full: "We approach our work with compassion and understanding, recognizing the unique experiences and challenges faced by different communities. By actively listening to and understanding the lived experiences of communities we serve, we cultivate relationships built on trust and respect, allowing us to design programmes that truly resonate with the communities we support resulting in relevance and effectiveness.",
  value_5_title: "Fidelity",
  value_5_desc: "We are dedicated to maintaining integrity to evidence-based practices and principles in all our programming efforts.",
  value_5_full: "We are dedicated to maintaining integrity to evidence-based practices and principles in all our programming efforts. Our commitment to rigorous research, data integrity and continuous learning ensures that our strategies are grounded in reality and tailored to meet the specific needs of communities, ultimately enhancing our effectiveness in promoting sustainable development. We value collaboration with experts and stakeholders to uphold the highest standards of quality in our work.",
};

const Values = () => {
  const [cfg, setCfg] = useState<Record<string, string>>(DEFAULTS);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", KEYS)
      .then(({ data }) => {
        if (data?.length) {
          const map = { ...DEFAULTS };
          data.forEach((r) => { if (r.value) map[r.key] = r.value; });
          setCfg(map);
        }
      });
  }, []);

  const g = (k: string) => cfg[k] ?? DEFAULTS[k] ?? "";

  const values = [1, 2, 3, 4, 5].map((n, i) => ({
    icon: VALUE_ICONS[i],
    title: g(`value_${n}_title`),
    desc: g(`value_${n}_full`) || g(`value_${n}_desc`),
    ...VALUE_COLORS[i],
  }));

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto text-center">
          <AnimateIn direction="up" duration={700}>
            <span className="section-tag mb-6 inline-block">What We Stand For</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
              Our Core <em className="text-italic-accent">Values</em>
            </h1>
            <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
              The principles that define our culture, guide our decisions, and shape every interaction.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-cream-dark">
        <div className="container mx-auto max-w-3xl text-center">
          <AnimateIn direction="up" duration={650}>
            <p className="font-body text-muted-foreground text-lg leading-relaxed">
              {g("values_intro")}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          {/* MADE-F acronym header */}
          <AnimateIn direction="up" className="text-center mb-16">
            <div className="flex justify-center gap-3 mb-6">
              {"MADEF".split("").map((letter, i) => (
                <span key={i} className="font-display text-4xl font-bold text-primary">
                  {letter}
                  <span className="text-accent">.</span>
                </span>
              ))}
            </div>
            <p className="font-body text-muted-foreground text-sm">
              Each letter represents a core value that defines who we are
            </p>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <AnimateIn
                  key={v.title}
                  direction="up"
                  delay={i * 80}
                  duration={650}
                  className={`bg-card rounded-2xl p-8 border ${v.border} hover-lift shadow-card group cursor-default ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${v.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">{v.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{v.desc}</p>
                  <div className={`h-1 w-12 rounded-full mt-6 transition-all duration-300 group-hover:w-full ${v.accent}`} />
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Values;
