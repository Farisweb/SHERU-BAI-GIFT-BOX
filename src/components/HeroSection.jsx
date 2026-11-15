import React from 'react';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Gift } from 'lucide-react';

export default function HeroSection({ onExploreClick, onOrderClick }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background Decorative Gold Ornaments & Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-burgundy-200/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story-Driven Luxury Typography */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Royal Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50 border border-gold-500/40 shadow-sm">
              <span className="text-base">🦁</span>
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-burgundy-500">
                Official Royal Gifting Atelier
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <span className="text-xs font-semibold text-gold-700">Pan-India Express</span>
            </div>

            {/* Main Brand Title & Tagline */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-darkbrown-900 leading-tight">
                Not Just a Gift. <br />
                <span className="gold-gradient-text italic">It's a Feeling.</span>
              </h1>
              <p className="font-serif text-lg sm:text-2xl text-burgundy-600 font-semibold flex items-center justify-center lg:justify-start gap-2">
                <span>A Small Gift Can Create a Big Smile.</span>
                <Heart className="w-5 h-5 text-burgundy-500 fill-burgundy-500 animate-pulse inline" />
              </p>
            </div>

            {/* Emotional Narrative Intro */}
            <p className="text-darkbrown-800 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Life is full of special people — parents, siblings, friends, partners, teachers and everyone who makes our journey meaningful. 
              Sometimes words fall short; that’s where <strong>SHERU BAI GIFT BOX</strong> turns emotions into unforgettable unboxing moments.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-cream-50/80 border border-gold-200 text-center">
                <span className="block font-serif font-bold text-lg text-burgundy-600">4 Tiers</span>
                <span className="text-[11px] text-darkbrown-600">₹99 to ₹999</span>
              </div>
              <div className="p-3 rounded-xl bg-cream-50/80 border border-gold-200 text-center">
                <span className="block font-serif font-bold text-lg text-gold-600">100% Free</span>
                <span className="text-[11px] text-darkbrown-600">Pan-India Shipping</span>
              </div>
              <div className="p-3 rounded-xl bg-cream-50/80 border border-gold-200 text-center">
                <span className="block font-serif font-bold text-lg text-burgundy-600">Personalized</span>
                <span className="text-[11px] text-darkbrown-600">Wax-Sealed Note</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-burgundy-500 hover:bg-burgundy-600 text-cream-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-burgundy-glow transition-all text-sm tracking-wide group"
              >
                <span>Choose Your Gift Box</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-300" />
              </button>
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gold-500 text-darkbrown-900 hover:bg-gold-500 hover:text-white font-semibold px-7 py-3.5 rounded-full transition-all text-sm"
              >
                <Gift className="w-4 h-4 text-gold-600" />
                <span>Instant Gift Checkout</span>
              </button>
            </div>

            {/* Micro reassurance */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-darkbrown-600 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" /> Secure Payments
              </span>
              <span>•</span>
              <span>No Subscription or Hidden Fees</span>
              <span>•</span>
              <span>Direct Doorstep Delivery</span>
            </div>

          </div>

          {/* Right Column: Hero Visual with White Lion & Luxury Gift Box Display */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Centerpiece Luxury Box Graphic with Floating Accents */}
            <div className="relative w-full max-w-md">
              
              {/* Outer Golden Glow Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-gold-400/20 via-gold-200/30 to-transparent blur-xl transform -rotate-3" />

              {/* Card Container */}
              <div className="relative bg-cream-50 rounded-3xl p-6 sm:p-8 border-2 border-gold-500/40 shadow-2xl overflow-hidden">
                
                {/* Top Corner Lion Crest Watermark */}
                <div className="absolute -top-6 -right-6 w-32 h-32 opacity-10 pointer-events-none">
                  <img src="/lion-crest.svg" alt="crest watermark" className="w-full h-full" />
                </div>

                {/* Hero Showcase Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-b from-cream-200 to-cream-100 shadow-inner group">
                  <img 
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80" 
                    alt="Sheru Bai Luxury Gift Box"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Price Pill */}
                  <div className="absolute bottom-3 left-3 bg-darkbrown-900/90 backdrop-blur-md text-cream-100 px-3 py-1.5 rounded-full text-xs font-semibold border border-gold-500/40 flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    Starting at just ₹99
                  </div>
                </div>

                {/* Box Detail Highlights */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-darkbrown-900">
                        Signature Sheru Bai Collection
                      </h3>
                      <p className="text-xs text-gold-700 font-medium">
                        Handcrafted with Love in Every Ribbon
                      </p>
                    </div>
                    {/* Wax Seal Emblem */}
                    <div className="wax-seal flex-shrink-0">
                      <span className="text-xs">🦁</span>
                    </div>
                  </div>

                  {/* Customer Quote Snippet */}
                  <div className="p-3 rounded-xl bg-gold-50/60 border border-gold-200 text-xs text-darkbrown-800 italic">
                    "Sent the Gold Box to my sister for her birthday. The wax seal note and packaging brought tears of joy!"
                    <span className="block mt-1 text-[11px] font-semibold text-gold-800 not-italic">
                      — Priya S., Bengaluru
                    </span>
                  </div>

                </div>

              </div>

              {/* Floating Guarantee Badge */}
              <div className="absolute -bottom-4 -left-4 bg-burgundy-500 text-cream-100 p-3 rounded-2xl shadow-xl border border-gold-400 flex items-center gap-2.5 max-w-[220px]">
                <div className="w-8 h-8 rounded-full bg-burgundy-700 flex items-center justify-center flex-shrink-0 text-gold-300">
                  🎁
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">100% Happiness</div>
                  <div className="text-[10px] text-cream-200 leading-tight">Every box creates a memory</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
