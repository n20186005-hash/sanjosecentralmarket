import fs from 'node:fs';import path from 'node:path';
const root=process.cwd();const blocked=['example'+'.com','local'+'host','chrome-'+'extension://'];let bad=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(['node_modules','.git','dist'].includes(e.name))continue;const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(/\.(astro|mjs|ts|js|json|html|css|txt|md|xml|svg|jsonc)$/.test(e.name)){const t=fs.readFileSync(p,'utf8');for(const b of blocked)if(t.includes(b))bad.push(`${p}: ${b}`)}}}
walk(root);if(bad.length){console.error(bad.join('\n'));process.exit(1)}console.log('Source audit OK');
