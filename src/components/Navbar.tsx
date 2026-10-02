import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

// Simple dropdown for About (fewer items, no images needed — uses 2 images)
interface SimpleDropdownProps {
  items: { label: string; href: string }[];
  isOpen: boolean;
}

const SimpleDropdown = ({ items, isOpen }: SimpleDropdownProps) => (
  <div
    className={`absolute top-full left-0 mt-0 w-56 bg-white rounded-xl shadow-hover border border-border overflow-hidden transition-all duration-200 ${
      isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
    }`}
    style={{ zIndex: 100 }}
  >
    <ul className="py-2">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            to={item.href}
            className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/60 transition-colors font-body"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

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

  const isTransparent = isHome && !isScrolled && !activeMenu;

  const handleMenuEnter = (key: MegaMenuKey) => setActiveMenu(key);
  const handleMenuLeave = () => setActiveMenu(null);

  const navTextClass = isTransparent ? "text-white/90" : "text-foreground/80";
  const chevronClass = isTransparent ? "text-white/70" : "text-muted-foreground";

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome || activeMenu
          ? "bg-card/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={siteName}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
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

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isTransparent ? "text-white" : "text-foreground"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-card border-b border-border shadow-card">
          <nav className="container py-4 flex flex-col gap-1">
            {/* About accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full font-body font-medium py-2.5 px-2 text-foreground hover:text-primary transition-colors"
                onClick={() =>
                  setMobileExpanded(mobileExpanded === "about" ? null : "about")
                }
              >
                About Us
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileExpanded === "about" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileExpanded === "about" && (
                <div className="pl-4 pb-1 flex flex-col gap-1">
                  {ABOUT_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="font-body text-sm py-2 text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Programmes accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full font-body font-medium py-2.5 px-2 text-foreground hover:text-primary transition-colors"
                onClick={() =>
                  setMobileExpanded(mobileExpanded === "programmes" ? null : "programmes")
                }
              >
                Programmes
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileExpanded === "programmes" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileExpanded === "programmes" && (
                <div className="pl-4 pb-1 flex flex-col gap-1">
                  {PROGRAMMES_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="font-body text-sm py-2 text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Newsroom accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full font-body font-medium py-2.5 px-2 text-foreground hover:text-primary transition-colors"
                onClick={() =>
                  setMobileExpanded(mobileExpanded === "newsroom" ? null : "newsroom")
                }
              >
                Newsroom
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileExpanded === "newsroom" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileExpanded === "newsroom" && (
                <div className="pl-4 pb-1 flex flex-col gap-1">
                  {NEWSROOM_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="font-body text-sm py-2 text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Simple links */}
            {SIMPLE_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-body font-medium py-2.5 px-2 hover:text-primary transition-colors ${
                  location.pathname === link.href
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="btn-gold w-fit mt-3"
              onClick={() => setMenuOpen(false)}
            >
              Get Involved
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
