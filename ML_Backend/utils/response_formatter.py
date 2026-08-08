def format_quality_response(quality_label: str):
    """
    Returned when Gemini determines that the image
    is not suitable for analysis.
    """

    return {
        "success": False,
        "message": "Poor image quality",
        "quality": str(quality_label).lower(),
        "instruction": "Please retake the image clearly inside your farmland."
    }


def final_response_from_gemini(gemini_result: dict):
    """
    Convert Gemini's detailed analysis response into
    the existing AgriVision AI frontend response structure.
    """

    analysis = gemini_result.get("analysis", {})

    image_quality = analysis.get("image_quality", {})
    crop = analysis.get("crop", {})
    crop_stage = analysis.get("crop_stage", {})
    health_status = analysis.get("health_status", {})
    disease = analysis.get("disease", {})

    # -----------------------------------------------------
    # Existing response fields
    # -----------------------------------------------------

    quality = str(
        image_quality.get("quality", "unknown")
    ).lower()

    crop_type = crop.get(
        "name",
        "Unknown"
    )

    stage = str(
        crop_stage.get("stage", "unknown")
    ).lower()

    stage_confidence = crop_stage.get(
        "confidence",
        0.0
    )

    stress_class = disease.get(
        "name",
        "Unknown"
    )

    stress_confidence = disease.get(
        "confidence",
        0.0
    )

    severity = health_status.get(
        "severity_score",
        0.0
    )

    severity_label = str(
        health_status.get("severity", "unknown")
    ).lower()

    # -----------------------------------------------------
    # Existing frontend response
    # -----------------------------------------------------

    return {
        "quality": quality,
        "crop_type": crop_type,
        "stage": stage,
        "stage_confidence": round(
            float(stage_confidence),
            2
        ),
        "stress_class": stress_class,
        "stress_confidence": round(
            float(stress_confidence),
            2
        ),
        "severity": round(
            float(severity),
            3
        ),
        "severity_label": severity_label
    }