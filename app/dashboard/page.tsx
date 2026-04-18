"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Camera,
  QrCode,
  Calendar,
  TrendingUp,
  Clock,
  Activity,
  Flame,
  Salad,
  BarChart3,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import QuickActionCard from "@/components/QuickActionCard";
import GlucoseChart from "@/components/GlucoseChart";

type RiskLevel = "low" | "moderate" | "high";

type DashboardInsight = {
  meal_summary: string;
  glucose_spike_score: number;
  diabetes_risk_level: RiskLevel;
};

type DailyDashboardResponse = {
  average_glucose_spike_score: number;
  meal_count: number;
  risk_breakdown: {
    low: number;
    moderate: number;
    high: number;
  };
  highest_risk_meal: DashboardInsight;
  coach_summary: string;
};

type RecentMeal = {
  time: string;
  name: string;
  type: string;
  impact: RiskLevel;
  score: number;
};

type SavedMealInsight = {
  summary: string;
  score: number;
  risk: RiskLevel;
  savedAt: string;
};

const fallbackDashboard: DailyDashboardResponse = {
  average_glucose_spike_score: 34,
  meal_count: 3,
  risk_breakdown: {
    low: 2,
    moderate: 1,
    high: 0,
  },
  highest_risk_meal: {
    meal_summary: "Oatmeal with berries and flaxseed",
    glucose_spike_score: 41,
    diabetes_risk_level: "moderate",
  },
  coach_summary:
    "Today’s meals were mostly balanced. Continue pairing carbohydrates with fiber and plant protein for steadier glucose-friendly meals.",
};

const recentMeals: RecentMeal[] = [
  {
    time: "8:00 AM",
    name: "Oatmeal with berries and flaxseed",
    type: "Breakfast",
    impact: "moderate",
    score: 41,
  },
  {
    time: "12:30 PM",
    name: "Lentil soup with whole grain bread",
    type: "Lunch",
    impact: "low",
    score: 24,
  },
  {
    time: "3:00 PM",
    name: "Apple with almond butter",
    type: "Snack",
    impact: "low",
    score: 18,
  },
];

const weeklyPreview: Record<string, string[]> = {
  Monday: ["Oatmeal", "Lentil Salad", "Tofu Stir-fry"],
  Tuesday: ["Chia Pudding", "Bean Soup", "Quinoa Bowl"],
  Wednesday: ["Smoothie", "Chickpea Wrap", "Vegetable Chili"],
};

