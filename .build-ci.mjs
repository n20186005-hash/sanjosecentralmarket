// Reproducción limpia de `astro build && verify-build.mjs` con registro de exit codes.
// Debe lanzarse con NODE_OPTIONS vacío para que fs.rmSync no pase por el shim de papelera.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const log = fs.openSync('astro4.log', 'w');
function sh(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: ['ignore', log, log], env: process.env });
  return r.status ?? 1;
}

for (const f of ['astro3.log', 'astro3.err.log', 'astro3.exit', 'astro4.log', 'astro4.exit']) fs.rmSync(f, { force: true });
fs.rmSync('dist', { recursive: true, force: true });
fs.rmSync('.astro', { recursive: true, force: true });

const astro = sh(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build']);
const verify = astro === 0 ? sh(process.execPath, ['scripts/verify-build.mjs']) : -1;
fs.writeFileSync('astro4.exit', `astro=${astro} verify=${verify}`);
process.exit(astro === 0 && verify === 0 ? 0 : 1);
