import Input from "../ui/Input";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  severity: string;
  setSeverity: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export default function HistoryFilters({
  search,
  setSearch,
  severity,
  setSeverity,
  sort,
  setSort,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="grid gap-4 md:grid-cols-3">

        <Input
          placeholder="Search crop or disease..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">All Severity</option>
          <option value="healthy">Healthy</option>
          <option value="very mild">Very Mild</option>
          <option value="mild">Mild</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
          <option value="critical">Critical</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

      </div>

    </div>
  );
}