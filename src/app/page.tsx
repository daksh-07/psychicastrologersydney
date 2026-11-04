import type { Metadata } from "next";
import Link from "next/link";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { ArtFigure } from "@/components/art/ArtFigure";
import { ArtImage } from "@/components/art/ArtImage";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";
import { Ornament } from "@/components/Ornament";
import { RashiChakra } from "@/components/RashiChakra";
import { ServiceExplorer } from "@/components/ServiceExplorer";
import { business, telHref, whatsappDirectHref } from "@/config/business";
import { services, servicesIn } from "@/content/catalogue";
import { generalFaqs, principles, steps } from "@/content/general";

export const metadata: Metadata = {
  title: { absolute: "Pandit Thulasidas · Vedic astrologer & spiritual advisor in Sydney" },
  description:
    "Private Vedic astrology, horoscope and palm readings, psychic and spiritual guidance with Pandit Thulasidas in Sydney — for love, marriage, family, work and personal questions.",
  openGraph: { title: "Pandit Thulasidas · Ancient sky, personal counsel", url: "/" },
};

const READINGS = [
  { slug: "vedic-astrology", art: "budha" as const, label: "The chart", line: "Jyotiṣa reads the sky at the moment of birth." },
  { slug: "palm-reading", art: "palm-diagram" as const, label: "The hand", line: "Palmistry reads the lines and markings of the hand." },
  { slug: "psychic-reading", art: "krishna-awaiting" as const, label: "The moment", line: "Psychic guidance reads the question you bring today." },
];

