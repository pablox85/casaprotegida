"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface WaveTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
}

function WaveText({ text, className = "", delay = 0, duration = 0.6, stagger = 0.05, y = -20 }: WaveTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const characters = text.split("");

  useGSAP(() => {
    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (chars.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(chars, { opacity: 1 });
    gsap.to(chars, {
      y,
      duration,
      delay,
      stagger: { each: stagger, repeat: -1, yoyo: true, ease: "sine.inOut" },
      ease: "sine.inOut",
    });
  }, { scope: containerRef, dependencies: [text, delay, duration, stagger, y] });

  return (
    <div ref={containerRef} className={`construction-title ${className}`} role="heading" aria-level={1} aria-label={text}>
      {characters.map((char, index) => (
        <span key={`${index}-${char}`} ref={(element) => { charsRef.current[index] = element; }} aria-hidden="true">
          {char}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = content.current;
    if (!element || !window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = element.getBoundingClientRect();
    const glow = { x: bounds.width * 0.2, y: bounds.height * 0.2 };
    const loop = gsap.to(glow, {
      x: bounds.width * 0.8,
      y: bounds.height * 0.8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      onUpdate: () => {
        element.style.setProperty("--glow-x", `${glow.x}px`);
        element.style.setProperty("--glow-y", `${glow.y}px`);
      },
    });

    return () => {
      loop.kill();
    };
  }, { scope: content });

  useEffect(() => {
    const element = content.current;
    if (!element || window.matchMedia("(max-width: 767px)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      element.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
      element.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
    };

    element.addEventListener("pointermove", handlePointerMove);
    return () => element.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <main className="blank-page">
      <div className="construction-content" ref={content}>
        <WaveText text="En construcción" duration={0.7} stagger={0.07} y={-16} />
        <span aria-hidden="true" />
        <p className="brand-label">Casa Protegida</p>
      </div>
      <footer className="site-footer">
        <a href="https://bprsoluciones.uy/?utm_source=Casa%20Protegida&utm_medium=referral&utm_campaign=footer" target="_blank" rel="noreferrer">
          Desarrollado por BPR Soluciones
        </a>
      </footer>
    </main>
  );
}
