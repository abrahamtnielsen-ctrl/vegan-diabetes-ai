import { CheckCircle, Leaf, Lightbulb, Activity, AlertTriangle } from "lucide-react";

interface MealAnalysisResultProps {
  result: {
    meal_summary: string;
    likely_ingredients: string[];
    vegan_status: string;
    glucose_considerations: string;
    suggested_swap: string;
    confidence: string;
    diabetes_risk_level?: string;
    diabetes_risk_reason?: string;
    coaching_tip?: string;
    glucose_spike_score?: number;
    glucose_spike_band?: string;
    glucose_spike_explanation?: string;
    glucose_spike_factors?: string[];
  };
}

export default function MealAnalysisResult({ result }: MealAnalysisResultProps) {
  const isVegan = result.vegan_status?.toLowerCase().includes("vegan");

  const riskLevel = (result.diabetes_risk_level || "").toLowerCase();
  const spikeBand = (result.glucose_spike_band || "").toLowerCase();

  const riskBadgeClass =
    riskLevel === "high"
      ? "bg-red-100 text-red-700"
      : riskLevel === "moderate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-700";

  const spikeBadgeClass =
    spikeBand === "high"
      ? "bg-red-100 text-red-700"
      : spikeBand === "moderate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-700";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-green-600 px-6 py-4">
        <h3 className="text-white font-semibold text-lg">{result.meal_summary}</h3>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span
            className={
              "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold " +
              (isVegan ? "bg-green-500 text-white" : "bg-yellow-400 text-yellow-900")
            }
          >
            <Leaf className="h-3 w-3" />
            {result.vegan_status}
          </span>
          <span className="text-green-100 text-xs">Confidence: {result.confidence}</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2">Likely Ingredients</p>
          <div className="flex flex-wrap gap-2">
            {result.likely_ingredients.map((ing) => (
              <span key={ing} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                {ing}
              </span>
            ))}
          </div>
        </div>

        {(result.diabetes_risk_level || result.glucose_spike_score !== undefined) && (
          <div className="grid gap-3 md:grid-cols-2">
            {result.diabetes_risk_level && (
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">Diabetes Risk</p>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${riskBadgeClass}`}>
                    {result.diabetes_risk_level}
                  </span>
                </div>
                {result.diabetes_risk_reason && (
                  <p className="text-sm text-slate-600 mt-2">{result.diabetes_risk_reason}</p>
                )}
              </div>
            )}

            {result.glucose_spike_score !== undefined && (
              <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">Glucose Spike Score</p>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${spikeBadgeClass}`}>
                    {result.glucose_spike_score}/100
                  </span>
                </div>
                {result.glucose_spike_explanation && (
                  <p className="text-sm text-slate-600 mt-2">{result.glucose_spike_explanation}</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Glucose Considerations</p>
            <p className="text-sm text-blue-700 mt-0.5">{result.glucose_considerations}</p>
          </div>
        </div>

        <div className="flex gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Suggested Swap</p>
            <p className="text-sm text-amber-700 mt-0.5">{result.suggested_swap}</p>
          </div>
        </div>

        {result.coaching_tip && (
          <div className="flex gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
            <Activity className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-900">Coaching Tip</p>
              <p className="text-sm text-emerald-700 mt-0.5">{result.coaching_tip}</p>
            </div>
          </div>
        )}

        {result.glucose_spike_factors && result.glucose_spike_factors.length > 0 && (
          <div className="flex gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
            <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-900">Why this score?</p>
              <ul className="mt-2 space-y-1 text-sm text-orange-700">
                {result.glucose_spike_factors.map((factor) => (
                  <li key={factor}>• {factor}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}