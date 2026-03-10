import { useState } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/content";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

const Blog = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const featured = blogPosts[0];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-narrow text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">
            Insights & Updates
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Blog</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Technical insights, industry trends, and company updates from the EthioCodes team.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden bg-card shadow-elevated flex flex-col md:flex-row group cursor-pointer"
          >
            <div className="md:w-2/5 h-64 md:h-auto gradient-accent flex items-center justify-center">
              <span className="text-secondary-foreground/40 text-lg font-medium">Featured</span>
            </div>
            <div className="p-8 md:w-3/5 flex flex-col justify-center">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {featured.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><User size={14} /> {featured.author}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(featured.date).toLocaleDateString()}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                Read Article <ArrowRight size={14} />
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search + Filter + Grid */}
      <section className="section-padding">
        <div className="container-narrow">
          {/* Search & Filters */}
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
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !activeTag ? "gradient-accent text-secondary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeTag === tag ? "gradient-accent text-secondary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl overflow-hidden bg-card shadow-card hover:shadow-elevated transition-shadow group cursor-pointer"
              >
                <div className="h-44 gradient-accent flex items-center justify-center">
                  <span className="text-secondary-foreground/40 text-sm font-medium">{post.tags[0]}</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <NewsletterForm />
    </main>
  );
};

export default Blog;
