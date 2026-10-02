import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Mail, Linkedin, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Trustee {
  id: string;
  name: string;
  title: string;
  slug: string;
  short_bio: string;
  full_bio: string | null;
  image_url: string | null;
  display_order: number;
}

const MemberCard = ({ name, title, short_bio, image_url, slug }: Trustee) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <div className="bg-card rounded-3xl border border-border shadow-card overflow-hidden group hover-lift flex flex-col">
      <div className="relative aspect-[4/5] bg-secondary overflow-hidden flex-shrink-0">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="font-display text-5xl font-bold text-primary/40">{initials}</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-foreground mb-1 leading-tight">{name}</h3>
        <p className="font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">{title}</p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{short_bio}</p>
        <div className="mt-5 pt-4 border-t border-border">
          <Link
            to={`/about/board-of-trustees/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary font-body hover:gap-3 transition-all"
          >
            Read More <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const BoardOfTrustees = () => {
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrustees = async () => {
      const { data } = await supabase
        .from("trustees")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      setTrustees((data as Trustee[]) || []);
      setLoading(false);
    };
    fetchTrustees();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 bg-primary">
        <div className="container mx-auto text-center">
          <span className="section-tag mb-6 inline-block">Governance</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            Board of <em className="text-italic-accent">Trustees</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Distinguished leaders who guide MADE-F's vision, values and strategic direction.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trustees.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default BoardOfTrustees;
