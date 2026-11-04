# The Celestial Almanac — Pandit Thulasidas (speculative preview)

A same-day speculative website concept by Everest Marketing for Pandit Thulasidas, a Sydney Vedic astrologer and spiritual advisor. **This is a preview, not the live site.** The live site (https://psychicastrologersydney.com.au/), its domain and its DNS are untouched.

## Stack
- Next.js 15 App Router, React 19, strict TypeScript, Tailwind CSS v4 with a small token-based design system in `src/app/globals.css`.
- All routes are static (Server Components, `generateStaticParams` for consultation detail pages).
- Client islands: the mobile menu, the active-nav link and the WhatsApp message composer.
- Local OFL fonts (Instrument Serif and Manrope), stored as WOFF2 in `src/fonts/` with their licences. The build makes no remote font request.
- No database, auth, server form handling, analytics, trackers or embeds.

## Routes
`/`, `/about`, `/consultations`, `/consultations/{vedic-astrology,palm-reading,relationships-and-family,career-and-business,spiritual-guidance}`, `/faq`, `/contact`, `/privacy`, plus a custom 404.

## Commands
```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm test
pnpm build && PORT=3100 pnpm start
BASE_URL=http://localhost:3100 pnpm test:e2e   # Playwright (Chromium; WebKit if installed)
BASE_URL=http://localhost:3100 node scripts/render-og.mjs   # regenerate OG artwork
```
The e2e suite uses synthetic data only. It intercepts `window.open` and aborts every `wa.me` request, so no message is ever sent. Screenshots are written to `tests/e2e/output/` (git-ignored); curated copies live in `docs/screenshots/`.

## Published facts vs. proposed experience
**Published on the current site (see the audit):**
- The name Pandit Thulasidas, Sydney, a Vedic astrologer and spiritual advisor.
- Private consultations, horoscope/birth-chart readings, palmistry and psychic/spiritual guidance.
- Relationship, family, career, education and business topics.
- Phone/WhatsApp +61 426 562 158.

**Proposed by this concept (owner approval needed):**
- All copy, the five-service grouping, the visual identity and plate artwork, the editorial photography set, the FAQ answers, the enquiry flow and the privacy wording.

**Deliberately omitted:**
- Email addresses (conflicting), the second header number (+61 470 325 836) and the street address (only “Sydney, NSW” is shown).
- The “Ask 1 Question Free” offer, reviews/testimonials, years of experience, guarantees, fees, hours and credentials.
- Sensitive topics (court cases, family planning, black magic) are kept out of navigation.

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
Three editorial images are used: an Unsplash still life, an Unsplash palm close-up and a public-domain Wellcome Collection engraving. Sources, rights, crops and rejected candidates are listed in [`docs/ASSET_CREDITS.md`](docs/ASSET_CREDITS.md). No practitioner likeness is generated or substituted.
