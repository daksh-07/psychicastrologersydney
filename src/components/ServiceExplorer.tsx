"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArtImage } from "@/components/art/ArtImage";
import type { ArtKey } from "@/content/art";
import { categories, services, type CategorySlug, type Service } from "@/content/catalogue";

const CATEGORY_ART: Record<CategorySlug, ArtKey> = {
  love: "radha-storm",
  "marriage-family": "shiva-parvati",
  readings: "budha",
  "work-life": "jantar-mantar",
  spiritual: "ganesha",
};
const artFor = (s: Service): ArtKey => s.art ?? CATEGORY_ART[s.category];

/**
 * Interactive consultation index.
 * Desktop: category tabs + editorial list; hovering or focusing a row swaps the sticky preview.
 * Mobile: the same tabs drive a swipeable, snap-scrolling card rail.
 */
export function ServiceExplorer({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const [cat, setCat] = useState<CategorySlug | "all">("all");
  const list = useMemo(() => (cat === "all" ? services : services.filter((s) => s.category === cat)), [cat]);
  const [activeSlug, setActiveSlug] = useState(services[0]!.slug);
  const active = list.find((s) => s.slug === activeSlug) ?? list[0]!;
  const previewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const prevArt = useRef<ArtKey>(artFor(active));
  const H = headingLevel;

  // Keep a valid active row when the tab changes; animate the list in.
  useEffect(() => {
    if (!list.some((s) => s.slug === activeSlug)) setActiveSlug(list[0]!.slug);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = listRef.current?.querySelectorAll("[data-row]");
    if (rows?.length) gsap.fromTo(rows, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out", stagger: 0.04 });
    const cards = railRef.current?.querySelectorAll("[data-card]");
    if (cards?.length) gsap.fromTo(cards, { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out", stagger: 0.05 });
    railRef.current?.scrollTo({ left: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat]);

  // Preview wipe when the artwork changes.
  useEffect(() => {
    const el = previewRef.current;
    const next = artFor(active);
    if (!el || prevArt.current === next) return;
    prevArt.current = next;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = el.querySelector("[data-preview-img]");
    gsap.fromTo(img, { clipPath: "inset(0% 0% 100% 0%)", scale: 1.12 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.9, ease: "expo.out", overwrite: true });
    gsap.fromTo(el.querySelectorAll("[data-preview-text]"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out", stagger: 0.05 });
  }, [active]);

  const tabs = [{ slug: "all" as const, name: "All", numeral: "" }, ...categories.map((c) => ({ slug: c.slug, name: c.short, numeral: c.numeral }))];
  const activeArt = artFor(active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter consultations by area"
        className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]"
        onKeyDown={(e) => {
          const i = tabs.findIndex((t) => t.slug === cat);
          const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
          if (n === null) return;
          e.preventDefault();
          const next = tabs[(n + tabs.length) % tabs.length]!;
          setCat(next.slug);
          (e.currentTarget.querySelector(`[data-tab="${next.slug}"]`) as HTMLElement | null)?.focus();
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            data-tab={t.slug}
            aria-selected={cat === t.slug}
            aria-controls="explorer-panel"
            tabIndex={cat === t.slug ? 0 : -1}
            className="tab"
            onClick={() => setCat(t.slug)}
          >
            {t.numeral && <span className="numeral mr-1.5 font-normal opacity-70">{t.numeral}</span>}
            {t.name}
          </button>
        ))}
      </div>

      <div id="explorer-panel" role="tabpanel" className="mt-10">
        {/* Desktop: list + sticky preview */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <ul ref={listRef}>
            {list.map((s, i) => (
              <li key={s.slug} data-row>
                <Link
                  href={`/consultations/${s.slug}`}
                  className="svc-item"
                  data-active={s.slug === active.slug}
                  onMouseEnter={() => setActiveSlug(s.slug)}
                  onFocus={() => setActiveSlug(s.slug)}
                >
                  <span className="numeral accent text-lg">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <H className="svc-name">{s.name}</H>
                    <span className="mt-1 block text-sm muted">{categories.find((c) => c.slug === s.category)!.name}</span>
                  </div>
                  <span className="arr text-xl" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative">
            <div ref={previewRef} className="sticky top-[calc(var(--header-h)+24px)]" aria-hidden="true">
              <div className="frame arch-sm aspect-[4/5]">
                <div data-preview-img className="h-full w-full">
                  <ArtImage name={activeArt} sizes="(min-width:1100px) 38vw, 0px" alt="" className="h-full w-full" />
                </div>
              </div>
              <p data-preview-text className="t-h4 mt-6">{active.summary}</p>
            </div>
          </div>
        </div>

        {/* Mobile & tablet: snap rail */}
        <ul ref={railRef} className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] lg:hidden">
          {list.map((s, i) => (
            <li key={s.slug} data-card className="w-[78%] max-w-[340px] flex-none snap-start sm:w-[44%]">
              <Link href={`/consultations/${s.slug}`} className="group block no-underline">
                <div className="frame arch-sm aspect-[4/5]">
                  <ArtImage name={artFor(s)} sizes="(max-width: 640px) 78vw, 44vw" alt="" className="h-full w-full transition-transform duration-700 group-active:scale-[1.03]" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="numeral accent">{String(i + 1).padStart(2, "0")}</span>
                  <H className="font-display text-[1.6rem] leading-tight">{s.name}</H>
                </div>
                <p className="muted mt-1 text-[0.95rem]">{s.summary}</p>
                <span className="ulink mt-2 text-sm">Read more <span className="arr" aria-hidden="true">→</span></span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="caption muted mt-2 lg:hidden" aria-hidden="true">Swipe to see more →</p>
      </div>
    </div>
  );
}
