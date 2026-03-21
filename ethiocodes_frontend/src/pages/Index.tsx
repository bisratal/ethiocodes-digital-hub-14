import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Globe, Smartphone, Code, Cloud, Palette, Layers, Quote, CheckCircle, Users, Briefcase, Award, Zap, Shield, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
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

const stats = [
  { value: "150+", label: "Projects Delivered", icon: <Briefcase size={24} /> },
  { value: "50+", label: "Happy Clients", icon: <Users size={24} /> },
  { value: "15+", label: "Team Members", icon: <Award size={24} /> },
  { value: "99.9%", label: "Uptime Guarantee", icon: <Zap size={24} /> },
];

const processSteps = [
  { step: "01", title: "Discovery", description: "We analyze your requirements, goals, and market landscape to define the perfect strategy." },
  { step: "02", title: "Design", description: "Our designers create intuitive wireframes and pixel-perfect UI mockups for your approval." },
  { step: "03", title: "Development", description: "Our engineers build your solution using agile methodology with regular progress updates." },
  { step: "04", title: "Launch & Support", description: "We deploy, monitor, and provide ongoing support to ensure long-term success." },
];

const whyChooseUs = [
  { icon: <Shield size={22} />, title: "Enterprise Security", description: "SOC 2 compliant practices with end-to-end encryption and regular audits." },
  { icon: <Zap size={22} />, title: "Fast Delivery", description: "Agile sprints with 2-week release cycles keep your project on track." },
  { icon: <Clock size={22} />, title: "24/7 Support", description: "Round-the-clock technical support with guaranteed response times." },
  { icon: <CheckCircle size={22} />, title: "Quality Assured", description: "Comprehensive testing with 95%+ code coverage on every project." },
];

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <main>
      {/* Hero with parallax */}
      <section ref={heroRef} className="gradient-hero min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-secondary/15 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-secondary/5 blur-3xl"
          />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(195, 80%, 48%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container-narrow relative z-10 py-24 px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-6 border border-secondary/20"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Software Development Company
              </motion.span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.1] mb-6">
                We Build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-300">
                  Digital Solutions
                </span>{" "}
                That Drive Growth
              </h1>
              <p className="text-lg text-primary-foreground/60 mb-8 max-w-lg leading-relaxed">
                EthioCodes is a full-service software development company delivering modern, scalable solutions for businesses across Africa and beyond.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-secondary/20"
                >
                  View Services <ArrowRight size={16} />
                </Link>
                <Link
                  to="/request"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-all hover:scale-105"
                >
                  Request a Project
                </Link>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center gap-6 text-primary-foreground/40"
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-gradient-to-br from-secondary/60 to-secondary/20 flex items-center justify-center text-[10px] font-bold text-secondary-foreground">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm">
                  <span className="text-secondary font-semibold">50+</span> happy clients worldwide
                </p>
              </motion.div>
            </motion.div>

            {/* Terminal card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-cyan-400/10 rounded-3xl blur-xl" />
                <div className="relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 space-y-4 dark:glow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-xs text-primary-foreground/30 font-mono">ethiocodes.dev</span>
                  </div>
                  {[
                    { color: "text-secondary", text: "const", rest: " project = await EthioCodes" },
                    { color: "text-cyan-300", text: "  .design", rest: "(yourVision)" },
                    { color: "text-cyan-300", text: "  .develop", rest: "(withExcellence)" },
                    { color: "text-cyan-300", text: "  .deploy", rest: "(toProduction);" },
                    { color: "text-green-400", text: "// ", rest: "150+ projects delivered ✓" },
                  ].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}
                      className="font-mono text-sm"
                    >
                      <span className={line.color}>{line.text}</span>
                      <span className="text-primary-foreground/50">{line.rest}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-secondary/90 text-secondary-foreground text-xs font-bold shadow-lg dark:glow-secondary"
                >
                  React · TypeScript
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold shadow-lg border border-border dark:border-glow"
                >
                  99.9% Uptime
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="container-narrow py-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} direction="up" delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-secondary mx-auto mb-3 dark:glow-secondary">
                    {s.icon}
                  </div>
                  <p className="text-3xl font-extrabold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <SectionHeading tag="What We Do" title="Our Services" description="We offer end-to-end software development services tailored to your business needs." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((s, i) => (
              <ScrollReveal key={s.id} direction={i % 2 === 0 ? "up" : "scale"} delay={i * 0.08}>
                <Link
                  to={`/services#${s.id}`}
                  className="block p-6 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all group h-full dark:hover:border-glow dark:border dark:border-border"
                >
                  <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center text-secondary-foreground mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[s.icon]}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.short}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline">
              Explore All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading tag="Our Process" title="How We Work" description="A proven, transparent process that delivers results on time and within budget." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} direction="left" delay={i * 0.12}>
                <div className="relative text-center">
                  <div className="text-5xl font-extrabold text-accent dark:text-secondary/20 mb-4">{step.step}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8">
                      <ArrowRight size={20} className="text-border" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Highlights */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <SectionHeading tag="Our Work" title="Featured Projects" description="A selection of projects that showcase our expertise and commitment to quality." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.slice(0, 3).map((p, i) => (
              <ScrollReveal key={p.id} direction="up" delay={i * 0.1}>
                <div className="rounded-xl overflow-hidden bg-card shadow-card hover:shadow-elevated transition-all group dark:border dark:border-border dark:hover:border-glow">
                  <div className="h-48 gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground/30 text-sm font-medium">{p.industry}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-xs bg-accent text-accent-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading tag="Why EthioCodes" title="Why Choose Us" description="We combine technical excellence with deep industry knowledge to deliver exceptional results." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <ScrollReveal key={item.title} direction="scale" delay={i * 0.1}>
                <div className="p-6 rounded-xl bg-card shadow-card text-center dark:border dark:border-border dark:hover:border-glow transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-secondary mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted">
        <div className="container-narrow">
          <SectionHeading tag="Testimonials" title="What Our Clients Say" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} direction={i % 2 === 0 ? "right" : "left"} delay={i * 0.1}>
                <div className="p-6 rounded-xl bg-card shadow-card dark:border dark:border-border">
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
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 px-4">
        <ScrollReveal direction="none" className="container-narrow text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">Trusted by companies across industries</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50">
            {["TechVentures Inc.", "MedConnect Health", "AgroLink Africa", "LogiTrack GmbH", "EduSpark", "FinFlow"].map((name) => (
              <span key={name} className="text-lg font-bold text-foreground/40">{name}</span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero text-center">
        <ScrollReveal direction="scale" className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Build Something Great?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Let's discuss your project and turn your ideas into reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request" className="px-6 py-3 rounded-lg font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-opacity">
              Start a Project
            </Link>
            <Link to="/contact" className="px-6 py-3 rounded-lg font-semibold text-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <NewsletterForm />
    </main>
  );
};

export default Index;
