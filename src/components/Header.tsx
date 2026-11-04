import Link from "next/link";
import { whatsappDirectHref } from "@/config/business";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { primaryNav } from "./nav";

export function Header() {
  return (
    <header className="on-ink relative z-30 border-b border-rule-ink">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-display text-[1.375rem] leading-none tracking-[-0.01em] no-underline min-[400px]:text-[1.5rem] md:text-[1.75rem]"
        >
          Pandit Thulasidas
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 lg:gap-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium text-muted-ink no-underline hover:text-ivory aria-[current=page]:text-ivory aria-[current=page]:underline"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsappDirectHref}
            className="btn btn-light hidden !min-h-11 !px-4 !text-sm min-[400px]:inline-flex"
          >
            WhatsApp
          </a>
          <MobileMenu />
          <noscript>
            <a href="#footer-nav" className="btn btn-outline-ink !min-h-11 !px-3 !text-sm md:hidden">Menu</a>
            <style>{`.js-menu-toggle{display:none!important}`}</style>
          </noscript>
        </div>
      </div>
    </header>
  );
}
