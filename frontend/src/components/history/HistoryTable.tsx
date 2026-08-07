import type { HistoryItem } from "../../types/history";
import HistoryRow from "./HistoryRow";

interface Props {
  history: HistoryItem[];
}

export default function HistoryTable({
  history,
}: Props) {
  if (history.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-700">
          No Analysis History
        </h2>

        <p className="mt-2 text-slate-500">
          Analyze your first crop to see results here.
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

            <th className="px-5 py-4 text-left">Confidence</th>

            <th className="px-5 py-4 text-left">Date</th>

          </tr>

        </thead>

        <tbody>

          {history.map((item) => (
            <HistoryRow
              key={item.id}
              item={item}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}