"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, CheckCircle, Clock, MapPin, Share2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Machine } from "@/types";

export default function MachineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [machine, setMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMachine() {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setMachine(data);
      setLoading(false);
    }
    fetchMachine();
  }, [id, supabase]);

  const [activeImage, setActiveImage] = useState(0);

  if (loading) return <div className="min-h-screen bg-black" />;

  // Fallback if not found
  if (!machine) {
     return (
       <div className="min-h-screen bg-black text-white flex items-center justify-center">
         <div className="text-center">
             <h1 className="text-4xl font-bold mb-4">Item Not Found</h1>
             <Link href="/inventory" className="text-[var(--gold)] hover:underline">Back to Inventory</Link>
         </div>
       </div>
     );
  }

  // Gallery Logic
  const gallery = (machine.gallery && machine.gallery.length > 0) 
      ? machine.gallery 
      : [machine.image || "/assets/images/machine-1.webp"];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-32">
        {/* ... (rest of the corrected return block) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: Gallery & Specs */}
            <div className="lg:col-span-8">
                {/* Main Image */}
                <div className="relative aspect-video bg-[#1a1a1a] mb-4 border border-white/10 overflow-hidden group">
                    <img 
                        src={gallery[activeImage]} 
                        alt={`${machine.name} View ${activeImage + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4 mb-12">
                    {gallery.map((img, index) => (
                        <button 
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`relative aspect-video bg-[#1a1a1a] border overflow-hidden ${
                                activeImage === index ? "border-[var(--gold)]" : "border-white/10 hover:border-white/30"
                            } transition-colors`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>

                {/* Description */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 text-white">Description</h2>
                    <p className="text-white/70 leading-relaxed font-light whitespace-pre-line">
                        {machine.description ? machine.description : (
                            <>
                            This {machine.name} is a high-performance {machine.category} designed for heavy-duty applications. 
                            It has been thoroughly inspected and is ready for immediate deployment. 
                            Features a reinforced chassis, high-efficiency engine, and ergonomic operator cabin.
                            Perfect for construction, mining, and roadwork projects in Nigeria.
                            </>
                        )}
                    </p>
                </div>

                {/* Technical Specs Table */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-white">Technical Specifications</h2>
                    {machine.specs && machine.specs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {machine.specs.map((spec, i) => (
                                <div key={i} className="flex justify-between border-b border-white/10 py-3">
                                    <span className="text-white/50">{spec.label}</span>
                                    <span className="font-medium">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/30 italic">No specific technical details available for this item.</p>
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN: Sticky Sidebar */}
            <div className="lg:col-span-4">
                <div className="sticky top-32 bg-[#111] p-8 border border-white/10">
                    <span className="text-[var(--gold)] text-xs font-bold uppercase tracking-widest mb-2 block">
                        {machine.category}
                    </span>
                    <h1 className="text-3xl font-bold mb-2 leading-none">{machine.name}</h1>
                    <div className="h-1 w-12 bg-white/20 my-4" />
                    
                    <div className="flex items-end gap-3 mb-8">
                         <span className="text-3xl font-bold">{machine.price}</span>
                         <span className="text-sm text-white/40 mb-1">Neg.</span>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <CheckCircle size={16} className="text-green-500" />
                            <span>Available for Inspection</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <MapPin size={16} className="text-[var(--gold)]" />
                            <span>Lagos, Nigeria</span>
                        </div>
                         <div className="flex items-center gap-3 text-sm text-white/70">
                            <Clock size={16} className="text-[var(--gold)]" />
                            <span>2,450 Hours</span>
                        </div>
                    </div>

                    <a
                        href={`https://wa.me/2349157842210?text=I'm interested in the ${machine.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--gold)] text-black font-bold text-lg hover:bg-[var(--gold-hover)] transition-colors mb-4"
                    >
                        <Phone size={20} />
                        <span>WHATSAPP INQUIRY</span>
                    </a>
                    
                    <button className="flex items-center justify-center gap-2 w-full py-4 border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
                        <Share2 size={18} />
                        <span>SHARE LISTING</span>
                    </button>
                    
                    <p className="text-xs text-center text-white/30 mt-6">
                        * Prices are subject to change based on exchange rates.
                    </p>
                </div>
            </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
