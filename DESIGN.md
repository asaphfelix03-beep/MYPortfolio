---
name: Asaph Felix — The Woven Night
description: A night field woven like a pagne, where the points of light are the data themselves.
colors:
  night-ground: "oklch(0.17 0.03 258)"
  night-plate-fill: "oklch(0.22 0.045 255)"
  night-raised: "oklch(0.26 0.05 255)"
  night-hairline: "oklch(0.33 0.055 255)"
  night-input: "oklch(0.31 0.05 255)"
  amber-weft: "oklch(0.72 0.17 45)"
  anomaly-red: "oklch(0.62 0.2 25)"
  anomaly-red-text: "oklch(0.7 0.18 25)"
  light-thread: "oklch(0.96 0.005 250)"
  half-light: "oklch(0.7 0.035 250)"
  weave-line: "oklch(0.96 0.005 250 / 0.045)"
  weave-dot: "oklch(0.96 0.005 250 / 0.16)"
  plate-wash: "oklch(0.34 0.07 258)"
typography:
  display:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 12vw, 9rem)"
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: "0.08em"
  headline:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.6vw, 2.7rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "0.045em"
  title:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: "0.08em"
  body:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "0.22em"
  action:
    fontFamily: "Jost, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.18em"
rounded:
  none: "0"
  pill: "9999px"
spacing:
  hairline: "1px"
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  selvedge: "56px"
  band-y: "80px"
  band-y-sm: "112px"
  band-y-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.amber-weft}"
    textColor: "{colors.night-ground}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.amber-weft}"
    textColor: "{colors.night-ground}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.light-thread}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-outline-hover:
    textColor: "{colors.amber-weft}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.half-light}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "16px 16px"
  input-field:
    backgroundColor: "{colors.night-plate-fill}"
    textColor: "{colors.light-thread}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  input-field-focus:
    backgroundColor: "{colors.night-plate-fill}"
    textColor: "{colors.light-thread}"
  tag-accent:
    backgroundColor: "oklch(0.72 0.17 45 / 0.1)"
    textColor: "{colors.amber-weft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.half-light}"
    rounded: "{rounded.none}"
    padding: "0"
  nav-link-active:
    textColor: "{colors.light-thread}"
  band:
    backgroundColor: "transparent"
    textColor: "{colors.light-thread}"
    rounded: "{rounded.none}"
    padding: "80px 20px"
---

# Design System: Asaph Felix — The Woven Night

## Overview

**Creative North Star: "The Woven Night"**

The home page is a single piece of cloth seen at night. A deep indigo ground carries a regular matrix of small light points held between warp and weft hairlines, and the page's content is laid into that cloth as registers — full-bleed horizontal bands stacked and separated by a hairline — rather than dropped onto it as cards. One saturated colour crosses the whole page: an amber-coral weft that marks the primary action and the one subject of the data. Everything else is the cloth and its own light.

The system is quiet and orthogonal. Corners are square because a cloth's geometry is orthogonal; grouping comes from space and a hairline, not from a bordered box; one geometric face carries both the giant tracked display and the running text, so the night reads as its own world rather than as the light site repainted. Imagery is not exempt: photographs and embedded dashboards are cooled and dimmed into the ground so nothing punches a lit hole through the weave.

The page deliberately refuses the category default it would otherwise land on — a dark hero with one neon accent followed by a grid of equal cards. It also refuses a second type family, a second saturated colour, and added chrome for state: state is signalled by the cloth itself changing.

