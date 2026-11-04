"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "expo.out";

/**
 * Declarative motion layer. Elements opt in with data attributes:
 *  (Hero entrance is CSS-only — see HeroTitle and `.motion [data-hero-in]` in globals.css.)
 *  data-split           masked line reveal on scroll
 *  data-reveal="image"  clip-path wipe + inner zoom-out
 *  data-reveal="rise"   gentle rise + fade
 *  data-stagger         children rise in sequence
 *  data-parallax="n"    scroll-linked vertical drift (n = strength)
 *  data-draw            SVG strokes (.draw) drawn on scroll
 *  data-spin="s"        slow continuous rotation (seconds per turn)
 *  data-hscroll="n"     horizontal drift linked to scroll
 * Content is fully visible without JavaScript and with reduced motion.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (reduce) {
      root.classList.remove("motion");
      return;
    }
    let ctx: gsap.Context | undefined;
    // Set up after the browser is idle so hydration and first input are never blocked.
    const start = () => {
    ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const splits: SplitText[] = [];

      /* ── Continuous decorative rotation ──────────────────────── */
      gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((el) => {
        const secs = Number(el.dataset.spin) || 120;
        gsap.to(el, { rotate: secs > 0 ? 360 : -360, duration: Math.abs(secs), ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      });

      /* ── Masked line reveals ─────────────────────────────────── */
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        if (el.closest("[data-hero]")) return;
        const st = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line" });
        splits.push(st);
        gsap.from(st.lines, {
          yPercent: 110,
          duration: 1.25,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      /* ── Image wipes ─────────────────────────────────────────── */
      gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        const dir = el.dataset.dir ?? "up";
        const from =
          dir === "left" ? "inset(0% 100% 0% 0%)" : dir === "right" ? "inset(0% 0% 0% 100%)" : "inset(100% 0% 0% 0%)";
        const img = el.querySelector("img");
        const t = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%", once: true } });
        t.fromTo(el, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" });
        if (img) t.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2, ease: EASE }, 0);
      });

      /* ── Rise ───────────────────────────────────────────────── */
      gsap.utils.toArray<HTMLElement>('[data-reveal="rise"]').forEach((el) => {
        gsap.from(el, { y: 36, autoAlpha: 0, duration: 1.2, ease: EASE, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      /* ── SVG line drawing ───────────────────────────────────── */
      gsap.utils.toArray<SVGSVGElement>("[data-draw]").forEach((svg) => {
        const paths = svg.querySelectorAll<SVGGeometryElement>(".draw");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
          stagger: 0.12,
          scrollTrigger: { trigger: svg, start: "top 85%", once: true },
        });
      });

      /* ── Scroll-linked drift (desktop and tablet only) ──────── */
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const n = Number(el.dataset.parallax) || 0.15;
          gsap.fromTo(
            el,
            { yPercent: -n * 50 },
            { yPercent: n * 50, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
          );
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((el) => {
        const n = Number(el.dataset.hscroll) || 20;
        gsap.fromTo(el, { xPercent: 0 }, { xPercent: -n, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      });

      return () => {
        splits.forEach((s) => s.revert());
        mm.revert();
      };
    });

    // Fonts can shift line breaks; refresh once they are ready.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    };
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = ric(start, { timeout: 1200 });

    return () => {
      cic(handle);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
