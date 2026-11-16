import React, { useState, useRef } from 'react';
import { Package, Truck, Sparkles, Menu, X, Heart, ShieldCheck, Search } from 'lucide-react';
import brandLogo from '../assets/sheru-baai-logo.jpg';

export default function Navbar({ onOpenTrackOrder, onOpenDirectOrder, onSecretAdminTrigger, cartItemCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

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
    <header className="sticky top-0 z-40 bg-cream-100/95 backdrop-blur-md border-b border-gold-500/25 shadow-sm transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-burgundy-500 text-cream-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-gold-400" />
          Free Express Delivery Across India on All Gift Boxes
        </span>
        <span className="hidden md:inline text-gold-400">•</span>
        <span className="hidden md:inline flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Hand-Packed with Love & Personalized Greeting Cards
        </span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Mascot (Triple-click activates hidden admin portal) */}
        <a 
          href="#" 
          onClick={handleLogoClick}
          title="Sheru Baai Gift Box"
          className="flex items-center gap-3 group select-none cursor-pointer"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-gold-500 shadow-md group-hover:scale-105 transition-transform flex-shrink-0 bg-darkbrown-950">
            <img 
              src={brandLogo} 
              alt="Sheru Baai Gift Box Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-darkbrown-900 group-hover:text-burgundy-500 transition-colors flex items-center gap-1.5">
              SHERU BAAI <span className="text-gold-500">GIFT BOX</span>
              <span className="text-base">🦁</span>
            </span>
            <span className="text-[11px] sm:text-xs text-gold-700 tracking-widest uppercase font-semibold font-serif">
              Not Just a Gift. It's a Feeling.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-darkbrown-900">
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-500/40 text-darkbrown-900 hover:border-gold-500 hover:bg-gold-50 transition-all text-xs font-semibold"
          >
            <Search className="w-3.5 h-3.5 text-gold-600" />
            Track Order
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenDirectOrder()}
            className="hidden sm:inline-flex items-center gap-2 bg-burgundy-500 hover:bg-burgundy-600 text-cream-100 font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm tracking-wide shadow-md hover:shadow-burgundy-glow transition-all active:scale-95"
          >
            <Package className="w-4 h-4 text-gold-300" />
            Order a Gift
          </button>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-darkbrown-900 hover:bg-gold-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50 border-b border-gold-500/30 px-6 py-6 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 font-medium text-darkbrown-900">
            <a 
              href="#collection" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-2 hover:text-burgundy-500 border-b border-gold-100 flex items-center justify-between"
            >
              <span>Gift Box Collection</span>
              <span className="text-gold-500">🎁</span>
            </a>
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-2 hover:text-burgundy-500 border-b border-gold-100 flex items-center justify-between"
            >
              <span>Our Story & Heart</span>
              <Heart className="w-4 h-4 text-burgundy-400" />
            </a>
            <a 
              href="#why-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-2 hover:text-burgundy-500 border-b border-gold-100 flex items-center justify-between"
            >
              <span>Why Choose Us</span>
              <ShieldCheck className="w-4 h-4 text-gold-600" />
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-2 hover:text-burgundy-500 border-b border-gold-100"
            >
              Contact Support
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackOrder();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-gold-500 text-darkbrown-900 rounded-xl text-sm font-semibold hover:bg-gold-50"
            >
              <Search className="w-4 h-4 text-gold-600" />
              Track Existing Order
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDirectOrder();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-burgundy-500 text-cream-100 rounded-xl text-sm font-semibold shadow-md active:scale-95"
            >
              <Package className="w-4 h-4 text-gold-300" />
              Choose & Order Box
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
