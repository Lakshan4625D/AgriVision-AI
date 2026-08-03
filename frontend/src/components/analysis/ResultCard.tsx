interface Props {
  title: string;
  value: string | number;
}

export default function ResultCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-blue-700">
        {value}
      </h2>

    </div>
  );
}