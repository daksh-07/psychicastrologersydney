import Link from "next/link";
import { business, conceptCredit, disclaimer, telHref, whatsappDirectHref } from "@/config/business";
import { categories, servicesIn } from "@/content/catalogue";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/consultations", label: "All consultations" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function Footer() {
  return (
    <footer className="s-ink dark grain relative overflow-hidden">
      <div className="wrap grid-x gap-y-14 pb-10 pt-20 md:pt-28">
        <div className="col-span-4 md:col-span-8 lg:col-span-4">
          <p className="eyebrow accent">Pandit Thulasidas</p>
          <p className="t-h3 mt-4 max-w-[18ch]">Vedic astrology, palmistry &amp; spiritual guidance in Sydney.</p>
          <ul className="mt-8 grid gap-1 text-[0.98rem]">
            <li><a href={telHref} className="ulink">Call {business.phone.display}</a></li>
            <li><a href={whatsappDirectHref} className="ulink">WhatsApp {business.phone.display}</a></li>
          </ul>
          <address className="muted mt-6 not-italic">
            {business.address.street}<br />
            {business.address.suburb}<br />
            <a href={business.address.mapHref} className="ulink mt-1 text-current" target="_blank" rel="noopener noreferrer">
              Open in maps <span className="sr-only">(opens in a new tab)</span><span className="arr" aria-hidden="true">↗</span>
            </a>
          </address>
          <p className="caption muted mt-3 max-w-[38ch]">Visits by appointment — please confirm arrangements when you enquire.</p>
        </div>

        <nav aria-label="Consultations" className="col-span-4 md:col-span-6 lg:col-span-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.slug}>
              <p className="eyebrow muted"><span className="numeral mr-1.5 text-[var(--color-saffron)] normal-case tracking-normal text-sm">{c.numeral}</span>{c.name}</p>
              <ul className="mt-3 grid">
                {servicesIn(c.slug).map((s) => (
                  <li key={s.slug}>
                    <Link href={`/consultations/${s.slug}`} className="inline-flex min-h-9 items-center text-[0.95rem] text-[var(--color-on-dark-soft)] no-underline hover:text-[var(--color-ivory)] hover:underline">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <nav id="footer-nav" aria-label="Footer" className="col-span-4 md:col-span-2 lg:col-span-2">
          <p className="eyebrow muted">Pages</p>
          <ul className="mt-3 grid">
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="inline-flex min-h-11 items-center no-underline hover:underline">{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="overflow-hidden pl-[var(--gutter)]" aria-hidden="true">
        <p className="wordmark-band inline-block select-none text-[var(--color-ivory)]/[0.07]" data-hscroll="18">
          Thulasidas · ज्योतिष · Thulasidas · ज्योतिष
        </p>
      </div>

      <div className="wrap">
        <div className="grid gap-4 border-t border-white/10 py-8 text-sm md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-12">
          <p className="muted max-w-[70ch]" data-disclaimer>{disclaimer}</p>
          <p className="muted md:text-right">
            {conceptCredit} · Speculative preview, not the live site ·{" "}
            <Link href="/privacy#credits" className="underline">Image credits</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
