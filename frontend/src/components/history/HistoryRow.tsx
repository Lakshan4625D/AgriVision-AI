import type { HistoryItem } from "../../types/history";

interface Props {
  item: HistoryItem;
}

export default function HistoryRow({
  item,
}: Props) {

  return (

    <tr className="border-t hover:bg-slate-50">

      <td className="px-5 py-4">
        {item.crop_type}
      </td>

      <td className="px-5 py-4">
        {item.stage}
      </td>

      <td className="px-5 py-4">
        {item.stress_class}
      </td>

      <td className="px-5 py-4">

        <span
          className={`rounded-full px-3 py-1 text-sm

          ${
            item.severity_label.toLowerCase() === "low"
              ? "bg-green-100 text-green-700"
              : item.severity_label.toLowerCase() === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.severity_label}
        </span>

      </td>

      <td className="px-5 py-4">
        {item.stress_confidence.toFixed(2)}%
      </td>

      <td className="px-5 py-4">
        {new Date(item.created_at).toLocaleString()}
      </td>

    </tr>

  );
}