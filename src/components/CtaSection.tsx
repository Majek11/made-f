import ctaBg from "@/assets/cta-bg.jpg";
import { ArrowRight, Mail } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-hover relative">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ctaBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-hero" />

          {/* Content */}
          <div className="relative grid md:grid-cols-2 min-h-[480px]">
            {/* Left — empty to show image */}
            <div />

            {/* Right — CTA text */}
            <div className="flex flex-col justify-center p-12 md:p-16">
              <span className="section-tag mb-6 w-fit">Get Involved</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Join us in building
                <br />
                <em className="text-italic-accent">informed communities</em>
              </h2>
              <p className="font-body text-white/80 text-base leading-relaxed mb-10 max-w-sm">
                Whether you're a researcher, journalist, communicator or community advocate —
                MADE-F has a place for you. Let's bridge knowledge and action together.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:info@made-foundation.org" className="btn-gold">
                  <Mail size={16} /> Contact Us
                </a>
                <a href="#about" className="btn-outline border-white text-white hover:bg-white hover:text-foreground">
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
