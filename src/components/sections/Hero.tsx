"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TextEffect } from "@/components/core/text-effect";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "16%"],
  );

  return (
    <section ref={heroRef} className="hero" id="inicio" aria-labelledby="hero-title">
      <motion.div className="hero-background" style={{ y: backgroundY }} aria-hidden="true">
        <Image src="/images/IMG_1931.webp" alt="" fill priority sizes="100vw" />
      </motion.div>
      <div className="shell hero-grid">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Casa Protegida · Uruguay</p>
          <h1 id="hero-title">
            <TextEffect per="char" preset="fade" speedReveal={0.3} speedSegment={1}>
              Redes protectoras para niños y mascotas en Uruguay
            </TextEffect>
          </h1>
          <p className="hero-highlight">Protegé lo que más importa.</p>
          <p className="hero-text">
            Instalamos redes de protección en balcones, ventanas, terrazas y patios. Materiales de
            primera calidad, protección UV y 4 años de garantía.
          </p>
          <div className="hero-actions">
            <WhatsAppLink>Solicitar presupuesto</WhatsAppLink>
            <a className="button button-secondary" href="#trabajos">
              Ver nuestros trabajos <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <Image
          className="hero-logo"
          src="/images/logo.svg"
          alt="Casa Protegida Logo"
          width={2569}
          height={2049}
          priority
          loading="eager"
          sizes="(min-width: 704px) 30vw, 60vw"
        />
      </div>
    </section>
  );
}
