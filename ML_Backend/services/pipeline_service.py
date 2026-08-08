from services.GEOLOCATION import GeoLocationService
from services.gemini_service import GeminiService
from utils.gemini_prompt import GEMINI_ANALYSIS_PROMPT
from utils.response_formatter import (
    final_response_from_gemini,
    format_quality_response,
)


class PipelineService:

    def __init__(self):
        print("\n================= PIPELINE INITIALIZED =================")

        self.geo = GeoLocationService()
        self.gemini = GeminiService()

        print("=======================================================\n")

    def run_pipeline(
        self,
        image_bytes,
        user_lat,
        user_lng,
        polygon_coords,
        mime_type="image/jpeg"
    ):

        print("\n================= PIPELINE START =================")
        print("[1] Image received. Bytes length:", len(image_bytes))
        print("[1] User Location:", user_lat, user_lng)
        print("[1] Polygon Coords:", polygon_coords)

        # =====================================================
        # STEP 1 — GEO-LOCATION CHECK
        # =====================================================

        # TEMPORARY: Keep the existing behavior.
        # Geolocation validation remains disabled for testing.
        inside = True

        if not inside:
            print("[STOP] User is OUTSIDE farm boundary\n")

            return {
                "error": "Please click the picture INSIDE your farm boundary."
            }

        print("[2] GeoLocation Check:", inside)

        # =====================================================
        # STEP 2 — GEMINI IMAGE ANALYSIS
        # =====================================================

        try:
            print("[3] Sending image to Gemini...")

            gemini_result = self.gemini.analyze_image(
                image_bytes=image_bytes,
                mime_type=mime_type,
                prompt=GEMINI_ANALYSIS_PROMPT
            )

            print("\n================ GEMINI RAW RESPONSE ================")
            print(gemini_result)
            print("======================================================\n")

            print("[3] Gemini analysis received.")

        except Exception as e:
            print("[ERROR] GeminiService failed:", e)

            return {
                "error": "Gemini analysis failed",
                "details": str(e)
            }

        # =====================================================
        # STEP 3 — IMAGE QUALITY CHECK
        # =====================================================

        try:
            image_quality = (
                gemini_result
                .get("analysis", {})
                .get("image_quality", {})
            )

            quality_label = image_quality.get(
                "quality",
                "unknown"
            )

            print("[4] Gemini Quality:", quality_label)

        except Exception as e:
            print("[ERROR] Failed to read Gemini quality:", e)

            return {
                "error": "Gemini response processing failed",
                "details": str(e)
            }

        # =====================================================
        # STEP 4 — POOR QUALITY RESPONSE
        # =====================================================

        if str(quality_label).lower() != "good":
            print("[STOP] Poor image quality:", quality_label)

            return format_quality_response(
                quality_label
            )

        # =====================================================
        # STEP 5 — FORMAT FINAL RESPONSE
        # =====================================================

        try:
            print("[5] Formatting Gemini response...")

            result = final_response_from_gemini(
                gemini_result
            )

        except Exception as e:
            print("[ERROR] Response formatting failed:", e)

            return {
                "error": "Response formatting failed",
                "details": str(e)
            }

        # =====================================================
        # STEP 6 — FINAL RESPONSE
        # =====================================================

        print("[6] Final response:", result)

        print("================= PIPELINE END =================\n")

        return result