# Asset credits — The Sacred Atelier

Checked 4 November 2026 (Sydney). Every file was downloaded once from the original host's own image service (Cleveland Museum of Art open-access API, Wellcome IIIF, Unsplash image CDN) after its licence was confirmed on the asset page or API record. Files were cropped and re-encoded locally to AVIF and WebP at 480/800/1200/1800 px by `scripts/process-images.py` and are served from `public/art/`. No hotlinks, search thumbnails, watermarked previews, paid assets or competitor images are used. **No asset from the client's current website is reused** (see “Client imagery” below).

Every image also has a visible credit on the site: in its caption, and in the full list at `/privacy#credits`.

## Paintings and manuscripts (public domain / CC0)

| Key | Work | Creator / origin | Source | Licence & attribution | Placement | Crop | Cultural context |
|---|---|---|---|---|---|---|---|
| `krishna-fluting` | *Krishna Fluting*, c. 1675–1700, gum tempera on paper | Rajasthan, Rajput kingdom of Bundi | https://clevelandart.org/art/2018.157 | **CC0** (CMA Open Access); credit given as courtesy | Home hero (Fig. 1), OG/Twitter card | Full sheet in a temple-arch mask; focus 52% 40% | Krishna playing the flute — the motif of the client's own logo (Krishna, flute, peacock feather). Shown as art, not as a claim about the practitioner's devotion. |
| `radha-sakhi` | *Sakhi persuades Radha to meet Krishna*, from a Gita Govinda of Jayadeva, c. 1820–25 | Attributed to Purkhu; Pahari kingdoms | https://clevelandart.org/art/1989.334 | **CC0** | Home love section (Fig. 3, full-bleed); Love marriage hero; explorer | Inner image without mount; focus 72% 50% on mobile/split | Radha and Krishna as the classical image of devoted love in the Gita Govinda. |
| `krishna-awaiting` | *Krishna Awaiting Radha*, c. 1750–60 | Pahari kingdoms | https://clevelandart.org/art/1936.685 | **CC0** | Separation & reconciliation hero; About; home psychic card | Full; focus 55% 70% | Longing and waiting — context for the reconciliation page, without implying any outcome. |
| `radha-storm` | *Radha and Krishna meet in the forest during a storm*, c. 1770 | Bengal, Mughal | https://clevelandart.org/art/2013.352 | **CC0** | Relationship & couple concerns hero; love category on index; explorer fallback | 3% margins trimmed | Love meeting in difficult weather — a quiet metaphor for strained relationships. |
| `shiva-parvati` | *Parvati placing a wedding garland on Shiva* (recto), Kalighat album, c. 1890 | Kolkata, Kalighat | https://clevelandart.org/art/2003.108.a | **CC0** | Marriage & husband–wife concerns hero; explorer | Full; focus 50% 35% | The divine marriage of Shiva and Parvati. |
| `vishnu-lakshmi` | *Vishnu and Lakshmi on Garuda*, c. 1750 | Rajasthan, Bundi school | https://clevelandart.org/art/1990.38 | **CC0** | Family problems hero; marriage-family on index | Full; focus 52% 45% | The divine couple as an image of household partnership. Deliberately **not** placed on the money page, to avoid implying prosperity. |
| `ganesha` | *Ganesha*, Kalighat, c. 1890 | Kolkata, Kalighat | https://clevelandart.org/art/2003.166 | **CC0** | Home spiritual section (Fig. 4); Negative energy hero; spiritual on index | Full; focus 50% 30% | Ganesha is widely revered as remover of obstacles; captioned as such alongside “repeated obstacles” copy. No remedy is implied. |
| `budha` | *Mercury (Budha)*, from a Mandi astrology series, c. 1810 | Attributed to Sanju; Pahari kingdoms | https://clevelandart.org/art/2020.433 | **CC0** | Vedic astrology hero; home readings card; readings explorer | Pink mount removed, keeping the painted border | A graha personified in an Indian astrological painting — genuinely within the Jyotiṣa visual tradition. |
| `taurus` | *Taurus*, from a “Mandi astrology series”, c. 1810 | Attributed to Sanju; Pahari kingdoms | https://clevelandart.org/art/2020.432 | **CC0** | Business & financial concerns hero; readings on index | As above | Vṛṣabha, the bull, with ploughing farmers — work and livelihood. Caption is factual. |
| `palm-diagram` | *Hand covered in various symbols* (manuscript) | Historical European chiromancy manuscript; no named creator in record | https://wellcomecollection.org/works/mxr8r6sk (IIIF `L0068573`) | **Public Domain Mark**; credit “Wellcome Collection” | Palm reading hero; home readings card | Scan edges trimmed | Captioned explicitly as **European** chiromancy. It is not an Indian palmistry text. |

