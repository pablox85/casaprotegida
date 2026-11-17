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
            <strong>Para preparar tu consulta</strong>
            Contanos qué espacio querés proteger —balcón, ventana, terraza, patio, jardín, escalera
            o baranda— y explicanos brevemente qué necesitás. Si podés, agregá las medidas
            aproximadas del lugar (ancho y alto), tu ciudad o zona, y cualquier detalle relevante,
            como la presencia de niños o mascotas. Con esa información podemos orientarte mejor y
            preparar un presupuesto más preciso.
          </aside>
        </div>
      </div>
    </section>
  );
}
