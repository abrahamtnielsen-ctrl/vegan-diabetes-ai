# PlantRx — AI Nutrition Coach for Plant-Based Diabetes Management

> Analyze meals, enforce vegan compliance, and estimate glucose impact using a structured AI workflow.

Capstone Project — Abraham Nielsen

---

## 🌐 Live Demo

https://vegan-diabetes-ai.vercel.app

---

## 🚀 Overview

PlantRx is a full-stack AI web application designed to support individuals with Type II Diabetes through plant-based nutrition guidance.

The system processes meal inputs in real time and returns structured, explainable insights including:
- Vegan compliance validation
- Glucose impact estimation
- Ingredient identification
- Actionable dietary recommendations

Unlike a simple AI demo, PlantRx combines **deterministic validation logic** with **AI-driven analysis** to ensure consistent and reliable outputs.

---

## ⚙️ Core Features (Implemented)

### 🧠 AI Meal Analysis
- Accepts natural language meal descriptions
- Extracts likely ingredients and meal composition
- Generates structured nutrition insights

### 🛑 Vegan Compliance Engine
- Rule-based detection of non-vegan ingredients
- Blocks invalid inputs before AI processing
- Ensures consistent and explainable system behavior

### 📊 Glucose Impact Scoring
- Estimates glucose spike score (0–100)
- Identifies added and hidden sugar sources
- Assigns diabetes risk levels (low / moderate / high)

### 🔁 Automated Backend Workflow
- Fully orchestrated using n8n
- Handles validation, routing, AI processing, and response formatting

### 🧪 Automated Test Suite
- Node.js test runner sending real requests to the live webhook
- Validates critical system paths:
  - Vegan meal analysis
  - Non-vegan blocking
  - Vague input rejection
  - Sugar detection behavior

---

## 🧱 System Architecture

```text
User
  ↓
Next.js Frontend (Meal Log UI)
  ↓
Webhook API (POST request)
  ↓
n8n Workflow Engine
  ├─ Normalize Input
  ├─ Validate Meal
  ├─ Vegan Detection (Rule-based)
  ├─ Conditional Routing
  ├─ AI Analysis (OpenAI)
  ├─ Glucose Scoring
  ├─ Response Formatting
  ↓
Structured JSON Response
  ↓
Frontend UI Rendering