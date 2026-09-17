import importlib.util
from pathlib import Path
import unittest

from tests.test_admin import AdminTests
from app.models.analysis import Analysis
from app.services.dashboard_service import get_dashboard
from app.services.severity import severity_label_for_score


class SeverityTests(unittest.TestCase):
    def test_bands_match_ml_service(self):
        path = Path(__file__).resolve().parents[2] / "ML_Backend/utils/severity.py"
        spec = importlib.util.spec_from_file_location("ml_severity", path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        cases = [(0, "healthy"), (.01, "healthy"), (.03, "healthy"),
                 (.10, "healthy"), (.101, "very mild"), (.30, "very mild"),
                 (.301, "mild"), (.50, "mild"), (.501, "moderate"),
                 (.70, "moderate"), (.701, "severe"), (.85, "severe"),
                 (.851, "critical"), (1, "critical")]
        for classify in (severity_label_for_score, module.severity_label_for_score):
            for score, expected in cases:
                with self.subTest(score=score):
                    self.assertEqual(classify(score, "mild"), expected)
            self.assertEqual(classify(0, "Unknown"), "unknown")
            self.assertEqual(classify(40, "mild"), "unknown")


class DashboardSeverityTests(AdminTests):
    def test_healthy_diagnoses_with_legacy_mild_labels(self):
        for score in (.01, .02, .03):
            self.db.add(Analysis(user_id=2, stress_class="Healthy", severity=score, severity_label="mild"))
        self.db.add(Analysis(user_id=1, stress_class="Healthy", severity=.01, severity_label="mild"))
        self.db.commit()
        result = get_dashboard(self.db, 2)
        self.assertEqual(result["healthy"], 3)
        self.assertEqual(result["diseased"], 1)

    def test_save_normalizes_low_severity(self):
        data = dict(user_id=2, image_name="healthy.jpg", crop_type="Paddy",
                    quality="good", stage="maturity", stage_confidence=.9,
                    stress_class="Healthy", stress_confidence=.95, severity=.01,
                    severity_label="mild", latitude=11, longitude=77)
        result = self.client.post("/analysis", headers=self.headers(2), json=data)
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.json()["severity_label"], "healthy")
        self.assertEqual(self.db.get(Analysis, result.json()["id"]).severity_label, "healthy")
