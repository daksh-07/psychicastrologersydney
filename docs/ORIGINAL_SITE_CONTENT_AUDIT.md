# Original site content audit — psychicastrologersydney.com.au

Crawled 4 November 2026 (Sydney) with direct HTTP fetches of every internal `.php` URL found in navigation, body links and footers. The internal link graph closes at **15 pages**. There is no `sitemap.xml` and no `robots.txt` (both return 404). No forms were submitted and no calls or messages were made.

## Site-wide findings

| Area | Observation | Treatment in redesign |
|---|---|---|
| Brand | The logo reads **“Pandith Thulasidas — Best Astrologer in Sydney”** and features **Lord Krishna with flute and peacock feather**. Page copy uses “Pandit”. | Use “Pandit Thulasidas” as in the body copy; flag the spelling for the owner. Krishna/peacock iconography is the client's own devotional motif and guides the art direction (public-domain Krishna painting, peacock-feather linework). The practitioner's personal practice is not described. |
| Phones | **+61 426 562 158** appears in the hero, sticky actions, services, contact block, footer and every service-page CTA. **+61 470 325 836** appears only in the top utility strip, with tel: and WhatsApp links. | +61 426 562 158 is the single number. The second number is excluded pending owner confirmation. |
| Email | Four variants: `Thulasidas@gmail.com` (header), `thulasidas@gmail.com` (contact block), `astrothulasidas@gmail.com` (footer), `astrosaikrishna19@gmail.com` (footer). One mailto points to `sri@gmail.com`, and several mailtos contain leading whitespace. | **No email is shown**; the current address can't be verified from the site. |
| Address | 9 Addlestone Rd, Merrylands NSW 2160, Australia (contact block + footer). | Shown on Contact and in the footer, with “confirm visit arrangements when you enquire”. Plain map link only, no embed. |
| Coverage | “Available in these cities: Melbourne, Sydney, Queensland, Victoria” (mixes cities and states). “Phone consultations are available across Australia.” | Phrased as “Sydney, with phone consultations available on enquiry”. The city/state grid is not reproduced. |
| Experience | “With more than 25 years of experience…” (home); “25 years” badges on banners. | Shown once, attributed (“The current website states…”) and marked **awaiting confirmation**. |
| Guarantees | Banners: “100% satisfaction guaranteed”, “Solve all your problems in just one phone call”, “Specialist in love spells caster”, “Get solution in one call”. | **Not reproduced.** The original's own newer disclaimers (“no guaranteed outcomes”) are kept in spirit. |
| Testimonials | Four reviews (Joy, Williamson, Mary, Kristina) styled as **“Google Reviews ★★★★★”** with blurred stock avatars. Provenance is unverified. | **Omitted.** Reinstate only with verified source and permission (ACCC guidance). |
| “Ask 1 Question Free” | Nav item linking to the ordinary contact page; no terms are stated. | Omitted until the owner supplies terms. |
| Technical | 8 of 15 pages have no `<h1>`. Titles are duplicated (“Pandit Thulasidas \| Best Astrologer in Sydney”) on 7 pages, with empty meta descriptions. There are no canonicals. **8 pages print a PHP warning exposing a server path** (`include(footer.php) … /home/sv8jmhg92wf3/public_html/…`). Content is repeated verbatim between H1 intro and H2. Image-text banners carry the key copy. | One H1 per page, unique titles/descriptions, no repeated intros, all copy as live text, shared footer. |
| Imagery | `logo2.png` (Krishna logo). Banners `slider1–3`, `ls.jpg`, `bm.jpg`, `spl-banner.gif` show a candlelit Ganesha statue, a voodoo doll, a mystic woman with an orb, tarot cards and smudge sticks — stock/AI-like, with guarantee badges. `s1/s2.jpg` and `Childless-Couple.jpg`/`court-cases.jpg` are generic stock. `shiv-img.gif` (alt “Pandit Thulasidas Astrology”) is a **stock-couple “Get love back” ad, not a portrait**. Client avatars are blurred stock. | **None reused.** The rights and provenance of these banners are unknown, and they carry the claims being removed. **No photograph of the practitioner exists on the site**, so the portrait slot is marked “awaiting client photograph”. |
| Fonts | Seven Google font families plus two Font Awesome versions. | Two self-hosted families plus one Devanagari face. |

