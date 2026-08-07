import type { Report } from "../../types/reports";

import Button from "../ui/Button";

interface Props {
  report: Report;
}

export default function ReportRow({
  report,
}: Props) {
  return (
    <tr className="border-t hover:bg-slate-50">

      <td className="px-5 py-4">
        {report.crop_type}
      </td>

      <td className="px-5 py-4">
        {report.stage}
      </td>

      <td className="px-5 py-4">
        {report.stress_class}
      </td>

      <td className="px-5 py-4">

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium
          ${
            report.severity_label.toLowerCase() === "low"
              ? "bg-green-100 text-green-700"
              : report.severity_label.toLowerCase() === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {report.severity_label}
        </span>

      </td>

      <td className="px-5 py-4">
        {new Date(report.created_at).toLocaleDateString()}
      </td>

      <td className="px-5 py-4">

        <Button
          className="w-auto px-4 py-2 text-sm"
          onClick={() => alert("PDF generation coming next")}
        >
          Download
        </Button>

      </td>

    </tr>
  );
}