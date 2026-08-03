import { useState } from "react";

import Button from "../../components/ui/Button";

import ImageUploader from "../../components/analysis/ImageUploader";
import LocationForm from "../../components/analysis/LocationForm";
import ResultsGrid from "../../components/analysis/ResultsGrid";

import { analyzeCrop } from "../../api/analysis";
import { useAnalysisStore } from "../../store/analysisStore";

export default function CropAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const {
    result,
    loading,
    setLoading,
    setResult,
  } = useAnalysisStore();

  const handleAnalysis = async () => {
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    if (!latitude || !longitude) {
      alert("Please enter coordinates.");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeCrop(
        file,
        Number(latitude),
        Number(longitude)
      );

      setResult(response);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Crop Analysis
        </h1>

        <p className="mt-2 text-slate-500">
          Upload a crop image and analyze it using the AgriVision AI
          ML service.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <ImageUploader
          file={file}
          setFile={setFile}
        />

        <LocationForm
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />

      </div>

      <Button
        onClick={handleAnalysis}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Crop"}
      </Button>

      {loading && (
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <h2 className="mt-6 text-xl font-semibold">
            AI Analysis in Progress
          </h2>

          <p className="mt-2 text-slate-500">
            Running image quality, crop stage, disease and severity
            models...
          </p>

        </div>
      )}

      {result && !loading && (
        <ResultsGrid result={result} />
      )}

    </div>
  );
}