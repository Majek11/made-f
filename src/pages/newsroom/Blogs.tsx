import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewsItems } from "@/hooks/useNewsItems";
import { BLOG_POSTS, getFeaturedPost } from "@/data/blogPosts";
import focusJournalism from "@/assets/focus-journalism.jpg";

const Blogs = () => {
  const { items, loading } = useNewsItems("blog");

  // Format DB blogs to unified post structure
  const dbUnified = items.map((item) => ({
    slug: item.slug || item.id,
    title: item.title,
    excerpt: item.excerpt || "",
    author: item.author || "MADE-F Editorial Team",
    date: item.published_at
      ? new Date(item.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
      : new Date(item.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    readTime: "5 min read",
    tag: "Newsroom",
    image: item.image_url || focusJournalism,
    featured: false,
  }));

  // Include any static BLOG_POSTS whose slug is NOT in dbUnified
  const dbSlugs = new Set(dbUnified.map((b) => b.slug));
  const extraStatic = BLOG_POSTS.filter((p) => !dbSlugs.has(p.slug));

  // Combined list of all blog posts (DB first, then static)
  const allBlogs = [...dbUnified, ...extraStatic];

  // Featured post: explicit featured flag or first item
  const featured = allBlogs.find((p) => p.featured) || allBlogs[0];
  const recentBlogs = allBlogs.filter((p) => p.slug !== featured?.slug);

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
      ) : (
        <>
          {/* Featured Post */}
          {featured && (
            <section className="py-16 bg-background">
              <div className="container mx-auto">
                <span className="section-tag mb-8 inline-block">Featured</span>
                <Link
                  to={`/newsroom/blogs/${featured.slug}`}
                  className="group grid md:grid-cols-2 gap-12 items-center"
                >
                  <div className="relative rounded-3xl overflow-hidden h-[380px] bg-muted">
                    <img
                      src={featured.image || focusJournalism}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/30" />
                    {featured.tag && <span className="absolute top-5 left-5 section-tag text-xs">{featured.tag}</span>}
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12} />{featured.date}</span>
                      {featured.readTime && <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime}</span>}
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="font-body text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                    {featured.author && <p className="font-body text-sm font-semibold text-primary mb-6">By {featured.author}</p>}
                    <span className="btn-primary inline-flex">Read Full Post <ArrowRight size={16} /></span>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Grid of recent posts */}
          {recentBlogs.length > 0 && (
            <section className="py-16 bg-cream-dark">
              <div className="container mx-auto">
                <div className="text-center mb-12">
                  <span className="section-tag">Latest</span>
                  <h2 className="font-display text-3xl font-bold text-foreground mt-4">Recent <em className="text-italic-accent">Posts</em></h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentBlogs.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/newsroom/blogs/${post.slug}`}
                      className="group bg-card rounded-3xl border border-border shadow-card hover-lift overflow-hidden flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden bg-muted">
                        <img
                          src={post.image || focusJournalism}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {post.tag && <span className="absolute top-3 left-3 section-tag text-xs">{post.tag}</span>}
                      </div>
                      <div className="p-6 flex flex-col flex-1 gap-3">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                          <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                          {post.readTime && <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>}
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground leading-snug flex-1 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
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
      )}

      <FooterSection />
    </div>
  );
};

export default Blogs;
