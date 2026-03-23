"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MachineCard from "@/components/ui/MachineCard";
import { Search, ChevronDown } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Machine } from "@/types";

// Pinned filters shown as visible buttons (excluding "All")
const PINNED = ["Excavator", "Bulldozer", "Loader"];

// Additional types in the "More" dropdown
const MORE_TYPES = [
  "Grader",
  "Compactor",
  "Crane",
  "Swamp Buggy",
  "Dump Truck",
  "Backhoe Loader",
  "Skid Steer",
  "Forklift",
  "Articulated Truck",
  "Ripper"
];

export default function InventoryPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [machines, setMachines] = useState<Machine[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("inventory").select("*");
      if (data) setMachines(data);
    }
    fetchData();
  }, [supabase]);

  // Close "More" dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectFilter = (cat: string) => {
    setFilter(cat);
    setMoreOpen(false);
  };

  const filteredEquipment = machines.filter((machine) => {
    const matchesCategory = filter === "All" || machine.category === filter;
    const matchesSearch = machine.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Is the active filter currently inside the "More" list?
  const activeIsInMore = MORE_TYPES.includes(filter);

  const btnBase =
    "px-4 py-2 text-sm font-medium border transition-colors whitespace-nowrap";
  const btnActive = "bg-[var(--gold)] border-[var(--gold)] text-black";
  const btnIdle =
    "bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:text-white";

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-16 px-6 bg-zinc-900/50">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">INVENTORY</h1>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by model or name..."
                className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter row */}
            <div className="flex gap-2 w-full md:w-auto flex-wrap">
              {/* All */}
              <button
                onClick={() => selectFilter("All")}
                className={`${btnBase} ${filter === "All" ? btnActive : btnIdle}`}
              >
                All
              </button>

              {/* Pinned types */}
              {PINNED.map((cat) => (
                <button
                  key={cat}
                  onClick={() => selectFilter(cat)}
                  className={`${btnBase} ${filter === cat ? btnActive : btnIdle}`}
                >
                  {cat}
                </button>
              ))}

              {/* More dropdown */}
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setMoreOpen((o) => !o)}
                  className={`${btnBase} flex items-center gap-1.5 ${
                    activeIsInMore ? btnActive : btnIdle
                  }`}
                >
                  {activeIsInMore ? filter : "More"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      moreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {moreOpen && (
                  <div className="absolute left-0 md:left-auto md:right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 shadow-2xl z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {MORE_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => selectFilter(type)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          filter === type
                            ? "text-[var(--gold)] bg-[var(--gold)]/10 font-semibold"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-16">
        {filteredEquipment.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEquipment.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">
              No equipment found matching your criteria.
            </p>
            <button
              onClick={() => { setFilter("All"); setSearch(""); }}
              className="mt-4 text-[var(--gold)] hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
