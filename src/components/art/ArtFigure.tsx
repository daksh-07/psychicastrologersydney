import { art, type ArtKey } from "@/content/art";
import { ArtImage } from "./ArtImage";

type Props = {
  name: ArtKey;
  sizes: string;
  /** CSS aspect-ratio of the frame, e.g. "4 / 5". Defaults to the image's own ratio. */
  ratio?: string;
  shape?: "rect" | "arch";
  reveal?: "image" | false;
  dir?: "up" | "left" | "right";
  fit?: "cover" | "contain";
  focus?: string;
  priority?: boolean;
  caption?: boolean;
  numeral?: string;
  className?: string;
  frameClassName?: string;
  heroArt?: boolean;
  alt?: string;
  captionClassName?: string;
};

/** A framed artwork with a museum-style caption. */
export function ArtFigure({
  name,
  sizes,
  ratio,
  shape = "rect",
  reveal = "image",
  dir,
  fit,
  focus,
  priority,
  caption = true,
  numeral,
  className,
  frameClassName,
  heroArt,
  alt,
  captionClassName,
}: Props) {
  const meta = art[name];
  return (
    <figure className={className}>
      <div
        className={`frame ${shape === "arch" ? "arch" : ""} ${fit === "contain" ? "frame-contain" : ""} ${frameClassName ?? ""}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
        data-reveal={reveal || undefined}
        data-dir={dir}
        data-hero-art={heroArt || undefined}
      >
        <ArtImage name={name} sizes={sizes} priority={priority} focus={focus} fit={fit} alt={alt} className="h-full w-full" />
      </div>
      {caption && (
        <figcaption className={`caption muted mt-3 flex gap-3 ${captionClassName ?? ""}`}>
          {numeral && <span className="numeral whitespace-nowrap text-[0.95rem] leading-none accent">{numeral}</span>}
          <span>
            <span className="font-semibold text-current">{meta.title}</span>. {meta.detail}{" "}
            <span className="opacity-80">{meta.credit}</span>
          </span>
        </figcaption>
      )}
    </figure>
  );
}
