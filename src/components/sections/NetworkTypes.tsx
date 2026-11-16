"use client";

import { SectionCard, SectionCards } from "@/components/ui/SectionCards";

const networkTypes = [
  {
    name: "Red de 1 mm - monofilamento",
    description:
      "Transparente y discreta, ideal si buscás que la red se note lo menos posible. Se puede utilizar en balcones, ventanas y hogares con mascotas.",
    specifications: [
      ["Color y apariencia", "Transparente, poco visible"],
      ["Espesor", "1 mm"],
      ["Resistencia indicada", "200 kg/m²"],
      ["Protección UV", "Sí"],
    ],
  },
  {
    name: "Red de 2 mm - multifilamento",
    description:
      "De apariencia blanca, similar a una soga. Es una opción para quienes prefieren una red más gruesa en terrazas o balcones de uso frecuente.",
    specifications: [
      ["Color y apariencia", "Blanca, similar a una soga"],
      ["Espesor", "2 mm"],
      ["Resistencia indicada", "380 kg/m²"],
      ["Protección UV", "Sí"],
    ],
  },
];

export function NetworkTypes() {
  return (
    <section className="section network-types" aria-labelledby="network-types-title">
      <div className="shell">
        <div className="network-types-intro">
          <h2 className="section-title" id="network-types-title">
            Elegí la red ideal para tu hogar
          </h2>
          <p className="section-copy">
            Dos opciones resistentes para cuidar balcones, ventanas y terrazas según lo que necesite tu espacio.
          </p>
          <p className="network-types-note">Rombos de 5 × 5 cm en ambas redes.</p>
        </div>

        <SectionCards className="network-types-grid">
          {networkTypes.map((network) => (
            <SectionCard className="network-type-card" key={network.name}>
              <h3>{network.name}</h3>
              <p>{network.description}</p>
              <dl className="network-type-specs">
                {network.specifications.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>
          ))}
        </SectionCards>
      </div>
    </section>
  );
}
