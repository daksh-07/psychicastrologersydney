import type { Faq } from "@/content/faqs";

export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <div>
      {items.map((f) => (
        <details key={f.id} className="faq-item" id={f.id}>
          <summary>
            {f.question}
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <div className="faq-body muted prose-almanac">
            {f.answer.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
