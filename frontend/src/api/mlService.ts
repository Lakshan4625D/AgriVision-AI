import mlApi from "./mlApi";

export interface PredictionResponse {
  quality: string;

  crop_type: string;

  stage: string;
  stage_confidence: number;

  stress_class: string;
  stress_confidence: number;

  severity: number;
  severity_label: string;
}

export async function predictCrop(
  image: File,
  latitude: number,
  longitude: number
): Promise<PredictionResponse> {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("user_lat", latitude.toString());
  formData.append("user_lng", longitude.toString());

  const response = await mlApi.post<PredictionResponse>(
    "/predict",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}