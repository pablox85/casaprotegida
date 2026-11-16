"use client";

import { InView } from "@/components/core/in-view";
import { useDesktopMotion } from "@/components/core/use-desktop-motion";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type SectionCardsProps = {
  children: ReactNode;
  className: string;
};

type SectionCardProps = {
  children: ReactNode;
  className: string;
};

export function SectionCards({ children, className }: SectionCardsProps) {
  const isDesktop = useDesktopMotion();

  return (
    <InView
      className={className}
      viewOptions={{ once: true, margin: "0px 0px -150px 0px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: isDesktop ? 0.14 : 0.08,
            staggerChildren: isDesktop ? 0.28 : 0.16,
          },
        },
      }}
    >
      {children}
    </InView>
  );
}

export function SectionCard({ children, className }: SectionCardProps) {
  const isDesktop = useDesktopMotion();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      whileHover={
        isDesktop && !shouldReduceMotion
          ? { y: -10, scale: 1.015, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }
          : undefined
      }
      variants={{
        hidden: { opacity: 0, scale: isDesktop ? 0.86 : 1, y: isDesktop ? 52 : 26 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: isDesktop ? 0.2 : 0.62,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.article>
  );
}
