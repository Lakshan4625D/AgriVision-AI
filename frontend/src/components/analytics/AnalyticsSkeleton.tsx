export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">

      <div className="grid gap-6 md:grid-cols-4">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-slate-200"
          />

        ))}

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            key={index}
            className="h-96 animate-pulse rounded-2xl bg-slate-200"
          />

        ))}

      </div>

    </div>
  );
}