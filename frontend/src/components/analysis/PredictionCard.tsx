import Card from "../ui/Card";
import type { PredictionResult } from "../../types/prediction";

interface Props {
  result: PredictionResult;
}

export default function PredictionCard({ result }: Props) {
  return (
    <Card className="mt-6">
      <h2 className="mb-5 text-xl font-bold">
        Analysis Result
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <p className="text-sm text-slate-500">
            Crop
          </p>

          <p className="font-semibold">
            {result.crop_type}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Quality
          </p>

          <p className="font-semibold">
            {result.quality}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Stage
          </p>

          <p className="font-semibold">
            {result.stage}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Stage Confidence
          </p>

          <p className="font-semibold">
            {result.stage_confidence.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Disease
          </p>

          <p className="font-semibold">
            {result.stress_class}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Disease Confidence
          </p>

          <p className="font-semibold">
            {result.stress_confidence.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Severity
          </p>

          <p className="font-semibold">
            {result.severity_label}
          </p>
        </div>

      </div>
    </Card>
  );
}