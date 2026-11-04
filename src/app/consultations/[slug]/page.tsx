import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaPanel } from "@/components/CtaPanel";
import { EditorialFigure } from "@/components/EditorialFigure";
import { PageIntro } from "@/components/PageIntro";
import { business, telHref } from "@/config/business";
import { getService, services } from "@/content/services";
import { contactHref } from "@/content/topics";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    openGraph: { title: s.h1, description: s.metaDescription, url: `/consultations/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = s.related.map((r) => getService(r)).filter((r) => r !== undefined);

  return (
    <>
      <PageIntro
        eyebrow={`Consultation ${s.number} · Sydney`}
        title={s.h1}
        lead={s.intro}
        before={
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/consultations", label: "Consultations" },
              { label: s.short },
            ]}
          />
        }
      >
        <div className="mt-4 flex flex-col gap-3 min-[480px]:flex-row">
          <Link className="btn btn-light" href={contactHref(s.slug)}>
            Ask about this consultation <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <a className="btn btn-outline-ink" href={telHref}>Call {business.phone.display}</a>
        </div>
      </PageIntro>

      <section className="on-paper section" aria-label={`About ${s.short}`}>
        <div className="wrap grid-cols gap-y-16">
          {s.blocks.map((b, i) => (
            <Fragment key={b.heading}>
              <article
                className={`col-span-4 md:col-span-8 grid-cols gap-y-5 ${
                  s.figure ? "lg:col-span-8 lg:[--cols:8]" : "lg:col-span-12"
                }`}
              >
                <p className={`eyebrow brass col-span-4 md:col-span-2 ${s.figure ? "lg:col-span-2" : "lg:col-span-3"}`}>0{i + 1}</p>
                <div className={`col-span-4 md:col-span-6 ${s.figure ? "lg:col-span-6" : "lg:col-span-7"}`}>
                  <h2 className="row-title">{b.heading}</h2>
                  <div className="prose-almanac muted measure mt-5">
                    {b.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {b.list && (
                      <ul>
                        {b.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
              {i === 0 && s.figure && (
                <EditorialFigure
                  name={s.figure}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 72vw, 100vw"
                  className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:self-start"
                />
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="prep-title">
        <div className="wrap grid-cols gap-y-8">
          <p className="eyebrow brass col-span-4 md:col-span-2 lg:col-span-3">03 · Preparation</p>
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <h2 id="prep-title" className="row-title">{s.preparation.heading}</h2>
            <p className="muted measure mt-4">
              There is no need to send sensitive details in a first message. These questions are a good place to
              start:
            </p>
            <ol className="mt-6">
              {s.preparation.questions.map((q, i) => (
                <li key={q} className="flex gap-4 border-b border-rule py-4 first:border-t">
                  <span className="eyebrow brass mt-1 w-6 flex-none" aria-hidden="true">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="on-paper section-tight rule-top" aria-labelledby="related-title">
        <div className="wrap grid-cols gap-y-6">
          <h2 id="related-title" className="eyebrow brass col-span-4 md:col-span-2 lg:col-span-3">Related consultations</h2>
          <ul className="col-span-4 md:col-span-6 lg:col-span-7">
            {related.map((r) => (
              <li key={r.slug} className="border-b border-rule first:border-t">
                <Link href={`/consultations/${r.slug}`} className="flex min-h-16 items-center justify-between gap-4 py-3 no-underline hover:underline">
                  <span className="font-display text-[1.75rem] leading-tight">{r.short}</span>
                  <span className="arrow brass" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-7 lg:col-start-4">
            <Link href="/consultations" className="text-link">
              <span aria-hidden="true">←</span> Back to all consultations
            </Link>
          </div>
        </div>
      </section>

      <CtaPanel heading={s.ctaHeading} body={s.ctaBody} topic={s.slug} />
    </>
  );
}
