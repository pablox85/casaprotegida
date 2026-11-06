# Casa Protegida

Landing de Casa Protegida, desarrollada con Next.js App Router, React, TypeScript estricto y Tailwind CSS.

## Requisitos

- Node.js 20.9 o superior
- npm

## Instalación y ejecución

```bash
cd casaprotegida
npm install
copy .env.example .env.local
npm run dev
```

Abrí `http://localhost:3000`.

## Variables de entorno

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número de WhatsApp en formato internacional. Si falta, los CTAs llevan a la sección de contacto para evitar enlaces inventados.
- `NEXT_PUBLIC_SITE_URL`: URL pública definitiva. Habilita la entrada raíz en el sitemap.

## Comandos

```bash
npm run lint
npm run format:check
npx tsc --noEmit
npm run build
```

## Estructura

- `src/app`: rutas, layout, metadata, sitemap y robots.
- `src/components/sections`: secciones de la landing.
- `src/components/ui`: componentes reutilizables.
- `public/images`: assets locales y placeholders a sustituir por material real.

## Antes de publicar

Completar datos oficiales de WhatsApp, dominio, zona de atención, horarios, fotografías de trabajos, identidad visual y JSON-LD `LocalBusiness`. No hay despliegue configurado ni publicación realizada.
