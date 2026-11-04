import Link from "next/link";

export function Breadcrumbs({ items }: { items: readonly { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-ink">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-rule-ink">/</span>}
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-ivory hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ivory">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
