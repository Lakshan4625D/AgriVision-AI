import os
import json
import numpy as np
from ai_edge_litert.interpreter import Interpreter

from utils.preprocessing import load_and_preprocess


class DiseaseService:

    def __init__(self):

        base_dir = os.path.dirname(
            os.path.abspath(__file__)
        )

        models_dir = os.path.normpath(
            os.path.join(
                base_dir,
                "..",
                "models"
            )
        )

        model_path = os.path.join(
            models_dir,
            "agrivision_final_best.tflite"
        )

        class_path = os.path.join(
            models_dir,
            "class_indices.json"
        )

        if not os.path.exists(model_path):
            raise FileNotFoundError(
                f"TFLite model not found: {model_path}"
            )

        if not os.path.exists(class_path):
            raise FileNotFoundError(
                f"Class mapping not found: {class_path}"
            )

        print(
            "\nLoading AgriVision TFLite model:",
            model_path
        )

        self.interpreter = Interpreter(
        model_path=model_path
)

        self.interpreter.allocate_tensors()

        self.input_details = (
            self.interpreter.get_input_details()
        )

        self.output_details = (
            self.interpreter.get_output_details()
        )

        with open(
            class_path,
            "r",
            encoding="utf-8"
        ) as f:

            class_indices = json.load(f)

        # class_indices.json is:
        #
        # {
        #   "Apple___Apple Scab": 0,
        #   ...
        # }
        #
        # Convert to:
        #
        # {
        #   0: "Apple___Apple Scab"
        # }

        self.index_to_class = {
            int(index): label
            for label, index
            in class_indices.items()
        }

        output_shape = (
            self.output_details[0]["shape"]
        )

        output_classes = int(
            output_shape[-1]
        )

        if output_classes != len(
            self.index_to_class
        ):
            raise ValueError(
                "Model output classes do not match "
                "class_indices.json. "
                f"Model={output_classes}, "
                f"Mapping={len(self.index_to_class)}"
            )

        print(
            f"AgriVision model loaded with "
            f"{output_classes} classes."
        )

    def predict(self, image_bytes):

        processed = load_and_preprocess(
            image_bytes,
            return_raw=False,
            normalize=False
        )

        input_dtype = (
            self.input_details[0]["dtype"]
        )

        processed = processed.astype(
            input_dtype
        )

        self.interpreter.set_tensor(
            self.input_details[0]["index"],
            processed
        )

        self.interpreter.invoke()

        output = self.interpreter.get_tensor(
            self.output_details[0]["index"]
        )[0]

        predicted_index = int(
            np.argmax(output)
        )

        confidence = float(
            output[predicted_index]
        )

        combined_label = (
            self.index_to_class[
                predicted_index
            ]
        )

        if "___" not in combined_label:
            raise ValueError(
                f"Invalid combined class label: "
                f"{combined_label}"
            )

        crop_type, stress_class = (
            combined_label.split(
                "___",
                1
            )
        )

        return {
            "crop_type": crop_type.strip(),
            "stress_class": stress_class.strip(),
            "stress_confidence": confidence,
            "class_index": predicted_index
        }