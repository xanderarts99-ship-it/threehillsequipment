"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MachineCard from "@/components/ui/MachineCard";
import { Search, Filter } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Machine } from "@/types";

export default function InventoryPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [machines, setMachines] = useState<Machine[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
        const { data } = await supabase.from('inventory').select('*');
        if (data) setMachines(data);
    }
    fetchData();
  }, [supabase]);

  const categories = ["All", "Excavator", "Bulldozer", "Loader", "Grader", "Compactor"];

  const filteredEquipment = machines.filter((machine) => {
    const matchesCategory = filter === "All" || machine.category === filter;
    const matchesSearch = machine.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-16 px-6 bg-zinc-900/50">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">INVENTORY</h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by model or name..." 
                    className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 text-sm font-medium border transition-colors whitespace-nowrap ${
                            filter === cat 
                            ? "bg-[var(--gold)] border-[var(--gold)] text-black" 
                            : "bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
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
                <p className="text-white/40 text-lg">No equipment found matching your criteria.</p>
                <button 
                    onClick={() => {setFilter("All"); setSearch("")}}
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
