import type { ArtKey } from "@/content/art";
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
  className?: string;
  frameClassName?: string;
  heroArt?: boolean;
  alt?: string;
};

/** A framed artwork. No visible caption or credit — provenance is kept in docs/ASSET_CREDITS.md. */
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
  className,
  frameClassName,
  heroArt,
  alt,
}: Props) {
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
    </figure>
  );
}
