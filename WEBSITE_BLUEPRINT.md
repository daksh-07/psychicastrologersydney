# Website blueprint — The Celestial Almanac

## Scope and positioning
Same-day speculative Everest Marketing preview. “Pandit Thulasidas offers private Vedic astrology, palm reading and spiritual consultations in Sydney.” Site-reported facts are documented in WEBSITE_AUDIT.md. Visual system, copy and sequence below are design proposals. Design and test all core routes before adding optional flourishes.

| Route | Content and search intent | Next step |
|---|---|---|
| / | Sydney Vedic astrologer and overview | WhatsApp or service index |
| /about | Practitioner, tradition, subjects, appointment enquiry | Consultations |
| /consultations | Five editorial rows, short definitions and suitability cues | Individual reading |
| /consultations/vedic-astrology | Horoscope/birth-chart readings | Contact with topic |
| /consultations/palm-reading | Traditional palmistry | Contact with topic |
| /consultations/relationships-and-family | Marriage, family and relationship topics | Contact with topic |
| /consultations/career-and-business | Work, business and education questions | Contact with topic |
| /consultations/spiritual-guidance | Spiritual and personal questions | Contact with topic |
| /faq | Process, preparation, format and guidance limits | Contact |
| /contact | Direct links and WhatsApp message composer | Handoff |
| /privacy | Plain explanation of the demo form and WhatsApp boundary | Back to contact |

## Visual system
- Canvas `#F4EFE4`, paper `#FBF7EF`, ink `#171813`, deep panel `#20211B`, text muted on paper `#56584D`, muted on ink `#D1C8B6`, brass on ink `#C3A46C`, dark brass on paper `#765527`, rules `#D5CDBD` on paper and `#51483A` on ink. Validate contrast on actual combinations. Brass hairlines are decorative. Primary light button ink text on ivory, dark button ivory on ink. Focus ring 2px with 3px offset and context-appropriate colour.
- Instrument Serif regular display, Manrope 400/500/650/700 body and interface. H1 clamp(3rem, 7.4vw, 7.75rem) with line-height .93–.99, tracking -.035em. H2 clamp(2.5rem, 5.3vw, 5.4rem) with line-height .98. Row titles 29–46px. Body 16–18px at 1.6. Eyebrows 11–12px, 700, .14em tracking. Body paragraphs around 58ch.
- Max wrapper 1328px, 12 desktop columns and 24px gaps, 8 tablet and 4 mobile. Margins clamp(20px, 5vw, 80px). Spacing scale 4/8/12/16/24/32/48/64/96/128. Section vertical padding 56–120px. Desktop hero text columns 1–6 and SVG columns 7–12. No fixed hero height on mobile. One-pixel dividers, minimally rounded buttons, tactile paper effect via a subtle authored vector if needed.
- Use an original wordmark set in text. The plate uses concentric circles, 48 short ticks, a radial crosshair, a thin elliptical orbit and an off-axis dot. SVG viewBox 0 0 640 640 with padding for strokes. Limit it to one large composition and one small footer echo. Decorative paths hidden from assistive tech. No copied astronomical charts or fake consultant portraits.

## Homepage wireframe and suggested copy
1. **Header:** text wordmark, Consultations / About / FAQ, WhatsApp enquiry. Mobile has compact label and accessible Menu toggle. Include skip link. Avoid upper utility strip.
2. **Hero:** eyebrow “PANDIT THULASIDAS · SYDNEY”. H1 “Vedic astrology, one to one.” Body “Explore a personal question through Vedic astrology, horoscope reading, palmistry or spiritual consultation.” Primary “Enquire on WhatsApp”. Secondary “Call +61 426 562 158”. Figure caption “FIG. 01 / CELESTIAL STUDY”. Contact actions remain above the artwork in narrow layouts.
3. **Consultation index:** “What would you like to explore?” Numbered rows, one original summary and arrow each. Horoscope and Vedic astrology share a page. Include palm reading, relationships and family, career and business, spiritual guidance. Each whole row is a semantic link with a visible focus state.
4. **Practitioner note:** “Meet Pandit Thulasidas.” Copy “Pandit Thulasidas offers private astrology and spiritual consultations in Sydney. You can bring a question about relationships, family, work or personal direction.” About link. Use a second cropped view of the engraved geometry or original linework until a real portrait is cleared.
5. **What to expect:** “Start with a question.” Three steps: Choose a topic. Ask about availability and format. Bring the question you want to discuss. No fixed session length, fee or booking promise.
6. **FAQ:** native disclosures. “Do I need to prepare anything?” Ask what information may be useful for your chosen reading. “Can I enquire about a phone consultation?” Yes, contact him to discuss availability. “How much does a consultation cost?” Ask for current fees before booking. “What can a consultation offer?” A traditional perspective for personal reflection. Link to FAQ page.
7. **Close:** “Start a conversation.” Dark full-width panel, primary WhatsApp and secondary phone, link to tailored message composer. Footer: route links, Sydney NSW, guidance disclaimer and small “Website concept by Everest Marketing” label. No lead tracking in preview.