const dayAbbr: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getRiskStyles(level: RiskLevel) {
  if (level === "high") {
    return {
      label: "High impact",
      pill: "bg-rose-100 text-rose-700 border border-rose-200",
      panel: "bg-rose-50 border-rose-200",
    };
  }

  if (level === "moderate") {
    return {
      label: "Moderate impact",
      pill: "bg-amber-100 text-amber-700 border border-amber-200",
      panel: "bg-amber-50 border-amber-200",
    };
  }

  return {
    label: "Low impact",
    pill: "bg-green-100 text-green-700 border border-green-200",
    panel: "bg-green-50 border-green-200",
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DailyDashboardResponse>(fallbackDashboard);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("just now");
  const [savedInsights, setSavedInsights] = useState<SavedMealInsight[]>([]);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const response = await fetch("/api/daily-risk-dashboard", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Dashboard API unavailable");
        }

        const data = (await response.json()) as Partial<DailyDashboardResponse>;

        if (!active) return;

        setLastUpdated("just now");
        setDashboardData({
          average_glucose_spike_score:
            typeof data.average_glucose_spike_score === "number"
              ? data.average_glucose_spike_score
              : fallbackDashboard.average_glucose_spike_score,
          meal_count:
            typeof data.meal_count === "number"
              ? data.meal_count
              : fallbackDashboard.meal_count,
          risk_breakdown: {
            low:
              typeof data.risk_breakdown?.low === "number"
                ? data.risk_breakdown.low
                : fallbackDashboard.risk_breakdown.low,
            moderate:
              typeof data.risk_breakdown?.moderate === "number"
                ? data.risk_breakdown.moderate
                : fallbackDashboard.risk_breakdown.moderate,
            high:
              typeof data.risk_breakdown?.high === "number"
                ? data.risk_breakdown.high
                : fallbackDashboard.risk_breakdown.high,
          },
          highest_risk_meal: {
            meal_summary:
              typeof data.highest_risk_meal?.meal_summary === "string"
                ? data.highest_risk_meal.meal_summary
                : fallbackDashboard.highest_risk_meal.meal_summary,
            glucose_spike_score:
              typeof data.highest_risk_meal?.glucose_spike_score === "number"
                ? data.highest_risk_meal.glucose_spike_score
                : fallbackDashboard.highest_risk_meal.glucose_spike_score,
            diabetes_risk_level:
              data.highest_risk_meal?.diabetes_risk_level === "low" ||
              data.highest_risk_meal?.diabetes_risk_level === "moderate" ||
              data.highest_risk_meal?.diabetes_risk_level === "high"
                ? data.highest_risk_meal.diabetes_risk_level
                : fallbackDashboard.highest_risk_meal.diabetes_risk_level,
          },
          coach_summary:
            typeof data.coach_summary === "string" && data.coach_summary.trim().length > 0
              ? data.coach_summary
              : fallbackDashboard.coach_summary,
        });
      } catch {
        if (active) {
          setLastUpdated("just now");
          setDashboardData(fallbackDashboard);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedMealInsights");
      const parsed: SavedMealInsight[] = stored ? JSON.parse(stored) : [];
      setSavedInsights(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Failed to load saved meal insights:", err);
      setSavedInsights([]);
    }
  }, []);

  const greeting = getGreeting();
  const weeklyHealthScore = 78;
  const avgGlucose = 121;
  const streakDays = 5;
  const veganMealRate = 100;
  const mealsLoggedThisWeek = 14;

  const highestRiskStyles = getRiskStyles(dashboardData.highest_risk_meal.diabetes_risk_level);

  const latestSavedInsight = savedInsights[0];

  const recentMealsFromStorage: RecentMeal[] = savedInsights.slice(0, 3).map(
    (meal: SavedMealInsight) => ({
      time: new Date(meal.savedAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      name: meal.summary,
      type: "Saved Meal",
      impact: meal.risk,
      score: meal.score,
    })
  );

  const displayedRecentMeals =
    recentMealsFromStorage.length > 0 ? recentMealsFromStorage : recentMeals;

  const savedScores = savedInsights.map((meal: SavedMealInsight) => meal.score);

  const averageSavedScore =
    savedScores.length > 0
      ? Math.round(
          savedScores.reduce((sum: number, score: number) => sum + score, 0) /
            savedScores.length
        )
      : dashboardData.average_glucose_spike_score;

  const highestSavedMeal: SavedMealInsight | null =
    savedInsights.length > 0
      ? savedInsights.reduce(
          (highest: SavedMealInsight, current: SavedMealInsight) =>
            current.score > highest.score ? current : highest
        )
      : null;

  const recentThreeMeals: SavedMealInsight[] = savedInsights.slice(0, 3);
  const olderThreeMeals: SavedMealInsight[] = savedInsights.slice(3, 6);

  const recentAverage =
    recentThreeMeals.length > 0
      ? Math.round(
          recentThreeMeals.reduce(
            (sum: number, meal: SavedMealInsight) => sum + meal.score,
            0
          ) / recentThreeMeals.length
        )
      : null;

  const olderAverage =
    olderThreeMeals.length > 0
      ? Math.round(
          olderThreeMeals.reduce(
            (sum: number, meal: SavedMealInsight) => sum + meal.score,
            0
          ) / olderThreeMeals.length
        )
      : null;

  const trendMessage =
    recentAverage !== null && olderAverage !== null
      ? recentAverage < olderAverage
        ? `Your latest meals show improving glucose stability (${olderAverage} → ${recentAverage}).`
        : recentAverage > olderAverage
        ? `Your latest meals show a slightly higher glucose impact (${olderAverage} → ${recentAverage}).`
        : `Your recent meals are staying consistent around ${recentAverage}/100.`
      : "Keep pairing carbohydrates with fiber and plant protein for steadier glucose-friendly meals.";

  const moderateCount = savedInsights.filter(
    (meal: SavedMealInsight) => meal.risk === "moderate"
  ).length;

  const lowCount = savedInsights.filter(
    (meal: SavedMealInsight) => meal.risk === "low"
  ).length;

  const highCount = savedInsights.filter(
    (meal: SavedMealInsight) => meal.risk === "high"
  ).length;

  const patternInsight =
    savedInsights.length === 0
      ? "Start saving meals to unlock personalized glucose-aware pattern detection."
      : highCount > 0
      ? `You have ${highCount} higher-impact saved meal${highCount === 1 ? "" : "s"}. Consider lowering refined carbohydrate load and pairing meals with more fiber or plant protein.`
      : moderateCount >= 2
      ? `Most of your saved meals are moderate impact (${moderateCount}/${savedInsights.length}). You are building a balanced pattern, with room to improve glucose stability further.`
      : lowCount >= 2
      ? `Your saved meals are trending lower impact (${lowCount}/${savedInsights.length}). Your recent choices appear supportive of steadier glucose-friendly patterns.`
      : "Your saved meal pattern is still developing. Keep logging meals to strengthen your AI coaching insights.";

  const kpis = useMemo(
    () => [
      {
        label: "Weekly Health Score",
        value: `${weeklyHealthScore}/100`,
        trend: "Steady whole-food choices this week",
        icon: <Sparkles className="h-5 w-5" />,
        hero: true,
        accentClass: "bg-green-500",
      },
      {
        label: "Avg. Glucose",
        value: `${avgGlucose} mg/dL`,
        trend: "Down 3% vs last week",
        icon: <TrendingUp className="h-5 w-5" />,
        hero: false,
        accentClass: "bg-emerald-500",
      },
      {
        label: "Meals Logged",
        value: `${mealsLoggedThisWeek}`,
        trend: `${dashboardData.meal_count} analyzed today`,
        icon: <Camera className="h-5 w-5" />,
        hero: false,
        accentClass: "bg-blue-500",
      },
      {
        label: "Plant-Based Streak",
        value: `${streakDays} days`,
        trend: `${veganMealRate}% vegan meals this week`,
        icon: <Flame className="h-5 w-5" />,
        hero: false,
        accentClass: "bg-orange-500",
      },
    ],
    [dashboardData.meal_count, weeklyHealthScore, avgGlucose, streakDays, veganMealRate, mealsLoggedThisWeek]
  );

  const aiInsightBullets = latestSavedInsight
    ? [
        `Average saved meal score: ${averageSavedScore}/100.`,
        highestSavedMeal
          ? `Highest saved meal impact: ${highestSavedMeal.summary} (${highestSavedMeal.score}/100).`
          : `Most recent saved meal: ${latestSavedInsight.summary}.`,
        trendMessage,
        patternInsight,
      ]
    : [
        `Average glucose spike score today: ${dashboardData.average_glucose_spike_score}/100.`,
        `Highest-risk meal today: ${dashboardData.highest_risk_meal.meal_summary} (${dashboardData.highest_risk_meal.glucose_spike_score}/100).`,
        dashboardData.coach_summary,
      ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-cyan-50 p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-3 py-1 text-xs font-semibold text-green-700">
              <Brain className="h-3.5 w-3.5" />
              Daily Glucose Risk Dashboard
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              {greeting}, Abraham
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Your AI nutrition coach is seeing steadier patterns this week. Plant-based meals with
              fiber and legumes continue to support lower glucose impact.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                AI Coach Active
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {dashboardData.meal_count} meals analyzed today
              </span>
              <span className="inline-flex items-center rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-600">
                Last updated: {lastUpdated}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Today&apos;s Focus
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Pair grains with legumes or tofu to keep meals balanced and glucose-aware.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Suggested Meal
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Tofu quinoa bowl with roasted vegetables and tahini drizzle
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px] lg:grid-cols-1">
            <div className="flex items-center justify-between rounded-xl border border-green-200 bg-white p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Plant-Based Streak
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{streakDays} days</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Flame className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-cyan-200 bg-white p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Weekly Health Score
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{weeklyHealthScore}/100</p>
                <p className="mt-1 text-xs text-slate-500">
                  Great consistency with whole-food meals.
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                <Activity className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={
              "rounded-xl border p-4 shadow-sm " +
              (kpi.hero
                ? "border-green-200 bg-gradient-to-br from-green-50 to-white"
                : "border-slate-200 bg-white")
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {kpi.label}
                </p>
                <p className={"mt-2 font-bold text-slate-900 " + (kpi.hero ? "text-3xl" : "text-2xl")}>
                  {kpi.value}
                </p>
              </div>

              <div
                className={
                  "flex h-10 w-10 items-center justify-center rounded-xl text-white " + kpi.accentClass
                }
              >
                {kpi.icon}
              </div>
            </div>

            <p className="mt-3 flex items-center gap-1 text-xs font-medium text-green-600">
              <ArrowRight className="h-3.5 w-3.5" />
              {kpi.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardCard
            title="Weekly Glucose Trend"
            subtitle="7-day view of your glucose pattern and meal-aware progress"
            icon={<TrendingUp className="h-5 w-5" />}
          >
            <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Glucose average is stabilizing</p>
                <p className="text-xs text-slate-500">
                  Continue balancing grains with legumes, vegetables, and plant protein.
                </p>
              </div>
              <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Down 3%
              </div>
            </div>
            <GlucoseChart />
          </DashboardCard>
        </div>

        <DashboardCard
          title="AI Insight of the Day"
          subtitle={loading ? "Loading latest pattern..." : "Generated from recent meal insights"}
          icon={<Brain className="h-5 w-5 text-purple-500" />}
        >
          <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 via-indigo-50 to-white p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <Brain className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Coach Summary</p>
                  <p className="text-xs text-slate-500">Supportive nutrition guidance only</p>
                </div>
              </div>

              <span className="rounded-full bg-purple-200 px-2.5 py-1 text-xs font-semibold text-purple-800">
                Confidence: High
              </span>
            </div>

            <ul className="space-y-3">
              {aiInsightBullets.map((insight: string, index: number) => (
                <li key={index} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>

            <div className={"mt-4 rounded-xl border p-3 " + highestRiskStyles.panel}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {highestSavedMeal ? "Highest saved meal" : "Highest-risk meal today"}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-700">
                    {highestSavedMeal
                      ? highestSavedMeal.summary
                      : dashboardData.highest_risk_meal.meal_summary}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Score{" "}
                    {highestSavedMeal
                      ? highestSavedMeal.score
                      : dashboardData.highest_risk_meal.glucose_spike_score}
                    /100 ·{" "}
                    {highestSavedMeal
                      ? highestSavedMeal.risk
                      : dashboardData.highest_risk_meal.diabetes_risk_level}{" "}
                    risk
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center space-y-1">
            <p className="text-xs text-slate-400">
              Personalized from saved meal insights and daily glucose-risk patterns
            </p>
            <p className="text-xs font-medium text-purple-600">
              Last updated: {lastUpdated}
            </p>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Quick Actions" subtitle="Your core AI health workflows for today">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QuickActionCard
            icon={<Camera className="h-6 w-6" />}
            label="Log a Meal"
            description="Upload a meal for AI glucose-aware analysis"
            onClick={() => router.push("/meal-log")}
            color="green"
          />
          <QuickActionCard
            icon={<QrCode className="h-6 w-6" />}
            label="Scan Barcode"
            description="Check vegan status and diabetes-related concerns"
            onClick={() => router.push("/barcode-scan")}
            color="blue"
          />
          <QuickActionCard
            icon={<Calendar className="h-6 w-6" />}
            label="Generate Meal Plan"
            description="Build a personalized plant-based weekly plan"
            onClick={() => router.push("/meal-planner")}
            color="purple"
          />
          <QuickActionCard
            icon={<BarChart3 className="h-6 w-6" />}
            label="View Glucose Trends"
            description="Review your daily risk pattern and trend summary"
            onClick={() => router.push("/dashboard")}
            color="green"
          />
        </div>
      </DashboardCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard
          title="Recent Meals"
          subtitle={`Today — ${displayedRecentMeals.length} meals available`}
          icon={<Clock className="h-5 w-5" />}
        >
          <div className="space-y-3">
            {displayedRecentMeals.map((meal) => {
              const riskStyles = getRiskStyles(meal.impact);

              return (
                <div
                  key={`${meal.time}-${meal.name}`}
                  onClick={() => {
                    try {
                      const selectedMeal = {
                        summary: meal.name,
                        score: meal.score,
                        risk: meal.impact,
                        savedAt: new Date().toISOString(),
                      };

                      localStorage.setItem(
                        "selectedMealInsight",
                        JSON.stringify(selectedMeal)
                      );

                      router.push("/history/detail");
                    } catch (err) {
                      console.error("Failed to open selected meal detail:", err);
                    }
                  }}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <Salad className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {meal.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {meal.type} · {meal.time}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                          vegan
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${riskStyles.pill}`}
                        >
                          {riskStyles.label}
                        </span>

                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
                          Score {meal.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => router.push("/meal-log")}
            className="mt-4 w-full rounded-lg border border-dashed border-green-300 py-2.5 text-center text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
          >
            + Log a meal
          </button>
        </DashboardCard>

        <DashboardCard
          title="Weekly Plan Preview"
          subtitle="AI-generated · 3-day preview"
          icon={<Calendar className="h-5 w-5" />}
        >
          <div className="space-y-3">
            {Object.entries(weeklyPreview).map(([day, meals], idx) => {
              const isToday = idx === 0;

              return (
                <div
                  key={day}
                  className={
                    "rounded-xl border p-4 " +
                    (isToday ? "border-cyan-200 bg-cyan-50" : "border-slate-200 bg-slate-50")
                  }
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-xs font-bold " +
                        (isToday ? "bg-cyan-200 text-cyan-800" : "bg-slate-200 text-slate-700")
                      }
                    >
                      {dayAbbr[day] || day}
                    </span>
                    {isToday && <span className="text-xs font-medium text-cyan-700">Today</span>}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {meals.map((meal) => (
                      <span
                        key={meal}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {meal}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-3">
            <p className="text-sm font-medium text-green-900">
              Planning note: keep legumes in lunch rotations and distribute carbs evenly through the day.
            </p>
          </div>

          <button
            onClick={() => router.push("/meal-planner")}
            className="mt-4 w-full text-center text-sm font-medium text-purple-600 transition-colors hover:text-purple-800"
          >
            View full plan →
          </button>
        </DashboardCard>
      </div>

      <DashboardCard
        title="Today&apos;s Risk Breakdown"
        subtitle="A simple snapshot of analyzed meals for your dashboard"
        icon={<Activity className="h-5 w-5" />}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-green-900">Low-impact meals</p>
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-green-900">
              {dashboardData.risk_breakdown.low}
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-amber-900">Moderate-impact meals</p>
              <span className="h-3 w-3 rounded-full bg-amber-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-amber-900">
              {dashboardData.risk_breakdown.moderate}
            </p>
          </div>

          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-rose-900">High-impact meals</p>
              <span className="h-3 w-3 rounded-full bg-rose-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-rose-900">
              {dashboardData.risk_breakdown.high}
            </p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}