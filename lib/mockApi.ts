export interface MealAnalysisResult {
  meal_summary: string;
  likely_ingredients: string[];
  vegan_status: string;
  glucose_considerations: string;
  suggested_swap: string;
  confidence: string;
}

export interface BarcodeResult {
  vegan_status: string;
  concerning_ingredients: string[];
  diabetes_considerations: string;
  recommendation: string;
  alternative_suggestion: string;
}

export interface WeeklyPlan {
  [day: string]: string[];
}

export interface GroceryList {
  [category: string]: string[];
}

export interface MealPlanResult {
  weekly_plan: WeeklyPlan;
  grocery_list: GroceryList;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeMeal(_description: string): Promise<MealAnalysisResult> {
  await delay(1500);
  return {
    meal_summary: "Tofu vegetable grain bowl",
    likely_ingredients: ["tofu", "broccoli", "brown rice", "carrots"],
    vegan_status: "vegan",
    glucose_considerations:
      "Balanced meal with fiber and protein. Portion size of grains may still matter.",
    suggested_swap: "Add more greens if you want a lower-carb version.",
    confidence: "high",
  };
}

export async function scanBarcode(_barcode: string): Promise<BarcodeResult> {
  await delay(1200);
  return {
    vegan_status: "not clearly vegan",
    concerning_ingredients: ["whey", "added sugar"],
    diabetes_considerations: "Contains added sugars and processed ingredients.",
    recommendation: "Best as an occasional item.",
    alternative_suggestion: "Choose unsweetened plant-based yogurt.",
  };
}

export async function generateMealPlan(_preferences: {
  dietary: string;
  allergies: string;
  goal: string;
}): Promise<MealPlanResult> {
  await delay(2000);
  return {
    weekly_plan: {
      Monday: ["Oatmeal with berries", "Lentil salad", "Tofu stir-fry"],
      Tuesday: ["Chia pudding", "Bean soup", "Quinoa vegetable bowl"],
      Wednesday: ["Smoothie", "Chickpea wrap", "Vegetable chili"],
    },
    grocery_list: {
      Vegetables: ["broccoli", "spinach", "carrots"],
      Legumes: ["lentils", "black beans", "chickpeas"],
      Grains: ["oats", "quinoa", "brown rice"],
    },
  };
}
