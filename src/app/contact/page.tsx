import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryComposer } from "@/components/EnquiryComposer";
import { PageIntro } from "@/components/PageIntro";
import { business, telHref, whatsappDirectHref } from "@/config/business";
import { topics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Ask about a consultation",
  description:
    "Contact Pandit Thulasidas in Sydney by WhatsApp or phone, or draft a short WhatsApp message to ask about a consultation.",
  openGraph: { title: "Ask about a consultation", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact · Sydney, NSW"
        title="Ask about a consultation"
        lead="The quickest way to begin is a WhatsApp message or a phone call. Ask about availability, format and current fees."
      >
        <div className="mt-4 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <a className="btn btn-light" href={whatsappDirectHref}>
            Message on WhatsApp <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a className="btn btn-outline-ink" href={telHref}>Call {business.phone.display}</a>
        </div>
      </PageIntro>

      <section id="enquiry" className="on-paper section" aria-labelledby="composer-title">
        <div className="wrap grid-cols gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="eyebrow brass">Optional</p>
            <h2 id="composer-title" className="display-2 mt-5">Draft a message</h2>
            <p className="muted measure mt-6">
              Prefer to write it out first? Fill in a few details and review the message before anything leaves this
              page.
            </p>
            <h3 className="eyebrow mt-10">What happens on handoff</h3>
            <ol className="prose-almanac muted mt-4 grid gap-3 text-[0.9375rem]">
              <li>Your details stay in this page only while it is open. Nothing is saved or sent by this website.</li>
              <li>You review the exact message before continuing.</li>
              <li>Choosing “Open WhatsApp” passes the draft to WhatsApp. You press Send there — or don’t.</li>
            </ol>
            <p className="mt-6 text-sm">
              <Link href="/privacy" className="underline">How this form handles your details</Link>
            </p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <EnquiryComposer topics={topics} />
            <noscript>
              <p className="mt-6 border-l-2 border-brass-dark pl-4">
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
