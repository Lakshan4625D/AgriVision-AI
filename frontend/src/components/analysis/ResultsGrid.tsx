import type { AnalysisResponse } from "../../types/analysis";

import ResultCard from "./ResultCard";

interface Props {
  result: AnalysisResponse;
}

export default function ResultsGrid({
  result,
}: Props) {
  if (result.success === false) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">

        <h2 className="text-xl font-semibold text-red-700">
          {result.message}
        </h2>

        <p className="mt-3 text-red-600">
          {result.instruction}
        </p>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      <ResultCard
        title="Image Quality"
        value={result.quality}
      />

      <ResultCard
        title="Crop Type"
        value={result.crop_type}
      />

      <ResultCard
        title="Crop Stage"
        value={result.stage}
      />

      <ResultCard
        title="Stage Confidence"
        value={`${result.stage_confidence}%`}
      />

      <ResultCard
        title="Disease"
        value={result.stress_class}
      />

      <ResultCard
        title="Disease Confidence"
        value={`${result.stress_confidence}%`}
      />

      <ResultCard
        title="Severity"
        value={result.severity}
      />

      <ResultCard
        title="Severity Level"
        value={result.severity_label}
      />

    </div>
  );
}