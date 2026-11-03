import Image from "next/image";

export default function Home() {
  return (
    <main className="construction-page">
      <div className="sun-orbit" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Casa Protegida, inicio">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>CASA<br />PROTEGIDA</span>
        </a>
        <div className="status"><i /> Próximamente</div>
      </header>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Redes de protección en nylon</p>
          <h1>Tu balcón.<br /><em>Su lugar seguro.</em></h1>
          <p className="intro">Estamos preparando una forma más linda y segura de cuidar a quienes hacen de tu casa un hogar.</p>
          <a className="notify-link" href="mailto:hola@casaprotegida.com?subject=Quiero%20recibir%20novedades">Quiero enterarme <span aria-hidden="true">↗</span></a>
        </div>
        <div className="artwork" aria-label="Gato descansando protegido por una red de seguridad en el balcón">
          <div className="net net-left" aria-hidden="true" />
          <Image src="/gato-red-protectora.png" alt="Gato descansando tras una red protectora de nylon en un balcón" width={1024} height={1536} priority />
          <span className="tag tag-top">Nylon resistente</span>
          <span className="tag tag-bottom">Instalación profesional</span>
          <div className="paw" aria-hidden="true">✦</div>
        </div>
      </section>
      <section className="promise" aria-label="Nuestra promesa">
        <div className="promise-icon" aria-hidden="true">⌂</div>
        <p>Seguridad que se integra<br />a tu casa y a su vida.</p>
      </section>
      <footer><span>Montevideo, Uruguay</span><span>2026</span></footer>
    </main>
  );
}
