# ARworks brand kit — az ARworks arculata másik projektbe

> **English, in short:** logos, icons, design tokens (CSS variables, JSON, Tailwind v3/v4), ready-made CSS components with a dark theme, example pages and a Claude skill for the ARworks identity — orange `#EF5422`, Jost / Space Grotesk / Space Mono, flat hairline UI. Install the skill with
> `git clone https://github.com/Sabolo100/arworks-brand.git ~/.claude/skills/arworks-brand`, or drop `dist/arworks.css` into any project. Rules: [BRAND.md](BRAND.md). Terms: [LICENSE](LICENSE) — for ARworks and ARworks-authorized work.

Az arworks.hu weboldal arculatából kiemelt, **bárhová átvehető csomag**: logók, színek, betűk, elrendezés, komponensek. Minden érték ugyanaz, mint az éles oldalon.

**Nézd meg:** [`examples/landing.html`](examples/landing.html) (teljes oldalváz, világos + sötét téma), [`examples/brand-sheet.html`](examples/brand-sheet.html) (márkalap: paletta, betűk, komponensek), [`examples/og-card.html`](examples/og-card.html) (megosztási kép sablon). Nyisd meg őket böngészőben — nincs mit telepíteni.

## Mi van benne

| Mappa / fájl | Mire való |
|---|---|
| [`BRAND.md`](BRAND.md) | a márka szabályai: logó, szín, betű, elrendezés, hang, mozgás, hozzáférhetőség |
| [`SKILL.md`](SKILL.md) | Claude-skill: a Claude ebből tudja, hogyan kell az ARworks arculatot alkalmazni |
| [`dist/arworks.css`](dist/arworks.css) | **minden egyben** — betűk + tokenek + alap + komponensek + elrendezés (22 kB). Ezt kell beilleszteni |
| `dist/arworks-nofonts.css` | ugyanez a Google Fonts nélkül (ha saját szerverről kiszolgált betűket használsz) |
| `dist/arworks-tokens.css` | csak a tokenek (CSS-változók, világos + sötét téma) — saját komponensekhez |
| `dist/tokens.json` | minden érték JSON-ban — Figma, Style Dictionary, Android/iOS, prezentáció, bármi |
| `dist/tailwind.preset.cjs`, `dist/tailwind-v4.css` | Tailwind v3 preset és v4 téma |
| [`logos/`](logos) | 4 logó-változat (fekvő világos/sötét, álló sötét, álló egyszínű fehér) |
| [`icons/`](icons) | favicon, 48/192/512 px, Apple touch, maskable |
| [`social/`](social) | a két éles megosztási kép (HU/EN) |
| [`examples/`](examples) | működő minták |
| `src/` | **a forrás** (tokenek, alap, komponensek, elrendezés); a `dist/` ebből generált |
| [`claude/CLAUDE-snippet.md`](claude/CLAUDE-snippet.md) | beilleszthető rész a projekt `CLAUDE.md` fájljába |

## Használat

### 1) Claude-skill (a legegyszerűbb, ha Claude-dal dolgozol)

Egyszeri telepítés egy gépre (macOS / Linux, kell hozzá a `git`):

```bash
git clone https://github.com/Sabolo100/arworks-brand.git ~/.claude/skills/arworks-brand
```

Indítsd újra a Claude appot / a Claude Code-ot (új munkamenet). Ezután bármelyik projektben kérheted természetesen, pl.:

- „Csinálj az ARworks arculatával egy nyitóoldalt a … projekthez.”
- „Ezt az oldalt stílusozd át az ARworks arculatára, sötét témával is.”
- „Készíts megosztási képet (OG) az ARworks stílusában ehhez a szöveghez: …”

A Claude betölti a `SKILL.md`-t, és a `BRAND.md` / `dist/` / `logos/` alapján dolgozik. **Frissítés:** `git -C ~/.claude/skills/arworks-brand pull`.

