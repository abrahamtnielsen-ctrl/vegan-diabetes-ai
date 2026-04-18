import { AlertTriangle, Info, Lightbulb, ShoppingCart } from "lucide-react";

interface BarcodeResultProps {
  result: {
    vegan_status: string;
    concerning_ingredients: string[];
    diabetes_considerations: string;
    recommendation: string;
    alternative_suggestion: string;
  };
}

export default function BarcodeResult({ result }: BarcodeResultProps) {
  const isVegan = result.vegan_status === "vegan";
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className={"px-6 py-4 " + (isVegan ? "bg-green-600" : "bg-orange-500")}>
        <h3 className="text-white font-semibold text-lg">Product Analysis</h3>
        <span className={"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1.5 " + (isVegan ? "bg-green-500 text-white" : "bg-orange-400 text-white")}>
          {result.vegan_status}
        </span>
      </div>
      <div className="p-6 space-y-4">
        {result.concerning_ingredients.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-orange-500" /> Concerning Ingredients
            </p>
            <div className="flex flex-wrap gap-2">
              {result.concerning_ingredients.map((ing) => (
                <span key={ing} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">{ing}</span>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Diabetes Considerations</p>
            <p className="text-sm text-blue-700 mt-0.5">{result.diabetes_considerations}</p>
          </div>
        </div>
        <div className="flex gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <ShoppingCart className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-slate-900">Recommendation</p>
            <p className="text-sm text-slate-600 mt-0.5">{result.recommendation}</p>
          </div>
        </div>
        <div className="flex gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
          <Lightbulb className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-900">Better Alternative</p>
            <p className="text-sm text-green-700 mt-0.5">{result.alternative_suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
