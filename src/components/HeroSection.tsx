import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import hero1 from "@/assets/hero-1.jpeg";
import hero2 from "@/assets/hero-2.jpeg";
import hero3 from "@/assets/hero-3.jpeg";

// Fallback images by slide order index (0-based)
const FALLBACK_IMAGES: string[] = [hero1, hero2, hero3];

const STAT_BG_TEXT = [
  { bg: "bg-accent", text: "text-foreground" },
  { bg: "bg-green-light", text: "text-primary" },
  { bg: "bg-primary", text: "text-primary-foreground" },
  { bg: "bg-secondary", text: "text-secondary-foreground" },
];

interface HeroSlide {
  id: string;
  display_order: number;
  tag: string;
  heading: string;
  sub_heading: string;
  image_url: string;
  is_active: boolean;
}

interface StatCard {
  value: string;
  label: string;
  bg: string;
  text: string;
}

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [stats, setStats] = useState<StatCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [slidesRes, settingsRes] = await Promise.all([
        supabase.from("hero_slides").select("*").eq("is_active", true).order("display_order"),
        supabase.from("site_settings").select("key, value").in("key", [
          "stat_1_value", "stat_1_label",
          "stat_2_value", "stat_2_label",
          "stat_3_value", "stat_3_label",
          "stat_4_value", "stat_4_label",
        ]),
      ]);

      if (slidesRes.data && slidesRes.data.length > 0) {
        setSlides(slidesRes.data as HeroSlide[]);
      }

      if (settingsRes.data) {
        const m: Record<string, string> = {};
        settingsRes.data.forEach((r) => { m[r.key] = r.value ?? ""; });
        const built: StatCard[] = [1, 2, 3, 4].map((n, i) => ({
          value: m[`stat_${n}_value`] ?? "",
          label: m[`stat_${n}_label`] ?? "",
          bg: STAT_BG_TEXT[i].bg,
          text: STAT_BG_TEXT[i].text,
        }));
        setStats(built);
      }
    };
    fetchData();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Use DB slides if available, else empty (page still renders without crash)
  const activeSlides = slides;
  const currentSlide = activeSlides[selectedIndex];

  return (
    <>
      {/* Hero slider */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="overflow-hidden absolute inset-0" ref={emblaRef}>
          <div className="flex h-full" style={{ height: "100vh" }}>
            {activeSlides.map((slide, i) => (
              <div
                key={slide.id}
                className="relative min-w-full flex-shrink-0"
                style={{ height: "100vh" }}
              >
                {/* Background image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out ${
                    i === selectedIndex ? "scale-105" : "scale-100"
                  }`}
                  style={{
                    backgroundImage: `url(${slide.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length] || hero1})`,
                  }}
                />
                {/* Dark overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(30 8% 4% / 0.65) 0%, hsl(30 8% 4% / 0.78) 60%, hsl(30 8% 4% / 0.90) 100%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Centred content */}
        <div className="relative flex-1 flex items-center justify-center z-10">
          <div className="container mx-auto pt-28 pb-16 text-center">
            <div className="max-w-3xl mx-auto animate-fade-up">
              {currentSlide && (
                <>
                  <span className="section-tag mb-6 inline-block animate-pulse-glow">
                    {currentSlide.tag}
                  </span>

                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 transition-all duration-500">
                    {currentSlide.heading}
                  </h1>

                  <p className="font-body text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-500">
                    {currentSlide.sub_heading}
                  </p>
                </>
              )}

              <div className="flex flex-wrap gap-4 justify-center mb-10">
                <Link to="/about" className="btn-gold shadow-gold hover:scale-105">
                  Discover Our Work <ArrowRight size={16} />
                </Link>
                <Link
                  to="/mission"
                  className="btn-outline border-white text-white hover:bg-white hover:text-foreground hover:scale-105"
                >
                  Our Mission
                </Link>
              </div>

              <p className="font-body text-white/50 text-sm mb-8">
                Building informed communities since 2024
              </p>

              {/* Slide controls */}
              {activeSlides.length > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={scrollPrev}
                    aria-label="Previous slide"
                    className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex gap-2">
                    {activeSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => emblaApi?.scrollTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          i === selectedIndex
                            ? "w-6 h-2 bg-accent shadow-gold"
                            : "w-2 h-2 bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={scrollNext}
                    aria-label="Next slide"
                    className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <div className="relative z-10 container mx-auto px-4 -mt-28">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden shadow-hover border border-white/10">
          {activeStats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.text} p-7 md:p-10 flex flex-col justify-between min-h-[220px] group transition-all duration-300 hover:-translate-y-2 hover:z-20 hover:shadow-2xl`}
            >
              <p className="font-body text-xs font-semibold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                {stat.label}
              </p>
              <div>
                <p className="font-display text-5xl md:text-6xl font-bold mb-2 leading-none group-hover:scale-105 transition-transform duration-300 origin-left">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
