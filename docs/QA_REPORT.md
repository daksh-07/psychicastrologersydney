# QA report — The Sacred Atelier

Date: 4 November 2026 (Sydney). Branch `feat/sacred-atelier-redesign`. All results below are from a production build (`next build && next start`) in this cloud container with the Playwright-bundled Chromium (Chrome 153), unless noted.

## Automated checks
| Check | Command | Result |
|---|---|---|
| Lint | `pnpm lint` | ✅ 0 errors, 0 warnings |
| Strict typecheck | `pnpm typecheck` | ✅ |
| Unit tests (validation, encoding, topic allowlist) | `pnpm test` | ✅ 5/5 |
| Production build | `pnpm build` | ✅ 29 static routes (16 SSG service pages) |
| Browser e2e | `BASE_URL=http://localhost:3100 pnpm test:e2e` | ✅ **402/402 passed** in Chromium · WebKit **not run** (see below) |

### What the e2e suite covers
- **All 22 routes:** 200 status, exactly one H1, no skipped heading levels, unique titles and descriptions, shared header/footer, `noindex` in both meta and `X-Robots-Tag`, no preview canonical.
- **Contact links:** `tel:` links all equal `tel:+61426562158`; every `wa.me` link uses 61426562158; the legacy number 470 325 836 is absent.
- **No image sources on the page:** visible text on every route is checked for “Unsplash”, “Cleveland Museum”, “Wellcome”, “Photograph:”, “Fig.”, “CC0” and “public domain” — none appear.
- **Content scan (visible text):** no email/mailto, ★, “100%”, “satisfaction guarantee”, “best astrologer”, “Google Reviews”, “spell caster” or “solution in one call”.
- **Error and crawl handling:** custom 404; robots.txt allows crawling and has no sitemap while noindex; OG artwork served; zero console errors.
- **No horizontal overflow** on all 22 routes at **320, 375, 390, 430, 768, 1024, 1440 and 1920 px**.
- **Small screens (≤ 430 px):** enquiry CTAs come before artwork; header and CTA targets are ≥ 44 px.
- **Images:** every image is local (`/art/`), has intrinsic width/height and an alt attribute. Below-hero images are `loading="lazy"`. The hero painting is eager with a descriptive alt. No image preloads.
- **Mobile menu:** labelled toggle; opens (after animation); focus moves inside; Escape closes and returns focus; route change closes.
- **Keyboard:** the first Tab reaches the skip link.
- **WhatsApp composer:**
  - Allowlisted `?topic=` preselects; unknown topics are ignored; a service-page CTA carries only the slug.
  - Invalid submit focuses the error summary and keeps entries.
  - The review step shows the exact draft and nothing opens before the final click.
  - “Open WhatsApp” opens exactly one URL, to the configured number. The decoded text equals the reviewed draft and is encoded once.
  - **No network request contains the synthetic personal data**; nothing is written to storage or cookies.
  - `wa.me` requests are aborted in tests, so no message is ever sent.
- **No JavaScript:** H1 and CTAs visible; the menu falls back to the footer nav; native FAQ disclosures open.
- **Reduced motion:** no `motion` class; hero visible immediately (lede opacity 1, no clip); no SplitText lines; decorative rotation static.

## Motion verified in the browser (not just in code)
Sampled with Playwright on the production build (frames in `docs/screenshots/motion-*.webp`):
- **Hero (CSS, first paint):**
  - Headline words rise through their masks: word 1 at translateY 144 px (~300 ms) → 22 px (~700 ms) → settled by ~1.2 s.
  - The painting clip-wipes from `inset(100%)` to `inset(0)` by ~2 s.
  - The lede fades in from ~1.2 s.
- **Scroll reveals (GSAP):** practice heading lines move from translateY 97 px to 0 on entering the viewport; the Jantar Mantar wipe ends at `inset(0)`; the aṣṭadala rotation transform changes over time.
- **Rāśi Chakra:** cursor at the disc's right edge selects कर्क; at the bottom, कन्या. The disc applies a 3D `matrix3d` tilt; the idle tour advances when untouched.
- **Service explorer:** hovering row 8 swaps the preview to the Vedic astrology summary with the artwork wipe.
- **Mega-panel:** opens with 17 links; Escape closes it.
- **Mobile menu:** the clip-path wipe is captured mid-animation; focus lands on “Close”.

## Lighthouse (lab data, not field data)
Lighthouse 12.6.0 against `localhost:3100` with simulated throttling. Mobile uses the default Moto G Power profile; desktop uses `--preset=desktop`. These are **lab** numbers from a container. No field (CrUX) data exists for a noindex preview.

