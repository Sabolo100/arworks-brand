#!/usr/bin/env node
/**
 * dist/ előállítása a src/ forrásokból — nincs külső függőség (csak Node 18+).
 *
 *   node scripts/build.mjs          # dist/ újraírása
 *   node scripts/build.mjs --check  # hibával kilép, ha a dist/ elmaradt a src/-től (CI / commit előtt)
 *
 * Kimenet:
 *   dist/arworks.css          minden egyben: betűk + tokenek + alap + komponensek + elrendezés (ezt kell beilleszteni)
 *   dist/arworks-nofonts.css  ugyanez a Google Fonts @import nélkül (saját szerverről kiszolgált betűkhöz, lásd README)
 *   dist/arworks-tokens.css   csak a tokenek (CSS-változók, világos + sötét) — saját komponensekhez
 *   dist/tokens.json          a tokenek JSON-ban (más eszközökhöz: Figma, Style Dictionary, Android/iOS-generátor)
 *   dist/tailwind.preset.cjs  Tailwind v3 preset (presets: [require('…')])
 *   dist/tailwind-v4.css      Tailwind v4 @theme blokk (@import '…')
 *
 * A tokenek egyetlen forrása a src/tokens.css; a JSON és a Tailwind-fájlok belőle készülnek,
 * így a négy forma nem csúszhat szét.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = (f) => join(ROOT, 'src', f);
const DIST = (f) => join(ROOT, 'dist', f);
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const read = (f) => readFileSync(SRC(f), 'utf8').trim();

// ---------------------------------------------------------------- tokenek beolvasása
const tokensCss = read('tokens.css');
const noComments = tokensCss.replace(/\/\*[\s\S]*?\*\//g, '');
const blocks = [...noComments.matchAll(/([^{}]+)\{([^}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
const propsOf = (body) => Object.fromEntries([...body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const lightRaw = propsOf(blocks.find((b) => b.sel === ':root').body);
const darkRaw = propsOf(blocks.find((b) => b.sel.includes('data-theme')).body);

/** var(--x) feloldása (a megadott térképben; a sötét téma a világosra rakódik). */
function resolve(map) {
  const out = {};
  const get = (name, depth = 0) => {
    if (depth > 10) throw new Error(`körkörös hivatkozás: ${name}`);
    const v = map[name];
    if (v === undefined) throw new Error(`ismeretlen token: --${name}`);
    return v.replace(/var\(--([\w-]+)\)/g, (_, n) => get(n, depth + 1));
  };
  for (const k of Object.keys(map)) out[k] = get(k);
  return out;
}
const light = resolve(lightRaw);
const dark = resolve({ ...lightRaw, ...darkRaw });

const scale = (prefix, src = light) =>
  Object.fromEntries(Object.entries(src).filter(([k]) => new RegExp(`^${prefix}-\\d+$`).test(k)).map(([k, v]) => [String(+k.slice(prefix.length + 1)), v]));
const pick = (prefix, src = light) =>
  Object.fromEntries(Object.entries(src).filter(([k]) => k.startsWith(prefix + '-')).map(([k, v]) => [k.slice(prefix.length + 1), v]));

// ---------------------------------------------------------------- dist/tokens.json
const tokens = {
  name: 'ARworks',
  version: pkg.version,
  description: 'ARworks design tokens. Forrás: src/tokens.css — ne szerkeszd kézzel (node scripts/build.mjs).',
  color: {
    brand: light['orange-500'],
    orange: scale('orange'),
    gray: scale('gray'),
    black: light.black,
    white: light.white,
    green: { 50: light['green-050'], 600: light['green-600'] },
    amber: { 50: light['amber-050'], 600: light['amber-600'] },
    red: { 50: light['red-050'], 600: light['red-600'] },
  },
  semantic: { light: Object.fromEntries(Object.entries(light).filter(([k]) => /^(text|surface|border|action|status|focus)-/.test(k))), dark: Object.fromEntries(Object.entries(dark).filter(([k]) => /^(text|surface|border|action|status|focus)-/.test(k))) },
  font: { display: light['font-display'], body: light['font-body'], mono: light['font-mono'] },
  typography: {
    display: { xl: light['display-xl-size'], lg: light['display-lg-size'], md: light['display-md-size'], weight: light['display-weight'], lineHeight: light['display-line'], tracking: light['display-tracking'], case: 'uppercase' },
    text: { lg: light['text-lg-size'], md: light['text-md-size'], sm: light['text-sm-size'], xs: light['text-xs-size'], lineHeight: light['body-line'] },
    label: { size: light['label-size'], tracking: light['label-tracking'], case: 'uppercase', font: 'mono' },
    weight: pick('weight'),
  },
  spacing: scale('space'),
  radius: pick('radius'),
  border: { width: light['border-w'], widthStrong: light['border-w-strong'] },
  shadow: { card: light['shadow-card'], raised: light['shadow-raised'], overlay: light['shadow-overlay'] },
  motion: { easeOut: light['ease-out'], fast: light['duration-fast'], base: light['duration-base'], slow: light['duration-slow'] },
  layout: { wrap: light['wrap-max'], wrapWide: light['wrap-wide'] },
  assets: {
    logos: {
      landscapeOnLight: 'logos/arworks_logo_landscape_onlight.png',
      landscapeOnDark: 'logos/arworks_logo_landscape_ondark.png',
      portraitOnDark: 'logos/arworks_logo_portrait_ondark.png',
      portraitMonoWhite: 'logos/arworks_logo_portrait_white.png',
    },
  },
};

