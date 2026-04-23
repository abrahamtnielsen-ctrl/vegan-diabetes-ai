# PlantRx — AI Coach for Plant-Based Diabetes Management

> Analyze meals, understand glucose impact, and plan plant-based nutrition with AI.

Capstone Project


## Live Demo

https://vegan-diabetes-ai.vercel.app

## Demo Instructions

1. Click **Continue as Demo**
2. Go to **Meal Log**
3. Enter a meal (e.g., *"tofu stir fry with rice"*)
4. Review glucose impact and AI recommendations
5. Visit **Dashboard** to see aggregated insights

---

## Demo Access

Authentication is simulated.  
Click **Continue as Demo** to access all features.

---

## Features

**AI Meal Analysis**  
Upload or describe a meal and receive ingredient detection, vegan verification, and glucose impact insights.

**Barcode Scanner**  
Scan packaged foods to check vegan status, added sugars, and diabetes-friendly recommendations.

**Weekly AI Meal Planner**  
Generate personalized plant-based weekly meal plans with grocery lists.

**Meal History Tracking**  
Store previous meal insights to review glucose-aware nutrition patterns.

**Education Library**  
Learn how plant-based nutrition supports diabetes management.

---

## System Architecture

### Current (Deployed Version)
User → Next.js Web App → API Routes (Mock AI) → Structured Response → UI

### Planned (Full AI Integration)
User → Next.js Web App → Webhook → n8n Workflow → OpenAI AI Analysis → Structured Meal Insight → Stored Insight → Returned to Frontend Dashboard

---

## Architecture Diagram

```text
┌──────────────┐
│     User     │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│ Next.js Frontend Application │
│ Landing • Auth • Dashboard   │
│ Meal Log • Planner • History │
└───────────┬──────────────────┘
            │
            ▼
┌──────────────────────────────┐
│ Webhook / API Request Layer  │
└───────────┬──────────────────┘
            │
            ▼
┌──────────────────────────────┐
│     n8n Backend Workflow     │
│ Normalize Input              │
│ Validate Meal                │
│ Save Meal Log                │
│ Analyze Meal with AI         │
│ Format JSON                  │
│ Add Risk Flag                │
│ Add Glucose Spike Score      │
│ Save AI Insight              │
│ Return Analysis              │
└───────────┬──────────────────┘
            │
            ▼
┌──────────────────────────────┐
│        OpenAI API / AI       │
│ Meal understanding & insight │
└───────────┬──────────────────┘
            │
            ▼
┌──────────────────────────────┐
│ Structured Insight / Storage │
│ Meal logs • AI insights      │
│ Saved history                │
└───────────┬──────────────────┘
            │
            ▼
┌──────────────────────────────┐
│ User-Facing Results          │
│ Dashboard • History • Detail │
│ Planner • Education          │
└──────────────────────────────┘

```

## AI Workflow (Planned)

The backend automation pipeline processes meal analysis requests.

Workflow steps:

1. Webhook receives meal data
2. Normalize input data
3. Validate meal description
4. Save meal log
5. Send meal to OpenAI for AI analysis
6. Format analysis JSON
7. Add diabetes risk flag
8. Calculate glucose spike score
9. Save AI insight
10. Return meal analysis to the frontend

---

## Technology Stack

### Frontend
- Next.js (React)
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend / AI Workflow (Current)
- Next.js API Routes (Mock AI responses)
- Local data simulation (no external dependencies)

### Backend / AI Workflow (Planned)
- n8n Automation Platform
- OpenAI API
- Webhook API Integration

### Infrastructure
- Hostinger (n8n workflow hosting)
- Local development environment (localhost)

---

## Running the Project

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Open the application:

```
http://localhost:3000
```

---

## Testing

- Lint: `npm run lint` (no errors)
- Build: `npm run build` (passes)
- Manual QA: All routes load (Dashboard, Meal Log, Barcode, Planner, History, Education)

---

## Environment Variables

None required for the current (mock) deployment.

Planned:
- OPENAI_API_KEY
- N8N_WEBHOOK_URL

---

## Documentation

- [PRD](./PRD.md)
- [Claude Context](./CLAUDE.md)

---

## Educational Disclaimer

This project is an educational prototype.  
The information provided is not medical advice and should not replace professional healthcare guidance.

---

## Author

Abraham Nielsen  
Capstone Project — AI Web Application Development

## 📜 Project Evolution

This project was developed iteratively:

- `docs/README_initial.md` — early concept and feature planning
- `docs/README_v1.md` — intermediate architecture and system refinement
- `README.md` — final implemented system with n8n workflows, AI integration, and automated testing

This progression reflects the transition from a conceptual design to a fully functional, validated application.