import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import focusJournalism from "@/assets/focus-journalism.jpg";
// Static blog detail (slug not in DB)
import { ArrowRight, Clock, Tag } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [dbPost, setDbPost] = useState<any | null>(undefined); // undefined = loading
  const [loadingDb, setLoadingDb] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!slug) return;
    const fetchPost = async () => {
      setLoadingDb(true);
      const { data } = await supabase
        .from("news_items")
        .select("*")
        .eq("slug", slug)
        .eq("type", "blog")
        .maybeSingle();
      setDbPost(data); // null = not found in DB
      setLoadingDb(false);
    };
    fetchPost();
  }, [slug]);

  // Static fallback
  const staticPost = slug ? getPostBySlug(slug) : undefined;
  const relatedStatic = slug ? getRelatedPosts(slug, 3) : [];

  if (loadingDb) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <div className="flex justify-center items-center pt-48">
          <Loader2 size={36} className="animate-spin text-primary" />
        </div>
        <FooterSection />
      </div>
    );
  }

  // DB post found — render dynamic layout
  if (dbPost) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <section className="pt-28 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: `url(${dbPost.image_url || focusJournalism})` }} />
          <div className="container mx-auto relative pb-12">
            <Link to="/newsroom/blogs" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground font-body text-sm mb-8 transition-colors">
              <ArrowLeft size={15} /> Back to Blog
            </Link>
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mt-2 mb-6">
                {dbPost.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-primary-foreground/60 font-body text-sm">
                {dbPost.author && <span className="flex items-center gap-1.5"><User size={13} /> {dbPost.author}</span>}
                <span className="flex items-center gap-1.5"><Calendar size={13} />{new Date(dbPost.published_at ?? dbPost.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
            </div>
          </div>
          {dbPost.image_url && (
            <div className="relative h-72 md:h-96 overflow-hidden">
              <img src={dbPost.image_url} alt={dbPost.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
          )}
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              {dbPost.excerpt && (
                <p className="font-body text-lg text-foreground/80 leading-relaxed mb-10 border-l-4 border-accent pl-6">
                  {dbPost.excerpt}
                </p>
              )}
              {dbPost.content && (
                <div
                  className="prose prose-lg max-w-none font-body text-foreground/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:italic [&_img]:rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: dbPost.content }}
                />
              )}
              {dbPost.author && (
                <div className="mt-14 p-8 bg-secondary/40 rounded-3xl border border-border flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl flex-shrink-0">
                    {dbPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-lg">{dbPost.author}</p>
                    <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">
                      Contributing to MADE-F's mission of advancing evidence-driven media and communication for sustainable development across Nigeria.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <FooterSection />
      </div>
    );
  }

  // Static fallback (pre-written blog posts)
  if (staticPost) {
    return (
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <section className="pt-28 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: `url(${staticPost.image})` }} />
          <div className="container mx-auto relative pb-12">
            <Link to="/newsroom/blogs" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground font-body text-sm mb-8 transition-colors">
              <ArrowLeft size={15} /> Back to Blog
            </Link>
            <div className="max-w-3xl">
              <span className="section-tag mb-5 inline-block">{staticPost.tag}</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mt-2 mb-6">{staticPost.title}</h1>
              <div className="flex flex-wrap items-center gap-5 text-primary-foreground/60 font-body text-sm">
                <span className="flex items-center gap-1.5"><User size={13} /> {staticPost.author} · {staticPost.authorRole}</span>
                <span className="flex items-center gap-1.5"><Calendar size={13} />{staticPost.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} />{staticPost.readTime}</span>
              </div>
            </div>
          </div>
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img src={staticPost.image} alt={staticPost.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        </section>
        <section className="py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <p className="font-body text-lg text-foreground/80 leading-relaxed mb-10 border-l-4 border-accent pl-6">{staticPost.content}</p>
              <div className="space-y-10">
                {staticPost.sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4 leading-snug">{section.heading}</h2>
                    <p className="font-body text-foreground/70 leading-relaxed whitespace-pre-line">{section.body}</p>
                    {section.image && (
                      <div className="my-6 rounded-2xl overflow-hidden shadow-md border border-border">
                        <img src={section.image} alt={section.heading} className="w-full h-auto object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-14 p-8 bg-secondary/40 rounded-3xl border border-border flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl flex-shrink-0">{staticPost.author.charAt(0)}</div>
                <div>
                  <p className="font-display font-bold text-foreground text-lg">{staticPost.author}</p>
                  <p className="font-body text-sm text-muted-foreground mb-2">{staticPost.authorRole} · MADE Foundation</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {relatedStatic.length > 0 && (
          <section className="py-16 bg-cream-dark">
            <div className="container mx-auto">
              <div className="text-center mb-10">
                <span className="section-tag">Continue Reading</span>
                <h2 className="font-display text-3xl font-bold text-foreground mt-4">Related <em className="text-italic-accent">Posts</em></h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedStatic.map((rel) => (
                  <Link key={rel.slug} to={`/newsroom/blogs/${rel.slug}`} className="group bg-card rounded-3xl border border-border shadow-card hover-lift overflow-hidden flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <img src={rel.image} alt={rel.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute top-3 left-3 section-tag text-xs">{rel.tag}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-1 gap-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-1"><Calendar size={11} />{rel.date}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-foreground leading-snug flex-1 group-hover:text-primary transition-colors">{rel.title}</h3>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-primary font-body mt-1 group-hover:gap-3 transition-all">Read Post <ArrowRight size={14} /></span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link to="/newsroom/blogs" className="btn-outline"><ArrowLeft size={15} /> All Posts</Link>
              </div>
            </div>
          </section>
        )}
        <FooterSection />
      </div>
    );
  }

  // Not found anywhere
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto pt-40 pb-24 text-center">
        <h1 className="font-display text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
        <p className="font-body text-muted-foreground mb-8">The blog post you are looking for does not exist.</p>
        <Link to="/newsroom/blogs" className="btn-primary"><ArrowLeft size={16} /> Back to Blog</Link>
      </div>
      <FooterSection />
    </div>
  );
};

export default BlogDetail;
