import io

import cv2
import numpy as np

from PIL import Image


MODEL_IMAGE_SIZE = (224, 224)


def load_and_preprocess(
    image_bytes,
    return_raw=False,
    normalize=False
):

    if (
        not image_bytes
        or len(image_bytes) < 20
    ):
        raise ValueError(
            "Invalid or empty image."
        )

    try:

        pil_img = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

    except Exception as e:

        raise ValueError(
            f"Failed to decode image: {e}"
        )

    raw_np = np.array(pil_img)

    resized = pil_img.resize(
        MODEL_IMAGE_SIZE
    )

    arr = np.array(
        resized,
        dtype=np.float32
    )

    # The current EfficientNetB3 TFLite model
    # expects the same 0-255 image range used
    # during training.
    if normalize:
        arr = arr / 255.0

    arr = np.expand_dims(
        arr,
        axis=0
    )

    if return_raw:

        return (
            pil_img,
            arr,
            raw_np
        )

    return arr


def load_image_bytes_as_cv2(
    image_bytes
):

    if image_bytes is None:

        raise ValueError(
            "Image bytes cannot be None"
        )

    try:

        pil_img = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

    except Exception as e:

        raise ValueError(
            f"Failed to decode image: {e}"
        )

    img_np = np.array(
        pil_img
    )

    return cv2.cvtColor(
        img_np,
        cv2.COLOR_RGB2BGR
    )