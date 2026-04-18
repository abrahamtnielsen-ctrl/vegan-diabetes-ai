import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({ title, subtitle, icon, children, className = "" }: DashboardCardProps) {
  return (
    <div className={"bg-white rounded-xl shadow-sm border border-slate-200 p-6 " + className}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      {children}
    </div>
  );
}
