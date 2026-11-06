import { BadgeCheck, CreditCard, ShieldCheck, Sun } from "lucide-react";

const benefits = [
  {
    Icon: ShieldCheck,
    title: "5 a 7 años",
    text: "Vida útil estimada, según condiciones de uso y exposición.",
  },
  {
    Icon: Sun,
    title: "Protección UV",
    text: "Tratamiento contra la exposición solar tanto en redes como en sogas.",
  },
  {
    Icon: BadgeCheck,
    title: "4 años de garantía",
    text: "Respaldo de la instalación, sujeto a las condiciones de garantía.",
  },
  {
    Icon: CreditCard,
    title: "Hasta 5 cuotas sin interés",
    text: "Facilidades para realizar la instalación.",
  },
];

export function Benefits() {
  return (
    <section className="section benefits" aria-labelledby="benefits-title">
      <div className="shell">
        <p className="eyebrow hero-eyebrow">Materiales y beneficios</p>
        <h2 className="section-title" id="benefits-title">
          Calidad y resistencia para tu tranquilidad
        </h2>
        <p className="section-copy">
          Trabajamos con redes de nylon transparente de 1 mm y materiales preparados para la
          exposición al exterior.
        </p>
        <div className="benefits-grid">
          {benefits.map(({ Icon, title, text }) => (
            <article className="benefit-card" key={title}>
              <Icon className="benefit-icon" size={26} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
