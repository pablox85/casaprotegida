"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RotateCw } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { FlipCard, SectionCards } from "@/components/ui/SectionCards";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Redes para balcones",
    text: "Protección para disfrutar de tu balcón con mayor tranquilidad.",
    image: "/images/balcon1.jpeg",
    imageAlt: "Red de protección instalada en un balcón.",
  },
  {
    title: "Redes para ventanas",
    text: "Una solución para hogares con niños y mascotas.",
    image: "/images/IMG_2884.webp",
    imageAlt: "Red de protección instalada en una ventana.",
  },
  {
    title: "Redes para terrazas",
    text: "Instalaciones adaptadas a las características de cada espacio.",
    image: "/images/terraza1.webp",
    imageAlt: "Red de protección instalada en una terraza.",
  },
  {
    title: "Redes para patios",
    text: "Redes de protección según las necesidades y medidas del lugar.",
    image: "/images/cerramiento (1).webp",
    imageAlt: "Red de protección instalada en un espacio exterior.",
  },
  {
    title: "Redes Estructurales",
    text: "Cerramientos adaptados a la arquitectura del lugar.",
    image: "/images/estructura1.webp",
    imageAlt: "Red de protección instalada en un cerramiento estructural.",
  },
  {
    title: "Redes para escaleras y barandas",
    text: "Evitan que niños y mascotas pasen entre los barrotes o caigan por los espacios abiertos.",
    image: "/images/escalera.webp",
    imageAlt: "Red de protección instalada en una escalera.",
  },
];

export function Services() {
  const servicesSectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const images = gsap.utils.toArray<HTMLElement>("[data-service-image]");

      gsap.fromTo(
        images,
        { opacity: 0.7, scale: 0.92 },
        {
          duration: 1.1,
          ease: "power3.out",
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          scrollTrigger: {
            once: true,
            start: "top 84%",
            trigger: servicesSectionRef.current,
          },
        },
      );
    },
    { scope: servicesSectionRef },
  );

  return (
    <section
      ref={servicesSectionRef}
      className="section"
      id="servicios"
      aria-labelledby="services-title"
    >
      <div className="shell">
        <p className="eyebrow">Servicios</p>
        <h2 className="section-title" id="services-title">
          Protección para cada espacio
        </h2>
        <br />
        <p className="section-copy">
          Instalamos redes de protección adaptadas a diferentes espacios del hogar, buscando
          combinar seguridad, resistencia y una terminación discreta.
        </p>
        <SectionCards className="services-grid">
          {services.map(({ title, text, image, imageAlt }) => (
            <FlipCard
              ariaLabel={`Mostrar más información sobre ${title}`}
              back={
                <div className="service-card-back-content">
                  <Image
                    alt={imageAlt}
                    className="service-card-image"
                    data-service-image
                    fill
                    loading={
                      image === "/images/balcon1.jpeg" || image === "/images/cerramiento (1).webp"
                        ? "eager"
                        : undefined
                    }
                    sizes="(min-width: 704px) 30vw, 100vw"
                    src={image}
                  />
                  <span className="service-card-caption">
                    <span>{title}</span>
                    <RotateCw size={18} strokeWidth={2} />
                  </span>
                </div>
              }
              className="service-card"
              defaultFlipped
              key={title}
            >
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="service-card-flip-hint" aria-hidden="true">
                <RotateCw size={18} strokeWidth={2} />
              </span>
            </FlipCard>
          ))}
        </SectionCards>
      </div>
    </section>
  );
}