## Conversion and privacy
Direct CTAs use a generic prefill or no prefill. Contact form has Name, Contact number, Topic, Optional short message (max 500). Topic may be selected via allowlisted slug. Fields stay in component state. On valid submit display a review of what will be shared and an explicit “Open WhatsApp” action. Explain that WhatsApp receives the draft when opened and the user presses Send there. URL-encode once, use single confirmed-in-config destination, avoid logging, analytics, storage, invisible submit, form URLs or a mock “sent” state. Do not ask for birth details, documents or payment data. Support direct call and a visible number if WhatsApp is unavailable. Verify hrefs with synthetic data without sending. Name 1–80 chars, phone type tel and accept practical international formatting, message optional, inline errors linked to fields and a focusable error summary for invalid submit.

## Motion storyboard
| Interaction | Trigger | Duration / easing | Desktop | Mobile / accessibility |
|---|---|---|---|---|
| Hero plate | Initial paint after CSS load | 850–1100ms, cubic-bezier(.22,1,.36,1) | Draw one orbit and accent only. Base diagram visible from first paint. | Same or shorten to 650ms. Reduced motion shows complete plate. |
| Hero entrance | First render | 400ms with 60ms offsets, ease-out | Fade a decorative line and move the caption 6px | Headline, copy and CTA remain visible and interactive from first render. |
| Service row | Pointer hover or keyboard focus | 160ms ease-out | Rule/arrow responds, 4px translation | Focus equivalent, no hover reliance. |
| Folio accent | First intersection, optional | 450ms ease-out | Single decorative reveal | Always visible without JS, no content masking. |
| Mobile nav | User toggle | 180ms ease-out | N/A | Immediate focus and aria-expanded state. Escape and route change close. |
| FAQ | User activates disclosure | 0–160ms ease-out | Native details/summary and icon flip | Preserve keyboard behavior and announce state natively. |

## Responsive and accessibility acceptance
At 320/375/390/430 no clipped wordmark, headlines or plate and no horizontal overflow. Stack CTAs where necessary, minimum 44px useful hit area. At 768 use a transitional grid without crushed text. At 1024–1600 maintain hierarchy and the split hero. If adding a sticky mobile enquiry dock, show only after hero CTA scrolls out and reserve safe-area and footer space. Simpler default is an accessible header link and repeat CTA. Test 200% zoom, tab order, focus, colour contrast, reduced motion, form labels, native select, browser back, keyboard menus and JS-off public content. Test Chromium and WebKit where available.

## SEO and approved migration
Preview is noindex (metadata plus header if available). Keep preview sitemap disabled or preview-specific with no production submission. Prepare per-route metadata, unique H1, Open Graph artwork, breadcrumbs on details, contextual links and one canonical per route only once the final site origin is configured. No fabricated ratings or locations. Add appropriate entity markup only after verifying business identity and address. Use noindex on preview in code, then explicitly verify removal on approved production launch.

| Existing path | Proposed destination for approved launch |
|---|---|
| /index.php | / |
| /about-us.php, /contact-us.php | /about and /contact respectively |
| /palm-reading.php, /horoscope-reading.php | /consultations/palm-reading and /consultations/vedic-astrology respectively |
| /love-marriage.php, /couple-problems.php, /family-problems.php, /extra-marital.php, /get-love-back.php | /consultations/relationships-and-family after verifying equivalent intent |
| /business-problems.php, /education-problems.php, /money-problems.php | /consultations/career-and-business if aligned. Review money separately. |
| /negative-energy.php, /black-magic.php | Review intent and owner-approved content before mapping to spiritual-guidance. |

Before launch crawl current URLs and sitemap, export GSC/analytics if authorised, preserve useful indexed content, audit redirects as one hop, update NAP and check the destination of every link. These mappings are planning only.

## Implementation
Next.js App Router, strict TypeScript, Tailwind and CSS custom properties. Static server-rendered routes, client islands for menu/composer and optional decorative observer. Typed content and business config, generateStaticParams for detail pages, original SVG asset and local licensed fonts. No backend, accounts, API keys or database. Aim for lightweight first paint, avoid large background video and JS motion packages for the initial build. Validate in browser and take desktop/mobile screenshots. Owner asset request: candid practitioner portrait, verified contact/address/consultation format, any terms for a free offer, source and permission for review use, approved visual reference for any explicitly Vedic chart.
