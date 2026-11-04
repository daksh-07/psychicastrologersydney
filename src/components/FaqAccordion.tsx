import type { Faq } from "@/content/catalogue";

/** Native <details> accordion — keyboard and screen-reader support come from the platform. */
export function FaqAccordion({ items, name = "faq" }: { items: readonly Faq[]; name?: string }) {
  return (
    <div>
      {items.map((f, i) => (
        <details key={f.q} className="acc" name={name} id={`${name}-${i}`}>
          <summary>
            <span>{f.q}</span>
            <span className="plus" aria-hidden="true" />
          </summary>
          <div className="acc-body muted">
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
