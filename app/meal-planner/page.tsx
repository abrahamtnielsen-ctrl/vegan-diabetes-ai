"use client";
import { useState } from "react";
import { Calendar, Loader2, Sparkles, ShoppingCart } from "lucide-react";
import MealPlanView from "@/components/MealPlanView";
import GroceryListView from "@/components/GroceryListView";
import { generateMealPlan, MealPlanResult } from "@/lib/mockApi";

export default function MealPlannerPage() {
  const [dietary, setDietary] = useState("");
  const [allergies, setAllergies] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MealPlanResult | null>(null);
  const [activeTab, setActiveTab] = useState<"plan" | "grocery">("plan");

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    const res = await generateMealPlan({ dietary, allergies, goal });
    setResult(res);
    setLoading(false);
    setActiveTab("plan");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Meal Planner</h1>
        <p className="text-slate-500 mt-1">Generate a personalized vegan weekly meal plan for your diabetes management goals.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" /> Your Preferences
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Dietary Preferences</label>
            <input type="text" value={dietary} onChange={(e) => setDietary(e.target.value)} placeholder="e.g., high fiber, low glycemic" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Allergies / Avoid</label>
            <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="e.g., peanuts, soy" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Weekly Goal</label>
            <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., lower A1C, weight loss" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Generating Plan...</>
          ) : (
            <><Sparkles className="h-4 w-4" /> Generate Weekly Plan</>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="flex gap-1 bg-white rounded-xl border border-slate-200 shadow-sm p-1 w-fit">
            <button
              onClick={() => setActiveTab("plan")}
              className={"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors " + (activeTab === "plan" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-700")}
            >
              <Calendar className="h-4 w-4" /> Weekly Plan
            </button>
            <button
              onClick={() => setActiveTab("grocery")}
              className={"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors " + (activeTab === "grocery" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-700")}
            >
              <ShoppingCart className="h-4 w-4" /> Grocery List
            </button>
          </div>
          {activeTab === "plan" ? <MealPlanView weeklyPlan={result.weekly_plan} /> : <GroceryListView groceryList={result.grocery_list} />}
        </div>
      )}
    </div>
  );
}
