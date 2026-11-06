import { ContactForm } from "@/components/ui/ContactForm";

export function Contact() {
  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="shell">
        <div className="contact-panel">
          <div>
            <p className="eyebrow">Contacto</p>
            <h2 className="section-title" id="contact-title">
              Contanos qué espacio querés proteger.
            </h2>
            <p className="section-copy">
              Dejanos tus datos y prepararemos el mensaje para iniciar la consulta por WhatsApp.
            </p>
            <ContactForm />
          </div>
          <aside className="contact-detail">
            <strong>Información pendiente de confirmar</strong>WhatsApp, zona de atención, horarios,
            redes sociales y datos fiscales se sumarán al recibir la información comercial oficial.
          </aside>
        </div>
      </div>
    </section>
  );
}
