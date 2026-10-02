import { useRef, useState, useEffect } from "react";
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
  up: { y: 24 },
  down: { y: -24 },
  left: { x: -24 },
  right: { x: 24 },
  none: {},
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  threshold = 0.01,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldShow(true);
    }
  }, [inView]);

  // Safety fallback: ensure content becomes visible after mount even if IntersectionObserver delays on mobile
  useEffect(() => {
    const timer = setTimeout(() => setShouldShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const hidden: Variant = { opacity: 0, ...offsets[direction] };
  const visible: Variant = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={hidden}
      animate={shouldShow ? visible : hidden}
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


