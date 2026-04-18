import { TrendingUp, Brain, Camera, QrCode, Calendar, Leaf, Lightbulb, ShoppingCart, Utensils } from "lucide-react";

// ── Mini glucose SVG chart ────────────────────────────────────────────────────
// Points derived from mock data: Mon=118 Tue=125 Wed=112 Thu=135 Fri=122 Sat=108 Sun=130
// ViewBox 0 0 300 65, Y mapped from [90-150] -> [55-5]
function GlucoseMiniChart() {
  return (
    <svg viewBox="0 0 300 65" className="w-full h-14">
      <defs>
        <linearGradient id="previewFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      <line x1="0" y1="30" x2="300" y2="30" stroke="#f1f5f9" strokeWidth="1" />
      <line x1="0" y1="45" x2="300" y2="45" stroke="#f1f5f9" strokeWidth="1" />
      {/* Target line */}
      <line x1="0" y1="30" x2="300" y2="30" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
      {/* Area fill */}
      <path
        d="M15,32 L63,26 L110,37 L158,18 L205,28 L253,40 L285,22 L285,55 L15,55 Z"
        fill="url(#previewFill)"
      />
      {/* Line */}
      <polyline
        points="15,32 63,26 110,37 158,18 205,28 253,40 285,22"
        fill="none"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Data dots */}
      <circle cx="15" cy="32" r="2.5" fill="#16a34a" stroke="white" strokeWidth="1.5" />
      <circle cx="63" cy="26" r="2.5" fill="#16a34a" stroke="white" strokeWidth="1.5" />
      <circle cx="110" cy="37" r="2.5" fill="#16a34a" stroke="white" strokeWidth="1.5" />
      <circle cx="158" cy="18" r="3" fill="#ef4444" stroke="white" strokeWidth="1.5" />
      <circle cx="205" cy="28" r="2.5" fill="#16a34a" stroke="white" strokeWidth="1.5" />
      <circle cx="253" cy="40" r="2.5" fill="#16a34a" stroke="white" strokeWidth="1.5" />
      <circle cx="285" cy="22" r="2.5" fill="#16a34a" stroke="white" strokeWidth="1.5" />
      {/* Day labels */}
      <text x="15" y="64" textAnchor="middle" fontSize="7" fill="#94a3b8">Mon</text>
      <text x="63" y="64" textAnchor="middle" fontSize="7" fill="#94a3b8">Tue</text>
      <text x="110" y="64" textAnchor="middle" fontSize="7" fill="#94a3b8">Wed</text>
      <text x="158" y="64" textAnchor="middle" fontSize="7" fill="#94a3b8">Thu</text>
      <text x="205" y="64" textAnchor="middle" fontSize="7" fill="#94a3b8">Fri</text>
      <text x="253" y="64" textAnchor="middle" fontSize="7" fill="#94a3b8">Sat</text>
      <text x="285" y="64" textAnchor="middle" fontSize="7" fill="#94a3b8">Sun</text>
    </svg>
  );
}

// ── Chrome frame shared by all cards ─────────────────────────────────────────
function ChromeBar({ title, color }: { title: string; color: string }) {
  return (
    <div className={"flex items-center gap-1.5 px-4 py-2.5 border-b " + color}>
      <span className="h-2 w-2 rounded-full bg-red-400" />
      <span className="h-2 w-2 rounded-full bg-yellow-400" />
      <span className="h-2 w-2 rounded-full bg-green-400" />
      <span className="ml-2.5 text-xs font-semibold text-slate-500 tracking-tight">{title}</span>
    </div>
  );
}

