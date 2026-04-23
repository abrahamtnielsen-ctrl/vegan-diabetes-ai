import React from "react";
import {
  Activity,
  AlertTriangle,
  Lightbulb,
  HeartPulse,
  ShieldAlert,
  CheckCircle,
  Lock,
} from "lucide-react";

export type SugarSource = {
  name: string;
  type: "added sugar" | "hidden sugar" | "natural sugar" | string;
  impact: "low" | "moderate" | "high" | "unknown" | string;
};

export type Result = {
  ok: boolean;
  code?: string;
  analysis_status?: string;
  route?: string;
  input_meal?: string;
  meal_summary: string;
  ingredients?: string[];
  likely_ingredients?: string[];
  is_vegan?: boolean;
  vegan_status: string;
  confidence: string;
  glucose_spike_score?: number | null;
  glucose_meter_stopped?: boolean;
  diabetes_risk_level?: "low" | "moderate" | "high" | string;
  diabetes_risk_reason?: string;
  glucose_considerations: string;
  suggested_swap: string;
  coaching_tip: string;
  glucose_spike_band?: string;
  glucose_spike_explanation?: string;
  glucose_spike_factors?: string[];
  sugar_sources?: SugarSource[];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function sugarTypeLabel(type: string) {
  if (type === "hidden sugar") return "hidden sugar (sauce/condiment)";
  return type;
}

function sugarTypeClass(type: string) {
  switch (type) {
    case "added sugar":
      return "bg-red-100 text-red-700";
    case "hidden sugar":
      return "bg-amber-100 text-amber-700";
    case "natural sugar":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function sugarImpactClass(impact: string) {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-700";
    case "moderate":
      return "bg-amber-100 text-amber-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function riskText(riskLevel?: string) {
  if (riskLevel === "high") return "High glucose impact expected";
  if (riskLevel === "moderate") return "Moderate glucose impact";
  return "Low glucose impact";
}

export default function MealAnalysisResult({ result }: { result: Result }) {
  if (!result) return null;

  const veganStatus = (result.vegan_status || "").toLowerCase();
  const confidence = (result.confidence || "").toLowerCase();
  const riskLevel = (result.diabetes_risk_level || "").toLowerCase();
  const spikeBand = (result.glucose_spike_band || "").toLowerCase();

  const isVegan = veganStatus === "vegan";
  const isNonVegan = veganStatus === "non-vegan";

  const isBlocked =
    result.analysis_status === "blocked" ||
    result.code === "NON_VEGAN_DETECTED" ||
    result.glucose_meter_stopped === true ||
    isNonVegan;

  const isLowConfidence = confidence === "low";

  const rawScore = result.glucose_spike_score;
  const score = !isBlocked && typeof rawScore === "number" ? rawScore : 0;
  const hasScore = !isBlocked && typeof rawScore === "number";

  const sugarSources =
    !isBlocked && Array.isArray(result.sugar_sources)
      ? result.sugar_sources.filter(
          (item): item is SugarSource => Boolean(item && item.name && item.type)
        )
      : [];

  const primarySugar =
    sugarSources.find((s) => s.impact === "high") || sugarSources[0];

  const bannerClass = isBlocked
    ? "bg-red-600"
    : riskLevel === "high"
      ? "bg-red-600"
      : riskLevel === "moderate"
        ? "bg-yellow-500"
        : "bg-green-600";

  const riskBadgeClass = isBlocked
    ? "bg-red-100 text-red-700"
    : riskLevel === "high"
      ? "bg-red-100 text-red-700"
      : riskLevel === "moderate"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-700";

  const spikeBadgeClass = isBlocked
    ? "border border-red-300 bg-red-200 text-red-800"
    : spikeBand === "high"
      ? "bg-red-100 text-red-700"
      : spikeBand === "moderate"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-700";

  const meterBarClass = isBlocked
    ? "bg-red-500"
    : score >= 70
      ? "bg-red-500"
      : score >= 30
        ? "bg-yellow-400"
        : "bg-green-500";

  const meterTextClass = isBlocked
    ? "text-red-100"
    : score >= 70
      ? "text-red-100"
      : score >= 30
        ? "text-yellow-100"
        : "text-green-100";

  const scoreLabel = isBlocked ? "Not evaluated" : `${score}/100`;
  const meterWidth = isBlocked ? "0%" : `${score}%`;

  const ingredients =
    Array.isArray(result.likely_ingredients) && result.likely_ingredients.length > 0
      ? result.likely_ingredients
      : [];

  return (
    <div className="mt-6 space-y-6">
      <div className={cx("rounded-xl p-5 text-white shadow-sm", bannerClass)}>
        <p className="text-xs uppercase tracking-wide opacity-80">Analyzed meal</p>

        <h2 className="mt-1 text-lg font-semibold">
          {result.meal_summary || result.input_meal}
        </h2>

        {!isBlocked && (
          <p className="mt-1 text-sm opacity-90">{riskText(riskLevel)}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="flex items-center gap-1">
            {isVegan ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            {result.vegan_status}
          </span>

          <span>Confidence: {result.confidence}</span>

          {isBlocked && (
            <span className="rounded bg-white/20 px-2 py-0.5 text-xs">
              <span className="inline-flex items-center gap-1">
                <Lock size={12} />
                Blocked by guidelines
              </span>
            </span>
          )}
        </div>

        <div className="mt-4">
          <p className="text-xs opacity-80">Glucose impact meter</p>

          {isBlocked ? (
            <p className="mt-1 text-sm">Not evaluated</p>
          ) : (
            <>
              <div className="mt-2 flex items-center justify-between text-xs opacity-90">
                <span>Estimated glucose impact</span>
                <span className={meterTextClass}>{scoreLabel}</span>
              </div>

              <div className="mt-2 h-2 w-full rounded bg-white/30">
                <div
                  className={cx("h-2 rounded transition-all", meterBarClass)}
                  style={{ width: meterWidth }}
                />
              </div>
            </>
          )}

          {isBlocked && (
            <p className="mt-2 text-xs opacity-85">
              Glucose scoring was not performed because this meal does not meet
              PlantRx vegan guidelines.
            </p>
          )}
        </div>
      </div>

      {isLowConfidence && !isBlocked && (
        <div className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50 p-4">
          <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              Low Confidence Analysis
            </p>
            <p className="text-sm text-amber-700">
              Add more meal detail for a more reliable result.
            </p>
          </div>
        </div>
      )}

      {ingredients.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-700">
            Likely Ingredients
          </p>

          <div className="flex flex-wrap gap-2">
            {ingredients.map((item) => (
              <span
                key={item}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {isBlocked && (
        <div className="flex gap-3 rounded-lg border border-red-100 bg-red-50 p-4">
          <ShieldAlert className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-semibold text-red-900">
              PlantRx Guideline Block
            </p>
            <p className="mt-0.5 text-sm text-red-700">
              This meal includes non-vegan ingredients. PlantRx stops glucose
              scoring and meal approval for inputs outside its vegan support
              guidelines.
            </p>
          </div>
        </div>
      )}

      {sugarSources.length > 0 && (
        <div className="flex gap-3 rounded-lg border border-orange-100 bg-orange-50 p-4">
          <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-orange-600" />
          <div className="w-full">
            <p className="text-sm font-semibold text-orange-900">
              Sugar Sources Detected
            </p>

            <p className="mt-1 text-sm text-orange-700">
              This meal contains sugar sources that may impact blood glucose levels.
            </p>

            <p className="mb-2 mt-2 text-xs text-slate-500">
              Highlighting ingredients contributing to sugar impact:
            </p>

            <div className="space-y-2">
              {sugarSources.map((source) => (
                <div
                  key={`${source.name}-${source.type}`}
                  className="rounded-lg border border-orange-100 bg-white/70 p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-800">
                      {source.name}
                    </span>

                    <span
                      className={cx(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        sugarTypeClass(source.type)
                      )}
                    >
                      {sugarTypeLabel(source.type)}
                    </span>

                    <span
                      className={cx(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        sugarImpactClass(source.impact)
                      )}
                    >
                      {source.impact} impact
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {primarySugar && (
              <div className="mt-3 text-xs font-medium text-red-700">
                Primary driver: {primarySugar.name}
              </div>
            )}

            <div className="mt-3 rounded bg-orange-100 p-3 text-sm text-orange-900">
              Added sugar can raise glucose quickly, hidden sugar in sauces and
              condiments is easy to miss, and natural sugar can still raise blood
              glucose depending on portion size and meal composition.
            </div>
          </div>
        </div>
      )}

      {(result.diabetes_risk_level || hasScore || isBlocked) && (
        <div className="grid gap-4 md:grid-cols-2">
          {result.diabetes_risk_level && (
            <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
              <p className="text-xs text-slate-500">Diabetes Risk</p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={cx(
                    "rounded-full px-2 py-1 text-xs font-medium capitalize",
                    riskBadgeClass
                  )}
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

          {(hasScore || isBlocked) && (
            <div className="rounded-lg bg-slate-50 p-4 shadow-sm">
              <p className="text-xs text-slate-500">Glucose Spike Score</p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={cx(
                    "rounded-full px-2 py-1 text-xs font-medium",
                    spikeBadgeClass
                  )}
                >
                  {scoreLabel}
                </span>
              </div>

              {isBlocked ? (
                <p className="mt-2 text-sm text-slate-600">
                  This score was intentionally not evaluated because the meal
                  does not meet PlantRx vegan guidelines.
                </p>
              ) : result.glucose_spike_explanation ? (
                <p className="mt-2 text-sm text-slate-600">
                  {result.glucose_spike_explanation}
                </p>
              ) : null}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex gap-3 rounded-lg bg-blue-50 p-4">
          <Activity className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="text-sm font-semibold text-blue-900">
              Glucose Considerations
            </p>
            <p className="mt-1 text-sm text-blue-700">
              {result.glucose_considerations}
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-lg bg-yellow-50 p-4">
          <Lightbulb className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div>
            <p className="text-sm font-semibold text-yellow-900">
              Suggested Swap
            </p>
            <p className="mt-1 text-sm text-yellow-700">
              {result.suggested_swap || "N/A"}
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-lg bg-green-50 p-4">
          <HeartPulse className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
          <div>
            <p className="text-sm font-semibold text-green-900">
              Coaching Tip
            </p>
            <p className="mt-1 text-sm text-green-700">
              {result.coaching_tip}
            </p>
          </div>
        </div>
      </div>

      {!isBlocked &&
        result.glucose_spike_factors &&
        result.glucose_spike_factors.length > 0 && (
          <div className="flex gap-3 rounded-lg border border-orange-100 bg-orange-50 p-4">
            <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-orange-600" />
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
  );
}