import SeverityBadge from "../ui/SeverityBadge";
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

        <SeverityBadge label={report.severity_label} />

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