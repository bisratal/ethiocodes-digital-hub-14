import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

interface Props {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const getVariants = (direction: Direction, duration: number): Variants => {
  const hidden: Record<string, number> = { opacity: 0 };
  const visible: Record<string, number> = { opacity: 1 };

  switch (direction) {
    case "up":
      hidden.y = 40;
      visible.y = 0;
      break;
    case "down":
      hidden.y = -40;
      visible.y = 0;
      break;
    case "left":
      hidden.x = 60;
      visible.x = 0;
      break;
    case "right":
      hidden.x = -60;
      visible.x = 0;
      break;
    case "scale":
      hidden.scale = 0.9;
      visible.scale = 1;
      break;
    case "none":
      break;
  }

  return { hidden, visible };
};

const ScrollReveal = ({ children, direction = "up", delay = 0, duration = 0.6, className = "", once = true, amount = 0.2 }: Props) => {
  const variants = getVariants(direction, duration);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
