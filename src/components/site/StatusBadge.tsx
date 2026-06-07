import type { VehicleStatus } from "@/data/vehicles";
import { statusMeta } from "@/data/vehicles";

export function StatusBadge({
  status,
  className = "",
}: {
  status: VehicleStatus;
  className?: string;
}) {
  const { label, tone } = statusMeta(status);
  const styles: Record<string, string> = {
    champagne: "bg-champagne text-foreground",
    available: "bg-surface-2 text-ink border border-champagne/40",
    reserved: "bg-surface text-ink border border-line",
    sold: "bg-champagne text-foreground",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-tight ${styles[tone]} ${className}`}
    >
      {label}
    </span>
  );
}
