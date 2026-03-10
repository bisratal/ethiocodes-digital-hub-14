import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Smartphone, Code, Cloud, Palette, Layers, ArrowRight, CheckCircle, Zap, Shield, Clock, HeadphonesIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe size={32} />,
  smartphone: <Smartphone size={32} />,
  code: <Code size={32} />,
  cloud: <Cloud size={32} />,
  palette: <Palette size={32} />,
  layers: <Layers size={32} />,
};

const processSteps = [
  { title: "Consultation", description: "We start with a deep dive into your goals, audience, and technical requirements." },
  { title: "Planning & Design", description: "We create detailed specs, wireframes, and architecture before writing any code." },
  { title: "Agile Development", description: "Two-week sprints with demos, so you see progress and provide feedback continuously." },
  { title: "Testing & QA", description: "Rigorous automated and manual testing ensures your product is rock-solid." },
  { title: "Deployment", description: "We handle CI/CD, infrastructure setup, and a smooth go-live process." },
  { title: "Ongoing Support", description: "Post-launch monitoring, maintenance, and iterative improvements." },
];

const advantages = [
  { icon: <Zap size={22} />, title: "Rapid Prototyping", description: "From concept to working prototype in as little as 2 weeks." },
  { icon: <Shield size={22} />, title: "Security First", description: "Built-in security best practices from day one — not an afterthought." },
  { icon: <Clock size={22} />, title: "On-Time Delivery", description: "95% of our projects ship on or ahead of schedule." },
  { icon: <HeadphonesIcon size={22} />, title: "Dedicated Teams", description: "A dedicated project manager and engineering team for every engagement." },
];

const techStack = [
  { category: "Frontend", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"] },
  { category: "Backend", tools: ["Node.js", "Python", "Java", ".NET", "GraphQL"] },
  { category: "Database", tools: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
  { category: "Cloud & DevOps", tools: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"] },
];

const Services = () => (
  <main className="pt-16">
    {/* Hero */}
    <section className="gradient-hero section-padding">
      <div className="container-narrow text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">
          What We Offer
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Our Services</h1>
        <p className="text-primary-foreground/70 max-w-2xl mx-auto">
          End-to-end software development services to power your business — from initial concept through launch and beyond.
        </p>
      </div>
    </section>

    {/* All Services */}
    <section className="section-padding">
      <div className="container-narrow space-y-20">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-28 h-28 rounded-2xl gradient-accent flex items-center justify-center text-secondary-foreground shadow-elevated">
                {iconMap[s.icon]}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-foreground mb-3">{s.title}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{s.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {s.technologies.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                >
                  Discuss This Service <ArrowRight size={14} />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  See Related Work <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading
          tag="Our Advantage"
          title="Why Choose EthioCodes"
          description="We don't just write code — we engineer solutions that move your business forward."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl bg-card shadow-card text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-secondary mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Our Process */}
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          tag="How We Work"
          title="Our Development Process"
          description="A structured, transparent approach that keeps you informed at every stage."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 rounded-xl bg-card shadow-card relative"
            >
              <div className="text-4xl font-extrabold text-accent mb-3">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Tech Stack */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading
          tag="Technologies"
          title="Our Tech Stack"
          description="We use best-in-class tools and frameworks to build reliable, scalable solutions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-xl bg-card shadow-card"
            >
              <h3 className="font-semibold text-foreground mb-3">{cat.category}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                    {tool}
                  </span>
                ))}
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
            Have a Project in Mind?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Let's discuss how we can bring your vision to life with the right technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/request"
              className="px-6 py-3 rounded-lg font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-opacity"
            >
              Request a Proposal
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg font-semibold text-sm border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Schedule a Call
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </main>
);

export default Services;
