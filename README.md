#  AgriVision AI — ML Model Backend

### Custom Multi-Stage Crop Image Analytics Pipeline

The **ML Model branch** of AgriVision AI contains the custom machine-learning and computer-vision inference pipeline responsible for analyzing crop images.

Unlike the main application architecture, which uses an external generative AI service for image analysis, this branch implements a **dedicated multi-stage inference pipeline** using TensorFlow/TFLite, OpenCV, NumPy, image preprocessing, rule-based analysis, and geolocation utilities.

The pipeline is designed to transform a raw crop image into structured agricultural information including:

* Image quality
* Crop stage
* Crop stress/disease class
* Disease/stress confidence
* Severity score
* Severity label
* Geographical boundary validation

---

#  Purpose

The purpose of this ML backend is to provide a specialized inference service for **real-time crop image analytics**.

Instead of treating crop analysis as a single prediction task, the system divides the analysis into multiple independent stages.

```text
Crop Image
    │
    ▼
Image Quality Validation
    │
    ▼
Image Preprocessing
    │
    ▼
Crop Stage Analysis
    │
    ▼
Disease / Stress Classification
    │
    ▼
Severity Estimation
    │
    ▼
Structured Prediction Response
```

This modular approach makes it possible to improve individual components independently without redesigning the complete inference pipeline.

---

#  Key Features

##  Image Quality Assessment

Before running the agricultural analysis, the uploaded image is checked for basic usability.

The quality service evaluates characteristics such as:

* Image brightness
* Blur/sharpness
* Sky presence
* Vegetation coverage
* Image content suitability

The current implementation includes OpenCV-based image analysis using grayscale conversion, HSV analysis, vegetation estimation, sky detection, and edge-density checks.

Possible quality results include:

```text
good
dark
blurry
wrong
```

If the image does not satisfy the quality requirements, the pipeline stops before performing the remaining analysis stages.

---

#  Crop Stage Detection

The crop-stage service estimates the current growth stage of the crop.

The supported stages are:

```text
sowing
vegetative
flowering
maturity
```

The current implementation uses image-derived pixel characteristics rather than a trained neural network.

It calculates:

* Green pixel ratio
* Yellow pixel ratio
* Overall image brightness

These values are then evaluated using rule-based thresholds to determine the crop stage.

Example:

```text
             Crop Image
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
      Green      Yellow   Brightness
      Ratio       Ratio      │
        │           │        │
        └───────────┼────────┘
                    ▼
              Stage Rules
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
     Sowing     Vegetative   Flowering
                    │
                    ▼
                 Maturity
```

---

#  Disease / Crop Stress Classification

The disease service uses a **TensorFlow Lite model** to classify the crop's stress condition.

The current classes are:

```text
healthy
pest_damage
water_stress
```

The model is loaded from:

```text
models/stress_classifier.tflite
```

The image is preprocessed, converted to the model's expected input data type, passed through the TFLite interpreter, and the class with the highest output value is selected.

The service returns:

```text
stress_class
stress_confidence
```

Example:

```json
{
  "stress_class": "water_stress",
  "stress_confidence": 0.87
}
```

---

#  Severity Estimation

After the stress/disease class is identified, the system calculates a normalized severity score.

The severity service currently uses **OpenCV + NumPy image analysis** rather than a separate neural-network severity model.

The score is normalized to:

```text
0.0 ───────────────────────────── 1.0
│                                  │
No / Low Severity              High Severity
```

The calculation is dependent on the detected stress class.

### Healthy

A healthy crop receives a low baseline severity:

```text
severity = 0.05
label = "none"
```

### Pest Damage

The system detects dark/brown/black regions using HSV-based thresholds and estimates the proportion of affected pixels.

### Water Stress

The system detects yellow regions using HSV thresholds and estimates their proportion.

The calculated value is clipped to the range:

```text
0 ≤ severity ≤ 1
```

