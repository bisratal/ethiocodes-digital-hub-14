import { motion } from "framer-motion";
import { blogPosts } from "@/data/content";
import { Calendar, User } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Blog = () => (
  <main className="pt-16">
    <section className="gradient-hero section-padding">
      <div className="container-narrow text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Blog</h1>
        <p className="text-primary-foreground/70 max-w-xl mx-auto">
          Technical insights, industry trends, and company updates.
        </p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, i) => (
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
    </section>
  </main>
);

export default Blog;
