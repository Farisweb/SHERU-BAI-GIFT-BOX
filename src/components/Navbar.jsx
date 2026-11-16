import React, { useState, useRef, useEffect } from 'react';
import { Package, Truck, Sparkles, Menu, X, Heart, ShieldCheck, Search, BellRing, ChevronRight, MessageCircle } from 'lucide-react';
import brandLogo from '../assets/sheru-baai-logo.jpg';

export default function Navbar({ 
  onOpenTrackOrder, 
  onOpenDirectOrder, 
  onSecretAdminTrigger, 
  announcementText = '🚀 Sheru Baai Mobile Application Coming Soon! • Handcrafted Luxury Gift Boxes Available for Order Now 🎉',
  cartItemCount = 0 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  // Prevent background scroll when mobile side drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogoClick = (e) => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      e.preventDefault();
      clickCountRef.current = 0;
      if (onSecretAdminTrigger) {
        onSecretAdminTrigger();
      }
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-100/95 backdrop-blur-md border-b border-gold-500/25 shadow-xs transition-all">
      {/* Top Announcement Bar (Customizable via Admin Panel) */}
      <div className="bg-gradient-to-r from-burgundy-700 via-burgundy-600 to-burgundy-800 text-cream-100 text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-xs border-b border-gold-400/20">
        <div className="flex items-center justify-center gap-1.5 max-w-7xl mx-auto flex-wrap">
          <BellRing className="w-3.5 h-3.5 text-gold-400 animate-pulse flex-shrink-0" />
          <span className="font-semibold leading-tight">{announcementText}</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Mascot (Triple-click activates hidden admin portal) */}
        <a 
          href="#" 
          onClick={handleLogoClick}
          title="Sheru Baai Gift Box"
          className="flex items-center gap-2.5 sm:gap-3.5 group select-none cursor-pointer touch-press"
        >
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-gold-500 shadow-md group-hover:scale-105 transition-transform flex-shrink-0 bg-darkbrown-950">
            <img 
              src={brandLogo} 
              alt="Sheru Baai Gift Box Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-xl lg:text-2xl font-bold tracking-wider text-darkbrown-900 group-hover:text-burgundy-500 transition-colors flex items-center gap-1">
              SHERU BAAI <span className="text-gold-500">GIFT BOX</span>
              <span className="text-sm sm:text-base">🦁</span>
            </span>
            <span className="text-[9.5px] sm:text-[11px] lg:text-xs text-gold-700 tracking-widest uppercase font-semibold font-serif leading-none mt-0.5">
              Not Just a Gift. It's a Feeling.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium text-darkbrown-900">
          <a href="#collection" className="hover:text-burgundy-500 transition-colors py-1">
            Gift Boxes
          </a>
          <a href="#story" className="hover:text-burgundy-500 transition-colors py-1">
            Our Story
          </a>
          <a href="#why-us" className="hover:text-burgundy-500 transition-colors py-1">
            Why Sheru Bai
          </a>
          <a href="#contact" className="hover:text-burgundy-500 transition-colors py-1">
            Contact Us
          </a>
          
          <button 
            onClick={onOpenTrackOrder}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold-500/40 text-darkbrown-900 hover:border-gold-500 hover:bg-gold-50 transition-all text-xs font-semibold touch-press"
          >
            <Search className="w-3.5 h-3.5 text-gold-600" />
            Track Order
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Track Icon for Mobile */}
          <button
            onClick={onOpenTrackOrder}
            className="md:hidden p-2 rounded-xl text-darkbrown-800 hover:bg-gold-100 transition-colors touch-press border border-gold-300/50"
            title="Track Order"
            aria-label="Track Order"
          >
            <Search className="w-4 h-4 text-gold-700" />
          </button>

          {/* Desktop Order Button */}
          <button
            onClick={() => onOpenDirectOrder()}
            className="hidden sm:inline-flex items-center gap-2 bg-burgundy-500 hover:bg-burgundy-600 text-cream-100 font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm tracking-wide shadow-md hover:shadow-burgundy-glow transition-all shimmer-button touch-press"
          >
            <Package className="w-4 h-4 text-gold-300" />
            Order a Gift
          </button>

          {/* Mobile Side Drawer Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl bg-cream-50 text-darkbrown-900 hover:bg-gold-100 transition-colors border border-gold-400/40 shadow-xs touch-press"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-6 h-6 text-darkbrown-900" />
          </button>
        </div>
      </nav>

      {/* Royal Mobile Slide-Over Side Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-darkbrown-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sliding Side Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[84%] max-w-sm bg-cream-50 border-l-2 border-gold-500 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div>
              <div className="bg-gradient-to-r from-burgundy-700 to-burgundy-800 text-cream-100 p-5 flex items-center justify-between border-b-2 border-gold-400">
                <a 
                  href="#" 
                  onClick={(e) => {
                    handleLogoClick(e);
                  }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-400 bg-black flex-shrink-0">
                    <img src={brandLogo} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm tracking-wider text-white block">
                      SHERU BAAI 🦁
                    </span>
                    <span className="text-[10px] text-gold-300 tracking-wider uppercase font-serif">
                      Royal Gift Box
                    </span>
                  </div>
                </a>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-burgundy-900/80 hover:bg-burgundy-950 text-cream-100 flex items-center justify-center border border-gold-400/50 touch-press"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="p-5 space-y-1 text-darkbrown-900 font-medium">
                <a 
                  href="#collection" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-gold-100/70 transition-colors border-b border-gold-200/50 text-sm"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">🎁</span>
                    <span className="font-serif font-bold">Gift Box Collection</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gold-600" />
                </a>

                <a 
                  href="#story" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-gold-100/70 transition-colors border-b border-gold-200/50 text-sm"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-burgundy-500" />
                    <span>Our Story & Heart</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gold-600" />
                </a>

                <a 
                  href="#why-us" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-gold-100/70 transition-colors border-b border-gold-200/50 text-sm"
                >
                  <span className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-gold-600" />
                    <span>Why Choose Us</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gold-600" />
                </a>

                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-gold-100/70 transition-colors text-sm"
                >
                  <span className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-burgundy-600" />
                    <span>Contact Support</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-gold-600" />
                </a>
              </div>

              {/* Action Buttons inside Drawer */}
              <div className="px-5 pt-2 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrackOrder();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-gold-500 text-darkbrown-900 rounded-xl text-xs sm:text-sm font-bold hover:bg-gold-50 touch-press shadow-xs"
                >
                  <Search className="w-4 h-4 text-gold-600" />
                  Track Existing Order
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDirectOrder();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-burgundy-500 hover:bg-burgundy-600 text-cream-100 rounded-xl text-xs sm:text-sm font-bold shadow-md touch-press shimmer-button"
                >
                  <Package className="w-4 h-4 text-gold-300" />
                  Choose & Order Gift Box
                </button>
              </div>
            </div>

            {/* Drawer Footer & Social Community */}
            <div className="p-5 border-t border-gold-300/60 bg-cream-100/60 space-y-3">
              <span className="text-[10px] font-bold text-darkbrown-600 uppercase tracking-widest block text-center">
                Join Our Official Community
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.instagram.com/sheru_baaai?vrfl=dHVkOGIxdG10Yjhk"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-gold-300 text-xs font-semibold text-darkbrown-900 shadow-xs touch-press"
                >
                  <span>📸</span>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://t.me/sherubaai"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-gold-300 text-xs font-semibold text-darkbrown-900 shadow-xs touch-press"
                >
                  <span>✈️</span>
                  <span>Telegram</span>
                </a>
              </div>
              <p className="text-[10px] text-center text-darkbrown-500 font-serif italic pt-1">
                "Not Just a Gift. It's a Feeling. 🦁"
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
