"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--gold)] opacity-5 skew-x-12 z-0" />

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1"
                >
                    <h2 className="text-[var(--gold)] text-sm font-bold uppercase tracking-widest mb-4">Who We Are</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                        POWERING NIGERIA'S <br/> INFRASTRUCTURE.
                    </h3>
                    <p className="text-white/70 mb-6 text-lg font-light leading-relaxed">
                        At Three Hills Equipment, we understand that downtime is not an option. That's why we source only the most reliable, low-hour heavy machinery from trusted global partners.
                    </p>
                    <p className="text-white/70 mb-10 text-lg font-light leading-relaxed">
                        Whether you need a Caterpillar excavator for a mining project or a Komatsu bulldozer for road construction, every machine in our inventory has been rigorously inspected to ensure it meets our "Industrial Luxury" standard of performance.
                    </p>

                    <Link 
                        href="/inventory"
                        className="inline-flex items-center gap-2 text-white font-bold hover:text-[var(--gold)] transition-colors group"
                    >
                        EXPLORE OUR FLEET <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Image Area */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2 relative aspect-video bg-[#111] border border-white/10 group overflow-hidden"
                >
                    <img
                        src="/assets/images/machine-2.webp"
                        alt="Heavy Machinery"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Ornamental Border */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[var(--gold)] z-20" />
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[var(--gold)] z-20" />
                </motion.div>

            </div>
        </div>
    </section>
  );
}