This implementation is contained in `services/severity.py`.

---

#  Geolocation Validation

The ML pipeline includes a geolocation service intended to validate whether the user's coordinates fall inside a specified farm boundary.

The prediction API accepts:

```text
user_lat
user_lng
```

and passes polygon coordinates to the pipeline.

The architecture is intended to perform:

```text
User Coordinates
       │
       ▼
Farm Polygon
       │
       ▼
Point-in-Polygon Check
       │
   ┌───┴────┐
   ▼        ▼
Inside    Outside
   │        │
   ▼        ▼
Continue   Stop
```

However, in the current branch the geolocation check is **temporarily disabled for testing**, with:

```python
inside = True
```

The prediction router also currently supplies a hardcoded polygon. This should therefore be treated as development/testing behavior rather than production-ready farm-boundary validation.

---

#  ML Backend Architecture

The ML branch follows a **pipeline-service architecture**.

```text
                       ┌──────────────────────┐
                       │      Client/User     │
                       └──────────┬───────────┘
                                  │
                                  │ Image
                                  │ Latitude
                                  │ Longitude
                                  ▼
                       ┌──────────────────────┐
                       │    FastAPI Router    │
                       │   /api/predict       │
                       └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │   PipelineService    │
                       └──────────┬───────────┘
                                  │
                ┌─────────────────┼──────────────────┐
                │                 │                  │
                ▼                 ▼                  ▼
        ┌──────────────┐   ┌──────────────┐  ┌───────────────┐
        │   Quality    │   │ Crop Stage   │  │ Disease/Stress│
        │   Service    │   │   Service    │  │    Service    │
        └──────┬───────┘   └──────┬───────┘  └───────┬───────┘
               │                  │                  │
               ▼                  ▼                  ▼
          Image Rules        Pixel Rules        TFLite Model
               │                  │                  │
               └──────────────────┼──────────────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │  Severity Service    │
                       │  OpenCV + NumPy      │
                       └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │ Response Formatter   │
                       └──────────┬───────────┘
                                  │
                                  ▼
                         Structured JSON
```

The central `PipelineService` initializes the geolocation, quality, stage, disease, and severity services and orchestrates the complete analysis process.

---

#  Complete Workflow

The current branch follows this sequence:

```text
1. Receive image + coordinates
              │
              ▼
2. Geolocation / Farm Boundary
              │
              ▼
3. Image Quality Validation
              │
              ▼
        Is image good?
          /        \
        No          Yes
        │            │
        ▼            ▼
    Return       Preprocess
    Quality          │
    Response         ▼
              Crop Stage Detection
                     │
                     ▼
              Disease Classification
                     │
                     ▼
              Severity Calculation
                     │
                     ▼
              Response Formatting
                     │
                     ▼
               Final JSON
```

The pipeline explicitly performs quality validation before preprocessing and subsequent agricultural analysis. Poor-quality images terminate the workflow early.

---

#  Pipeline Stages

| Stage | Component      | Technique                    |
| ----- | -------------- | ---------------------------- |
| 1     | Geolocation    | Polygon / spatial validation |
| 2     | Image Quality  | OpenCV + image heuristics    |
| 3     | Preprocessing  | PIL / NumPy                  |
| 4     | Crop Stage     | Rule-based pixel analysis    |
| 5     | Disease/Stress | TensorFlow Lite              |
| 6     | Severity       | OpenCV + HSV analysis        |
| 7     | Response       | Structured JSON formatter    |

---

#  Project Structure

```text
ML_Backend/
│
├── routers/
│   └── predict_router.py
│
├── services/
│   ├── GEOLOCATION.py
│   ├── crop_stage_service.py
│   ├── crop_type_service.py
│   ├── disease_service.py
│   ├── pipeline_service.py
│   ├── quality_service.py
│   └── severity.py
│
├── utils/
│   ├── preprocessing.py
│   └── response_formatter.py
│
├── main.py
├── repair.py
└── requirements.txt
```

