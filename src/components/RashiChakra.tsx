"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Rāśi Chakra — the site's signature interaction. A decorative, calibrated wheel of the twelve
 * rāśis of Jyotiṣa with their traditional planetary rulers. It is NOT a birth chart.
 */
const RASHIS = [
  { deva: "मेष", lat: "Meṣa", en: "Aries", lord: "Maṅgala", lordEn: "Mars" },
  { deva: "वृषभ", lat: "Vṛṣabha", en: "Taurus", lord: "Śukra", lordEn: "Venus" },
  { deva: "मिथुन", lat: "Mithuna", en: "Gemini", lord: "Budha", lordEn: "Mercury" },
  { deva: "कर्क", lat: "Karka", en: "Cancer", lord: "Candra", lordEn: "Moon" },
  { deva: "सिंह", lat: "Siṃha", en: "Leo", lord: "Sūrya", lordEn: "Sun" },
  { deva: "कन्या", lat: "Kanyā", en: "Virgo", lord: "Budha", lordEn: "Mercury" },
  { deva: "तुला", lat: "Tulā", en: "Libra", lord: "Śukra", lordEn: "Venus" },
  { deva: "वृश्चिक", lat: "Vṛścika", en: "Scorpio", lord: "Maṅgala", lordEn: "Mars" },
  { deva: "धनु", lat: "Dhanu", en: "Sagittarius", lord: "Guru", lordEn: "Jupiter" },
  { deva: "मकर", lat: "Makara", en: "Capricorn", lord: "Śani", lordEn: "Saturn" },
  { deva: "कुम्भ", lat: "Kumbha", en: "Aquarius", lord: "Śani", lordEn: "Saturn" },
  { deva: "मीन", lat: "Mīna", en: "Pisces", lord: "Guru", lordEn: "Jupiter" },
] as const;

const C = 400;
const R_OUT = 352;
const R_IN = 272;

const pt = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [+(C + r * Math.cos(a)).toFixed(2), +(C + r * Math.sin(a)).toFixed(2)] as const;
};

const sectorPath = (i: number) => {
  const a0 = i * 30;
  const a1 = a0 + 30;
  const [x0, y0] = pt(R_OUT, a0);
  const [x1, y1] = pt(R_OUT, a1);
  const [x2, y2] = pt(R_IN, a1);
  const [x3, y3] = pt(R_IN, a0);
  return `M${x0} ${y0} A${R_OUT} ${R_OUT} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R_IN} ${R_IN} 0 0 0 ${x3} ${y3} Z`;
};

const bezelTicks = Array.from({ length: 180 }, (_, i) => {
  const deg = i * 2;
  const major = deg % 30 === 0;
  const mid = deg % 10 === 0;
  const [x1, y1] = pt(major ? 362 : mid ? 368 : 372, deg);
  const [x2, y2] = pt(380, deg);
  return { x1, y1, x2, y2, w: major ? 1.4 : 0.7 };
});
const nakshatraTicks = Array.from({ length: 27 }, (_, i) => {
  const deg = (360 / 27) * i;
  const [x1, y1] = pt(238, deg);
  const [x2, y2] = pt(258, deg);
  return { x1, y1, x2, y2 };
});
const lotus = Array.from({ length: 8 }, (_, i) => i * 45);
const GRAHA_ORBITS = [
  { r: 214, n: 3, speed: 140 },
  { r: 176, n: 3, speed: -100 },
  { r: 138, n: 3, speed: 70 },
];

