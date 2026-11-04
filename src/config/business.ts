/**
 * Single source of truth for contact details used across the preview.
 *
 * PREVIEW DEFAULT — owner confirmation required before any live release.
 * The number below is the one published most consistently on the current site
 * (homepage enquiry block, sticky actions, service links and footer). A second
 * number appears in the legacy header and is deliberately NOT used here.
 * Email is omitted: the original site shows four different addresses.
 */
export const business = {
  name: "Pandit Thulasidas",
  role: "Vedic astrologer and spiritual advisor",
  locality: "Sydney, NSW",
  /** As published on the original website. Confirm visiting arrangements before launch. */
  address: {
    street: "9 Addlestone Rd",
    suburb: "Merrylands NSW 2160",
    country: "Australia",
    mapHref: "https://www.google.com/maps/search/?api=1&query=9%20Addlestone%20Rd%2C%20Merrylands%20NSW%202160",
  },
  /** Stated on the original website; awaiting owner confirmation. */
  experienceClaim: "more than 25 years of experience in Vedic astrology and spiritual guidance",
  phone: {
    /** E.164 digits used to build tel: and wa.me destinations. */
    e164: "+61426562158",
    display: "+61 426 562 158",
  },
  whatsapp: {
    /** wa.me expects the international number without "+" or spaces. */
    number: "61426562158",
    /** Generic, PII-free prefill used by direct CTAs. */
    genericText: "Hello, I would like to ask about a consultation.",
  },
} as const;

export const telHref = `tel:${business.phone.e164}`;

export const whatsappBase = `https://wa.me/${business.whatsapp.number}`;

/** Direct WhatsApp link with a generic greeting only — never personal details. */
export const whatsappDirectHref = `${whatsappBase}?text=${encodeURIComponent(business.whatsapp.genericText)}`;

export const disclaimer =
  "Astrology and spiritual consultations offer a traditional perspective for personal reflection. For medical, legal or financial matters, speak with a qualified professional.";

export const conceptCredit = "Website concept by Everest Marketing";
