"use client";

import { AnimatePresence, motion, type Transition, type Variants } from "motion/react";
import {
  createContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEventHandler,
  type RefObject,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type DialogContextValue = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  ids: { title: string; description: string };
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);
let openDialogs = 0;
let previousBodyOverflow = "";

const defaultVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 16 },
};

const defaultTransition: Transition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };

export function Dialog({
  children,
  defaultOpen = false,
  onOpenChange,
  open,
}: {
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const baseId = useId();

  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (openDialogs === 0) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    openDialogs += 1;

    return () => {
      openDialogs -= 1;
      if (openDialogs === 0) {
        document.body.style.overflow = previousBodyOverflow;
      }
    };
  }, [isOpen]);

  return (
    <DialogContext.Provider
      value={{
        dialogRef,
        ids: {
          title: `dialog-title-${baseId}`,
          description: `dialog-description-${baseId}`,
        },
        isOpen,
        setOpen,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be rendered inside Dialog.");
  }
  return context;
}

export function DialogTrigger({
  children,
  onClick,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialogContext();

  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
    >
      {children}
    </button>
  );
}

export function DialogContent({
  children,
  className,
  transition = defaultTransition,
  variants = defaultVariants,
  onMouseLeave,
}: HTMLAttributes<HTMLDialogElement> & {
  children: ReactNode;
  className?: string;
  onMouseLeave?: MouseEventHandler<HTMLDialogElement>;
  transition?: Transition;
  variants?: Variants;
}) {
  const { dialogRef, ids, isOpen, setOpen } = useDialogContext();
  useEffect(() => {
    if (isOpen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [dialogRef, isOpen]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.dialog
          ref={dialogRef}
          aria-describedby={ids.description}
          aria-labelledby={ids.title}
          aria-modal="true"
          className={className}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={transition}
          onCancel={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
          onMouseLeave={onMouseLeave}
          onAnimationComplete={(definition) => {
            if (definition === "exit" && !isOpen) {
              dialogRef.current?.close();
            }
          }}
        >
          {children}
        </motion.dialog>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function DialogHeader({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className}>{children}</div>;
}

export function DialogTitle({ children, className }: HTMLAttributes<HTMLHeadingElement>) {
  const { ids } = useDialogContext();
  return (
    <h2 id={ids.title} className={className}>
      {children}
    </h2>
  );
}

export function DialogDescription({ children, className }: HTMLAttributes<HTMLParagraphElement>) {
  const { ids } = useDialogContext();
  return (
    <p id={ids.description} className={className}>
      {children}
    </p>
  );
}

export function DialogClose({
  children,
  onClick,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialogContext();
  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
    >
      {children}
    </button>
  );
}
