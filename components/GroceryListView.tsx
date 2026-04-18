import { ShoppingCart, Leaf, Wheat } from "lucide-react";
import { ReactNode } from "react";

interface GroceryListViewProps {
  groceryList: Record<string, string[]>;
}

const categoryConfig: Record<string, { icon: ReactNode; color: string }> = {
  Vegetables: { icon: <Leaf className="h-4 w-4" />, color: "bg-green-600" },
  Legumes: { icon: <ShoppingCart className="h-4 w-4" />, color: "bg-amber-600" },
  Grains: { icon: <Wheat className="h-4 w-4" />, color: "bg-orange-600" },
};

export default function GroceryListView({ groceryList }: GroceryListViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(groceryList).map(([category, items]) => {
        const cfg = categoryConfig[category] ?? { icon: <ShoppingCart className="h-4 w-4" />, color: "bg-slate-600" };
        return (
          <div key={category} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className={"px-4 py-3 flex items-center gap-2 text-white " + cfg.color}>
              {cfg.icon}
              <p className="font-semibold text-sm">{category}</p>
            </div>
            <ul className="p-4 space-y-1.5">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
