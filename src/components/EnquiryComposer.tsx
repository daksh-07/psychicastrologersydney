"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { business, telHref } from "@/config/business";
import { isTopicSlug, topicLabel, type TopicSlug, type topics as TopicList } from "@/content/topics";
import {
  LIMITS,
  buildEnquiryText,
  buildWhatsAppUrl,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
  type FieldName,
} from "@/lib/enquiry";

const EMPTY: EnquiryInput = { name: "", phone: "", topic: "", message: "" };
const ORDER: FieldName[] = ["name", "phone", "topic", "message"];
const LABELS: Record<FieldName, string> = {
  name: "Name",
  phone: "Contact number",
  topic: "Consultation topic",
  message: "Short note",
};

/**
 * Values live only in component state. Inputs carry no `name` attribute, so a
 * pre-hydration or no-JS submit cannot place personal details in a URL.
 */
export function EnquiryComposer({ topics }: { topics: typeof TopicList }) {
  const uid = useId();
  const id = (f: FieldName) => `${uid}-${f}`;
  const [ready, setReady] = useState(false);
  const [values, setValues] = useState<EnquiryInput>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [step, setStep] = useState<"edit" | "review">("edit");
  const summaryRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const reviewButtonRef = useRef<HTMLButtonElement>(null);
  const focusAfterEdit = useRef(false);

  useEffect(() => {
    setReady(true);
    const fromQuery = new URLSearchParams(window.location.search).get("topic");
    if (isTopicSlug(fromQuery)) setValues((v) => (v.topic ? v : { ...v, topic: fromQuery }));
  }, []);

  useEffect(() => {
    if (step === "review") reviewRef.current?.focus();
    else if (focusAfterEdit.current) {
      focusAfterEdit.current = false;
      reviewButtonRef.current?.focus();
    }
  }, [step]);

  useEffect(() => {
    if (showSummary) summaryRef.current?.focus();
  }, [showSummary, errors]);

  function update(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      const next = validateEnquiry({ ...values, [field]: value });
      setErrors((e) => {
        const copy = { ...e };
        if (next[field]) copy[field] = next[field];
        else delete copy[field];
        return copy;
      });
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setShowSummary(false);
      // Re-trigger focus even if the summary was already visible.
      requestAnimationFrame(() => setShowSummary(true));
      return;
    }
    setShowSummary(false);
    setStep("review");
  }

  function openWhatsApp() {
    if (!isTopicSlug(values.topic)) return;
    // Build and encode once, only in response to this click.
    const url = buildWhatsAppUrl(business.whatsapp.number, buildEnquiryText({ ...values, topic: values.topic }));
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const errorIds = ORDER.filter((f) => errors[f]);
  const draft = isTopicSlug(values.topic) && step === "review" ? buildEnquiryText({ ...values, topic: values.topic }) : "";

  if (step === "review") {
    const topic = values.topic as TopicSlug;
    return (
      <div className="border border-rule bg-paper p-5 md:p-8" data-testid="review">
        <p className="eyebrow brass">Step 2 of 2 · Review</p>
        <h3 ref={reviewRef} tabIndex={-1} className="heading-3 mt-3 outline-none">Review your WhatsApp message</h3>
        <p className="muted mt-4 measure">
          This is the exact text that will appear in WhatsApp. Nothing has been sent.
        </p>
        <pre
          className="mt-6 whitespace-pre-wrap break-words border-l-2 border-brass-dark bg-ivory p-4 font-sans text-[0.9375rem] leading-relaxed"
          data-testid="draft"
        >
          {draft}
        </pre>
        <div className="mt-6 border-t border-rule pt-5 text-[0.9375rem]">
          <h4 className="font-semibold">What is shared when you open WhatsApp</h4>
          <p className="muted mt-2 measure">
            Your name, contact number, the topic “{topicLabel(topic)}”
            {values.message.trim() ? " and your note" : ""} are placed into a WhatsApp chat addressed to{" "}
            {business.phone.display}. WhatsApp is a separate service with its own terms. The message only goes to
            Pandit Thulasidas if you press Send there.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <button type="button" className="btn btn-dark" onClick={openWhatsApp}>
            Open WhatsApp <span className="arrow" aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              focusAfterEdit.current = true;
              setStep("edit");
            }}
          >
            Edit details
          </button>
        </div>
        <p className="muted mt-6 text-sm">
          WhatsApp not available? <a href={telHref} className="underline">Call {business.phone.display}</a>.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`} className="border border-rule bg-paper p-5 md:p-8">
      <p className="eyebrow brass">Step 1 of 2 · Details</p>
      <h3 id={`${uid}-title`} className="heading-3 mt-3">Your enquiry</h3>
      <p className="muted mt-3 text-[0.9375rem]">
        All fields are required unless marked optional. Please don’t include birth details, photos, payment
        information or anything confidential.
      </p>

      {showSummary && errorIds.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={`${uid}-summary`}
          className="mt-6 border-2 border-[#8a2417] bg-ivory p-4 outline-none focus-visible:outline-2 focus-visible:outline-[#8a2417]"
          data-testid="error-summary"
        >
          <h4 id={`${uid}-summary`} className="font-semibold">Please check {errorIds.length === 1 ? "one field" : `${errorIds.length} fields`}</h4>
          <ul className="mt-2 grid gap-1">
            {errorIds.map((f) => (
              <li key={f}>
                <a
                  href={`#${id(f)}`}
                  className="inline-flex min-h-11 items-center text-[#8a2417] underline"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id(f))?.focus();
                  }}
                >
                  {LABELS[f]}: {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset disabled={!ready} className="mt-6 grid gap-6">
        <div className="field">
          <label htmlFor={id("name")}>{LABELS.name}</label>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${id("name")}-error` : undefined}
            required
          />
          {errors.name && <span className="error" id={`${id("name")}-error`}>{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor={id("phone")}>{LABELS.phone}</label>
          <span className="hint" id={`${id("phone")}-hint`}>For a call back. Local or international format, e.g. 0412 345 678 or +61 412 345 678.</span>
          <input
            id={id("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={24}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={[`${id("phone")}-hint`, errors.phone ? `${id("phone")}-error` : ""].join(" ").trim()}
            required
          />
          {errors.phone && <span className="error" id={`${id("phone")}-error`}>{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor={id("topic")}>{LABELS.topic}</label>
          <select
            id={id("topic")}
            value={values.topic}
            onChange={(e) => update("topic", e.target.value)}
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={errors.topic ? `${id("topic")}-error` : undefined}
            required
          >
            <option value="">Choose a topic</option>
            {topics.map((t) => (
              <option key={t.slug} value={t.slug}>{t.label}</option>
            ))}
          </select>
          {errors.topic && <span className="error" id={`${id("topic")}-error`}>{errors.topic}</span>}
        </div>

        <div className="field">
          <label htmlFor={id("message")}>
            {LABELS.message} <span className="font-normal text-muted">(optional)</span>
          </label>
          <span className="hint" id={`${id("message")}-hint`}>One or two sentences about your question is plenty.</span>
          <textarea
            id={id("message")}
            maxLength={LIMITS.message}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={[`${id("message")}-hint`, `${id("message")}-count`, errors.message ? `${id("message")}-error` : ""].join(" ").trim()}
          />
          <span className="hint mt-2 !mb-0" id={`${id("message")}-count`}>
            {values.message.length} / {LIMITS.message} characters
          </span>
          {errors.message && <span className="error" id={`${id("message")}-error`}>{errors.message}</span>}
        </div>

        <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-center">
          <button ref={reviewButtonRef} type="submit" className="btn btn-dark">
            Review WhatsApp message <span className="arrow" aria-hidden="true">→</span>
          </button>
          <a href={telHref} className="text-link justify-center min-[480px]:ml-2">Or call {business.phone.display}</a>
        </div>
      </fieldset>
    </form>
  );
}
