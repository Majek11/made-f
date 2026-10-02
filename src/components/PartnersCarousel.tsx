import { AnimateIn } from "@/components/AnimateIn";

import icirLogo from "@/assets/partners/icir.jpeg";
import wardcLogo from "@/assets/partners/wardc.jpg";
import hurrecLogo from "@/assets/partners/hurrec.jpg";

const PARTNERS = [
  { name: "ICIR", logo: icirLogo },
  { name: "WARDC", logo: wardcLogo },
  { name: "HURREC", logo: hurrecLogo },
];

export function PartnersCarousel() {
  const items = [
    ...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS,
    ...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS,
  ];

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto mb-10">
        <AnimateIn direction="up">
          <div className="text-center">
            <span className="section-tag mb-4">Our Partners</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 leading-tight">
              Trusted by <em className="text-italic-accent">leading organisations</em>
            </h2>
          </div>
        </AnimateIn>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-[scroll_25s_linear_infinite] hover:[animation-play-state:paused] w-max">
          {items.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
            >
              <div className="w-28 h-28 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-hover transition-all duration-300 flex items-center justify-center group overflow-hidden p-3 hover:-translate-y-1">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
