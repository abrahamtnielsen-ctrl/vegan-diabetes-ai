import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    average_glucose_spike_score: 31,
    meal_count: 3,
    risk_breakdown: {
      low: 2,
      moderate: 1,
      high: 0,
    },
    highest_risk_meal: {
      meal_summary:
        "A tofu bowl served with brown rice and broccoli, providing a balanced plant-based meal with protein, complex carbohydrates, and fiber.",
      glucose_spike_score: 32,
      diabetes_risk_level: "moderate",
    },
    coach_summary:
      "Your latest meals show improving glucose stability. Most saved meals are moderate impact, and you are building a balanced pattern with room to improve further.",
  });
}