import type { MetadataRoute } from "next";
import { indexable, siteOrigin } from "@/lib/site";

/**
 * Crawling is allowed so crawlers can see the noindex directives. The sitemap is only
 * advertised once the owner-approved production switch (SITE_INDEXABLE=true) is set.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(indexable ? { sitemap: `${siteOrigin().toString().replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}
