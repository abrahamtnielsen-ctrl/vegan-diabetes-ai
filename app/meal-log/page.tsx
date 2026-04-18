"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Upload, Loader2, X, Check } from "lucide-react";
import MealAnalysisResult from "@/components/MealAnalysisResult";
import { MealAnalysisResult as MealResultType } from "@/lib/mockApi";

export default function MealLogPage() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MealResultType | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const analyzeMealLive = async (): Promise<MealResultType> => {
    const response = await fetch("/api/meal-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "demo-user-1",
        meal_text: description,
        image_url: "",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to analyze meal: ${response.status} ${errorText}`);
    }

    return response.json();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setResult(null);
      setSaved(false);

      const res = await analyzeMealLive();
      setResult(res);
    } catch (error) {
      console.error("Meal analysis failed:", error);
      alert(error instanceof Error ? error.message : "Meal analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInsight = () => {
    if (!result || saved) return;

    try {
      const stored = localStorage.getItem("savedMealInsights");

      const insights = stored ? JSON.parse(stored) : [];

      const newInsight = {
        summary: result.meal_summary,
        score: result.glucose_spike_score,
        risk: result.diabetes_risk_level,
        savedAt: new Date().toISOString(),
      };

      insights.unshift(newInsight);

      // keep only latest 20 meals
      const trimmed = insights.slice(0, 20);

      localStorage.setItem("savedMealInsights", JSON.stringify(trimmed));

      setSaved(true);
    } catch (err) {
      console.error("Failed to save insight:", err);
    }
  };

  const canAnalyze =
    !loading && (description.trim().length > 0 || imagePreview !== null);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Log a Meal</h1>
        <p className="text-slate-500 mt-1">
          Upload a photo or describe your meal for AI-powered analysis.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Meal Photo <span className="text-slate-400 font-normal">(optional)</span>
          </label>

          <div
            onClick={() => {
              if (!imagePreview) fileRef.current?.click();
            }}
            className={
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors " +
              (imagePreview
                ? "border-green-300 bg-green-50"
                : "border-slate-300 cursor-pointer hover:border-green-400 hover:bg-green-50")
            }
          >
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Meal preview"
                  className="max-h-48 mx-auto rounded-lg object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-slate-200 hover:bg-red-50"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="mx-auto h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Camera className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  Click to upload a meal photo
                </p>
                <p className="text-xs text-slate-400">PNG, JPG, WebP supported</p>
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Meal Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your meal (e.g., brown rice with tofu and steamed broccoli)..."
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing Meal...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Analyze Meal
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <MealAnalysisResult result={result} />

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaveInsight}
              disabled={saved}
              className={
                "flex-1 rounded-lg py-3 px-4 font-semibold transition-colors flex items-center justify-center gap-2 " +
                (saved
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default"
                  : "bg-green-600 text-white hover:bg-green-700")
              }
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved ✓
                </>
              ) : (
                "Save Insight"
              )}
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 rounded-lg border border-slate-300 bg-white py-3 px-4 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              View Dashboard →
            </button>
          </div>

          {saved && (
            <p className="text-sm text-emerald-700 text-center animate-fade-in">
              Insight saved to your history for this demo.
            </p>
          )}
        </div>
      )}
    </div>
  );
}