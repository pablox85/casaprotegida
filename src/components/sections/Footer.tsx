export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <a className="brand" href="#inicio">
          Casa Protegida
        </a>
        <p>Redes de protección · Uruguay</p>
        <p>© {new Date().getFullYear()} Casa Protegida</p>
      </div>
    </footer>
  );
}
