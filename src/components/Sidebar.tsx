import React from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  Wallet,
  Megaphone,
  HelpCircle,
} from "lucide-react";

type SideItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

const SideItem: React.FC<SideItemProps> = ({ icon, label, active }) => (
  <button
    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
      active
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-gray-50"
    }`}
  >
    <span
      className={`grid h-7 w-7 place-items-center rounded-lg ${
        active ? "bg-white/10" : "bg-gray-100 text-gray-700"
      }`}
    >
      {icon}
    </span>
    <span className="flex-1 text-left">{label}</span>
  </button>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="sticky top-6 h-[92vh] w-60 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 text-lg font-semibold">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gray-900 text-white">
          DB
        </div>
        <span>Dashboard</span>
        <span className="ml-1 text-xs text-gray-400">v.01</span>
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        <SideItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SideItem icon={<Package size={18} />} label="Product" />
        <SideItem icon={<Users size={18} />} label="Customers" active />
        <SideItem icon={<Wallet size={18} />} label="Income" />
        <SideItem icon={<Megaphone size={18} />} label="Promote" />
        <SideItem icon={<HelpCircle size={18} />} label="Help" />
      </nav>

      {/* User Mini Profile */}
      <div className="absolute inset-x-6 bottom-6">
        <div className="flex items-center gap-3 rounded-2xl bg-[#F8F9FB] p-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://i.pravatar.cc/100?img=65"
            alt="user"
          />
          <div>
            <div className="text-sm font-medium">Evano</div>
            <div className="text-xs text-gray-500">Project Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
