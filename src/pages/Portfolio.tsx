import { motion } from "framer-motion";
import { portfolioProjects } from "@/data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Portfolio = () => (
  <main className="pt-16">
    <section className="gradient-hero section-padding">
      <div className="container-narrow text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Our Portfolio</h1>
        <p className="text-primary-foreground/70 max-w-xl mx-auto">
          Explore the projects we've delivered for clients across various industries.
        </p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioProjects.map((p, i) => (
          <motion.div
            key={p.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-xl overflow-hidden bg-card shadow-card hover:shadow-elevated transition-shadow group cursor-pointer"
          >
            <div className="h-48 gradient-primary flex items-center justify-center relative overflow-hidden">
              <span className="text-primary-foreground/30 text-sm font-medium">{p.industry}</span>
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors" />
            </div>
            <div className="p-6">
              <span className="text-xs font-medium text-secondary">{p.industry}</span>
              <h3 className="font-semibold text-foreground mt-1 mb-2 text-lg">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </main>
);

export default Portfolio;
