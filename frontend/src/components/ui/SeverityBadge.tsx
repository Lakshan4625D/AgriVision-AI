import { getSeverityStyle } from "./severityStyles";

export default function SeverityBadge({ label }: { label: string }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium capitalize ${getSeverityStyle(label).badge}`}>
      {label}
    </span>
  );
}
