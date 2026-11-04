import type { Metadata } from "next";
import Link from "next/link";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";
import { disclaimer } from "@/config/business";
import { categories, servicesIn } from "@/content/catalogue";
import { generalFaqs } from "@/content/general";

export const metadata: Metadata = {
  title: "Questions about consultations",
  description:
    "How to book, phone consultations, what to prepare, fees, privacy and the scope of astrology and spiritual guidance with Pandit Thulasidas in Sydney.",
  openGraph: { title: "Questions — Pandit Thulasidas", url: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <section className="s-parchment grain" data-hero>
        <div className="wrap pb-16 pt-10 md:pb-24 md:pt-16">
          <p className="eyebrow accent" data-hero-in="1">Questions</p>
          <HeroTitle className="t-mega mt-6 max-w-[11ch]" text="Asked, and *answered*." />
          <p className="lede muted mt-8" data-hero-in="2">Practical answers about booking, preparing and what a consultation can — and cannot — offer.</p>
        </div>
      </section>

      <section className="s-ivory sec" aria-label="General questions">
        <div className="wrap grid-x gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <h2 className="t-h2" data-split>General</h2>
            <div className="mt-10 rounded-[6px] border-l-2 border-[var(--color-saffron-deep)] bg-[var(--color-paper)] p-6">
              <p className="eyebrow accent">Scope of guidance</p>
              <p className="mt-3" data-disclaimer>{disclaimer}</p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={generalFaqs} name="general" />
          </div>
        </div>
      </section>

      <section className="s-paper sec-sm border-t border-[var(--color-rule)]" aria-labelledby="by-topic">
        <div className="wrap">
          <h2 id="by-topic" className="t-h2" data-split>By <em>consultation</em></h2>
          <p className="muted mt-4 max-w-[60ch]">Each consultation page has its own questions. Choose one to read them.</p>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <div key={c.slug}>
                <p className="eyebrow"><span className="numeral accent mr-1.5 text-sm normal-case tracking-normal">{c.numeral}</span>{c.name}</p>
                <ul className="mt-3 grid gap-1">
                  {servicesIn(c.slug).map((s) => (
                    <li key={s.slug}><Link className="inline-flex min-h-9 items-center underline-offset-4 hover:underline" href={`/consultations/${s.slug}#sfaq-title`}>{s.name}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link href="/contact" className="ulink mt-12">Still have a question? Contact Pandit Thulasidas <span className="arr" aria-hidden="true">→</span></Link>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
