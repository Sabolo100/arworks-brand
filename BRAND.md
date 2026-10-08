# ARworks arculat — márkaleírás

Ez a dokumentum a márka **szabályait** adja meg. A kész, másolható megvalósítás a `dist/arworks.css`; az élő minta az `examples/` mappában van. Az értékek forrása az arworks.hu weboldal design-rendszere — ami itt áll, az az éles oldalon is így van.

## 1. A márka egy mondatban

Műszaki, tiszta, vonalvezérelt: **fehér (vagy tintafekete) felület, hajszálvonalas keretek, egyetlen narancs kiemelő szín, könnyű, nagybetűs főcímek.** Nem „vidám startup”, hanem egy 2011 óta működő budapesti VR-, AR-, 3D- és AI-stúdió magabiztos, kevés szavú hangja.

| | |
|---|---|
| Név | **ARworks** (nem „AR Works”, nem „ARWORKS” futó szövegben) |
| Szlogen (HU) | VR, AR, 3D és AI megoldások üzleti célokra |
| Szlogen (EN) | VR, AR, 3D and AI solutions for business |
| Kicker-sor | `ARworks — Budapest · 2011 óta` / `ARworks · Budapest · since 2011` |
| Egymondatos leírás (HU) | Budapesti VR-, AR-, 3D- és AI-fejlesztő stúdió, hivatalos weboldala az arworks.hu. |
| Egymondatos leírás (EN) | A Budapest-based VR, AR, 3D and AI development studio; official website: arworks.hu. |
| Web | https://arworks.hu |

## 2. Logó

A logó egy **drótváz-mintás „A” betű** (narancs) és a **WORKS** vékony, geometrikus szövegjel.

| Fájl | Mikor |
|---|---|
| `logos/arworks_logo_landscape_onlight.png` (1012×164) | világos háttér — fejléc, dokumentum, e-mail |
| `logos/arworks_logo_landscape_ondark.png` (1012×164) | sötét háttér — lábléc, sötét téma, videó |
| `logos/arworks_logo_portrait_ondark.png` (922×780) | álló változat sötét háttéren: borító, hős-panel, záródia |
| `logos/arworks_logo_portrait_white.png` (922×780) | egyszínű fehér — vízjel (3–7% átlátszóság), képre, narancs alapra |

Szabályok:

