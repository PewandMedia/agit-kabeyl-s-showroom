/**
 * Stammdaten Autohaus AK GmbH.
 * Adresse / Telefon / Rechtliches sind Platzhalter — bitte ersetzen.
 */
export const dealer = {
  legalName: "Autohaus AK GmbH",
  shortName: "Autohaus AK",
  city: "Velbert",
  street: "Musterstraße 1", // TODO: echte Adresse
  postalCode: "42551",
  country: "DE",
  phone: "+49 2051 000000", // TODO
  phoneDisplay: "+49 2051 000 000",
  whatsapp: "4920510000000", // TODO: WhatsApp-Nummer im intl. Format ohne +
  email: "info@autohaus-ak.de", // TODO
  hours: [
    { day: "Mo–Fr", time: "09:00 – 18:30" },
    { day: "Sa", time: "10:00 – 15:00" },
    { day: "So", time: "Geschlossen" },
  ],
  claim: "Champion-Mentalität. Premium-Fahrzeuge. Ehrlicher Service.",
  subclaim:
    "Autohaus AK GmbH verbindet geprüfte Fahrzeuge, faire Konditionen und persönliche Beratung mit dem Anspruch, in jedem Detail Nummer 1 zu sein.",
  // Legal — Platzhalter
  managingDirector: "Agit Kabayel",
  hrb: "HRB 00000 (Amtsgericht Wuppertal)",
  ustId: "DE000000000",
};

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${dealer.whatsapp}?text=${text}`;
}

export function telLink(): string {
  return `tel:${dealer.phone.replace(/\s+/g, "")}`;
}
