# PlantRx — AI Coach for Plant-Based Diabetes Management

## 1. Overview

PlantRx is an AI-powered web application designed to help individuals with Type II diabetes make better dietary decisions using plant-based nutrition.

The system analyzes meals, scans products, and generates meal plans to support glucose stability and long-term health outcomes.

---

## 2. Problem Statement

People with Type II diabetes struggle with:
- Understanding how meals impact blood glucose
- Identifying hidden sugars and non-vegan ingredients
- Planning consistent, glucose-friendly meals

Existing tools are fragmented, generic, or not tailored to plant-based diets.

---

## 3. Solution

PlantRx provides:
- AI-powered meal analysis
- Barcode-based product evaluation
- Personalized weekly meal planning
- Glucose-aware insights and coaching

All in a single interface.

---

## 4. Core Features

### 4.1 Meal Analysis
- Input: Meal description or image
- Output:
  - Meal summary
  - Ingredients breakdown
  - Glucose spike score
  - Diabetes risk level
  - Suggested improvements

---

### 4.2 Barcode Scanner
- Input: Product barcode
- Output:
  - Vegan status
  - Concerning ingredients
  - Diabetes considerations
  - Alternative suggestions

---

### 4.3 Dashboard
- Displays:
  - Average glucose score
  - Weekly trends
  - AI coaching summary
  - Risk breakdown
  - Saved meal insights

---

### 4.4 Meal Planner
- Input:
  - Dietary preferences
  - Allergies
  - Health goals
- Output:
  - Weekly meal plan
  - Grocery list

---

### 4.5 History Tracking
- Stores analyzed meals
- Displays past insights
- Enables trend awareness

---

## 5. Target Users

- Individuals with Type II diabetes
- Users exploring plant-based diets
- Health-conscious individuals tracking glucose impact

---

## 6. Technical Architecture

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend (Current)
- Mock API routes (Next.js API)

### Planned Backend
- n8n workflow orchestration
- OpenAI / LLM integration

---

## 7. Data Flow

User → Frontend → API Route → (Mock AI) → Response → UI Rendering

Future:
User → Frontend → n8n → AI Models → Processed Response → UI

---

## 8. Constraints

- Currently uses simulated AI responses
- No real user authentication
- No persistent database (localStorage only)

---

## 9. Future Enhancements

- Real AI integration (OpenAI / Claude)
- Persistent database (Supabase / Firebase)
- User authentication
- Real barcode API (OpenFoodFacts)
- Personalized glucose modeling
- Mobile support

---

## 10. Success Metrics

- User engagement (sessions per day)
- Meal logs per user
- Weekly plan usage
- Retention rate
- Accuracy of AI insights (future)

---

## 11. Deployment

- Platform: Vercel
- Environment: Production-ready (mock backend)
- URL: https://vegan-diabetes-ai.vercel.app

---

## 12. Disclaimer

This application is for educational purposes only and does not provide medical advice.