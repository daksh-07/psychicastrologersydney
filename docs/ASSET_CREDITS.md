# Asset credits — The Celestial Almanac preview

Checked 4 November 2026 (Sydney). Every selected file was downloaded once from the original host, cropped and re-encoded locally (AVIF + WebP) and is served from `public/images/`. No hotlinks, search thumbnails, watermarked previews or paid assets are used.

## Selected assets (3)

| # | Placement | Asset page (original URL) | Creator | Rights | Attribution shown on page | Local files |
|---|-----------|---------------------------|---------|--------|---------------------------|-------------|
| 1 | Homepage, section 04 “Start with a question” (decorative, `alt=""`) | https://unsplash.com/photos/ts_6KGo33TM — source file `images.unsplash.com/photo-1578048401228-48e3979a8edf` | Ana Miranda ([@thisisanamirandahi](https://unsplash.com/@thisisanamirandahi)) | [Unsplash License](https://unsplash.com/license): free commercial use, modification allowed, attribution not required. Asset page states “Free to use under the Unsplash License” and is not Unsplash+. | “Photograph: Ana Miranda / Unsplash” | `notebook-wide-{800,1200,1600}`, `notebook-square-{480,800}` |
| 2 | `/consultations/palm-reading`, beside “How the hand is read” (informative alt) | https://unsplash.com/photos/grayscale-photo-of-human-palms--jgjCU_Asbs — source file `images.unsplash.com/photo-1499152701974-8a37869fea68` | Om Prakash Sethia ([@om_07](https://unsplash.com/@om_07)) | Unsplash License (as above). Asset page states “Free to use under the Unsplash License”. | “Photograph: Om Prakash Sethia / Unsplash. Tone adjusted.” | `palm-tall-{480,800}`, `palm-mobile-{480,800}` |
| 3 | `/consultations/vedic-astrology`, beside “What a birth-chart reading involves” (informative alt) | https://wellcomecollection.org/works/f23nkmw4 — IIIF image `V0024704` | Engraving by R. W. Seale (“R.W. Seale sculp.”), “Engraved for the New Geographical Dictionary”, London. Wellcome Collection reference 46157i. No date is given in the catalogue record, so none is claimed. | Public Domain Mark (catalogue `license: pdm`), credit line “Wellcome Collection”. | “Wellcome Collection · Public Domain Mark”, plus caption describing it as historical astronomical artwork and not a Vedic or personal chart | `sphere-tall-{480,800}`, `sphere-square-{480,800}` |

### Processing
- **Notebook:** saturation reduced and a slight warm balance applied to remove a lavender cast. Desktop crop is 3:2, mobile crop is 1:1 and keeps the whole notebook.
- **Palm:** converted to a warm ink-to-ivory monotone. Desktop crop is 3:4, mobile crop is 4:5 and centred on the creases.
- **Sphere:** 3:4 desktop and 1:1 mobile detail crops of the central armillary sphere. Paper grain was median-filtered and the image tinted to the ivory/ink palette to cut file weight.
- **Sizes:** the largest file served on phones is 60 KB AVIF (palm-mobile-800). Each image is lazy-loaded with no preload, and its box is reserved through the CSS `aspect-ratio` set for each breakpoint.

## Candidates reviewed and not used

| Placement | Candidate | Reason |
|-----------|-----------|--------|
| Homepage | [Wiktoria Skrzekotowska — open book, golden hour](https://unsplash.com/photos/OPyp9RJM6b4) (Unsplash License) | Saturated orange, outside the muted brass palette; legible Polish text competes. |
| Homepage | [Ioann-Mark Kuznietsov — book near glass window](https://unsplash.com/photos/book-near-glass-window-F_cHIM0Kcy4) (Unsplash License) | Runner-up. Book is a small focal point; green view pulls focus and crops poorly to mobile. |
| Homepage | [Sergei Nikulin — person reading by window](https://unsplash.com/photos/tglfT2WsX8E) (Unsplash License) | A person/model in frame; could read as the practitioner. |
| Homepage | [Christopher Stites — open book on white surface](https://unsplash.com/photos/ti4JDwsE9eQ) (Unsplash License) | Devotional/Bible imagery — unrelated sacred text. |
| Homepage | [Frank Flores — old handwritten letter](https://unsplash.com/photos/old-handwritten-letter-with-stained-paper-1qtxyfZVyHM); [Diana Light — open notebook](https://unsplash.com/photos/an-open-notebook-and-a-pen-on-a-wooden-table-YTNZDFU9UXU) | Unsplash+ (paid licence). Excluded. |
| Palm | [Claudia Love — person opening palms](https://unsplash.com/photos/person-opening-palms-close-up-photo--v9tsExFF9w) (Unsplash License) | Neon patterned garment fills the background and clashes with the palette. |
| Palm | [Adrian Swancar — showing left palm](https://unsplash.com/photos/oeD3BbmrfC8) (Unsplash License) | Visible cut on palm, wristband and green foliage background. |
| Horoscope | [Wellcome — Ptolemy and Euclid with an armillary sphere](https://wellcomecollection.org/works/a2y8dwm6) (PDM) | Two human figures with faces dominate; weaker crop than the Seale plate. |

Pexels was not used. Its site returned HTTP 403 to this environment, and its API needs a key, which was not available. Unsplash's site sits behind a bot-check, so asset pages were read through a standard web fetch and the files were downloaded from Unsplash's image CDN. No Pexels asset was evaluated.

## Not stock, original
- The celestial plate (`src/components/CelestialPlate.tsx`) and the Open Graph/Twitter card (`src/app/opengraph-image.png`) are original vector artwork made for this concept.
- Fonts: Instrument Serif and Manrope, under the SIL Open Font License 1.1. Licences are in `src/fonts/`.

## Owner items
- No portrait of Pandit Thulasidas is used. If the owner supplies an approved portrait, it can replace the plate detail in homepage section 03. A stock model must never stand in for the practitioner.
- The palm photograph shows a real person's hands, credited to the photographer. Confirm the owner is comfortable with it. To revert, delete `figure: "palm"` from `src/content/services.ts`, which restores the typography-only layout.
