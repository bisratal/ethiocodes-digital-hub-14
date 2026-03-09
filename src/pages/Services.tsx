import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Smartphone, Code, Cloud, Palette, Layers, ArrowRight } from "lucide-react";
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

const Services = () => (
  <main className="pt-16">
    <section className="gradient-hero section-padding">
      <div className="container-narrow text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Our Services</h1>
        <p className="text-primary-foreground/70 max-w-xl mx-auto">
          End-to-end software development services to power your business.
        </p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow space-y-16">
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
              <div className="w-24 h-24 rounded-2xl gradient-accent flex items-center justify-center text-secondary-foreground shadow-elevated">
                {iconMap[s.icon]}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-foreground mb-3">{s.title}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{s.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {s.technologies.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
              >
                Discuss This Service <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </main>
);

export default Services;