## Photographs (Unsplash License — free commercial use, attribution not required but given)

| Key | Subject | Photographer | Asset page | File | Placement | Treatment |
|---|---|---|---|---|---|---|
| `jantar-mantar` | 18th-century masonry sundial (yantra), Jantar Mantar, Jaipur | Ravi Kumar Meena | https://unsplash.com/photos/a-large-circular-structure-with-a-clock-0k3ohtAd7DU | `images.unsplash.com/photo-1660736701150-975a90ce2d9e` | Home practice (Fig. 2, parallax); Career & education hero; work-life on index | Warm grade via CSS (`saturate .8, sepia .14`) |
| `lepakshi` | Carved pillared hall, Lepakshi, Andhra Pradesh | Suhas Hanjar | https://unsplash.com/photos/Lbk0MFbKfAY | `photo-1768045854432-3ebb0b2e8fe9` | Home portrait placeholder (labelled); About hero; Psychic guidance hero | Warm grade |
| `diyas` | A tray of lit oil lamps (diyas), Pune | Anunay Mahajan | https://unsplash.com/photos/b3C9D_fnVdo | `photo-1637049020399-50470ff722c6` | Final CTA background (screen blend); Contact hero; Spiritual guidance hero | Warm grade, 35–45% opacity |
| `temple-corridor` | Pillared temple corridor, Chennai | Pushpatej | https://unsplash.com/photos/aXflUJ_1ISA | `photo-1658130434650-10e1919a8275` | Home “How it works” (Fig. 5); Childless couples hero | Warm grade |

All four asset pages state “Free to use under the Unsplash License” and are not Unsplash+.

## Candidates reviewed and rejected
| Candidate | Reason |
|---|---|
| CMA *Yasoda with Krishna churning butter* | A mother-and-child image on the childless-couples page could read as a promise. |
| CMA *Gajalakshmi*, *Lakshmi and Sarasvati* | Lakshmi on finance pages risks implying wealth outcomes. |
| CMA *Krishna Steals the Clothes…*, *Five Poses of Krishna…* | Narrative content unsuitable for a consultation site. |
| Wellcome *Ptolemy and Euclid with an armillary sphere* | Figures dominate; weaker than the Indian astrology series. |
| Wellcome *R. W. Seale armillary sphere* (used in the previous demo) | Replaced by the Indian Mandi astrology paintings. |
| Unsplash *diya on a plate* (Sarvesh Phansalkar) | Cluttered paper wrappers in frame. |
| Previous demo's notebook (Ana Miranda) and palm (Om Prakash Sethia) photos | Off-concept for the new direction. They are no longer shipped, and their files were removed. |

## Client imagery (original site) — not reused
- `logo2.png` (Krishna logo, “Pandith Thulasidas”): the client's mark. It informed the art direction, but was not copied because it is a raster with unknown authorship and file quality. The owner can supply a vector version.
- Banners `slider1–3.png`, `ls.jpg`, `bm.jpg`, `spl-banner.gif`: stock or AI-like composites with guarantee badges, voodoo-doll and tarot imagery. Provenance and rights are unknown, and they carry claims the redesign removes.
- `shiv-img.gif`: labelled “Pandit Thulasidas Astrology”, but it is a stock-couple “Get love back” advertisement, **not a portrait**. No photograph of the practitioner exists on the site, so the portrait slot is marked “Awaiting a client-approved photograph”.
- Testimonial avatars (`img-1…4`): blurred stock; not used.

## Original work
- Rāśi Chakra, aṣṭadala ornament and all linework: original SVG authored for this project.
- OG/Twitter card (`src/app/opengraph-image.png`): composed from local fonts and the CC0 hero painting by `scripts/render-og.mjs`.
- Fonts, all SIL Open Font License 1.1 (licence files in `src/fonts/`): Cormorant Garamond, Manrope and Tiro Devanagari Sanskrit.
