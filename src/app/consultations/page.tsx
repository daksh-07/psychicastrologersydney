import type { Metadata } from "next";
import Link from "next/link";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { ArtImage } from "@/components/art/ArtImage";
import { FinalCta } from "@/components/FinalCta";
import { Ornament } from "@/components/Ornament";
import { ServiceExplorer } from "@/components/ServiceExplorer";
import { categories, servicesIn } from "@/content/catalogue";
import type { ArtKey } from "@/content/art";

export const metadata: Metadata = {
  title: "Astrology, psychic & spiritual consultations",
  description:
    "All sixteen consultation areas offered by Pandit Thulasidas in Sydney: love and relationships, marriage and family, Vedic astrology and readings, work and money, and spiritual guidance.",
  openGraph: { title: "Consultations — Pandit Thulasidas", url: "/consultations" },
};

const CAT_ART: Record<string, ArtKey> = {
  love: "radha-storm",
  "marriage-family": "vishnu-lakshmi",
  readings: "taurus",
  "work-life": "jantar-mantar",
  spiritual: "ganesha",
};

export default function ConsultationsPage() {
  return (
    <>
      <section className="s-ivory grain relative overflow-hidden" data-hero>
        <div className="pointer-events-none absolute -right-[20vw] -top-[8vw] w-[70vw] max-w-[900px] text-[var(--color-saffron-deep)] opacity-20" aria-hidden="true">
          <div data-spin="220"><Ornament className="h-auto w-full" draw={false} /></div>
        </div>
        <div className="wrap relative pb-16 pt-10 md:pb-24 md:pt-16">
          <p className="eyebrow accent" data-hero-in="1">Consultations · Five areas, sixteen questions</p>
          <HeroTitle className="t-mega mt-6 max-w-[12ch]" text="Every question has *a door*." />
          <p className="lede muted mt-8" data-hero-in="2">
            Each consultation is private and one to one. Choose the area closest to your question — if more than one
            fits, mention that when you enquire.
          </p>
          <nav aria-label="Consultation areas" className="mt-10 flex flex-wrap gap-2" data-hero-in="3">
            {categories.map((c) => (
              <a key={c.slug} href={`#${c.slug}`} className="tab inline-flex items-center hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]">
                <span className="numeral mr-1.5 font-normal opacity-70">{c.numeral}</span>{c.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="s-paper sec-sm border-y border-[var(--color-rule)]" aria-labelledby="explorer-title">
        <div className="wrap">
          <h2 id="explorer-title" className="t-h3">Browse at a glance</h2>
          <div className="mt-8"><ServiceExplorer headingLevel="h3" /></div>
        </div>
      </section>

      {categories.map((c, ci) => {
        const dark = ci % 2 === 1;
        return (
          <section key={c.slug} id={c.slug} className={`${dark ? "s-ink dark" : "s-ivory"} sec scroll-mt-20`} aria-labelledby={`${c.slug}-title`}>
            <div className="wrap grid-x gap-y-12">
              <div className={`col-span-4 md:col-span-3 lg:col-span-4 ${ci % 2 ? "lg:order-2 lg:col-start-9" : ""}`}>
                <div className="frame arch-sm aspect-[3/4] max-w-[380px]" data-reveal="image">
                  <ArtImage name={CAT_ART[c.slug]!} sizes="(min-width:1100px) 28vw, (min-width:768px) 36vw, 90vw" alt="" className="h-full w-full" />
                </div>
              </div>
              <div className={`col-span-4 md:col-span-5 lg:col-span-7 ${ci % 2 ? "lg:col-start-1" : "lg:col-start-6"}`}>
                <p className="numeral accent text-3xl">{c.numeral}</p>
                <h2 id={`${c.slug}-title`} className="t-display mt-3" data-split>{c.name}</h2>
                <p className="lede muted mt-6">{c.intro}</p>
                <ul className="mt-10" data-stagger>
                  {servicesIn(c.slug).map((s) => (
                    <li key={s.slug} className={`border-t ${dark ? "border-white/15" : "border-[var(--color-rule)]"} last:border-b`}>
                      <Link href={`/consultations/${s.slug}`} className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5 no-underline">
                        <span>
                          <span className="block font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-tight transition-transform duration-500 group-hover:translate-x-2">{s.name}</span>
                          <span className="muted mt-1 block text-[0.95rem]">{s.summary}</span>
                        </span>
                        <span className="accent text-xl transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <FinalCta heading="Not sure" italic="which to choose?" body="Describe your question in a sentence and ask which consultation suits it. A short message is enough to begin." />
    </>
  );
}