// ---------------------------------------------------------------- Tailwind v3 preset
const twColors = {
  brand: light['orange-500'],
  orange: scale('orange'),
  gray: scale('gray'),
  black: light.black,
  white: light.white,
  // Szemantikus színek — CSS-változókra mutatnak, ezért a sötét téma automatikusan átfordítja őket
  // (a dist/arworks-tokens.css-t be kell tölteni). Megjegyzés: a /50-es átlátszósági módosító ezeknél nem működik.
  ink: { DEFAULT: 'var(--text-primary)', secondary: 'var(--text-secondary)', muted: 'var(--text-muted)', accent: 'var(--text-accent)', inverse: 'var(--text-inverse)' },
  surface: { DEFAULT: 'var(--surface-page)', subtle: 'var(--surface-subtle)', card: 'var(--surface-card)', inverse: 'var(--surface-inverse)', accent: 'var(--surface-accent)', 'accent-subtle': 'var(--surface-accent-subtle)' },
  line: { DEFAULT: 'var(--border-default)', strong: 'var(--border-strong)', accent: 'var(--border-accent)', inverse: 'var(--border-inverse)' },
  action: { DEFAULT: 'var(--action-primary)', hover: 'var(--action-primary-hover)', active: 'var(--action-primary-active)' },
  success: { DEFAULT: 'var(--status-success)', bg: 'var(--status-success-bg)' },
  warning: { DEFAULT: 'var(--status-warning)', bg: 'var(--status-warning-bg)' },
  danger: { DEFAULT: 'var(--status-danger)', bg: 'var(--status-danger-bg)' },
};
const twExtend = {
  colors: twColors,
  fontFamily: { display: [light['font-display']], body: [light['font-body']], mono: [light['font-mono']] },
  letterSpacing: { display: light['display-tracking'], label: light['label-tracking'] },
  borderRadius: { sm: light['radius-sm'], md: light['radius-md'], pill: light['radius-pill'] },
  boxShadow: { card: light['shadow-card'], raised: light['shadow-raised'], overlay: light['shadow-overlay'] },
  transitionTimingFunction: { out: light['ease-out'] },
  transitionDuration: { fast: light['duration-fast'], base: light['duration-base'], slow: light['duration-slow'] },
  maxWidth: { wrap: light['wrap-max'], 'wrap-wide': light['wrap-wide'] },
};
const tailwindPreset = `/* ARworks — Tailwind v3 preset. GENERÁLT FÁJL (node scripts/build.mjs) — ne szerkeszd kézzel.
 *
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('./arworks-brand/dist/tailwind.preset.cjs')],
 *     content: ['./src/**\\/*.{html,js,ts,jsx,tsx}'],
 *   };
 *
 * A szemantikus osztályok (text-ink, bg-surface, border-line …) CSS-változókat használnak:
 * töltsd be a dist/arworks-tokens.css-t (vagy a dist/arworks.css-t), különben nincs értékük.
 * Használat: font-display uppercase tracking-display font-light, bg-brand, text-ink-secondary, rounded-sm …
 */
module.exports = {
  theme: {
    extend: ${JSON.stringify(twExtend, null, 6).replace(/\n/g, '\n    ')},
  },
};
`;

