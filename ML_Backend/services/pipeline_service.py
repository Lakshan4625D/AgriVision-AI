from services.quality_service import QualityService
from services.crop_stage_service import CropStageService
from services.disease_service import DiseaseService
from services.GEOLOCATION import GeoLocationService
from services.severity import SeverityService

from utils.preprocessing import load_and_preprocess

from utils.response_formatter import (
    final_response,
    format_quality_response
)


class PipelineService:

    def __init__(self):

        print(
            "\n========== PIPELINE INITIALIZED =========="
        )

        self.geo = GeoLocationService()

        self.quality = QualityService()

        self.stage = CropStageService()

        self.disease = DiseaseService()

        self.severity = SeverityService()

        print(
            "==========================================\n"
        )

    def run_pipeline(
        self,
        image_bytes,
        user_lat,
        user_lng,
        polygon_coords
    ):

        print(
            "\n========== PIPELINE START =========="
        )

        print(
            "[1] Image bytes:",
            len(image_bytes)
        )

        print(
            "[1] Location:",
            user_lat,
            user_lng
        )

        # ------------------------------------------------
        # GEOLOCATION
        # ------------------------------------------------

        # Keep disabled for development,
        # matching your current backend behaviour.
        inside = True

        if not inside:

            return {
                "error":
                    "Please click the picture "
                    "inside your farm boundary."
            }

        # ------------------------------------------------
        # QUALITY
        # ------------------------------------------------

        try:

            quality_label = (
                self.quality.predict(
                    image_bytes
                )
            )

            print(
                "[2] Quality:",
                quality_label
            )

        except Exception as e:

            return {
                "error":
                    "Quality model failed",

                "details":
                    str(e)
            }

        if quality_label != "good":

            return format_quality_response(
                quality_label
            )

        # ------------------------------------------------
        # RAW IMAGE
        # ------------------------------------------------

        try:

            (
                _,
                _,
                raw_img
            ) = load_and_preprocess(
                image_bytes,
                return_raw=True,
                normalize=False
            )

        except Exception as e:

            return {
                "error":
                    "Image preprocessing failed",

                "details":
                    str(e)
            }

        # ------------------------------------------------
        # CROP STAGE
        # ------------------------------------------------

        try:

            (
                stage_label,
                stage_conf
            ) = self.stage.predict(
                image_bytes
            )

            print(
                "[3] Stage:",
                stage_label,
                stage_conf
            )

        except Exception as e:

            return {
                "error":
                    "Stage prediction failed",

                "details":
                    str(e)
            }

        # ------------------------------------------------
        # CROP + DISEASE MODEL
        # ------------------------------------------------

        try:

            prediction = (
                self.disease.predict(
                    image_bytes
                )
            )

            crop_type = (
                prediction[
                    "crop_type"
                ]
            )

            stress_label = (
                prediction[
                    "stress_class"
                ]
            )

            stress_conf = (
                prediction[
                    "stress_confidence"
                ]
            )

            print(
                "[4] Crop:",
                crop_type
            )

            print(
                "[4] Stress:",
                stress_label,
                stress_conf
            )

        except Exception as e:

            return {
                "error":
                    "Crop/disease prediction failed",

                "details":
                    str(e)
            }

        # ------------------------------------------------
        # SEVERITY
        # ------------------------------------------------

        try:

            (
                severity_score,
                severity_label
            ) = self.severity.compute(
                raw_img,
                stress_label
            )

            print(
                "[5] Severity:",
                severity_score,
                severity_label
            )

        except Exception as e:

            return {
                "error":
                    "Severity calculation failed",

                "details":
                    str(e)
            }

        print(
            "========== PIPELINE END ==========\n"
        )

        return final_response(

            quality="good",

            crop_type=crop_type,

            stage=stage_label,

            stage_confidence=float(stress_conf)*100,

            stress_class=stress_label,

            stress_confidence=float(stress_conf)*100,

            severity=severity_score,

            severity_label=severity_label
        )