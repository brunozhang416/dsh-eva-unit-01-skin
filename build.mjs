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
const dataUri = (relative, mime) => 'data:' + mime + ';base64,' + readFileSync(join(root, relative)).toString('base64');
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
  pilotAvatar: optional('art/pilot-avatar.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#2F5FE0"/></svg>'),
  pilotPortrait: optional('art/pilot-portrait.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320"><rect width="240" height="320" fill="#2F5FE0"/></svg>'),
  pilotCasual: optional('art/pilot-casual.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320"><rect width="240" height="320" fill="#24306B"/></svg>'),
  asukaAvatar: optional('art/asuka-avatar.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#D6293E"/></svg>'),
  asukaPortrait: optional('art/asuka-portrait.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320"><rect width="240" height="320" fill="#D6293E"/></svg>'),
  reiAvatar: optional('art/rei-avatar.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#7FC4E8"/></svg>'),
  reiPortrait: optional('art/rei-portrait.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320"><rect width="240" height="320" fill="#7FC4E8"/></svg>'),
  head02: optional('art/head-02.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#D6293E"/></svg>'),
  head00: optional('art/head-00.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#7FC4E8"/></svg>'),
  atField: optional('art/at-field.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><circle cx="120" cy="120" r="90" fill="none" stroke="currentColor"/></svg>'),
  a10Clip: optional('art/a10-clip.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" fill="currentColor"/></svg>'),
  entryPlug: optional('assets/entry-plug.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800"></svg>'),
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

const audioSource = optional('src/audio.js', `
function createEvaAudio() {
  const noop = () => {};
  return {
    supported: false,
    unlock: () => Promise.resolve(false),
    isUnlocked: () => false,
    setEnabled: noop,
    startBoot: noop,
    setPhase: noop,
    stopBoot: noop,
    setBerserk: noop,
    sfx: noop,
    speak: () => Promise.resolve(),
    setMuted: noop,
    dispose: noop,
  };
}
`);

if (!/function\s+createEvaAudio\s*\(/.test(audioSource)) {
  throw new Error('src/audio.js must define createEvaAudio()');
}

const generated = template
  .replace('__EVA_CSS__', JSON.stringify(css))
  .replace('__EVA_ART__', JSON.stringify(Object.fromEntries(
    Object.entries(art).map(([name, svg]) => [name, sanitize(svg)]),
  )))
  .replace('__BERSERK_02_DATA__', dataUri('assets/berserk-02.webp', 'image/webp'))
  .replace('__BERSERK_00_DATA__', dataUri('assets/berserk-00.webp', 'image/webp'))
  .replace('__LAUNCH_BGM_DATA__', dataUri('assets/evangelion.mp3', 'audio/mpeg'))
  .replace('__CHAT_BGM_DATA__', dataUri('assets/decisive-battle.mp3', 'audio/mpeg'))
  .replace('__ASUKA_SCREAM_DATA__', dataUri('assets/asuka-scream.mp3', 'audio/mpeg'))
  .replace('/* __EVA_AUDIO__ */', audioSource);

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
  console.log(`ok  client.js ${generated.length} bytes · css ${css.length} B · art ${Object.values(art).reduce((n, svg) => n + svg.length, 0)} B · audio ${audioSource.length} B`);
} else {
  console.log(`wrote client.js (${generated.length} bytes)`);
}