export default function HomePage() {
  const love = [...servicesIn("love"), ...servicesIn("marriage-family")];
  const spiritual = servicesIn("spiritual");
  const svc = (slug: string) => services.find((s) => s.slug === slug)!;

  return (
    <>
      {/* ── 01 · Hero ─────────────────────────────────────────── */}
      <section className="s-ivory grain relative overflow-hidden" data-hero aria-labelledby="hero-title">
        <div className="wrap grid-x items-center gap-y-12 pb-14 pt-8 md:pt-14 lg:min-h-[calc(100svh-var(--header-h)-64px)] lg:pb-20">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1" data-hero-in="1">
              <span className="deva text-[1.15rem] normal-case tracking-normal accent" lang="sa">ज्योतिष</span>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
              <span>Jyotiṣa · Palmistry · Spiritual guidance</span>
            </p>
            <HeroTitle id="hero-title" className="t-mega mt-7" text="Ancient sky, *personal* counsel." />
            <p className="lede muted mt-8" data-hero-in="2">
              Pandit Thulasidas offers private Vedic astrology, horoscope and palm readings, psychic and spiritual
              guidance — for love, marriage, family, work and the questions in between.
            </p>
            <div className="mt-10 flex flex-col gap-3 min-[460px]:flex-row min-[460px]:flex-wrap" data-hero-in="3">
              <a className="btn btn-solid" href={whatsappDirectHref}>
                Enquire on WhatsApp <span className="arr" aria-hidden="true">→</span>
              </a>
              <a className="btn btn-line" href={telHref}>Call {business.phone.display}</a>
            </div>
            <p className="caption muted mt-6" data-hero-in="4">
              Private, one-to-one consultations · Merrylands, Sydney · Phone consultations on enquiry
            </p>
          </div>

          <div className="relative col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <div className="pointer-events-none absolute -inset-[12%] text-[var(--color-saffron-deep)] opacity-40" aria-hidden="true">
              <div data-spin="160" className="h-full w-full"><Ornament className="h-full w-full" draw={false} /></div>
            </div>
            <ArtFigure
              name="krishna-fluting"
              shape="arch"
              ratio="3 / 4"
              priority
              reveal={false}
              heroArt
              sizes="(min-width:1100px) 36vw, (min-width:768px) 70vw, 92vw"
              className="relative mx-auto max-w-[460px]"
              captionClassName="relative rounded-[4px] bg-[var(--color-ivory)] py-1 pr-2"
              numeral="Fig. 1"
            />
          </div>
        </div>
        <div className="border-y border-[var(--color-rule)] py-5" aria-hidden="true">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="marquee-track font-display text-[1.6rem] italic text-[var(--color-ink-soft)]">
                {services.map((s) => (
                  <span key={s.slug} className="flex items-center gap-12">
                    {s.name}
                    <span className="not-italic text-[var(--color-saffron-deep)]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 · The practice ─────────────────────────────────── */}
      <section className="s-parchment grain sec relative overflow-hidden" aria-labelledby="practice-title">
        <div className="wrap grid-x gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <p className="eyebrow accent"><span className="numeral mr-2 text-base normal-case tracking-normal">I.</span>The practice</p>
            <h2 id="practice-title" className="t-display mt-6" data-split>
              Jyotiṣa, the science of <em>light</em>.
            </h2>
            <p className="lede mt-8" data-reveal="rise">
              The Sanskrit word <i>jyotiṣa</i> comes from <i>jyotis</i> — light, the heavenly bodies. One of the six
              Vedāṅgas, the limbs of Vedic learning, it reads the positions of the sun, moon and planets as a language
              for reflecting on a life.
            </p>
            <dl className="mt-12 grid gap-8 sm:grid-cols-3" data-stagger>
              {[
                { t: "The birth chart", d: "Drawn from the date, time and place of birth — twelve rāśis, twelve houses." },
                { t: "The nine grahas", d: "Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rāhu and Ketu." },
                { t: "Your question", d: "The chart is a starting point; the conversation is about what you bring." },
              ].map((x) => (
                <div key={x.t} className="border-t border-[var(--color-ink)]/25 pt-4">
                  <dt className="t-h4">{x.t}</dt>
                  <dd className="muted mt-2 text-[0.95rem]">{x.d}</dd>
                </div>
              ))}
            </dl>
            <Link href="/consultations/vedic-astrology" className="ulink mt-10">
              About horoscope readings <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <div className="overflow-hidden" data-parallax="0.12">
              <ArtFigure name="jantar-mantar" ratio="4 / 5" sizes="(min-width:1100px) 36vw, 90vw" numeral="Fig. 2" dir="up" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · Meet ─────────────────────────────────────────── */}
      <section className="s-ink dark grain sec relative overflow-hidden" aria-labelledby="meet-title">
        <div className="wrap grid-x items-center gap-y-14">
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <figure className="relative mx-auto max-w-[440px]">
              <div className="frame arch aspect-[3/4]" data-reveal="image">
                <ArtImage name="lepakshi" sizes="(min-width:1100px) 32vw, 90vw" alt="" className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-24">
                  <p className="eyebrow text-[var(--color-saffron)]">Portrait</p>
                  <p className="mt-1 font-display text-xl italic text-[var(--color-ivory)]">Awaiting a client-approved photograph</p>
                </div>
              </div>
              <figcaption className="caption muted mt-3">Placeholder: carved hall, Lepakshi. Photograph: Suhas Hanjar / Unsplash.</figcaption>
            </figure>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7">
            <p className="eyebrow accent"><span className="numeral mr-2 text-base normal-case tracking-normal">II.</span>The practitioner</p>
            <h2 id="meet-title" className="t-display mt-6" data-split>
              Meet Pandit <em>Thulasidas</em>
            </h2>
            <div className="prose-at muted mt-8 max-w-[56ch] text-[1.05rem]" data-reveal="rise">
              <p>
                Pandit Thulasidas is a Vedic astrologer, psychic reader and spiritual advisor in Sydney. People consult
                him about love and marriage, family matters, study and career, business and money, and spiritual
                concerns.
              </p>
              <p>
                Each consultation is one to one, tailored to the individual question, and held privately and
                respectfully — whether in person by appointment or by phone.
              </p>
            </div>
            <div className="mt-10 flex items-end gap-6 border-t border-white/15 pt-8" data-reveal="rise">
              <p className="font-display text-[clamp(4.5rem,9vw,7.5rem)] font-light leading-[0.8] text-[var(--color-saffron)]">25<span className="align-top text-[0.5em]">+</span></p>
              <p className="caption muted max-w-[30ch] pb-1">
                Years of practice, as stated on the current website. <span className="text-[var(--color-ivory)]">Awaiting confirmation before publication.</span>
              </p>
            </div>
            <Link href="/about" className="ulink mt-10">
              About Pandit Thulasidas <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 04 · Explore every service ────────────────────────── */}
      <section className="s-ivory sec" aria-labelledby="explore-title" id="consultations">
        <div className="wrap">
          <div className="grid-x gap-y-6">
            <p className="eyebrow accent col-span-4 md:col-span-8 lg:col-span-3"><span className="numeral mr-2 text-base normal-case tracking-normal">III.</span>Consultations</p>
            <div className="col-span-4 md:col-span-8 lg:col-span-9">
              <h2 id="explore-title" className="t-display" data-split>Choose where <em>to begin</em>.</h2>
              <p className="lede muted mt-6" data-reveal="rise">
                Sixteen consultation areas, drawn from the original practice and grouped into five. Hover or tap to explore.
              </p>
            </div>
          </div>
          <div className="mt-14">
            <ServiceExplorer />
          </div>
        </div>
      </section>

      {/* ── 05 · Love, marriage & family ──────────────────────── */}
      <section className="s-forest dark relative overflow-hidden" aria-labelledby="love-title">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[70vw] lg:min-h-full">
            <div className="absolute inset-0" data-reveal="image" data-dir="left">
              <ArtImage name="radha-sakhi" sizes="(min-width:1100px) 50vw, 100vw" className="h-full w-full" focus="72% 50%" />
            </div>
          </div>
          <div className="sec px-[var(--gutter)] lg:pl-16">
            <p className="eyebrow accent"><span className="numeral mr-2 text-base normal-case tracking-normal">IV.</span>Love, marriage &amp; family</p>
            <h2 id="love-title" className="t-display mt-6" data-split>
              Matters of the <em>heart,</em> and the home.
            </h2>
            <p className="lede muted mt-8" data-reveal="rise">
              The questions most often brought to a consultation — talked through privately, without judgement and
              without promises about anyone else&apos;s choices.
            </p>
            <ul className="mt-10" data-stagger>
              {love.map((s) => (
                <li key={s.slug} className="border-t border-white/15 last:border-b">
                  <Link href={`/consultations/${s.slug}`} className="group grid grid-cols-[1fr_auto] items-center gap-4 py-4 no-underline">
                    <span>
                      <span className="block font-display text-[1.5rem] leading-tight transition-transform duration-500 group-hover:translate-x-2">{s.name}</span>
                      <span className="muted block text-sm">{s.summary}</span>
                    </span>
                    <span className="text-[var(--color-saffron)] transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="caption muted mt-6">Fig. 3 — Sakhi persuades Radha to meet Krishna, Gita Govinda, c. 1820–25. The Cleveland Museum of Art · CC0.</p>
          </div>
        </div>
      </section>

      {/* ── 06 · Readings + signature interaction ─────────────── */}
      <section className="s-ink dark grain sec relative overflow-hidden" aria-labelledby="readings-title">
        <div className="wrap">
          <div className="grid-x gap-y-6">
            <p className="eyebrow accent col-span-4 md:col-span-8 lg:col-span-3"><span className="numeral mr-2 text-base normal-case tracking-normal">V.</span>Astrology &amp; readings</p>
            <h2 id="readings-title" className="t-display col-span-4 md:col-span-8 lg:col-span-9" data-split>
              The chart, the hand, <em>the moment</em>.
            </h2>
          </div>
          <div className="mt-16 md:mt-20">
            <RashiChakra />
          </div>
          <ul className="mt-24 grid gap-10 md:grid-cols-3 md:gap-6" data-stagger>
            {READINGS.map((r, i) => {
              const s = svc(r.slug);
              return (
                <li key={r.slug}>
                  <Link href={`/consultations/${r.slug}`} className="group block no-underline">
                    <div className="frame arch-sm aspect-[4/5]">
                      <ArtImage name={r.art} sizes="(min-width:768px) 30vw, 90vw" alt="" className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-atelier)] group-hover:scale-[1.06]" />
                    </div>
                    <p className="eyebrow accent mt-6">{String(i + 1).padStart(2, "0")} — {r.label}</p>
                    <h3 className="t-h3 mt-2">{s.name}</h3>
                    <p className="muted mt-2">{r.line}</p>
                    <span className="ulink mt-3 text-sm">Read more <span className="arr" aria-hidden="true">→</span></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── 07 · Spiritual guidance ───────────────────────────── */}
      <section className="s-parchment grain sec relative overflow-hidden" aria-labelledby="spirit-title">
        <div className="wrap grid-x items-center gap-y-14">
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <ArtFigure name="ganesha" shape="arch" ratio="3 / 4" sizes="(min-width:1100px) 34vw, (min-width:768px) 45vw, 90vw" numeral="Fig. 4" className="mx-auto max-w-[460px]" />
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7">
            <p className="eyebrow accent"><span className="numeral mr-2 text-base normal-case tracking-normal">VI.</span>Spiritual guidance</p>
            <h2 id="spirit-title" className="t-display mt-6" data-split>
              When the question is <em>not</em> about events.
            </h2>
            <p className="lede mt-8" data-reveal="rise">
              Repeated obstacles, worries about the evil eye or black magic, or a wish to reconnect with tradition.
              These are discussed respectfully, within the tradition — calmly, and without fear.
            </p>
            <ul className="mt-10 grid gap-3" data-stagger>
              {spiritual.map((s) => (
                <li key={s.slug}>
                  <Link href={`/consultations/${s.slug}`} className="group flex items-center justify-between gap-4 rounded-full border border-[var(--color-ink)]/20 px-6 py-4 no-underline transition-colors duration-300 hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]">
                    <span className="font-display text-[1.35rem] leading-tight">{s.name}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="caption muted mt-6 max-w-[52ch]">
              Spiritual guidance sits alongside — never in place of — medical, psychological, legal or financial advice.
            </p>
          </div>
        </div>
      </section>

      {/* ── 08 · How it works ─────────────────────────────────── */}
      <section className="s-ivory sec relative overflow-hidden" aria-labelledby="how-title">
        <div className="wrap grid-x gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="eyebrow accent"><span className="numeral mr-2 text-base normal-case tracking-normal">VII.</span>How it works</p>
            <h2 id="how-title" className="t-display mt-6" data-split>
              Three quiet <em>steps</em>.
            </h2>
            <div className="mt-12 hidden overflow-hidden lg:block" data-parallax="0.1">
              <ArtFigure name="temple-corridor" ratio="4 / 5" sizes="34vw" numeral="Fig. 5" />
            </div>
          </div>
          <ol className="relative col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:pt-40">
            <svg className="pointer-events-none absolute left-[1.15rem] top-0 hidden h-full w-6 md:block lg:top-40 lg:h-[calc(100%-10rem)]" viewBox="0 0 24 600" preserveAspectRatio="none" data-draw aria-hidden="true">
              <path className="draw" d="M12 0 C 2 150, 22 300, 12 450 S 12 600, 12 600" fill="none" stroke="var(--color-saffron-deep)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            </svg>
            {steps.map((s) => (
              <li key={s.n} className="relative grid grid-cols-[3rem_1fr] gap-4 pb-14 last:pb-0 md:gap-8" data-reveal="rise">
                <span className="numeral relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-saffron-deep)] bg-[var(--color-ivory)] text-lg accent">{s.n}</span>
                <div>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="muted mt-3 max-w-[50ch]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 09 · Principles (in place of unverified testimonials) ── */}
      <section className="s-paper sec-sm border-y border-[var(--color-rule)]" aria-labelledby="principles-title">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="principles-title" className="t-h2 max-w-[16ch]" data-split>How every consultation is <em>held</em>.</h2>
            <p className="caption muted max-w-[42ch]">
              Drawn from the practice&apos;s own published wording. Client testimonials will appear here once verified
              and approved for use.
            </p>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[6px] bg-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4" data-stagger>
            {principles.map((p, i) => (
              <li key={p.title} className="bg-[var(--color-paper)] p-7">
                <span className="numeral accent text-2xl">{["i", "ii", "iii", "iv"][i]}</span>
                <h3 className="t-h4 mt-4">{p.title}</h3>
                <p className="muted mt-2 text-[0.95rem]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 10 · FAQ ──────────────────────────────────────────── */}
      <section className="s-ivory sec" aria-labelledby="faq-title">
        <div className="wrap grid-x gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="eyebrow accent"><span className="numeral mr-2 text-base normal-case tracking-normal">VIII.</span>Questions</p>
            <h2 id="faq-title" className="t-display mt-6" data-split>Before you <em>ask</em>.</h2>
            <Link href="/faq" className="ulink mt-8">All questions <span className="arr" aria-hidden="true">→</span></Link>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6" data-reveal="rise">
            <FaqAccordion items={generalFaqs.filter((f) => f.home)} name="home-faq" />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
