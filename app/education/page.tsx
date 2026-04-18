import { HeartPulse, Leaf, ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";

const sections = [
  {
    id: "t2d",
    icon: HeartPulse,
    title: "What is Type 2 Diabetes?",
    iconColor: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100",
    content: "Type 2 diabetes is a chronic condition where the body does not use insulin effectively, leading to elevated blood glucose levels. Unlike Type 1, it is largely influenced by lifestyle factors. Over time, unmanaged blood sugar can damage nerves, kidneys, eyes, and the heart. Managing it involves diet, physical activity, medication, and regular monitoring.",
  },
  {
    id: "plant",
    icon: Leaf,
    title: "Why Plant-Based Eating May Help",
    iconColor: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-100",
    content: "Whole-food plant-based diets are rich in fiber and low in saturated fat, which can improve insulin sensitivity. Research suggests plant-based eaters have significantly lower rates of Type 2 diabetes. High-fiber foods slow glucose absorption, preventing sharp blood sugar spikes. Legumes, leafy greens, and whole grains are especially beneficial for glycemic control.",
  },
  {
    id: "labels",
    icon: ShoppingBag,
    title: "How to Read Food Labels",
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    bullets: [
      "Check total carbohydrates and dietary fiber. Net carbs equals total carbs minus fiber.",
      "Look for added sugars. Aim for less than 5g per serving for everyday staples.",
      "Ingredients are listed by weight. If sugar appears in the top three, reconsider.",
      "Watch for hidden animal-derived ingredients: casein, whey, gelatin, lard, and carmine.",
      "The glycemic index is not printed on labels. Look it up for unfamiliar foods.",
    ],
  },
  {
    id: "start",
    icon: ArrowRight,
    title: "Getting Started Safely",
    iconColor: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    bullets: [
      "Consult your doctor or registered dietitian before making major dietary changes.",
      "Transition gradually. Start by swapping one meal per day to a plant-based option.",
      "Monitor your blood glucose more closely during the first few weeks of transition.",
      "Focus on whole foods: vegetables, legumes, whole grains, nuts, and seeds.",
      "Ensure adequate vitamin B12 through supplementation or fortified foods.",
    ],
  },
];

export default function EducationPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Education Center</h1>
        <p className="text-slate-500 mt-1">Learn how a plant-based lifestyle supports Type 2 Diabetes management.</p>
      </div>

      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.id} className={"rounded-xl border p-6 " + section.bg + " " + section.border}>
            <div className="flex items-center gap-3 mb-4">
              <div className={"p-2.5 rounded-lg " + section.iconBg}>
                <Icon className={"h-5 w-5 " + section.iconColor} />
              </div>
              <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
            </div>
            {"content" in section && section.content && (
              <p className="text-sm text-slate-700 leading-relaxed">{section.content}</p>
            )}
            {"bullets" in section && section.bullets && (
              <ul className="space-y-2.5">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-bold text-amber-900 mb-2">Medical Disclaimer</h2>
            <p className="text-sm text-amber-800 leading-relaxed">
              The information in this application is for educational purposes only and is not intended as medical advice.
              Always consult your physician, registered dietitian, or other qualified healthcare professional before making
              changes to your diet, exercise routine, or diabetes management plan. Do not discontinue or adjust medications
              without professional guidance. Individual health needs vary significantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
