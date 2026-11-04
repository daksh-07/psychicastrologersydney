import type { CSSProperties } from "react";
import { images, type ImageKey } from "@/content/images";

const srcset = (base: string, widths: readonly number[], ext: "avif" | "webp") =>
  widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");

/**
 * Art-directed, lazy, below-the-fold figure. Aspect ratios are reserved per
 * breakpoint so nothing shifts while the image loads.
 */
export function EditorialFigure({
  name,
  sizes,
  className,
  tone = "paper",
}: {
  name: ImageKey;
  sizes: string;
  className?: string;
  tone?: "paper" | "ink";
}) {
  const img = images[name];
  const style = {
    "--ar-m": `${img.mobile.w} / ${img.mobile.h}`,
    "--ar-d": `${img.desktop.w} / ${img.desktop.h}`,
    "--focus-m": img.focus.mobile,
    "--focus-d": img.focus.desktop,
  } as CSSProperties;
  const fallbackW = img.mobile.widths[0] ?? 480;

  return (
    <figure className={["editorial-figure", className ?? ""].join(" ").trim()} style={style} data-image={name}>
      <div className={`frame ${tone === "ink" ? "border-rule-ink" : "border-rule"}`}>
        <picture>
          <source media="(min-width: 1024px)" type="image/avif" srcSet={srcset(img.desktop.base, img.desktop.widths, "avif")} sizes={sizes} />
          <source media="(min-width: 1024px)" type="image/webp" srcSet={srcset(img.desktop.base, img.desktop.widths, "webp")} sizes={sizes} />
          <source type="image/avif" srcSet={srcset(img.mobile.base, img.mobile.widths, "avif")} sizes={sizes} />
          <source type="image/webp" srcSet={srcset(img.mobile.base, img.mobile.widths, "webp")} sizes={sizes} />
          <img
            src={`${img.mobile.base}-${fallbackW}.webp`}
            width={img.mobile.w * 100}
            height={img.mobile.h * 100}
            alt={img.alt}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <figcaption className="eyebrow muted mt-3 grid gap-1 !normal-case !tracking-[0.04em] !font-medium">
        <span>{img.caption}</span>
        <span className="opacity-80">{img.credit}</span>
      </figcaption>
    </figure>
  );
}
