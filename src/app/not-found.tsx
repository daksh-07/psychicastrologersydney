import type { Metadata } from "next";
import Link from "next/link";
import { Ornament } from "@/components/Ornament";

export const metadata: Metadata = { title: "Page not found", description: "This page could not be found." };

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/consultations", label: "Consultations" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="s-ink dark grain relative overflow-hidden">
      <div className="pointer-events-none absolute -right-[15vw] top-1/2 w-[70vw] max-w-[760px] -translate-y-1/2 text-[var(--color-saffron)] opacity-25" aria-hidden="true">
        <Ornament className="h-auto w-full" draw={false} />
      </div>
      <div className="wrap relative py-24 md:py-36">
        <p className="eyebrow accent">404 · Off the chart</p>
        <h1 className="t-mega mt-6 max-w-[10ch]">This page <em>isn’t</em> here.</h1>
        <p className="lede muted mt-8">The address may have changed. One of these should help:</p>
        <ul className="mt-8 flex flex-wrap gap-x-8">
          {LINKS.map((l) => (
            <li key={l.href}><Link href={l.href} className="ulink">{l.label} <span className="arr" aria-hidden="true">→</span></Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