**Key Characteristics:**
- Indigo night ground (#07101C) with hairline structure, no filled surfaces
- One accent, amber-coral, on the primary action only; red reserved for one anomalous datum
- Square corners throughout (`--radius: 0`); `rounded-full` survives only for genuine pills
- One family, Jost, for display and body alike; display is tracked uppercase
- Bands, not cards: a band opens with a 1px top hairline and nothing else
- One texture primitive, the weave field, at a single 22px pitch everywhere

**Scope.** This world is scoped to the `.world-night` wrapper and serves the home page. The warm editorial light world on `:root` / `.section-dark` is the incumbent still in service on the case study route (`app/projets/[slug]`). Both ship on purpose; neither is to be merged or removed here.

## Colors

A single indigo family stepped by lightness, one amber weft, and one reserved red — the palette is authored in OKLCH and the frontmatter is its normative source.

### Primary
- **Amber Weft** — the colour of lamplight, the page's only saturated voice. It fills the primary action wherever it appears (hero CTA, header CTA, project links, the contact submit), it is the selvedge thread that measures scroll position, it is the shuttle that crosses each band, and it marks the subject country in the gauge row. Nothing decorative wears it.

### Tertiary
- **Anomaly Red** — reserved, not a palette member. It marks exactly one value: the single figure the source workbook itself flags as anomalous. A lighter red is used for that figure's numeral so it stays legible on the ground.

### Neutral
- **Night Ground** (#07101C measured on the shipped page) — the page background, unbroken under every band.
- **Plate Fill** — the fill behind a photograph, an embedded dashboard, or an input; the only step above ground that is ever painted.
- **Raised Cloth** — the gauge track and quiet raised fills, used at low opacity.
- **Hairline** — every border in the night: band tops, the selvedge rule, gauge faces, outline buttons, input strokes.
- **Light Thread** — foreground text and the wordmark plate.
- **Half Light** — secondary and supporting text, labels, inactive nav, vertical rail type.
- **Weave Line / Weave Dot** — the cloth itself, only ever consumed by the weave field.
- **Plate Wash** — the indigo laid over imagery in `mix-blend-mode: color`.

### Named Rules
**The One Weft Rule.** One saturated colour on the page. Amber marks the primary action and the data's subject; anything else that wants colour gets lightness instead. Brand-coloured logos enter monochrome and recover their colour only on hover, where brand identity is the actual information.

**The Reserved Red Rule.** Red is not an accent, a state colour, or an error colour. It belongs to the one anomalous data value and is spent nowhere else. If a second red appears on a screen, one of them is wrong.

**The Joined Imagery Rule.** Any light-born raster or embed on the night ground goes through the plate treatment — `brightness(0.82) contrast(1.04) saturate(0.85)` plus the plate wash at 0.55 in `mix-blend-mode: color`. Imagery joins the cloth; it is never pasted over it.

## Typography

**Display Font:** Jost (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Jost — the same family, by design
**Label Font:** Jost

**Character:** A geometric sans with real character in the caps, loaded at 300/400/500/600 through `next/font` (variable `--font-geo`). Wide tracked capitals at display scale read as woven type; the same face at 400 keeps running text calm and unfussy underneath. Two families would have made the night a repaint of the light world instead of its own world.

### Hierarchy
- **Display** (300, clamp(3.2rem, 12vw, 9rem), line-height 0.92, +0.08em, uppercase): the name in the first viewport, set as two lines of cloth. The same treatment carries the hero's registration figures at 1.875–2.25rem.
- **Headline** (300, clamp(1.6rem, 3.6vw, 2.7rem), line-height 1.02, +0.045em, uppercase): the title that opens each register.
- **Body** (400, 1rem–1.125rem, line-height ~1.625): the claim under the name and all running prose, held to roughly a 36rem measure in the hero and to a 5-of-12 column elsewhere.
- **Label** (500, 0.625rem / 0.594rem, +0.22em, uppercase): field labels, data captions, country names, the location line, the availability line. Labels name a thing; they never sit above a heading as a kicker.
- **Action** (600, 0.6875rem, +0.18em, uppercase): every button and call to action.

### Named Rules
**The One Voice Rule.** Display and running text are the same family. If a screen needs a second font to make a distinction, it needs tracking, weight or case instead.

**The Tracked Caps Rule.** Everything above body scale is uppercase and positively tracked (+0.045em at register scale, +0.08em at display). The light world's phrase-case editorial serif and its one-word italic emphasis are explicitly neutralised in the night — a tracked italic reads as a leaning duplicate, not as emphasis.

**The Legible Floor Rule.** Text on the night ground is measured, not assumed: body 7.5:1, navigation 17.7:1, the smallest tag 6.18:1, text on the amber button 7.39:1, form placeholders 6.5:1. Nothing ships below the smallest of these.

## Layout

The page is a stack of registers inside a `.world-night` wrapper. A fixed selvedge rail closes the left edge at 56px from the `md` breakpoint (a 3px thread below it), and every band is inset by that same 56px so content never runs under the rail; the hero takes a deeper 80px inset.

Content sits in a 1280px (`max-w-7xl`) centred container with 20px side padding, 32px from `sm`. Bands breathe vertically at 80px / 112px (`sm`) / 128px (`lg`). The recurring internal grid is 12 columns with a 7 / 5 split — argument left, support right — collapsing to a single column below `lg`, with 32–48px gutters. The hero is a `min-h-[100svh]` band that pins its registration row (availability chip, then the three tracked figures) to a bottom hairline. Breakpoints are Tailwind's: `sm` 640px, `md` 768px, `lg` 1024px.

**The Band Rule.** A section is a full-bleed band opened by a 1px top hairline. Bands do not nest, do not indent, and do not get their own background.

## Elevation & Depth

No shadows. Depth is tonal and textural: the ground, a single painted step above it for plates and inputs, and the weave field fading out below a band's seam to suggest the cloth continuing underneath. The selvedge and the shuttle sit above the page on the z-axis without any lift treatment — they are the cloth's own furniture, drawn in 1px. The only blur in the system is the header's `backdrop-blur-md` over an 85% ground once the page has scrolled.

**The Flat Cloth Rule.** Nothing casts. If an element needs to separate from its neighbour, it gets a hairline, space, or a lightness step — never a shadow and never a glow.

## Shapes

Square by decree: `--radius: 0` inside the night, so every derived radius step resolves to 0 and nested rounded containers inside a band are squared back by rule. `rounded-full` survives only for genuine pills — the availability dot and the technology tag. Form is drawn in 1px hairlines: band tops, the selvedge rule, gauge faces, the outline button, the input stroke. The recurring silhouettes are the rectangle (button, plate, gauge face, portrait), the hairline (band seam, shuttle, selvedge thread) and the tiled cell of the weave.

## Components

### Buttons
- **Shape:** hard rectangle (0 radius), no shadow.
- **Primary:** amber weft fill, ground-dark text, 16px/28px padding, tracked uppercase at 600. One per view: the hero CTA, the header CTA, the contact submit.
- **Hover / Focus:** opacity to 0.9 with a 150ms transition; a trailing arrow glyph slides 2px right. Primary and header CTAs sit inside a magnetic wrapper that follows the pointer slightly.
- **Outline:** transparent with a hairline border and light text; on hover the border and the label both turn amber.
- **Quiet:** no border, half-light label, going to full light on hover; used for the CV download.

### Chips
- **Style:** the one pill in the system — amber at 10% fill, amber hairline at 40%, amber label at 0.5625rem/+0.14em uppercase, fully rounded. Used for a project's headline metric only.
- **Availability chip:** label type with a 6px amber dot that pings when motion is allowed.

### Cards / Containers
There are no cards in the night. The incumbent card container is redefined: transparent background, no border except a 1px top hairline, no radius, and any nested rounded box squared. Internal padding is 24px, 32px from `sm`.

### Inputs / Fields
- **Style:** plate fill behind a hairline stroke, square, 12px/16px padding, body-scale text, half-light placeholders.
- **Focus:** the stroke turns amber and a 2px amber ring at 20% opacity appears; no glow, no lift.
- **Label:** label type above the field, 8px clear.

### Navigation
Fixed header, 64px tall (80px from `sm`), transparent over the hero and switching to an 85%-opacity ground with backdrop blur and a bottom hairline once scrolled. Links are body-scale, half-light at rest, full light when active, with a 1px underline that slides between items on a shared layout animation. The right side carries a wordmark plate, the amber CTA, and — below `lg` — a square hairline button that opens a full-screen ground panel where the links are set at display scale on hairline-separated rows.

### The Selvedge
The finished left edge of the cloth. A fixed full-height rail, 56px wide from `md`, closed by a hairline; a 1px track runs its centre and the amber thread filling it from the top is the real scroll position. Vertical tracked caps read "Défiler" at the foot. Below `md` it thins to the 3px thread alone. It replaces a top progress bar — the same quantity is never measured twice.

### The Register and its Shuttle
A band's own furniture: the 1px top hairline, a 256px weave field under the seam at 70% masked to transparent downward, and the shuttle — an amber hairline that scales from the left across the full band width on entry (1.1s, ease-out-quint, once). Entering a band is signalled by the cloth, not by added chrome.

### The Gauge Row
Eight identical instruments on one shared 0–70% scale, each a hairline-bordered face with a fill rising from the baseline, staggered 60ms apart. Country names are vertical tracked caps under each gauge. Exactly two marks break the row: amber for the subject country and reserved red for the single anomalous value; every other gauge stays in half-light at 45%.

### The Weave Field
One primitive draws the hero ground, the band seams and the texture over the portrait: a radial light point plus a vertical and a horizontal hairline gradient, tiled at a 22px pitch. It is always masked (radial in the hero, linear under a seam) and never used at full opacity over text.

### Motion
All motion gates on a reduced-motion hook and every scroll-triggered reveal shares one detection margin, `"-60px 0px"` — vertical only, since a four-sided shorthand silently broke reveals near the viewport edges on phones. The vocabulary: Reveal / RevealGroup / RevealItem for entries, WordReveal / WordRevealRich for headlines, Unveil for a curtain-and-settle on plates (it observes an unclipped wrapper, because Chrome's IntersectionObserver measures a target through its own clip-path), CountUp for figures, Magnetic for primary actions, SpotlightCard for pointer-tracked surfaces. The shared easing is `cubic-bezier(0.22, 1, 0.36, 1)`.

## Do's and Don'ts

### Do:
- **Do** open a new section as a band: 1px top hairline, transparent ground, 80/112/128px vertical rhythm, 56px left inset.
- **Do** spend amber on the primary action and on the one thing the data is about — nothing else.
- **Do** keep every corner square; reach for `rounded-full` only when the element is a genuine pill.
- **Do** set anything above body scale in tracked uppercase Jost at weight 300.
- **Do** run any photograph, screenshot or embed through the plate treatment before it touches the night ground.
- **Do** draw structure with 1px hairlines and space.
- **Do** route every scroll-triggered animation through the shared `IN_VIEW_MARGIN` and the reduced-motion hook.
- **Do** keep the weave field masked and behind the text it sits under.

### Don't:
- **Don't** introduce a second saturated colour, or spend red on anything but the single anomalous value.
- **Don't** wrap content in a filled, bordered, rounded card — the night groups by hairline and space.
- **Don't** add a second type family; distinctions come from case, tracking and weight.
- **Don't** signal state with added chrome (badges, glows, coloured outlines) when the cloth itself can carry it.
- **Don't** add shadows or lift; the system casts nothing.
- **Don't** measure the same quantity twice — the selvedge already reports reading position.
- **Don't** hard-code a radius or a colour past the tokens; the night redefines them at the wrapper and literal values escape it.
- **Don't** carry the night's tokens onto the case study route, which is still served by the light editorial world.

## Known Gaps

Recorded as unbuilt intentions, not as behaviour: the weave carries no quantity (the 22px pitch is fixed everywhere rather than varying with density), the shuttle does not light the points it crosses, and the portrait has no aperture resolving out of the field.
