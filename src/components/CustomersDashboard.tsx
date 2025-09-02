import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import { Search, ChevronLeft, ChevronRight, Users, Building2, Mail, Phone, Globe } from "lucide-react";
import { Customer, SortKey } from "../types/Customer";
import { generateCustomers } from "../common/utils";
import Badge from "./Badge";
import StatCard from "./StateCard";
import { fetchCustomers } from "../services/customerService";
import Topbar from "./Topbar";


const PAGE_SIZE = 8;
const TOTAL_ENTRIES_DISPLAY = 256000; // per spec text

export default function CustomersDashboard() {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("Newest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
  
    fetchCustomers()
      .then(setAllCustomers)
      .catch(() => setError("Failed to load customers."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = simulateEmpty ? [] : allCustomers;
    if (!q) return source;
    return source.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }, [allCustomers, query, simulateEmpty]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "Name":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Status":
        arr.sort((a, b) => (a.status === b.status ? a.name.localeCompare(b.name) : a.status === "Active" ? -1 : 1));
        break;
      default:
        arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return arr;
  }, [filtered, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const current = useMemo(() => sorted.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE), [sorted, pageSafe]);

  useEffect(() => { setPage(1); }, [query, sortBy]);

  // Helpers
  const pageNumbers = useMemo(() => {
    const nums: (number | string)[] = [];
    const max = Math.min(40, totalPages); // UI shows up to 40
    for (let i = 1; i <= max; i++) nums.push(i);
    return nums;
  }, [totalPages]);

  // ------------------------------------
  // Render
  // ------------------------------------
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-gray-900">
      <div className="mx-auto flex max-w-[1200px] gap-6 p-6">
        {/* Sidebar */}
        <Sidebar/>
      

        {/* Main */}
        <main className="flex-1">
          {/* Top bar */}
          <Topbar/>
        

          {/* Stats */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard icon={<Users />} label="Total Customers" value={5423} trend={{ value: 16 }} />
            <StatCard icon={<Users />} label="Members" value={1893} trend={{ value: -1 }} />
            <StatCard
              icon={<Users />}
              label="Active Now"
              value={189}
              right={
                <div className="-mr-1 flex -space-x-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <img key={i} src={`https://i.pravatar.cc/24?img=${i+1}`} className="h-7 w-7 rounded-full ring-2 ring-white"/>
                  ))}
                </div>
              }
            />
          </div>

        
          {/* Table Card */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">All Customers</div>
                <button className="mt-1 text-xs text-indigo-600 hover:underline">Active Members</button>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" size={16}/>
                  <input
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-56 rounded-xl border border-gray-200 bg-white py-2 pl-8 pr-3 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/5"
                  />
                </div>

                {/* Sort */}
                <div className="text-sm">
                  <label className="mr-2 text-gray-500">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e)=>setSortBy(e.target.value as SortKey)}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/5"
                  >
                    <option>Newest</option>
                    <option>Name</option>
                    <option>Status</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table area with states */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
              {loading ? (
                <div className="grid h-72 place-items-center text-sm text-gray-500">Loading customers…</div>
              ) : error ? (
                <div className="grid h-72 place-items-center text-sm text-rose-600">{error || 'Something went wrong'}</div>
              ) : current.length === 0 ? (
                <div className="grid h-72 place-items-center text-sm text-gray-500">No customers found.</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-[#F9FAFB] text-left text-sm text-gray-500">
                    <tr>
                      <th className="px-6 py-3 font-medium">Customer Name</th>
                      <th  className="px-6 py-3 font-medium">Company</th>
                      <th  className="px-6 py-3 font-medium">Phone Number</th>
                      <th  className="px-6 py-3 font-medium">Email</th>
                      <th  className="px-6 py-3 font-medium">Country</th>
                      <th className="text-right pr-6 px-6 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white text-sm">
                    {current.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={`https://i.pravatar.cc/40?u=${c.email}`} className="h-9 w-9 rounded-full"/>
                            <div>
                              <div className="font-medium text-gray-900">{c.name}</div>
                              <div className="text-xs text-gray-500">ID {c.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-2"><Building2 size={14}/>{c.company}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-2"><Phone size={14}/>{c.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-2"><Mail size={14}/>{c.email}</div>
                        </td>
                        <td className=" px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-2"><Globe size={14}/>{c.country}</div>
                        </td>
                        <td className="px-6 py-4 pr-6 text-right"><Badge status={c.status}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <div>Showing data {sorted.length === 0 ? 0 : (pageSafe - 1) * PAGE_SIZE + 1} to {Math.min(pageSafe * PAGE_SIZE, sorted.length)} of {TOTAL_ENTRIES_DISPLAY.toLocaleString()} entries</div>

              {/* Pagination */}
              <div className="flex items-center gap-1">
                <button
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pageSafe === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                  {pageNumbers.slice(0, 8).map((n) => (
                    <button
                      key={String(n)}
                      onClick={() => typeof n === "number" && setPage(n)}
                      className={`h-7 w-7 rounded-md text-center text-xs font-medium ${
                        pageSafe === n ? "bg-indigo-600 text-white" : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="px-1">…</span>
                  <button className="h-7 w-7 rounded-md bg-white text-xs text-gray-700 ring-1 ring-gray-200">40</button>
                </div>
                <button
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={pageSafe === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

