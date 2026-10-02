import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowLeft, GraduationCap, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Advisor {
  id: string;
  name: string;
  title: string;
  slug: string;
  short_bio: string;
  full_bio: string | null;
  image_url: string | null;
  education: string | null;
  area: string;
}

const AdvisorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchAdvisor = async () => {
      const { data } = await supabase
        .from("advisors")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      setAdvisor(data as Advisor | null);
      setLoading(false);
    };
    fetchAdvisor();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center pt-40 pb-24">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
        <FooterSection />
      </div>
    );
  }

  if (!advisor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-40 pb-24 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Member Not Found</h1>
          <p className="font-body text-muted-foreground mb-8">The advisor profile you are looking for does not exist.</p>
          <Link to="/about/advisory-boards" className="btn-primary">
            <ArrowLeft size={16} /> Back to Advisory Boards
          </Link>
        </div>
        <FooterSection />
      </div>
    );
  }

  const initials = advisor.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto">
          <Link to="/about/advisory-boards" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground font-body text-sm mb-8 transition-colors">
            <ArrowLeft size={15} /> Back to Advisory Boards
          </Link>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden bg-secondary flex-shrink-0 border-4 border-primary-foreground/10">
              {advisor.image_url ? (
                <img src={advisor.image_url} alt={advisor.name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-foreground/20 to-primary-foreground/5">
                  <span className="font-display text-5xl font-bold text-primary-foreground/40">{initials}</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <span className="section-tag mb-4 inline-block">Expertise</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mt-2">{advisor.name}</h1>
              <p className="font-body text-primary-foreground/70 text-lg mt-3">{advisor.title}</p>
              <span className="inline-block mt-4 font-body text-xs font-semibold px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/80">{advisor.area}</span>
              {advisor.education && (
                <div className="mt-6 flex items-start gap-3 text-primary-foreground/60">
                  <GraduationCap size={18} className="mt-0.5 flex-shrink-0" />
                  <p className="font-body text-sm leading-relaxed">{advisor.education}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none font-body text-foreground/80 leading-relaxed [&_p]:mb-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_a]:text-primary [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: advisor.full_bio || "" }}
            />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default AdvisorProfile;
