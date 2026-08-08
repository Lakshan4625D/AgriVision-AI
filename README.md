#  AgriVision AI

### Real-Time Crop Analytics for PMFBY

**AgriVision AI** is an AI-powered crop analytics platform designed to support **crop assessment, disease identification, severity analysis, and digital crop-insurance workflows** under the **Pradhan Mantri Fasal Bima Yojana (PMFBY)**.

The platform combines a modern React frontend, FastAPI application backend, MySQL database, and an AI-powered image-analysis service to transform a farmer's crop image into structured agricultural insights.

---

##  Overview

Crop assessment for insurance and agricultural decision-making can be time-consuming when it depends heavily on manual inspection.

AgriVision AI provides a digital workflow where a user can:

1. Create an account and log in.
2. Upload a crop image.
3. Provide the crop location using latitude and longitude.
4. Submit the image for AI analysis.
5. Receive structured crop analytics.
6. Store the analysis for future reference.
7. View previous analyses and dashboard insights.

The system is designed with a modular architecture so that the AI inference layer, application backend, database, and frontend can evolve independently.

---

##  Key Features

###  AI-Powered Crop Analysis

The ML backend analyzes uploaded crop images and generates structured information such as:

* Crop quality
* Crop type
* Crop growth stage
* Disease detection
* Disease severity
* Severity score
* Agricultural observations
* Location/geographical validation

The current ML service uses **Google Gemini** through the `google-genai` Python SDK for image analysis.

###  Location-Aware Analysis

The prediction API accepts:

* `user_lat`
* `user_lng`

along with the uploaded crop image.

The ML pipeline also contains geolocation-related services and polygon validation functionality.

###  Authentication

The application backend provides:

* User registration
* User login
* Password handling
* JWT-based authentication infrastructure
* User roles

Authentication endpoints are implemented under `/auth`.

###  Dashboard

The application backend provides dashboard APIs for retrieving user-specific agricultural analysis information.

The dashboard layer is designed to support metrics and analytics that can be displayed by the frontend.

###  Analysis History

Individual crop analyses can be saved and retrieved through the application backend.

Supported operations include:

* Create analysis
* Retrieve a user's analysis history
* Retrieve a specific analysis

These are exposed through the `/analysis` API.

---

#  System Architecture

```text
                    ┌──────────────────────┐
                    │      User / Farmer   │
                    └──────────┬───────────┘
                               │
                               │ Crop Image
                               │ Latitude / Longitude
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   TypeScript + Vite  │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
              ┌─────────────────────────────────┐
              │        Application Backend      │
              │             FastAPI             │
              │                                 │
              │  Authentication                 │
              │  Analysis Management            │
              │  Dashboard APIs                 │
              └──────────────┬──────────────────┘
                             │
                             │
              ┌──────────────┴───────────────┐
              │                              │
              ▼                              ▼
     ┌─────────────────┐          ┌─────────────────────┐
     │     MySQL       │          │    ML Backend       │
     │    Database     │          │      FastAPI        │
     │                 │          │                     │
     │ Users           │          │ Prediction API      │
     │ Analyses        │          │ AI Pipeline         │
     │ Roles           │          │ Geolocation         │
     └─────────────────┘          └──────────┬──────────┘
                                             │
                                             ▼
                                  ┌─────────────────────┐
                                  │    Google Gemini    │
                                  │   Image Analysis    │
                                  └─────────────────────┘
```

---

#  Project Structure

```text
AgriVision-AI/
│
├── ML_Backend/
│   ├── routers/
│   │   └── predict_router.py
│   │
│   ├── services/
│   │   ├── GEOLOCATION.py
│   │   ├── gemini_service.py
│   │   └── pipeline_service.py
│   │
│   ├── utils/
│   │
│   ├── main.py
│   └── requirements.txt
│
├── app-backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── analysis.py
│   │   │   └── dashboard.py
│   │   │
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
├── .gitignore
└── README.md
```

The repository currently follows this three-part structure, with the ML backend containing prediction routers/services, the application backend containing API/database logic, and the frontend implemented as a Vite React application.

---

#  Technology Stack

## Frontend

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| React           | User interface                 |
| TypeScript      | Type-safe frontend development |
| Vite            | Development/build tooling      |
| React Router    | Client-side routing            |
| Axios           | API communication              |
| React Query     | Server-state management        |
| Zustand         | Application state management   |
| React Hook Form | Form handling                  |
| Zod             | Validation                     |
| Tailwind CSS    | UI styling                     |
| Framer Motion   | Animations                     |
| Recharts        | Data visualization             |
| Lucide React    | Icons                          |

