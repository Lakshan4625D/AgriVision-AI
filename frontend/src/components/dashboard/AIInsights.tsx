export default function AIInsights() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold text-slate-800">
        AI Insights
      </h2>

      <div className="mt-6 space-y-4">

        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-700">
            Crop Health
          </p>

          <p className="mt-1 text-sm text-slate-600">
            78% of recent analyses indicate healthy crops.
          </p>
        </div>

        <div className="rounded-xl bg-yellow-50 p-4">
          <p className="text-sm font-semibold text-yellow-700">
            Disease Trend
          </p>

          <p className="mt-1 text-sm text-slate-600">
            Leaf Rust is the most detected disease this week.
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-700">
            AI Confidence
          </p>

          <p className="mt-1 text-sm text-slate-600">
            Average prediction confidence is above 95%.
          </p>
        </div>

      </div>

    </div>
  );
}