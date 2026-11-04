import type { Metadata } from "next";
import Link from "next/link";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { ArtImage } from "@/components/art/ArtImage";
import { EnquiryComposer } from "@/components/EnquiryComposer";
import { business, telHref, whatsappDirectHref } from "@/config/business";
import { topics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Contact & enquiries",
  description:
    "Contact Pandit Thulasidas in Merrylands, Sydney by phone or WhatsApp on +61 426 562 158, or draft a WhatsApp message to ask about a consultation.",
  openGraph: { title: "Contact Pandit Thulasidas", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="s-oxblood dark grain relative overflow-hidden" data-hero>
        <div className="absolute inset-0 opacity-40 mix-blend-screen" data-hero-art>
          <ArtImage name="diyas" sizes="100vw" priority alt="" className="h-full w-full" focus="50% 55%" />
        </div>
        <div className="wrap relative grid-x gap-y-12 pb-16 pt-10 md:pb-24 md:pt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <p className="eyebrow accent" data-hero-in="1">Contact · {business.locality}</p>
            <HeroTitle className="t-mega mt-6" text="Ask about a *consultation*." />
            <p className="lede muted mt-8" data-hero-in="2">
              The quickest way to begin is a WhatsApp message or a phone call. Ask about availability, format and the
              current fee.
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 self-end" data-hero-in="3">
            <div className="grid gap-3">
              <a className="btn btn-saffron w-full" href={whatsappDirectHref}>Message on WhatsApp <span className="arr" aria-hidden="true">→</span></a>
              <a className="btn btn-line w-full" href={telHref}>Call {business.phone.display}</a>
            </div>
            <address className="mt-8 not-italic text-[var(--color-on-dark-soft)]">
              <span className="eyebrow block text-[var(--color-saffron)]">Address</span>
              <span className="mt-2 block text-[var(--color-ivory)]">{business.address.street}, {business.address.suburb}</span>
              <a href={business.address.mapHref} target="_blank" rel="noopener noreferrer" className="ulink text-sm">
                Open in maps <span className="sr-only">(opens in a new tab)</span><span className="arr" aria-hidden="true">↗</span>
              </a>
              <span className="caption mt-2 block">Visits by appointment — please confirm arrangements first.</span>
            </address>
          </div>
        </div>
      </section>

      <section id="enquiry" className="s-ivory sec scroll-mt-24" aria-labelledby="composer-title">
        <div className="wrap grid-x gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="eyebrow accent">Optional</p>
            <h2 id="composer-title" className="t-h2 mt-5" data-split>Draft a <em>message</em></h2>
            <p className="muted mt-6 max-w-[48ch]">
              Prefer to write it out first? Fill in a few details and review the exact message before anything leaves
              this page.
            </p>
            <h3 className="eyebrow mt-10">What happens on handoff</h3>
            <ol className="muted mt-4 grid gap-4 text-[0.95rem]">
              {[
                "Your details stay in this page only while it is open. Nothing is saved or sent by this website.",
                "You review the exact message before continuing.",
                "Choosing “Open WhatsApp” passes the draft to WhatsApp. You press Send there — or don’t.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3"><span className="numeral accent text-lg leading-6">{["i", "ii", "iii"][i]}</span>{t}</li>
              ))}
            </ol>
            <p className="mt-6 text-sm"><Link href="/privacy" className="underline">How this form handles your details</Link></p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <EnquiryComposer topics={topics} />
            <noscript>
              <p className="mt-6 border-l-2 border-[var(--color-saffron-deep)] pl-4">
                The message composer needs JavaScript. You can still{" "}
                <a href={whatsappDirectHref} className="underline">message on WhatsApp</a> or{" "}
                <a href={telHref} className="underline">call {business.phone.display}</a>.
              </p>
            </noscript>
          </div>
        </div>
      </section>
    </>
  );
}
