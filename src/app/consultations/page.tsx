import type { Metadata } from "next";
import { CtaPanel } from "@/components/CtaPanel";
import { PageIntro } from "@/components/PageIntro";
import { ServiceRows } from "@/components/ServiceRows";

export const metadata: Metadata = {
  title: "Astrology and spiritual consultations",
  description:
    "Five private consultation types with Pandit Thulasidas in Sydney: Vedic astrology and horoscope, palm reading, relationships and family, career and business, and spiritual guidance.",
  openGraph: { title: "Astrology and spiritual consultations", url: "/consultations" },
};

export default function ConsultationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Consultations · Five approaches"
        title="Astrology and spiritual consultations"
        lead="Each consultation is private and one to one. Choose the area closest to your question; if more than one fits, mention that when you enquire."
      />
      <section className="on-paper section" aria-label="Consultation types">
        <div className="wrap">
          <ServiceRows variant="index" />
          <p className="muted measure mt-10 text-sm">
            Fees, session length and format (phone or in person) are confirmed when you enquire. Nothing on this
            page is a booking.
          </p>
        </div>
      </section>
      <CtaPanel heading="Not sure which to choose?" body="Describe your question in a sentence and ask which consultation suits it best." />
    </>
  );
}