The current frontend dependencies confirm React 19, TypeScript, Vite, Axios, React Query, Zustand, Tailwind CSS, Recharts and related libraries.

---

## Application Backend

| Technology       | Purpose             |
| ---------------- | ------------------- |
| Python           | Backend language    |
| FastAPI          | REST API framework  |
| Uvicorn          | ASGI server         |
| SQLAlchemy       | ORM                 |
| MySQL            | Relational database |
| PyMySQL          | MySQL connectivity  |
| Pydantic         | Data validation     |
| Alembic          | Database migrations |
| JWT              | Authentication      |
| Passlib / bcrypt | Password security   |

The application backend currently exposes authentication, analysis, and dashboard routers and uses SQLAlchemy with MySQL connectivity.

---

## AI / ML Backend

| Technology       | Purpose                  |
| ---------------- | ------------------------ |
| Python           | ML service               |
| FastAPI          | AI inference API         |
| Google Gemini    | Crop image analysis      |
| Google GenAI SDK | Gemini API integration   |
| Pydantic         | Structured data handling |
| Shapely          | Geospatial operations    |
| Uvicorn          | API server               |

The ML backend currently includes `gemini_service.py`, `pipeline_service.py`, and geolocation functionality. Its requirements include `google-genai`, FastAPI, Shapely and related dependencies.

---

#  Application Workflow

```text
User
 │
 ▼
Login / Register
 │
 ▼
Dashboard
 │
 ▼
Upload Crop Image
 │
 ├── Latitude
 └── Longitude
 │
 ▼
ML Prediction API
 │
 ▼
Image Processing Pipeline
 │
 ▼
Google Gemini
 │
 ▼
Structured Crop Analysis
 │
 ├── Crop Type
 ├── Crop Stage
 ├── Quality
 ├── Disease
 ├── Severity
 └── Severity Score
 │
 ▼
Application Backend
 │
 ▼
MySQL
 │
 ▼
Dashboard / History
```

The current ML prediction endpoint is `POST /api/predict` and accepts an uploaded file together with `user_lat` and `user_lng`.

---

#  API Overview

## ML Backend

### Health Check

```http
GET /
```

Returns the running status of the ML backend.

### Health

```http
GET /health
```

Returns:

```json
{
  "status": "ok"
}
```

### Crop Prediction

```http
POST /api/predict
```

Form data:

```text
file       = crop image
user_lat   = latitude
user_lng   = longitude
```

Example request:

```bash
curl -X POST "http://localhost:8000/api/predict" \
  -F "file=@crop.jpg" \
  -F "user_lat=11.0168" \
  -F "user_lng=76.9558"
```

The ML backend is configured to run on port `8000` when started directly.

---

#  Application Backend API

## Authentication

### Register

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

Authentication routes are implemented under the `/auth` prefix.

---

## Analysis

### Save Analysis

```http
POST /analysis
```

### Get User Analysis History

```http
GET /analysis/user/{user_id}
```

### Get Individual Analysis

```http
GET /analysis/{analysis_id}
```

These endpoints are implemented in the application backend's analysis router.

---

## Dashboard

### Get Dashboard

```http
GET /dashboard/{user_id}
```

The dashboard API provides user-specific dashboard information.

---

#  Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Lakshan4625D/AgriVision-AI.git

cd AgriVision-AI
```

---

# 2. Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL in the terminal.

For a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 3. Application Backend Setup

Open a new terminal:

```bash
cd app-backend
```

Create a Python virtual environment:

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

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Environment Configuration

Create:

```text
app-backend/.env
```

Configure the required application and database settings:

```env
APP_NAME=AgriVision AI
APP_VERSION=1.0.0

HOST=0.0.0.0
PORT=8001

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=agrivision
MYSQL_USER=root
MYSQL_PASSWORD=your_password

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

The backend configuration currently expects application, MySQL, and authentication-related environment variables through `.env`.

---

## Start Application Backend

```bash
python main.py
```

Or:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

The application backend is configured for port `8001`.

---

# 4. ML Backend Setup

Open another terminal:

```bash
cd ML_Backend
```

Create a virtual environment:

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

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Gemini API Configuration

Create an environment file for the ML backend and configure your Gemini API credentials according to the Gemini service configuration.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

> **Never commit API keys, passwords, database credentials, or other secrets to GitHub.**

---

## Start ML Backend

```bash
python main.py
```

Or:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The ML service uses FastAPI and is configured around port `8000`.

---

#  Database

AgriVision AI uses **MySQL** for persistent application data.

