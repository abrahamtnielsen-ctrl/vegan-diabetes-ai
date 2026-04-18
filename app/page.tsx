import Link from "next/link";
import {
  Camera,
  QrCode,
  Calendar,
  ArrowRight,
  Leaf,
  Sparkles,
  Heart,
  CheckCircle,
  Brain,
  ShieldCheck,
  TrendingUp,
  Star,
} from "lucide-react";
import ProductPreview from "@/components/ProductPreview";

const trustItems = [
  {
    icon: Leaf,
    label: "Plant-based meal guidance",
    sub: "Vegan-first recommendations",
  },
  {
    icon: QrCode,
    label: "Barcode ingredient checks",
    sub: "Hidden ingredient detection",
  },
  {
    icon: TrendingUp,
    label: "Glucose-aware meal insights",
    sub: "Blood sugar impact analysis",
  },
  {
    icon: Calendar,
    label: "Weekly meal planning support",
    sub: "Personalized grocery lists",
  },
];

const features = [
  {
    icon: Camera,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    accent: "border-green-400",
    tag: "Meal Analysis",
    title: "Understand Every Meal",
    description:
      "Upload a photo or describe your meal to get an instant breakdown of ingredients, glycemic impact, and vegan status. Know what affects your blood sugar before you feel it — and get a plant-based swap suggestion on the spot.",
    outcome: "Make better food choices in real time",
  },
  {
    icon: QrCode,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    accent: "border-orange-400",
    tag: "Barcode Scanner",
    title: "Shop With Confidence",
    description:
      "Scan any packaged product before it goes in your cart. Instantly see vegan status, hidden animal-derived ingredients, added sugar content, and a diabetes-friendly alternative — so you can make confident choices at the store.",
    outcome: "Eliminate guesswork at the grocery store",
  },
  {
    icon: Calendar,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    accent: "border-purple-400",
    tag: "Meal Planning",
    title: "Plan Your Whole Week",
    description:
      "Stop wondering what to eat. Generate a complete personalized vegan meal plan aligned with your dietary preferences, allergies, and weekly health goals — with a categorized grocery list ready to go.",
    outcome: "Arrive at every meal prepared, not stressed",
  },
];

const stats = [
  { value: "100%", label: "Plant-Based Meals", sub: "Fully vegan plans" },
  { value: "3x", label: "Faster Meal Logging", sub: "vs manual tracking" },
  { value: "AI", label: "Powered Insights", sub: "Real-time guidance" },
];

const benefits = [
  "Personalized AI nutrition coaching",
  "Blood glucose-aware meal suggestions",
  "Vegan ingredient verification",
  "Weekly planning with grocery lists",
  "Diabetes-safe food label reading tips",
  "No account required to try the demo",
];

