import Link from "next/link";
import { services } from "@/content/services";

export function ServiceRows({ variant = "home" }: { variant?: "home" | "index" }) {
  const Title = variant === "home" ? "h3" : "h2";
  return (
    <ul>
      {services.map((s) => (
        <li key={s.slug}>
          <Link href={`/consultations/${s.slug}`} className="service-row group">
            <span className="row-num eyebrow brass" aria-hidden="true">{s.number}</span>
            <Title className="row-title">{s.title}</Title>
            <p className="row-summary muted measure">{variant === "home" ? s.rowSummary : s.indexSummary}</p>
            <span className="row-arrow text-2xl brass" aria-hidden="true">
              <span className="arrow">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
