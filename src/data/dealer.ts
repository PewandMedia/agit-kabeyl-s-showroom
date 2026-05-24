/**
 * Stammdaten Autohaus AK GmbH.
 * Adresse / Telefon noch Platzhalter — bitte mit echten Werten ersetzen.
 */
export const dealer = {
  legalName: "Autohaus AK GmbH",
  shortName: "Autohaus AK",
  city: "Velbert",
  street: "Musterstraße 1", // TODO: echte Adresse
  postalCode: "42551",
  country: "DE",
  phone: "+49 2051 000000", // TODO: echte Nummer
  phoneDisplay: "+49 2051 000 000",
  whatsapp: "4920510000000", // TODO: echte WhatsApp-Nummer (intl. Format ohne +)
  email: "info@autohaus-ak.de", // TODO
  hours: [
    { day: "Mo–Fr", time: "09:00 – 18:30" },
    { day: "Sa", time: "10:00 – 15:00" },
    { day: "So", time: "Geschlossen" },
  ],
  claim: "Champions wählen mit Bedacht.",
  subclaim:
    "Geprüfte Premium- und Gebrauchtfahrzeuge aus Velbert. Persönlich ausgewählt, sorgfältig aufbereitet, ehrlich verkauft.",
};

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${dealer.whatsapp}?text=${text}`;
}

export function telLink(): string {
  return `tel:${dealer.phone.replace(/\s+/g, "")}`;
}
