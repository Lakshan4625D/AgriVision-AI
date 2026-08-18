import cv2
import numpy as np


class SeverityService:

    def __init__(self):

        print(
            "SeverityService loaded "
            "(generic crop-disease heuristic)."
        )

    def compute(
        self,
        raw_img,
        stress_class
    ):

        if (
            raw_img is None
            or raw_img.size == 0
        ):
            return 0.0, "unknown"

        stress_name = (
            stress_class
            .strip()
            .lower()
        )

        # Healthy class
        if stress_name == "healthy":

            return 0.05, "none"

        img = cv2.cvtColor(
            raw_img,
            cv2.COLOR_RGB2BGR
        )

        hsv = cv2.cvtColor(
            img,
            cv2.COLOR_BGR2HSV
        )

        h = hsv[:, :, 0]
        s = hsv[:, :, 1]
        v = hsv[:, :, 2]

        total_pixels = (
            raw_img.shape[0]
            * raw_img.shape[1]
        )

        # Brown / dark lesion areas
        brown_mask = (
            (h >= 5)
            & (h <= 25)
            & (s >= 45)
            & (v >= 30)
            & (v <= 210)
        )

        # Yellow/chlorotic regions
        yellow_mask = (
            (h >= 20)
            & (h <= 40)
            & (s >= 50)
            & (v >= 100)
        )

        # Very dark necrotic regions
        dark_mask = (
            (v < 80)
            & (s > 40)
        )

        affected_mask = (
            brown_mask
            | yellow_mask
            | dark_mask
        )

        affected_ratio = (
            np.count_nonzero(
                affected_mask
            )
            / max(total_pixels, 1)
        )

        # Scale because disease lesions may
        # occupy only part of the visible leaf.
        severity = np.clip(
            affected_ratio * 1.8,
            0.0,
            1.0
        )

        severity = float(
            severity
        )

        if severity < 0.15:

            label = "mild"

        elif severity < 0.45:

            label = "moderate"

        elif severity < 0.75:

            label = "severe"

        else:

            label = "critical"

        return (
            round(severity, 3),
            label
        )