export function RashiChakra({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<SVGSVGElement>(null);
  const pointerRef = useRef<SVGGElement>(null);
  const userRef = useRef(false);
  const angleRef = useRef(15);

  const ink = tone === "dark" ? "#f5eee2" : "#1b1713";
  const brass = tone === "dark" ? "#e2a04a" : "#8a4a12";
  const faint = tone === "dark" ? "rgba(245,238,226,0.22)" : "rgba(27,23,19,0.2)";

  const pointTo = useCallback((deg: number, animate = true) => {
    const g = pointerRef.current;
    if (!g) return;
    // shortest rotation path
    let delta = ((deg - angleRef.current + 540) % 360) - 180;
    if (Math.abs(delta) < 0.01) delta = 0;
    angleRef.current += delta;
    gsap.to(g, { rotation: angleRef.current, svgOrigin: `${C} ${C}`, duration: animate ? 1.1 : 0, ease: "expo.out", overwrite: true });
  }, []);

  const select = useCallback(
    (i: number, fromUser = true) => {
      const idx = (i + 12) % 12;
      if (fromUser) userRef.current = true;
      setActive(idx);
      pointTo(idx * 30 + 15);
    },
    [pointTo],
  );

  // Initial pointer placement.
  useEffect(() => {
    pointTo(15, false);
  }, [pointTo]);

  // Continuous motion: bezel, nakshatra ring and graha orbits.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !discRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-ring='bezel']", { rotation: 360, svgOrigin: `${C} ${C}`, duration: 240, ease: "none", repeat: -1 });
      gsap.to("[data-ring='naks']", { rotation: -360, svgOrigin: `${C} ${C}`, duration: 180, ease: "none", repeat: -1 });
      GRAHA_ORBITS.forEach((o, i) => {
        gsap.to(`[data-orbit='${i}']`, { rotation: o.speed > 0 ? 360 : -360, svgOrigin: `${C} ${C}`, duration: Math.abs(o.speed), ease: "none", repeat: -1 });
      });
      gsap.from("[data-chakra-label]", { opacity: 0, duration: 0.8, stagger: 0.05, ease: "power2.out", delay: 0.2 });
    }, discRef);
    return () => ctx.revert();
  }, []);

  // Pointer tracking + subtle 3D tilt (fine pointers only).
  useEffect(() => {
    const wrap = wrapRef.current;
    const disc = discRef.current;
    if (!wrap || !disc) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    const rx = gsap.quickTo(disc, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(disc, "rotationY", { duration: 0.8, ease: "power3.out" });
    let last = -1;
    const onMove = (e: PointerEvent) => {
      const r = disc.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (!reduce) {
        rx(gsap.utils.clamp(-7, 7, (-dy / r.height) * 14));
        ry(gsap.utils.clamp(-7, 7, (dx / r.width) * 14));
      }
      const dist = Math.hypot(dx, dy) / (r.width / 2);
      if (dist > 1.25) return;
      const deg = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360;
      userRef.current = true;
      pointTo(deg);
      const idx = Math.floor(deg / 30) % 12;
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [pointTo]);

  // Idle tour while visible, until the visitor takes over.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    if (reduce || !wrap) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting), { threshold: 0.4 });
    io.observe(wrap);
    const id = window.setInterval(() => {
      if (!visible || userRef.current || document.hidden) return;
      setActive((a) => {
        const n = (a + 1) % 12;
        pointTo(n * 30 + 15);
        return n;
      });
    }, 2800);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [pointTo]);

  const r = RASHIS[active]!;

  return (
    <div ref={wrapRef} className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" data-chakra>
      <div className="relative mx-auto w-full max-w-[620px]" style={{ perspective: "1200px" }}>
        <svg
          ref={discRef}
          viewBox="0 0 800 800"
          className="h-auto w-full touch-manipulation select-none will-change-transform"
          role="group"
          aria-labelledby={`${uid}-title`}
          aria-describedby={`${uid}-desc`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <title id={`${uid}-title`}>Rāśi chakra — the twelve signs of Jyotiṣa</title>
          <desc id={`${uid}-desc`}>A decorative wheel. Select a sign to read its name and traditional ruling graha.</desc>

          <g data-ring="bezel" stroke={ink} fill="none">
            <circle cx={C} cy={C} r={386} strokeOpacity={0.35} strokeWidth={0.8} />
            <circle cx={C} cy={C} r={380} strokeOpacity={0.55} strokeWidth={0.8} />
            {bezelTicks.map((t, i) => (
              <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.w} strokeOpacity={0.6} />
            ))}
          </g>

          {/* Rāśi sectors */}
          <g>
            {RASHIS.map((ra, i) => {
              const on = i === active;
              const mid = i * 30 + 15;
              const flip = mid > 90 && mid < 270;
              const [lx, ly] = pt(322, mid);
              const [tx, ty] = pt(292, mid);
              const rot = flip ? mid + 180 : mid;
              return (
                <g key={ra.lat}>
                  <path
                    d={sectorPath(i)}
                    fill={on ? brass : "transparent"}
                    fillOpacity={on ? 0.16 : 0}
                    stroke={faint}
                    strokeWidth={1}
                    className="cursor-pointer transition-[fill-opacity] duration-500"
                    onClick={() => select(i)}
                  />
                  <text
                    data-chakra-label
                    x={lx}
                    y={ly}
                    transform={`rotate(${rot} ${lx} ${ly})`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={on ? brass : ink}
                    fillOpacity={on ? 1 : 0.78}
                    style={{ fontFamily: "var(--font-deva)", fontSize: 25, transition: "fill 400ms" }}
                    pointerEvents="none"
                  >
                    {ra.deva}
                  </text>
                  <text
                    x={tx}
                    y={ty}
                    transform={`rotate(${rot} ${tx} ${ty})`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={ink}
                    fillOpacity={on ? 0.95 : 0.5}
                    style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600 }}
                    pointerEvents="none"
                  >
                    {ra.lat}
                  </text>
                </g>
              );
            })}
            <circle cx={C} cy={C} r={R_OUT} fill="none" stroke={ink} strokeOpacity={0.5} strokeWidth={1} />
            <circle cx={C} cy={C} r={R_IN} fill="none" stroke={ink} strokeOpacity={0.5} strokeWidth={1} />
          </g>

          {/* 27 nakṣatra divisions */}
          <g data-ring="naks" stroke={ink} strokeOpacity={0.45} strokeWidth={0.8}>
            <circle cx={C} cy={C} r={248} fill="none" strokeDasharray="1 5" />
            {nakshatraTicks.map((t, i) => (
              <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
            ))}
          </g>

          {/* Graha orbits */}
          {GRAHA_ORBITS.map((o, oi) => (
            <g key={oi}>
              <circle cx={C} cy={C} r={o.r} fill="none" stroke={ink} strokeOpacity={0.16} strokeWidth={0.8} />
              <g data-orbit={oi}>
                {Array.from({ length: o.n }, (_, k) => {
                  const [x, y] = pt(o.r, k * (360 / o.n) + oi * 37);
                  return <circle key={k} cx={x} cy={y} r={k === 0 ? 6 : 3.5} fill={k === 0 ? brass : ink} fillOpacity={k === 0 ? 1 : 0.7} />;
                })}
              </g>
            </g>
          ))}

          {/* Aṣṭadala — eight-petal lotus at the centre */}
          <g fill="none" stroke={brass} strokeWidth={1.1} strokeOpacity={0.9}>
            {lotus.map((d) => (
              <path key={d} d={`M${C} ${C} C ${C - 20} ${C - 40}, ${C - 14} ${C - 82}, ${C} ${C - 96} C ${C + 14} ${C - 82}, ${C + 20} ${C - 40}, ${C} ${C} Z`} transform={`rotate(${d} ${C} ${C})`} />
            ))}
            <circle cx={C} cy={C} r={14} fill={tone === "dark" ? "#1b1713" : "#f5eee2"} />
            <circle cx={C} cy={C} r={4} fill={brass} stroke="none" />
          </g>

          {/* Alidade pointer */}
          <g ref={pointerRef} pointerEvents="none">
            <line x1={C} y1={C - 20} x2={C} y2={C - 394} stroke={brass} strokeWidth={1.6} />
            <path d={`M${C - 7} ${C - 380} L${C} ${C - 398} L${C + 7} ${C - 380} Z`} fill={brass} />
            <circle cx={C} cy={C - 262} r={5} fill="none" stroke={brass} strokeWidth={1.4} />
          </g>
        </svg>
      </div>

      <div>
        <p className="eyebrow accent">Rāśi {String(active + 1).padStart(2, "0")} of 12</p>
        <div aria-live="polite" className="mt-5">
          <p className="deva text-[clamp(3.5rem,8vw,6.5rem)] leading-[1.05]" lang="sa">{r.deva}</p>
          <p className="t-h3 mt-2">
            {r.lat} <span className="muted italic">· {r.en}</span>
          </p>
          <p className="muted mt-4">
            Traditional ruling graha: <span className="font-semibold text-current">{r.lord}</span> ({r.lordEn})
          </p>
        </div>
        <div
          className="mt-8 grid grid-cols-4 gap-1.5 sm:grid-cols-6"
          role="radiogroup"
          aria-label="Choose a rāśi"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              select(active + 1);
              (e.currentTarget.children[(active + 1) % 12] as HTMLElement)?.focus();
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              select(active - 1);
              (e.currentTarget.children[(active + 11) % 12] as HTMLElement)?.focus();
            }
          }}
        >
          {RASHIS.map((ra, i) => (
            <button
              key={ra.lat}
              type="button"
              role="radio"
              aria-checked={i === active}
              aria-label={`${ra.lat}, ${ra.en}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              className={`deva flex min-h-11 items-center justify-center rounded-full border text-[1.05rem] transition-colors duration-300 ${
                i === active ? "border-transparent bg-[var(--color-saffron)] text-[var(--color-ink)]" : "border-current/25 hover:border-current/70"
              }`}
              lang="sa"
            >
              {ra.deva}
            </button>
          ))}
        </div>
        <p className="caption muted mt-6 max-w-[46ch]">
          An interactive study of the twelve rāśis and their traditional rulers in Jyotiṣa, with the 27 nakṣatra
          divisions on the inner ring. Decorative — this is not anyone&apos;s birth chart.
        </p>
      </div>
    </div>
  );
}
