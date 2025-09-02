import React from "react";
import { Search } from "lucide-react";



const Topbar: React.FC = () => (
  <div className="mb-6 flex items-center justify-between">
    <div className="text-2xl font-semibold">
      Hello Evano <span className="ml-1">👋🏻</span>
    </div>
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
        size={18}
      />
      <input
        className="w-64 rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/5"
        placeholder="Search"
        aria-label="Global search"
      />
    </div>
  </div>
);

export default Topbar;
