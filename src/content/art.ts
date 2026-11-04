import manifest from "./art-manifest.json";

/**
 * Curated art set. Full provenance and licence notes: docs/ASSET_CREDITS.md.
 * Captions describe the works as historical artworks or photographs — never as charts,
 * remedies or images of the practitioner.
 */
export type ArtKey = keyof typeof manifest;

export type ArtMeta = {
  title: string;
  detail: string;
  credit: string;
  alt: string;
  /** Default CSS object-position for cropping. */
  focus: string;
};

export const art: Record<ArtKey, ArtMeta> = {
  "krishna-fluting": {
    title: "Krishna Fluting",
    detail: "Rajasthan, Bundi, c. 1675–1700. Gum tempera on paper.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "A Rajput painting on a deep red ground framed in saffron: Krishna, blue-skinned, plays the flute beside a banana tree as deer and cattle gather.",
    focus: "52% 40%",
  },
  "radha-sakhi": {
    title: "Sakhi persuades Radha to meet Krishna",
    detail: "From a Gita Govinda of Jayadeva. Attributed to Purkhu, Pahari kingdoms, c. 1820–25.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "A Pahari painting of a dense green grove: on the left a companion speaks with Radha; on the right Krishna waits alone among the trees.",
    focus: "50% 50%",
  },
  "krishna-awaiting": {
    title: "Krishna Awaiting Radha",
    detail: "Pahari kingdoms, c. 1750–60. Gum tempera and gold on paper.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "Krishna reclines on a terrace bed in a pale palace pavilion, looking towards the doorway while two attendants stand nearby.",
    focus: "55% 70%",
  },
  "radha-storm": {
    title: "Radha and Krishna meet in the forest during a storm",
    detail: "Bengal, Mughal, c. 1770. Gum tempera and gold on paper.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "Under a dark storm sky, a crowded forest of trees shelters figures, deer and cattle as Radha and Krishna meet among them.",
    focus: "50% 55%",
  },
  "shiva-parvati": {
    title: "Parvati placing a wedding garland on Shiva",
    detail: "Kalighat album, Kolkata, c. 1890.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "A Kalighat painting: Parvati, in a purple sari, raises a wedding garland towards Shiva, who stands with hands clasped.",
    focus: "50% 35%",
  },
  "vishnu-lakshmi": {
    title: "Vishnu and Lakshmi on Garuda",
    detail: "Rajasthan, Bundi school, c. 1750.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "On a saffron ground, the bird-man Garuda flies with wings outspread, carrying Vishnu and Lakshmi seated together on his back.",
    focus: "52% 45%",
  },
  ganesha: {
    title: "Ganesha",
    detail: "Kalighat, Kolkata, c. 1890. Revered as the remover of obstacles.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "A Kalighat painting of Ganesha, the elephant-headed deity, rendered in rose and teal washes with a radiating halo.",
    focus: "50% 30%",
  },
  budha: {
    title: "Mercury (Budha)",
    detail: "From a Mandi astrology series, attributed to Sanju, c. 1810.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "Budha, the planet Mercury personified, rides a tiger across a pale blue oval field, holding a sword, shield and club.",
    focus: "50% 50%",
  },
  taurus: {
    title: "Taurus (Vṛṣabha)",
    detail: "From a Mandi astrology series, attributed to Sanju, c. 1810.",
    credit: "The Cleveland Museum of Art · CC0",
    alt: "A white bull in an embroidered saddle-cloth stands beneath a tree, with farmers ploughing on the hills behind, inside an oval floral border.",
    focus: "45% 55%",
  },
  "palm-diagram": {
    title: "Hand covered in various symbols",
    detail: "Historical European chiromancy manuscript.",
    credit: "Wellcome Collection · Public Domain Mark",
    alt: "A manuscript drawing of an open hand on a grid, its fingers and palm marked with planetary and zodiac symbols and labelled lines.",
    focus: "50% 45%",
  },
  "jantar-mantar": {
    title: "Jantar Mantar, Jaipur",
    detail: "An 18th-century masonry sundial at the Jaipur observatory.",
    credit: "Photograph: Ravi Kumar Meena / Unsplash",
    alt: "",
    focus: "45% 60%",
  },
  lepakshi: {
    title: "Carved hall, Lepakshi",
    detail: "Veerabhadra temple, Andhra Pradesh.",
    credit: "Photograph: Suhas Hanjar / Unsplash",
    alt: "",
    focus: "50% 55%",
  },
  diyas: {
    title: "Lit diyas",
    detail: "Oil lamps, Pune.",
    credit: "Photograph: Anunay Mahajan / Unsplash",
    alt: "",
    focus: "50% 45%",
  },
  "temple-corridor": {
    title: "Pillared corridor",
    detail: "Temple architecture, Chennai.",
    credit: "Photograph: Pushpatej / Unsplash",
    alt: "",
    focus: "55% 50%",
  },
};

export const artSize = (key: ArtKey) => manifest[key];
