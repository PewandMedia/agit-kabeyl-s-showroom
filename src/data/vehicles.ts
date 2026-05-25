import heroCar from "@/assets/hero-car.jpg";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";

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

export const vehicles: Vehicle[] = [
  v({
    id: "AK-2024-001",
    make: "Mercedes-Benz",
    model: "S 500",
    variant: "4MATIC L AMG-Line",
    priceEur: 84900,
    mileageKm: 42500,
    firstRegistration: "03/2022",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 320,
    exteriorColor: "Obsidianschwarz Metallic",
    condition: "Gebraucht",
    previousOwners: 1,
    images: [heroCar, car1, car2, car3],
    features: [
      "Burmester 3D-Soundsystem",
      "Panorama-Schiebedach",
      "Head-up Display",
      "Sitzklimatisierung",
      "Massagefunktion",
      "Standheizung",
      "360°-Kamera",
      "Distronic Plus",
      "MBUX Hyperscreen",
      "Nappa-Leder Exklusiv",
    ],
    description:
      "Repräsentative S-Klasse Lang in makellosem Zustand. Scheckheftgepflegt, lückenlose Historie, Erstbesitz, Nichtraucherfahrzeug. Frisch durch unsere Werkstatt geprüft.",
    financingAvailable: true,
    monthlyRateEur: 989,
    status: "highlight",
  }),
  v({
    id: "AK-2024-002",
    make: "BMW",
    model: "M4",
    variant: "Competition Coupé",
    priceEur: 76500,
    mileageKm: 38900,
    firstRegistration: "06/2021",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 375,
    exteriorColor: "Brooklyn Grey Metallic",
    condition: "Gebraucht",
    previousOwners: 1,
    images: [car1, car2, car3, car4],
    features: [
      "Harman Kardon Surround",
      "Carbon-Dach",
      "M Sportabgasanlage",
      "Adaptives M-Fahrwerk",
      "Laserlicht",
      "Head-up Display",
      "M Driver's Package",
    ],
    description:
      "M4 Competition mit voller Ausstattung. Garagenfahrzeug, scheckheftgeführt. Sofort verfügbar.",
    financingAvailable: true,
    monthlyRateEur: 879,
    status: "available",
  }),
  v({
    id: "AK-2024-003",
    make: "Porsche",
    model: "911",
    variant: "Carrera",
    priceEur: 109800,
    mileageKm: 28400,
    firstRegistration: "09/2020",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 283,
    exteriorColor: "Gentianblau Metallic",
    condition: "Gebraucht",
    previousOwners: 1,
    images: [car2, heroCar, car1, car4],
    features: [
      "Sport Chrono Paket",
      "BOSE Surround",
      "Schiebedach",
      "Sportabgasanlage",
      "LED-Matrix",
      "PASM",
      "Sportsitze Plus",
    ],
    description:
      "Hochwertiger 911 Carrera in seltener Konfiguration. Erstbesitz, unfallfrei, alle Inspektionen lückenlos dokumentiert.",
    financingAvailable: true,
    monthlyRateEur: 1249,
    status: "highlight",
  }),
  v({
    id: "AK-2024-004",
    make: "Audi",
    model: "RS5",
    variant: "Sportback quattro",
    priceEur: 92400,
    mileageKm: 18200,
    firstRegistration: "01/2023",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 331,
    exteriorColor: "Nardograu",
    condition: "Jahreswagen",
    previousOwners: 1,
    images: [car3, car1, car2, heroCar],
    features: [
      "B&O Premium Sound",
      "RS-Designpaket",
      "Matrix-LED",
      "Panoramadach",
      "Keramikbremsen",
      "Quattro Sportdifferenzial",
    ],
    description:
      "RS5 Sportback in dezenter Konfiguration, frische Inspektion, alle Service-Leistungen bei Audi durchgeführt.",
    financingAvailable: true,
    monthlyRateEur: 1059,
    status: "new-arrival",
  }),
  v({
    id: "AK-2024-005",
    make: "Mercedes-Benz",
    model: "G 400 d",
    variant: "AMG-Line",
    priceEur: 134900,
    mileageKm: 31000,
    firstRegistration: "04/2022",
    fuel: "Diesel",
    transmission: "Automatik",
    powerKw: 243,
    exteriorColor: "Polarweiß",
    condition: "Gebraucht",
    previousOwners: 1,
    images: [car4, heroCar, car2, car3],
    features: [
      "AMG Line",
      "Burmester",
      "Standheizung",
      "Distronic",
      "AHK 3,5 t",
      "Schiebedach",
      "Widescreen Cockpit",
    ],
    description:
      "G-Klasse in zeitloser Konfiguration. Lückenlos scheckheftgepflegt, Nichtraucherfahrzeug, sofort verfügbar.",
    financingAvailable: true,
    monthlyRateEur: 1499,
    status: "available",
  }),
  v({
    id: "AK-2024-006",
    make: "Porsche",
    model: "Cayenne",
    variant: "E-Hybrid Coupé",
    priceEur: 98500,
    mileageKm: 24800,
    firstRegistration: "11/2022",
    fuel: "Hybrid",
    transmission: "Automatik",
    powerKw: 340,
    exteriorColor: "Karbongraumetallic",
    condition: "Gebraucht",
    previousOwners: 1,
    images: [car2, car4, car1, heroCar],
    features: [
      "Sport Chrono",
      "Panoramadach",
      "Luftfederung",
      "BOSE Sound",
      "Head-up Display",
      "Sportabgasanlage",
    ],
    description:
      "Cayenne E-Hybrid Coupé — Premium-SUV mit elektrischer Reichweite. Wartung Porsche-Zentrum, top gepflegt.",
    financingAvailable: true,
    monthlyRateEur: 1129,
    status: "available",
  }),
  v({
    id: "AK-2024-007",
    make: "BMW",
    model: "M3",
    variant: "Competition xDrive Touring",
    priceEur: 104900,
    mileageKm: 12400,
    firstRegistration: "05/2023",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 375,
    exteriorColor: "Isle of Man Green Metallic",
    condition: "Jahreswagen",
    previousOwners: 1,
    images: [car1, car3, heroCar, car2],
    features: [
      "M Carbon-Sitze",
      "Harman Kardon",
      "M Driver's Package",
      "Schiebedach",
      "Laserlicht",
      "M Sport Bremse",
    ],
    description:
      "Der erste M3 Touring der Geschichte — extrem rar, sofort verfügbar, voll ausgestattet.",
    financingAvailable: true,
    monthlyRateEur: 1199,
    status: "new-arrival",
  }),
  v({
    id: "AK-2024-008",
    make: "Audi",
    model: "RS Q8",
    variant: "TFSI quattro",
    priceEur: 129800,
    mileageKm: 22100,
    firstRegistration: "08/2022",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 441,
    exteriorColor: "Daytonagrau Perleffekt",
    condition: "Gebraucht",
    previousOwners: 1,
    images: [car3, car4, car1, heroCar],
    features: [
      "Keramikbremsen",
      "B&O Advanced",
      "Allradlenkung",
      "Panoramadach",
      "RS-Designpaket Plus",
      "Matrix-LED",
    ],
    description:
      "RS Q8 mit Vollausstattung. Reserviert für Probefahrt am Wochenende — kurzfristig wieder verfügbar.",
    financingAvailable: true,
    monthlyRateEur: 1459,
    status: "reserved",
  }),
  v({
    id: "AK-2024-009",
    make: "Land Rover",
    model: "Range Rover Sport",
    variant: "P530 First Edition",
    priceEur: 142500,
    mileageKm: 15600,
    firstRegistration: "02/2023",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 390,
    exteriorColor: "Belgravia Green",
    condition: "Jahreswagen",
    previousOwners: 1,
    images: [car4, car2, heroCar, car1],
    features: [
      "Meridian Signature Sound",
      "Panoramadach",
      "Massagesitze",
      "Hinterachslenkung",
      "Head-up Display",
      "22-Zoll Felgen",
    ],
    description:
      "Range Rover Sport P530 First Edition — Top-Konfiguration, wie neu, scheckheftgepflegt.",
    financingAvailable: true,
    monthlyRateEur: 1599,
    status: "highlight",
  }),
  v({
    id: "AK-2024-010",
    make: "Mercedes-Benz",
    model: "AMG GT",
    variant: "63 S 4MATIC+",
    priceEur: 119900,
    mileageKm: 34800,
    firstRegistration: "10/2021",
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 470,
    exteriorColor: "AMG Selenitgrau Magno",
    condition: "Gebraucht",
    previousOwners: 1,
    images: [heroCar, car3, car4, car1],
    features: [
      "AMG Performance Sitze",
      "Burmester High-End",
      "Carbon Interieur",
      "Performance Abgas",
      "Keramikbremsen",
      "Distronic",
    ],
    description:
      "AMG GT 63 S — Performance der Spitzenklasse. Kürzlich verkauft, Foto-Referenz für ähnliche Anfragen.",
    financingAvailable: true,
    status: "sold",
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
