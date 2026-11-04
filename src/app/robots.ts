import type { MetadataRoute } from "next";

/**
 * Crawlers are allowed to fetch pages so they can see the noindex
 * meta tag and X-Robots-Tag header. No sitemap is advertised in the preview.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }] };
}
