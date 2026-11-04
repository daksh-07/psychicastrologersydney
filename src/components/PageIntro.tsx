import type { ReactNode } from "react";

/** Deep-ink opening band used on inner routes. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  before,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  before?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-ink">
      <div className="wrap pb-16 pt-6 md:pb-24 md:pt-8">
        {before}
        <div className="grid-cols mt-10 gap-y-6 md:mt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-9">
            <p className="eyebrow brass">{eyebrow}</p>
            <h1 className="display-1 mt-5">{title}</h1>
          </div>
          {lead && (
            <p className="lead muted col-span-4 md:col-span-6 lg:col-span-6">{lead}</p>
          )}
          {children && <div className="col-span-4 md:col-span-8 lg:col-span-12">{children}</div>}
        </div>
      </div>
    </section>
  );
}
