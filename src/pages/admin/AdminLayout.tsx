import { useEffect } from "react";
import { Navigate, Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Settings,
  Image,
  FileText,
  LogOut,
  Newspaper,
  Share2,
  ChevronRight,
  Loader2,
  Layers,
  Users,
  PenSquare,
  UserCheck,
  Inbox,
  Briefcase,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
  { label: "Hero Slides", href: "/admin/hero-slides", icon: Layers },
  { label: "Content Editor", href: "/admin/content", icon: PenSquare },
  { label: "Newsroom", href: "/admin/newsroom", icon: Newspaper },
  { label: "Media Library", href: "/admin/media", icon: Image },
  { label: "Social & Contact", href: "/admin/social", icon: Share2 },
  { label: "Trustees", href: "/admin/trustees", icon: UserCheck },
  { label: "Advisors", href: "/admin/advisors", icon: Briefcase },
  { label: "Contact Inbox", href: "/admin/inbox", icon: Inbox },
  { label: "Users", href: "/admin/users", icon: Users },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-primary flex flex-col shrink-0 min-h-screen">
        {/* Brand */}
        <div className="p-6 border-b border-primary-foreground/10">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/madef-logo.png"
              alt="MADE-F Logo"
              className="w-10 h-10 rounded-full object-cover shadow-sm transition-transform group-hover:scale-105"
            />
            <div>
              <span className="font-display font-bold text-base text-primary-foreground block">MADE-F</span>
              <span className="font-body text-xs text-primary-foreground/50">Admin Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href) && item.href !== "/admin";
            const isOverview = item.exact && location.pathname === "/admin";

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-200 group ${
                  isActive || isOverview
                    ? "bg-accent text-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <Icon size={16} />
                {item.label}
                {(isActive || isOverview) && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User & sign out */}
        <div className="p-4 border-t border-primary-foreground/10">
          <div className="mb-3 px-2">
            <p className="font-body text-xs text-primary-foreground/50">Signed in as</p>
            <p className="font-body text-sm text-primary-foreground truncate">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl font-body text-sm text-primary-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
