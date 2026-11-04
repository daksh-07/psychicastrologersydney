import type { CSSProperties } from "react";
import { art, artSize, type ArtKey } from "@/content/art";

const set = (key: ArtKey, widths: readonly number[], ext: "avif" | "webp") =>
  widths.map((w) => `/art/${key}-${w}.${ext} ${w}w`).join(", ");

type Props = {
  name: ArtKey;
  sizes: string;
  priority?: boolean;
  /** Override alt — pass "" to mark decorative in this context. */
  alt?: string;
  focus?: string;
  fit?: "cover" | "contain";
  className?: string;
  style?: CSSProperties;
};

/** Pre-optimised AVIF/WebP from /public/art. Intrinsic size is always set to avoid layout shift. */
export function ArtImage({ name, sizes, priority, alt, focus, fit = "cover", className, style }: Props) {
  const m = artSize(name);
  const meta = art[name];
  const fallback = m.widths.includes(800) ? 800 : m.widths[m.widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set(name, m.widths, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set(name, m.widths, "webp")} sizes={sizes} />
      <img
        src={`/art/${name}-${fallback}.webp`}
        width={m.w}
        height={m.h}
        alt={alt ?? meta.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={className}
        data-photo={meta.credit.startsWith("Photograph") || undefined}
        style={{ objectFit: fit, objectPosition: focus ?? meta.focus, backgroundColor: m.bg, ...style }}
      />
    </picture>
  );
}
