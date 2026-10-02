import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { AnimateIn } from "@/components/AnimateIn";
import { supabase } from "@/integrations/supabase/client";
import aboutImg from "@/assets/about-img.jpg";
import { Loader2 } from "lucide-react";

const ABOUT_KEYS = ["about_paragraph_1", "about_paragraph_2", "about_paragraph_3", "about_tags"];

const DEFAULTS: Record<string, string> = {
  about_paragraph_1:
    "Media Action & Development Foundation (MADE-F) is a social enterprise and brainchild of Professor Abigail Ogwezzy-Ndisika, founded to mark her golden jubilee. It is a platform dedicated to practising development beyond the classroom.",
  about_paragraph_2:
    "MADE-F is a focused practice organisation that deploys data-driven insights, media action, strategic communication, Social and Behavioural Change Communication (SBCC) and Risk Communication & Community Engagement (RC&CE) to promote sustainable development.",
  about_paragraph_3:
    "It is also a laboratory for growing budding journalism and communication professionals; and serves as a bridge between classroom and industry.",
  about_tags: "Data-Driven,SBCC,RC&CE,Journalism Lab,Strategic Comms",
};

const About = () => {
  const [content, setContent] = useState<Record<string, string>>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ABOUT_KEYS);
      if (data && data.length > 0) {
        const map: Record<string, string> = { ...DEFAULTS };
        data.forEach((r) => { if (r.value) map[r.key] = r.value; });
        setContent(map);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const tags = content.about_tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto text-center">
          <AnimateIn direction="up" duration={700}>
            <span className="section-tag mb-6 inline-block">Who We Are</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
              About <em className="text-italic-accent">MADE-F</em>
            </h1>
            <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
              A social enterprise built on the belief that development happens beyond the classroom.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={28} className="animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <AnimateIn direction="left" duration={750}>
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-accent opacity-30" />
                  <img
                    src={aboutImg}
                    alt="Community engagement session"
                    className="relative rounded-3xl object-cover w-full h-[500px] shadow-hover"
                  />
                  <div className="absolute -bottom-6 -right-4 bg-primary text-primary-foreground rounded-2xl px-6 py-4 shadow-hover animate-float">
                    <p className="font-display text-3xl font-bold">Prof.</p>
                    <p className="font-body text-xs text-primary-foreground/80 mt-1">Founded by<br />Abigail Ogwezzy-Ndisika</p>
                  </div>
                </div>
              </AnimateIn>

              {/* Text */}
              <AnimateIn direction="right" delay={150} duration={750}>
                <span className="section-tag mb-4">Our Story</span>
                <h2 className="font-display text-4xl font-bold text-foreground mt-4 mb-6 leading-tight">
                  Practice beyond <em className="text-italic-accent">classroom</em>
                </h2>
                <p className="font-body text-muted-foreground text-base leading-relaxed mb-5">
                  {content.about_paragraph_1}
                </p>
                <p className="font-body text-muted-foreground text-base leading-relaxed mb-5">
                  {content.about_paragraph_2}
                </p>
                <p className="font-body text-muted-foreground text-base leading-relaxed mb-8">
                  {content.about_paragraph_3}
                </p>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </AnimateIn>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default About;
