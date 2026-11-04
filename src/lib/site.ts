/** Indexing is off unless the owner-approved production switch is set. */
export const indexable = process.env.SITE_INDEXABLE === "true";

/** Absolute origin for metadata (OG images). Preview deployments use the Vercel URL. */
export function siteOrigin(): URL {
  const explicit = process.env.SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
