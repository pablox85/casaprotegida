import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.casaprotegida.uy";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Redes de Protección en Uruguay | Casa Protegida",
    template: "%s | Casa Protegida",
  },
  description:
    "Instalación de redes de protección para niños y gatos en Uruguay. Balcones, ventanas, terrazas y patios. 4 años de garantía. Pedí presupuesto.",
  keywords: [
    "redes de protección Uruguay",
    "redes de protección para gatos",
    "redes de protección para niños",
    "redes de protección para balcones",
    "redes de protección para ventanas",
    "instalación de redes de protección",
    "redes de protección para terrazas",
    "redes de protección precio Uruguay",
  ],
  applicationName: "Casa Protegida",
  robots: { index: true, follow: true },
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "es_UY",
    siteName: "Casa Protegida",
    url: siteUrl,
    title: "Redes de Protección en Uruguay | Casa Protegida",
    description:
      "Instalación de redes de protección para niños y gatos en Uruguay. Balcones, ventanas, terrazas y patios. 4 años de garantía. Pedí presupuesto.",
  },
  twitter: {
    card: "summary",
    title: "Redes de Protección en Uruguay | Casa Protegida",
    description:
      "Instalación de redes de protección para niños y gatos en Uruguay. Balcones, ventanas, terrazas y patios. 4 años de garantía. Pedí presupuesto.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-UY" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
