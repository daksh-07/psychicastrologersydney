import type { Metadata } from "next";
import Link from "next/link";
import { CelestialPlate } from "@/components/CelestialPlate";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page could not be found.",
};

const links = [
  { href: "/", label: "Home" },
  { href: "/consultations", label: "Consultations" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="on-ink">
      <div className="wrap grid-cols items-center gap-y-12 py-20 md:py-28">
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <p className="eyebrow brass">404 · Off the chart</p>
          <h1 className="display-1 mt-6">This page isn’t here.</h1>
          <p className="lead muted mt-6">The address may have changed. One of these should help:</p>
          <ul className="mt-8 grid gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-link">
                  {l.label} <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9" aria-hidden="true">
          <CelestialPlate tone="ink" className="h-auto w-full max-w-[360px] opacity-70" />
        </div>
      </div>
    </section>
  );
}
