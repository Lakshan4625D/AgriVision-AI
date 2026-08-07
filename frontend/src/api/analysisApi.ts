import api from "./axios";

export interface SaveAnalysisRequest {
  user_id: number;

  image_name: string;

  crop_type: string;

  quality: string;

  stage: string;
  stage_confidence: number;

  stress_class: string;
  stress_confidence: number;

  severity: number;
  severity_label: string;

  latitude: number;
  longitude: number;
}

export async function saveAnalysis(
  data: SaveAnalysisRequest
) {
  const response = await api.post("/analysis", data);

  return response.data;
}