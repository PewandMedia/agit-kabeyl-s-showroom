import heroCar from "@/assets/hero-car.jpg";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";

export type Vehicle = {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  mileageKm: number;
  priceEur: number;
  fuel: "Benzin" | "Diesel" | "Hybrid" | "Elektro";
  transmission: "Automatik" | "Schaltgetriebe";
  powerKw: number;
  firstRegistration: string;
  exteriorColor: string;
  features: string[];
  description: string;
  image: string;
  status: "active" | "reserved" | "sold";
};

export const vehicles: Vehicle[] = [
  {
    id: "ak-001",
    title: "Mercedes-Benz S 500 Lang",
    make: "Mercedes-Benz",
    model: "S 500 4MATIC L",
    year: 2022,
    mileageKm: 42500,
    priceEur: 84900,
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 320,
    firstRegistration: "03/2022",
    exteriorColor: "Obsidianschwarz Metallic",
    features: [
      "Burmester 3D-Soundsystem",
      "Panorama-Schiebedach",
      "Head-up Display",
      "Sitzklimatisierung",
      "Massagefunktion",
      "Standheizung",
      "360°-Kamera",
      "Distronic Plus",
    ],
    description:
      "Repräsentative S-Klasse in makellosem Zustand. Scheckheftgepflegt, lückenlose Historie, frisch durch die Werkstatt. Erstbesitz, Nichtraucherfahrzeug.",
    image: "/src/assets/hero-car.jpg",
    status: "active",
  },
  {
    id: "ak-002",
    title: "BMW M4 Competition Coupé",
    make: "BMW",
    model: "M4 Competition",
    year: 2021,
    mileageKm: 38900,
    priceEur: 76500,
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 375,
    firstRegistration: "06/2021",
    exteriorColor: "Brooklyn Grey Metallic",
    features: [
      "Harman Kardon",
      "Carbon-Dach",
      "M Sportabgasanlage",
      "Adaptives M-Fahrwerk",
      "Laserlicht",
      "Head-up Display",
    ],
    description:
      "M4 Competition mit voller Ausstattung. Garagenfahrzeug, gepflegt, scheckheftgeführt. Sofort verfügbar.",
    image: car1,
    status: "active",
  },
  {
    id: "ak-003",
    title: "Porsche 911 Carrera",
    make: "Porsche",
    model: "911 Carrera",
    year: 2020,
    mileageKm: 28400,
    priceEur: 109800,
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 283,
    firstRegistration: "09/2020",
    exteriorColor: "Gentianblau Metallic",
    features: [
      "Sport Chrono Paket",
      "BOSE Surround",
      "Schiebedach",
      "Sportabgasanlage",
      "LED-Matrix",
      "PASM",
    ],
    description:
      "Hochwertiger 911 Carrera in seltener Konfiguration. Erstbesitz, unfallfrei, alle Inspektionen lückenlos dokumentiert.",
    image: car2,
    status: "active",
  },
  {
    id: "ak-004",
    title: "Audi RS5 Sportback",
    make: "Audi",
    model: "RS5 Sportback",
    year: 2023,
    mileageKm: 18200,
    priceEur: 92400,
    fuel: "Benzin",
    transmission: "Automatik",
    powerKw: 331,
    firstRegistration: "01/2023",
    exteriorColor: "Nardograu",
    features: [
      "B&O Premium Sound",
      "RS-Designpaket",
      "Matrix-LED",
      "Panoramadach",
      "Keramikbremsen",
      "Quattro Sportdifferenzial",
    ],
    description:
      "RS5 in dezenter Konfiguration, frische Inspektion, alle Service-Leistungen bei Audi durchgeführt.",
    image: car3,
    status: "active",
  },
  {
    id: "ak-005",
    title: "Mercedes-Benz G 400 d",
    make: "Mercedes-Benz",
    model: "G 400 d",
    year: 2022,
    mileageKm: 31000,
    priceEur: 134900,
    fuel: "Diesel",
    transmission: "Automatik",
    powerKw: 243,
    firstRegistration: "04/2022",
    exteriorColor: "Polarweiß",
    features: [
      "AMG Line",
      "Burmester",
      "Standheizung",
      "Distronic",
      "AHK",
      "Schiebedach",
    ],
    description:
      "G-Klasse in zeitloser Konfiguration. Lückenlos scheckheftgepflegt, Nichtraucherfahrzeug, sofort verfügbar.",
    image: car4,
    status: "active",
  },
];

export const featuredVehicles = vehicles.slice(0, 3);

export function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
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
