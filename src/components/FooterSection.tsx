import { useState } from "react";
import { Facebook, Twitter, Linkedin, Mail, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
});

const FOOTER_LINKS = [
  {
    title: "Organisation",
    links: [
      { label: "About MADE-F", href: "/about" },
      { label: "Vision & Mission", href: "/mission" },
      { label: "Our Values", href: "/values" },
      { label: "Our Impact", href: "/impact" },
    ],
  },
  {
    title: "Programmes",
    links: [
      { label: "Community Journalism", href: "/programmes/community-journalism-fellowship" },
      { label: "Dialogue & Policy", href: "/programmes/dialogue-and-policy-series" },
      { label: "Gender & Inclusion", href: "/programmes/gender-and-social-inclusion" },
      { label: "Youth Digital Leadership", href: "/programmes/youth-digital-leadership" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Partner With Us", href: "/contact" },
      { label: "Newsroom", href: "/newsroom/blogs" },
      { label: "All Newsletters", href: "/newsroom/newsletters" },
    ],
  },
];

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
    }, 800);
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="container mx-auto py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="section-tag mb-3 inline-block">Newsletter</span>
              <h3 className="font-display text-2xl font-bold text-primary-foreground leading-snug mt-1">
                Stay connected with <em className="text-italic-accent">Community Voices</em>
              </h3>
              <p className="font-body text-sm text-white/60 mt-2 leading-relaxed max-w-sm">
                Get MADE-F's quarterly newsletter — programme updates, field stories, research insights and opportunities delivered to your inbox.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-6 py-4">
                  <CheckCircle size={20} className="text-accent flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm font-semibold text-primary-foreground">You're subscribed!</p>
                    <p className="font-body text-xs text-white/60 mt-0.5">
                      Look out for the next edition of Community Voices in your inbox.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} noValidate>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Your email address"
                        maxLength={255}
                        className={`w-full px-5 py-3 rounded-full font-body text-sm text-foreground bg-white/10 border placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                        error
                            ? "border-destructive focus:ring-destructive"
                            : "border-white/20 hover:border-white/30"
                        }`}
                      />
                      {error && (
                        <p className="font-body text-xs text-destructive mt-1.5 pl-2">{error}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Subscribing…" : (
                        <><span>Subscribe</span> <ArrowRight size={15} /></>
                      )}
                    </button>
                  </div>
                  <p className="font-body text-xs text-white/35 mt-2 pl-2">
                    No spam. Unsubscribe anytime. View our{" "}
                    <Link to="/newsroom/newsletters" className="underline hover:text-white/60 transition-colors">
                      archive
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <img
                src="/madef-logo.png"
                alt="MADE-F Logo"
                className="w-12 h-12 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p className="font-display font-bold text-lg leading-tight text-primary-foreground">MADE-F</p>
                <p className="text-xs text-white/50 font-body">Media Action &amp; Development</p>
              </div>
            </Link>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
              A social enterprise deploying evidence-driven media and communication for sustainable development in Nigeria.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm tracking-wide text-white/90 mb-4 uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-white/55 hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © 2025 Media Action & Development Foundation. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="mailto:info@made-foundation.org" className="flex items-center gap-2 font-body text-xs text-white/55 hover:text-accent transition-colors">
              <Mail size={13} /> info@made-foundation.org
            </a>
            <a href="tel:+234" className="flex items-center gap-2 font-body text-xs text-white/55 hover:text-accent transition-colors">
              <Phone size={13} /> +234 (0) 000 0000
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
