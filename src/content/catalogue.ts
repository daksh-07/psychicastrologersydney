import type { ArtKey } from "./art";

/**
 * Service catalogue, derived from the original website (docs/ORIGINAL_SITE_CONTENT_AUDIT.md,
 * docs/SERVICE_INVENTORY.md). Copy is newly written: no guarantees, no fear-based language,
 * no claims of influencing other people or outcomes.
 */

export type CategorySlug = "love" | "marriage-family" | "readings" | "work-life" | "spiritual";

export type Category = {
  slug: CategorySlug;
  numeral: string;
  name: string;
  short: string;
  intro: string;
  tone: "oxblood" | "saffron" | "ink" | "forest" | "umber";
};

export const categories: readonly Category[] = [
  {
    slug: "love",
    numeral: "I",
    name: "Love & relationships",
    short: "Love",
    intro: "Love marriage, couple concerns, separation and trust — talked through privately, without judgement.",
    tone: "oxblood",
  },
  {
    slug: "marriage-family",
    numeral: "II",
    name: "Marriage & family",
    short: "Family",
    intro: "Married life, the wider household, and the hopes families carry for the next generation.",
    tone: "saffron",
  },
  {
    slug: "readings",
    numeral: "III",
    name: "Astrology & readings",
    short: "Readings",
    intro: "Vedic astrology and horoscope, traditional palmistry and psychic guidance.",
    tone: "ink",
  },
  {
    slug: "work-life",
    numeral: "IV",
    name: "Work, money & life decisions",
    short: "Work & life",
    intro: "Study, career, business, finances and the strain of a legal matter — as subjects for reflection.",
    tone: "forest",
  },
  {
    slug: "spiritual",
    numeral: "V",
    name: "Spiritual guidance",
    short: "Spiritual",
    intro: "Traditional spiritual consultation for concerns about negative energy, the evil eye and black magic.",
    tone: "umber",
  },
];

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  category: CategorySlug;
  /** Short name used in lists and navigation. */
  name: string;
  /** Page H1. Use a single `*word*` to set an italic accent. */
  h1: string;
  kicker: string;
  lede: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  art?: ArtKey;
  situationsTitle: string;
  situations: readonly string[];
  approach: readonly { heading: string; body: string }[];
  beforeYouAsk: readonly string[];
  faqs: readonly Faq[];
  note: string;
  related: readonly string[];
  covers: readonly string[];
  legacy: readonly string[];
};

const NOTE_GENERAL =
  "Consultations offer a traditional perspective for personal reflection. Outcomes are not guaranteed.";

