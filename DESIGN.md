---
name: Asaph Felix — Cobalt on Paper
description: Warm paper, blue-black ink, soft greys; deep cobalt for actions and accent words, sage for data & AI, muted teal for graphics. No decorative gradients or glows.
colors:
  ground: "oklch(0.985 0.006 265)"
  surface: "oklch(1 0 0)"
  muted: "oklch(0.955 0.012 268)"
  ink: "oklch(0.22 0.06 268)"
  ink-muted: "oklch(0.48 0.035 268)"
  hairline: "oklch(0.91 0.012 268)"
  field-stroke: "oklch(0.64 0.03 268)"
  blue: "oklch(0.53 0.21 264)"
  sage: "oklch(0.62 0.055 155)"
  sage-ink: "oklch(0.46 0.06 155)"
  cyan: "oklch(0.74 0.13 210)"
  cyan-ink: "oklch(0.5 0.1 220)"
  error: "oklch(0.55 0.2 25)"
  navy-panel: "oklch(0.21 0.06 268)"
typography:
  display: { fontFamily: "Jost", fontSize: "clamp(3.1rem, 10.4vw, 7rem)", fontWeight: 500, lineHeight: 0.92, letterSpacing: "0.015em" }
  headline: { fontFamily: "Jost", fontSize: "clamp(2.1rem, 4.6vw, 3.6rem)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.028em" }
  body: { fontFamily: "Jost", fontSize: "1rem", fontWeight: 400, lineHeight: 1.7 }
  label: { fontFamily: "Jost", fontSize: "0.8125rem", fontWeight: 500, lineHeight: 1.4 }
  action: { fontFamily: "Jost", fontSize: "0.9375rem", fontWeight: 500, lineHeight: 1.2 }
rounded:
  card: "1.75rem"
  image: "1.25rem"
  pill: "9999px"
---

# Design System: Asaph Felix — Cobalt on Paper

October 2026, third pass: the violet and the glows read as generated, so they are gone. The site reads as print: warm off-white paper, blue-black ink, soft greys, colour spent rarely.

## Colour
- Paper `oklch(0.982 0.004 85)`, white cards, ink `oklch(0.23 0.025 255)` (16:1), muted text 6.9:1.
- **Cobalt** `oklch(0.46 0.15 262)` (7.3:1): primary button (solid, deepens on hover), links, the serif accent word of each title, focus ring, progress thread.
- **Sage** `oklch(0.62 0.055 155)` / sage-ink for text: the data & AI family. **Muted teal**: graphics, web & mobile family.
- Families: security cobalt, data & AI sage, web & mobile teal.
- `--grad-brand` is now a cobalt shift of a few points — no rainbow anywhere. No glows, no frosted glass; shadows are neutral ink.
- `.theme-ink` blue-black panels: contact, footer, UEMOA workbook/gauges, Matronassist roles.

## Type
Jost only. Name in uppercase 500; section titles sentence case 500, tight tracking; body 400 at 1.7 line-height.

## Shape & depth
Rounded: cards 1.75rem, images 1.25rem, buttons and tags pills. Soft two-layer shadows (`--shadow-soft`, `--shadow-lift` tinted violet) — cards lift on hover.

## Motion
- Hero (CSS, first frame, no JS wait): kicker pops, name lines rise from masks then a light band sweeps them, domain line and lead rise, buttons pop in sequence, portrait opens like an iris, three fact badges pop, colour fields drift, orbit ring turns slowly, network draws then pulses in blue/violet/cyan every 2–4 s. Mouse parallax on the portrait cluster; the hero copy lifts and fades on scroll.
- Scroll (framer-motion, `components/ui/reveal.tsx`): titles word by word from masks (`RevealTitle`); project cards scale up, their pictures uncovered by a clip mask; skill domains alternate left/right with rows staggering in; certificates stagger from the right; the contact panel scales up; the band seam draws a gradient line.
- Micro: buttons lift 2px, primary shows a light sweep and gradient shift; card hover lifts 6px with a family-colour edge; filter pill slides between filters (`layoutId`); nav underline slides.
- Pages fade in on every navigation (`app/template.tsx`, opacity only — a transform there would capture the fixed header).
- Reduced motion: everything appears at once, nothing travels.

## Rules
- Nothing in the first screen may depend on a JS reveal (LCP).
- Every figure has a source on its project page; a missing fact is left out.
- Lists stay lists: use `RevealGroup as="ul"` / `RevealItem as="li"`.
