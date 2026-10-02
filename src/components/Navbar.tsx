import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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

// Mobile Menu rendered as a Portal so it is never clipped by parent transforms/filters
interface MobileMenuPortalProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  mobileExpanded: string | null;
  setMobileExpanded: (v: string | null) => void;
  location: ReturnType<typeof useLocation>;
}

const MobileMenuPortal = ({
  menuOpen,
  setMenuOpen,
  mobileExpanded,
  setMobileExpanded,
  location,
}: MobileMenuPortalProps) => {
  if (typeof document === "undefined") return null;

  const toggle = (key: string) =>
    setMobileExpanded(mobileExpanded === key ? null : key);

  const AccordionSection = ({
    id,
    label,
    items,
  }: {
    id: string;
    label: string;
    items: { label: string; href: string }[];
  }) => (
    <div className="border-b border-gray-200">
      <button
        type="button"
        className="flex items-center justify-between w-full py-4 px-4 text-left"
        onClick={() => toggle(id)}
      >
        <span
          className={`font-semibold text-base ${
            mobileExpanded === id ? "text-yellow-600" : "text-gray-900"
          }`}
        >
          {label}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 text-gray-500 ${
            mobileExpanded === id ? "rotate-180" : ""
          }`}
        />
      </button>
      {mobileExpanded === id && (
        <div className="pb-2 pl-4 pr-4 flex flex-col gap-1 border-l-2 border-yellow-400 ml-4 mb-2">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`block py-2.5 px-3 rounded-lg text-sm transition-colors ${
                location.pathname === item.href
                  ? "bg-yellow-50 text-yellow-700 font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return createPortal(
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              top: 72,
              backgroundColor: "rgba(0,0,0,0.55)",
              zIndex: 9998,
            }}
          />

          {/* Menu panel */}
          <motion.div
            key="mobile-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 72,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              backgroundColor: "#faf9f7",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Nav links */}
            <div className="flex-1 px-4 py-2">
              <AccordionSection id="about" label="About Us" items={ABOUT_ITEMS} />
              <AccordionSection id="programmes" label="Programmes" items={PROGRAMMES_ITEMS} />
              <AccordionSection id="newsroom" label="Newsroom" items={NEWSROOM_ITEMS} />

              {SIMPLE_NAV_LINKS.map((link) => (
                <div key={link.label} className="border-b border-gray-200">
                  <Link
                    to={link.href}
                    className={`block py-4 px-4 font-semibold text-base transition-colors ${
                      location.pathname === link.href
                        ? "text-yellow-600"
                        : "text-gray-900 hover:text-yellow-600"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA section */}
            <div className="px-4 pt-4 pb-10 border-t border-gray-200 bg-gray-50">
              <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Sparkles size={12} /> MADE Foundation
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Empowering Voices, Transforming Communities
              </p>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-gold w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold"
              >
                Get Involved
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdowns on outside click
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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isTransparent = isHome && !isScrolled && !activeMenu && !menuOpen;

  const navTextClass = isTransparent ? "text-white/90" : "text-foreground/80";
  const chevronClass = isTransparent ? "text-white/70" : "text-muted-foreground";

  return (
    <>
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
              <img src={logoUrl} alt={siteName} className="h-10 w-auto object-contain" />
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
              onMouseEnter={() => setActiveMenu("about")}
              onMouseLeave={() => setActiveMenu(null)}
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
              onMouseEnter={() => setActiveMenu("programmes")}
              onMouseLeave={() => setActiveMenu(null)}
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
              onMouseEnter={() => setActiveMenu("newsroom")}
              onMouseLeave={() => setActiveMenu(null)}
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

          {/* Desktop CTA */}
          <Link to="/contact" className="hidden lg:block btn-gold text-sm px-5 py-2.5 flex-shrink-0">
            Get Involved
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`lg:hidden flex flex-col justify-center items-center w-11 h-11 rounded-xl transition-colors duration-150 focus:outline-none cursor-pointer ${
              isTransparent
                ? "text-white"
                : "text-gray-800"
            }`}
          >
            {/* Three-line icon: plain CSS, no framer-motion to avoid render bugs on mobile */}
            <span
              className="block w-6 h-0.5 bg-current rounded-full transition-all duration-250 origin-center"
              style={{
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 bg-current rounded-full my-1.5 transition-all duration-200"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="block w-6 h-0.5 bg-current rounded-full transition-all duration-250 origin-center"
              style={{
                transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu rendered via Portal — escapes header stacking context so fixed works on iOS */}
      <MobileMenuPortal
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        mobileExpanded={mobileExpanded}
        setMobileExpanded={setMobileExpanded}
        location={location}
      />
    </>
  );
};

export default Navbar;
