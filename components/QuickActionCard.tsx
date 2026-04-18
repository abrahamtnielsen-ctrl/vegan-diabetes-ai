import { ReactNode } from "react";

interface QuickActionCardProps {
  icon: ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  color?: "green" | "blue" | "purple";
}

const colorMap = {
  green: "bg-green-50 border-green-200 hover:bg-green-100 text-green-700",
  blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700",
  purple: "bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700",
};

const iconColorMap = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
};

export default function QuickActionCard({ icon, label, description, onClick, color = "green" }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={"flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all cursor-pointer w-full text-center " + colorMap[color]}
    >
      <div className={"rounded-full p-3 " + iconColorMap[color]}>{icon}</div>
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-xs opacity-75 mt-0.5">{description}</p>
      </div>
    </button>
  );
}