// ---------------------------------------------------------------- Tailwind v4 @theme
const v4Lines = [];
for (const [k, v] of Object.entries(scale('orange'))) v4Lines.push(`--color-orange-${k}: ${v};`);
for (const [k, v] of Object.entries(scale('gray'))) v4Lines.push(`--color-gray-${k}: ${v};`);
v4Lines.push(`--color-brand: ${light['orange-500']};`, `--color-black: ${light.black};`, `--color-white: ${light.white};`);
const v4Semantic = {
  ink: 'text-primary', 'ink-secondary': 'text-secondary', 'ink-muted': 'text-muted', 'ink-accent': 'text-accent', 'ink-inverse': 'text-inverse',
  surface: 'surface-page', 'surface-subtle': 'surface-subtle', 'surface-card': 'surface-card', 'surface-inverse': 'surface-inverse', 'surface-accent': 'surface-accent',
  line: 'border-default', 'line-strong': 'border-strong', 'line-accent': 'border-accent', 'line-inverse': 'border-inverse',
  action: 'action-primary', 'action-hover': 'action-primary-hover', 'action-active': 'action-primary-active',
  success: 'status-success', warning: 'status-warning', danger: 'status-danger',
};
for (const [k, v] of Object.entries(v4Semantic)) v4Lines.push(`--color-${k}: var(--${v});`);
v4Lines.push(
  `--font-display: ${light['font-display']};`,
  `--font-body: ${light['font-body']};`,
  `--font-mono: ${light['font-mono']};`,
  `--tracking-display: ${light['display-tracking']};`,
  `--tracking-label: ${light['label-tracking']};`,
  `--radius-sm: ${light['radius-sm']};`,
  `--radius-md: ${light['radius-md']};`,
  `--radius-pill: ${light['radius-pill']};`,
  `--shadow-card: ${light['shadow-card']};`,
  `--shadow-raised: ${light['shadow-raised']};`,
  `--shadow-overlay: ${light['shadow-overlay']};`,
  `--ease-out: ${light['ease-out']};`,
);
const tailwindV4 = `/* ARworks — Tailwind v4 téma. GENERÁLT FÁJL (node scripts/build.mjs) — ne szerkeszd kézzel.
 *
 *   @import 'tailwindcss';
 *   @import './arworks-brand/dist/arworks-tokens.css';   (a szemantikus változók és a sötét téma)
 *   @import './arworks-brand/dist/tailwind-v4.css';
 *
 * Utána: bg-brand, text-ink, bg-surface, border-line, font-display, tracking-display, rounded-sm …
 */
@theme {
${v4Lines.map((l) => '  ' + l).join('\n')}
}
`;

// ---------------------------------------------------------------- CSS-ek
const banner = (title) => `/*! ARworks brand v${pkg.version} — ${title}
 *  GENERÁLT FÁJL (node scripts/build.mjs) — a forrás a src/ mappában van. Licenc: lásd LICENSE.
 *  https://github.com/Sabolo100/arworks-brand */\n`;
const fullCss = banner('teljes csomag (betűk + tokenek + alap + komponensek + elrendezés)') + [read('fonts.css'), read('tokens.css'), read('base.css'), read('components.css'), read('layout.css')].join('\n\n') + '\n';
const noFontsCss = banner('teljes csomag, Google Fonts @import nélkül (a betűket te töltöd be)') + [read('tokens.css'), read('base.css'), read('components.css'), read('layout.css')].join('\n\n') + '\n';
const tokensOnlyCss = banner('csak a tokenek (CSS-változók, világos + sötét téma)') + read('tokens.css') + '\n';

const outputs = {
  'arworks.css': fullCss,
  'arworks-nofonts.css': noFontsCss,
  'arworks-tokens.css': tokensOnlyCss,
  'tokens.json': JSON.stringify(tokens, null, 2) + '\n',
  'tailwind.preset.cjs': tailwindPreset,
  'tailwind-v4.css': tailwindV4,
};

const check = process.argv.includes('--check');
if (!existsSync(join(ROOT, 'dist'))) mkdirSync(join(ROOT, 'dist'));
let stale = 0;
for (const [name, content] of Object.entries(outputs)) {
  const p = DIST(name);
  if (check) {
    if (!existsSync(p) || readFileSync(p, 'utf8') !== content) { console.error(`elavult: dist/${name}`); stale++; }
  } else {
    writeFileSync(p, content);
    console.log(`dist/${name}  (${(content.length / 1024).toFixed(1)} kB)`);
  }
}
if (check) {
  if (stale) { console.error('Futtasd: node scripts/build.mjs'); process.exit(1); }
  console.log('dist/ naprakész.');
}
