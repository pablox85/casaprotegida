const services = [
  ["01", "Redes para balcones", "Protección para disfrutar de tu balcón con mayor tranquilidad."],
  ["02", "Redes para ventanas", "Una solución para hogares con niños y gatos."],
  ["03", "Redes para terrazas", "Instalaciones adaptadas a las características de cada espacio."],
  ["04", "Redes para patios", "Redes de protección según las necesidades y medidas del lugar."],
];

export function Services() {
  return (
    <section className="section" id="servicios" aria-labelledby="services-title">
      <div className="shell">
        <p className="eyebrow">Servicios</p>
        <h2 className="section-title" id="services-title">
          Protección para cada espacio
        </h2>
        <p className="section-copy">
          Instalamos redes de protección adaptadas a diferentes espacios del hogar, buscando
          combinar seguridad, resistencia y una terminación discreta.
        </p>
        <div className="services-grid">
          {services.map(([number, title, text]) => (
            <article className="service-card" key={number}>
              <span className="card-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
