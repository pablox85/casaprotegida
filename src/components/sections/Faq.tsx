const questions = [
  [
    "¿Cuánto dura una red de protección?",
    "La vida útil estimada es de 5 a 7 años, dependiendo de las condiciones de uso, exposición y mantenimiento.",
  ],
  [
    "¿Las redes resisten el sol?",
    "Sí. Tanto la red como la soga cuentan con tratamiento UV para mejorar su resistencia a la exposición solar.",
  ],
  [
    "¿Las redes son resistentes a las mordidas de los gatos?",
    "Las redes de nylon no son antimordida. Si un gato muerde repetidamente el material, puede dañarlo o romperlo. Es importante revisar periódicamente su estado.",
  ],
  [
    "¿Cómo solicito un presupuesto?",
    "Escribinos por WhatsApp y envianos las medidas aproximadas del espacio. Con esa información podemos preparar una cotización.",
  ],
  [
    "¿Ofrecen garantía?",
    "Sí, ofrecemos 4 años de garantía, conforme a sus condiciones de cobertura.",
  ],
  [
    "¿Puedo pagar en cuotas?",
    "Sí, ofrecemos hasta 5 cuotas sin interés, según las condiciones de pago disponibles.",
  ],
];

export function Faq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: {
        "@type": "Answer",
        text,
      },
    })),
  };

  return (
    <section className="section" id="preguntas" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="shell">
        <p className="eyebrow">Información útil</p>
        <h2 className="section-title" id="faq-title">
          Preguntas frecuentes sobre redes de protección
        </h2>
        <Accordion
          className="faq-list"
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          variants={{
            expanded: { opacity: 1, scale: 1 },
            collapsed: { opacity: 0, scale: 0.7 },
          }}
        >
          {questions.map(([question, answer]) => (
            <AccordionItem className="faq-item" key={question} value={question}>
              <AccordionTrigger className="faq-trigger">
                <ChevronRight aria-hidden="true" className="faq-icon" />
                <span>{question}</span>
              </AccordionTrigger>
              <AccordionContent className="faq-content">
                <p>{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/core/accordion";
import { ChevronRight } from "lucide-react";
