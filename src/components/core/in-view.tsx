"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type UseInViewOptions,
  type Variant,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type InViewProps = {
  children: ReactNode;
  className?: string;
  variants: Record<string, Variant>;
  viewOptions?: Pick<UseInViewOptions, "margin" | "once">;
};

export function InView({ children, className, variants, viewOptions }: InViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    margin: viewOptions?.margin,
    once: viewOptions?.once ?? true,
  });

  return (
    <motion.div
      ref={ref}
      animate={shouldReduceMotion || isInView ? "visible" : "hidden"}
      className={className}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
