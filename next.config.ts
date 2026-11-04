import type { NextConfig } from "next";

/**
 * Demo default: every deployment is noindex.
 * The owner-approved production switch is SITE_INDEXABLE=true (see README).
 */
const indexable = process.env.SITE_INDEXABLE === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: { SITE_INDEXABLE: indexable ? "true" : "false" },
  async headers() {
    const base = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      {
        source: "/:path*",
        headers: indexable ? base : [...base, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
