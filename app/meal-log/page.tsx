"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Upload, Loader2, X, Check, AlertCircle } from "lucide-react";
import MealAnalysisResult from "@/components/MealAnalysisResult";
import { MealAnalysisResult as MealResultType } from "@/lib/mockApi";

type MealApiResponse = MealResultType & {
  ok?: boolean;
  error?: string;
  code?: string;
  input_meal?: string;
};

export default function MealLogPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MealResultType | null>(null);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    let data: MealApiResponse | null = null;

    try {
      data = await response.json();
    } catch {
      throw new Error("Meal analysis service returned an invalid response.");
    }

    if (!response.ok || data?.ok === false) {
      throw new Error(
        data?.error ||
          "Meal description is too vague to analyze. Please enter a more specific meal."
      );
    }

    return data as MealResultType;
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDescription(value);

    if (errorMessage) setErrorMessage(null);
    if (result) setResult(null);
    if (saved) setSaved(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        if (errorMessage) setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setResult(null);
      setSaved(false);
      setErrorMessage(null);

      const res = await analyzeMealLive();
      setResult(res);
    } catch (error) {
      console.error("Meal analysis failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Meal analysis failed. Please try again."
      );
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

      const trimmed = insights.slice(0, 20);
      localStorage.setItem("savedMealInsights", JSON.stringify(trimmed));

      setSaved(true);
    } catch (err) {
      console.error("Failed to save insight:", err);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const canAnalyze =
    !loading &&
    (description.trim().length > 0 || imagePreview !== null);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Log a Meal</h1>
        <p className="mt-1 text-slate-500">
          Upload a photo or describe your meal for AI-powered analysis.
        </p>
      </div>

      <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Meal Photo{" "}
            <span className="font-normal text-slate-400">(optional)</span>
          </label>

          <div
            onClick={() => {
              if (!imagePreview) fileRef.current?.click();
            }}
            className={
              "rounded-xl border-2 border-dashed p-8 text-center transition-colors " +
              (imagePreview
                ? "border-green-300 bg-green-50"
                : "cursor-pointer border-slate-300 hover:border-green-400 hover:bg-green-50")
            }
          >
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Meal preview"
                  className="mx-auto max-h-48 rounded-lg object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute -right-2 -top-2 rounded-full border border-slate-200 bg-white p-1 shadow-md hover:bg-red-50"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Camera className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-500">
                  Click to upload a meal photo
                </p>
                <p className="text-xs text-slate-400">
                  PNG, JPG, WebP supported
                </p>
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
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Meal Description
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe your meal (e.g., brown rice with tofu and steamed broccoli)..."
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="mt-2 text-xs text-slate-500">
            Try something specific like “oatmeal with berries and chia seeds” or
            “pepperoni pizza with soda.”
          </p>
        </div>

        {errorMessage && (
          <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:bg-slate-100 disabled:text-slate-400"
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleSaveInsight}
              disabled={saved}
              className={
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition-colors " +
                (saved
                  ? "cursor-default border border-emerald-200 bg-emerald-100 text-emerald-700"
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
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              View Dashboard →
            </button>
          </div>

          {saved && (
            <p className="animate-fade-in text-center text-sm text-emerald-700">
              Insight saved to your history for this demo.
            </p>
          )}
        </div>
      )}
    </div>
  );
}