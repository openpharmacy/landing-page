# Open Pharmacy — Design System

> **Source of truth:** Figma `OpenPharmacy-Website` (file `KeiIBbVWknKAcilD8Zc0wZ`).
> Every value here was **measured** from Figma `globalVars.styles` — nothing was
> invented. Where Figma is genuinely incomplete (sparse color ramps, "auto" line
> heights, no Lato 500), that is called out honestly rather than filled in.
> All tokens are implemented in [`src/app/globals.css`](../src/app/globals.css).

Frames sampled: Landing `251:2684`, Sign in `166:5798`, Sign up `42:2354`,
Header `73:4092`, Card `161:2605` (+ Home `254:2834`, Account `256:3299`,
CartDrawer `73:2467`, Mobile `319:7225` from raw dumps).

---

## 1. Color

### Named tokens (Figma `Color/*`)

| Figma name                      | Hex       | CSS var                 | Utilities                    |
| ------------------------------- | --------- | ----------------------- | ---------------------------- |
| Color/Primary/500               | `#5CB4F8` | `--color-primary-500`   | `bg/text/border-primary-500` |
| _(gradient stop, de-facto 700)_ | `#3B7BB5` | `--color-primary-700`   | `*-primary-700`              |
| Color/Secondary/300             | `#7396B2` | `--color-secondary-300` | `*-secondary-300`            |
| Color/Secondary/500             | `#2F5069` | `--color-secondary-500` | `*-secondary-500`            |
| Color/Secondary/700             | `#1F3648` | `--color-secondary-700` | `*-secondary-700`            |
| Color/Secondary/900             | `#18222B` | `--color-secondary-900` | `*-secondary-900`            |
| Color/Neutral/300               | `#D1D7DE` | `--color-neutral-300`   | `*-neutral-300`              |
| Color/Neutral/700               | `#7C8793` | `--color-neutral-700`   | `*-neutral-700`              |
| Color/Success/500               | `#2ECC71` | `--color-success-500`   | `*-success-500`              |
| Color/Error/500                 | `#E74C3C` | `--color-error-500`     | `*-error-500`                |
| Color/Shades/White              | `#FFFFFF` | _(Tailwind `white`)_    | `*-white`                    |

### Semantic / raw fills (used by name across the UI, not formally ramped)

| Role                        | Hex       | CSS var                   |
| --------------------------- | --------- | ------------------------- |
| Link / active-nav / accent  | `#269DF9` | `--color-info-500`        |
| Decorative blob accent      | `#08A9FF` | `--color-primary-bright`  |
| App background              | `#F5F7FA` | `--color-bg-app`          |
| Section background tint     | `#F8FBFD` | `--color-bg-section`      |
| Body text (dark grey)       | `#364153` | `--color-text`            |
| Muted text                  | `#4A5565` | `--color-text-muted`      |
| Icon stroke                 | `#292D32` | `--color-icon`            |
| Subtle border (chips)       | `#F3F4F6` | `--color-border-subtle`   |
| Checkbox (unchecked) border | `#B2C4DE` | `--color-checkbox-border` |
| Footer body text            | `#9EB6C9` | `--color-footer-text`     |
| Footer top border           | `#343D48` | `--color-footer-border`   |

### ⚠️ Ramp-coverage note (honest)

Figma's color ramps are **sparse** — only the steps below actually exist. No
50/100/200/400/600/800 steps are defined anywhere. **Do not assume a full
50–900 ramp.** If Tailwind ever needs an intermediate step (e.g. a button hover),
it must be **generated** and marked as such — it is not in Figma.

- **Primary:** only `500`. (`#3B7BB5` exists only as a gradient stop; `#08A9FF`
  only as a decorative blob.)
- **Secondary:** `300, 500, 700, 900`.
- **Neutral:** `300, 700`.
- **Success / Error:** `500` only. **No Warning token, no named Info token, no
  Black token** exist (info = the raw `#269DF9`; blacks appear only inside shadow rgba).

### Semantic roles (shadcn/ui) — light theme

Bound to the palette in `:root`; dark theme is a placeholder (`.dark`) for a
future Figma dark variant. `--background` = `#F5F7FA`, `--foreground` =
`#18222B`, `--card` = `#FFFFFF`, `--primary` = `#5CB4F8`, `--secondary` =
`#2F5069`, `--border`/`--input` = `#D1D7DE`, `--ring` = `#269DF9`,
`--destructive` = `#E74C3C`, `--success` = `#2ECC71`.

---

## 2. Typography

