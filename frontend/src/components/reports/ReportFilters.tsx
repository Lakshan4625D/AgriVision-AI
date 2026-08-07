import Input from "../ui/Input";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function ReportFilters({
  search,
  setSearch,
}: Props) {

  return (

    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <Input
        placeholder="Search reports..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

  );

}