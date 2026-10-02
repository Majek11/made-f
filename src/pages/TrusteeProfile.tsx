import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowLeft, Loader2, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TrusteeProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [trustee, setTrustee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!slug) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("trustees")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      setTrustee(data);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center pt-48">
          <Loader2 size={36} className="animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!trustee) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-40 pb-24 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Member Not Found</h1>
          <p className="font-body text-muted-foreground mb-8">The trustee profile you are looking for does not exist.</p>
          <Link to="/about/board-of-trustees" className="btn-primary">
            <ArrowLeft size={16} /> Back to Board
          </Link>
        </div>
        <FooterSection />
      </div>
    );
  }

  const initials = trustee.name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container mx-auto">
          <Link
            to="/about/board-of-trustees"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground font-body text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Board of Trustees
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Photo */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden bg-secondary flex-shrink-0 border-4 border-primary-foreground/10">
              {trustee.image_url ? (
                <img
                  src={trustee.image_url}
                  alt={trustee.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-foreground/20 to-primary-foreground/5">
                  <span className="font-display text-5xl font-bold text-primary-foreground/40">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            {/* Name & Title */}
            <div className="flex-1">
              <span className="section-tag mb-4 inline-block">Governance</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mt-2">
                {trustee.name}
              </h1>
              <p className="font-body text-primary-foreground/70 text-lg mt-3">{trustee.title}</p>

              {trustee.education && (
                <div className="mt-6 flex items-start gap-3 text-primary-foreground/60">
                  <GraduationCap size={18} className="mt-0.5 flex-shrink-0" />
                  <p className="font-body text-sm leading-relaxed">{trustee.education}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            {trustee.full_bio ? (
              <div
                className="prose prose-lg max-w-none font-body text-foreground/80 leading-relaxed [&_p]:mb-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_a]:text-primary [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: trustee.full_bio }}
              />
            ) : (
              <p className="font-body text-lg text-foreground/70 leading-relaxed">
                {trustee.short_bio}
              </p>
            )}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default TrusteeProfile;
