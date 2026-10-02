import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: string;
  threshold?: number;
}

export function AnimateIn({ children, className }: AnimateInProps) {
  return <div className={cn(className)}>{children}</div>;
}
