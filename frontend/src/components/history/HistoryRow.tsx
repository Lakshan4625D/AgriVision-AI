import SeverityBadge from "../ui/SeverityBadge";
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

        <SeverityBadge label={item.severity_label} />

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