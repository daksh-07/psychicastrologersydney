/**
 * Editorial image set. Sources, rights and placements: docs/ASSET_CREDITS.md.
 * Each image has an art-directed desktop and mobile crop with fixed aspect ratios.
 */
type Crop = { base: string; widths: readonly number[]; w: number; h: number };

export type EditorialImage = {
  /** Empty string = decorative. */
  alt: string;
  desktop: Crop;
  mobile: Crop;
  /** CSS object-position for each crop. */
  focus: { desktop: string; mobile: string };
  caption: string;
  credit: string;
};

export const images = {
  notebook: {
    alt: "",
    desktop: { base: "/images/notebook-wide", widths: [800, 1200, 1600], w: 3, h: 2 },
    mobile: { base: "/images/notebook-square", widths: [480, 800], w: 1, h: 1 },
    focus: { desktop: "50% 50%", mobile: "52% 50%" },
    caption: "Still life · an open notebook in window light",
    credit: "Photograph: Ana Miranda / Unsplash",
  },
  palm: {
    alt: "Close-up of two open palms held together, showing deep creases and lines across the skin.",
    desktop: { base: "/images/palm-tall", widths: [480, 800], w: 3, h: 4 },
    mobile: { base: "/images/palm-mobile", widths: [480, 800], w: 4, h: 5 },
    focus: { desktop: "50% 45%", mobile: "50% 50%" },
    caption: "Fig. 02 · The lines of the hand",
    credit: "Photograph: Om Prakash Sethia / Unsplash. Tone adjusted.",
  },
  sphere: {
    alt: "Detail of an engraved armillary sphere: interlocking rings marked in degrees, labelled with the tropics, the ecliptic and the equator, around a small central globe.",
    desktop: { base: "/images/sphere-tall", widths: [480, 800], w: 3, h: 4 },
    mobile: { base: "/images/sphere-square", widths: [480, 800], w: 1, h: 1 },
    focus: { desktop: "50% 50%", mobile: "50% 50%" },
    caption:
      "Fig. 02 · Armillary sphere, detail. Historical astronomical engraving by R. W. Seale for the New Geographical Dictionary, London — shown as illustration, not as a Vedic or personal chart.",
    credit: "Wellcome Collection · Public Domain Mark",
  },
} as const satisfies Record<string, EditorialImage>;

export type ImageKey = keyof typeof images;
