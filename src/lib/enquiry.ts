import { isTopicSlug, topicLabel, type TopicSlug } from "../content/topics.ts";

export const LIMITS = { name: 80, message: 500 } as const;

export type EnquiryInput = {
  name: string;
  phone: string;
  topic: string;
  message: string;
};

export type FieldName = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<FieldName, string>>;

/** Accepts common local and international formats: +61 4xx xxx xxx, (02) 9xxx xxxx, 04xx-xxx-xxx. */
const PHONE_CHARS = /^\+?[0-9\s().-]+$/;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = input.name.trim();
  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Use ${LIMITS.name} characters or fewer for your name.`;

  const phone = input.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Enter a contact number.";
  else if (!PHONE_CHARS.test(phone) || phone.indexOf("+") > 0)
    errors.phone = "Use digits, spaces, brackets, dashes or a leading +.";
  else if (digits.length < 8 || digits.length > 15)
    errors.phone = "Enter a contact number with 8 to 15 digits.";

  if (!isTopicSlug(input.topic)) errors.topic = "Choose a consultation topic.";

  if (input.message.length > LIMITS.message)
    errors.message = `Keep the note to ${LIMITS.message} characters or fewer.`;

  return errors;
}

export function buildEnquiryText(input: EnquiryInput & { topic: TopicSlug }): string {
  const lines = [
    "Hello Pandit Thulasidas,",
    "",
    `My name is ${input.name.trim()} and I would like to ask about a consultation.`,
    `Topic: ${topicLabel(input.topic)}`,
    `Best number to call me back: ${input.phone.trim()}`,
  ];
  const note = input.message.trim();
  if (note) lines.push(`Note: ${note}`);
  lines.push("", "Could you let me know about availability and format? Thank you.");
  return lines.join("\n");
}

/** Encodes the draft exactly once. */
export function buildWhatsAppUrl(waNumber: string, text: string): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}
