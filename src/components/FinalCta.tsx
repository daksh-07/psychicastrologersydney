import Link from "next/link";
import { ArtImage } from "@/components/art/ArtImage";
import { Ornament } from "@/components/Ornament";
import { business, telHref, whatsappDirectHref } from "@/config/business";
import { contactHref } from "@/content/topics";

type Props = { heading?: string; italic?: string; body?: string; topic?: string };

/** The closing invitation used on every page. Direct links carry no personal data and work without JS. */
export function FinalCta({
  heading = "Begin with",
  italic = "one question.",
  body = "Send a short WhatsApp message or call to ask about availability, format and fees. The detail of your question can wait for the consultation itself.",
  topic,
}: Props) {
  return (
    <section className="s-oxblood dark relative overflow-hidden" aria-labelledby="cta-title">
      <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen">
        <ArtImage name="diyas" sizes="100vw" alt="" className="h-full w-full" focus="50% 60%" />
      </div>
      <div className="pointer-events-none absolute -right-[18vw] -top-[10vw] w-[60vw] max-w-[820px] text-[var(--color-saffron)] opacity-25" data-spin="200">
        <Ornament className="h-auto w-full" draw={false} />
      </div>
      <div className="wrap relative grid-x sec gap-y-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          <p className="eyebrow accent">Private consultations · {business.locality}</p>
          <h2 id="cta-title" className="t-display mt-6" data-split>
            {heading} <em>{italic}</em>
          </h2>
          <p className="lede muted mt-8" data-reveal="rise">{body}</p>
        </div>
        <div className="col-span-4 flex flex-col gap-3 self-end md:col-span-5 lg:col-span-4" data-stagger>
          <a className="btn btn-saffron w-full" href={whatsappDirectHref}>
            Enquire on WhatsApp <span className="arr" aria-hidden="true">→</span>
          </a>
          <a className="btn btn-line w-full" href={telHref}>Call {business.phone.display}</a>
          <Link className="ulink self-center text-[var(--color-on-dark-soft)]" href={contactHref(topic)}>
            Write a tailored message first
          </Link>
        </div>
      </div>
    </section>
  );
}
