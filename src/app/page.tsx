import type { Metadata } from "next";
import Link from "next/link";
import { CelestialPlate } from "@/components/CelestialPlate";
import { CtaPanel } from "@/components/CtaPanel";
import { EditorialFigure } from "@/components/EditorialFigure";
import { FaqList } from "@/components/FaqList";
import { ServiceRows } from "@/components/ServiceRows";
import { business, disclaimer, telHref, whatsappDirectHref } from "@/config/business";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: { absolute: "Pandit Thulasidas · Vedic astrologer in Sydney" },
  description:
    "Explore a personal question through Vedic astrology, horoscope reading, palmistry or spiritual consultation with Pandit Thulasidas in Sydney.",
  openGraph: { title: "Pandit Thulasidas · Vedic astrology, one to one", url: "/" },
};

const steps = [
  {
    n: "i.",
    title: "Choose a topic",
    body: "Pick the area closest to your question — a horoscope reading, palmistry, relationships, work or a spiritual concern. If you are unsure, say so.",
  },
  {
    n: "ii.",
    title: "Ask about availability and format",
    body: "Send a WhatsApp message or call. Ask whether phone or in-person suits, what preparation helps, and the current fee.",
  },
  {
    n: "iii.",
    title: "Bring one question",
    body: "Arrive with the question you most want to discuss. A clear starting point leaves more of the consultation for conversation.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 01 — Opening */}
      <section className="on-ink" aria-labelledby="hero-title">
        <div className="wrap grid-cols items-center gap-y-12 pb-16 pt-12 md:pb-24 md:pt-20 lg:pb-28">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <p className="eyebrow brass">Pandit Thulasidas · Sydney</p>
            <h1 id="hero-title" className="display-1 mt-6">Vedic astrology, one to one.</h1>
            <p className="lead muted mt-8">
              Explore a personal question through Vedic astrology, horoscope reading, palmistry or spiritual
              consultation.
            </p>
            <div className="mt-10 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
              <a className="btn btn-light" href={whatsappDirectHref}>
                Enquire on WhatsApp <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a className="btn btn-outline-ink" href={telHref}>Call {business.phone.display}</a>
            </div>
          </div>
          <figure className="col-span-4 mx-auto w-full max-w-[560px] md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-7">
            <CelestialPlate tone="ink" animate className="h-auto w-full" />
            <figcaption className="fig-caption animate eyebrow muted mt-4 flex justify-between gap-4">
              <span>Fig. 01 / Celestial study</span>
              <span aria-hidden="true">Ink on paper</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02 — Index */}
      <section className="on-paper section" aria-labelledby="explore-title">
        <div className="wrap">
          <div className="grid-cols gap-y-6">
            <p className="eyebrow brass col-span-4 md:col-span-2 lg:col-span-3">02 · Consultations</p>
            <div className="col-span-4 md:col-span-6 lg:col-span-9">
              <h2 id="explore-title" className="display-2">What would you like to explore?</h2>
            </div>
          </div>
          <div className="mt-12 md:mt-16">
            <ServiceRows variant="home" />
          </div>
          <Link href="/consultations" className="text-link mt-8">
            All consultations <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 03 — Practitioner */}
      <section className="section" aria-labelledby="meet-title">
        <div className="wrap grid-cols gap-y-10">
          <p className="eyebrow brass col-span-4 md:col-span-8 lg:col-span-3">03 · Practitioner</p>
          <div className="col-span-4 md:col-span-5 lg:col-span-5">
            <h2 id="meet-title" className="display-2">Meet Pandit Thulasidas</h2>
            <p className="lead mt-8">
              Pandit Thulasidas offers private astrology and spiritual consultations in Sydney. You can bring a
              question about relationships, family, work or personal direction.
            </p>
            <p className="muted measure mt-5">
              Consultations draw on Vedic astrology, horoscope and birth-chart reading, and traditional
              palmistry. Each one is a private conversation shaped around the question you arrive with.
            </p>
            <Link href="/about" className="text-link mt-6">
              About Pandit Thulasidas <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-3 lg:col-start-10" aria-hidden="true">
            <div className="max-w-[260px] border border-rule bg-paper p-4 md:max-w-none">
              <CelestialPlate tone="paper" viewBox="300 20 320 320" className="h-auto w-full" />
            </div>
            <p className="eyebrow muted mt-3">Fig. 01 · detail</p>
          </div>
        </div>
      </section>

      {/* 04 — Process */}
      <section className="on-paper section rule-top" aria-labelledby="start-title">
        <div className="wrap">
          <div className="grid-cols items-end gap-y-8">
            <p className="eyebrow brass col-span-4 self-start md:col-span-2 lg:col-span-3">04 · How to begin</p>
            <div className="col-span-4 self-start md:col-span-6 lg:col-span-4">
              <h2 id="start-title" className="display-2">Start with a question</h2>
              <p className="muted measure mt-6">
                It can help to write the question down before you get in touch. One clear line is enough.
              </p>
            </div>
            <EditorialFigure
              name="notebook"
              sizes="(min-width: 1024px) 36vw, (min-width: 768px) 72vw, 100vw"
              className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8"
            />
          </div>
          <ol className="grid-cols mt-12 gap-y-10 md:mt-16">
            {steps.map((s) => (
              <li key={s.title} className="col-span-4 border-t border-ink pt-6 md:col-span-8 lg:col-span-4">
                <span className="font-display text-2xl brass" aria-hidden="true">{s.n}</span>
                <h3 className="heading-3 mt-3">{s.title}</h3>
                <p className="muted mt-4 measure">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 — Questions */}
      <section className="section" aria-labelledby="faq-title">
        <div className="wrap grid-cols gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="eyebrow brass">05 · Questions</p>
            <h2 id="faq-title" className="display-2 mt-5">Before you enquire</h2>
            <Link href="/faq" className="text-link mt-6">
              Read all questions <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FaqList items={faqs.filter((f) => f.preview)} />
            <p className="muted mt-8 text-sm measure">{disclaimer}</p>
          </div>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
