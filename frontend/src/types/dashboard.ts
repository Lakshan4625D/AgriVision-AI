export interface RecentAnalysis {
  id: number;
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

export interface DashboardResponse {
  total_analysis: number;
  healthy: number;
  diseased: number;
  avg_confidence: number;
  recent_analysis: RecentAnalysis[];
}