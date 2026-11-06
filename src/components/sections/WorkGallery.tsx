import Image from "next/image";

const works = [
  "Instalación en balcón — imagen pendiente",
  "Instalación en ventana — imagen pendiente",
  "Instalación en terraza — imagen pendiente",
  "Instalación en patio — imagen pendiente",
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
        <div className="gallery">
          {works.map((label, index) => (
            <figure className="gallery-card" key={label}>
              <Image
                src="/images/work-placeholder.svg"
                alt={label}
                fill
                loading="lazy"
                sizes={
                  index === 0 ? "(min-width: 704px) 60vw, 100vw" : "(min-width: 704px) 30vw, 50vw"
                }
              />
              <figcaption className="gallery-caption">{label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
