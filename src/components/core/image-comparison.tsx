"use client";

import {
  motion,
  type MotionValue,
  type SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

type ImageComparisonContextValue = {
  motionSliderPosition: MotionValue<number>;
  sliderPosition: number;
};

const ImageComparisonContext = createContext<ImageComparisonContextValue | undefined>(undefined);

type ImageComparisonProps = {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
};

const defaultSpringOptions = { bounce: 0, duration: 0 };

export function ImageComparison({
  children,
  className,
  enableHover = false,
  springOptions,
}: ImageComparisonProps) {
  const isDragging = useRef(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(motionValue, springOptions ?? defaultSpringOptions);

  const updatePosition = (clientX: number, target: HTMLElement) => {
    const { left, width } = target.getBoundingClientRect();
    const nextPosition = Math.min(Math.max(((clientX - left) / width) * 100, 0), 100);
    motionValue.set(nextPosition);
    setSliderPosition(nextPosition);
  };

  return (
    <ImageComparisonContext.Provider value={{ motionSliderPosition, sliderPosition }}>
      <div
        className={className}
        style={{ position: "relative", overflow: "hidden", userSelect: "none", cursor: enableHover ? "ew-resize" : undefined }}
        onMouseMove={(event) => {
          if (isDragging.current || enableHover) updatePosition(event.clientX, event.currentTarget);
        }}
        onMouseDown={() => {
          if (!enableHover) isDragging.current = true;
        }}
        onMouseUp={() => {
          if (!enableHover) isDragging.current = false;
        }}
        onMouseLeave={() => {
          if (!enableHover) isDragging.current = false;
        }}
        onTouchMove={(event) => updatePosition(event.touches[0].clientX, event.currentTarget)}
        onTouchStart={() => {
          if (!enableHover) isDragging.current = true;
        }}
        onTouchEnd={() => {
          if (!enableHover) isDragging.current = false;
        }}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

export function ImageComparisonImage({
  alt,
  className,
  position,
  src,
}: {
  alt: string;
  className?: string;
  position: "left" | "right";
  src: string;
}) {
  const context = useContext(ImageComparisonContext);
  if (!context) throw new Error("ImageComparisonImage must be used inside ImageComparison.");

  const clipPath = useTransform(context.motionSliderPosition, (value) =>
    position === "left" ? `inset(0 ${100 - value}% 0 0)` : `inset(0 0 0 ${value}%)`,
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", clipPath }}
    />
  );
}

export function ImageComparisonSlider({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const context = useContext(ImageComparisonContext);
  if (!context) throw new Error("ImageComparisonSlider must be used inside ImageComparison.");

  const left = useTransform(context.motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", top: 0, bottom: 0, width: "0.25rem", left, pointerEvents: "none" }}
    >
      {children}
    </motion.div>
  );
}