Families: **Lato** (all UI/marketing), **Inter** (logo wordmark + legal text).
Icons in Figma use _Font Awesome 6 Pro_ — we substitute `lucide-react` / exported SVGs.
No letter-spacing is set on any style.

> ⚠️ **Lato has no 500 (Medium) on Google Fonts** (ships 100/300/400/700/900).
> The Figma form labels use "Medium 500"; in-app they render at **400** (the
> browser's nearest available weight). `text-label-14` keeps `font-weight: 500`
> for intent, but the rendered face is Regular.

### Named text styles → utility

| Figma name               | Font  | Weight | Size / LH | Utility                 |
| ------------------------ | ----- | ------ | --------- | ----------------------- |
| Text/Display/32/Bold     | Lato  | 700    | 32 / 40   | `text-display-32`       |
| Text/Subtitle/18/Bold    | Lato  | 700    | 18 / 26   | `text-subtitle-18-bold` |
| Text/Subtitle/18/Regular | Lato  | 400    | 18 / 26   | `text-subtitle-18`      |
| Text/Body/16/Bold        | Lato  | 700    | 16 / 24   | `text-body-16-bold`     |
| Text/Body/16/Regular     | Lato  | 400    | 16 / 24   | `text-body-16`          |
| Text/Body/14/Regular     | Lato  | 400    | 14 / 20   | `text-body-14`          |
| _Form label_             | Lato  | 500¹   | 14 / 20   | `text-label-14`         |
| Text/Caption/12/Bold     | Lato  | 700    | 12 / 16   | `text-caption-12-bold`  |
| Text/Caption/12/Regular  | Lato  | 400    | 12 / 16   | `text-caption-12`       |
| _Logo wordmark_          | Inter | 600    | 16 / 24   | `text-wordmark`         |
| _Legal / checkbox text_  | Inter | 400    | 14 / 21   | `text-legal-14`         |

¹ See the Lato-500 note above.

### Marketing one-offs (Landing — anonymous in Figma)

| Use                | Font | Weight | Size / LH  | Utility         |
| ------------------ | ---- | ------ | ---------- | --------------- |
| Hero H1            | Lato | 700    | 60 / 65    | `text-hero-60`  |
| App-promo H2       | Lato | 700    | 48 / auto² | `text-h2-48`    |
| Section H2         | Lato | 700    | 36 / 40    | `text-h2-36`    |
| Feature H3         | Lato | 700    | 30 / 36    | `text-h3-30`    |
| Card title         | Lato | 700    | 24 / 32    | `text-h4-24`    |
| Feature item title | Lato | 700    | 20 / 28    | `text-title-20` |
| Feature bullet     | Lato | 400    | 18 / 28    | `text-body-18`  |

² Figma line-height is "auto"; `text-h2-48` approximates **56** (~1.17). Documented as an approximation.

---

## 3. Spacing

8px base grid. Steps actually used: **4, 8, 12, 16, 24, 32, 48** (Tailwind
`1/2/3/4/6/8/12`). One-off gaps measured in Figma: **10** (button icon gap),
**18, 22, 23** (auth form/field/button gaps), **30, 38** (section blocks),
**60** (header nav gap), **120** (page gutters), **135** (mockup ↔ copy). Use
the standard scale; reach for arbitrary values (`gap-[23px]`) only for the
documented one-offs.

Padding tokens: buttons `16×24`, inputs `16×12`, cards `24`, sections `48×24`,
page gutters `120`, footer `64×24`.

---

## 4. Radius

| Value                   | Used for                          | CSS var            | Utility           |
| ----------------------- | --------------------------------- | ------------------ | ----------------- |
| 8px                     | inputs / fields                   | `--radius-control` | `rounded-control` |
| 12px                    | **cards + buttons**               | `--radius-card`    | `rounded-card`    |
| 14px                    | floating chips, app-store buttons | `--radius-chip`    | `rounded-chip`    |
| 16px                    | larger cards                      | `--radius-card-lg` | `rounded-card-lg` |
| 9999 (Figma `16777200`) | pills, avatars, icon circles      | —                  | `rounded-full`    |

> Note: primary/secondary **buttons use radius 12** (`rounded-card`), not 8.
> Only inputs use 8 (`rounded-control`).

---

## 5. Borders & shadows

- **Border:** default `1px solid` `Color/Neutral/300` (`#D1D7DE`) — inputs,
  cards, header divider. Subtle `1px #F3F4F6` (chips). Footer top rule
  `1px #343D48` (top only).

| Elevation           | box-shadow                                                         | CSS var           | Utility         |
| ------------------- | ------------------------------------------------------------------ | ----------------- | --------------- |
| Card / dropdown     | `0 0 24px rgba(0,0,0,0.15)`                                        | `--shadow-card`   | `shadow-card`   |
| Chip / button float | `0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)` | `--shadow-float`  | `shadow-float`  |
| Device mockup       | `0 5px 8px rgba(0,0,0,0.1)`                                        | `--shadow-mockup` | `shadow-mockup` |

No inner shadows / blurs in the system.

---

## 6. Gradients

| Role                  | CSS                                                  | Utility               |
| --------------------- | ---------------------------------------------------- | --------------------- |
| Primary button fill   | `linear-gradient(154deg, #75C2FF 0%, #269DF9 55%)`   | `bg-gradient-primary` |
| Auth split-hero panel | `linear-gradient(-74deg, #3B7BB5 7%, #5CB4F8 100%)`  | `bg-gradient-hero`    |
| App-promo backdrop    | `linear-gradient(134deg, #F8FBFD 39%, #269DF9 100%)` | `bg-gradient-promo`   |

---

## 7. Breakpoints & layout

Two artboards: **mobile 393** and **desktop 1440**. Build **mobile-first**;
the band between is fluid. Desktop adds **120px** side gutters with a centered
container (max-width `1440px`, set via `--breakpoint-2xl`). Use a `<Container>`
(`mx-auto max-w-[1440px] px-4 lg:px-[120px]`) so the gutter lives in one place.
The desktop layout (split-hero, multi-column, full nav) switches in at `lg`.

---

## 8. Component specs (from Figma)

- **Primary button:** gradient fill (`bg-gradient-primary`), radius **12**,
  padding **16×24**, icon-gap **10**, label `text-body-16-bold` white. Full-width
  variant stretches.
- **Secondary button:** white fill, **1px `#2F5069`** border, radius 12, same
  padding, label `text-body-16-bold` `#2F5069`.
- **Input / Field:** padding **16×12**, radius **8** (`rounded-control`), **1px
  `#D1D7DE`** border, white fill, value `text-body-16-bold` `#18222B`. Label
  above (`text-label-14` `#2F5069`), label→field gap **8**.
- **Checkbox:** 18×18, checked `#269DF9`, unchecked border `#B2C4DE`, row gap 8,
  label `text-legal-14` `#18222B` with inline `#269DF9` links.
- **Header / nav:** height **80**, padding **0 120**, white, bottom border 1px
  `#D1D7DE`. Logo `text-wordmark` `#2F5069`. Center nav gap **60**; active label
  `text-caption-12-bold` `#269DF9`, inactive `text-caption-12` `#18222B`. Right: primary button.
- **Card:** padding **24**, gap 24 (outer) / 12 (list), radius 12, white, 1px
  `#D1D7DE` border, `shadow-card`.
- **Auth split-hero:** page `#F5F7FA`; left form column **480** wide (gap 32),
  right panel **525** wide full-height with `bg-gradient-hero` + blurred circles.
- **Footer:** `#1F3648` (Secondary/700) bg, padding `0 120` / inner `64 24 0`,
  top border 1px `#343D48`; headings `text-subtitle-18-bold` white, links 14/20 `#9EB6C9`.

---

## 9. Proportions & the "golden ratio" (honest analysis)

The design was **measured for φ = 1.618** and **does not use it.**

- **Type scale** (12→60): consecutive ratios are 1.167, 1.143, 1.125, 1.111,
  1.20, 1.25, 1.067, 1.125, 1.333, 1.25 — clustered around **1.11–1.33**, never
  near 1.618. It is a pragmatic step scale, not a single modular ratio and not golden.
- **Layout:** auth form column ÷ page = 480 ÷ 1440 = **0.333 (one-third)**; right
  panel 525 ÷ 1440 = 0.365; header height ÷ gutter = 80 ÷ 120 = **0.667 (two-thirds)**.
  None approximate 0.618 / 1.618.

**Conclusion:** the system is built on an **8px grid + halves/thirds**, not the
golden ratio. Documented as measured — no φ was retrofitted.

---

## 10. Token → code quick index

- Colors: `Color/<Group>/<Step>` → `--color-<group>-<step>` → `bg-/text-/border-<group>-<step>`.
- Type: `Text/<Style>` → `text-<style>` utility (e.g. `text-display-32`).
- Radius: `rounded-control|card|chip|card-lg|full`.
- Shadow: `shadow-card|float|mockup`. Gradient: `bg-gradient-primary|hero|promo`.
- Semantic (shadcn): `bg-background`, `text-foreground`, `bg-primary`, `border-border`, `ring-ring`, …
