import Image from "next/image";

interface WhatsAppIconProps {
  className?: string;
  size?: number;
  src?: string;
}

export function WhatsAppIcon({
  className,
  size = 20,
  src = "/images/wpp_black.svg",
}: WhatsAppIconProps) {
  return (
    <Image aria-hidden="true" alt="" className={className} height={size} src={src} width={size} />
  );
}
