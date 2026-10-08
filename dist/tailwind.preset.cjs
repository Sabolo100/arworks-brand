/* ARworks — Tailwind v3 preset. GENERÁLT FÁJL (node scripts/build.mjs) — ne szerkeszd kézzel.
 *
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('./arworks-brand/dist/tailwind.preset.cjs')],
 *     content: ['./src/**\/*.{html,js,ts,jsx,tsx}'],
 *   };
 *
 * A szemantikus osztályok (text-ink, bg-surface, border-line …) CSS-változókat használnak:
 * töltsd be a dist/arworks-tokens.css-t (vagy a dist/arworks.css-t), különben nincs értékük.
 * Használat: font-display uppercase tracking-display font-light, bg-brand, text-ink-secondary, rounded-sm …
 */
module.exports = {
  theme: {
    extend: {
          "colors": {
                "brand": "#EF5422",
                "orange": {
                      "50": "#FEF1EC",
                      "100": "#FCDFD3",
                      "200": "#F9BCA4",
                      "300": "#F5936C",
                      "400": "#F2703F",
                      "500": "#EF5422",
                      "600": "#D3431A",
                      "700": "#AC3512",
                      "800": "#7F270D"
                },
                "gray": {
                      "50": "#F7F7F7",
                      "100": "#EFEFEF",
                      "200": "#E0E0E0",
                      "300": "#C4C4C4",
                      "400": "#9E9E9E",
                      "500": "#7A7A7A",
                      "600": "#5C5C5C",
                      "700": "#404040",
                      "800": "#2B2B2B",
                      "900": "#1A1A1A",
                      "950": "#111111"
                },
                "black": "#000000",
                "white": "#FFFFFF",
                "ink": {
                      "DEFAULT": "var(--text-primary)",
                      "secondary": "var(--text-secondary)",
                      "muted": "var(--text-muted)",
                      "accent": "var(--text-accent)",
                      "inverse": "var(--text-inverse)"
                },
                "surface": {
                      "DEFAULT": "var(--surface-page)",
                      "subtle": "var(--surface-subtle)",
                      "card": "var(--surface-card)",
                      "inverse": "var(--surface-inverse)",
                      "accent": "var(--surface-accent)",
                      "accent-subtle": "var(--surface-accent-subtle)"
                },
                "line": {
                      "DEFAULT": "var(--border-default)",
                      "strong": "var(--border-strong)",
                      "accent": "var(--border-accent)",
                      "inverse": "var(--border-inverse)"
                },
                "action": {
                      "DEFAULT": "var(--action-primary)",
                      "hover": "var(--action-primary-hover)",
                      "active": "var(--action-primary-active)"
                },
                "success": {
                      "DEFAULT": "var(--status-success)",
                      "bg": "var(--status-success-bg)"
                },
                "warning": {
                      "DEFAULT": "var(--status-warning)",
                      "bg": "var(--status-warning-bg)"
                },
                "danger": {
                      "DEFAULT": "var(--status-danger)",
                      "bg": "var(--status-danger-bg)"
                }
          },
          "fontFamily": {
                "display": [
                      "'Jost', 'Century Gothic', 'Futura', sans-serif"
                ],
                "body": [
                      "'Space Grotesk', 'Helvetica Neue', sans-serif"
                ],
                "mono": [
                      "'Space Mono', 'Courier New', monospace"
                ]
          },
          "letterSpacing": {
                "display": "0.08em",
                "label": "0.14em"
          },
          "borderRadius": {
                "sm": "2px",
                "md": "4px",
                "pill": "999px"
          },
          "boxShadow": {
                "card": "0 1px 2px rgba(0, 0, 0, 0.06)",
                "raised": "0 4px 16px rgba(0, 0, 0, 0.10)",
                "overlay": "0 16px 48px rgba(0, 0, 0, 0.18)"
          },
          "transitionTimingFunction": {
                "out": "cubic-bezier(0.16, 1, 0.3, 1)"
          },
          "transitionDuration": {
                "fast": "120ms",
                "base": "200ms",
                "slow": "350ms"
          },
          "maxWidth": {
                "wrap": "1160px",
                "wrap-wide": "1360px"
          }
    },
  },
};
