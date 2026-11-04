import type { Faq } from "./catalogue";

/** General FAQs (home + /faq). Answers avoid fixed fees, durations or guarantees. */
export const generalFaqs: readonly (Faq & { home?: boolean })[] = [
  {
    q: "How do I book a consultation?",
    a: "Send a WhatsApp message or call +61 426 562 158. Say which kind of consultation you are interested in and ask about availability. The contact page can also help you draft a message — nothing is sent until you press Send in WhatsApp.",
    home: true,
  },
  {
    q: "Can I have a consultation by phone?",
    a: "The original website states that phone consultations are available for clients across Australia. Confirm the format when you enquire.",
    home: true,
  },
  {
    q: "What should I prepare?",
    a: "Ask what is useful for the reading you have chosen. A horoscope reading usually needs your date, time and place of birth; a palm reading may not. You do not need to send personal details in your first message.",
    home: true,
  },
  {
    q: "How much does a consultation cost?",
    a: "Fees are not published on this site. Please ask for the current fee and the usual length of a session before you book.",
    home: true,
  },
  {
    q: "Where are consultations held?",
    a: "Pandit Thulasidas is based in Merrylands, Sydney (9 Addlestone Rd, Merrylands NSW 2160, as listed on the original site). Visits are by appointment — please confirm arrangements when you enquire.",
  },
  {
    q: "Is everything I say kept private?",
    a: "Consultations are private and one to one. If you have questions about how notes or contact details are handled, ask when you enquire.",
    home: true,
  },
  {
    q: "Can a consultation guarantee a result?",
    a: "No. Astrology, psychic and spiritual consultations offer a traditional perspective for personal reflection. Experiences vary, and no specific outcome is guaranteed.",
  },
  {
    q: "Do I need to share my beliefs or be Hindu?",
    a: "No. People of many backgrounds seek traditional Vedic astrology and spiritual guidance.",
  },
];

export const steps = [
  {
    n: "i",
    title: "Reach out",
    body: "Message on WhatsApp or call. Name the area you would like to discuss — love, family, work, a reading or a spiritual concern — and ask about availability.",
  },
  {
    n: "ii",
    title: "Agree the format",
    body: "Confirm whether the consultation is by phone or in person, what to prepare (birth details for a horoscope, for example) and the current fee.",
  },
  {
    n: "iii",
    title: "Bring your question",
    body: "Arrive with the one question that matters most. The consultation is private and one to one, and shaped around your circumstances.",
  },
] as const;

/** Each principle is drawn from wording already on the original website. */
export const principles = [
  { title: "Private and one to one", body: "“Each consultation is handled privately and respectfully.”" },
  { title: "Without judgement", body: "Concerns are discussed “without judgement”, whatever their nature." },
  { title: "No guaranteed outcomes", body: "Consultations do not “guarantee specific outcomes” or control another person's choices." },
  { title: "Professional advice first", body: "Guidance never replaces “medical, psychological, legal or financial advice.”" },
] as const;
