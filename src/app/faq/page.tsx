import type { Metadata } from "next";
import Link from "next/link";
import { CtaPanel } from "@/components/CtaPanel";
import { FaqList } from "@/components/FaqList";
import { PageIntro } from "@/components/PageIntro";
import { disclaimer } from "@/config/business";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "How to enquire, phone consultations, what to prepare, how to check fees and what an astrology or spiritual consultation with Pandit Thulasidas can offer.",
  openGraph: { title: "Frequently asked questions", url: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="FAQ · Before you enquire"
        title="Questions, answered plainly"
        lead="Practical answers about enquiring, preparing and what to expect. Anything not covered here can be asked directly."
      />
      <section className="on-paper section" aria-label="Frequently asked questions">
        <div className="wrap grid-cols gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
            <FaqList items={faqs} />
            <div className="mt-12 border-l-2 border-brass-dark pl-5">
              <p className="eyebrow brass">Scope of guidance</p>
              <p className="mt-3 measure" data-disclaimer>{disclaimer}</p>
            </div>
            <Link href="/contact" className="text-link mt-8">
              Still have a question? Contact Pandit Thulasidas <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <CtaPanel />
    </>
  );
}