export const services: readonly Service[] = [
  /* ───────────────────────────── I. LOVE ───────────────────────────── */
  {
    slug: "love-marriage",
    category: "love",
    name: "Love marriage",
    h1: "Love marriage, *with* both families in mind",
    kicker: "Love & relationships",
    lede:
      "Choosing a partner for yourself can bring its own questions — of compatibility, timing, and how to bring two families to the same table. A private consultation gives those questions room.",
    summary: "Compatibility, timing and family approval when you have chosen your own partner.",
    metaTitle: "Love marriage astrology in Sydney",
    metaDescription:
      "Private love marriage consultations with Pandit Thulasidas in Sydney: compatibility, timing and family-approval questions, discussed through traditional Vedic astrology.",
    art: "radha-sakhi",
    situationsTitle: "Questions people bring",
    situations: [
      "Whether two horoscopes are traditionally considered compatible",
      "Parents or elders who have not yet accepted the relationship",
      "Choosing an auspicious period for an engagement or wedding",
      "Differences of culture, community or expectation between families",
      "Uncertainty about whether — or when — to take the next step",
    ],
    approach: [
      {
        heading: "Reading compatibility",
        body: "In the Vedic tradition, compatibility is often considered by comparing two birth charts. A consultation explains what the comparison traditionally looks at and how it relates to the questions you have, rather than handing down a verdict.",
      },
      {
        heading: "When family approval is the concern",
        body: "Many enquiries are less about the couple than about the families around them. You can talk through the conversations that have happened, the ones still to come, and how you might approach them.",
      },
    ],
    beforeYouAsk: [
      "Whether birth details for one or both partners are useful",
      "Whether the consultation can include a parent or family member",
      "Current fees and session length",
    ],
    faqs: [
      { q: "Do we both need to attend?", a: "No. Many people enquire on their own first. Ask whether a joint consultation suits your question." },
      { q: "Can a consultation convince my family?", a: "No consultation can change another person's mind. It can help you think through how to approach the conversation." },
    ],
    note: NOTE_GENERAL,
    related: ["marriage-guidance", "family-problems", "vedic-astrology"],
    covers: ["Love Marriage", "Love Marriage Problems", "Family Approval & Marriage Concerns"],
    legacy: ["/love-marriage.php"],
  },
  {
    slug: "relationship-guidance",
    category: "love",
    name: "Relationship & couple concerns",
    h1: "When two people *stop* understanding each other",
    kicker: "Love & relationships",
    lede:
      "Misunderstandings, distance and the same argument returning in a new form. Couples and individuals bring these to a consultation to see the pattern more clearly.",
    summary: "Misunderstandings, emotional distance and recurring disagreements.",
    metaTitle: "Relationship & couple problem guidance in Sydney",
    metaDescription:
      "Private relationship and couple guidance with Pandit Thulasidas in Sydney for communication difficulties, emotional distance and recurring disagreements.",
    art: "radha-storm",
    situationsTitle: "What people describe",
    situations: [
      "Communication that has become guarded or strained",
      "Emotional distance after a difficult period",
      "Disagreements that keep returning",
      "Pressure from work, money or family spilling into the relationship",
      "A sense of drifting apart without a clear reason",
    ],
    approach: [
      {
        heading: "Your circumstances, not a formula",
        body: "Every relationship is different, so the consultation begins with your account of what is happening. Astrological and psychic perspectives are offered as another way to look at it, not a script to follow.",
      },
      {
        heading: "Alone or together",
        body: "You can come on your own or ask whether a joint consultation is possible. Either way, the aim is clarity about what you can do — not control over what your partner does.",
      },
    ],
    beforeYouAsk: [
      "Whether one or both partners should attend",
      "What is useful to share beforehand",
      "Current fees and session length",
    ],
    faqs: [
      { q: "Is this the same as couples counselling?", a: "No. It is a traditional astrology and spiritual consultation. For counselling or therapy, speak with a qualified relationship counsellor." },
      { q: "What if I don't feel safe in my relationship?", a: "Please contact 1800RESPECT (1800 737 732) or emergency services on 000 first. A consultation is not a safety service." },
    ],
    note: NOTE_GENERAL,
    related: ["get-your-love-back", "marriage-guidance", "extra-marital-concerns"],
    covers: ["Relationship Problems", "Couple Problems"],
    legacy: ["/couple-problems.php"],
  },
  {
    slug: "get-your-love-back",
    category: "love",
    name: "Separation & reconciliation",
    h1: "After a *separation*",
    kicker: "Love & relationships",
    lede:
      "When a relationship has ended, or paused, it is natural to want to understand why — and whether reconnecting is possible or wise. A consultation is a private place to ask.",
    summary: "Clarity after a breakup, and questions about reconnecting with a former partner.",
    metaTitle: "Separation & reconciliation guidance in Sydney (Get your love back)",
    metaDescription:
      "Private guidance with Pandit Thulasidas in Sydney after a breakup or separation: reflecting on the relationship, reconciliation questions and next steps. No guaranteed outcomes.",
    art: "krishna-awaiting",
    situationsTitle: "Where people are",
    situations: [
      "A recent breakup that still feels unresolved",
      "Separation within a marriage or long relationship",
      "Wondering whether to reach out to a former partner",
      "Patterns you have noticed across more than one relationship",
    ],
    approach: [
      {
        heading: "What the original site calls “Get your love back”",
        body: "The consultation explores the relationship, the separation and the choices still open to you. It does not, and cannot, act on another person — their decisions remain theirs.",
      },
      {
        heading: "Room to reflect",
        body: "Some people leave with a clearer sense of whether to reach out; others with a sense of how to let go. Both are legitimate outcomes of a conversation.",
      },
    ],
    beforeYouAsk: ["What preparation is helpful", "Whether phone consultations are available", "Current fees and session length"],
    faqs: [
      { q: "Can you bring my partner back?", a: "No. Nobody can ethically promise to influence another person's feelings or choices. The consultation is guidance for you." },
      { q: "Is it too soon to enquire?", a: "There is no right time. Some people ask within days, others after months." },
    ],
    note: "No consultation can guarantee reconciliation or influence another person's choices.",
    related: ["relationship-guidance", "extra-marital-concerns", "psychic-reading"],
    covers: ["Get Your Love Back", "Separation and Reconciliation Guidance"],
    legacy: ["/get-love-back.php"],
  },
  {
    slug: "extra-marital-concerns",
    category: "love",
    name: "Extra-marital concerns",
    h1: "Trust, *and* what comes after",
    kicker: "Love & relationships",
    lede:
      "Concerns about an extra-marital relationship — your own, or a partner's — are hard to say aloud. The consultation is private and without judgement.",
    summary: "Trust, distance and decisions after an extra-marital relationship.",
    metaTitle: "Extra-marital concerns — private guidance in Sydney",
    metaDescription:
      "Confidential, non-judgemental guidance with Pandit Thulasidas in Sydney for concerns involving trust, an extra-marital relationship, separation or the future of a marriage.",
    situationsTitle: "What people bring",
    situations: [
      "Suspicion, or discovery, of an affair",
      "Your own involvement in a relationship outside a marriage",
      "Rebuilding trust — or deciding it cannot be rebuilt",
      "What to tell family, and when",
    ],
    approach: [
      {
        heading: "Without judgement",
        body: "You do not need to justify the situation to discuss it. The conversation focuses on what you are feeling, what you know and the choices in front of you.",
      },
      {
        heading: "Not about control",
        body: "As the original website puts it, guidance is offered “rather than control another person's decisions or guarantee a particular relationship outcome.” That principle is kept here.",
      },
    ],
    beforeYouAsk: ["How privacy is handled", "Whether a phone consultation is possible", "Current fees and session length"],
    faqs: [
      { q: "Will this be kept confidential?", a: "Consultations are private. Ask how notes and contact details are handled when you enquire." },
      { q: "Should I also see a counsellor?", a: "Often, yes. A qualified relationship counsellor can work alongside — not instead of — a traditional consultation." },
    ],
    note: NOTE_GENERAL,
    related: ["relationship-guidance", "marriage-guidance", "get-your-love-back"],
    covers: ["Extra Marital Issues"],
    legacy: ["/extra-marital.php"],
  },

  /* ───────────────────────── II. MARRIAGE & FAMILY ───────────────────────── */
  {
    slug: "marriage-guidance",
    category: "marriage-family",
    name: "Marriage & husband–wife concerns",
    h1: "Inside a *marriage*",
    kicker: "Marriage & family",
    lede:
      "Marriage brings two people and two families into one household. When expectations, roles or in-laws pull in different directions, a consultation offers a calm place to think.",
    summary: "Expectations, roles, in-laws and the everyday strain of married life.",
    metaTitle: "Marriage & husband–wife guidance in Sydney",
    metaDescription:
      "Private marriage guidance with Pandit Thulasidas in Sydney for husband–wife disagreements, in-law pressure and expectations within married life.",
    art: "shiva-parvati",
    situationsTitle: "Common threads",
    situations: [
      "Disagreements between husband and wife that have become entrenched",
      "Pressure from in-laws or extended family",
      "Different expectations about money, work or children",
      "A marriage that feels stuck rather than broken",
    ],
    approach: [
      {
        heading: "Two charts, one household",
        body: "Where it helps, both partners' birth charts can be considered side by side. The tradition treats them as a way into understanding temperament and timing — not as a judgement on either person.",
      },
      {
        heading: "Practical next steps",
        body: "The conversation aims to leave you with a clearer view of the next conversation at home — what to say, and what to let rest.",
      },
    ],
    beforeYouAsk: ["Whether both partners' details are helpful", "Whether you can attend together", "Current fees and session length"],
    faqs: [
      { q: "Can one spouse come alone?", a: "Yes. Many consultations are with one partner." },
      { q: "Is family violence something to raise here?", a: "Please contact 1800RESPECT (1800 737 732) or 000 in an emergency. Your safety comes before any consultation." },
    ],
    note: NOTE_GENERAL,
    related: ["family-problems", "love-marriage", "extra-marital-concerns"],
    covers: ["Marriage Problems", "Husband and Wife Concerns"],
    legacy: [],
  },
  {
    slug: "family-problems",
    category: "marriage-family",
    name: "Family problems & disputes",
    h1: "The *whole* household",
    kicker: "Marriage & family",
    lede:
      "Family concerns can involve communication, marriage, expectations, money or disagreements that have lasted years. You can bring the whole picture, not just one thread.",
    summary: "Long-running disagreements, expectations and harmony at home.",
    metaTitle: "Family problems & disputes — astrology guidance in Sydney",
    metaDescription:
      "Private astrology and spiritual guidance with Pandit Thulasidas in Sydney for family disputes, expectations between generations and long-standing disagreements.",
    art: "vishnu-lakshmi",
    situationsTitle: "What families bring",
    situations: [
      "Disputes between siblings, parents or in-laws",
      "Expectations across generations, especially after migration",
      "Decisions about caring for elders",
      "Inheritance or property disagreements (alongside legal advice)",
    ],
    approach: [
      {
        heading: "Seeing the pattern",
        body: "Families tend to repeat their disagreements. A consultation can help you notice the pattern and consider where you might change your part in it.",
      },
      {
        heading: "Calm and respectful",
        body: "Consultations are private, unhurried and respectful of every member of the family — including the ones who are not in the room.",
      },
    ],
    beforeYouAsk: ["Whether family members can join", "What details are useful", "Current fees and session length"],
    faqs: [
      { q: "Can several family members attend?", a: "Ask when you enquire — it depends on the question and the format." },
      { q: "Can this settle an inheritance dispute?", a: "No. Legal and financial matters need a qualified lawyer or adviser." },
    ],
    note: NOTE_GENERAL,
    related: ["marriage-guidance", "childless-couples", "spiritual-guidance"],
    covers: ["Family Problems", "Family Disputes"],
    legacy: ["/family-problems.php"],
  },
  {
    slug: "childless-couples",
    category: "marriage-family",
    name: "Childless couples",
    h1: "Hoping for a *family*",
    kicker: "Marriage & family",
    lede:
      "For couples hoping for children, waiting can be painful and private. The original website offers traditional astrological consultation for these concerns; this page describes it honestly.",
    summary: "Traditional consultation and spiritual support while hoping for children.",
    metaTitle: "Childless couple consultations in Sydney",
    metaDescription:
      "Traditional astrological and spiritual consultation with Pandit Thulasidas in Sydney for couples hoping to start a family. Not a medical service; no outcomes promised.",
    art: "temple-corridor",
    situationsTitle: "What a consultation can hold",
    situations: [
      "The emotional weight of waiting",
      "Family expectations and questions from relatives",
      "Traditional perspectives on timing",
      "Spiritual practices that some couples find meaningful",
    ],
    approach: [
      {
        heading: "Support, not treatment",
        body: "This is a traditional spiritual consultation. It cannot diagnose, treat or improve fertility, and it does not promise pregnancy. Please keep working with your GP or fertility specialist.",
      },
      {
        heading: "A space for both partners",
        body: "Many couples carry this differently. The consultation can be a shared, private space to talk about hope, pressure and patience.",
      },
    ],
    beforeYouAsk: ["Whether both partners should attend", "What the consultation does and does not include", "Current fees and session length"],
    faqs: [
      { q: "Can astrology help us conceive?", a: "No consultation can promise or cause a pregnancy. Medical questions belong with your GP or fertility specialist." },
      { q: "Is it appropriate to come during IVF?", a: "Yes, as a source of personal and spiritual support alongside — never instead of — medical care." },
    ],
    note: "This is not a medical service. Please continue to follow the advice of your GP or fertility specialist.",
    related: ["marriage-guidance", "spiritual-guidance", "vedic-astrology"],
    covers: ["Childless Couple Consultations"],
    legacy: [],
  },

  /* ───────────────────────── III. READINGS ───────────────────────── */
  {
    slug: "vedic-astrology",
    category: "readings",
    name: "Vedic astrology & horoscope",
    h1: "Vedic astrology *&* horoscope reading",
    kicker: "Astrology & readings",
    lede:
      "Jyotiṣa — the Vedic tradition of astrology — reads the sky at the moment of birth. A horoscope consultation uses that chart as the starting point for the question you bring.",
    summary: "Birth-chart (kuṇḍalī) consultation within the Jyotiṣa tradition.",
    metaTitle: "Vedic astrology & horoscope reading in Sydney",
    metaDescription:
      "Horoscope and birth-chart consultations in Sydney with Pandit Thulasidas, an Indian Vedic astrologer. Relationships, career, marriage, family and personal direction.",
    art: "budha",
    situationsTitle: "What a reading can focus on",
    situations: [
      "Relationships, marriage and compatibility",
      "Career direction and timing of decisions",
      "Family and household questions",
      "Personal direction during a period of change",
    ],
    approach: [
      {
        heading: "The birth chart",
        body: "A Vedic chart is drawn from the date, time and place of birth. It maps the twelve rāśis (signs), the houses and the nine grahas — the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rāhu and Ketu — as the tradition understands them.",
      },
      {
        heading: "Your question, not a horoscope column",
        body: "As the original website says, the consultation “can focus on specific questions rather than general horoscope information.” Bring the question that matters most to you.",
      },
    ],
    beforeYouAsk: [
      "Which birth details are needed, and how to share them privately",
      "Whether an approximate birth time is workable",
      "Current fees and session length",
    ],
    faqs: [
      { q: "What if I don't know my exact birth time?", a: "Ask when you enquire. Traditional astrologers have ways of working with approximate times, with some limits." },
      { q: "Is Vedic astrology the same as Western astrology?", a: "No. Jyotiṣa uses a different (sidereal) zodiac and its own system of planetary periods, so your signs may differ." },
    ],
    note: NOTE_GENERAL,
    related: ["palm-reading", "psychic-reading", "love-marriage"],
    covers: ["Vedic Astrology", "Horoscope Reading", "Birth Chart and Traditional Astrological Consultation"],
    legacy: ["/horoscope-reading.php"],
  },
  {
    slug: "palm-reading",
    category: "readings",
    name: "Palm reading",
    h1: "Palm reading, *line by line*",
    kicker: "Astrology & readings",
    lede:
      "Palmistry reads what is in front of you: the shape of the hand, its principal lines and the smaller markings between them. A consultation explains what the tradition sees there.",
    summary: "Traditional palmistry: the major lines, markings and patterns of the hand.",
    metaTitle: "Palm reading in Sydney",
    metaDescription:
      "Private palm reading in Sydney with Pandit Thulasidas. Traditional palmistry for personal, relationship, career and life questions.",
    art: "palm-diagram",
    situationsTitle: "What a palm reading looks at",
    situations: [
      "The shape of the hand and fingers",
      "The heart, head and life lines",
      "Mounts, markings and smaller lines",
      "How the two hands compare",
    ],
    approach: [
      {
        heading: "Symbols, read traditionally",
        body: "Each feature is interpreted according to long-standing conventions of palmistry. They are symbols to reflect on — not a medical or physical assessment of your hand.",
      },
      {
        heading: "Bring your questions",
        body: "A reading can be open-ended, or focused on relationships, work or a decision you are weighing. Some people pair it with a horoscope reading.",
      },
    ],
    beforeYouAsk: ["Whether palm reading is in person only", "Whether to combine it with a horoscope reading", "Current fees and session length"],
    faqs: [
      { q: "Can a palm reading be done by phone?", a: "Usually it is done in person. Ask whether clear photographs can be used instead." },
      { q: "Does palmistry predict health?", a: "No. Please see a doctor about any health concern." },
    ],
    note: NOTE_GENERAL,
    related: ["vedic-astrology", "psychic-reading", "career-and-education"],
    covers: ["Palm Reading"],
    legacy: ["/palm-reading.php"],
  },
  {
    slug: "psychic-reading",
    category: "readings",
    name: "Psychic guidance",
    h1: "Psychic guidance, *quietly* given",
    kicker: "Astrology & readings",
    lede:
      "Alongside astrology and palmistry, the original website describes Pandit Thulasidas as a psychic reader. A psychic consultation is a more intuitive conversation about the question you bring.",
    summary: "An intuitive, conversational reading alongside traditional methods.",
    metaTitle: "Psychic reading & guidance in Sydney",
    metaDescription:
      "Private psychic guidance with Pandit Thulasidas in Sydney — an intuitive consultation for relationships, work and personal questions, offered for reflection.",
    art: "lepakshi",
    situationsTitle: "When people choose it",
    situations: [
      "A question that does not fit neatly into one category",
      "Wanting a conversation rather than a chart",
      "A decision with no obvious right answer",
    ],
    approach: [
      {
        heading: "Intuitive, not definitive",
        body: "Psychic guidance is offered as perspective. Treat it as one voice among several as you make your own decision.",
      },
      {
        heading: "Combined with other readings",
        body: "Some consultations draw on the birth chart or the hand as well. Ask which approach suits your question.",
      },
    ],
    beforeYouAsk: ["How a psychic consultation differs from a horoscope reading", "Whether it is available by phone", "Current fees and session length"],
    faqs: [
      { q: "Will a psychic reading tell me the future?", a: "It offers an intuitive perspective, not fixed predictions. You remain the one who decides." },
    ],
    note: "Psychic consultations are offered for personal reflection; individual experiences vary.",
    related: ["vedic-astrology", "palm-reading", "spiritual-guidance"],
    covers: ["Psychic Guidance"],
    legacy: [],
  },

  /* ─────────────────────── IV. WORK, MONEY & LIFE ─────────────────────── */
  {
    slug: "career-and-education",
    category: "work-life",
    name: "Career & education",
    h1: "Study, work *and* the road between",
    kicker: "Work, money & life decisions",
    lede:
      "Choosing a course, changing careers, or supporting a child through exams — these are decisions families often bring to an astrologer. A consultation treats them as subjects for reflection.",
    summary: "Course choice, exam stress, career direction and change.",
    metaTitle: "Career & education astrology guidance in Sydney",
    metaDescription:
      "Education and career guidance through traditional astrology with Pandit Thulasidas in Sydney — for students, parents and people considering a career change.",
    art: "jantar-mantar",
    situationsTitle: "Students, parents and professionals ask about",
    situations: [
      "Choosing a course or field of study",
      "Concentration and exam pressure",
      "Changing careers, or returning to work",
      "Timing of a job move or further study",
    ],
    approach: [
      {
        heading: "Strengths and timing",
        body: "Traditional astrology is used to consider temperament, strengths and periods that may suit change — as one input alongside grades, interests and advice from teachers.",
      },
      {
        heading: "For parents too",
        body: "Parents can enquire on behalf of a student, and consultations can include the wider family conversation about study.",
      },
    ],
    beforeYouAsk: ["Whether a parent can attend with a student", "What details are useful", "Current fees and session length"],
    faqs: [
      { q: "Can astrology guarantee exam results or admission?", a: "No. As the original site notes, results, admission and employment cannot be guaranteed. Speak with a school or career counsellor as well." },
    ],
    note: "Not a substitute for professional education or career counselling. Results are not guaranteed.",
    related: ["business-and-finance", "vedic-astrology", "palm-reading"],
    covers: ["Education Problems", "Career Guidance"],
    legacy: ["/education-problems.php"],
  },
  {
    slug: "business-and-finance",
    category: "work-life",
    name: "Business & financial concerns",
    h1: "Business *and* money, considered",
    kicker: "Work, money & life decisions",
    lede:
      "Slow growth, a partnership under strain, unexpected expenses or debt — financial pressure reaches into every part of life. A consultation offers a structured pause to think.",
    summary: "Business decisions, partnerships and personal financial stress.",
    metaTitle: "Business & financial astrology guidance in Sydney",
    metaDescription:
      "Traditional astrology guidance with Pandit Thulasidas in Sydney for business decisions, partnerships and financial stress. Not financial or investment advice.",
    art: "taurus",
    situationsTitle: "What people bring",
    situations: [
      "Starting, expanding or stepping back from a business",
      "Partnership disagreements",
      "Financial stress, unexpected expenses or debt worries",
      "Timing of a significant decision",
    ],
    approach: [
      {
        heading: "Perspective, not forecasts",
        body: "Astrology does not predict markets, returns or the outcome of a deal. It is offered as a way to reflect on timing and decision-making patterns.",
      },
      {
        heading: "Alongside your advisers",
        body: "For contracts, tax, debt or investment, speak with a licensed financial adviser, accountant or lawyer. The National Debt Helpline (1800 007 007) offers free advice.",
      },
    ],
    beforeYouAsk: ["Whether to bring one decision or several", "Whether phone consultations are available", "Current fees and session length"],
    faqs: [
      { q: "Will this improve my income?", a: "No consultation can promise financial results. It is a space for reflection, not financial advice." },
    ],
    note: "Not financial, investment, business or legal advice. Specific financial outcomes are not guaranteed.",
    related: ["career-and-education", "legal-concerns", "vedic-astrology"],
    covers: ["Business Problems", "Money Problems", "Financial Concerns"],
    legacy: ["/business-problems.php", "/money-problems.php"],
  },
  {
    slug: "legal-concerns",
    category: "work-life",
    name: "Legal concerns",
    h1: "The *weight* of a legal matter",
    kicker: "Work, money & life decisions",
    lede:
      "Court proceedings and disputes can bring months of uncertainty. The original website lists “court cases” among its topics; here it is described for what it can honestly be — support with the stress.",
    summary: "Support with the stress and uncertainty of a dispute or court matter.",
    metaTitle: "Support with legal stress — Sydney",
    metaDescription:
      "Spiritual and astrological support with Pandit Thulasidas in Sydney during the stress of a legal dispute. Not legal advice; no influence on any outcome.",
    situationsTitle: "What a consultation can help with",
    situations: [
      "Anxiety while waiting for a hearing or decision",
      "Family strain caused by a dispute",
      "Finding steadiness to make decisions with your lawyer",
    ],
    approach: [
      {
        heading: "Your lawyer comes first",
        body: "Legal outcomes depend on the law, evidence and your legal representation. A consultation cannot influence a court or any party.",
      },
      {
        heading: "Steadiness",
        body: "What it can offer is a calm, private conversation and a traditional spiritual perspective while the matter runs its course.",
      },
    ],
    beforeYouAsk: ["What a consultation can and cannot include", "Current fees and session length"],
    faqs: [
      { q: "Can astrology help me win a case?", a: "No. Please rely on a qualified lawyer. LawAccess NSW (1300 888 529) can point you to free legal help." },
    ],
    note: "This is not legal advice and has no bearing on any legal outcome. Please consult a qualified lawyer.",
    related: ["business-and-finance", "family-problems", "spiritual-guidance"],
    covers: ["Legal Concerns (“Court Cases”)"],
    legacy: [],
  },

  /* ───────────────────────── V. SPIRITUAL ───────────────────────── */
  {
    slug: "spiritual-guidance",
    category: "spiritual",
    name: "Spiritual guidance & remedies",
    h1: "Spiritual guidance, *rooted* in tradition",
    kicker: "Spiritual guidance",
    lede:
      "Some questions are less about events than about meaning. A spiritual consultation is an unhurried conversation within a traditional framework, at your pace.",
    summary: "An unhurried conversation within a traditional spiritual framework.",
    metaTitle: "Spiritual guidance in Sydney",
    metaDescription:
      "Private, grounded spiritual guidance with Pandit Thulasidas in Sydney, including traditional practices some clients find meaningful.",
    art: "diyas",
    situationsTitle: "People come to",
    situations: [
      "Reconnect with tradition after time away",
      "Find steadiness during a difficult period",
      "Ask about traditional practices or remedies",
      "Talk through a concern that has no obvious category",
    ],
    approach: [
      {
        heading: "Traditional remedies",
        body: "Clients have described receiving “spiritual guidance and traditional remedies.” Any practice suggested is offered within the tradition, for you to take up or not.",
      },
      {
        heading: "Grounded",
        body: "Spiritual guidance sits alongside, never in place of, medical or psychological care. If you are struggling, please also contact your GP or Lifeline on 13 11 14.",
      },
    ],
    beforeYouAsk: ["What kinds of concerns suit a spiritual consultation", "Whether any practices involve cost", "Current fees and session length"],
    faqs: [
      { q: "Do I need to be Hindu?", a: "No. People of many backgrounds seek traditional spiritual guidance." },
      { q: "Will I be asked to buy anything?", a: "Ask about any costs up front. You are never obliged to take up a suggested practice." },
    ],
    note: "Not a substitute for medical, psychological, legal or financial advice.",
    related: ["negative-energy", "black-magic-concerns", "psychic-reading"],
    covers: ["Spiritual Guidance", "Traditional Remedies"],
    legacy: [],
  },
  {
    slug: "negative-energy",
    category: "spiritual",
    name: "Negative energy guidance",
    h1: "When obstacles *keep* returning",
    kicker: "Spiritual guidance",
    lede:
      "Some people feel weighed down by repeated obstacles or a lack of balance they describe as negative energy. The original website calls this service “Negative Energy Removal”; the consultation itself is spiritual guidance.",
    summary: "Repeated obstacles and imbalance, discussed from a traditional perspective.",
    metaTitle: "Negative energy guidance in Sydney",
    metaDescription:
      "Private spiritual guidance with Pandit Thulasidas in Sydney for concerns about negative energy, repeated obstacles and personal balance. Not a substitute for medical care.",
    art: "ganesha",
    situationsTitle: "What people describe",
    situations: [
      "A run of setbacks that feels more than coincidence",
      "A home or workplace that feels unsettled",
      "Low mood or restlessness they understand spiritually",
      "Wanting a traditional practice to mark a fresh start",
    ],
    approach: [
      {
        heading: "Taken seriously, gently",
        body: "Your experience is discussed respectfully and from within the tradition, without fear or dramatic claims.",
      },
      {
        heading: "Care alongside",
        body: "If low mood, anxiety or sleeplessness are part of the picture, please also speak with your GP. Spiritual guidance is not mental-health care.",
      },
    ],
    beforeYouAsk: ["What the consultation involves", "Whether any practice has a cost", "Current fees and session length"],
    faqs: [
      { q: "Can negative energy be removed in one call?", a: "No such promise is made. The consultation offers traditional guidance; experiences vary." },
    ],
    note: "Not a substitute for medical or mental-health care. No outcome is guaranteed.",
    related: ["black-magic-concerns", "spiritual-guidance", "vedic-astrology"],
    covers: ["Negative Energy Guidance", "Negative Energy Removal (as advertised)"],
    legacy: ["/negative-energy.php"],
  },
  {
    slug: "black-magic-concerns",
    category: "spiritual",
    name: "Black magic & evil-eye concerns",
    h1: "Concerns about *black magic* and the evil eye",
    kicker: "Spiritual guidance",
    lede:
      "Beliefs about black magic and the evil eye (nazar) are part of many cultures. If you are worried, you can discuss those worries privately and respectfully.",
    summary: "Beliefs about black magic and nazar, discussed respectfully and privately.",
    metaTitle: "Black magic & evil-eye concerns — spiritual guidance in Sydney",
    metaDescription:
      "Private, respectful spiritual consultation with Pandit Thulasidas in Sydney for people concerned about black magic, the evil eye or negative influences. No guaranteed outcomes.",
    situationsTitle: "People are often worried about",
    situations: [
      "Misfortune they believe has been caused by someone else",
      "The evil eye after good news or a celebration",
      "Unexplained recurring problems",
    ],
    approach: [
      {
        heading: "Belief, respected",
        body: "The consultation listens to your concern within your own cultural understanding, without mockery and without feeding fear.",
      },
      {
        heading: "No dramatic claims",
        body: "Nothing here promises to “remove” anything, and you will not be told to fear another person. The aim is calm and perspective.",
      },
    ],
    beforeYouAsk: ["What the consultation involves", "Whether any practice has a cost", "Current fees and session length"],
    faqs: [
      { q: "What if I feel unsafe or threatened?", a: "If someone is threatening you, contact NSW Police (131 444) or 000 in an emergency." },
    ],
    note: "Spiritual services are for personal guidance and do not replace medical, psychological, legal or financial advice.",
    related: ["negative-energy", "spiritual-guidance", "psychic-reading"],
    covers: ["Black Magic Concerns", "Black Magic Removal (as advertised)"],
    legacy: ["/black-magic.php"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesIn = (c: CategorySlug) => services.filter((s) => s.category === c);
export const categoryBySlug = (slug: CategorySlug) => categories.find((c) => c.slug === slug)!;
