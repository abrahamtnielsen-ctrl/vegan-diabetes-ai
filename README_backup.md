# PlantRx — AI Coach for Plant-Based Diabetes Management

Capstone Project

PlantRx is an AI-powered web application designed to help individuals with Type 2 Diabetes make healthier food decisions using plant-based nutrition guidance. The platform analyzes meals, scans packaged foods, and generates personalized vegan meal plans to support blood glucose stability.

The system integrates a modern web interface with an AI-powered backend workflow that analyzes meals and generates diabetes-aware insights.

---

## Features

• AI Meal Analysis  
Upload or describe a meal and receive ingredient detection, vegan verification, and glucose impact insights.

• Barcode Scanner  
Scan packaged foods to check vegan status, added sugars, and diabetes-friendly recommendations.

• Weekly AI Meal Planner  
Generate personalized plant-based weekly meal plans with grocery lists.

• Meal History Tracking  
Store previous meal insights to review glucose-aware nutrition patterns.

• Education Library  
Learn how plant-based nutrition supports diabetes management.

---

## Technology Stack

Frontend  
Next.js (React)  
TypeScript  
Tailwind CSS  
Lucide Icons

Backend / AI Workflow  
n8n Automation Platform  
OpenAI API  
Webhook API Integration

Infrastructure  
Hostinger (n8n workflow hosting)  
Local development environment (localhost)

---

## System Architecture

User → Next.js Web App → Webhook → n8n Workflow → OpenAI AI Analysis → Structured Meal Insight → Saved Insight → Returned to Frontend Dashboard

---

## AI Workflow (n8n)

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

## Demo Access

For the capstone demo, authentication is simulated.  
Users can click **Continue as Demo** to access all application features without real account creation.

---

## Educational Disclaimer

This project is an educational prototype.  
The information provided is not medical advice and should not replace professional healthcare guidance.

---

## Author

Abraham Nielsen  
Capstone Project — AI Web Application Development