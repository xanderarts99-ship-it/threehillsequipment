"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
         <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay */}
         <video 
           autoPlay 
           muted 
           loop 
           playsInline
           className="w-full h-full object-cover opacity-80"
           poster="/assets/images/machine-1.webp"
         >
           <source src="/assets/videos/hero.mp4" type="video/mp4" />
         </video>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center max-w-5xl px-4"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
          HEAVY DUTY.<br/>
          <span className="text-[var(--gold)]">
            READY TO WORK.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 font-light max-w-2xl mx-auto">
          Lagos's premier supplier of durable excavators, bulldozers, and construction machinery.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
                href="/inventory"
                className="px-8 py-4 bg-[var(--gold)] text-black font-bold text-lg rounded-none hover:bg-[var(--gold-hover)] transition-all flex items-center justify-center"
            >
                VIEW INVENTORY
            </Link>
            <Link 
                href="https://wa.me/2349157842210"
                target="_blank"
                className="px-8 py-4 border border-white/20 text-white font-medium text-lg rounded-none hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center"
            >
                CONTACT US
            </Link>
        </div>
      </motion.div>
    </div>
  )
}
