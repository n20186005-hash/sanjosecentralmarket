# Guía del Mercado Central de San José

Sitio informativo independiente, en español de Costa Rica, construido con Astro, Tailwind CSS y TypeScript y preparado para Cloudflare Workers.

## Dominio

El dominio se configura **en un solo lugar**: `SITE_URL` dentro de `astro.config.mjs`. El valor puede permanecer vacío y el proyecto sigue construyéndose. Con `SITE_URL` vacío se omiten etiquetas absolutas que dependen del dominio y no se activa `@astrojs/sitemap`. Una vez definido un dominio real, se completa ese valor y se vuelve a construir.

## Instalación y verificación

```bash
rm -rf node_modules
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
```

`pnpm build` ejecuta además `scripts/verify-build.mjs`, que revisa contenido prohibido, sitemap, `lastmod` e imágenes locales obligatorias.

## Cloudflare Workers

El proyecto utiliza `@astrojs/cloudflare` y `wrangler.jsonc`. Para desplegar, primero configure el dominio si corresponde y después ejecute `pnpm deploy`.

## Privacidad y GA4

Measurement ID: `G-HXM22WWPKP`. Google Analytics solo se carga después de que el visitante acepte la categoría de analítica. Las preferencias se administran desde `/configuracion-de-cookies/`.

## Fuentes editoriales principales

- Municipalidad de San José — ficha del Mercado Central.
- Instituto Costarricense de Turismo / Visit Costa Rica — paseo histórico por San José e itinerario cultural.
- Ministerio de Cultura y Juventud — contexto patrimonial del Mercado Central.
- Google Maps — ubicación y referencia de valoración proporcionadas para este proyecto.

Este proyecto no es un sitio oficial.
