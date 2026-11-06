"use client";

import { InView } from "@/components/core/in-view";
import { motion } from "motion/react";
import Image from "next/image";

const works = [
  {
    src: "/images/IMG_2800.jpeg",
    alt: "Red de protección instalada en un balcón con vista exterior",
  },
  {
    src: "/images/IMG_2884.jpeg",
    alt: "Red de protección instalada en una ventana",
  },
  {
    src: "/images/IMG_2937.jpeg",
    alt: "Red de protección instalada sobre un patio",
  },
  {
    src: "/images/IMG_2966.jpeg",
    alt: "Red de protección instalada sobre un patio interior",
  },
  {
    src: "/images/IMG_2997.jpeg",
    alt: "Red de protección instalada en un patio lateral",
  },
  {
    src: "/images/IMG_3091.jpeg",
    alt: "Red de protección instalada en un balcón",
  },
  {
    src: "/images/IMG_3186.jpeg",
    alt: "Red de protección instalada en un balcón residencial",
  },
  {
    src: "/images/IMG_3187.jpeg",
    alt: "Red de protección instalada en un balcón con deck",
  },
];

export function WorkGallery() {
  return (
    <section className="section" id="trabajos" aria-labelledby="works-title">
      <div className="shell">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">Galería</p>
            <h2 className="section-title" id="works-title">
              Nuestros trabajos
            </h2>
          </div>
          <p className="section-copy">
            Cada espacio es diferente. Conocé algunas de nuestras instalaciones de redes de
            protección en balcones, ventanas, terrazas y patios.
          </p>
        </div>
        <InView
          className="gallery"
          viewOptions={{ once: true, margin: "0px 0px -180px 0px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.12,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {works.map((work, index) => (
            <motion.figure
              className="gallery-card"
              key={work.src}
              variants={{
                hidden: { opacity: 0, scale: 0.88, y: 24, filter: "blur(12px)" },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <Image
                src={work.src}
                alt={work.alt}
                fill
                loading="lazy"
                sizes={
                  index === 0 ? "(min-width: 704px) 60vw, 100vw" : "(min-width: 704px) 30vw, 50vw"
                }
              />
            </motion.figure>
          ))}
        </InView>
      </div>
    </section>
  );
}
