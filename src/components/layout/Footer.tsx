import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-black border-t border-white/5 py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            
            {/* Brand */}
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold tracking-tighter text-white mb-6">
                THREE <span className="text-[var(--gold)]">HILLS</span>
              </h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Premium heavy equipment suppliers based in Lagos, Nigeria. 
                Dedicated to powering your construction projects with reliable machinery.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="md:w-1/3">
              <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Explore</h4>
              <ul className="space-y-4">
                <li><Link href="/inventory" className="text-white/60 hover:text-[var(--gold)] text-sm transition-colors">Inventory</Link></li>
                <li><Link href="#" className="text-white/60 hover:text-[var(--gold)] text-sm transition-colors">About Us</Link></li>
                <li><a href="https://wa.me/2349157842210" className="text-white/60 hover:text-[var(--gold)] text-sm transition-colors">Contact</a></li>
              </ul>
            </div>
  
            {/* Contact */}
            <div className="md:w-1/3">
              <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Connect</h4>
              <ul className="space-y-4">
                <li className="text-white/60 text-sm">Lagos, Nigeria</li>
                <li className="text-white/60 text-sm">+234 915 784 2210</li>
                <li className="flex gap-4 mt-6">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all">
                    IN
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all">
                    IG
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} Three Hills Equipment. All rights reserved.
            </p>
            <p className="text-white/20 text-xs text-center md:text-right">
              Designed for Scale.
            </p>
          </div>
        </div>
      </footer>
    )
  }
