export interface MealAnalysisResult {
  meal_summary: string;

  // New shape
  ingredients: string[];
  is_vegan: boolean;
  confidence: "low" | "medium" | "high";
  glucose_spike_score: number;
  diabetes_risk_level: "low" | "moderate" | "high";
  glucose_considerations: string;
  suggested_swap: string;
  coaching_tip: string;

  // Backward-compatible fields still used by existing components
  likely_ingredients: string[];
  vegan_status: string;
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

export async function analyzeMeal(): Promise<MealAnalysisResult> {
  await delay(1500);

  const ingredients = ["tofu", "broccoli", "brown rice", "carrots"];
  const isVegan = true;

  return {
    meal_summary: "Tofu vegetable grain bowl",

    // New shape
    ingredients,
    is_vegan: isVegan,
    confidence: "high",
    glucose_spike_score: 32,
    diabetes_risk_level: "moderate",
    glucose_considerations:
      "Balanced meal with fiber and protein. Portion size of grains may still matter.",
    suggested_swap: "Add more greens if you want a lower-carb version.",
    coaching_tip:
      "Pair grains with legumes, tofu, or extra non-starchy vegetables for steadier glucose support.",

    // Backward-compatible shape
    likely_ingredients: ingredients,
    vegan_status: isVegan ? "vegan" : "not vegan",
  };
}

export async function scanBarcode(barcode: string): Promise<BarcodeResult> {
  await delay(1200);

  void barcode;

  return {
    vegan_status: "not clearly vegan",
    concerning_ingredients: ["whey", "added sugar"],
    diabetes_considerations: "Contains added sugars and processed ingredients.",
    recommendation: "Best as an occasional item.",
    alternative_suggestion: "Choose unsweetened plant-based yogurt.",
  };
}

export async function generateMealPlan(preferences: {
  dietary: string;
  allergies: string;
  goal: string;
}): Promise<MealPlanResult> {
  await delay(2000);

  void preferences;

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