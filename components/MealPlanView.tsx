import { Utensils } from "lucide-react";

interface MealPlanViewProps {
  weeklyPlan: Record<string, string[]>;
}

const mealLabels = ["Breakfast", "Lunch", "Dinner"];

const dayColors: Record<string, string> = {
  Monday: "bg-green-50 border-green-200",
  Tuesday: "bg-blue-50 border-blue-200",
  Wednesday: "bg-purple-50 border-purple-200",
  Thursday: "bg-amber-50 border-amber-200",
  Friday: "bg-rose-50 border-rose-200",
  Saturday: "bg-cyan-50 border-cyan-200",
  Sunday: "bg-orange-50 border-orange-200",
};

export default function MealPlanView({ weeklyPlan }: MealPlanViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(weeklyPlan).map(([day, meals]) => (
        <div key={day} className={"rounded-xl border p-4 " + (dayColors[day] ?? "bg-slate-50 border-slate-200")}>
          <p className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">{day}</p>
          <div className="space-y-2.5">
            {meals.map((meal, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Utensils className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500">{mealLabels[idx] ?? "Meal " + (idx + 1)}</p>
                  <p className="text-sm text-slate-700">{meal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
