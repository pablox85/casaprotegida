import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa Protegida | Próximamente",
  description: "Redes de protección para balcones y ventanas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
