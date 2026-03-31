import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterForm from "@/components/NewsletterForm";
import api from "../lib/api";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]); // 🔥 dynamic posts
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // 🔥 added loading state
  const [error, setError] = useState<string | null>(null); // 🔥 added error state

  // 🔥 fetch from backend with proper data handling
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/blog");
        
        // 🔥 Handle different API response structures
        let postsData = [];
        if (res.data) {
          // Check if response has posts array (like { posts: [], pagination: {} })
          if (res.data.posts && Array.isArray(res.data.posts)) {
            postsData = res.data.posts;
          }
          // Check if response is directly an array
          else if (Array.isArray(res.data)) {
            postsData = res.data;
          }
          // Check if response has data property
          else if (res.data.data && Array.isArray(res.data.data)) {
            postsData = res.data.data;
          }
          // Fallback: try to use res.data as is
          else {
            postsData = [];
          }
        }
        
        setPosts(postsData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        setError("Failed to load blog posts. Please try again later.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 🔥 dynamic tags - safely handle posts array
  const allTags = Array.isArray(posts) && posts.length > 0
    ? Array.from(new Set(posts.flatMap((p) => p.tags || [])))
    : [];

  // 🔥 filtered posts - safely filter
  const filtered = Array.isArray(posts) && posts.length > 0
    ? posts.filter((post) => {
        const matchesTag = !activeTag || (post.tags || []).includes(activeTag);
        const matchesSearch =
          !search ||
          post.title?.toLowerCase().includes(search.toLowerCase()) ||
          post.content?.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(search.toLowerCase());

        return matchesTag && matchesSearch;
      })
    : [];

  const featured = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;

  // 🔥 Loading state
  if (loading) {
    return (
      <main className="pt-16">
        <section className="gradient-hero section-padding">
          <div className="container-narrow text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">Insights & Updates</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Blog</h1>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                Technical insights, industry trends, and company updates from the EthioCodes team.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="section-padding">
          <div className="container-narrow text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // 🔥 Error state
  if (error) {
    return (
      <main className="pt-16">
        <section className="gradient-hero section-padding">
          <div className="container-narrow text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">Insights & Updates</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Blog</h1>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                Technical insights, industry trends, and company updates from the EthioCodes team.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="section-padding">
          <div className="container-narrow text-center">
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-16">
      <section className="gradient-hero section-padding">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">Insights & Updates</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Blog</h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Technical insights, industry trends, and company updates from the EthioCodes team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="section-padding bg-muted">
          <div className="container-narrow">
            <ScrollReveal direction="right">
              <div className="rounded-xl overflow-hidden bg-card shadow-elevated flex flex-col md:flex-row group cursor-pointer dark:border dark:border-border dark:hover:border-glow transition-all">
                <div className="md:w-2/5 h-64 md:h-auto gradient-accent flex items-center justify-center">
                  <span className="text-secondary-foreground/40 text-lg font-medium">Featured</span>
                </div>
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(featured.tags || []).map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground font-medium">{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">{featured.title}</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{featured.excerpt || featured.content?.substring(0, 150)}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><User size={14} /> {featured.author?.name || featured.author || "Admin"}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(featured.published_at || featured.created_at).toLocaleDateString()}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">Read Article <ArrowRight size={14} /></span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-narrow">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              />
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!activeTag ? "gradient-accent text-secondary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"}`}
              >
                All
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeTag === tag ? "gradient-accent text-secondary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <ScrollReveal key={post.id} direction="up" delay={i * 0.06}>
                <article className="rounded-xl overflow-hidden bg-card shadow-card hover:shadow-elevated transition-all group cursor-pointer dark:border dark:border-border dark:hover:border-glow">
                  <div className="h-44 gradient-accent flex items-center justify-center">
                    <span className="text-secondary-foreground/40 text-sm font-medium">{post.tags?.[0] || "Article"}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(post.tags || []).map((tag: string) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground font-medium">{tag}</span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg group-hover:text-secondary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt || post.content?.substring(0, 100)}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User size={12} /> {post.author?.name || post.author || "Admin"}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && posts.length > 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}

          {posts.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <NewsletterForm />
    </main>
  );
};

export default Blog;