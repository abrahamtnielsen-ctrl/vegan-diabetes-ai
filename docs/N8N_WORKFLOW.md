# n8n Workflow — PlantRx AI Backend

> This workflow powers the live production backend for meal analysis.

This project uses an n8n workflow hosted on a VPS to process meal analysis requests from the frontend application.

---

## Webhook Endpoint

**POST** `/webhook/meal-upload`

### Example Request

```json
{
  "meal_text": "oatmeal with blueberries"
}
```
## Workflow Overview

1. **Webhook Trigger**
   - Receives meal input from frontend or test script

2. **Input Normalization**
   - Converts text to lowercase and trims whitespace

3. **Vegan Guardrail (Code Node)**
   - Detects non-vegan ingredients using keyword matching
   - Blocks further processing if animal products are found

4. **Vague Input Validation**
   - Rejects inputs that are too generic (e.g., "food")
   - Returns a user-friendly error response

5. **AI Analysis (OpenAI)**
   - Extracts ingredients
   - Estimates glucose impact
   - Determines diabetes risk level

6. **Glucose Risk Agent (Code Node)**
   - Applies rule-based adjustments:
     - Sugary drinks increase glucose score
     - Processed carbs increase risk
     - Whole foods may reduce impact

7. **Sugar Detection**
   - Classifies sugar sources:
     - Added sugars (e.g., syrup, soda)
     - Hidden sugars (e.g., sauces)
     - Natural sugars (e.g., fruit)

8. **Response Formatting**
   - Returns structured JSON including:
     - vegan status
     - glucose score
     - diabetes risk
     - coaching tips

---

## Architecture Role

> Frontend → Webhook → n8n Workflow → AI + Rules → Structured Response → UI

---

## Hosting

- n8n hosted on VPS (Hostinger)
- Exposed via secure webhook URL