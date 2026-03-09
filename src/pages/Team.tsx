import { motion } from "framer-motion";
import { teamMembers } from "@/data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Team = () => (
  <main className="pt-16">
    <section className="gradient-hero section-padding">
      <div className="container-narrow text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Our Team</h1>
        <p className="text-primary-foreground/70 max-w-xl mx-auto">
          Meet the talented people behind EthioCodes.
        </p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((m, i) => (
          <motion.div
            key={m.name}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-xl bg-card shadow-card hover:shadow-elevated transition-shadow p-6 text-center"
          >
            <div className="w-20 h-20 rounded-full gradient-accent mx-auto mb-4 flex items-center justify-center text-secondary-foreground text-2xl font-bold">
              {m.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h3 className="font-semibold text-foreground text-lg">{m.name}</h3>
            <p className="text-sm text-secondary font-medium mb-3">{m.role}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </main>
);

export default Team;
