"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          THREE <span className="text-[var(--gold)]">HILLS</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/inventory"
            className="hidden md:block text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Inventory
          </Link>
          <Link
            href="/#about"
            className="hidden md:block text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="hidden md:block text-sm font-medium text-white/80 hover:text-[var(--gold)] transition-colors"
          >
            Contact
          </Link>
          
          <a
            href="https://wa.me/2349157842210" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--gold)] text-black font-bold text-sm rounded-full hover:bg-[var(--gold-hover)] transition-colors"
          >
            <Phone size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
