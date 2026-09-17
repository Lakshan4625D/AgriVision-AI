const severityStyles: Record<string, { badge: string; color: string }> = {
  healthy: { badge: "bg-green-100 text-green-800", color: "#16a34a" },
  "very mild": { badge: "bg-lime-100 text-lime-800", color: "#65a30d" },
  mild: { badge: "bg-yellow-100 text-yellow-800", color: "#eab308" },
  moderate: { badge: "bg-amber-100 text-amber-800", color: "#f59e0b" },
  severe: { badge: "bg-orange-100 text-orange-800", color: "#ea580c" },
  critical: { badge: "bg-red-100 text-red-800", color: "#dc2626" },
  unknown: { badge: "bg-slate-100 text-slate-700", color: "#64748b" },
};

export function getSeverityStyle(label: string) {
  return severityStyles[label.trim().toLowerCase()] ?? severityStyles.unknown;
}

