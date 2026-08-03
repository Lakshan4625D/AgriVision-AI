export default function DashboardPage() {
  return (
    <div>

      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-slate-500">
            Total Analyses
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            152
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-slate-500">
            Today's Uploads
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            18
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-slate-500">
            Active Farmers
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            84
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-slate-500">
            Reports Generated
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            37
          </h2>

        </div>

      </div>

    </div>
  );
}