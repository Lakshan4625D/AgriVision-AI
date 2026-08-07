export default function ReportsSkeleton() {

  return (

    <div className="space-y-4">

      {Array.from({ length: 6 }).map((_, i) => (

        <div
          key={i}
          className="h-16 animate-pulse rounded-xl bg-slate-200"
        />

      ))}

    </div>

  );

}