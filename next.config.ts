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
  async redirects() {
    // Earlier preview URLs (feat/celestial-almanac-demo) → their new homes. Temporary on purpose.
    return [
      { source: "/consultations/relationships-and-family", destination: "/consultations/relationship-guidance", permanent: false },
      { source: "/consultations/career-and-business", destination: "/consultations/business-and-finance", permanent: false },
    ];
  },
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
