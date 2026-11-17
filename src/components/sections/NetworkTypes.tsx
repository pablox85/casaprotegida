"use client";

import { Check } from "lucide-react";

import { SectionCard, SectionCards } from "@/components/ui/SectionCards";

const networkTypes = [
  {
    name: "Red de 1 mm - monofilamento",
    description: "Transparente y discreta, ideal si buscás que la red se note lo menos posible.",
    coverage: "Apta para balcones, ventanas, terrazas y patios, incluso en hogares con mascotas.",
    specifications: [
      ["Color y apariencia", "Transparente, poco visible"],
      ["Espesor", "1 mm"],
      ["Resistencia indicada", "150 kg/m²"],
      ["Protección UV", "Sí"],
    ],
  },
  {
    name: "Red de 2 mm - multifilamento",
    description: "Más gruesa y de apariencia blanca, similar a una soga.",
    coverage: "Apta para balcones, ventanas, terrazas y patios, incluso en hogares con mascotas.",
    specifications: [
      ["Color y apariencia", "Blanca, similar a una soga"],
      ["Espesor", "2 mm"],
      ["Resistencia indicada", "300 kg/m²"],
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
            Dos opciones resistentes para cuidar balcones, ventanas, terrazas y patios. Elegimos la
            alternativa más adecuada según el espacio y el nivel de visibilidad que prefieras.
          </p>
          <p className="network-types-note">Rombos de 5 × 5 cm en ambas redes.</p>
        </div>

        <SectionCards className="network-types-grid">
          {networkTypes.map((network) => (
            <SectionCard className="network-type-card" key={network.name}>
              <h3>{network.name}</h3>
              <p>{network.description}</p>
              <ul className="network-type-coverage">
                <li>
                  <Check aria-hidden="true" size={18} strokeWidth={2.5} />
                  <span>{network.coverage}</span>
                </li>
              </ul>
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
