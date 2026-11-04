import type { Metadata } from "next";
import Link from "next/link";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { ArtFigure } from "@/components/art/ArtFigure";
import { ArtImage } from "@/components/art/ArtImage";
import { FinalCta } from "@/components/FinalCta";
import { business } from "@/config/business";
import { categories, servicesIn } from "@/content/catalogue";
import { principles } from "@/content/general";

export const metadata: Metadata = {
  title: "About Pandit Thulasidas",
  description:
    "Pandit Thulasidas is a Vedic astrologer, psychic reader and spiritual advisor in Sydney offering private, one-to-one consultations.",
  openGraph: { title: "About Pandit Thulasidas", url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="s-ink dark grain relative overflow-hidden" data-hero>
        <div className="absolute inset-0 opacity-45" data-hero-art>
          <ArtImage name="lepakshi" sizes="100vw" priority alt="" className="h-full w-full" focus="50% 60%" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/80 to-transparent" />
        <div className="wrap relative flex min-h-[78svh] flex-col justify-end pb-16 pt-24 md:pb-24">
          <p className="eyebrow accent" data-hero-in="1">About · Merrylands, Sydney</p>
          <HeroTitle className="t-mega mt-6 max-w-[11ch]" text="Meet Pandit *Thulasidas*" />
          <p className="lede muted mt-8" data-hero-in="2">
            A Vedic astrologer, psychic reader and spiritual advisor offering private consultations in Sydney — for
            love, marriage, family, career, business, finances and personal concerns.
          </p>
        </div>
      </section>

      <section className="s-ivory sec" aria-labelledby="practice-title">
        <div className="wrap grid-x gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <p className="eyebrow accent">The practice</p>
            <h2 id="practice-title" className="t-h2 mt-5" data-split>Traditional knowledge, <em>one person</em> at a time.</h2>
            <div className="prose-at mt-8 max-w-[58ch] text-[1.05rem]" data-reveal="rise">
              <p>
                With knowledge of traditional Indian astrology and spiritual practice, Pandit Thulasidas provides
                one-to-one consultations tailored to the questions and circumstances of each person.
              </p>
              <p className="muted">
                His services include Vedic astrology and horoscope reading, palmistry, psychic guidance, love and
                relationship consultations, and spiritual guidance for concerns such as negative energy, recurring
                obstacles and the evil eye.
              </p>
              <p className="muted">
                The aim, in the practice&apos;s own words, is “a traditional astrology or psychic perspective that may help
                clients better understand their circumstances and possible choices.”
              </p>
            </div>
            <div className="mt-12 flex items-end gap-6 border-t border-[var(--color-rule)] pt-8" data-reveal="rise">
              <p className="font-display text-[clamp(4rem,8vw,6.5rem)] font-light leading-[0.8] accent">25<span className="align-top text-[0.5em]">+</span></p>
              <p className="caption muted max-w-[34ch] pb-1">
                The current website states {business.experienceClaim}. <strong className="text-[var(--color-ink)]">Awaiting confirmation before publication.</strong>
              </p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <ArtFigure name="krishna-awaiting" shape="arch" ratio="3 / 4" sizes="(min-width:1100px) 34vw, 90vw" className="mx-auto max-w-[440px]" />
            <div className="mt-10 rounded-[6px] border border-dashed border-[var(--color-ink)]/30 p-6">
              <p className="eyebrow">For the owner</p>
              <p className="muted mt-2 text-[0.95rem]">
                No photograph of Pandit Thulasidas appears on the current website, so none is used here. A client-approved
                portrait would take this place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="s-parchment grain sec" aria-labelledby="areas-title">
        <div className="wrap">
          <h2 id="areas-title" className="t-h2 max-w-[18ch]" data-split>What people <em>bring</em></h2>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5" data-stagger>
            {categories.map((c) => (
              <div key={c.slug} className="border-t border-[var(--color-ink)]/25 pt-5">
                <p className="numeral accent text-2xl">{c.numeral}</p>
                <h3 className="t-h4 mt-2">{c.name}</h3>
                <ul className="mt-3 grid gap-1 text-[0.95rem]">
                  {servicesIn(c.slug).map((s) => (
                    <li key={s.slug}><Link href={`/consultations/${s.slug}`} className="underline-offset-4 hover:underline">{s.name}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s-ivory sec-sm" aria-labelledby="held-title">
        <div className="wrap">
          <h2 id="held-title" className="t-h2" data-split>How consultations are <em>held</em></h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {principles.map((p, i) => (
              <li key={p.title}>
                <span className="numeral accent text-2xl">{["i", "ii", "iii", "iv"][i]}</span>
                <h3 className="t-h4 mt-3">{p.title}</h3>
                <p className="muted mt-2 text-[0.95rem]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta heading="Ask a" italic="first question." />
    </>
  );
}