| Page | Profile | Perf | A11y | Best practices | SEO* | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 84 | 100 | 100 | 66 | 1.4 s | 3.9 s | 210–230 ms | 0 |
| `/consultations/vedic-astrology` | Mobile | 87 | 100 | 100 | 66 | 1.4 s | 4.1 s | 80 ms | 0 |
| `/contact` | Mobile | 90 | 100 | 100 | 66 | 1.2 s | 3.6 s | 50 ms | 0 |
| `/` | Desktop | 100 | 100 | 100 | 66 | 0.3 s | 0.8 s | 0 ms | 0 |
| `/consultations/vedic-astrology` | Desktop | 100 | 100 | — | — | — | — | — | — |
| `/consultations`, `/contact` | Desktop | 100 | 100 | — | — | — | — | — | — |
| `/about` | Desktop | 98 | 100 | — | — | — | — | — | — |

\*SEO 66 is caused solely by the intentional `noindex` (“Page is blocked from indexing”).

### Performance work done during QA
- **Hero moved from JS to CSS.** It was GSAP-driven, which made LCP wait for hydration (mobile Perf 59, LCP 5.5 s, TBT 800 ms). It now uses server-rendered word masks plus CSS keyframes, and the scroll-motion setup is deferred to `requestIdleCallback`. Result: Perf 71–73.
- **Fonts trimmed.** Ten preloaded font files became seven, and the Devanagari face was subset to the 27 glyphs used (184 KB → 60 KB, not preloaded). Result: Perf 84.
- **Phone LCP.** The artwork clip-wipe is skipped on phones; it keeps a transform-only settle, so the image paints at first frame.

## Accessibility
- Lighthouse a11y is 100 on all audited pages after fixing two issues found in QA: header tagline contrast (4.44:1 from an opacity utility → 8.76:1) and a wordmark `aria-label` that didn't match its visible text.
- Measured WCAG contrast:

  | Foreground on background | Ratio |
  |---|---|
  | Saffron `#E2A04A` on ink | 7.94 |
  | Saffron on oxblood | 5.83 |
  | Saffron on forest | 6.59 |
  | Saffron on umber | 6.37 |
  | Saffron-deep `#8A4A12` on ivory | 5.93 |
  | Saffron-deep on parchment | 5.18 |
  | Ink-soft on ivory | 8.76 |
  | Ink-soft on parchment | 7.64 |
  | Soft ivory on ink | 11.24 |
  | Soft ivory on oxblood | 8.25 |
  | Soft ivory on forest | 9.32 |

- **Keyboard and screen-reader support:**
  - Skip link.
  - Disclosure mega-panel (`aria-expanded`/`aria-controls`, Escape, outside-click).
  - Modal mobile menu (focus trap, Escape, scroll lock).
  - Explorer tabs (roving tabindex, arrow keys).
  - Chakra radio group (arrow keys, live region).
  - Native `<details>` FAQs.
  - Labelled form fields with a linked error summary.
- **Reduced motion:** honoured everywhere, as verified above.

## Visual review passes
1. **Pass 1 (1440 / 390, all key templates)** found and fixed:
   - A hydration error (`<h3>` inside `<p>` in the card rail).
   - Wrapping “Fig.” numerals.
   - The ornament ring crossing the hero caption.
   - Photographs too cool for the palette (now warm-graded).
   - The footer wordmark wrapping onto two lines (`text-wrap` overriding `nowrap`).
   - The full-width CTA link underline.
   - A duplicated Lepakshi image on the homepage.
   - A comma orphaned by the line split.
   - A redundant hero eyebrow.
2. **Pass 2 (320 / 768 / 1024 / 1920 plus inner pages)** found and fixed:
   - Header overflow at 320–430 px. Root cause: component CSS sat outside Tailwind's cascade layers and overrode `hidden`; it was moved into `@layer components`.
   - Chakra buttons narrower than 44 px at 320 px.
   - Below-the-fold reveals missing from full-page captures (the screenshot harness now scrolls first).
3. **Pass 3 (performance and accessibility)** produced the LCP, font and contrast fixes above.
4. **Pass 4 (client feedback)** removed all on-page captions, “Fig.” labels and image-source credits, including the public credits list on `/privacy`. Full-page screenshot captures now use Playwright's `animations: "disabled"`: Chromium's full-page mode was restarting the CSS hero wipe and photographing it mid-animation, so an earlier homepage screenshot was missing the painting. Real browsers were unaffected.

Comparison with the original site, which has no H1 on 8 of 15 pages, PHP warnings exposing server paths, image-text banners and guarantee badges: the redesign has one semantic H1 per page, all copy as live text, no exposed errors, licensed and credited imagery, and every original service represented (`docs/SERVICE_INVENTORY.md`).

## Not tested / limitations
- **WebKit / Safari:** not run. The Playwright WebKit build isn't installed, and this environment forbids reinstalling Playwright browsers. Test on a real iPhone (Safari) before showing on iOS, especially the 3D chakra tilt (fine-pointer only) and `backdrop-filter` on the header.
- **Firefox:** not run.
- **Real devices and real networks:** not tested. Lighthouse numbers are simulated lab data.
- **Frame rate:** not measured; no fps claim is made.
- **Screen readers:** semantics were checked via the DOM and Lighthouse; no manual NVDA/VoiceOver session.
- **200% zoom:** covered indirectly by the 320 px overflow checks (the equivalent CSS width), not by a browser-zoom session.
