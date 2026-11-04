import type { Metadata } from "next";
import Link from "next/link";
import { CelestialPlate } from "@/components/CelestialPlate";
import { CtaPanel } from "@/components/CtaPanel";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "About Pandit Thulasidas",
  description:
    "Pandit Thulasidas offers private Vedic astrology, palm reading and spiritual consultations in Sydney. Learn about the reading approaches offered.",
  openGraph: { title: "Meet Pandit Thulasidas", url: "/about" },
};

const approaches = [
  {
    href: "/consultations/vedic-astrology",
    title: "Vedic astrology and horoscope",
    body: "A reading built on the birth chart, interpreted within the Jyotish tradition and related to the question you bring.",
  },
  {
    href: "/consultations/palm-reading",
    title: "Traditional palmistry",
    body: "A reading of the shape, lines and markings of the hands — a different, more immediate way into a personal question.",
  },
  {
    href: "/consultations/spiritual-guidance",
    title: "Spiritual consultation",
    body: "An unhurried conversation about a personal concern, held within a traditional framework and at your pace.",
  },
];

const subjects = [
  { href: "/consultations/relationships-and-family", label: "Relationships, marriage and family" },
  { href: "/consultations/career-and-business", label: "Work, study and business decisions" },
  { href: "/consultations/spiritual-guidance", label: "Personal direction and spiritual concerns" },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About · Sydney, NSW"
        title="Meet Pandit Thulasidas"
        lead="Pandit Thulasidas offers private astrology and spiritual consultations in Sydney. You can bring a question about relationships, family, work or personal direction."
      />

      <section className="on-paper section" aria-labelledby="approach-title">
        <div className="wrap grid-cols gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="eyebrow brass">01 · Approach</p>
            <h2 id="approach-title" className="display-2 mt-5">Three ways of reading</h2>
            <p className="muted measure mt-6">
              Every consultation is one to one. The method depends on your question and your preference — some
              people choose one approach, others combine them.
            </p>
          </div>
          <ul className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            {approaches.map((a) => (
              <li key={a.href} className="border-b border-rule py-8 first:border-t">
                <h3 className="row-title">{a.title}</h3>
                <p className="muted measure mt-3">{a.body}</p>
                <Link href={a.href} className="text-link mt-2">
                  <span>Read about {a.title.toLowerCase()}</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="bring-title">
        <div className="wrap grid-cols gap-y-10">
          <div className="col-span-4 md:col-span-5 lg:col-span-6">
            <p className="eyebrow brass">02 · Subjects</p>
            <h2 id="bring-title" className="display-2 mt-5">What people bring</h2>
            <p className="lead mt-6">
              A consultation starts from your question rather than a script. These are the subjects most often
              brought to a session.
            </p>
            <ul className="mt-8">
              {subjects.map((s) => (
                <li key={s.label} className="border-b border-rule first:border-t">
                  <Link href={s.href} className="flex min-h-14 items-center justify-between gap-4 py-3 font-semibold no-underline hover:underline">
                    {s.label}
                    <span className="arrow brass" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:col-start-8" aria-hidden="true">
            <CelestialPlate tone="paper" viewBox="160 160 320 320" className="h-auto w-full max-w-[420px]" />
          </div>
        </div>
      </section>

      <section className="on-paper section-tight rule-top" aria-labelledby="note-title">
        <div className="wrap grid-cols gap-y-6">
          <p className="eyebrow brass col-span-4 md:col-span-2 lg:col-span-3">03 · A note</p>
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <h2 id="note-title" className="heading-3">On expectations</h2>
            <p className="muted measure mt-4">
              Astrology and palmistry offer a traditional perspective. A consultation is a place to reflect, not a
              promise of any outcome, and it works best alongside — never instead of — advice from qualified
              professionals where health, law or money are concerned.
            </p>
          </div>
        </div>
      </section>

      <CtaPanel heading="Ask a first question" body="Get in touch to ask about availability, format and fees. A short message is enough to begin." />
    </>
  );
}
