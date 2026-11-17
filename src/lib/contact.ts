const configuredWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export const WHATSAPP_NUMBER = (configuredWhatsAppNumber || "59898327334").replace(/\D/g, "");
