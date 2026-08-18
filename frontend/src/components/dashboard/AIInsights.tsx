interface Analysis {
  stress_class: string;
  severity: number;
  severity_label: string;
}

interface DashboardData {
  total_analysis: number;
  healthy: number;
  diseased: number;
  avg_confidence: number;
  recent_analysis: Analysis[];
}

interface AIInsightsProps {
  dashboard: DashboardData;
}

export default function AIInsights({
  dashboard,
}: AIInsightsProps) {

  // Overall health percentage
  const healthyPercentage =
    dashboard.total_analysis > 0
      ? (dashboard.healthy / dashboard.total_analysis) * 100
      : 0;

  // Recent stress types
  const stressCounts: Record<string, number> = {};

  dashboard.recent_analysis.forEach((analysis) => {
    if (analysis.stress_class) {
      stressCounts[analysis.stress_class] =
        (stressCounts[analysis.stress_class] || 0) + 1;
    }
  });

  const sortedStress = Object.entries(stressCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const mostDetectedStress = sortedStress[0]?.[0];

  // Severity counts
  const criticalCount = dashboard.recent_analysis.filter(
    (analysis) =>
      analysis.severity_label.toLowerCase() === "critical"
  ).length;

  const severeCount = dashboard.recent_analysis.filter(
    (analysis) =>
      analysis.severity_label.toLowerCase() === "severe"
  ).length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold text-slate-800">
        AI Insights
      </h2>

      <div className="mt-6 space-y-4">

        {/* Crop Health */}

        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-700">
            Crop Health
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {healthyPercentage.toFixed(0)}% of recent analyses
            indicate healthy crops.
          </p>
        </div>

        {/* Disease / Stress Trend */}

        <div className="rounded-xl bg-yellow-50 p-4">
          <p className="text-sm font-semibold text-yellow-700">
            Crop Stress Trend
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {mostDetectedStress
              ? `${mostDetectedStress} is the most detected stress in the recent analyses.`
              : "No crop stress detected in recent analyses."}
          </p>
        </div>

        {/* AI Confidence */}

        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-700">
            AI Confidence
          </p>

          <p className="mt-1 text-sm text-slate-600">
            Average prediction confidence is{" "}
            {(dashboard.avg_confidence * 100).toFixed(0)}%.
          </p>
        </div>

        {/* Severity */}

        <div className="rounded-xl bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">
            Severity Overview
          </p>

          <p className="mt-1 text-sm text-slate-600">
            {criticalCount} critical and {severeCount} severe
            cases were detected in the recent analyses.
          </p>
        </div>

      </div>

    </div>
  );
}