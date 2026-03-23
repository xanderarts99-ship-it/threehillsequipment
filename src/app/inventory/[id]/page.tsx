"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, CheckCircle, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
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
                    {/* Prev Arrow */}
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImage((activeImage - 1 + gallery.length) % gallery.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[var(--gold)] hover:text-black text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={22} />
                        </button>
                        <button
                          onClick={() => setActiveImage((activeImage + 1) % gallery.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[var(--gold)] hover:text-black text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                          aria-label="Next image"
                        >
                          <ChevronRight size={22} />
                        </button>
                        {/* Dot indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {gallery.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveImage(i)}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                i === activeImage ? "bg-[var(--gold)] w-4" : "bg-white/40 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
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
                    
                    {/* Social Links */}
                    <div>
                      <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Follow Us</p>
                      <div className="flex gap-2">
                        {/* TikTok */}
                        <a href="https://www.tiktok.com/@threehillsequipme?_r=1&_t=ZS-94ve5FmWrOE" target="_blank" rel="noopener noreferrer"
                          className="flex-1 py-3 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all" title="TikTok">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                          </svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/threehillsmachinery?igsh=MXh6OWRmdW4ybzZ2Yw==" target="_blank" rel="noopener noreferrer"
                          className="flex-1 py-3 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all" title="Instagram">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                          </svg>
                        </a>
                        {/* Facebook */}
                        <a href="https://www.facebook.com/share/1H1Xk91MyB/" target="_blank" rel="noopener noreferrer"
                          className="flex-1 py-3 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all" title="Facebook">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                          </svg>
                        </a>
                        {/* YouTube */}
                        <a href="https://www.youtube.com/@threehillsequipments?si=uyJhSwhAuWcA8I1p" target="_blank" rel="noopener noreferrer"
                          className="flex-1 py-3 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all" title="YouTube">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                    
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
