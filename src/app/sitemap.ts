import type { MetadataRoute } from "next";
import { services } from "@/content/catalogue";
import { siteOrigin } from "@/lib/site";

/**
 * Generated for completeness. While the preview is noindex, robots.txt does not advertise it
 * and it must not be submitted to search engines. Point SITE_URL at the approved domain at launch.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteOrigin().toString().replace(/\/$/, "");
  const paths = ["/", "/about", "/consultations", "/faq", "/contact", "/privacy", ...services.map((s) => `/consultations/${s.slug}`)];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