export default function LandingPage() {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">
      <section className="relative overflow-hidden bg-white px-4 pb-28 pt-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-green-50 opacity-70" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-orange-50 opacity-60" />
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-48 w-48 rounded-full bg-emerald-50 opacity-40" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="max-w-xl space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-800">
                <Leaf className="h-3.5 w-3.5" />
                AI-Powered Plant-Based Nutrition
              </div>

              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-green-900 lg:text-6xl">
                Eat Plants.
                <br />
                <span className="text-green-600">Manage Diabetes.</span>
                <br />
                <span className="text-orange-500">Live Well.</span>
              </h1>

              <p className="text-lg leading-relaxed text-slate-600">
                PlantRx provides AI-powered plant-based nutrition guidance for
                people managing Type 2 Diabetes. Analyze meals, scan products,
                and plan your week — all in one place.
              </p>

              <p className="text-sm leading-relaxed text-slate-400">
                Educational demo prototype showing AI-guided plant-based
                nutrition tools. Always work with your healthcare provider for
                medical decisions.
              </p>

              <div className="flex flex-wrap gap-4 pt-1">
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-100 transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-200"
                >
                  <Sparkles className="h-5 w-5" />
                  View Demo
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-green-700 px-8 py-4 text-base font-bold text-green-700 transition-all hover:border-green-800 hover:bg-green-50"
                >
                  Explore Features
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative hidden h-96 lg:block">
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-green-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-600 shadow-2xl">
                  <Heart className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 border-green-200 bg-green-100 text-3xl shadow-md">
                &#x1F966;
              </div>
              <div className="absolute right-8 top-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-orange-200 bg-orange-100 text-4xl shadow-md">
                &#x1F955;
              </div>
              <div className="absolute right-0 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-yellow-200 bg-yellow-100 text-2xl shadow-md">
                &#x1F34B;
              </div>
              <div className="absolute bottom-8 right-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-200 bg-red-100 text-4xl shadow-md">
                &#x1F34E;
              </div>
              <div className="absolute bottom-0 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 border-purple-200 bg-purple-100 text-3xl shadow-md">
                &#x1FAD0;
              </div>
              <div className="absolute bottom-8 left-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-100 text-4xl shadow-md">
                &#x1F951;
              </div>
              <div className="absolute left-0 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-green-200 bg-green-100 text-2xl shadow-md">
                &#x1F9C5;
              </div>
              <div className="absolute left-8 top-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-lime-200 bg-lime-100 text-3xl shadow-md">
                &#x1F966;
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-100">
                    <Icon className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-snug text-slate-800">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-green-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-3 gap-6 divide-x divide-green-700 text-center">
            {stats.map((s) => (
              <div key={s.label} className="px-4">
                <p className="text-4xl font-extrabold text-orange-400">
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-bold text-white">{s.label}</p>
                <p className="mt-0.5 text-xs text-green-300">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductPreview />

      <section
        id="features"
        className="bg-slate-50 px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
              What It Does
            </p>
            <h2 className="text-4xl font-extrabold text-green-900">
              Three Tools. One Daily Habit.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              Each tool is designed to slot into the decisions you already make
              every day — what to eat, what to buy, and what to plan next.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.tag}
                  className={
                    "group rounded-2xl border-t-4 bg-white p-8 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl " +
                    f.accent
                  }
                >
                  <div
                    className={
                      "inline-flex h-12 w-12 items-center justify-center rounded-xl " +
                      f.iconBg
                    }
                  >
                    <Icon className={"h-6 w-6 " + f.iconColor} />
                  </div>

                  <p
                    className={
                      "mt-4 text-xs font-bold uppercase tracking-widest " +
                      f.iconColor
                    }
                  >
                    {f.tag}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-green-900">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {f.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                    <Star className={"h-3.5 w-3.5 flex-shrink-0 " + f.iconColor} />
                    <p className={"text-xs font-semibold " + f.iconColor}>
                      {f.outcome}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="mission"
        className="bg-white px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                Our Mission
              </p>
              <h2 className="text-4xl font-extrabold leading-tight text-green-900">
                Plant-Based Eating as a Path to Diabetes Wellness
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                Research consistently shows that whole-food, plant-based diets
                improve insulin sensitivity, reduce inflammation, and support
                healthy blood glucose levels. Yet making the transition can feel
                overwhelming.
              </p>
              <p className="text-base leading-relaxed text-slate-600">
                PlantRx AI Coach is designed to help users confidently choose
                plant-based foods that support blood sugar management — removing
                guesswork from every grocery run, every restaurant order, and
                every meal at home.
              </p>
              <p className="text-base leading-relaxed text-slate-600">
                This app bridges the gap — giving people with Type 2 Diabetes
                the tools, knowledge, and AI-guided support to eat with
                intention and live well.
              </p>
              <Link
                href="/education"
                className="group inline-flex items-center gap-2 font-bold text-green-700 transition-colors hover:text-green-900"
              >
                Learn about plant-based nutrition
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 shadow-sm">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-green-900">What You Get</p>
                  <p className="text-xs text-green-600">
                    Included in the free demo
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-green-200 pt-5">
                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-green-800 hover:shadow-md"
                >
                  <Sparkles className="h-4 w-4" />
                  Open Free Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <div className="flex justify-center gap-3 text-3xl">
            <span>&#x1F966;</span>
            <span>&#x1F955;</span>
            <span>&#x1F34B;</span>
            <span>&#x1F951;</span>
            <span>&#x1F34E;</span>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-400">
              Ready to Start?
            </p>
            <h2 className="text-4xl font-extrabold leading-tight text-white">
              Your Plant-Based Wellness
              <br />
              Journey Starts Here
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-green-200">
              Explore the AI Coach demo and see how plant-based nutrition and
              smart tools can support your diabetes management.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-9 py-4 text-base font-bold text-white shadow-lg shadow-orange-900/30 transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
            >
              <Sparkles className="h-5 w-5" />
              Try the Demo
            </Link>
            <Link
              href="/meal-planner"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 px-9 py-4 text-base font-bold text-white transition-all hover:border-white hover:bg-green-800"
            >
              Explore Meal Planning
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <p className="text-sm font-medium text-green-400">
            No signup required for demo preview.
          </p>

          <div className="flex items-center justify-center gap-2 border-t border-green-800 pt-2 text-xs text-green-500">
            <ShieldCheck className="h-4 w-4 flex-shrink-0" />
            <span>
              Educational demo only &mdash; always consult your healthcare
              provider before making dietary or medical changes.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}