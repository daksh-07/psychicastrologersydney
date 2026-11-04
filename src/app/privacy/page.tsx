import type { Metadata } from "next";
import Link from "next/link";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { conceptCredit } from "@/config/business";
import { art } from "@/content/art";

export const metadata: Metadata = {
  title: "Privacy, enquiries & credits",
  description:
    "How the WhatsApp message composer on this preview handles the details you type, what happens when you open WhatsApp, and credits for the artworks and photographs used.",
  openGraph: { title: "Privacy & credits", url: "/privacy" },
};

const SECTIONS = [
  {
    h: "What the composer does",
    p: [
      "The form on the contact page helps you write a WhatsApp message. It asks for your name, a contact number, a consultation topic and an optional short note, and turns them into a draft you can read before going further.",
    ],
  },
  {
    h: "Where your details are kept",
    p: [
      "While you type, your details are held only in the open page’s memory. This website does not send them to a server, save them in browser storage or put them in the page address. Closing or reloading the page clears them.",
      "The only value that can appear in a link on this site is the name of a consultation topic — for example when a service page opens the contact page with that topic pre-selected.",
    ],
  },
  {
    h: "Handing over to WhatsApp",
    p: [
      "Nothing leaves the page until you choose “Open WhatsApp” on the review step. The draft is then passed to WhatsApp in a link addressed to the number shown on this site. You decide whether to press Send. WhatsApp is a separate service; its own terms and privacy policy apply.",
    ],
  },
  {
    h: "Analytics and tracking",
    p: [
      "This preview has no analytics, advertising pixels, cookies or third-party embeds of its own. The hosting provider may keep standard technical logs under its own policies.",
    ],
  },
  {
    h: "About this preview",
    p: [
      "This is a design concept prepared for discussion with the business owner. It is not the business’s live website, and details on it are subject to the owner’s confirmation.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="s-parchment grain" data-hero>
        <div className="wrap pb-16 pt-10 md:pb-20 md:pt-16">
          <p className="eyebrow accent" data-hero-in="1">Privacy · Enquiries · Credits</p>
          <HeroTitle className="t-display mt-6 max-w-[14ch]" text="Privacy and your *enquiry*" />
          <p className="lede muted mt-8" data-hero-in="2">A plain explanation of what happens to the details you type into the message composer.</p>
        </div>
      </section>
      <section className="s-ivory sec">
        <div className="wrap grid-x gap-y-12">
          {SECTIONS.map((s, i) => (
            <article key={s.h} className="col-span-4 md:col-span-8 lg:col-span-12 grid-x gap-y-3">
              <p className="numeral accent col-span-4 md:col-span-2 lg:col-span-3 text-2xl">{["i", "ii", "iii", "iv", "v"][i]}</p>
              <div className="col-span-4 md:col-span-6 lg:col-span-7">
                <h2 className="t-h3">{s.h}</h2>
                <div className="prose-at muted mt-3 max-w-[62ch]">{s.p.map((t) => <p key={t}>{t}</p>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="credits" className="s-paper sec-sm border-t border-[var(--color-rule)] scroll-mt-24" aria-labelledby="credits-title">
        <div className="wrap">
          <h2 id="credits-title" className="t-h2" data-split>Image <em>credits</em></h2>
          <p className="muted mt-4 max-w-[64ch]">
            Paintings are historical artworks from open-access museum collections, shown as art — not as charts, remedies
            or images of the practitioner. Full provenance is recorded in the project’s asset credits.
          </p>
          <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {Object.entries(art).map(([k, a]) => (
              <li key={k} className="border-t border-[var(--color-rule)] pt-4 text-[0.95rem]">
                <span className="font-semibold">{a.title}</span> — {a.detail} <span className="muted">{a.credit}</span>
              </li>
            ))}
          </ul>
          <p className="eyebrow accent mt-12">{conceptCredit}</p>
          <Link href="/contact" className="ulink mt-4">← Back to contact</Link>
        </div>
      </section>
    </>
  );
}
