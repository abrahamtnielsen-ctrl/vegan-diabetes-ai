"use client";

import { useEffect, useState } from "react";
import { Clock, Salad, Activity, AlertTriangle } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

type RiskLevel = "low" | "moderate" | "high";

type SavedMealInsight = {
  summary: string;
  score: number;
  risk: RiskLevel;
  savedAt: string;
};

function getRiskStyles(level: RiskLevel) {
  if (level === "high") {
    return {
      label: "High impact",
      pill: "bg-rose-100 text-rose-700 border border-rose-200",
      card: "border-rose-200 bg-rose-50",
    };
  }

  if (level === "moderate") {
    return {
      label: "Moderate impact",
      pill: "bg-amber-100 text-amber-700 border border-amber-200",
      card: "border-amber-200 bg-amber-50",
    };
  }

  return {
    label: "Low impact",
    pill: "bg-green-100 text-green-700 border border-green-200",
    card: "border-green-200 bg-green-50",
  };
}

export default function HistoryPage() {
  const [savedMeals, setSavedMeals] = useState<SavedMealInsight[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedMealInsights");
      const parsed: SavedMealInsight[] = stored ? JSON.parse(stored) : [];
      setSavedMeals(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Failed to load meal history:", err);
      setSavedMeals([]);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Meal History</h1>
        <p className="text-slate-500 mt-1">
          Review your saved AI meal insights and glucose-aware nutrition patterns.
        </p>
      </div>

      <DashboardCard
        title="Saved Insights"
        subtitle={`${savedMeals.length} saved meal${savedMeals.length === 1 ? "" : "s"}`}
        icon={<Clock className="h-5 w-5" />}
      >
        {savedMeals.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Salad className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No saved meals yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Save an analyzed meal to start building your history.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedMeals.map((meal, index) => {
              const riskStyles = getRiskStyles(meal.risk);

              return (
                <div
                  key={`${meal.savedAt}-${index}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                          <Salad className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Saved Meal Insight
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(meal.savedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <p className="text-base font-medium text-slate-900 leading-7">
                        {meal.summary}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${riskStyles.pill}`}>
                          {riskStyles.label}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
                          Score {meal.score}/100
                        </span>
                      </div>
                    </div>

                    <div className={`rounded-xl border p-3 sm:w-56 ${riskStyles.card}`}>
                      <div className="flex items-start gap-2">
                        <Activity className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-700" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Glucose-aware summary
                          </p>
                          <p className="mt-1 text-xs text-slate-700">
                            This saved meal was categorized as {meal.risk} impact with a score of {meal.score}/100.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {meal.risk === "high" && (
                    <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-600" />
                        <p className="text-sm text-rose-800">
                          Higher-impact meal detected. Consider balancing future meals with more fiber,
                          legumes, tofu, or non-starchy vegetables.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </DashboardCard>
    </div>
  );
}