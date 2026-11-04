/**
 * Allowlisted enquiry topics. Only these slugs are accepted from the
 * /contact?topic= query string or the composer select.
 */
export const topics = [
  { slug: "vedic-astrology", label: "Vedic astrology and horoscope reading" },
  { slug: "palm-reading", label: "Palm reading" },
  { slug: "relationships-and-family", label: "Relationships and family" },
  { slug: "career-and-business", label: "Career and business" },
  { slug: "spiritual-guidance", label: "Spiritual guidance" },
  { slug: "general", label: "General question" },
] as const;

export type TopicSlug = (typeof topics)[number]["slug"];

const slugs: ReadonlySet<string> = new Set(topics.map((t) => t.slug));

export function isTopicSlug(value: unknown): value is TopicSlug {
  return typeof value === "string" && slugs.has(value);
}

export function topicLabel(slug: TopicSlug): string {
  return topics.find((t) => t.slug === slug)?.label ?? "General question";
}

/** Internal contact link with an allowlisted topic and nothing else. */
export function contactHref(slug?: TopicSlug): string {
  return slug ? `/contact?topic=${slug}#enquiry` : "/contact#enquiry";
}
