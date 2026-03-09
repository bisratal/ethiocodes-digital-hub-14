import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Smartphone, Code, Cloud, Palette, Layers, Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import NewsletterForm from "@/components/NewsletterForm";
import { services, portfolioProjects, testimonials } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe size={28} />,
  smartphone: <Smartphone size={28} />,
  code: <Code size={28} />,
  cloud: <Cloud size={28} />,
  palette: <Palette size={28} />,
  layers: <Layers size={28} />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="gradient-hero min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="container-narrow relative z-10 py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-6">
              Software Development Company
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              We Build <span className="text-secondary">Digital Solutions</span> That Drive Growth
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-lg">
              EthioCodes is a full-service software development company delivering modern, scalable solutions for businesses across Africa and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-opacity"
              >
                View Services <ArrowRight size={16} />
              </Link>
              <Link
                to="/request"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Request a Project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <SectionHeading
            tag="What We Do"
            title="Our Services"
            description="We offer end-to-end software development services tailored to your business needs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((s, i) => (
              <motion.div
                key={s.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  to={`/services#${s.id}`}
                  className="block p-6 rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow group h-full"
                >
                  <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center text-secondary-foreground mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[s.icon]}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.short}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            tag="Our Work"
            title="Featured Projects"
            description="A selection of projects that showcase our expertise and commitment to quality."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.slice(0, 3).map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-xl overflow-hidden bg-card shadow-card hover:shadow-elevated transition-shadow group"
              >
                <div className="h-48 gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground/30 text-sm font-medium">{p.industry}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <SectionHeading
            tag="Testimonials"
            title="What Our Clients Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 rounded-xl bg-card shadow-card"
              >
                <Quote size={24} className="text-secondary/40 mb-3" />
                <p className="text-foreground mb-4 italic leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-secondary-foreground text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero text-center">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Build Something Great?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Let's discuss your project and turn your ideas into reality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/request"
                className="px-6 py-3 rounded-lg font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-opacity"
              >
                Start a Project
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg font-semibold text-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <NewsletterForm />
    </main>
  );
};

export default Index;