## Page-by-page

### 1. Home — `/index.php` (also `/`)
- **Title:** “Pandit Thulasidas | Best Astrologer in Sydney”. Description empty. No H1.
- **Topic:** practitioner overview plus service hub.
- **Business info:** “Experienced Vedic Astrologer & Spiritual Advisor”; “Indian astrologer in Sydney offering traditional Vedic astrology, horoscope reading, palm reading and spiritual guidance to clients across Australia”; phone consultations across Australia.
- **Problems addressed:** love, marriage, relationships, family disputes, career, business, money, education, negative energy, spiritual guidance, plus **childless couple**, **court cases** and **black magic removal** in “Our Special Services”.
- **CTAs:** a WhatsApp enquiry form (name, phone, service select: Love Marriage / Couple Problems / Family Problems / Palm Reading / Horoscope Reading / Negative Energy Removal / Other), “Call Now” on every card, and “Speak With Pandit Thulasidas +61 426 562 158”.
- **Worth preserving:** “Personal and confidential guidance”; the WhatsApp-first enquiry idea; the category groupings (Love & Relationship · Marriage · Palm & Horoscope · Spiritual Guidance); the newer disclaimer wording.
- **Do not copy:** “Best Astrologer”, “Get Solution In One Call”, star ratings, the 25-year claim as fact, “Quick response”.

### 2. About — `/about-us.php`
- **Title:** duplicate default. No H1 (H4 “About Pandit Thulasidas”).
- **Content:** “Astrologer & Psychic in Sydney”; one-to-one consultations tailored to the individual; services list; love & relationship consultations; palm & horoscope; spiritual guidance for “negative energy, recurring obstacles, evil-eye beliefs”; “Appointments can be arranged by phone or WhatsApp”; disclaimer (“personal guidance and entertainment”).
- **Worth preserving:** private and respectful handling; “traditional astrology or psychic perspective that may help clients better understand their circumstances and possible choices”; the evil-eye framing as *belief*.

### 3. Contact — `/contact-us.php`
- **Title:** duplicate default. H4 “Contact Thulasidas ji”.
- **Content:** a legacy POST form (`thankyou.php`), “For all your problems tensions… helps you to solve the problems”, testimonials.
- **Treatment:** replaced by a direct call/WhatsApp page with a transparent message composer. The “solve the problems” line is not reproduced.

### 4. Love Marriage — `/love-marriage.php`
- **Title:** “Love Marriage Astrologer in Sydney | Pandit Thulasidas”. H1 present. PHP warning.
- **Topics:** compatibility, **family approval**, timing, long-term understanding.
- **Keywords:** love marriage astrologer Sydney, compatibility.
- **Preserve:** “compatibility, family approval, timing”.

### 5. Love Marriage Problems (nav label)
Links to `love-marriage.php`, so it is the same page as #4.

### 6. Couple Problems — `/couple-problems.php`
- **Title:** “Couple Problems & Relationship Guidance Sydney | Thulasidas”.
- **Topics:** communication, misunderstandings, emotional distance, recurring disagreements; couples *and individuals*.
- **Preserve:** “focus on your individual circumstances rather than a one-size-fits-all approach”.

### 7. Get Your Love Back — `/get-love-back.php`
- **Title:** “Get Your Love Back Guidance Sydney | Pandit Thulasidas”.
- **Topics:** breakup, separation, reconciliation, reconnecting with a former partner; “No Guaranteed Outcomes”.
- **Preserve:** the reconciliation questions plus the no-guarantee statement. **Avoid** any implication of influencing an ex-partner.

