import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import focusCommunity from "@/assets/focus-community.jpg";
import focusJournalism from "@/assets/focus-journalism.jpg";
import focusMedia from "@/assets/focus-media.jpg";
import focusData from "@/assets/focus-data.jpg";

const ABOUT_ITEMS = [
  { label: "Board of Trustees", href: "/about/board-of-trustees" },
  { label: "Advisory Boards", href: "/about/advisory-boards" },
];

const PROGRAMMES_ITEMS = [
  { label: "All Programmes", href: "/programmes" },
  { label: "Community Journalism Fellowship", href: "/programmes/community-journalism-fellowship" },
  { label: "Dialogue and Policy Series", href: "/programmes/dialogue-and-policy-series" },
  { label: "Gender and Social Inclusion", href: "/programmes/gender-and-social-inclusion" },
  { label: "Journalism and Communication (JAC)", href: "/programmes/jac" },
  { label: "Youth Digital and Leadership Programmes", href: "/programmes/youth-digital-leadership" },
  { label: "Conference", href: "/programmes/conference" },
];

const NEWSROOM_ITEMS = [
  { label: "Blogs", href: "/newsroom/blogs" },
  { label: "Photo News", href: "/newsroom/photo-news" },
  { label: "MADE Foundation in the News", href: "/newsroom/made-in-the-news" },
  { label: "Press Releases", href: "/newsroom/press-releases" },
  { label: "Communique", href: "/newsroom/communique" },
  { label: "Speeches", href: "/newsroom/speeches" },
  { label: "Newsletters", href: "/newsroom/newsletters" },
];

