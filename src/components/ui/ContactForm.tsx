"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
    if (!phone) {
      setFeedback("El canal de WhatsApp todavía no está configurado.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const contact = formData.get("contact");
    const message = formData.get("message");
    const text = [
      "Hola, quisiera consultar por redes de protección.",
      `Nombre: ${name}`,
      `Contacto: ${contact}`,
      message ? `Consulta: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.assign(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-field">
        <label htmlFor="contact-name">Nombre</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="contact-form-field">
        <label htmlFor="contact-phone">Teléfono o email</label>
        <input id="contact-phone" name="contact" type="text" autoComplete="tel" required />
      </div>
      <div className="contact-form-field contact-form-field-full">
        <label htmlFor="contact-message">
          ¿Qué espacio querés proteger? <span>(opcional)</span>
        </label>
        <textarea id="contact-message" name="message" rows={4} />
      </div>
      <button className="button button-primary" type="submit">
        Enviar consulta por WhatsApp
      </button>
      <p className="contact-form-feedback" aria-live="polite">
        {feedback}
      </p>
    </form>
  );
}
