"use client";

import { AnimatePresence, motion, MotionConfig, type Transition, type Variant } from "motion/react";
import { createContext, useContext, useId, useState, type ReactNode } from "react";

type AccordionVariants = {
  collapsed: Variant;
  expanded: Variant;
};

type AccordionContextValue = {
  expandedValue: string | null;
  toggleItem: (value: string) => void;
  variants?: AccordionVariants;
};

type AccordionItemContextValue = {
  contentId: string;
  isExpanded: boolean;
  value: string;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordion() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used inside Accordion.");
  }

  return context;
}

function useAccordionItem() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error("AccordionTrigger and AccordionContent must be used inside AccordionItem.");
  }

  return context;
}

export function Accordion({
  children,
  className,
  transition,
  variants,
}: {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  variants?: AccordionVariants;
}) {
  const [expandedValue, setExpandedValue] = useState<string | null>(null);

  return (
    <MotionConfig transition={transition}>
      <AccordionContext.Provider
        value={{
          expandedValue,
          toggleItem: (value) =>
            setExpandedValue((currentValue) => (currentValue === value ? null : value)),
          variants,
        }}
      >
        <div className={className}>{children}</div>
      </AccordionContext.Provider>
    </MotionConfig>
  );
}

export function AccordionItem({
  children,
  className,
  value,
}: {
  children: ReactNode;
  className?: string;
  value: string;
}) {
  const { expandedValue } = useAccordion();
  const contentId = useId();
  const isExpanded = expandedValue === value;

  return (
    <AccordionItemContext.Provider value={{ contentId, isExpanded, value }}>
      <div
        className={className}
        data-closed={isExpanded ? undefined : ""}
        data-expanded={isExpanded ? "" : undefined}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { contentId, isExpanded, value } = useAccordionItem();
  const { toggleItem } = useAccordion();

  return (
    <button
      aria-controls={contentId}
      aria-expanded={isExpanded}
      className={`group ${className ?? ""}`}
      data-closed={isExpanded ? undefined : ""}
      data-expanded={isExpanded ? "" : undefined}
      onClick={() => toggleItem(value)}
      type="button"
    >
      {children}
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { contentId, isExpanded } = useAccordionItem();
  const { variants } = useAccordion();

  const baseVariants: AccordionVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: "auto", opacity: 1 },
  };
  const combinedVariants: AccordionVariants = {
    collapsed: { ...baseVariants.collapsed, ...variants?.collapsed },
    expanded: { ...baseVariants.expanded, ...variants?.expanded },
  };

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          animate="expanded"
          aria-hidden={!isExpanded}
          className={className}
          exit="collapsed"
          id={contentId}
          initial="collapsed"
          variants={combinedVariants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