const SIMPLE_NAV_LINKS = [
  { label: "Mission", href: "/mission" },
  { label: "Values", href: "/values" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
];

type MegaMenuKey = "about" | "programmes" | "newsroom" | null;

interface MegaMenuProps {
  items: { label: string; href: string }[];
  images: string[];
  isOpen: boolean;
}

const MegaMenuDropdown = ({ items, images, isOpen }: MegaMenuProps) => {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[720px] bg-white rounded-xl shadow-hover border border-border overflow-hidden transition-all duration-200 ${
        isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      style={{ zIndex: 100 }}
    >
      <div className="flex">
        {/* Links column */}
        <div className="flex-1 p-6">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="block py-2 px-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/60 rounded-md transition-colors font-body"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Images column */}
        <div className="w-56 p-4 flex flex-col gap-3 bg-muted/30">
          {images.map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden flex-1 min-h-[100px]">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15,
      ease: "easeInOut",
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MegaMenuKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [siteName, setSiteName] = useState<string>("MADE-F");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["logo_url", "site_name"]);
      data?.forEach((row) => {
        if (row.key === "logo_url" && row.value) setLogoUrl(row.value);
        if (row.key === "site_name" && row.value) setSiteName(row.value);
      });
    };
    fetchSiteSettings();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMenuOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isTransparent = isHome && !isScrolled && !activeMenu && !menuOpen;

  const handleMenuEnter = (key: MegaMenuKey) => setActiveMenu(key);
  const handleMenuLeave = () => setActiveMenu(null);

  const navTextClass = isTransparent ? "text-white/90" : "text-foreground/80";
  const chevronClass = isTransparent ? "text-white/70" : "text-muted-foreground";

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome || activeMenu || menuOpen
          ? "bg-card/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={siteName}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-sm">
              M
            </div>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* About */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuEnter("about")}
            onMouseLeave={handleMenuLeave}
          >
            <button
              className={`flex items-center gap-1 font-body text-sm font-medium px-3 py-2 rounded-md transition-colors hover:text-accent ${navTextClass} ${
                location.pathname.startsWith("/about") ? "text-accent font-semibold" : ""
              }`}
            >
              About Us
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${chevronClass} ${
                  activeMenu === "about" ? "rotate-180" : ""
                }`}
              />
            </button>
            <MegaMenuDropdown
              items={ABOUT_ITEMS}
              images={[focusData, focusCommunity]}
              isOpen={activeMenu === "about"}
            />
          </div>

          {/* Programmes */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuEnter("programmes")}
            onMouseLeave={handleMenuLeave}
          >
            <Link
              to="/programmes"
              className={`flex items-center gap-1 font-body text-sm font-medium px-3 py-2 rounded-md transition-colors hover:text-accent ${navTextClass} ${
                location.pathname.startsWith("/programmes") ? "text-accent font-semibold" : ""
              }`}
            >
              Programmes
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${chevronClass} ${
                  activeMenu === "programmes" ? "rotate-180" : ""
                }`}
              />
            </Link>
            <MegaMenuDropdown
              items={PROGRAMMES_ITEMS}
              images={[focusCommunity, focusJournalism]}
              isOpen={activeMenu === "programmes"}
            />
          </div>

          {/* Newsroom */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuEnter("newsroom")}
            onMouseLeave={handleMenuLeave}
          >
            <button
              className={`flex items-center gap-1 font-body text-sm font-medium px-3 py-2 rounded-md transition-colors hover:text-accent ${navTextClass} ${
                location.pathname.startsWith("/newsroom") ? "text-accent font-semibold" : ""
              }`}
            >
              Newsroom
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${chevronClass} ${
                  activeMenu === "newsroom" ? "rotate-180" : ""
                }`}
              />
            </button>
            <MegaMenuDropdown
              items={NEWSROOM_ITEMS}
              images={[focusMedia, focusData]}
              isOpen={activeMenu === "newsroom"}
            />
          </div>

          {/* Simple links */}
          {SIMPLE_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-body text-sm font-medium px-3 py-2 rounded-md transition-colors hover:text-accent ${navTextClass} ${
                location.pathname === link.href ? "text-accent font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link to="/contact" className="hidden lg:block btn-gold text-sm px-5 py-2.5 flex-shrink-0">
          Get Involved
        </Link>

        {/* Mobile Animated Hamburger Toggle Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden relative z-50 p-2.5 rounded-xl transition-colors duration-200 focus:outline-none flex flex-col justify-center items-center w-10 h-10 ${
            isTransparent
              ? "text-white hover:bg-white/10 active:bg-white/20"
              : "text-foreground hover:bg-muted active:bg-muted/80"
          }`}
        >
          <div className="w-5 h-4 flex flex-col justify-between items-center relative">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-5 h-0.5 bg-current rounded-full origin-center block"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-5 h-0.5 bg-current rounded-full block"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-5 h-0.5 bg-current rounded-full origin-center block"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay & Sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-[72px] bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Animated Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[72px] bottom-0 z-40 lg:hidden bg-card/98 backdrop-blur-xl border-t border-border shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <motion.nav
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="container mx-auto px-5 py-6 flex flex-col gap-2"
              >
                {/* About Accordion */}
                <motion.div variants={mobileItemVariants} className="border-b border-border/50 pb-2">
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full font-body font-semibold text-base py-3 px-3 rounded-xl transition-colors ${
                      mobileExpanded === "about" || location.pathname.startsWith("/about")
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:bg-secondary/40"
                    }`}
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === "about" ? null : "about")
                    }
                  >
                    <span>About Us</span>
                    <motion.div
                      animate={{ rotate: mobileExpanded === "about" ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} className="text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileExpanded === "about" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pl-3 pt-1 pb-1 flex flex-col gap-1 border-l-2 border-accent/40 ml-4 mt-1"
                      >
                        {ABOUT_ITEMS.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className={`font-body text-sm py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                              location.pathname === item.href
                                ? "bg-accent/15 text-accent font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Programmes Accordion */}
                <motion.div variants={mobileItemVariants} className="border-b border-border/50 pb-2">
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full font-body font-semibold text-base py-3 px-3 rounded-xl transition-colors ${
                      mobileExpanded === "programmes" || location.pathname.startsWith("/programmes")
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:bg-secondary/40"
                    }`}
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === "programmes" ? null : "programmes")
                    }
                  >
                    <span>Programmes</span>
                    <motion.div
                      animate={{ rotate: mobileExpanded === "programmes" ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} className="text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileExpanded === "programmes" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pl-3 pt-1 pb-1 flex flex-col gap-1 border-l-2 border-accent/40 ml-4 mt-1"
                      >
                        {PROGRAMMES_ITEMS.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className={`font-body text-sm py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                              location.pathname === item.href
                                ? "bg-accent/15 text-accent font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Newsroom Accordion */}
                <motion.div variants={mobileItemVariants} className="border-b border-border/50 pb-2">
                  <button
                    type="button"
                    className={`flex items-center justify-between w-full font-body font-semibold text-base py-3 px-3 rounded-xl transition-colors ${
                      mobileExpanded === "newsroom" || location.pathname.startsWith("/newsroom")
                        ? "text-accent bg-accent/10"
                        : "text-foreground hover:bg-secondary/40"
                    }`}
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === "newsroom" ? null : "newsroom")
                    }
                  >
                    <span>Newsroom</span>
                    <motion.div
                      animate={{ rotate: mobileExpanded === "newsroom" ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} className="text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileExpanded === "newsroom" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pl-3 pt-1 pb-1 flex flex-col gap-1 border-l-2 border-accent/40 ml-4 mt-1"
                      >
                        {NEWSROOM_ITEMS.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className={`font-body text-sm py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                              location.pathname === item.href
                                ? "bg-accent/15 text-accent font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Simple Nav Links */}
                {SIMPLE_NAV_LINKS.map((link) => (
                  <motion.div key={link.label} variants={mobileItemVariants}>
                    <Link
                      to={link.href}
                      className={`font-body text-base font-semibold py-3 px-3 rounded-xl transition-colors block ${
                        location.pathname === link.href
                          ? "text-accent bg-accent/10"
                          : "text-foreground hover:bg-secondary/40 hover:text-accent"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bottom Callout & CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="container mx-auto px-5 pb-8 pt-4 flex flex-col gap-4 border-t border-border/60 bg-muted/20 mt-auto"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-accent uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={13} /> MADE Foundation
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Empowering Voices, Transforming Communities
                    </p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold shadow-gold"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Involved
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

