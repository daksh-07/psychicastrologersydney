import Link from "next/link";
import { business, conceptCredit, disclaimer, telHref, whatsappDirectHref } from "@/config/business";
import { CelestialPlate } from "./CelestialPlate";
import { footerNav } from "./nav";

export function Footer() {
  return (
    <footer className="on-ink border-t border-rule-ink">
      <div className="wrap grid-cols gap-y-12 py-16 md:py-20">
        <div className="col-span-4 md:col-span-4 lg:col-span-5">
          <p className="font-display text-[2rem] leading-none tracking-[-0.01em]">{business.name}</p>
          <p className="muted mt-3">Vedic astrology, palmistry and spiritual consultations · {business.locality}</p>
          <ul className="mt-6 grid gap-1">
            <li>
              <a href={whatsappDirectHref} className="text-link">WhatsApp {business.phone.display}</a>
            </li>
            <li>
              <a href={telHref} className="text-link">Call {business.phone.display}</a>
            </li>
          </ul>
        </div>
        <nav id="footer-nav" aria-label="Footer" className="col-span-4 md:col-span-2 lg:col-span-3 lg:col-start-7">
          <p className="eyebrow brass">Pages</p>
          <ul className="mt-3 grid">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-muted-ink no-underline hover:text-ivory hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-4 md:col-span-2 lg:col-span-3 lg:col-start-10">
          <CelestialPlate tone="ink" className="h-auto w-24 opacity-80" />
          <p className="eyebrow muted mt-4">Fig. 01 / echo</p>
        </div>
      </div>
      <div className="wrap">
        <div className="rule-top grid gap-4 py-8 text-sm md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-12">
          <p className="muted measure" data-disclaimer>{disclaimer}</p>
          <p className="muted md:text-right">
            {conceptCredit} · Preview, not the live site
          </p>
        </div>
      </div>
    </footer>
  );
}
