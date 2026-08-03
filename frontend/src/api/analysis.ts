import mlApi from "./mlApi";
import type { AnalysisResponse } from "../types/analysis";

export async function analyzeCrop(
  file: File,
  latitude: number,
  longitude: number
): Promise<AnalysisResponse> {
  const formData = new FormData();

  formData.append("file", file);

  formData.append("user_lat", latitude.toString());

  formData.append("user_lng", longitude.toString());

  const response = await mlApi.post(
    "/api/predict",
    formData,
    {
        headers:{
            "Content-Type":"multipart/form-data",
        },
    }
);

  return response.data;
}