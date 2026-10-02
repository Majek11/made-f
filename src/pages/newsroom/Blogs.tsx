import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewsItems } from "@/hooks/useNewsItems";
import { BLOG_POSTS, getFeaturedPost } from "@/data/blogPosts";
import focusJournalism from "@/assets/focus-journalism.jpg";

// Static fallback for featured display when no DB content
const STATIC_FEATURED = getFeaturedPost()!;

const Blogs = () => {
  const { items, loading } = useNewsItems("blog");

  // Merge: DB posts take priority, supplement with static posts for display
  const dbBlogs = items;
  const hasDynamic = dbBlogs.length > 0;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${focusJournalism})` }} />
        <div className="container mx-auto text-center relative">
          <span className="section-tag mb-6 inline-block">Newsroom</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mt-4">
            MADE-F <em className="text-italic-accent">Blog</em>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mt-6">
            Insights, perspectives and analysis from the MADE-F team on media, development, journalism and social change in Nigeria.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="py-32 flex justify-center">
          <Loader2 size={32} className="animate-spin text-primary" />
        </section>
      ) : hasDynamic ? (
        /* === DYNAMIC: DB content === */
        <>
          {/* Featured (first item) */}
          <section className="py-16 bg-background">
            <div className="container mx-auto">
              <span className="section-tag mb-8 inline-block">Featured</span>
              {(() => {
                const featured = dbBlogs[0];
                return (
                  <Link
                    to={`/newsroom/blogs/${featured.slug}`}
                    className="group grid md:grid-cols-2 gap-12 items-center"
                  >
                    <div className="relative rounded-3xl overflow-hidden h-[380px] bg-muted">
                      {featured.image_url ? (
                        <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <img src={focusJournalism} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                      <div className="absolute inset-0 bg-primary/30" />
                    </div>
                    <div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-4">
                        <span className="flex items-center gap-1"><Calendar size={12} />{new Date(featured.published_at ?? featured.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                      </div>
                      <h2 className="font-display text-3xl font-bold text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
                        {featured.title}
                      </h2>
                      <p className="font-body text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                      {featured.author && <p className="font-body text-sm font-semibold text-primary mb-6">By {featured.author}</p>}
                      <span className="btn-primary inline-flex">Read Full Post <ArrowRight size={16} /></span>
                    </div>
                  </Link>
                );
              })()}
            </div>
          </section>

          {/* Grid of remaining posts */}
          {dbBlogs.length > 1 && (
            <section className="py-16 bg-cream-dark">
              <div className="container mx-auto">
                <div className="text-center mb-12">
                  <span className="section-tag">Latest</span>
                  <h2 className="font-display text-3xl font-bold text-foreground mt-4">Recent <em className="text-italic-accent">Posts</em></h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dbBlogs.slice(1).map((post) => (
                    <Link
                      key={post.id}
                      to={`/newsroom/blogs/${post.slug}`}
                      className="group bg-card rounded-3xl border border-border shadow-card hover-lift overflow-hidden flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden bg-muted">
                        <img
                          src={post.image_url ?? focusJournalism}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1 gap-3">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                          <span className="flex items-center gap-1"><Calendar size={11} />{new Date(post.published_at ?? post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground leading-snug flex-1 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                        {post.author && <p className="font-body text-xs font-semibold text-primary">By {post.author}</p>}
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-primary font-body mt-1 group-hover:gap-3 transition-all">
                          Read More <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* === STATIC FALLBACK === */
        <>
          <section className="py-16 bg-background">
            <div className="container mx-auto">
              <span className="section-tag mb-8 inline-block">Featured</span>
              <Link to={`/newsroom/blogs/${STATIC_FEATURED.slug}`} className="group grid md:grid-cols-2 gap-12 items-center">
                <div className="relative rounded-3xl overflow-hidden h-[380px]">
                  <img src={STATIC_FEATURED.image} alt={STATIC_FEATURED.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/30" />
                  <span className="absolute top-5 left-5 section-tag text-xs">{STATIC_FEATURED.tag}</span>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} />{STATIC_FEATURED.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{STATIC_FEATURED.readTime}</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">{STATIC_FEATURED.title}</h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">{STATIC_FEATURED.excerpt}</p>
                  <p className="font-body text-sm font-semibold text-primary mb-6">By {STATIC_FEATURED.author}</p>
                  <span className="btn-primary inline-flex">Read Full Post <ArrowRight size={16} /></span>
                </div>
              </Link>
            </div>
          </section>
          <section className="py-16 bg-cream-dark">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <span className="section-tag">Latest</span>
                <h2 className="font-display text-3xl font-bold text-foreground mt-4">Recent <em className="text-italic-accent">Posts</em></h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.filter((p) => !p.featured).map((post) => (
                  <Link key={post.slug} to={`/newsroom/blogs/${post.slug}`} className="group bg-card rounded-3xl border border-border shadow-card hover-lift overflow-hidden flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute top-3 left-3 section-tag text-xs">{post.tag}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-1 gap-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground leading-snug flex-1 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                      <p className="font-body text-xs font-semibold text-primary">By {post.author}</p>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-primary font-body mt-1 group-hover:gap-3 transition-all">Read More <ArrowRight size={14} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <FooterSection />
    </div>
  );
};

export default Blogs;
