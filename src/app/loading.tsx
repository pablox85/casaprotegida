function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton-block ${className}`} aria-hidden="true" />;
}

export default function Loading() {
  return (
    <main className="page-skeleton" aria-busy="true" aria-label="Cargando contenido">
      <span className="sr-only" role="status">
        Cargando Casa Protegida…
      </span>

      <section className="skeleton-hero">
        <div className="shell skeleton-hero-grid">
          <div className="skeleton-stack">
            <SkeletonBlock className="skeleton-eyebrow skeleton-on-dark" />
            <SkeletonBlock className="skeleton-title skeleton-on-dark" />
            <SkeletonBlock className="skeleton-title-short skeleton-on-dark" />
            <SkeletonBlock className="skeleton-copy skeleton-on-dark" />
            <SkeletonBlock className="skeleton-button skeleton-on-dark" />
          </div>
          <SkeletonBlock className="skeleton-visual skeleton-on-dark" />
        </div>
      </section>

      <section className="section">
        <div className="shell skeleton-stack">
          <SkeletonBlock className="skeleton-eyebrow" />
          <SkeletonBlock className="skeleton-heading" />
          <div className="skeleton-card-grid">
            {[1, 2, 3].map((item) => (
              <SkeletonBlock className="skeleton-card" key={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section skeleton-muted-section">
        <div className="shell skeleton-gallery">
          <SkeletonBlock className="skeleton-gallery-main" />
          <SkeletonBlock className="skeleton-gallery-item" />
          <SkeletonBlock className="skeleton-gallery-item" />
        </div>
      </section>
    </main>
  );
}
