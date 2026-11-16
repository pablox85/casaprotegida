"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  preset?: "scale";
};

const presets: Record<NonNullable<AnimatedGroupProps["preset"]>, Variants> = {
  scale: {
    hidden: { opacity: 0, scale: 0.78, y: 42 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

export function AnimatedGroup({ children, className, preset = "scale" }: AnimatedGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });
  const itemVariants = presets[preset];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={shouldReduceMotion || isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: 0.08, staggerChildren: 0.14 } },
      }}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement(child as ReactElement<{ variants?: Variants }>, {
          variants: itemVariants,
        });
      })}
    </motion.div>
  );
}
