"use client";

import { useEffect, useState } from "react";
import MachineCard from "@/components/ui/MachineCard";
import { createClient } from "@/utils/supabase/client";
import { Machine } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PREVIEW_LIMIT = 4;

export default function MachineryGrid() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('inventory')
        .select('*')
        .limit(PREVIEW_LIMIT);
      if (data) setMachines(data);
    }
    fetchData();
  }, [supabase]);

  return (
    <section className="py-24 bg-[var(--background)] px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">OUR INVENTORY</h2>
                <div className="h-1 w-24 bg-[var(--gold)]" />
            </div>
            <p className="text-white/50 md:text-right max-w-md font-light text-sm md:text-base">
                Browse our current selection of heavy duty machinery available for immediate inspection in Lagos.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {machines.map((machine) => (
                <MachineCard key={machine.id} machine={machine} />
            ))}
        </div>

        {/* See More */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-3 border border-[var(--gold)] text-[var(--gold)] px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-[var(--gold)] hover:text-black transition-all duration-200 group"
          >
            See Full Inventory
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
