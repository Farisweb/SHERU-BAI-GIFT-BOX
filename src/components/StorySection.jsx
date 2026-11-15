import React from 'react';
import { Sparkles, Smile } from 'lucide-react';
import brandLogo from '../assets/sheru-baai-logo.jpg';

export default function StorySection({ onSelectBoxClick }) {
  return (
    <section id="story" className="py-16 md:py-24 bg-cream-50/70 border-y border-gold-500/20 relative overflow-hidden">
      
      {/* Background Subtle Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none rounded-full overflow-hidden">
        <img src={brandLogo} alt="crest motif" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-100 border border-gold-500/40 text-burgundy-600 text-xs font-serif font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            Our Philosophy & Heart
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-darkbrown-900">
            A Small Gift Can Create a <br className="hidden sm:inline" />
            <span className="gold-gradient-text">Big Smile. ❤️</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-burgundy-500 mx-auto rounded-full" />
        </div>

        {/* Narrative Card Styled with Royal Gold Border & Wax Seal */}
        <div className="relative cream-card rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-gold-500/30">
          
          {/* Top Left Floating Quotation Ornament */}
          <div className="absolute -top-6 left-10 w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500 shadow-md bg-black">
            <img src={brandLogo} alt="Sheru Baai Seal" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6 text-darkbrown-900 leading-relaxed sm:text-lg">
            <p className="font-serif text-lg sm:text-xl font-medium text-burgundy-700 italic border-l-4 border-gold-500 pl-4 py-1">
              "Life is full of special people – parents, siblings, friends, partners, teachers and everyone who makes our journey meaningful."
            </p>

            <p className="text-darkbrown-800">
              Sometimes, words are not enough to express how much someone means to us. Sometimes, all we want is to see a genuine smile on someone's face.
            </p>

            <div className="p-6 sm:p-8 rounded-2xl bg-cream-100 border border-gold-300/60 my-6 shadow-sm">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-darkbrown-900 mb-2 flex items-center gap-2">
                <span>That's where Sheru Bai Gift Box comes in.</span>
                <span className="text-gold-500">🦁</span>
              </h3>
              <p className="text-darkbrown-800 leading-relaxed">
                <strong>Sheru Bai</strong> is more than just a gift store. It's a little way of spreading happiness, sharing love and creating beautiful memories through thoughtful, hand-curated gifts.
              </p>
            </div>

            <p className="text-darkbrown-800">
              Whether you want to treat yourself or surprise someone special, we have something for every moment.
              Choose your favourite gift box, add a personal message and send it directly to someone's doorstep.
            </p>

            {/* Emotional Highlight Banner */}
            <div className="pt-4 text-center">
              <p className="font-serif text-xl sm:text-2xl font-bold text-burgundy-600">
                You don't always need a special occasion to make someone feel special.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onSelectBoxClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-burgundy-500 hover:bg-burgundy-600 text-cream-100 font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-burgundy-glow transition-all text-sm tracking-wide"
                >
                  <Smile className="w-4 h-4 text-gold-400" />
                  <span>Make Someone Smile Today!</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom 3-step Journey Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 mt-10 border-t border-gold-500/20 text-center">
            <div className="p-4 rounded-xl bg-white/60 border border-gold-200">
              <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center mx-auto mb-2 font-bold font-serif">1</div>
              <h4 className="font-serif font-bold text-sm text-darkbrown-900">Choose A Box</h4>
              <p className="text-xs text-darkbrown-600 mt-1">From ₹99 Mini to ₹999 Royal Premium</p>
            </div>
            <div className="p-4 rounded-xl bg-white/60 border border-gold-200">
              <div className="w-10 h-10 rounded-full bg-burgundy-100 text-burgundy-600 flex items-center justify-center mx-auto mb-2 font-bold font-serif">2</div>
              <h4 className="font-serif font-bold text-sm text-darkbrown-900">Add Your Words</h4>
              <p className="text-xs text-darkbrown-600 mt-1">Printed on our wax-sealed parchment card</p>
            </div>
            <div className="p-4 rounded-xl bg-white/60 border border-gold-200">
              <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center mx-auto mb-2 font-bold font-serif">3</div>
              <h4 className="font-serif font-bold text-sm text-darkbrown-900">Doorstep Delivery</h4>
              <p className="text-xs text-darkbrown-600 mt-1">Delivered across India with live tracking</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
