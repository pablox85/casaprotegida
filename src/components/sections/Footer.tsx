export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <a className="brand" href="#inicio">
          Casa Protegida
        </a>
        <p>Redes de protección · Uruguay</p>
        <p>© {new Date().getFullYear()} Casa Protegida</p>
        <p>
          Desarrollado por:{" "}
          <a
            className="footer-credit"
            href="https://bprsoluciones.uy/?utm_source=casaprotegidaUY&utm_medium=referral&utm_campaign=footer&utm_content=casaprotegidaUY"
            target="_blank"
            rel="noopener noreferrer"
          >
            BPR Soluciones
          </a>
        </p>
      </div>
    </footer>
  );
}
