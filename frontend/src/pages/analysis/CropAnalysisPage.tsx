import { useState } from "react";

import Button from "../../components/ui/Button";

import ImageUploader from "../../components/analysis/ImageUploader";
import LocationForm from "../../components/analysis/LocationForm";
import ResultsGrid from "../../components/analysis/ResultsGrid";

import { analyzeCrop } from "../../api/analysis";
import { saveAnalysis } from "../../api/analysisApi";

import { useAnalysisStore } from "../../store/analysisStore";
import { useAuthStore } from "../../store/authStore";

export default function CropAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const user = useAuthStore((state) => state.user);

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

    if (!user) {
      alert("Please login again.");
      return;
    }

    try {

      setLoading(true);

      //---------------------------------------
      // 1. Call ML Backend
      //---------------------------------------

      const prediction = await analyzeCrop(
        file,
        Number(latitude),
        Number(longitude)
      );

      //---------------------------------------
      // 2. Show Result Immediately
      //---------------------------------------

      setResult(prediction);

      //---------------------------------------
      // 3. Save to App Backend
      //---------------------------------------

      await saveAnalysis({

        user_id: user.id,

        image_name: file.name,

        crop_type: prediction.crop_type,

        quality: prediction.quality,

        stage: prediction.stage,

        stage_confidence:
          prediction.stage_confidence,

        stress_class:
          prediction.stress_class,

        stress_confidence:
          prediction.stress_confidence,

        severity:
          prediction.severity,

        severity_label:
          prediction.severity_label,

        latitude: Number(latitude),

        longitude: Number(longitude),

      });

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
          Upload a crop image and analyze it using
          AgriVision AI.
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
        {loading
          ? "Analyzing..."
          : "Analyze Crop"}
      </Button>

      {loading && (

        <div className="rounded-2xl border bg-white p-10 shadow-sm text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"/>

          <h2 className="mt-6 text-xl font-semibold">
            AI Analysis Running...
          </h2>

          <p className="mt-2 text-slate-500">
            Checking image quality,
            crop stage,
            disease,
            and severity...
          </p>

        </div>

      )}

      {result && !loading && (
        <ResultsGrid result={result}/>
      )}

    </div>
  );
}