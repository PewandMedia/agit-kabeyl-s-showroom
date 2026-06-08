import macan01 from "@/assets/vehicles/macan-01.jpg.asset.json";
import macan02 from "@/assets/vehicles/macan-02.jpg.asset.json";
import macan03 from "@/assets/vehicles/macan-03.jpg.asset.json";
import macan04 from "@/assets/vehicles/macan-04.jpg.asset.json";
import macan05 from "@/assets/vehicles/macan-05.jpg.asset.json";
import macan06 from "@/assets/vehicles/macan-06.jpg.asset.json";
import macan07 from "@/assets/vehicles/macan-07.jpg.asset.json";
import macan08 from "@/assets/vehicles/macan-08.jpg.asset.json";
import macan09 from "@/assets/vehicles/macan-09.jpg.asset.json";
import macan10 from "@/assets/vehicles/macan-10.jpg.asset.json";
import macan11 from "@/assets/vehicles/macan-11.jpg.asset.json";
import macan12 from "@/assets/vehicles/macan-12.jpg.asset.json";
import macan13 from "@/assets/vehicles/macan-13.jpg.asset.json";
import macan14 from "@/assets/vehicles/macan-14.jpg.asset.json";
import macan15 from "@/assets/vehicles/macan-15.jpg.asset.json";
import macan16 from "@/assets/vehicles/macan-16.jpg.asset.json";
import macan17 from "@/assets/vehicles/macan-17.jpg.asset.json";
import macan18 from "@/assets/vehicles/macan-18.jpg.asset.json";
import macan19 from "@/assets/vehicles/macan-19.jpg.asset.json";
import macan20 from "@/assets/vehicles/macan-20.jpg.asset.json";
import macan21 from "@/assets/vehicles/macan-21.jpg.asset.json";
import macan22 from "@/assets/vehicles/macan-22.jpg.asset.json";
import macan23 from "@/assets/vehicles/macan-23.jpg.asset.json";
import macan24 from "@/assets/vehicles/macan-24.jpg.asset.json";
import macan25 from "@/assets/vehicles/macan-25.jpg.asset.json";
import cla01 from "@/assets/vehicles/cla45-01.png.asset.json";
import cla02 from "@/assets/vehicles/cla45-02.png.asset.json";
import cla03 from "@/assets/vehicles/cla45-03.png.asset.json";
import cla04 from "@/assets/vehicles/cla45-04.png.asset.json";
import cla05 from "@/assets/vehicles/cla45-05.png.asset.json";
import cla06 from "@/assets/vehicles/cla45-06.png.asset.json";
import cla07 from "@/assets/vehicles/cla45-07.png.asset.json";
import cla08 from "@/assets/vehicles/cla45-08.png.asset.json";
import cla09 from "@/assets/vehicles/cla45-09.png.asset.json";
import cla10 from "@/assets/vehicles/cla45-10.png.asset.json";
import cla11 from "@/assets/vehicles/cla45-11.png.asset.json";
import cla12 from "@/assets/vehicles/cla45-12.png.asset.json";
import cla13 from "@/assets/vehicles/cla45-13.png.asset.json";
import cla14 from "@/assets/vehicles/cla45-14.png.asset.json";
import cla15 from "@/assets/vehicles/cla45-15.png.asset.json";
import cla16 from "@/assets/vehicles/cla45-16.png.asset.json";
import cla17 from "@/assets/vehicles/cla45-17.png.asset.json";
import cla18 from "@/assets/vehicles/cla45-18.png.asset.json";
import cla19 from "@/assets/vehicles/cla45-19.png.asset.json";
import cla20 from "@/assets/vehicles/cla45-20.png.asset.json";
import cla21 from "@/assets/vehicles/cla45-21.png.asset.json";
import cla22 from "@/assets/vehicles/cla45-22.png.asset.json";

export type VehicleStatus =
  | "available"
  | "reserved"
  | "sold"
  | "new-arrival"
  | "highlight";

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  variant: string;
  title: string;
  priceEur: number;
  mileageKm: number;
  firstRegistration: string; // MM/YYYY
  year: number;
  fuel: "Benzin" | "Diesel" | "Hybrid" | "Elektro";
  transmission: "Automatik" | "Schaltgetriebe";
  powerKw: number;
  exteriorColor: string;
  condition: "Neuwagen" | "Jahreswagen" | "Gebraucht" | "Vorführwagen";
  previousOwners: number;
  images: string[];
  features: string[];
  description: string;
  financingAvailable: boolean;
  monthlyRateEur?: number;
  status: VehicleStatus;
};

