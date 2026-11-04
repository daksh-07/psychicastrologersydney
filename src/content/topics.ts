import { services } from "./catalogue.ts";

/** Allowlisted enquiry topics: every service slug plus a general option. */
export const topics = [
  ...services.map((s) => ({ slug: s.slug, label: s.name })),
  { slug: "general", label: "General question" },
] as const;

export type TopicSlug = string;

const slugs: ReadonlySet<string> = new Set(topics.map((t) => t.slug));

export function isTopicSlug(value: unknown): value is TopicSlug {
  return typeof value === "string" && slugs.has(value);
}

export function topicLabel(slug: TopicSlug): string {
  return topics.find((t) => t.slug === slug)?.label ?? "General question";
}

/** Internal contact link with an allowlisted topic and nothing else. */
export function contactHref(slug?: TopicSlug): string {
  return slug && isTopicSlug(slug) ? `/contact?topic=${slug}#enquiry` : "/contact#enquiry";
}