The current `ML_Backend` directory contains the router, seven service modules, two utility modules, the FastAPI entry point, model-repair utility, and dependency file.

---

#  Component Responsibilities

## `main.py`

The FastAPI application entry point.

Responsibilities:

* Create FastAPI application
* Configure CORS
* Register prediction router
* Provide health endpoints
* Configure global exception handling
* Start Uvicorn

The API is configured to run on:

```text
0.0.0.0:8000
```

and uses a single worker because the backend is intended for model inference workloads.

---

## `routers/predict_router.py`

Provides the main prediction endpoint:

```http
POST /api/predict
```

The endpoint accepts:

```text
file
user_lat
user_lng
```

The uploaded image is read into memory and passed to `PipelineService`.

---

## `services/pipeline_service.py`

The **central orchestration layer**.

It coordinates:

```text
GeoLocationService
QualityService
CropStageService
DiseaseService
SeverityService
```

and controls the order in which the individual components execute.

It also handles intermediate failures and generates the final structured response.

---

## `services/quality_service.py`

Responsible for determining whether the uploaded image is suitable for crop analysis.

Uses:

* OpenCV
* Grayscale analysis
* HSV analysis
* Excess Green Index
* Canny edge detection
* Image brightness
* Sky detection
* Vegetation coverage

---

## `services/crop_stage_service.py`

Responsible for estimating crop growth stage.

Current stages:

```text
sowing
vegetative
flowering
maturity
```

The current implementation is rule-based using image pixel statistics.

---

## `services/disease_service.py`

Loads and executes:

```text
models/stress_classifier.tflite
```

using TensorFlow Lite.

Current classes:

```text
healthy
pest_damage
water_stress
```

---

## `services/severity.py`

Calculates the normalized crop severity score based on the predicted stress class and image characteristics.

Uses:

* NumPy
* OpenCV
* HSV color analysis

The final severity value is normalized to `[0, 1]`.

---

## `services/GEOLOCATION.py`

Contains geolocation-related functionality for farm-boundary validation.

The intended purpose is to determine whether the user's coordinates fall within the supplied farm polygon.

---

## `services/crop_type_service.py`

Contains crop-type model infrastructure.

The current implementation includes an older/commented TensorFlow Lite crop-classification implementation with labels such as:

```text
Pepperbell
cotton
maize
soybean
sugarcane
```

However, the active pipeline currently returns:

```text
crop_type = "Sugarcane"
```

rather than calling this service dynamically.

---

## `utils/preprocessing.py`

Responsible for converting uploaded image bytes into the formats required by the inference pipeline.

The pipeline uses it to obtain:

```text
PIL image
Processed image
Raw NumPy image
```

---

## `utils/response_formatter.py`

Responsible for converting individual predictions into the final API response structure.

---

## `repair.py`

A development utility for repairing a problematic Keras `.h5` model.

The script:

```text
Broken H5 Model
      │
      ▼
Load with safe_mode=False
      │
      ▼
TensorFlow SavedModel
      │
      ▼
Reload
      │
      ▼
Clean H5 Model
```

It is currently configured around:

```text
models/quality.h5
```

and generates repaired model files.

---

#  Model Architecture

The branch uses a hybrid approach rather than relying on one single ML model.

```text
                Crop Image
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
    Computer Vision       TensorFlow Lite
       Rules                 Model
          │                   │
          ▼                   ▼
    Quality / Stage      Stress Class
          │                   │
          └─────────┬─────────┘
                    ▼
             Severity Rules
                    │
                    ▼
              Final Result
```

This approach combines traditional computer-vision techniques with a trained TensorFlow Lite classifier.

---

#  Technology Stack

