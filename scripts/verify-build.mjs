// verify-build.mjs — Verificación post-build para la guía del Mercado Central de San José.
// Se ejecuta al final de `pnpm build` / `pnpm deploy`. Revisa, sobre `dist/`:
//   1) que existan las páginas esperadas y no haya archivos vacíos;
//   2) contenido prohibido (mismos tokens que scripts/audit-source.mjs más restos del
//      plantilla original y hotlinks de imágenes de relleno);
//   3) que toda referencia local a /images/ resuelva y que las fotografías reales de
//      public/images/ se hayan copiado al artefacto;
//   4) sitemap (solo cuando astro.config.mjs define un dominio SITE) y cobertura lastmod.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const problems = [];
const notes = [];

if (!fs.existsSync(dist)) {
  console.error('Build verification FAILED: no existe el directorio dist/. ¿Se ejecutó astro build?');
  process.exit(1);
}

// 1) Páginas esperadas y tamaño no nulo.
const expectedPages = [
  'index.html',
  '404.html',
  'privacidad/index.html',
  'terminos/index.html',
  'configuracion-de-cookies/index.html',
  'creditos-fotograficos/index.html'
];
const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(dist);

for (const rel of expectedPages) {
  const p = path.join(dist, rel);
  if (!fs.existsSync(p)) problems.push(`Falta página generada: ${rel}`);
  else if (fs.statSync(p).size === 0) problems.push(`Página vacía: ${rel}`);
}

// 2) Contenido prohibido en el HTML generado.
const forbidden = [
  'example' + '.com',
  'local' + 'host',
  'chrome-' + 'extension://',
  // Restos del template original (chino) que esta guía sustituyó por contenido en español.
  '隐私政策',
  '服务条款',
  '中央市场',
  '常见问答',
  // Hotlinks de imágenes de relleno: el sitio debe servirlas desde public/images/.
  'loremflickr.com',
  'images.unsplash.com',
  'via.placeholder.com',
  'placehold.co'
];
for (const f of htmlFiles) {
  const t = fs.readFileSync(f, 'utf8');
  for (const b of forbidden) {
    if (t.includes(b)) problems.push(`${path.relative(dist, f)}: contiene "${b}"`);
  }
}

// 3) Imágenes locales: toda referencia /images/... debe existir y las fotos reales deben copiarse.
const imageRefRe = /(?:src|href|content)="(\/images\/[^"?#\s]+)"/g;
for (const f of htmlFiles) {
  const t = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = imageRefRe.exec(t)) !== null) {
    const file = path.join(dist, m[1].replace(/^\//, ''));
    if (!fs.existsSync(file)) problems.push(`${path.relative(dist, f)}: referencia de imagen inexistente ${m[1]}`);
  }
}
const publicImagesDir = path.join(root, 'public', 'images');
if (fs.existsSync(publicImagesDir)) {
  for (const file of fs.readdirSync(publicImagesDir)) {
    if (!/\.(jpe?g|png|webp|gif)$/i.test(file)) continue;
    const copied = path.join(dist, 'images', file);
    if (!fs.existsSync(copied) || fs.statSync(copied).size === 0) {
      problems.push(`Fotografía real no copiada al artefacto: /images/${file}`);
    }
  }
}

// 4) Sitemap y lastmod: solo cuando astro.config.mjs declara un SITE no vacío.
let siteConfigured = false;
try {
  const cfg = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
  siteConfigured = /const\s+SITE\s*=\s*['"]([^'"]+)['"]/.test(cfg) &&
    !/const\s+SITE\s*=\s*['"]['"]/.test(cfg);
} catch { /* configuración ausente: se omite la comprobación */ }

if (siteConfigured) {
  const sitemapIndex = path.join(dist, 'sitemap-index.xml');
  const sitemapPlain = path.join(dist, 'sitemap.xml');
  const sitemaps = [];
  if (fs.existsSync(sitemapIndex)) {
    const idx = fs.readFileSync(sitemapIndex, 'utf8');
    for (const m of idx.matchAll(/<loc>\s*([^<\s]+sitemap[^<\s]*\.xml)\s*<\/loc>/g)) {
      const local = path.join(dist, path.basename(new URL(m[1]).pathname));
      if (fs.existsSync(local)) sitemaps.push(local);
      else problems.push(`sitemap-index.xml referencia un sitemap inexistente: ${m[1]}`);
    }
  } else if (fs.existsSync(sitemapPlain)) {
    sitemaps.push(sitemapPlain);
  } else {
    problems.push('SITE configurado pero no se generó sitemap-index.xml ni sitemap.xml');
  }
  let totalUrls = 0;
  let withLastmod = 0;
  for (const s of sitemaps) {
    const xml = fs.readFileSync(s, 'utf8');
    for (const u of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      totalUrls += 1;
      if (/<lastmod>\s*\d{4}-\d{2}-\d{2}/.test(u[1])) withLastmod += 1;
    }
  }
  if (totalUrls === 0) problems.push('Sitemap generado sin entradas <url>');
  else notes.push(`Sitemap: ${sitemaps.length} archivo(s), ${totalUrls} URL(s), ${withLastmod} con lastmod.`);
} else {
  notes.push('SITE no configurado: se omite la comprobación de sitemap/lastmod (esperado).');
}

if (problems.length) {
  console.error('Build verification FAILED:');
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
for (const n of notes) console.log('Verificación: ' + n);
console.log(`Build verification OK (${htmlFiles.length} HTML revisados).`);
