import type { Metadata } from "next";
import Link from "next/link";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { notFound } from "next/navigation";
import { ArtFigure } from "@/components/art/ArtFigure";
import { ArtImage } from "@/components/art/ArtImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";
import { Ornament } from "@/components/Ornament";
import { business, telHref } from "@/config/business";
import { categoryBySlug, serviceBySlug, services, servicesIn, type Category } from "@/content/catalogue";
import { contactHref } from "@/content/topics";
import { plain } from "@/lib/italic";

type Params = { slug: string };
export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    openGraph: { title: plain(s.h1), description: s.metaDescription, url: `/consultations/${s.slug}` },
  };
}

const SURFACE: Record<Category["tone"], { cls: string; dark: boolean; ornament: string }> = {
  oxblood: { cls: "s-oxblood", dark: true, ornament: "var(--color-saffron)" },
  saffron: { cls: "s-parchment", dark: false, ornament: "var(--color-saffron-deep)" },
  ink: { cls: "s-ink", dark: true, ornament: "var(--color-saffron)" },
  forest: { cls: "s-forest", dark: true, ornament: "var(--color-saffron)" },
  umber: { cls: "s-umber", dark: true, ornament: "var(--color-saffron)" },
};

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const cat = categoryBySlug(s.category);
  const surf = SURFACE[cat.tone];
  const related = s.related.map((r) => serviceBySlug(r)).filter((r) => r !== undefined);
  const siblings = servicesIn(s.category).filter((x) => x.slug !== s.slug);

  return (
    <>
      {/* Hero */}
      <section className={`${surf.cls} ${surf.dark ? "dark" : ""} grain relative overflow-hidden`} data-hero>
        <div className="wrap pb-16 pt-4 md:pb-24">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/consultations", label: "Consultations" },
              { href: `/consultations#${cat.slug}`, label: cat.name },
              { label: s.name },
            ]}
          />
          <div className="grid-x mt-10 items-center gap-y-12 md:mt-14">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <p className="eyebrow accent" data-hero-in="1">
                <span className="numeral mr-2 text-base normal-case tracking-normal">{cat.numeral}.</span>
                {s.kicker}
              </p>
              <HeroTitle className="t-display mt-6" text={s.h1} />
              <p className="lede muted mt-8" data-hero-in="2">{s.lede}</p>
              <div className="mt-10 flex flex-col gap-3 min-[460px]:flex-row min-[460px]:flex-wrap" data-hero-in="3">
                <Link className={`btn ${surf.dark ? "btn-saffron" : "btn-solid"}`} href={contactHref(s.slug)}>
                  Ask about this consultation <span className="arr" aria-hidden="true">→</span>
                </Link>
                <a className="btn btn-line" href={telHref}>Call {business.phone.display}</a>
              </div>
            </div>
            <div className="relative col-span-4 md:col-span-5 md:col-start-2 lg:col-span-4 lg:col-start-9">
              {s.art ? (
                <ArtFigure
                  name={s.art}
                  shape="arch"
                  ratio="3 / 4"
                  priority
                  reveal={false}
                  heroArt
                  sizes="(min-width:1100px) 30vw, (min-width:768px) 60vw, 90vw"
                  className="mx-auto max-w-[420px]"
                />
              ) : (
                <div className="mx-auto aspect-square max-w-[380px]" style={{ color: surf.ornament }} data-hero-in="4">
                  <div data-spin="180" className="h-full w-full">
                    <Ornament className="h-full w-full" draw={false} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="s-ivory sec" aria-labelledby="situations-title">
        <div className="wrap grid-x gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="eyebrow accent">01</p>
            <h2 id="situations-title" className="t-h2 mt-4" data-split>{s.situationsTitle}</h2>
          </div>
          <ol className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6" data-stagger>
            {s.situations.map((x, i) => (
              <li key={x} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t border-[var(--color-rule)] py-5 last:border-b">
                <span className="numeral accent text-lg">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(1.35rem,2vw,1.85rem)] leading-snug">{x}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section className="s-paper sec border-y border-[var(--color-rule)]" aria-labelledby="approach-title">
        <div className="wrap">
          <p className="eyebrow accent">02</p>
          <h2 id="approach-title" className="t-h2 mt-4 max-w-[18ch]" data-split>What the consultation <em>involves</em></h2>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16" data-stagger>
            {s.approach.map((a, i) => (
              <article key={a.heading} className="border-t border-[var(--color-ink)]/25 pt-6">
                <p className="numeral accent text-2xl">{["i", "ii", "iii"][i]}</p>
                <h3 className="t-h3 mt-3">{a.heading}</h3>
                <p className="muted mt-4 max-w-[52ch]">{a.body}</p>
              </article>
            ))}
          </div>
          <p className="caption muted mt-14">
            Also known as: {s.covers.join(" · ")}
          </p>
        </div>
      </section>

      {/* Before you ask + note */}
      <section className="s-parchment grain sec-sm" aria-labelledby="ask-title">
        <div className="wrap grid-x gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <p className="eyebrow accent">03</p>
            <h2 id="ask-title" className="t-h3 mt-4">Worth asking when you enquire</h2>
            <ul className="mt-6 grid gap-3">
              {s.beforeYouAsk.map((q) => (
                <li key={q} className="flex gap-3"><span aria-hidden="true" className="accent">✦</span>{q}</li>
              ))}
            </ul>
            <p className="muted mt-6 text-[0.95rem]">There is no need to send sensitive details in a first message.</p>
          </div>
          <aside className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8" aria-label="Important note">
            <div className="rounded-[6px] border border-[var(--color-ink)]/20 bg-[var(--color-paper)] p-7">
              <p className="eyebrow">Please note</p>
              <p className="mt-3 font-display text-[1.35rem] leading-snug">{s.note}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQs */}
      <section className="s-ivory sec-sm" aria-labelledby="sfaq-title">
        <div className="wrap grid-x gap-y-8">
          <h2 id="sfaq-title" className="t-h2 col-span-4 md:col-span-8 lg:col-span-4" data-split>Questions</h2>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={s.faqs} name={`faq-${s.slug}`} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="s-ivory sec-sm border-t border-[var(--color-rule)]" aria-labelledby="related-title">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-title" className="t-h2" data-split>Related <em>consultations</em></h2>
            <Link href="/consultations" className="ulink">All sixteen <span className="arr" aria-hidden="true">→</span></Link>
          </div>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6" data-stagger>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/consultations/${r.slug}`} className="group block no-underline">
                  <div className="frame arch-sm aspect-[5/6]">
                    {r.art ? (
                      <ArtImage name={r.art} sizes="(min-width:768px) 30vw, 90vw" alt="" className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-[1.05]" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[var(--color-ink)] p-12 text-[var(--color-saffron)]"><Ornament className="h-full w-full" draw={false} /></div>
                    )}
                  </div>
                  <p className="eyebrow accent mt-5">{categoryBySlug(r.category).name}</p>
                  <h3 className="t-h3 mt-2">{r.name}</h3>
                  <p className="muted mt-2 text-[0.95rem]">{r.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
          {siblings.length > 0 && (
            <p className="muted mt-14 text-[0.95rem]">
              Also in {cat.name}:{" "}
              {siblings.map((x, i) => (
                <span key={x.slug}>
                  <Link href={`/consultations/${x.slug}`} className="underline underline-offset-4">{x.name}</Link>
                  {i < siblings.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <FinalCta heading="Ask about" italic={plain(s.name).toLowerCase() + "."} topic={s.slug} />
    </>
  );
}
