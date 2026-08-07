import type { RecentAnalysis } from "../../types/dashboard";

interface Props {
  analyses: RecentAnalysis[];
}

export default function RecentAnalysisTable({
  analyses,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Recent Analysis
        </h2>

        <span className="text-sm text-slate-500">
          {analyses.length} Result(s)
        </span>
      </div>

      {analyses.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No analyses found.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50 text-sm">

              <tr>

                <th className="px-6 py-4 text-left">
                  Crop
                </th>

                <th className="px-6 py-4 text-left">
                  Stage
                </th>

                <th className="px-6 py-4 text-left">
                  Disease
                </th>

                <th className="px-6 py-4 text-left">
                  Severity
                </th>

                <th className="px-6 py-4 text-left">
                  Confidence
                </th>

              </tr>

            </thead>

            <tbody>

              {analyses.map((analysis) => (

                <tr
                  key={analysis.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {analysis.crop_type}
                  </td>

                  <td className="px-6 py-4">
                    {analysis.stage}
                  </td>

                  <td className="px-6 py-4">
                    {analysis.stress_class}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium
                      ${
                        analysis.severity_label === "Low"
                          ? "bg-green-100 text-green-700"
                          : analysis.severity_label === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {analysis.severity_label}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    {analysis.stress_confidence.toFixed(2)}%

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}