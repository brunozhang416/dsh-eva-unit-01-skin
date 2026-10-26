#!/usr/bin/env node
/**
 * Builds the Client half of the EVA-01 skin.
 * Inlines src/skin.css and art/*.svg into client.js so the bundle stays a
 * single browser module (the module loader has no package-local imports).
 *
 *   node build.mjs            build client.js
 *   node build.mjs --check    build + syntax/manifest validation
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
const checkOnly = process.argv.includes('--check');

const read = (relative) => readFileSync(join(root, relative), 'utf8');
const optional = (relative, fallback) =>
  existsSync(join(root, relative)) ? readFileSync(join(root, relative), 'utf8') : fallback;

const template = read('src/client.template.js');
const css = read('src/skin.css');

const art = {
  head: optional('art/head.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#4B1D7A"/></svg>'),
  icon: optional('art/icon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" fill="#4B1D7A"/></svg>'),
  badge: optional('art/badge-hex.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 56"><rect width="200" height="56" fill="none"/></svg>'),
  hazard: optional('art/hazard.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 24 24 0H12L0 12Z" fill="#FFD400"/></svg>'),
  waveform: optional('art/waveform.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 28"><path d="M0 14h220" stroke="currentColor"/></svg>'),
};

// The artwork must stay embeddable as an HTML string: strip anything that
// could close the wrapper element early.
const sanitize = (svg) =>
  svg
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .trim();

for (const [name, svg] of Object.entries(art)) {
  if (!/^<svg[\s>]/i.test(sanitize(svg))) throw new Error(`art/${name}.svg is not an SVG document`);
}

const generated = template
  .replace('__EVA_CSS__', JSON.stringify(css))
  .replace('__EVA_ART__', JSON.stringify(Object.fromEntries(
    Object.entries(art).map(([name, svg]) => [name, sanitize(svg)]),
  )));

const out = join(root, 'client.js');
writeFileSync(out, generated);

if (checkOnly) {
  execFileSync(process.execPath, ['--check', out], { stdio: 'inherit' });
  const manifest = JSON.parse(read('package.json'));
  if (!manifest.dsh?.client?.platform) throw new Error('package.json lacks dsh.client.platform');
  JSON.parse(read('locale/en.json'));
  JSON.parse(read('locale/zh.json'));
  if (manifest.exports?.['./icon'] && !existsSync(join(root, manifest.exports['./icon']))) {
    throw new Error(`missing icon export target: ${manifest.exports['./icon']}`);
  }
  console.log(`ok  client.js ${generated.length} bytes · css ${css.length} B · art ${Object.values(art).reduce((n, svg) => n + svg.length, 0)} B`);
} else {
  console.log(`wrote client.js (${generated.length} bytes)`);
}