// ── Card 1: Dashboard ─────────────────────────────────────────────────────────
function DashboardCard() {
  const kpis = [
    { label: "Avg Glucose", value: "121", unit: "mg/dL", color: "text-green-700" },
    { label: "Meals Logged", value: "14", unit: "this week", color: "text-blue-700" },
    { label: "Vegan Streak", value: "100%", unit: "on track", color: "text-emerald-700" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden flex flex-col">
      <ChromeBar title="Dashboard" color="bg-slate-100 border-slate-200" />
      <div className="p-4 space-y-3 bg-slate-50 flex-1">
        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-lg p-2 border border-slate-100 shadow-sm text-center">
              <p className={"text-base font-extrabold leading-none " + k.color}>{k.value}</p>
              <p className="text-slate-400 text-[9px] mt-0.5 leading-tight">{k.unit}</p>
              <p className="text-slate-500 text-[9px] font-medium mt-0.5 truncate">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="h-3 w-3 text-green-600 flex-shrink-0" />
            <span className="text-[10px] font-bold text-slate-700">Weekly Glucose Trend</span>
            <span className="ml-auto text-[9px] text-slate-400">mg/dL</span>
          </div>
          <GlucoseMiniChart />
        </div>

        <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
          <div className="flex items-center gap-1.5 mb-1">
            <Brain className="h-3 w-3 text-purple-600 flex-shrink-0" />
            <span className="text-[10px] font-bold text-purple-800">AI Insight of the Day</span>
          </div>
          <p className="text-[10px] text-purple-700 leading-relaxed italic">
            &quot;Your glucose tends to rise after refined grain meals. Try quinoa or legumes as a substitute.&quot;
          </p>
        </div>

        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Quick Actions</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { icon: Camera, label: "Upload Meal", bg: "bg-green-50 text-green-700 border-green-200" },
              { icon: QrCode, label: "Scan Barcode", bg: "bg-blue-50 text-blue-700 border-blue-200" },
              { icon: Calendar, label: "Meal Plan", bg: "bg-purple-50 text-purple-700 border-purple-200" },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.label} className={"flex flex-col items-center gap-1 p-2 rounded-lg border text-center " + a.bg}>
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-[9px] font-semibold leading-tight">{a.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card 2: Meal Analysis ─────────────────────────────────────────────────────
function MealAnalysisCard() {
  const ingredients = ["tofu", "broccoli", "brown rice", "carrots"];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden flex flex-col">
      <ChromeBar title="Meal Analysis" color="bg-slate-100 border-slate-200" />
      <div className="flex-1 flex flex-col">
        <div className="bg-green-600 px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-white font-bold text-sm leading-snug">Tofu Vegetable Grain Bowl</p>
            <span className="inline-flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
              <Leaf className="h-2.5 w-2.5" /> Vegan
            </span>
          </div>
          <p className="text-green-100 text-[10px] mt-0.5">Confidence: High</p>
        </div>

        <div className="p-4 space-y-3 bg-slate-50 flex-1">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Likely Ingredients
            </p>
            <div className="flex flex-wrap gap-1">
              {ingredients.map((ing) => (
                <span key={ing} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 rounded-full text-[10px] font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 flex gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-blue-900">Glucose Considerations</p>
              <p className="text-[10px] text-blue-700 leading-relaxed mt-0.5">
                Balanced meal with fiber and protein. Portion size of grains may still matter.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 flex gap-2">
            <Lightbulb className="h-3.5 w-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-amber-900">AI Suggestion</p>
              <p className="text-[10px] text-amber-700 leading-relaxed mt-0.5">
                Add more greens for a lower-carb version of this meal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card 3: Meal Planner ──────────────────────────────────────────────────────
function MealPlannerCard() {
  const days = [
    { day: "Monday", meals: ["Oatmeal with berries", "Lentil salad", "Tofu stir-fry"], color: "bg-green-50 border-green-200" },
    { day: "Tuesday", meals: ["Chia pudding", "Bean soup", "Quinoa vegetable bowl"], color: "bg-blue-50 border-blue-200" },
    { day: "Wednesday", meals: ["Green smoothie", "Chickpea wrap", "Vegetable chili"], color: "bg-purple-50 border-purple-200" },
  ];
  const mealLabels = ["Breakfast", "Lunch", "Dinner"];
  const grocery = [
    { cat: "Vegetables", items: "broccoli, spinach, carrots", color: "bg-green-600" },
    { cat: "Legumes", items: "lentils, black beans, chickpeas", color: "bg-amber-600" },
    { cat: "Grains", items: "oats, quinoa, brown rice", color: "bg-orange-600" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden flex flex-col">
      <ChromeBar title="Meal Planner" color="bg-slate-100 border-slate-200" />
      <div className="p-4 space-y-3 bg-slate-50 flex-1">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Calendar className="h-3 w-3 text-purple-600 flex-shrink-0" />
            <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Weekly Plan</p>
          </div>
          <div className="space-y-1.5">
            {days.map((d) => (
              <div key={d.day} className={"rounded-lg border p-2.5 " + d.color}>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">{d.day}</p>
                <div className="space-y-0.5">
                  {d.meals.map((meal, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Utensils className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
                      <span className="text-[9px] text-slate-500 font-medium">{mealLabels[i]}:</span>
                      <span className="text-[9px] text-slate-700 truncate">{meal}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <ShoppingCart className="h-3 w-3 text-green-600 flex-shrink-0" />
            <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Grocery List</p>
          </div>
          <div className="space-y-1.5">
            {grocery.map((g) => (
              <div key={g.cat} className="flex items-center gap-2 bg-white rounded-lg border border-slate-100 overflow-hidden shadow-sm">
                <div className={"px-2 py-2 text-white flex-shrink-0 " + g.color}>
                  <p className="text-[9px] font-bold">{g.cat}</p>
                </div>
                <p className="text-[9px] text-slate-600 truncate pr-2">{g.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export default function ProductPreview() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
            Product Preview
          </p>
          <h2 className="text-4xl font-extrabold text-green-900">
            See How the AI Coach Works
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            A closer look at the three core tools — all available in the free demo,
            no signup required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-3">
            <div className="text-center mb-4">
              <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                Dashboard
              </span>
            </div>
            <DashboardCard />
          </div>

          <div className="space-y-3">
            <div className="text-center mb-4">
              <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                Meal Analysis
              </span>
            </div>
            <MealAnalysisCard />
          </div>

          <div className="space-y-3">
            <div className="text-center mb-4">
              <span className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
                Meal Planner
              </span>
            </div>
            <MealPlannerCard />
          </div>
        </div>
      </div>
    </section>
  );
}