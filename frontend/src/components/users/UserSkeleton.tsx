export default function UserSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>

      <div className="h-24 animate-pulse rounded-2xl bg-slate-200" />

      <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200" />
    </div>
  );
}