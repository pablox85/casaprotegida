import Image from "next/image";

import { FlipCard, SectionCards } from "@/components/ui/SectionCards";

const services = [
  {
    number: "01",
    title: "Redes para balcones",
    text: "Protección para disfrutar de tu balcón con mayor tranquilidad.",
    image: "/images/balcon1.webp",
    imageAlt: "Red de protección instalada en un balcón.",
  },
  {
    number: "02",
    title: "Redes para ventanas",
    text: "Una solución para hogares con niños y mascotas.",
    image: "/images/IMG_2166.webp",
    imageAlt: "Red de protección instalada en una ventana.",
  },
  {
    number: "03",
    title: "Redes para terrazas",
    text: "Instalaciones adaptadas a las características de cada espacio.",
    image: "/images/terraza1.webp",
    imageAlt: "Red de protección instalada en una terraza.",
  },
  {
    number: "04",
    title: "Redes para patios",
    text: "Redes de protección según las necesidades y medidas del lugar.",
    image: "/images/IMG_2800.webp",
    imageAlt: "Red de protección instalada en un espacio exterior.",
  },
  {
    number: "05",
    title: "Redes para jardines",
    text: "Protección integral para espacios exteriores.",
    image: "/images/IMG_2496.webp",
    imageAlt: "Red de protección integrada en un jardín.",
  },
  {
    number: "06",
    title: "Redes para escaleras y barandas",
    text: "Evitan que niños y mascotas pasen entre los barrotes o caigan por los espacios abiertos.",
    image: "/images/escalera.webp",
    imageAlt: "Red de protección instalada en una escalera.",
  },
];

export function Services() {
  return (
    <section className="section" id="servicios" aria-labelledby="services-title">
      <div className="shell">
        <p className="eyebrow">Servicios</p>
        <h2 className="section-title" id="services-title">
          Protección para cada espacio
        </h2>
        <p className="section-copy">
          Instalamos redes de protección adaptadas a diferentes espacios del hogar, buscando
          combinar seguridad, resistencia y una terminación discreta.
        </p>
        <SectionCards className="services-grid">
          {services.map(({ number, title, text, image, imageAlt }) => (
            <FlipCard
              ariaLabel={`Mostrar más información sobre ${title}`}
              back={
                <div className="service-card-back-content">
                  <Image
                    alt={imageAlt}
                    className="service-card-image"
                    fill
                    sizes="(min-width: 704px) 30vw, 100vw"
                    src={image}
                  />
                  <span className="service-card-caption">{title}</span>
                </div>
              }
              className="service-card"
              key={number}
            >
              <span className="card-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </FlipCard>
          ))}
        </SectionCards>
      </div>
    </section>
  );
}
