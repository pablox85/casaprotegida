import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="shell final-cta-content">
        <div>
          <p className="eyebrow hero-eyebrow">Casa Protegida</p>
          <h2 className="section-title" id="final-cta-title">
            Dale a tu hogar la protección que necesita
          </h2>
          <p>
            Instalaciones de redes de protección para niños y gatos, con materiales de calidad,
            tratamiento UV y 4 años de garantía.
          </p>
        </div>
        <WhatsAppLink>Solicitar presupuesto por WhatsApp</WhatsAppLink>
      </div>
    </section>
  );
}
