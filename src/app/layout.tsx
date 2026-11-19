import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.casaprotegida.uy").replace(
  /\/$/,
  "",
);
const siteDescription =
  "Instalación de redes protectoras y redes de protección para niños y gatos en Uruguay. Balcones, ventanas, terrazas y patios. 4 años de garantía. Pedí presupuesto.";
const socialImage = "/images/IMG_1931.webp";
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "Casa Protegida",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.svg`,
      image: `${siteUrl}${socialImage}`,
      description: siteDescription,
      telephone: "+59898327334",
      areaServed: {
        "@type": "Country",
        name: "Uruguay",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+59898327334",
        contactType: "customer service",
        availableLanguage: "es",
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#redes-protectoras`,
      name: "Instalación de redes protectoras",
      serviceType: "Instalación de redes de protección para hogares",
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: {
        "@type": "Country",
        name: "Uruguay",
      },
      description:
        "Instalación de redes protectoras para balcones, ventanas, terrazas, patios, escaleras y barandas.",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Redes protectoras y de protección en Uruguay | Casa Protegida",
    template: "%s | Casa Protegida",
  },
  description: siteDescription,
  keywords: [
    "redes",
    "protectoras",
    "Uruguay",
    "redes protectoras",
    "redes protectoras Uruguay",
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
  icons: {
    icon: "/images/logo.svg",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_UY",
    siteName: "Casa Protegida",
    url: `${siteUrl}/`,
    title: "Redes protectoras y de protección en Uruguay | Casa Protegida",
    description: siteDescription,
    images: [
      {
        url: socialImage,
        alt: "Red protectora instalada en un balcón en Uruguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redes protectoras y de protección en Uruguay | Casa Protegida",
    description: siteDescription,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-UY" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
