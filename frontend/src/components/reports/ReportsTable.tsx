import type { Report } from "../../types/reports";

import ReportRow from "./ReportRow";

interface Props {
  reports: Report[];
}

export default function ReportsTable({
  reports,
}: Props) {

  if (reports.length === 0) {

    return (

      <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

        <h2 className="text-xl font-semibold">

          No Reports

        </h2>

        <p className="mt-2 text-slate-500">

          Reports will appear after crop analyses.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-5 py-4 text-left">Crop</th>

            <th className="px-5 py-4 text-left">Stage</th>

            <th className="px-5 py-4 text-left">Disease</th>

            <th className="px-5 py-4 text-left">Severity</th>

            <th className="px-5 py-4 text-left">Date</th>

            <th className="px-5 py-4 text-left">Report</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report) => (

            <ReportRow
              key={report.id}
              report={report}
            />

          ))}

        </tbody>

      </table>

    </div>

  );

}