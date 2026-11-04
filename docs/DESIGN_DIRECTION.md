# Design direction — The Sacred Atelier

## Why the previous demo was replaced
The Celestial Almanac (`feat/celestial-almanac-demo`) was honest and accessible but visually generic: a dark-and-brass shell, one serif weight, five small rows, three unrelated photos and one CSS stroke animation. It represented five of the original site's 25+ topics and had no cultural anchor. The rebuild keeps its sound plumbing — single contact config, WhatsApp composer, noindex, reduced-motion handling and the test harness — and replaces everything visible.

## Concept
A contemporary editorial house for a traditional practice: a **museum catalogue crossed with a Vedic manuscript**. The art direction starts from the client's own identity. Their logo shows **Krishna with flute and peacock feather**, so the hero is a 17th-century Rajput *Krishna Fluting*. Around it sit:
- **Pahari and Kalighat paintings**, open-access CC0 from the Cleveland Museum of Art;
- a page from a **Mandi astrology series**;
- **temple-architecture photography** (Lepakshi, a Chennai temple corridor);
- the **Jantar Mantar observatory**;
- **diyas**;
- an original **aṣṭadala / rāśi-chakra** linework system.

Images appear without captions or source credits (client preference); provenance is kept in `docs/ASSET_CREDITS.md`. Devotional art is never presented as depicting the practitioner or his practice.

## Principles adapted from references
| Reference | Principle adapted (not copied) |
|---|---|
| Museum and collection sites (Cleveland Museum of Art, Wellcome Collection) | Captioned figures with numbered *Fig.* labels; provenance in the interface. |
| Story of Eve / Norm Architects | Restrained palette, long/short section rhythm, generous negative space. |
| CHANI | A warm editorial voice for spiritual content without mysticism clichés. |
| Instrument / BASIC/DEPT® / Studio Freight | Monumental type, masked line reveals, one confident idea per section. |
| Codrops (SVG + GSAP articles) | Calibrated SVG geometry animated with transforms, not raster effects. |
| Awwwards / Godly (editorial spiritual and luxury sites) | Arch-framed imagery, full-bleed split sections, tactile grain, horizontal ticker. |
| Everest's own portfolio | Bespoke linework motif, numbered narrative (I–VIII), direct enquiry labels. |

## Palette
| Token | Hex | Use |
|---|---|---|
| ivory | `#F5EEE2` | Default ground |
| paper | `#FBF7F0` | Cards, principles, form |
| parchment | `#EADFC8` | Alternate light sections (with grain) |
| ink | `#1B1713` | Text; dark sections (readings, footer) |
| oxblood | `#5B1A18` | Love category, CTA, contact |
| forest | `#1F2B1D` | Love-and-family split section, work category |
| umber | `#3A2618` | Spiritual category hero |
| saffron | `#E2A04A` | Accent on dark (contrast ≥ 7:1 on ink) |
| saffron-deep | `#8A4A12` | Accent text on light (≈ 5.9:1 on ivory) |
| brass | `#B08D57` | Decorative only |

Sections alternate light and dark deliberately, and each consultation category has its own hero surface. The 16 service pages therefore don't feel identical.

## Typography
- **Cormorant Garamond** (300 / 500 / 600 and italics 300 / 400 / 500) for display. The light roman is set monumentally (`clamp(3.4rem, 10.6vw, 11.25rem)`, line-height .86, tracking -.035em), and one italic word per headline carries the saffron accent.
- **Manrope** (400–700) for body, UI and eyebrows (.18em tracking).
- **Tiro Devanagari Sanskrit** for Devanagari only. It is used for verified terms: ज्योतिष (*jyotiṣa*, “astrology”) and the twelve rāśi names मेष … मीन.
- All fonts are SIL OFL 1.1, self-hosted as WOFF2, with licences in `src/fonts/`.

## Cultural guardrails
- Deities appear only as historical artworks. Nothing on the page describes the practitioner's personal worship.
- Ganesha is captioned with the widely held meaning “remover of obstacles”, because the spiritual section discusses obstacles. That is cultural context, not a promise.
- The rāśi wheel is labelled “Decorative — not anyone's birth chart”. Rulerships follow standard Jyotiṣa: Maṅgala for Meṣa/Vṛścika, Śukra for Vṛṣabha/Tulā, Budha for Mithuna/Kanyā, Candra for Karka, Sūrya for Siṃha, Guru for Dhanu/Mīna, Śani for Makara/Kumbha.
- No voodoo, tarot, crystal-ball, glowing-orb or “spell” imagery, which was common on the original banners.

## Signature elements
1. **Arch frames:** temple-arch masks on key artworks.
2. **Rāśi Chakra:** an interactive wheel (see MOTION_SPEC).
3. **Aṣṭadala ornament:** an original eight-petal lotus with a 12-fold division that rotates slowly behind heroes and CTAs.
4. **Numbered narrative:** roman numerals I–VIII down the homepage.
5. **Marquee ticker:** all sixteen consultation names in italic serif.
6. **Footer wordmark band:** “Thulasidas · ज्योतिष” drifting with scroll.
