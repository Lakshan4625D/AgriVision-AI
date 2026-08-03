export interface AnalysisResponse {
  quality: string;

  crop_type: string;

  stage: string;

  stage_confidence: number;

  stress_class: string;

  stress_confidence: number;

  severity: number;

  severity_label: string;

  success?: boolean;

  message?: string;

  instruction?: string;
}