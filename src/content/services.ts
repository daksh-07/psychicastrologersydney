import type { ImageKey } from "./images";
import type { TopicSlug } from "./topics";

export type ServiceSlug = Exclude<TopicSlug, "general">;

export type ContentBlock = {
  heading: string;
  paragraphs: readonly string[];
  list?: readonly string[];
};

export type Service = {
  slug: ServiceSlug;
  number: string;
  /** Row title on index pages. */
  title: string;
  /** Page H1. */
  h1: string;
  /** Short label used in breadcrumbs and related links. */
  short: string;
  /** One-line summary shown on the homepage index. */
  rowSummary: string;
  /** Longer summary on /consultations. */
  indexSummary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  blocks: readonly [ContentBlock, ContentBlock];
  preparation: { heading: string; questions: readonly string[] };
  related: readonly ServiceSlug[];
  ctaHeading: string;
  ctaBody: string;
  /** Optional editorial image, placed beside the first content block. */
  figure?: ImageKey;
};

export const services: readonly Service[] = [
  {
    slug: "vedic-astrology",
    number: "01",
    title: "Vedic astrology & horoscope",
    h1: "Vedic astrology and horoscope readings",
    short: "Vedic astrology",
    rowSummary: "A traditional birth-chart reading for a question you want to think through.",
    indexSummary:
      "Jyotish, the Vedic tradition of astrology, reads the sky at the time of birth. A horoscope consultation uses that chart as the starting point for a conversation about the question you bring.",
    metaTitle: "Vedic astrology and horoscope readings in Sydney",
    metaDescription:
      "Private Vedic astrology and horoscope (birth-chart) consultations with Pandit Thulasidas in Sydney. Learn what a reading involves and how to enquire.",
    intro:
      "A Vedic horoscope reading begins with a birth chart and a question. Pandit Thulasidas works within the Jyotish tradition, using the chart as a framework for a private, one-to-one conversation.",
    blocks: [
      {
        heading: "What a birth-chart reading involves",
        paragraphs: [
          "In Vedic astrology the chart is drawn from the date, time and place of birth. The reading looks at how traditional placements and periods are interpreted, and relates them to the matter you have come to discuss.",
          "The aim is a considered perspective, not a list of fixed predictions. You remain the person who weighs what is said and decides what it means for you.",
        ],
      },
      {
        heading: "Subjects people bring",
        paragraphs: [
          "Most people arrive with one main question. It often helps to name it plainly before the session starts.",
        ],
        list: [
          "A decision about work, study or a move",
          "Questions about marriage or a relationship",
          "Family matters and timing within a household",
          "A sense of direction during a period of change",
        ],
      },
    ],
    preparation: {
      heading: "Before you share details",
      questions: [
        "Which birth details are useful for this reading, and how should I share them?",
        "Is the reading available by phone, or in person in Sydney?",
        "What are the current fees and the usual length of a session?",
      ],
    },
    related: ["palm-reading", "career-and-business", "relationships-and-family"],
    figure: "sphere",
    ctaHeading: "Ask about a horoscope reading",
    ctaBody:
      "Start with a short message. You do not need to send birth details online — ask what will be useful first.",
  },
  {
    slug: "palm-reading",
    number: "02",
    title: "Palm reading",
    h1: "Palm reading in Sydney",
    short: "Palm reading",
    rowSummary: "Traditional palmistry: reading the lines and markings of the hand.",
    indexSummary:
      "Palmistry is a traditional practice of reading the shape, lines and markings of the hands. A palm reading offers another way into a personal question, alongside or apart from a chart.",
    metaTitle: "Traditional palm reading in Sydney",
    metaDescription:
      "Traditional palmistry consultations with Pandit Thulasidas in Sydney. What a palm reading looks at, topics to discuss and questions to ask first.",
    intro:
      "Palm reading works from what is in front of you: the hands themselves. In traditional palmistry the lines, mounts and markings are read as a set of symbols to reflect on together.",
    blocks: [
      {
        heading: "How the hand is read",
        paragraphs: [
          "A traditional reading considers the overall shape of the hand and fingers, the principal lines and the smaller markings between them. Each is interpreted according to long-standing conventions of the practice.",
          "These interpretations are symbolic. They are not a medical or physical assessment of the hand, and nothing in a reading should be treated as a diagnosis.",
        ],
      },
      {
        heading: "What you might discuss",
        paragraphs: [
          "A palm reading can be open-ended, or you can bring a focus. People often use it to think about temperament, relationships, working life or a choice they are weighing.",
          "Some people pair a palm reading with a horoscope consultation; others prefer the directness of the hand on its own. You can ask which approach suits your question.",
        ],
      },
    ],
    preparation: {
      heading: "Questions to ask first",
      questions: [
        "Is palm reading offered in person only, or also by video?",
        "Is it best on its own or alongside a birth-chart reading?",
        "What are the current fees and the usual length of a session?",
      ],
    },
    related: ["vedic-astrology", "spiritual-guidance", "relationships-and-family"],
    figure: "palm",
    ctaHeading: "Ask about a palm reading",
    ctaBody: "Send a short message to ask about format and availability before you book.",
  },
  {
    slug: "relationships-and-family",
    number: "03",
    title: "Relationships & family",
    h1: "Relationships and family",
    short: "Relationships and family",
    rowSummary: "Marriage, compatibility, separation and the dynamics of family life.",
    indexSummary:
      "Questions about a partner, a marriage or the wider family are among the most common reasons people seek a consultation. This is a private space to talk them through from a traditional perspective.",
    metaTitle: "Relationship and family consultations in Sydney",
    metaDescription:
      "Bring a question about marriage, compatibility, separation or family life to a private astrology consultation with Pandit Thulasidas in Sydney.",
    intro:
      "Relationships rarely come with a single, simple question. A consultation gives you room to describe what is happening, in your own words, and to consider it through a traditional astrological lens.",
    blocks: [
      {
        heading: "Questions people bring",
        paragraphs: [
          "Some enquiries are about beginnings — a proposed marriage, or how two people may suit each other. Others concern strain, distance or a separation that has already happened.",
        ],
        list: [
          "Compatibility before marriage or a commitment",
          "Tension or distance within a marriage",
          "Reflecting after a separation",
          "Parents, children, in-laws and household dynamics",
        ],
      },
      {
        heading: "What a consultation can and cannot do",
        paragraphs: [
          "A reading can help you see a situation from another angle and decide what you want to do next. It cannot change another person’s feelings or choices, and no honest consultation will promise that it can.",
          "If a relationship involves safety concerns, please contact the appropriate support service or a qualified professional first.",
        ],
      },
    ],
    preparation: {
      heading: "Questions to ask first",
      questions: [
        "Is it useful to bring details for both people, and what is needed?",
        "Can a family matter be discussed if only one person attends?",
        "What are the current fees and the usual length of a session?",
      ],
    },
    related: ["vedic-astrology", "spiritual-guidance", "career-and-business"],
    ctaHeading: "Ask about a relationship consultation",
    ctaBody: "Describe your question briefly. Keep private details for the consultation itself.",
  },
  {
    slug: "career-and-business",
    number: "04",
    title: "Career & business",
    h1: "Career and business",
    short: "Career and business",
    rowSummary: "Working direction, study choices and business decisions to reflect on.",
    indexSummary:
      "When a decision about work, study or a business feels finely balanced, a consultation offers a structured pause — a chance to set out the options and reflect on them.",
    metaTitle: "Career, education and business consultations in Sydney",
    metaDescription:
      "Reflect on a career change, study choice or business decision in a private astrology consultation with Pandit Thulasidas in Sydney.",
    intro:
      "Work questions are often about timing and fit: whether to change roles, what to study, or how to approach a business decision. A consultation treats these as subjects for reflection rather than forecasts.",
    blocks: [
      {
        heading: "Subjects for reflection",
        paragraphs: [
          "It helps to arrive with the options already named. A consultation can then focus on how each sits with you, rather than on gathering information.",
        ],
        list: [
          "Changing role, field or employer",
          "Choosing a course or area of study",
          "Starting, growing or stepping back from a business",
          "Balancing work with family commitments",
        ],
      },
      {
        heading: "A perspective, not a forecast",
        paragraphs: [
          "Astrology does not predict market movements, returns or the outcome of an interview. Treat anything discussed as one input among many.",
          "For money, contracts, tax or investment questions, speak with a licensed financial adviser, accountant or lawyer before you act.",
        ],
      },
    ],
    preparation: {
      heading: "Questions to ask first",
      questions: [
        "Is it better to bring one decision, or a few related ones?",
        "Is the consultation available by phone?",
        "What are the current fees and the usual length of a session?",
      ],
    },
    related: ["vedic-astrology", "palm-reading", "spiritual-guidance"],
    ctaHeading: "Ask about a career or business consultation",
    ctaBody: "Name the decision in a sentence. The detail can wait for the session.",
  },
  {
    slug: "spiritual-guidance",
    number: "05",
    title: "Spiritual guidance",
    h1: "Spiritual guidance",
    short: "Spiritual guidance",
    rowSummary: "A traditional, private conversation about a personal concern.",
    indexSummary:
      "Not every question fits a category. A spiritual consultation is a quiet, traditional setting to talk about something that has been weighing on you.",
    metaTitle: "Spiritual guidance consultations in Sydney",
    metaDescription:
      "Private, grounded spiritual consultations with Pandit Thulasidas in Sydney — a traditional setting to discuss a personal concern.",
    intro:
      "A spiritual consultation is an unhurried conversation about a personal concern, held within a traditional framework. You decide what to share and how much.",
    blocks: [
      {
        heading: "A place to talk it through",
        paragraphs: [
          "Some people come with a specific worry; others with a general unsettled feeling or a wish to reconnect with tradition. Both are reasonable starting points.",
          "The consultation draws on traditional spiritual practice to offer reflection and perspective. It moves at your pace and stays focused on what you want to discuss.",
        ],
      },
      {
        heading: "Grounded expectations",
        paragraphs: [
          "Guidance here is offered for reflection. It is not a substitute for medical, psychological, legal or financial care, and it is not a reason to delay seeking that care.",
          "If you are in distress, please contact your GP or a support line such as Lifeline on 13 11 14.",
        ],
      },
    ],
    preparation: {
      heading: "Questions to ask first",
      questions: [
        "What kind of concerns are suited to a spiritual consultation?",
        "Is it available by phone or in person in Sydney?",
        "What are the current fees and the usual length of a session?",
      ],
    },
    related: ["vedic-astrology", "relationships-and-family", "palm-reading"],
    ctaHeading: "Ask about a spiritual consultation",
    ctaBody: "A brief message is enough to begin. Share more when you are ready.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
