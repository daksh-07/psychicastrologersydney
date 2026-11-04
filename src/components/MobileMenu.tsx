"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { business, telHref, whatsappDirectHref } from "@/config/business";
import { primaryNav } from "./nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="js-menu-toggle inline-flex min-h-11 min-w-11 items-center gap-2 rounded-[3px] border border-rule-ink px-3 text-sm font-semibold"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-150 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-1.5 h-px w-4 bg-current ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-150 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
        {open ? "Close" : "Menu"}
      </button>
      <div
        ref={panelRef}
        id="mobile-menu"
        className="menu-panel on-ink absolute inset-x-0 top-full z-40 border-b border-rule-ink"
        hidden={!open}
      >
        <nav aria-label="Mobile" className="wrap pb-6 pt-2">
          <ul>
            {[...primaryNav, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href} className="border-b border-rule-ink">
                <Link
                  href={item.href}
                  className="flex min-h-14 items-center justify-between font-display text-[1.75rem] leading-none"
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span className="arrow text-brass" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <a className="btn btn-light" href={whatsappDirectHref}>Enquire on WhatsApp</a>
            <a className="btn btn-outline-ink" href={telHref}>Call {business.phone.display}</a>
          </div>
        </nav>
      </div>
    </div>
  );
}