### 8. Extra Marital Issues — `/extra-marital.php`
- **Title:** duplicate default. Long-form.
- **Topics:** trust, emotional distance, separation, uncertainty; “rather than control another person's decisions or guarantee a particular relationship outcome”; “without judgement”.
- **Preserve:** the non-judgemental and non-control framing.

### 9. Family Problems — `/family-problems.php`
- **Title:** “Family Problems Astrology Guidance Sydney | Pandit Thulasidas”.
- **Topics:** communication, marriage, expectations, finances, long-standing disagreements. Home cards add “Family Disputes” and “Husband Wife disputes”.

### 10. Palm Reading — `/palm-reading.php`
- **Title:** “Palm Reading in Sydney | Pandit Thulasidas”.
- **Topics:** major lines, markings and patterns; personality, relationships, career, life themes; bring your own questions.

### 11. Horoscope Reading — `/horoscope-reading.php`
- **Title:** “Horoscope Reading Sydney | Indian Astrologer Pandit Thulasidas”.
- **Topics:** birth details, birth chart, relationships, career, marriage, family, personal direction; specific questions rather than general horoscope.

### 12. Business Problems — `/business-problems.php`
- **Title:** duplicate default. Long-form.
- **Topics:** financial pressure, slow growth, losses, partnerships, competition, starting/expanding, workplace difficulties; disclaimer that it is not financial/business/legal advice.

### 13. Money Problems — `/money-problems.php`
- **Title:** duplicate default.
- **Topics:** financial stress, unexpected expenses, debt concerns, business losses; “does not replace professional financial planning or investment advice”.

### 14. Education Problems — `/education-problems.php`
- **Title:** duplicate default.
- **Topics:** course choice, concentration, exam stress, career selection, career change; students *and parents*; disclaimer (“do not guarantee academic results… admission or employment”).

### 15. Negative Energy Removal — `/negative-energy.php`
- **Title:** “Negative Energy Cleansing Guidance Sydney | Pandit Thulasidas”. H1 “Negative Energy Guidance in Sydney”.
- **Topics:** repeated obstacles, lack of personal balance; “not a substitute for medical or mental-health care”.

### 16. Black Magic Concerns — `/black-magic.php`
- **Title:** “Black Magic Concerns & Spiritual Guidance Sydney | Thulasidas”.
- **Topics:** black magic, evil eye, negative influences, unexplained recurring concerns; “without guaranteeing specific outcomes”.

### Topics advertised without their own page
- **Childless Couple:** home “Special Services” card — “Traditional astrological consultation for family planning concerns and related spiritual guidance.”
- **Court Cases:** home card — “Astrological guidance for legal stress, disputes and difficult court-related situations.”
- **Psychic guidance / psychic reading:** About page and banners (“Palm & Psychic Readings”).
- **Traditional remedies:** testimonial wording (“spiritual guidance and traditional remedies”).
- **Lord Hanuman puja:** image alt text only; no service copy.

## Assessment of the current demo (feat/celestial-almanac-demo @ 8df44db)

The screen recording was not available in this session, so the assessment uses the deployed preview and the screenshots in `docs/screenshots/`.

| Keep | Redesign | Remove |
|---|---|---|
| Single contact config. WhatsApp composer logic (validation, review step, single encode). noindex default plus header. Legacy URL map. Typed content model. Reduced-motion handling. Local fonts. e2e harness. | **Visual identity** (generic ink/brass, weak contrast between sections). **Typography** (one serif weight, no italic voice, no scale drama). **Homepage narrative** (rows and steps read as a template). **Service catalogue** (5 grouped pages, missing most original topics). **Imagery** (three unrelated photos, no cultural anchor). **Motion** (one CSS stroke draw). **Navigation and mobile menu** (functional but unremarkable). **Inner-page compositions** (all identical). | Repeated small row cards. Plate “detail” box in the practitioner section. “Ink on paper” caption filler. The palm photograph (tone mismatch with the new warm palette). |