The application backend uses SQLAlchemy and creates database tables through the configured SQLAlchemy engine.

Create the database before starting the application:

```sql
CREATE DATABASE agrivision;
```

Then configure the credentials in:

```text
app-backend/.env
```

Example:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=agrivision
MYSQL_USER=root
MYSQL_PASSWORD=your_password
```

---

# 🔬 AI Analysis Pipeline

The AI analysis layer is separated from the main application backend.

```text
                    Crop Image
                         │
                         ▼
                ┌─────────────────┐
                │ Prediction API  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Pipeline Service│
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Gemini Service  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Google Gemini   │
                │ Vision Analysis │
                └────────┬────────┘
                         │
                         ▼
                 Structured Result
                         │
                         ▼
                Application Backend
```

This separation allows the AI inference system to be developed independently from authentication, database management, and frontend concerns.

---

#  Severity Scoring

AgriVision AI represents crop/disease severity using a normalized score:

```text
0.0 ───────────────────────────── 1.0
│                                  │
Low Severity                  High Severity
```

The score can be used by the application to categorize crop conditions and provide a consistent numerical representation of detected severity.

---

#  Security Considerations

The project contains authentication and database infrastructure intended for a multi-user application.

For production deployment:

* Use strong `SECRET_KEY` values.
* Never expose `.env` files.
* Restrict CORS origins.
* Use HTTPS.
* Protect Gemini API credentials.
* Use secure database credentials.
* Apply proper JWT validation.
* Add rate limiting to AI endpoints.
* Validate uploaded image types and sizes.
* Avoid exposing internal exception details.
* Restrict database access to trusted services.

The current ML backend allows all CORS origins for development, while the application backend currently allows the frontend development origin. These settings should be tightened before production deployment.

---

#  Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Application Backend

```bash
cd app-backend
python -m venv venv
```

Activate the environment and install:

```bash
pip install -r requirements.txt
```

Run:

```bash
python main.py
```

### ML Backend

```bash
cd ML_Backend
python -m venv venv
```

Activate the environment and install:

```bash
pip install -r requirements.txt
```

Run:

```bash
python main.py
```

---

#  API Documentation

FastAPI automatically provides interactive API documentation.

Once the backends are running, open:

### ML Backend

```text
http://localhost:8000/docs
```

### Application Backend

```text
http://localhost:8001/docs
```

You can use Swagger UI to test the available REST endpoints.

---

#  Project Objectives

AgriVision AI aims to:

* Automate crop image assessment.
* Reduce dependency on manual preliminary inspection.
* Provide consistent crop-condition analysis.
* Detect potential crop diseases using AI.
* Quantify disease/crop severity.
* Incorporate geographical information into analysis.
* Maintain digital records of crop assessments.
* Provide dashboards and historical insights.
* Create a scalable foundation for future crop-insurance workflows.

---

#  Future Enhancements

Potential future improvements include:

* 👨‍🌾 Farmer mobile application
* 🧑‍💼 Inspector portal
* 🏢 Insurance/admin dashboard
* 📍 Advanced GIS and farm-boundary validation
* 🛰️ Satellite imagery integration
* 🌦️ Weather-aware crop analysis
* 📊 Advanced crop-health analytics
* 📑 Automated insurance assessment reports
* 🧠 AI confidence scoring
* 🌐 Regional-language support
* ☁️ Cloud deployment
* 🐳 Docker-based deployment
* 🔄 CI/CD pipeline
* 📱 Progressive Web App / mobile support

---

#  Why AgriVision AI?

AgriVision AI combines:

**Computer Vision + Generative AI + Geolocation + Web Technologies + Data Management**

into a unified agricultural analytics platform.

The goal is not simply to identify a disease from an image, but to create a **structured, scalable digital crop-assessment platform** that can support future agricultural and crop-insurance workflows.

---


**AgriVision AI**

Developed as an academic/project initiative focused on:

* Artificial Intelligence
* Generative AI
* Agricultural Analytics
* Crop Insurance
* Full-Stack Development
* Geospatial Analysis

---

# 📄 License

This project currently does not specify a dedicated open-source license.

If this repository is intended for public distribution or open-source collaboration, add an appropriate `LICENSE` file.

---

#  Support

If you find the project useful, consider giving the repository a ⭐ on GitHub and following its development.

**Repository:**
https://github.com/Lakshan4625D/AgriVision-AI

---

## 📌 Project Status

**Active Development**

AgriVision AI is currently under active development. Features, APIs, AI analysis capabilities, and UI components may continue to evolve.

---
