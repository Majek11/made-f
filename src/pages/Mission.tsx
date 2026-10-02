import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { AnimateIn } from "@/components/AnimateIn";
import { Eye, Target, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const KEYS = ["mission_vision_text", "mission_mission_text", "mission_extended_text"];

const DEFAULTS: Record<string, string> = {
  mission_vision_text: "To create a future where every individual has the opportunity to thrive.",
  mission_mission_text:
    "To design and implement impactful evidence-driven media programmes that bridge the gap between knowledge and action, amplify voices, promote social equity and cultivate informed citizenry for sustainable development. Through collaboration and innovation, we strive to create a resilient society where every individual has the opportunity to thrive and contribute to a brighter future.",
  mission_extended_text:
    "Through collaboration and innovation, we strive to create a resilient society where every individual has the opportunity to thrive and contribute to a brighter future.",
};

const Mission = () => {
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

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto text-center">
          <AnimateIn direction="up" duration={700}>
            <span className="section-tag mb-6 inline-block">Our Purpose</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
              Vision & <em className="text-italic-accent">Mission</em>
            </h1>
            <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
              The guiding principles and aspirations that drive everything MADE-F does.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Vision */}
            <AnimateIn direction="left" duration={700}>
              <div className="bg-primary rounded-3xl p-12 text-primary-foreground relative overflow-hidden hover-lift shadow-card h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-8">
                    <Eye size={28} className="text-foreground" />
                  </div>
                  <p className="font-body text-xs font-semibold tracking-widest uppercase text-primary-foreground/60 mb-4">
                    Our Vision
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6">
                    {g("mission_vision_text")}
                  </h2>
                </div>
              </div>
            </AnimateIn>

            {/* Mission */}
            <AnimateIn direction="right" delay={120} duration={700}>
              <div className="bg-card rounded-3xl p-12 border border-border relative overflow-hidden hover-lift shadow-card h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gold-light flex items-center justify-center mb-8">
                    <Target size={28} className="text-primary" />
                  </div>
                  <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                    Our Mission
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6 text-foreground">
                    Bridging knowledge and action.
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed text-base">
                    {g("mission_mission_text")}
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Extended Mission */}
          <AnimateIn direction="up" delay={100} duration={700}>
            <div className="bg-cream-dark rounded-3xl p-12 md:p-16 text-center">
              <span className="section-tag mb-6 inline-block">Through Collaboration & Innovation</span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {g("mission_extended_text")}
              </h3>
              <a href="/contact" className="btn-gold inline-flex mt-4">
                Get Involved <ArrowRight size={16} />
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Mission;