- Fejlécben a fekvő logó **20 px magas** (lábléc: 20 px; megosztási képen: 30 px). Minden más méret ezekből arányosan.
- Szabad hely a logó körül: legalább az „A” betű magasságának fele.
- A világos változat sötét háttérre megy, a sötét változat világosra — a téma váltásakor a logót is cserélni kell (`.arw-logo--onlight` / `.arw-logo--ondark` osztály, JS nélkül).
- **Tilos:** nyújtani, forgatni, átszínezni, árnyékot/körvonalat adni, effektet tenni rá, a „WORKS” részt külön betűtípussal újraírni, képgenerátorral (AI) előállítani — a logó és a felirat mindig a fájlból vagy a sablonból kerül a képre.
- Kis méretű ikon (favicon, app-ikon): `icons/` — a narancs „A” sötét (#111111) négyzeten. A `icon-maskable-512.png` Androidhoz való (biztonságos zónával).

## 3. Szín

**A narancs az egyetlen márkaszín.** Minden más fehér, fekete és tiszta (hidegmentes) szürke.

| Token | Érték | Használat |
|---|---|---|
| `--orange-500` | **#EF5422** | márkanarancs — elsődleges gomb, aláhúzás, kicker sötét alapon, kiemelt keret, jelölt négyzet |
| `--orange-600` | #D3431A | narancs **szöveg világos alapon** (kontraszt), gomb-hover, link-hover |
| `--orange-700` | #AC3512 | gomb „lenyomva” |
| `--orange-050` / `-100` | #FEF1EC / #FCDFD3 | halvány narancs háttér, kijelölés |
| `--black` / `--gray-950` | #000000 / #111111 | lábléc, sötét sáv / fő szöveg |
| `--gray-600` | #5C5C5C | másodlagos szöveg |
| `--gray-400` | #9E9E9E | halvány szöveg, helyőrző |
| `--gray-200` | #E0E0E0 | hajszálkeret |
| `--gray-050` | #F7F7F7 | halvány felület, hover-háttér |
| `--white` | #FFFFFF | oldal háttere |

Teljes skála és a szemantikus nevek (`--text-primary`, `--surface-card`, `--border-default`, `--action-primary` …): `src/tokens.css`, vagy gépi formában `dist/tokens.json`.

**Sötét téma** (`<html data-theme="dark">`): oldal `#0A0B0C`, kártya/halvány felület `#101214`, emelt `#171A1D`, vonal `rgba(255,255,255,.14)`, szöveg fehér / 66% fehér. A narancs változatlan (#EF5422 sötét alapon is jól olvasható). A lábléc mindkét témában fekete.

Arányok: oldalanként a felület 90%+ fehér/fekete/szürke; a narancs néhány pont (gomb, kicker, vonal). Ne fess narancsra nagy felületet, ne készíts narancs–szürke átmenetet, és ne vezess be másik kiemelő színt (a kék/türkiz csak adatvizualizációban, szűken, és sosem a márka színeként).

Kontraszt: világos alapon a narancs *szöveg* mindig `--orange-600`; a `--orange-500` szöveghez csak sötét alapon, vagy nagy (≥24 px) méretben.

## 4. Betű

| Szerep | Család | Beállítás |
|---|---|---|
| **Display** (főcím, kártyacím) | **Jost** 300 | NAGYBETŰS, betűköz **0,08 em**, sormagasság 1,1; skála: 64 / 44 / 30 px (telefonon 32 / 28 / 22) |
| **Törzs, UI** | **Space Grotesk** 400/500/600 | 16 px / 1,55; lede 19 px; kicsi 14 és 12 px |
| **Címke** (kicker, jelvény, technikai felirat) | **Space Mono** | 12 px (kártyán 11 px), NAGYBETŰS, betűköz **0,14 em**; a kicker színe narancs |

Mind a három a Google Fonts-ból ingyenes (OFL), és tartalmazza a magyar ékezeteket (ő, ű is). A Jost a WORKS szövegjel legközelebbi elérhető rokona — licencelt márkabetű híján ez a hivatalos pótlás.

Szövegírás-szabályok:

- A főcím rövid, **állító vagy felszólító mondat**, üzleti haszonnal: „Mutassa meg az autót, mielőtt megérkezik.” „Gyakoroljon kockázat nélkül.” Nem szlogenhalmozás.
- Egy képernyőn egy főcím, egy lede (legfeljebb ~25 szó), legfeljebb két gomb.
- Gomb: igével, rövid („Projektet indítok”, „Munkáink”). Egy elsődleges (narancs) + legfeljebb egy másodlagos (körvonalas).
- A részletek ne a felületen, hanem felugróban/lenyílóban legyenek; a futó szöveg sora ≤ 70 karakter.

## 5. Elrendezés és komponensek

**Vonalvezérelt, „drótváz” nyelv** — a logó mintáját követi: éles sarok, hajszálkeret, kevés árnyék.

- **Tartalomoszlop** 1160 px (fejléc sávja 1360 px). Szekció: 80 px fent/lent, 32 px oldalt (telefonon 56 / 24). Szekciókat 1 px-es `--border-default` vonal választja el.
- **Térköz:** 4 px-es alap (4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96).
- **Sarok:** 0 (alapértelmezett), **2 px** (gomb, mező), **4 px** (kártya, felugró), **pill** (csak címke és nyelvváltó).
- **Keret:** 1 px; kiemelt elem 2 px (narancs felső vonal a kártyán, vagy fekete keret).
- **Árnyék:** alig. `--shadow-card` csak finom jelzés; `--shadow-overlay` csak felugróhoz. A hover **színt vagy keretet vált, nem emelkedik, nem nagyobbodik.**
- **Fejléc:** fehér, 1 px alsó vonal, balra a 20 px-es logó, jobbra menü (13 px, 500), nyelvváltó (HU | EN, mono), egy narancs CTA-gomb. Az aktív menüpont alatt 2 px narancs vonal.
- **Lábléc:** fekete, 4 oszlop (leírás + 3 lista), alul hajszálvonal és mono, nagybetűs jogi sor.
- **Hős-rész:** mono kicker → nagy display főcím → lede → két gomb; jobbra kép/videó vagy sötét „panel” a logóval és halvány rácsmintával.
- **Kártya:** kicker (mono, narancs) → display cím (22 px) → rövid leírás; a kiemeltnek narancs felső vonala.
- **Sötét sáv** világos oldalon is használható (kontraszt-szünet, CTA-sáv); mindig `--surface-inverse` (fekete).

A komponensek osztályai (mind `arw-` előtagú): `arw-btn` (+ `--primary|secondary|outline|ghost|inverse`, `--sm|md|lg`), `arw-card`, `arw-tag`, `arw-field` / `arw-input`, `arw-check`, `arw-status`, `arw-kicker`, `arw-display`, `arw-lede`, `arw-sec`, `arw-grid`, `arw-header`, `arw-footer`. Használatuk: `examples/landing.html`, `examples/brand-sheet.html`.

## 6. Képek és mozgás

- **Valódi képek:** projektfelvételek, képernyőfelvételek, 3D-renderek. A kép a hős; a szöveg segíti. Sötét felületen a kép ne legyen keretezve díszítéssel.
- Megosztási kép (OG): 1200×630, fekete alap, narancs 64×3 px vonal, mono kicker, display főcím (62 px), lede, alul a fekvő logó és az `arworks.hu`; jobb oldalt a fehér álló logó 7%-os vízjelként. Sablon: `examples/og-card.html`; mintaképek: `social/`.
- **Mozgás:** csendes és gyors — 120 ms (hover), 200 ms, 350 ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Az animáció jelentést közvetít (folyamat, működés), nem dísz. `prefers-reduced-motion` mellett semmi sem mozog.
- **Ne:** színátmenetes gombok, lebegő/emelkedő kártyák, lekerekített („buborék”) kártyák, ikon-konfetti, stock-fotós hangulatkép, generált logó vagy felirat.

## 7. Hozzáférhetőség

- Szöveg–háttér kontraszt legalább 4,5:1 — világos alapon a narancs *szöveg* ezért `--orange-600` (4,6:1); sötét alapon `--orange-500` (5,6:1).
- **Ismert gyenge pontok** (az éles oldal is így használja; tudatos kompromisszum, új munkában jobb elkerülni): a fehér felirat a `#EF5422` gombon ≈3,5:1 — ez nagy (≥ 18,7 px félkövér vagy ≥ 24 px) feliratnál megfelel, kisebbnél AA-hoz használj `--orange-600` gombhátteret; a `--text-muted` (`#9E9E9E`) világos alapon ≈2,7:1 — csak helyőrzőhöz és másodlagos feliratokhoz, lényeges információhoz soha.
- Minden interaktív elemnek látható fókuszgyűrűje van (`--focus-ring`: 2 px alap + 2 px narancs).
- A logó `alt` szövege: „ARworks”; dekoratív másolaté (vízjel): üres `alt=""`.

## 8. Meta, ikon, PWA

```html
<link rel="icon" href="/icons/icon-48.png" sizes="48x48">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<meta name="theme-color" content="#ffffff">   <!-- sötét téma: #0A0B0C -->
```

Manifest-ikonok: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (`purpose: "maskable"`); `background_color` / `theme_color`: `#ffffff`.
