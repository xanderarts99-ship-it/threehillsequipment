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
                <li className="flex gap-3 mt-6 flex-wrap">
                  {/* TikTok */}
                  <a href="https://www.tiktok.com/@threehillsequipme?_r=1&_t=ZS-94ve5FmWrOE" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all"
                    title="TikTok"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/threehillsmachinery?igsh=MXh6OWRmdW4ybzZ2Yw==" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all"
                    title="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/share/1H1Xk91MyB/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all"
                    title="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://www.youtube.com/@threehillsequipments?si=uyJhSwhAuWcA8I1p" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all"
                    title="YouTube"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                    </svg>
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
