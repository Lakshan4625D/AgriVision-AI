import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types


load_dotenv()


class GeminiService:

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError(
                "GEMINI_API_KEY is not configured."
            )

        self.client = genai.Client(api_key=api_key)

        self.model_name = "gemini-3.6-flash"

        print(
            "\n================ GEMINI SERVICE INITIALIZED ================"
        )
        print("Gemini model:", self.model_name)
        print(
            "=============================================================\n"
        )

    def analyze_image(
        self,
        image_bytes: bytes,
        mime_type: str,
        prompt: str
    ) -> dict:

        if not image_bytes:
            raise ValueError("Image bytes cannot be empty.")

        if not mime_type:
            raise ValueError("Image MIME type cannot be empty.")

        if not prompt:
            raise ValueError("Gemini prompt cannot be empty.")

        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=[
                    types.Part.from_bytes(
                        data=image_bytes,
                        mime_type=mime_type,
                    ),
                    prompt,
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                ),
            )

        except Exception as e:
            raise RuntimeError(
                f"Gemini API request failed: {str(e)}"
            ) from e

        if not response.text:
            raise RuntimeError(
                "Gemini returned an empty response."
            )

        try:
            result = json.loads(response.text)

        except json.JSONDecodeError as e:
            raise RuntimeError(
                f"Gemini returned invalid JSON: {str(e)}"
            ) from e

        if not isinstance(result, dict):
            raise RuntimeError(
                "Gemini response is not a JSON object."
            )

        return result