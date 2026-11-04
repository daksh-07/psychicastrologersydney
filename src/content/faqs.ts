export type Faq = { id: string; question: string; answer: readonly string[]; preview?: boolean };

export const faqs: readonly Faq[] = [
  {
    id: "how-to-enquire",
    question: "How do I enquire about a consultation?",
    answer: [
      "Send a WhatsApp message or call the number on this site. Say which kind of consultation you are interested in and ask about availability.",
      "If you prefer, the contact page can help you draft a short WhatsApp message. Nothing is sent until you press Send inside WhatsApp.",
    ],
  },
  {
    id: "phone-consultation",
    question: "Can I enquire about a phone consultation?",
    answer: [
      "Yes. Ask about phone availability when you get in touch, and confirm the format before you book.",
    ],
    preview: true,
  },
  {
    id: "prepare",
    question: "Do I need to prepare anything?",
    answer: [
      "Ask what information is useful for the reading you have chosen. A horoscope reading usually draws on birth details; a palm reading may not.",
      "It helps to write down the one question you most want to discuss. You do not need to send personal details in your first message.",
    ],
    preview: true,
  },
  {
    id: "fees",
    question: "How much does a consultation cost?",
    answer: [
      "Fees are not listed on this site. Please ask for the current fee and the usual length of a session before you book.",
    ],
    preview: true,
  },
  {
    id: "location",
    question: "Where are consultations held?",
    answer: [
      "Pandit Thulasidas is based in Sydney, NSW. Ask about in-person arrangements and the exact location when you enquire.",
    ],
  },
  {
    id: "scope",
    question: "What can a consultation offer?",
    answer: [
      "A consultation offers a traditional perspective on a personal question, for your own reflection. It is not a prediction of fixed outcomes and does not replace professional advice.",
    ],
  },
];
