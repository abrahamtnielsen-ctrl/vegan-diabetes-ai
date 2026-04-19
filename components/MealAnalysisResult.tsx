import {
  CheckCircle,
  Leaf,
  Lightbulb,
  Activity,
  AlertTriangle,
} from "lucide-react";

interface MealAnalysisResultProps {
  result: {
    input_meal?: string;
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

export default function MealAnalysisResult({
  result,
}: MealAnalysisResultProps) {
  const riskLevel = (result.diabetes_risk_level || "").toLowerCase();
  const spikeBand = (result.glucose_spike_band || "").toLowerCase();
  const veganStatus = (result.vegan_status || "").toLowerCase();
  const score = result.glucose_spike_score ?? 0;

  const isVegan = veganStatus === "vegan";
  const isNonVegan = veganStatus === "non-vegan";

  const bannerClass =
    riskLevel === "high"
      ? "bg-red-600"
      : riskLevel === "moderate"
        ? "bg-yellow-500"
        : "bg-green-600";

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

  const meterBarClass =
    score >= 70
      ? "bg-red-500"
      : score >= 30
        ? "bg-yellow-400"
        : "bg-green-500";

  const meterTextClass =
    score >= 70
      ? "text-red-100"
      : score >= 30
        ? "text-yellow-100"
        : "text-green-100";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className={`${bannerClass} px-6 py-4`}>
        {result.input_meal && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/80">
            Analyzed meal: {result.input_meal}
          </p>
        )}

        <h3 className="text-lg font-semibold text-white">{result.meal_summary}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold " +
              (isVegan
                ? "bg-green-500 text-white"
                : isNonVegan
                  ? "bg-red-500 text-white"
                  : "bg-yellow-400 text-yellow-900")
            }
          >
            <Leaf className="h-3 w-3" />
            {result.vegan_status}
          </span>

          <span className="text-xs text-white/90">
            Confidence: {result.confidence}
          </span>
        </div>

        {result.glucose_spike_score !== undefined && (
          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-white/90">
              <span>Glucose impact meter</span>
              <span className={meterTextClass}>{score}/100</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className={`h-full ${meterBarClass} transition-all duration-500`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-700">
            Likely Ingredients
          </p>

          <div className="flex flex-wrap gap-2">
            {result.likely_ingredients.map((ing) => (
              <span
                key={ing}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {(result.diabetes_risk_level || result.glucose_spike_score !== undefined) && (
          <div className="grid gap-3 md:grid-cols-2">
            {result.diabetes_risk_level && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Diabetes Risk
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${riskBadgeClass}`}
                  >
                    {result.diabetes_risk_level}
                  </span>
                </div>

                {result.diabetes_risk_reason && (
                  <p className="mt-2 text-sm text-slate-600">
                    {result.diabetes_risk_reason}
                  </p>
                )}
              </div>
            )}

            {result.glucose_spike_score !== undefined && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">
                    Glucose Spike Score
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${spikeBadgeClass}`}
                  >
                    {result.glucose_spike_score}/100
                  </span>
                </div>

                {result.glucose_spike_explanation && (
                  <p className="mt-2 text-sm text-slate-600">
                    {result.glucose_spike_explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="text-sm font-semibold text-blue-900">
              Glucose Considerations
            </p>
            <p className="mt-0.5 text-sm text-blue-700">
              {result.glucose_considerations}
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50 p-4">
          <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              Suggested Swap
            </p>
            <p className="mt-0.5 text-sm text-amber-700">
              {result.suggested_swap}
            </p>
          </div>
        </div>

        {result.coaching_tip && (
          <div className="flex gap-3 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <Activity className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Coaching Tip
              </p>
              <p className="mt-0.5 text-sm text-emerald-700">
                {result.coaching_tip}
              </p>
            </div>
          </div>
        )}

        {result.glucose_spike_factors && result.glucose_spike_factors.length > 0 && (
          <div className="flex gap-3 rounded-lg border border-orange-100 bg-orange-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
            <div>
              <p className="text-sm font-semibold text-orange-900">
                Why this score?
              </p>
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