# Estado de validación

- Auditoría estática de fuente: OK.
- Auditoría de idioma visible: OK (español de Costa Rica).
- Logo y favicons locales: presentes.
- Páginas independientes de privacidad, términos y cookies: presentes.
- Configuración Astro/Cloudflare: presente.
- `site` centralizado y sitemap condicionado a dominio real: presente.
- Fotografías reales: fuentes/licencias verificadas, pero el entorno de ejecución de esta sesión no pudo escribir los binarios externos en `public/images/`.
- Verificación limpia `pnpm install --frozen-lockfile -> check -> build`: no certificada en este entorno porque Corepack/registry externo no es alcanzable.

No se han utilizado imágenes generadas para sustituir fotografías reales ni se ha declarado falsamente una verificación que no pudo ejecutarse.
