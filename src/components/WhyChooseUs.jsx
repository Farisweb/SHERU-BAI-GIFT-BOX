import React from 'react';
import { Heart, Sparkles, Truck, ShieldCheck, Gift, Smile } from 'lucide-react';

export default function WhyChooseUs({ onSelectBoxClick }) {
  const perks = [
    {
      icon: '🦁',
      title: 'The Sheru Bai Mascot & Wax Seal',
      desc: 'Every gift box is hand-stamped with our White Lion emblem — a regal mark of love, warmth, and enduring friendship.'
    },
    {
      icon: '🚚',
      title: 'Express Pan-India Delivery',
      desc: 'Seamless air & ground shipping to 20,000+ PIN codes across all Indian states and Union Territories with real-time milestone tracking.'
    },
    {
      icon: '💌',
      title: 'Bespoke Handwritten Notes',
      desc: 'Your personalized message is printed onto textured parchment stationery with delicate gold-foil borders.'
    },
    {
      icon: '💎',
      title: 'Pure Gifting, Zero Gimmicks',
      desc: 'No coins, no lottery wheels, and no subscription traps. Pure, transparent, and direct luxury gifting from the heart.'
    },
    {
      icon: '🎀',
      title: 'Tamper-Proof Luxury Packaging',
      desc: 'Protected in bubble velvet cushions inside rigid boxes so your surprise reaches their hands in flawless perfection.'
    },
    {
      icon: '❤️',
      title: 'Priced for Every Heart',
      desc: 'Thoughtfully tier-priced from ₹99 Mini to ₹1,999 Royal Emperor Box so everyone can spread happiness without hesitation.'
    }
  ];

  return (
    <section id="why-us" className="py-12 sm:py-16 md:py-24 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cream-50 border border-gold-500/40 text-burgundy-600 text-xs font-serif font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            Crafted for Unforgettable Smiles
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-darkbrown-900 leading-tight">
            Why Choose Sheru Bai Gift Box?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-darkbrown-700 max-w-2xl mx-auto font-normal px-2">
            We don’t just ship boxes — we curate moments of unadulterated joy that stay cherished forever.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-burgundy-500 mx-auto rounded-full mt-2" />
        </div>

        {/* 6 Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {perks.map((p, idx) => (
            <div 
              key={idx}
              className="cream-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border-2 border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-cream-100 border border-gold-300 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                  {p.icon}
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-darkbrown-900 mb-2 group-hover:text-burgundy-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-darkbrown-700 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Call to Action */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-r from-burgundy-700 via-burgundy-600 to-burgundy-800 text-cream-100 p-6 sm:p-10 md:p-12 text-center border-2 border-gold-400 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-3xl block animate-bounce">🦁🎁</span>
            <h3 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Ready to Make Someone Smile Today?
            </h3>
            <p className="text-xs sm:text-sm text-gold-200">
              Pick a gift box, add your personal note, and we will deliver love straight to their doorstep across India.
            </p>
            <div className="pt-2">
              <button
                onClick={onSelectBoxClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-darkbrown-950 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-gold-glow transition-all text-xs sm:text-sm tracking-wide touch-press"
              >
                <Smile className="w-4 h-4" />
                <span>Explore All 6 Gift Boxes</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
