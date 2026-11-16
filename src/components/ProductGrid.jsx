import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { Gift } from 'lucide-react';

export default function ProductGrid({ onBuyNow, onViewDetails }) {
  return (
    <section id="collection" className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10 sm:mb-14 lg:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50 border border-gold-500/40 text-burgundy-600 text-xs font-serif font-bold uppercase tracking-widest shadow-sm">
          <Gift className="w-3.5 h-3.5 text-gold-500" />
          The Royal Hamper Selection
        </div>
        
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-darkbrown-900 leading-tight">
          Sheru Bai Gift Box Collection
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-darkbrown-700 max-w-2xl mx-auto font-normal px-2">
          Each box is carefully assembled with love, tied with our signature gold ribbon, 
          and includes your custom heartfelt message.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-burgundy-500 mx-auto rounded-full mt-2" />
      </div>

      {/* 6 Products Grid: 1 col on mobile, 2 cols on tablet, 3 cols on laptop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onBuyNow={onBuyNow}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Under-Grid Assurance Banner */}
      <div className="mt-10 sm:mt-14 p-5 sm:p-6 rounded-2xl bg-cream-50 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-3.5 sm:gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-gold-100 border border-gold-400 flex items-center justify-center flex-shrink-0 text-xl shadow-xs">
            🦁
          </div>
          <div>
            <h4 className="font-serif font-bold text-darkbrown-900 text-sm sm:text-base">
              The Sheru Bai Promise
            </h4>
            <p className="text-xs text-darkbrown-700">
              Hand-packed in hygienic, premium boxes with tamper-proof seal and priority doorstep delivery.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-semibold text-darkbrown-800">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-gold-200 shadow-2xs">
            🚚 Express Air Courier
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white border border-gold-200 shadow-2xs">
            💌 Custom Wax-Sealed Note
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white border border-gold-200 shadow-2xs">
            🔒 100% Secure Checkout
          </span>
        </div>
      </div>

    </section>
  );
}
