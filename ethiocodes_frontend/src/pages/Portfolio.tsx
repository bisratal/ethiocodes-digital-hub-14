import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { portfolioProjects } from "@/data/content";

const industries = ["All", ...Array.from(new Set(portfolioProjects.map((p) => p.industry)))];

const stats = [
  { value: "6+", label: "Industries Served" },
  { value: "150+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12", label: "Countries Reached" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? portfolioProjects : portfolioProjects.filter((p) => p.industry === activeFilter);

  return (
    <main className="pt-16">
      <section className="gradient-hero section-padding">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">Our Work</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Our Portfolio</h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Explore the projects we've delivered for clients across various industries — from fintech to agriculture.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-card border-b border-border">
        <div className="container-narrow py-10 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} direction="up" delay={i * 0.1}>
                <p className="text-3xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveFilter(ind)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === ind ? "gradient-accent text-secondary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-xl overflow-hidden bg-card shadow-card hover:shadow-elevated transition-all group cursor-pointer dark:border dark:border-border dark:hover:border-glow"
                >
                  <div className="h-48 bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center relative overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <>
                        <span className="text-primary-foreground/30 text-sm font-medium">{p.industry}</span>
                        <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors" />
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-secondary">{p.industry}</span>
                    <h3 className="font-semibold text-foreground mt-1 mb-2 text-lg">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="section-padding gradient-hero text-center">
        <ScrollReveal direction="scale" className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Want to See Your Project Here?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">Let's build something remarkable together.</p>
          <Link to="/request" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-opacity">
            Start Your Project <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default Portfolio;
