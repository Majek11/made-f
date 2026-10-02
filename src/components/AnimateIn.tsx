import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  threshold?: number;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 20 },
  down:  { y: -20 },
  left:  { x: -20 },
  right: { x: 20 },
  none:  {},
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  threshold = 0.01,
}: AnimateInProps) {
  const hidden = { opacity: 0, ...offsets[direction] };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={cn(className)}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: threshold, margin: "0px 0px -40px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
