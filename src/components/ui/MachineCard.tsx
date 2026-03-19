"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Machine } from "@/types";

export default function MachineCard({ machine }: { machine: Machine }) {
    return (
        <Link href={`/inventory/${machine.id}`} className="block">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-[var(--card)] aspect-[3/4] overflow-hidden cursor-pointer border border-white/5"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                    
                    {machine.image ? (
                        <img 
                            src={machine.image} 
                            alt={machine.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                    ) : (
                        /* Placeholder Image Logic using CSS patterns if no image */
                        <div className="w-full h-full bg-[#2a2a2a] group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                            <span className="text-white/5 text-4xl font-black rotate-[-45deg]">{machine.category}</span>
                        </div>
                    )}
                </div>

                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                    <div className="flex justify-end">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                            machine.status === 'Sold' ? 'border-red-500 text-red-500' : 'border-[var(--gold)] text-[var(--gold)]'
                        }`}>
                            {machine.status}
                        </span>
                    </div>

                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                            {machine.category}
                        </p>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-none w-3/4">
                            {machine.name}
                        </h3>
                        
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                             <div className="overflow-hidden">
                                 <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <p className="text-[var(--gold)] font-medium text-xl mb-4">{machine.price}</p>
                                    <span className="flex items-center gap-2 text-white text-xs font-bold border-b border-white/30 pb-1 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors w-fit">
                                        VIEW SPECS <ArrowUpRight size={14} />
                                    </span>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