| Technology       | Purpose                     |
| ---------------- | --------------------------- |
| Python           | ML backend language         |
| FastAPI          | REST API                    |
| Uvicorn          | ASGI server                 |
| TensorFlow 2.12  | ML inference                |
| TensorFlow Lite  | Lightweight model inference |
| Keras 2.12       | Model support               |
| NumPy            | Numerical/image processing  |
| OpenCV           | Computer vision             |
| Pillow           | Image processing            |
| Shapely          | Geospatial operations       |
| Python Multipart | File uploads                |

The exact pinned versions are maintained in `requirements.txt`.

---

#  API

## Health Check

```http
GET /
```

Example response:

```json
{
  "status": "running",
  "service": "CROPIC-AI ML Backend",
  "version": "1.0.0"
}
```

---

## Health Endpoint

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

#  Prediction API

## Endpoint

```http
POST /api/predict
```

### Request

The request uses multipart form data:

```text
file       = crop image
user_lat   = latitude
user_lng   = longitude
```

Example:

```bash
curl -X POST "http://localhost:8000/api/predict" \
  -F "file=@crop.jpg" \
  -F "user_lat=11.0168" \
  -F "user_lng=76.9558"
```

---

#  Response Structure

A successful pipeline response follows the structure:

```json
{
  "quality": "good",
  "crop_type": "Sugarcane",
  "stage": "vegetative",
  "stage_confidence": 0.82,
  "stress_class": "healthy",
  "stress_confidence": 0.94,
  "severity": 0.05,
  "severity_label": "none"
}
```

The final response is assembled by the pipeline after all required inference stages complete.

---

#  Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Lakshan4625D/AgriVision-AI.git
cd AgriVision-AI
```

---

# 2. Switch to ML Model Branch

```bash
git checkout ml-model
```

Or:

```bash
git switch ml-model
```

---

# 3. Navigate to ML Backend

```bash
cd ML_Backend
```

---

# 4. Create Virtual Environment

### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

# 5. Install Dependencies

```bash
pip install -r requirements.txt
```

The branch currently pins FastAPI 0.110.0, Uvicorn 0.28.0, NumPy 1.23.5, OpenCV 4.8.0.76, TensorFlow 2.12, Keras 2.12, Pillow 10.0.1, Shapely 2.0.2, and related dependencies.

---

# 6. Model Files

The inference services expect trained model files under the appropriate model directory.

For example:

```text
ML_Backend/
│
├── models/
│   ├── stress_classifier.tflite
│   ├── quality.h5
│   └── ...
```

The disease/stress service specifically expects:

```text
models/stress_classifier.tflite
```

The model-repair utility also expects:

```text
models/quality.h5
```

> Model files should be managed carefully because trained model binaries can be large and may not belong in normal source-control workflows.

---

#  Running the Backend

From inside `ML_Backend`:

```bash
python main.py
```

The application starts Uvicorn on:

```text
http://localhost:8000
```

Alternatively:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

#  Swagger API Documentation

Once the server is running:

```text
http://localhost:8000/docs
```

FastAPI provides an interactive Swagger UI where the `/api/predict` endpoint can be tested.

Alternative OpenAPI documentation:

```text
http://localhost:8000/redoc
```

---

#  Example Testing Workflow

```text
1. Start ML Backend
        │
        ▼
2. Open Swagger
        │
        ▼
3. Select POST /api/predict
        │
        ▼
4. Upload crop image
        │
        ▼
5. Enter latitude
        │
        ▼
6. Enter longitude
        │
        ▼
7. Execute request
        │
        ▼
8. Pipeline starts
        │
        ├── Quality
        ├── Stage
        ├── Disease
        └── Severity
        │
        ▼
