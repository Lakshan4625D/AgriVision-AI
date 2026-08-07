export interface HistoryItem {
  id: number;

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

  created_at: string;
}