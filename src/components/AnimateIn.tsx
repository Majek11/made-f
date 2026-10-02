import { useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";
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
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -40 },
  right: { x: 40 },
  none: {},
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  threshold = 0.12,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const hidden: Variant = { opacity: 0, ...offsets[direction] };
  const visible: Variant = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={hidden}
      animate={isInView ? visible : hidden}
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
