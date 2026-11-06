import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface WhatsAppLinkProps {
  children: ReactNode;
  className?: string;
}

export function WhatsAppLink({ children, className = "button button-primary" }: WhatsAppLinkProps) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const message = encodeURIComponent("Hola, quisiera consultar por redes de protección.");
  const href = phone ? `https://wa.me/${phone}?text=${message}` : "#contacto";
  return (
    <a className={className} href={href}>
      <WhatsAppIcon size={18} />
      {children}
    </a>
  );
}
