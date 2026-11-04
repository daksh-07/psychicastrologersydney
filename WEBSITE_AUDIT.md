# Website audit — Psychic Astrologer Sydney
4 November 2026, Sydney. Speculative redesign research for Everest Marketing.

## Scope and evidence
Live Chrome inspection covered the homepage, About, Contact, Palm Reading and Horoscope Reading. The desktop homepage was captured. Mobile viewport emulation was unavailable on the browser surface, so there is no mobile screenshot or verified mobile menu test. Chrome DOM checks supplied headings, metadata, link targets and form actions. No real calls, messages or forms were sent. No field CWV or lab speed run was obtained. Other services below are an inventory of published navigation and homepage content, not a full crawl.

| Page | Observed | Demo consequence |
|---|---|---|
| [Home](https://psychicastrologersydney.com.au/) | Black utility strip with boxed yellow copy, blue appointment banner, white navigation, gold/white image-based carousel with arrows/dots and fixed call/WhatsApp controls. Sample H2 uses Open Sans. Browser title “Pandit Thulasidas \| Best Astrologer in Sydney”, empty description, no H1 or canonical found in DOM. Hero combines condensed uppercase headlines, ornate serif name, dramatic artwork, years badge and satisfaction guarantee. | Replace the image-based headline with selectable HTML, one factual H1 and one focal graphic. Put name, role, location and contact on the first screen. |
| [Home alias](https://psychicastrologersydney.com.au/index.php) | Logo and Home link point to index.php, which search also retrieves. | Map alias to root on an approved migration. Check redirects and canonicals before release. |
| [About](https://psychicastrologersydney.com.au/about-us.php) | Reuses home title and blank description, no canonical surfaced. The practitioner introduction precedes generic review and city blocks. No H1 surfaced. A form has POST action thankyou.php. | Write a concise practitioner page with its own H1 and metadata. Move contact to a consistent component. |
| [Contact](https://psychicastrologersydney.com.au/contact-us.php) | Same title and blank description, no H1 or canonical surfaced. Legacy form posts to thankyou.php. A map, reviews, location slider and footer follow. Free-question nav uses this same route. | One page with direct channels and explicit WhatsApp handoff. Remove distractions and avoid an unverified free offer. |
| [Palm Reading](https://psychicastrologersydney.com.au/palm-reading.php) | Specific title, descriptive meta and H1. Intro repeated under near-identical H2. More Services list and contact links exist. Visible PHP warning reports a missing footer include and exposes a server filesystem path. | Preserve the search intent, remove duplicate intro, render a shared footer. |
| [Horoscope Reading](https://psychicastrologersydney.com.au/horoscope-reading.php) | Specific title, descriptive meta and H1. Same duplicate-intro pattern and visible PHP footer warning. | Preserve the intent, explain the birth-chart reading clearly, link to enquiry. |

## Contact reconciliation
- **+61 426 562 158** appears in the homepage hero art, main WhatsApp block, sticky actions, service links and footer. Published destinations are `tel:+61426562158` and `https://wa.me/61426562158`. It is the strongest on-site candidate for a configurable preview default. Ownership, deliverability and preferred routing are unconfirmed.
- **+61 470 325 836** appears in the utility strip with both tel and WhatsApp destinations. Keep this conflict out of the client-facing UI and obtain owner confirmation before an approved launch.
- The visible `thulasidas@gmail.com` in the homepage contact card resolves to `mailto:sri@gmail.com`. The header uses the displayed Thulasidas mailbox. The footer and service header also show variants involving astrothulasidas@gmail.com and astrosaikrishna19@gmail.com, and some footer mailtos contain encoded leading spaces. Omit email until reconciled. A footer Facebook icon resolves back to the homepage.
- The homepage/footer list **9 Addlestone Rd, Merrylands NSW 2160**. The address link returns to the homepage while an embedded map provides its own destination. Sydney is sufficient for demo copy. Confirm current address, appointment policy and listing identity before adding a map or structured address.
- The homepage WhatsApp form asks for name, phone, topic and message. Its form element had no action attribute. The UI describes a WhatsApp handoff. Destination of the JS submission was not exercised. About/Contact use a different legacy POST form. Server-side handling, retention and security were not established.
- The free-question navigation label exists, but its destination is the ordinary Contact page. Eligibility, duration, cost conditions and current availability cannot be confirmed. Suppress it until the owner supplies terms.

## Published offering and safe demo grouping
- **Readings:** Vedic astrology, horoscope/birth-chart reading, palm reading, psychic guidance.
- **Relationships and family:** love marriage, couple concerns, separation and reconciliation enquiries, extra-marital concerns, family disputes and compatibility concerns.
- **Work and decisions:** career, education, business and money concerns.
- **Spiritual consultations:** spiritual concerns, negative-energy concerns and black-magic-related enquiries as described by the site.
- **Sensitive topics also advertised:** childless couples/family planning and court cases. Keep these off the demo’s navigation and avoid sales language that implies treatment, legal outcomes or financial improvement. No dates, credentials, fees, ratings or timelines were independently established.

## Trust, content and imagery
The site presents four named, five-star testimonials under Google-style branding. Their origin and authorship were not independently verified. No review or aggregate rating should ship in the demo. The homepage states more than 25 years and the banner uses a satisfaction guarantee. Treat these as self-published claims and omit them. Existing disclaimers say experiences vary but the visual promises remain prominent. Use concrete descriptions of private consultations and a plain guidance disclaimer. See [ACCC guidance on claims and testimonials](https://www.accc.gov.au/consumers/advertising-and-promotions/false-or-misleading-claims).

Public assets include the logo, relationship-themed slider banners, consultation promos, testimonials and service illustrations. The asset labelled “Pandit Thulasidas Astrology” points to `images/shiv-img.gif`. That label does not establish a verified practitioner portrait. Use original vector artwork in the demo and request owner-approved photography for launch. Do not infer how the existing assets were produced.

## Mobile, accessibility, performance and privacy follow-up
- A viewport meta tag is present. Validate the dropdown, floating CTA collisions, cropped slide text, contact labels and tap sizes at 320/390 px when viewport control is available. Treat these as risks to test.
- Desktop AX tree exposed unnamed city-slider buttons and icon-heavy links. Image-rendered hero copy and duplicated generic image labels obscure meaning for nonvisual navigation. Check focus, carousel pause and contrast in a full accessibility pass.
- Slider imagery, GIFs and a map iframe are plausible payload contributors. Measure before assigning impact. Collect Lighthouse lab data and separate field CWV if available.
- No dedicated privacy route was visible in the inspected homepage/footer navigation. Data handling, policy elsewhere, robots/sitemap completeness and search performance remain unconfirmed.

## Priority
P0: one contact config, honest hero, accessible navigation and visible enquiry, trustworthy content, no PHP leakage in replacement. P1: unique metadata and contextual service links, preserve legacy URL equity, confirm assets/contact/address. P2: measure CWV and check indexed URLs with owner-approved access before any domain migration.
