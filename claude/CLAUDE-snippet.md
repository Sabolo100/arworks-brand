# Beillesztendő a projekted `CLAUDE.md` fájljába

Ha nem telepíted a skillt (lásd a README-t), ez a pár sor is elég, hogy a Claude minden munkamenetben az ARworks arculatot használja.
A `<ELÉRÉSI ÚT>` helyére az `arworks-brand` mappa helye kerül (pl. `./vendor/arworks-brand` vagy `~/ClaudeAll/ARworksBrand`).

```markdown
## Arculat: ARworks

Ebben a projektben minden felület (weboldal, alkalmazás, prezentáció, dokumentum, megosztási kép) az ARworks arculatát követi.

- Szabályok: `<ELÉRÉSI ÚT>/BRAND.md` — olvasd el, mielőtt felületet tervezel vagy átstílusozol.
- Kész CSS: `<ELÉRÉSI ÚT>/dist/arworks.css` (komponensek: `arw-btn`, `arw-card`, `arw-tag`, `arw-header`, `arw-footer` …); sötét téma: `<html data-theme="dark">`.
- Értékek gépi formában: `<ELÉRÉSI ÚT>/dist/tokens.json`; Tailwind: `dist/tailwind.preset.cjs` (v3) vagy `dist/tailwind-v4.css` (v4).
- Logók és ikonok: `<ELÉRÉSI ÚT>/logos/`, `<ELÉRÉSI ÚT>/icons/` — a logót sosem rajzoljuk újra, nem színezzük át, és nem generáljuk.
- Minta: `<ELÉRÉSI ÚT>/examples/landing.html` (oldalváz), `brand-sheet.html` (márkalap), `og-card.html` (megosztási kép).

Röviden: egyetlen kiemelő szín, a narancs `#EF5422`; főcím Jost 300 NAGYBETŰVEL (betűköz 0,08 em); törzs Space Grotesk; címke/kicker Space Mono NAGYBETŰVEL;
hajszálkeretek, 0/2/4 px sarok, árnyék és hover-emelkedés nélkül; világos oldal, fekete lábléc.
```
