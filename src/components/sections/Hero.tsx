import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { TextEffect } from "@/components/core/text-effect";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Casa Protegida · Uruguay</p>
          <h1 id="hero-title">
            <TextEffect per="char" preset="fade" speedReveal={0.3} speedSegment={1}>
              Redes de protección para niños y mascotas en Uruguay
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
        <div className="net-art">
          <Image
            src="/images/balcon2.webp"
            alt="balcon2.webp"
            fill
            priority
            loading="eager"
            sizes="(min-width: 704px) 40vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
