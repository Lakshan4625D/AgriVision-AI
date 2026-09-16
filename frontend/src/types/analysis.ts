export interface AnalysisRequest {
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

export interface AnalysisResponse extends AnalysisRequest {
  success?: boolean;
  message?: string;
  instruction?: string;
  ai_explanation?: string;
  id: number;
  created_at: string;
}