9. Receive JSON response
```

---

#  Current Development Status

This branch represents the **custom ML inference implementation** and should be considered an active development version.

Several components are currently experimental or under development.

### Current limitations

#### 1. Geolocation is temporarily bypassed

The pipeline currently contains:

```python
inside = True
```

so the actual polygon validation is disabled during testing.

#### 2. Farm polygon is hardcoded

The prediction router currently uses a fixed polygon instead of retrieving a user's actual farm boundary.

#### 3. Crop type is currently fixed

The final pipeline response currently sets:

```python
crop_type="Sugarcane"
```

The crop-type TFLite implementation exists in commented form but is not currently active in the pipeline.

#### 4. Crop stage is rule-based

The crop stage currently uses manually defined pixel thresholds rather than a trained classification model.

#### 5. Severity is rule-based

Severity is currently calculated using HSV-based image segmentation and predefined formulas rather than a dedicated trained severity model.

---

#  Future Improvements

The ML pipeline can be extended with:

* Dynamic crop-type classification
* Improved crop-stage classification model
* Dedicated disease detection models
* Dedicated severity prediction model
* Farm boundary retrieval from the application backend
* Real-time geolocation validation
* Model confidence calibration
* Better image-quality classification
* Model versioning
* Batch inference
* GPU inference support
* Model monitoring
* Prediction logging
* Automated model evaluation
* Dataset version management
* Explainable AI / visual attention maps

---

#  Integration With AgriVision AI

This ML backend is designed to operate as an independent inference service.

```text
                   AgriVision AI
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
      Application Backend       ML Backend
             │                       │
             │                       │
        Authentication         Image Analysis
        User Management        Crop Analysis
        Database               ML Inference
        Dashboard              Severity
             │                       │
             └───────────┬───────────┘
                         │
                         ▼
                    Final Result
```

The separation allows the application backend and ML inference system to evolve independently.

---

#  ML Model Branch vs Main Branch

| Area             | `ml-model` Branch      | Current Main Architecture |
| ---------------- | ---------------------- | ------------------------- |
| Image Analysis   | Custom pipeline        | Generative AI-based       |
| Disease Analysis | TensorFlow Lite        | AI vision analysis        |
| Crop Stage       | Rule-based             | AI analysis               |
| Severity         | OpenCV/NumPy rules     | AI-derived analysis       |
| Crop Type        | Currently fixed        | AI-derived analysis       |
| Geolocation      | Polygon infrastructure | Application workflow      |
| Inference        | Local model execution  | External AI API           |
| Main Framework   | FastAPI                | FastAPI                   |
| Image Processing | OpenCV + NumPy + PIL   | AI image understanding    |
| Model Management | Local model files      | API-based model           |
| Architecture     | Multi-stage pipeline   | Service + AI API          |

---

#  Branch Purpose

The `ml-model` branch is primarily intended for developing and evaluating the **custom machine-learning approach** for AgriVision AI.

It provides a foundation for experimenting with:

```text
Image Processing
       +
Computer Vision
       +
TensorFlow/TFLite
       +
Rule-Based Analysis
       +
Geospatial Validation
       =
Crop Analytics Pipeline
```

This makes the branch particularly useful for research, experimentation, model evaluation, and future replacement of individual rule-based components with trained models.

---


#  AgriVision AI

**AI Based Real-Time Crop Image Analytics for Crop Insurance – PMFBY**

The ML Model branch focuses on building the intelligent inference layer that converts raw crop imagery into structured agricultural insights.

```text
              CROP IMAGE
                   │
                   ▼
          ┌─────────────────┐
          │ Image Validation│
          └────────┬────────┘
                   ▼
          ┌─────────────────┐
          │   Preprocessing │
          └────────┬────────┘
                   ▼
          ┌─────────────────┐
          │  Crop Stage     │
          └────────┬────────┘
                   ▼
          ┌─────────────────┐
          │ Disease / Stress│
          └────────┬────────┘
                   ▼
          ┌─────────────────┐
          │    Severity     │
          └────────┬────────┘
                   ▼
          ┌─────────────────┐
          │ Structured JSON │
          └─────────────────┘
```

**Project:** AgriVision AI
**Branch:** `ml-model`
**Status:** Active Development
