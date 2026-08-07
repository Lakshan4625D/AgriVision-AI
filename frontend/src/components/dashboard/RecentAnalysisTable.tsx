import type { RecentAnalysis } from "../../types/dashboard";

interface Props {
  analyses: RecentAnalysis[];
}

export default function RecentAnalysisTable({
  analyses,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b p-5">

        <h2 className="text-lg font-semibold">
          Recent Analysis
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="p-4 text-left">Crop</th>

            <th className="p-4 text-left">Disease</th>

            <th className="p-4 text-left">Severity</th>

            <th className="p-4 text-left">Confidence</th>

          </tr>

        </thead>

        <tbody>

          {analyses.map((item) => (
            <tr
              key={item.id}
              className="border-t"
            >
              <td className="p-4">
                {item.crop_type}
              </td>

              <td className="p-4">
                {item.stress_class}
              </td>

              <td className="p-4">
                {item.severity_label}
              </td>

              <td className="p-4">
                {item.stress_confidence.toFixed(2)}%
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}