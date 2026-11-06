import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

const steps = [
  ["01", "Escribinos", "Contactanos por WhatsApp y contanos qué espacio necesitás proteger."],
  [
    "02",
    "Enviá las medidas",
    "Compartí las medidas aproximadas del balcón, ventana, terraza o patio.",
  ],
  [
    "03",
    "Recibí tu cotización",
    "Con esa información te brindamos un presupuesto personalizado directamente por WhatsApp.",
  ],
];

export function Process() {
  return (
    <section className="section process" id="proceso" aria-labelledby="process-title">
      <div className="shell">
        <p className="eyebrow">Presupuesto</p>
        <h2 className="section-title" id="process-title">
          Pedí tu presupuesto en tres pasos
        </h2>
        <ol className="process-list">
          {steps.map(([number, title, text]) => (
            <li className="process-item" key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <WhatsAppLink>Pedir presupuesto por WhatsApp</WhatsAppLink>
      </div>
    </section>
  );
}
