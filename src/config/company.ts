/**
 * Single source of truth for the legal entity details shown on the site.
 *
 * WHY THIS FILE EXISTS
 * Meta business verification compares the legal name, address and contact on
 * agrimall.io against the GST certificate and the Business Manager record.
 * All three must match. Keeping them in one file means there is exactly one
 * place to correct if the certificate words anything differently.
 *
 * The address below is transcribed from the GST certificate (REG-06, issued
 * 08/05/2024) — Principal Place of Business — and matches the values entered in
 * Business Manager → Business info. Do not "tidy" it.
 *
 * Two forms, deliberately:
 *   addressLines     — the readable form for the footer and contact section.
 *   addressCertified — the full certificate address including the premises
 *                      detail ("Basement Part A…"), used on the legal pages
 *                      where an exact match with the document matters most.
 *
 * grievanceOfficer is the named contact India's IT Rules require on the privacy
 * page. Change it here and both /privacy and /terms follow.
 */

export const COMPANY = {
  legalName: "Sree Mohan Agri Mall",
  entityType: "a partnership firm registered in India",

  addressLines: [
    "15/164, Balaji Complex,",
    "Gosha Hospital Road,",
    "Adoni – 518301,",
    "Kurnool District,",
    "Andhra Pradesh, India",
  ],
  addressOneLine:
    "15/164, Balaji Complex, Gosha Hospital Road, Adoni – 518301, Kurnool District, Andhra Pradesh, India",

  // Structured form, for the schema.org Organization block. Same values, split
  // into the fields PostalAddress expects — so there is still only one place to
  // change if the certificate is ever reworded.
  postalAddress: {
    streetAddress: "15/164, Balaji Complex, Gosha Hospital Road",
    addressLocality: "Adoni",
    addressRegion: "Andhra Pradesh",
    postalCode: "518301",
    addressCountry: "IN",
  },

  // Exactly as on the GST certificate, premises detail included.
  addressCertified:
    "15/164, Balaji Complex, Gosha Hospital Road, Basement Part A, Part B and First Floor Part G, Adoni – 518301, Andhra Pradesh, India",

  gstin: "37AELFS0346C1Z5",

  // Published contact. Use the domain-matched mailbox, not a Gmail address:
  // Meta sends the verification confirmation code to an address on the
  // website's own domain, and a Gmail in the footer works against that.
  email: "agrimall@agrimall.io",

  // TWO NUMBERS, AND THEY ARE NOT INTERCHANGEABLE.
  //
  // phone* is the office voice line. It is the number to publish as "call us",
  // to give as the grievance officer's telephone, and to enter in Meta Business
  // Manager -> Business info. A human must answer it in business hours: a
  // reviewer may dial the number shown on the site, and India's IT Rules expect
  // the grievance contact to actually be reachable.
  //
  // whatsapp* is the WhatsApp Cloud API number for WABA 102097146277644. It
  // CANNOT receive an ordinary call or SMS — it only exists inside WhatsApp.
  // Never label it "call us" and never put it in a tel: link. Until Sep 2026
  // the site did exactly that, in eight places including the grievance block.
  phoneDisplay: "+91 92814 45083",
  phoneHref: "+919281445083",

  whatsappDisplay: "+91 94936 36363",
  whatsappUrl: "https://wa.me/919493636363",

  grievanceOfficer: "Sandeep Reddy Vinta",

  social: {
    youtube: "https://www.youtube.com/@mohanagrimalltelugu/",
    facebook: "https://www.facebook.com/MohanAgriMallTelugu/",
    instagram: "https://www.instagram.com/mohanagrimalltelugu/",
  },

  playStoreUrl: "https://play.google.com/store/apps/details?id=com.agri_mall",
} as const;
