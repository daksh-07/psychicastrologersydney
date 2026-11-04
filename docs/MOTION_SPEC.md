# Motion spec

**Libraries:** GSAP 3.13 with ScrollTrigger and SplitText (free under GSAP's standard “no charge” licence), plus CSS for hover states and the marquee. There is no smooth-scroll library and no scroll-jacking; native scrolling is preserved.

**Architecture:** one client component, `src/components/motion/Motion.tsx`, reads data attributes after hydration. It runs inside a `gsap.context()` that is reverted on every route change, and SplitText instances are reverted with it. Component-level animations (chakra, explorer, menus) own their own contexts and listeners and clean them up on unmount.

**Reduced motion:** `prefers-reduced-motion: reduce` skips the whole layer. The hero is visible at first paint, nothing splits, rotates or drifts, and the chakra has no idle tour or tilt. A global CSS rule also neutralises transitions. This is verified by e2e.

**No-JS / failure safety:** an inline script adds `html.motion` before paint, which pre-hides only the hero items. If GSAP hasn't started within 2.5 s, the class is removed. All other content is visible without JavaScript.

**Easing:** `expo.out` for reveals, `expo.inOut` for wipes. The house cubic-bezier is `(0.16, 1, 0.3, 1)`.

## Effects
| # | Effect | Trigger | Implementation | Timing |
|---|---|---|---|---|
| A | **Hero entrance** | First paint | Timeline: artwork `clip-path` inset 100%→0 (1.6 s, expo.inOut) with inner image scale 1.22→1 (2.2 s). Headline split into masked lines that rise from 115% with a 2° rotation (1.4 s, 0.11 s stagger). Eyebrow, lede, CTAs and meta fade/rise in order (`data-hero-in`). | Done by ~1.8 s; headline readable from ~0.6 s |
| A2 | Ongoing decorative motion | Continuous | `[data-spin]` aṣṭadala rings rotate 360° in 160–220 s; transform only. | Linear, infinite |
| B | **Rāśi Chakra** (signature) | Pointer, tap, keyboard, idle | Bezel (180 ticks) rotates over 240 s; 27-nakṣatra ring counter-rotates over 180 s; three graha orbits run at different speeds. A brass alidade follows the cursor angle on the shortest path (1.1 s expo.out) and selects that rāśi. The disc tilts in 3D up to ±7° using `quickTo`. A live region announces the Devanagari name, transliteration, sign and traditional ruler. Idle tour every 2.8 s while ≥40% visible, until the visitor interacts. Twelve radio buttons with arrow-key navigation on all devices; four columns at ≤639 px. | Fine-pointer tilt only |
| C1 | Masked line reveals | ScrollTrigger `top 86%`, once | `[data-split]` → SplitText lines with mask, yPercent 110→0, 0.09 s stagger. | 1.25 s |
| C2 | Image wipes | `top 82%`, once | `[data-reveal="image"]` clip-path from bottom, left or right, with inner zoom-out 1.25→1. | 1.5 s / 2 s |
| C3 | Stagger lists | `top 85%`, once | `[data-stagger]` children rise 40 px. | 1.1 s, 0.1 s stagger |
| C4 | Line drawing | `top 85%`, once | `[data-draw]` stroke-dash on the “How it works” path and ornaments. | 2.2 s |
| C5 | Parallax | Scrub | `[data-parallax]` yPercent drift on the Jantar Mantar and corridor figures; ≥768 px only (`gsap.matchMedia`). | scrub 0.6 |
| C6 | Horizontal movement | Continuous + scrub | Service-name marquee (CSS, 60 s, pauses on hover); footer wordmark drifts −18% with scroll. | — |
| D | **Service explorer** | Hover/focus (desktop), tabs (all) | Row title shifts 10 px and turns oxblood. The sticky arch preview wipes to the new artwork (clip-path + scale 1.12→1, 0.9 s) and the summary rises in. Tab change restaggers the rows. On mobile, tabs drive a snap-scrolling card rail that animates in from the right. | 0.6–0.9 s |
| E1 | Desktop mega-panel | Click / keyboard | Clip-path drop and column stagger; closes on Escape, outside click or route change. | 0.6 s |
| E2 | Mobile menu | Menu button | Full-screen ink overlay wipes down (0.75 s expo.inOut); serif links rise from masks (0.06 s stagger); CTAs fade. Focus moves to Close and is trapped; Escape and route change close it; body scroll is locked. | 0.75 s in / 0.55 s out |
| E3 | Header | Scroll | Becomes translucent ivory with blur after 24 px; hides on scroll-down past 480 px and returns on scroll-up. | 0.4–0.5 s |
| F | **Final CTA** | Scroll | Headline line reveal, lede rise, CTA stagger. The aṣṭadala rotates over a screen-blended diya photograph. Buttons use an ink/ivory fill that slides up on hover. | — |

## Performance notes
- Animations use transform, opacity and clip-path only; no layout properties are animated.
- Rotating SVGs have `will-change` only on the chakra disc.
- Images in animated frames have intrinsic sizes, so there is no layout shift.
- Frame rate and long tasks were **not** measured. This document makes no performance claim beyond the techniques used.
