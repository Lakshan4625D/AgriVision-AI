"""Severity bands used by the Gemini prompt (scores are fractions, not percentages)."""
import math


def severity_label_for_score(score, label):
    # Unknown means unassessed: its placeholder zero must not imply healthy.
    if str(label).strip().lower() == "unknown":
        return "unknown"
    if score is None or not math.isfinite(float(score)) or not 0 <= float(score) <= 1:
        return "unknown"
    score = round(float(score), 3)
    for upper, name in ((0.10, "healthy"), (0.30, "very mild"),
                        (0.50, "mild"), (0.70, "moderate"),
                        (0.85, "severe"), (1.0, "critical")):
        if score <= upper:
            return name
