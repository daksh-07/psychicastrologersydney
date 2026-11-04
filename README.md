# The Sacred Atelier — Pandit Thulasidas (speculative preview)

A speculative website redesign by Everest Marketing for Pandit Thulasidas, a Vedic astrologer, psychic reader and spiritual advisor in Merrylands, Sydney. **This is a preview, not the live site.** The live site (https://psychicastrologersydney.com.au/), its domain and DNS are untouched, and production on Vercel still serves `main`.

**Documentation:**
- [Original site content audit](docs/ORIGINAL_SITE_CONTENT_AUDIT.md)
- [Service inventory and URL map](docs/SERVICE_INVENTORY.md)
- [Design direction](docs/DESIGN_DIRECTION.md)
- [Motion spec](docs/MOTION_SPEC.md)
- [Asset credits](docs/ASSET_CREDITS.md)
- [QA report](docs/QA_REPORT.md)
- Screenshots in `docs/screenshots/`

## Stack
- **Framework:** Next.js 15 App Router, React 19, strict TypeScript.
- **Styling:** Tailwind CSS v4, with design tokens and components in `src/app/globals.css` under `@layer components`.
- **Motion:** GSAP 3.13 with ScrollTrigger and SplitText for scroll motion; a CSS-only hero entrance (see MOTION_SPEC).
- **Rendering:** every route is static. Service pages use `generateStaticParams` from the typed catalogue in `src/content/catalogue.ts`.
- **Client islands:** header (mega-panel and mobile menu), motion layer, Rāśi Chakra, service explorer, WhatsApp composer.
- **Fonts:** local OFL fonts in `src/fonts/` (Cormorant Garamond, Manrope, and Tiro Devanagari Sanskrit subset to the glyphs used). The build makes no remote font requests.
- **Images:** pre-optimised AVIF/WebP in `public/art/`, built by `scripts/process-images.py`. Credits are recorded in `docs/ASSET_CREDITS.md` only; none are displayed on the site.
- **Not included:** no database, auth, server form handling, analytics, trackers or embeds.

## Routes
- **Main pages:** `/`, `/about`, `/consultations`, `/faq`, `/contact`, `/privacy`, plus a custom 404.
- **16 service pages** under `/consultations/…`:
  - **Love & relationships:** `love-marriage`, `relationship-guidance`, `get-your-love-back`, `extra-marital-concerns`.
  - **Marriage & family:** `marriage-guidance`, `family-problems`, `childless-couples`.
  - **Astrology & readings:** `vedic-astrology`, `palm-reading`, `psychic-reading`.
  - **Work, money & life decisions:** `career-and-education`, `business-and-finance`, `legal-concerns`.
  - **Spiritual guidance:** `spiritual-guidance`, `negative-energy`, `black-magic-concerns`.
- **Generated:** `sitemap.xml` (not advertised while noindex) and `robots.txt`.
- **Redirects:** the two URLs from the earlier preview redirect to their new homes.

## Commands
```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm test
pnpm build && PORT=3100 pnpm start
BASE_URL=http://localhost:3100 pnpm test:e2e   # Playwright (Chromium; WebKit if installed)
node scripts/render-og.mjs                                   # regenerate OG/Twitter artwork
python3 scripts/process-images.py <downloaded-sources-dir>  # rebuild /public/art (see ASSET_CREDITS for sources)
```
The e2e suite uses synthetic data only. It intercepts `window.open` and aborts every `wa.me` request, so no message is ever sent. Screenshots are written to `tests/e2e/output/` (git-ignored); curated copies live in `docs/screenshots/`.

## Published facts vs. proposed experience
**Published on the current site (see the audit):**
- The name Pandit Thulasidas, Sydney, a Vedic astrologer and spiritual advisor.
- Private consultations, horoscope/birth-chart readings, palmistry and psychic/spiritual guidance.
- Relationship, family, career, education and business topics.
- Phone/WhatsApp +61 426 562 158.

**Proposed by this concept (owner approval needed):**
- All copy, the 5-category / 16-page grouping, and the visual identity and artwork selection.
- FAQ answers, the enquiry flow and the privacy wording.
- The “25+ years” statement, shown as attributed and *awaiting confirmation*.

**Deliberately omitted:**
- Email addresses (four conflicting variants) and the second header number (+61 470 325 836).
- The “Ask 1 Question Free” offer, guarantees, fees, hours and credentials.
- Testimonials (unverified, styled as Google Reviews) and the original banners.

**Sensitive topics:** these are now represented as the client advertises them, but with careful copy and explicit limits — childless couples, legal concerns, negative energy and black magic. The original address is shown, with “confirm visit arrangements”.

## Contact configuration
One source: `src/config/business.ts` holds `tel:+61426562158` and `https://wa.me/61426562158`. Direct CTAs carry only a generic greeting. The composer keeps values in component memory and builds the `wa.me` URL once, on the “Open WhatsApp” click. **Owner confirmation of the number is required before any live release.**

## Indexing — demo default and production switch
Every deployment is **noindex** by default:
- `<meta name="robots" content="noindex, nofollow">`
- an `X-Robots-Tag: noindex, nofollow` header (set in `next.config.ts`)

`robots.txt` allows crawling so that crawlers can see the noindex. No sitemap is published and no canonical points at the current business site.

**Owner-approved production switch (do not do this for previews):**
1. Confirm the contact details, address, consultation format, portrait/photography and copy with the owner.
2. Set `SITE_INDEXABLE=true` and `SITE_URL=https://<final-domain>` for the Production environment only.
3. Add per-route canonicals and a sitemap for the final origin.
4. Apply the redirect map below.
5. Verify that the noindex meta and header are gone in production, and still present on previews.

## Legacy URL map (planning only — no redirects applied in the demo)
| Existing | Proposed |
|---|---|
| `/index.php` | `/` |
| `/about-us.php` | `/about` |
| `/contact-us.php` | `/contact` |
| `/palm-reading.php` | `/consultations/palm-reading` |
| `/horoscope-reading.php` | `/consultations/vedic-astrology` |
| `/love-marriage.php`, `/couple-problems.php`, `/get-love-back.php`, `/family-problems.php`, `/extra-marital.php` | `/consultations/relationships-and-family` (if intent is equivalent) |
| `/business-problems.php`, `/education-problems.php`, `/money-problems.php` | `/consultations/career-and-business` (if aligned; review money separately) |
| `/negative-energy.php`, `/black-magic.php` | Review with the owner before mapping |

Before launch: crawl the current URLs and sitemap, export GSC data if authorised, make every redirect a single hop, and update NAP listings.

## Imagery
- **14 curated assets:** CC0 Indian paintings from the Cleveland Museum of Art, a Public Domain Mark Wellcome manuscript and four Unsplash photographs.
- **Credits:** sources, rights, crops, cultural context and rejected candidates are in [`docs/ASSET_CREDITS.md`](docs/ASSET_CREDITS.md). No captions or source credits are shown on the website; none of the licences require them.
- **Client images:** no images from the client's site are reused.
- **Practitioner:** no likeness is generated or substituted; the portrait slot is labelled “Awaiting a client-approved photograph”.

## Owner confirmation before any launch
- **Contact details:** phone/WhatsApp number, current email, address and visit arrangements.
- **Claims and offers:** the “25+ years” statement; whether phone consultations are offered Australia-wide; terms for any free-question offer.
- **Services:** whether childless-couple, legal-concern and black-magic topics should stay, and whether the copy matches the actual practice.
- **Brand and imagery:** an approved portrait; a vector logo; spelling “Pandit” vs “Pandith”; consent to use historical deity paintings in the brand.
- **Testimonials:** verified testimonials with written permission, if any are to be shown.