Csak egy projektben szeretnéd? Klónozd a projekt `.claude/skills/arworks-brand` mappájába. Skill nélkül is működik: másold be a [`claude/CLAUDE-snippet.md`](claude/CLAUDE-snippet.md) tartalmát a projekt `CLAUDE.md`-jébe.

### 2) Sima HTML / bármilyen keretrendszer

Másold a `dist/arworks.css`-t és a szükséges `logos/`, `icons/` fájlokat a projektbe:

```html
<link rel="stylesheet" href="/css/arworks.css">
<button class="arw-btn arw-btn--primary arw-btn--md">Projektet indítok</button>
```

Másolás nélkül is kipróbálható egy rögzített kiadásra mutató linkkel (élesben inkább másold a fájlt, hogy ne függj külső szolgáltatástól):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Sabolo100/arworks-brand@v1.0.0/dist/arworks.css">
```

Sötét téma: `<html data-theme="dark">` (vagy `class="arw-dark"` egy tárolón). A logó a fejlécben két `<img>`-gel (`.arw-logo--onlight` / `.arw-logo--ondark`) magától vált — lásd [`examples/landing.html`](examples/landing.html).

A komponens-osztályok mind `arw-` előtagúak, nem ütköznek a projekt saját CSS-ével. Ha csak egy részre kell az arculat, használd a `dist/arworks-tokens.css`-t, és építs rá saját komponenseket a `var(--orange-500)`, `var(--border-default)`, `var(--space-5)` … változókkal.

### 3) Tailwind

**v3** — `tailwind.config.js`:

```js
module.exports = {
  presets: [require('./arworks-brand/dist/tailwind.preset.cjs')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
};
```

**v4** — a CSS-ben:

```css
@import 'tailwindcss';
@import './arworks-brand/dist/arworks-tokens.css';
@import './arworks-brand/dist/tailwind-v4.css';
```

Mindkettőhöz töltsd be a `dist/arworks-tokens.css`-t is (a szemantikus színek — `text-ink`, `bg-surface`, `border-line` — CSS-változókra mutatnak, így a sötét téma automatikusan átfordítja őket). Utána pl.: `bg-brand font-display uppercase tracking-display font-light rounded-sm`.

### 4) Nem webes felület

`dist/tokens.json` tartalmaz minden értéket (színek, betűméretek, térköz, sarok, árnyék, mozgás, logók elérési útja). Betűk: Jost, Space Grotesk, Space Mono (Google Fonts).

## Betűk — saját szerverről (éles, EU-s oldalhoz ajánlott)

A `dist/arworks.css` a Google Fontsból tölt. Ha ezt nem szeretnéd (adatvédelem, offline), használd a `dist/arworks-nofonts.css`-t, és töltsd be a betűket az npm-ből:

```bash
npm i @fontsource/jost @fontsource/space-grotesk @fontsource/space-mono
```

```js
import '@fontsource/jost/300.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-mono/400.css';
```

## A csomag módosítása

A tokenek egyetlen forrása a [`src/tokens.css`](src/tokens.css). Módosítás után (Node 18+, külső függőség nincs):

```bash
node scripts/build.mjs        # dist/ újraírása (CSS, JSON, Tailwind)
node scripts/build.mjs --check  # ellenőrzés: a dist/ naprakész-e
```

A `dist/`-et ne szerkeszd kézzel. Új kiadásnál emeld a `package.json` verzióját, és címkézd (`git tag v1.1.0`) — a CDN-linkek és a más projektekben rögzített változatok a címkére hivatkoznak.

## Átadás másnak

Elég a link: **https://github.com/Sabolo100/arworks-brand** — a README első sora és a `BRAND.md` mindent elmond. Aki Claude-dal dolgozik, az 1) pont parancsával telepíti a skillt.

## Licenc

Az ARworks saját és az ARworks által megbízott partnerek munkájához szabadon használható; a logók és a márkajelek nem módosíthatók. Részletek: [LICENSE](LICENSE).
