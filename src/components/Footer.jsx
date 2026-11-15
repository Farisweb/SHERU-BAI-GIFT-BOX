import React from 'react';
import { Heart, Send, Sparkles, Truck, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ onOpenPolicy, onOpenTrackOrder }) {
  return (
    <footer className="bg-darkbrown-950 text-cream-100 border-t-2 border-gold-500/40 relative overflow-hidden">
      
      {/* Background Crest Watermark */}
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-5 pointer-events-none">
        <img src="/lion-crest.svg" alt="crest watermark" className="w-full h-full" />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Mascot (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0">
                <img 
                  src="/lion-crest.svg" 
                  alt="Sheru Bai White Lion" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-cream-100 flex items-center gap-1.5">
                  SHERU BAI <span className="text-gold-400">GIFT BOX</span>
                  <span>🦁</span>
                </span>
                <span className="text-xs text-gold-300 font-serif tracking-widest uppercase block font-semibold">
                  Not Just a Gift. It's a Feeling.
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed max-w-sm">
              Sheru Bai is more than just a gift store. It's a little way of spreading happiness, sharing love and creating beautiful memories through thoughtful gifts delivered straight to doorsteps across India.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-gold-500 hover:text-darkbrown-900 border border-gold-500/40 flex items-center justify-center transition-all text-cream-100"
                aria-label="Instagram"
              >
                <span className="text-base">📸</span>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-gold-500 hover:text-darkbrown-900 border border-gold-500/40 flex items-center justify-center transition-all text-cream-100"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <span className="text-xs text-gold-300 font-medium ml-2">
                Join our @sherubaigiftbox family
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-widest border-b border-gold-500/30 pb-2">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li>
                <a href="#collection" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <span>🎁</span> Mini Box (₹99)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <span>🥈</span> Silver Box (₹199)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <span>🥇</span> Gold Box (₹499)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <span>💎</span> Premium Box (₹999)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-widest border-b border-gold-500/30 pb-2">
              Brand & Policies
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li>
                <button 
                  onClick={() => onOpenPolicy('about')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  About Us & Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('contact')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Shipping & Pan-India Delivery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTrackOrder}
                  className="text-gold-400 hover:text-gold-300 font-semibold transition-colors text-left flex items-center gap-1"
                >
                  <Truck className="w-3.5 h-3.5" /> Track Existing Order
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Reassurance (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-widest border-b border-gold-500/30 pb-2">
              Reach Out
            </h4>
            <div className="space-y-2 text-xs text-cream-200/80">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>care@sherubaigiftbox.com</span>
              </p>
              <p className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Sheru Bai Atelier, Mumbai, Maharashtra, India</span>
              </p>
            </div>

            <div className="pt-2">
              <div className="p-2.5 rounded-xl bg-burgundy-900/60 border border-burgundy-700 text-[11px] text-cream-200">
                🔒 Safe & Secure Payments via UPI, Cards, and NetBanking.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Promise */}
        <div className="mt-12 pt-6 border-t border-cream-100/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>© {new Date().getFullYear()} SHERU BAI GIFT BOX 🦁. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-gold-400 font-serif">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-burgundy-400 fill-burgundy-400 inline" />
            <span>for smiles across India.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
