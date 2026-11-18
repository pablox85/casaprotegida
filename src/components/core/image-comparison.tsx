"use client";

import {
  motion,
  type MotionValue,
  type SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { createContext, type ReactNode, useContext, useRef, useState } from "react";

type ImageComparisonContextValue = {
  motionSliderPosition: MotionValue<number>;
  sliderPosition: number;
};

const ImageComparisonContext = createContext<ImageComparisonContextValue | undefined>(undefined);

type ImageComparisonProps = {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
};

const defaultSpringOptions = { bounce: 0, duration: 0 };

export function ImageComparison({
  ariaLabel = "Comparar imágenes",
  children,
  className,
  enableHover = false,
  springOptions,
}: ImageComparisonProps) {
  const isDragging = useRef(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(motionValue, springOptions ?? defaultSpringOptions);

  const setPosition = (nextPosition: number) => {
    const clampedPosition = Math.min(Math.max(nextPosition, 0), 100);
    motionValue.set(clampedPosition);
    setSliderPosition(clampedPosition);
  };

  const updatePosition = (clientX: number, target: HTMLElement) => {
    const { left, width } = target.getBoundingClientRect();
    setPosition(((clientX - left) / width) * 100);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 5;
    let nextPosition: number | null = null;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextPosition = sliderPosition - step;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextPosition = sliderPosition + step;
    } else if (event.key === "Home") {
      nextPosition = 0;
    } else if (event.key === "End") {
      nextPosition = 100;
    }

    if (nextPosition === null) {
      return;
    }

    event.preventDefault();
    setPosition(nextPosition);
  };

  return (
    <ImageComparisonContext.Provider value={{ motionSliderPosition, sliderPosition }}>
      <div
        className={className}
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${Math.round(sliderPosition)}% de comparación`}
        onKeyDown={handleKeyDown}
        style={{
          position: "relative",
          overflow: "hidden",
          userSelect: "none",
          cursor: enableHover ? "ew-resize" : undefined,
        }}
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
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        clipPath,
      }}
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
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "0.25rem",
        left,
        pointerEvents: "none",
      }}
    >
      {children}
    </motion.div>
  );
}
