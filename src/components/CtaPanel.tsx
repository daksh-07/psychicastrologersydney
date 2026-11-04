import Link from "next/link";
import { business, telHref, whatsappDirectHref } from "@/config/business";
import { contactHref, type TopicSlug } from "@/content/topics";

type Props = {
  heading?: string;
  body?: string;
  topic?: TopicSlug;
  headingLevel?: "h2" | "h3";
};

/** The dark close. Direct links carry no personal data and work without JavaScript. */
export function CtaPanel({
  heading = "Start a conversation",
  body = "Send a short WhatsApp message or call to ask about availability, format and fees. You can share the details of your question when you speak.",
  topic,
  headingLevel: H = "h2",
}: Props) {
  return (
    <section className="on-panel" aria-labelledby="cta-heading">
      <div className="wrap grid-cols section gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p className="eyebrow brass">Enquiries · {business.locality}</p>
          <H id="cta-heading" className="display-2 mt-5">{heading}</H>
          <p className="lead muted mt-6">{body}</p>
        </div>
        <div className="col-span-4 flex flex-col gap-3 self-end md:col-span-5 lg:col-span-4 lg:col-start-9">
          <a className="btn btn-light w-full" href={whatsappDirectHref}>
            Enquire on WhatsApp <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a className="btn btn-outline-ink w-full" href={telHref}>Call {business.phone.display}</a>
          <Link className="text-link justify-center text-muted-ink" href={contactHref(topic)}>
            Write a tailored message first
          </Link>
        </div>
      </div>
    </section>
  );
}
