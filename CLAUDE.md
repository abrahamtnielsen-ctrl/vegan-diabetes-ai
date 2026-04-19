# CLAUDE.md — PlantRx AI Agent Context

## Project Overview

PlantRx is an AI-powered web app for plant-based diabetes management.

It helps users:
- Analyze meals
- Scan products
- Plan weekly meals
- Track glucose-related patterns

---

## Architecture

- Frontend: Next.js (App Router, TypeScript)
- Styling: Tailwind CSS
- Backend: Next.js API routes (mock)
- Deployment: Vercel

---

## Key Concepts

### Meal Analysis
Returns structured data:
- meal_summary
- ingredients
- glucose_spike_score
- diabetes_risk_level
- suggested_swap
- coaching_tip

---

### Barcode Analysis
Returns:
- vegan_status
- concerning_ingredients
- diabetes_considerations
- recommendation
- alternative_suggestion

---

### Dashboard API

Endpoint:
GET /api/daily-risk-dashboard

Returns:
{
  average_glucose_spike_score: number,
  meal_count: number,
  risk_breakdown: {
    low: number,
    moderate: number,
    high: number
  },
  highest_risk_meal: {
    meal_summary: string,
    glucose_spike_score: number,
    diabetes_risk_level: string
  },
  coach_summary: string
}

---

## API Design Principles

- All responses are structured JSON
- Fields are stable and predictable for UI rendering
- Mock data simulates future AI responses
- Risk scoring is normalized (0–100 scale)

---

## Future Integration Plan

- Replace mock APIs with real LLM calls (OpenAI / Claude)
- Connect meal analysis to image + text inputs
- Integrate barcode API (e.g., OpenFoodFacts)
- Add persistent storage (Supabase / Firebase)
- Introduce user authentication

---

## Agent Notes

- This project is currently in **mock mode**
- Do NOT assume real AI is connected yet
- Focus on UI → API → Data flow correctness
- Maintain consistency in response shapes

---

## Data Contracts (Type Expectations)

- glucose_spike_score: number (0–100)
- diabetes_risk_level: "low" | "moderate" | "high"
- vegan_status: "vegan" | "non-vegan" | "uncertain"
- arrays (ingredients, concerns) are always non-null (empty if none)

All API responses must follow consistent typing to prevent UI breakage.

## AI System Design

- Input: meal text or image
- Processing: LLM analysis
- Output: structured nutrition + risk scoring
- Output must conform to existing API response schemas
- Future: agent orchestration (n8n)