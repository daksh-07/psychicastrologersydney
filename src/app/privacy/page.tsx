import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { conceptCredit } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy and the enquiry form",
  description:
    "How the WhatsApp message composer on this preview site handles the details you type, and what happens when you choose to open WhatsApp.",
  openGraph: { title: "Privacy and the enquiry form", url: "/privacy" },
};

const sections = [
  {
    heading: "What the composer does",
    body: [
      "The form on the contact page helps you write a WhatsApp message. It asks for your name, a contact number, a consultation topic and an optional short note, and turns them into a draft you can read before going any further.",
    ],
  },
  {
    heading: "Where your details are kept",
    body: [
      "While you type, your details are held only in the open page’s memory. This website does not send them to a server, save them in your browser’s storage or put them in the page address. Closing or reloading the page clears them.",
      "The only value that can appear in a link on this site is the name of a consultation topic — for example, when a service page links to the contact page with that topic pre-selected.",
    ],
  },
  {
    heading: "Handing over to WhatsApp",
    body: [
      "Nothing leaves the page until you choose “Open WhatsApp” on the review step. At that point the draft is passed to WhatsApp in a link, and WhatsApp opens a chat addressed to the number shown on this site.",
      "The message is not sent automatically: you choose whether to press Send inside WhatsApp. WhatsApp is a separate service, and its own terms and privacy policy apply to anything you share there.",
    ],
  },
  {
    heading: "Analytics and tracking",
    body: [
      "This preview has no analytics, advertising pixels, cookies or embedded third-party widgets of its own. The hosting provider may keep standard technical logs; their own policies apply to those.",
    ],
  },
  {
    heading: "About this preview",
    body: [
      "This is a design concept prepared for discussion with the business owner. It is not the business’s live website, and details on it are subject to the owner’s confirmation.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Privacy · Enquiry form"
        title="Privacy and your enquiry"
        lead="A plain explanation of what happens to the details you type into the message composer."
      />
      <section className="on-paper section">
        <div className="wrap grid-cols gap-y-12">
          {sections.map((s, i) => (
            <article key={s.heading} className="col-span-4 md:col-span-8 lg:col-span-12 grid-cols gap-y-4">
              <p className="eyebrow brass col-span-4 md:col-span-2 lg:col-span-3">0{i + 1}</p>
              <div className="col-span-4 md:col-span-6 lg:col-span-7">
                <h2 className="heading-3">{s.heading}</h2>
                <div className="prose-almanac muted measure mt-4">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
          <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-7 lg:col-start-4">
            <p className="eyebrow brass">{conceptCredit}</p>
            <Link href="/contact" className="text-link mt-4">
              <span aria-hidden="true">←</span> Back to contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
