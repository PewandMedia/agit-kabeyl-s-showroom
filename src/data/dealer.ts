/**
 * Stammdaten Autohaus AK GmbH.
 * TODO vor Go-Live: managingDirector, hrb, ustId mit echten Daten aus dem
 * Handelsregisterauszug ersetzen — rechtlich erforderlich fürs Impressum.
 */
export const dealer = {
  legalName: "Autohaus AK GmbH",
  shortName: "Autohaus AK",
  city: "Velbert",
  street: "Eckstraße 9a",
  postalCode: "42551",
  country: "DE",
  phone: "+4916090919911",
  phoneDisplay: "+49 160 90919911",
  whatsapp: "4916090919911",
  email: "info@autohaus-ak.com",
  hours: [
    { day: "Mo–Fr", time: "09:00 – 18:30" },
    { day: "Sa", time: "10:00 – 15:00" },
    { day: "So", time: "Geschlossen" },
  ],
  claim: "Geprüfte Fahrzeuge. Ehrliche Beratung. Faire Konditionen.",
  subclaim:
    "Autohaus AK GmbH steht für persönlich ausgewählte Fahrzeuge, transparente Daten und einen Service, der nach dem Kauf weitergeht.",
  // Legal — TODO: vor Go-Live mit echten Daten ersetzen
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
