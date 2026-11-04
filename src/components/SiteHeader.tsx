"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { business, telHref, whatsappDirectHref } from "@/config/business";
import { categories, servicesIn } from "@/content/catalogue";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "Questions" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const megaBtn = useRef<HTMLButtonElement>(null);
  const megaPanel = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  /* Scroll state: solid background after 24px; hide while scrolling down. */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden((h) => (y > 480 && y > lastY + 4 ? true : y < lastY - 4 ? false : h));
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close everything on navigation. */
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  /* Overlay menu animation, focus and scroll lock. */
  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      el.hidden = false;
      tl.current?.kill();
      if (!reduce) {
        tl.current = gsap
          .timeline()
          .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "expo.inOut" })
          .from(el.querySelectorAll("[data-menu-item]"), { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.35)
          .from(el.querySelectorAll("[data-menu-fade]"), { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.05 }, 0.55);
      }
      el.querySelector<HTMLElement>("[data-menu-close]")?.focus();
    } else {
      document.body.style.overflow = "";
      if (el.hidden) return;
      tl.current?.kill();
      if (reduce) {
        el.hidden = true;
      } else {
        tl.current = gsap.timeline({ onComplete: () => { el.hidden = true; gsap.set(el, { clearProps: "clipPath" }); } })
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: "expo.inOut" });
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuBtn.current?.focus();
  }, []);

  /* Keyboard: Escape closes; Tab is trapped inside the open overlay. */
  useEffect(() => {
    if (!menuOpen && !megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuOpen) closeMenu();
        if (megaOpen) {
          setMegaOpen(false);
          megaBtn.current?.focus();
        }
      }
      if (e.key === "Tab" && menuOpen && overlay.current) {
        const f = overlay.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      if (megaOpen && megaPanel.current && !megaPanel.current.contains(e.target as Node) && !megaBtn.current?.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen, megaOpen, closeMenu]);

  /* Mega panel reveal. */
  useEffect(() => {
    const p = megaPanel.current;
    if (!p || !megaOpen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(p, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out" });
    gsap.from(p.querySelectorAll("[data-mega-col]"), { y: 16, autoAlpha: 0, duration: 0.7, ease: "expo.out", stagger: 0.05, delay: 0.1 });
  }, [megaOpen]);

  return (
    <>
      <header
        className="site-header"
        data-scrolled={scrolled || megaOpen}
        data-hidden={hidden && !megaOpen && !menuOpen}
      >
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="group flex min-h-11 items-center gap-2.5 no-underline">
            <span className="whitespace-nowrap font-display text-[1.3rem] leading-none tracking-[-0.01em] min-[400px]:text-[1.6rem] md:text-[1.85rem]">
              Pandit <em className="italic">Thulasidas</em>
            </span>
            <span className="eyebrow muted hidden xl:inline">Vedic astrologer · Sydney</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            <button
              ref={megaBtn}
              type="button"
              className="nav-link gap-1.5"
              aria-expanded={megaOpen}
              aria-controls="mega-panel"
              aria-current={pathname.startsWith("/consultations") ? "page" : undefined}
              onClick={() => setMegaOpen((v) => !v)}
            >
              Consultations
              <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}>
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link" aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={telHref} className="nav-link hidden text-sm xl:inline-flex">{business.phone.display}</a>
            <a href={whatsappDirectHref} className="btn btn-solid hidden !min-h-11 !px-5 !text-sm sm:inline-flex">
              WhatsApp
            </a>
            <button
              ref={menuBtn}
              type="button"
              className="js-menu-toggle inline-flex min-h-11 flex-none items-center gap-2 rounded-full border border-current/30 px-3.5 text-sm font-semibold lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current" />
              </span>
              Menu
            </button>
            <noscript>
              <a href="#footer-nav" className="inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold lg:hidden">Menu</a>
              <style>{`.js-menu-toggle{display:none!important}`}</style>
            </noscript>
          </div>
        </div>

        {/* Desktop mega panel */}
        <div
          ref={megaPanel}
          id="mega-panel"
          hidden={!megaOpen}
          className="absolute inset-x-0 top-full hidden border-t border-[var(--color-rule)] bg-[var(--color-ivory)] shadow-[0_30px_60px_-30px_rgba(27,23,19,0.35)] lg:block"
        >
          <div className="wrap grid grid-cols-5 gap-8 py-10">
            {categories.map((c) => (
              <div key={c.slug} data-mega-col>
                <p className="flex items-baseline gap-2">
                  <span className="numeral accent text-lg">{c.numeral}</span>
                  <span className="eyebrow">{c.name}</span>
                </p>
                <ul className="mt-4 grid gap-0.5">
                  {servicesIn(c.slug).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/consultations/${s.slug}`} className="nav-link !min-h-9 !px-0 font-display !text-[1.2rem] leading-tight">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="wrap flex items-center justify-between border-t border-[var(--color-rule)] py-4 text-sm">
            <Link href="/consultations" className="ulink">All consultations <span className="arr" aria-hidden="true">→</span></Link>
            <span className="muted">Private, one-to-one consultations · {business.locality}</span>
          </div>
        </div>
      </header>

      {/* Mobile / tablet overlay menu */}
      <div ref={overlay} id="site-menu" className="menu-overlay dark grain" hidden role="dialog" aria-modal="true" aria-label="Site menu">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between">
          <span className="font-display text-[1.6rem] leading-none">
            Pandit <em className="italic text-[var(--color-saffron)]">Thulasidas</em>
          </span>
          <button
            type="button"
            data-menu-close
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold"
            onClick={closeMenu}
          >
            Close <span aria-hidden="true">✕</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="wrap pb-10 pt-6">
          <ul>
            {[{ href: "/", label: "Home" }, { href: "/consultations", label: "Consultations" }, ...NAV].map((n, i) => (
              <li key={n.href} className="overflow-hidden border-b border-white/10">
                <Link
                  href={n.href}
                  data-menu-item
                  className="menu-big flex min-h-[4.5rem] items-center justify-between py-2 no-underline"
                  aria-current={pathname === n.href ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>
                    <span className="numeral mr-3 align-top text-base text-[var(--color-saffron)]">0{i + 1}</span>
                    {n.label}
                  </span>
                  <span aria-hidden="true" className="text-2xl text-[var(--color-saffron)]">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-3 sm:grid-cols-2" data-menu-fade>
            <a href={whatsappDirectHref} className="btn btn-saffron">Enquire on WhatsApp <span className="arr" aria-hidden="true">→</span></a>
            <a href={telHref} className="btn btn-line">Call {business.phone.display}</a>
          </div>
          <div className="mt-12" data-menu-fade>
            <p className="eyebrow text-[var(--color-on-dark-soft)]">Consultation areas</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/consultations#${c.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm" onClick={() => setMenuOpen(false)}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
