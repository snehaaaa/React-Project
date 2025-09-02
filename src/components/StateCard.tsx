import { ArrowUp, ArrowDown } from "lucide-react";

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: { value: number };
  right?: React.ReactNode;
}> = ({ icon, label, value, trend, right }) => (
  <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
    <div className="flex items-center gap-4">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-green-50 text-green-600">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-3xl font-semibold text-gray-900">{value}</div>
        {typeof trend?.value === "number" && (
          <div className={`mt-1 inline-flex items-center text-xs ${trend.value >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {trend.value >= 0 ? <ArrowUp size={14} className="mr-1"/> : <ArrowDown size={14} className="mr-1"/>}
            {Math.abs(trend.value)}% this month
          </div>
        )}
      </div>
    </div>
    {right}
  </div>
);
export default StatCard;