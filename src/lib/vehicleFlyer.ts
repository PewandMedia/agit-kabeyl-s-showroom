import type { Vehicle } from "@/data/vehicles";
import { formatKm, formatKw, formatPrice } from "@/data/vehicles";
import { dealer } from "@/data/dealer";

async function loadImageDataUrl(src: string): Promise<string> {
  const res = await fetch(src);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

export async function downloadVehicleFlyer(v: Vehicle): Promise<void> {
  const [{ default: jsPDF }, QR] = await Promise.all([
    import("jspdf"),
    import("qrcode"),
  ]);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const M = 14;

  // — Header bar
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, W, 26, "F");
  doc.setFillColor(200, 30, 30);
  doc.rect(0, 26, W, 0.8, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("AUTOHAUS AK", M, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 200, 200);
  doc.text(`${dealer.city} · ${dealer.phoneDisplay}`, M, 21);

  doc.setTextColor(200, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("FAHRZEUG-INSERAT", W - M, 14, { align: "right" });
  doc.setTextColor(180, 180, 180);
  doc.setFont("helvetica", "normal");
  doc.text(v.id, W - M, 21, { align: "right" });

  // — Main image
  let y = 34;
  try {
    const img = await loadImageDataUrl(v.images[0]);
    doc.addImage(img, "JPEG", M, y, W - M * 2, 105, undefined, "FAST");
  } catch {
    doc.setFillColor(230, 230, 230);
    doc.rect(M, y, W - M * 2, 105, "F");
  }
  y += 110;

  // — Brand kicker
  doc.setTextColor(200, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(v.make.toUpperCase(), M, y);
  y += 6;

  // — Title
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  const titleLines = doc.splitTextToSize(v.title, W - M * 2 - 60);
  doc.text(titleLines, M, y);
  y += titleLines.length * 7;

  // — Price (top-right of title block)
  doc.setTextColor(200, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(formatPrice(v.priceEur), W - M, y - titleLines.length * 7 + 1, {
    align: "right",
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text("inkl. MwSt. ausweisbar", W - M, y - titleLines.length * 7 + 6, {
    align: "right",
  });

  y += 4;

  // — Fact strip
  const facts: [string, string][] = [
    ["Erstzulassung", v.firstRegistration],
    ["Laufleistung", formatKm(v.mileageKm)],
    ["Leistung", formatKw(v.powerKw)],
    ["Getriebe", v.transmission],
    ["Kraftstoff", v.fuel],
    ["Farbe", v.exteriorColor],
  ];
  const factW = (W - M * 2) / 3;
  const factH = 14;
  facts.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M + col * factW;
    const fy = y + row * factH;
    doc.setDrawColor(220, 220, 220);
    doc.rect(x, fy, factW, factH);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(150, 150, 150);
    doc.text(f[0].toUpperCase(), x + 3, fy + 5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(25, 25, 25);
    doc.text(f[1], x + 3, fy + 11);
  });
  y += factH * 2 + 6;

  // — Features (left col) + QR + contact (right col)
  const featuresTop = y;
  doc.setTextColor(200, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("AUSSTATTUNG", M, y);
  y += 5;
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const feats = v.features.slice(0, 8);
  feats.forEach((f) => {
    doc.setTextColor(200, 30, 30);
    doc.text("•", M, y);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(f, 95);
    doc.text(lines, M + 4, y);
    y += lines.length * 4.5 + 0.8;
  });

  // — Right column: QR + contact
  const rightX = W - M - 45;
  let ry = featuresTop;
  try {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/fahrzeuge/${v.id}`
        : `/fahrzeuge/${v.id}`;
    const qr = await QR.toDataURL(url, { margin: 0, width: 240 });
    doc.addImage(qr, "PNG", rightX, ry, 36, 36);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text("Online ansehen", rightX, ry + 40);
    ry += 46;
  } catch {
    ry += 4;
  }

  doc.setTextColor(200, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("KONTAKT", rightX, ry);
  ry += 5;
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(dealer.legalName, rightX, ry);
  ry += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(dealer.street, rightX, ry);
  ry += 4.5;
  doc.text(`${dealer.postalCode} ${dealer.city}`, rightX, ry);
  ry += 6;
  doc.setFont("helvetica", "bold");
  doc.text(dealer.phoneDisplay, rightX, ry);

  // — Footer
  doc.setDrawColor(220, 220, 220);
  doc.line(M, H - 18, W - M, H - 18);
  doc.setTextColor(140, 140, 140);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(
    "Angaben ohne Gewähr. Irrtum und Zwischenverkauf vorbehalten.",
    M,
    H - 12,
  );
  doc.text(`${dealer.legalName} · ${dealer.city}`, W - M, H - 12, {
    align: "right",
  });

  doc.save(`AK_Inserat_${v.id}.pdf`);
}
