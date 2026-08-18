export default function Notifications() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Notifications
      </h2>

      <div className="mt-6 space-y-4">

        <div className="rounded-lg bg-slate-50 p-4">
          New crop analysis completed successfully.
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          Dashboard statistics updated.
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          AI models are running normally.
        </div>

      </div>

    </div>
  );
}