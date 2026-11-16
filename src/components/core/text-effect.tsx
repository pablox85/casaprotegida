"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type TextEffectProps = {
  children: string;
  per?: "char";
  preset?: "fade";
  speedReveal?: number;
  speedSegment?: number;
};

const characterVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextEffect({
  children,
  per = "char",
  preset = "fade",
  speedReveal = 1,
  speedSegment = 1,
}: TextEffectProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || per !== "char" || preset !== "fade") {
    return <span>{children}</span>;
  }

  return (
    <motion.span
      aria-label={children}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.018 / speedSegment,
          },
        },
      }}
    >
      <span aria-hidden="true">
        {children.split(/(\s+)/).map((segment, segmentIndex) => {
          if (/^\s+$/.test(segment)) {
            return segment;
          }

          return (
            <span key={`${segment}-${segmentIndex}`} style={{ display: "inline-block" }}>
              {Array.from(segment).map((character, characterIndex) => (
                <motion.span
                  key={`${character}-${characterIndex}`}
                  variants={{
                    hidden: characterVariants.hidden,
                    visible: {
                      ...characterVariants.visible,
                      transition: {
                        duration: 0.34 / speedReveal,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  style={{ display: "inline-block" }}
                >
                  {character}
                </motion.span>
              ))}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
