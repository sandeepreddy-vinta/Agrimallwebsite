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
  phoneDisplay: "+91 94936 36363",
  phoneHref: "+919493636363",

  grievanceOfficer: "Sandeep Reddy Vinta",

  social: {
    youtube: "https://www.youtube.com/@mohanagrimalltelugu/",
    facebook: "https://www.facebook.com/MohanAgriMallTelugu/",
    instagram: "https://www.instagram.com/mohanagrimalltelugu/",
  },

  playStoreUrl: "https://play.google.com/store/apps/details?id=com.agri_mall",
} as const;