function v(
  data: Omit<Vehicle, "title" | "year"> & { title?: string; year?: number },
): Vehicle {
  const title = data.title ?? `${data.make} ${data.model} ${data.variant}`.trim();
  const year =
    data.year ?? Number(data.firstRegistration.split("/")[1] ?? new Date().getFullYear());
  return { ...data, title, year };
}

const macanImages = [
  macan01, macan02, macan03, macan04, macan05, macan06, macan07, macan08, macan09,
  macan10, macan11, macan12, macan13, macan14, macan15, macan16, macan17, macan18,
  macan19, macan20, macan21, macan22, macan23, macan24, macan25,
].map((a) => a.url);

export const vehicles: Vehicle[] = [
  v({
    id: "AK-2025-001",
    make: "Porsche",
    model: "Macan",
    variant: "2.0 PDK",
    priceEur: 28870,
    mileageKm: 149990,
    firstRegistration: "10/2017",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 185,
    exteriorColor: "Tiefschwarz Metallic",
    condition: "Gebraucht",
    previousOwners: 3,
    images: macanImages,
    features: [
      "BOSE Soundsystem",
      "Porsche Dynamic Light System (PDLS)",
      "Bi-Xenon-Scheinwerfer",
      "Navigationssystem / PCM",
      "Rückfahrkamera",
      "Parkassistent vorne und hinten",
      "Parksensoren vorne und hinten",
      "Sitzheizung",
      "Volllederausstattung Schwarz",
      "Klimaautomatik",
      "Multifunktionslenkrad",
      "Tempomat",
      "Bluetooth",
      "USB-Anschluss",
      "Freisprecheinrichtung",
      "Apple CarPlay",
      "Android Auto",
      "Elektrische Fensterheber",
      "Elektrisch verstellbare Außenspiegel",
      "Mittelarmlehne",
      "Isofix",
      "ABS",
      "ESP",
      "Traktionskontrolle",
      "Reifendruckkontrolle",
      "Airbags",
      "Tagfahrlicht",
      "Nebelscheinwerfer",
      "20 Zoll RS Spyder Design Felgen",
      "Allradantrieb",
      "Hubraum 1.984 cm³",
      "Schadstoffklasse Euro 6",
      "Umweltplakette Grün",
      "HU/AU bis 07/2027",
      "Unfallfrei laut Inserat",
    ],
    description:
      "Sehr schöner Porsche Macan 2.0 PDK in Tiefschwarz Metallic mit schwarzer Volllederausstattung. Das Fahrzeug verfügt über eine umfangreiche Ausstattung, unter anderem BOSE Soundsystem, PDLS/Bi-Xenon, Rückfahrkamera, Navigationssystem PCM, Sitzheizung, Parkassistent vorne und hinten, Apple CarPlay/Android Auto sowie 20-Zoll RS Spyder Design Felgen.\n\nDer Macan bietet sportliches Fahrverhalten, hochwertige Verarbeitung und alltagstauglichen Komfort. Durch den Allradantrieb ist das Fahrzeug auch bei schlechter Witterung sehr souverän zu fahren.\n\nHU/AU ist gültig bis 07/2027.\n\nBesichtigung und Probefahrt nach Absprache möglich.",
    financingAvailable: true,
    status: "highlight",
  }),
];

export const featuredVehicles = (() => {
  const featured = vehicles.filter(
    (x) => x.status === "highlight" || x.status === "new-arrival",
  );
  return featured.length >= 3 ? featured.slice(0, 3) : vehicles.slice(0, 3);
})();

export function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((x) => x.id === id);
}

export function formatPrice(eur: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(eur);
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat("de-DE").format(km)} km`;
}

export function formatKw(kw: number): string {
  return `${kw} kW (${Math.round(kw * 1.359)} PS)`;
}

export type StatusTone = "champagne" | "available" | "reserved" | "sold";

export function statusMeta(status: VehicleStatus): {
  label: string;
  tone: StatusTone;
} {
  switch (status) {
    case "highlight":
      return { label: "Highlight", tone: "champagne" };
    case "new-arrival":
      return { label: "Neu eingetroffen", tone: "champagne" };
    case "reserved":
      return { label: "Reserviert", tone: "reserved" };
    case "sold":
      return { label: "Verkauft", tone: "sold" };
    case "available":
    default:
      return { label: "Verfügbar", tone: "available" };
  }
}
