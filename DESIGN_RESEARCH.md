# Design research — The Celestial Almanac
4 November 2026, Sydney

## Evidence and adaptation matrix
These are live sites or live editorial/showcase pages. “Observed” refers to browser or indexed content review. Proposed transfers are design judgments. Search text does not establish exact fonts, timings or implementation libraries.

| Category and reference | Observed pattern worth studying | Adopt or adapt | Leave behind |
|---|---|---|---|
| [Sara Beckner Astrology](https://sarabeckner.com/) | Practitioner-first framing and dedicated reading paths | Introduce the person and define each session before asking for contact | Copying offers, technique or booking terms |
| [CHANI](https://www.chani.com/) | Distinct editorial voice and clearly separated entry points | A consistent voice for service descriptions and FAQs | App acquisition and subscription patterns |
| [Co–Star](https://www.costarastrology.com/) | Compact, distinctive copy and a strong central premise | One declarative line and deliberate contrast | Its typography, sarcasm and deterministic framing |
| [Astro Research](https://astroresearch.com.au/) | Named Sydney practitioner, technique-led copy, explicit booking and contact channels | Explain the format and distinguish phone and WhatsApp | Superlatives, competitor credentials or Vastu offerings |
| [Astro Research consultation](https://astroresearch.com.au/consult-new/) | Explains what happens before and during a session | Plain-language FAQ and expectations | Presuming birth details, platform, fees or duration for this client |
| [WishAstro Sydney](https://wishastro.com/talk-to-astrologer/city/sydney) | Marketplace sorts readers by topic, availability and language | Bring the topic choice into the enquiry form | Price, review and availability badges that cannot be verified |
| [Story of Eve](https://www.storyofeve.com/) | Four blunt uppercase category statements and tight nav | Editorial rhythm and instantly readable categories | Its photography, gallery-first business funnel |
| [Polène](https://eng.polene-paris.com/) | Product and editorial imagery anchor collection browsing | Let a small set of original images or plates do the visual work | Retail navigation, drawers and campaign images |
| [Norm Architects](https://normcph.com/) | Curated projects, material-led editorial taxonomy | Quiet separators, tactile neutral palette and long/short section rhythm | Architectural imagery or exact compositions |
| [Paloma Events](https://www.palomaevents.co/) | Event-first editorial portfolio and enquiry route | Balance human introduction and clear enquiry | Wedding styling language and borrowed photography |
| [Le Sirenuse](https://sirenuse.it/en/) | Heritage identity alongside practical navigation | Put tradition and contemporary legibility in the same composition | Hotel booking UX or ornate decorative marks |
| [ERA Residence](https://era-residence.com/) | Numbered narrative, strong place-setting, practical call CTA | Folio labels and one sequence of section numbers | Repeated interface text, immersive real-estate flow |
| [Indi Creative](https://indicreativeagency.com.au/) | Australian agency proposition and service grouping | One clear proposition and readily scannable topics | Marketing jargon and agency-specific proof blocks |
| [BASIC/DEPT®](https://www.basicagency.com/) | Strong content blocks and compact labels around projects | Use typographic scale and shorter supporting captions | Its proprietary graphic identity and project transitions |
| [Clay](https://clay.global/) | Clear positioning, work and case-study framing | Put contextual detail behind short confident summaries | Big-agency portfolio metrics and abstract promotional copy |
| [Instrument](https://www.instrument.com/) | Strong opening statement and categorized work | Distinct editorial tiers and simple category navigation | Filters where five linked service rows suffice |
| [Studio Freight](https://studiofreight.com/) | Minimal foreground proposition, JS-led experience | Give the hero one idea and keep its text visible at first paint | JS dependence for essential content |
| [Codrops](https://tympanus.net/codrops/) | Live demos and implementation articles | Isolate one technique, reproduce using original geometry | Bundling an entire demo or assuming reuse rights |
| [Awwwards](https://www.awwwards.com/) / [SiteInspire](https://www.siteinspire.com/) / [Godly](https://godly.website/) | Discovery channels for live experiences | Evaluate the original site and its mobile clarity before adopting an effect | Award-style effects as a substitute for a working enquiry path |

## Recovered project references
All five projects opened in Chrome and their page content was inspected. Prior design directions were recovered through the Everest handover and contextual history. Specific historic screenshot attachments for web type and motion were not recovered. No claim is made to have viewed them.

| Project | Pattern to carry over | Keep project-specific |
|---|---|---|
| [Everest Marketing](https://everestmarketing.com.au/) | Oversized hero statement, coordinates/technical labels, a thematic motif, readable process narrative. Prior contour-line idea informs an original engraved plate. | Mountain geography, motion stack, agency positioning |
| [LC Events](https://lc-events.vercel.app/) | Clear Sydney headline, enquiry next to exploration, occasion-specific hierarchy. Prior preference for polished mobile and restrained motion. | Event slideshow, invitation ornaments and decorative form treatments |
| [Clean Space](https://cleanspacesu.vercel.app/) | Real-work proof, warm editorial framing and quote CTA. Recovered reference pairing Fraunces/Manrope. | Cleaning palette and imagery |
| [D Noir Artzy](https://dnoirartzy.vercel.app/) | Numbered works, material captions, one independent creator as the focus | Artworks, portfolio navigation and brand lettering |
| [Sydney Prime Detailing](https://sydney-prime-detailing.netlify.app/) | Service and city named immediately, direct message beside a service path | Automotive treatment and decoration |

Recovered brief: [EVEREST_PARTNER_CHATGPT_TO_CODEX_MASTER_PROMPT.md](https://chatgpt.com/library?file_id=libfile_6d03933e76388191a009efee9c8d88ef&account_id=personal). Prior preferences also include native scrolling, limited motion engines, direct CTAs and truthful assets. Aman, Papier and form-product references surfaced in contextual history as past inspiration, without an independently inspected historic screenshot set.

## Final direction — The Celestial Almanac
An ink-and-paper editorial identity for a named Sydney practitioner. Set a short, monumental serif headline beside an original brass-lined plate inspired by the visual logic of engraved astronomical instruments. Use a small accession caption, a generous ivory service index, and a dark closing panel. The plate is an abstract illustration. Do not label it a computed birth chart or culturally authoritative Vedic diagram. The practitioner’s tradition lives in respectful language about the work. No faux Sanskrit, sacred iconography or invented interpretation.

**Type selection.** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) for display, [Manrope](https://fonts.google.com/specimen/Manrope) for body and UI. Verify distribution and bundle the corresponding licence with local files. Instrument Serif gives expressive proportions without forcing an excessively large wordmark. Manrope keeps practical information legible. Bodoni Moda is an alternate display study with more fashion-editorial tension. Fraunces has a warmer, more playful voice. Geist is a clean UI fallback. Use one display face and one workhorse throughout.

**Motion research.** [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) supports complex timelines if later needed. For this build, a short SVG stroke animation, CSS transitions and one IntersectionObserver suffice. Native scrolling keeps the reading order stable. Animate authored geometry and deliberate changes of state. Preserve the same useful information with motion off.

Specific technical studies: [Codrops SVG mask transitions](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/) for the controlled reveal boundary, [Codrops scroll-driven SVG map animation](https://tympanus.net/codrops/2026/05/21/creating-scroll-driven-svg-map-animations-with-gsap/) for ordering linework, and [Codrops shape animation](https://tympanus.net/codrops/2022/06/08/how-to-animate-svg-shapes-on-scroll/) for one decorative separator. These are implementation articles, not competitor sites. Extract only the principle of sequencing strokes. Keep the plate unpinned and visible in its resting state. The [Singh Sydney directory](https://singh.com.au/location/sydney_nsw/cat_group/religion-spirituality/) shows local providers positioned around name, suburb and phone, including Jyoti Bavishi and independent Burwood listings. Directory entries are not verified practitioner websites. The demo can match that directness while explaining the service journey more fully.
