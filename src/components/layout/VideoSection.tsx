"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-[var(--gold)] text-sm font-bold uppercase tracking-widest mb-4">How We Work</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
                    A CLOSER LOOK AT OUR OPERATIONS
                </h3>
                <p className="text-white/60 font-light">
                    See how Three Hills Equipment sources, inspects, and delivers premium machinery to sites across Nigeria.
                </p>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-video w-full border border-white/10 bg-[#111] overflow-hidden shadow-2xl"
            >
                <video
                    controls
                    className="w-full h-full object-cover"
                    poster="/assets/images/machine-3.webp"
                >
                    <source src="/assets/videos/main.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        </div>
    </section>
  );
}
