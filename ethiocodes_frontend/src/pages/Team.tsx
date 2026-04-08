import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Target, Lightbulb, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { teamMembers } from "@/data/content";

const values = [
  { icon: <Target size={24} />, title: "Mission-Driven", description: "We build technology that creates meaningful impact for businesses and communities across Africa." },
  { icon: <Lightbulb size={24} />, title: "Innovation First", description: "We stay ahead of the curve, adopting cutting-edge tools and practices to deliver the best solutions." },
  { icon: <Heart size={24} />, title: "People Matter", description: "We foster a culture of respect, growth, and collaboration — for our team and our clients." },
  { icon: <Users size={24} />, title: "Community Focus", description: "We actively contribute to Ethiopia's growing tech ecosystem through mentoring and open source." },
];

const Team = () => (
  <main className="pt-16">
    <section className="gradient-hero section-padding">
      <div className="container-narrow text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-secondary mb-4">The People Behind EthioCodes</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Our Team</h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Meet the talented engineers, designers, and leaders who turn bold ideas into world-class software.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading tag="What Drives Us" title="Our Values" description="The principles that guide everything we do at EthioCodes." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} direction="scale" delay={i * 0.1}>
              <div className="p-6 rounded-xl bg-card shadow-card text-center dark:border dark:border-border dark:hover:border-glow transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-secondary mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading tag="Our People" title="Meet the Team" description="A diverse group of experts passionate about technology and excellence." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((m, i) => (
            <ScrollReveal key={m.name} direction={i % 3 === 0 ? "right" : i % 3 === 1 ? "up" : "left"} delay={i * 0.08}>
              <div className="rounded-xl bg-card shadow-card hover:shadow-elevated transition-all overflow-hidden group dark:border dark:border-border dark:hover:border-glow">
                <div className="h-56 overflow-hidden bg-gradient-to-br from-secondary/20 to-secondary/5">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full gradient-accent flex items-center justify-center text-secondary-foreground text-4xl font-bold">
                      {m.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-foreground text-lg">{m.name}</h3>
                  <p className="text-sm text-secondary font-medium mb-3">{m.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding gradient-hero text-center">
      <ScrollReveal direction="scale" className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Join Our Team</h2>
        <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
          We're always looking for talented engineers, designers, and project managers. Come build the future with us.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm gradient-accent text-secondary-foreground hover:opacity-90 transition-opacity">
          Get in Touch <ArrowRight size={16} />
        </Link>
      </ScrollReveal>
    </section>
  </main>
);

export default Team;
