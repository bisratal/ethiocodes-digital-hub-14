import { motion } from "framer-motion";

interface Props {
  tag?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ tag, title, description, center = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    {tag && (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-secondary bg-accent mb-4">
        {tag}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
