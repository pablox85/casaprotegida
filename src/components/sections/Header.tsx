"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 24);

    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const closeOnClickOutside = (event: PointerEvent) => {
      if (!headerContentRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnClickOutside);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="shell header-row" ref={headerContentRef}>
        <a className="brand" href="#inicio" aria-label="Casa Protegida, inicio">
          <Image
            className="header-logo"
            src="/images/HIstory-post.svg"
            alt="Casa Protegida"
            width={2569}
            height={2049}
            priority
          />
        </a>
        <button
          className="header-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          className="header-nav"
          id="main-navigation"
          data-open={isMenuOpen}
          aria-label="Navegación principal"
        >
          <a href="#servicios" onClick={() => setIsMenuOpen(false)}>
            Servicios
          </a>
          <a href="#trabajos" onClick={() => setIsMenuOpen(false)}>
            Trabajos
          </a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)}>
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
