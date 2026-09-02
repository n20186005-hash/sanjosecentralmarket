# Estado de validación

- Auditoría estática de fuente (`scripts/audit-source.mjs`): OK.
- Auditoría de idioma visible (`scripts/audit-language.mjs`): OK (español de Costa Rica, sin restos del template original).
- Logo y favicons locales: presentes en `public/icons/`.
- Páginas independientes: privacidad, términos, cookies, créditos fotográficos y 404: presentes.
- Configuración Astro/Cloudflare: presente (`astro.config.mjs`, `wrangler.jsonc`).
- `site` centralizado y sitemap condicionado a dominio real: presente (`SITE` vacío ⇒ `@astrojs/sitemap` desactivado y etiquetas absolutas omitidas, según lo documentado en README).
- Fotografías reales: 6 archivos `.jpg` copiados en `public/images/` (binarios verificados; autorías y licencias en `PHOTO-SOURCES.md` y en la página de créditos fotográficos).
- Lockfile: regenerado y sincronizado con `package.json` (astro 7.2.10, @astrojs/cloudflare 14.2.6); `pnpm install --frozen-lockfile` responde "Lockfile is up to date".
- `scripts/verify-build.mjs`: creado y conectado a `pnpm build` / `pnpm deploy`.
- Verificación limpia certificada en este entorno: `astro build` exit 0 y `scripts/verify-build.mjs` exit 0 sobre `dist/` (6 HTML revisados, imágenes locales copiadas, contenido prohibido ausente). La comprobación de sitemap/lastmod se omite correctamente mientras `SITE` esté vacío.
- Pendiente: definir el dominio real en `SITE_URL` (`astro.config.mjs`) y reconstruir para activar sitemap y `lastmod`. `pnpm check` no se ejecutó en este entorno por límite de ejecución de comandos largos.
