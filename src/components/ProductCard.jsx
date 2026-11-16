import React from 'react';
import { Star, CheckCircle2, Eye, Sparkles, ArrowRight, Truck } from 'lucide-react';

export default function ProductCard({ product, onBuyNow, onViewDetails }) {
  return (
    <div className="cream-card rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 group border-2 border-gold-500/25 hover:border-gold-500/60 relative shadow-sm hover:shadow-luxury-hover">
      
      {/* Top Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-md ${product.badgeColor}`}>
          {product.badge}
        </span>
      </div>

      {/* Dynamic Delivery Tag */}
      <div className={`absolute top-4 right-4 z-10 backdrop-blur-sm border text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm ${
        product.deliveryFee === 0 
          ? 'bg-green-100/95 border-green-300 text-green-800' 
          : 'bg-cream-50/95 border-gold-400/50 text-darkbrown-800'
      }`}>
        <Truck className="w-3 h-3 text-gold-600" />
        {product.deliveryFee === 0 ? 'FREE Delivery' : `+₹${product.deliveryFee} Delivery`}
      </div>

      {/* Product Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkbrown-900/60 via-transparent to-transparent opacity-60" />
        
        {/* Quick View Button */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-darkbrown-900 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm transition-all touch-press active:scale-95 border border-gold-300/40"
        >
          <Eye className="w-3.5 h-3.5 text-burgundy-500" />
          <span>What's Inside</span>
        </button>

        {/* Mascot Watermark on image bottom */}
        <div className="absolute bottom-3 left-3 text-white/90 text-xs font-serif font-bold tracking-wide flex items-center gap-1 drop-shadow">
          <span>{product.icon}</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Header & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-darkbrown-900 group-hover:text-burgundy-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 bg-gold-50 px-2 py-0.5 rounded border border-gold-300/40 text-xs font-semibold text-gold-800">
              <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          <p className="text-xs font-medium text-gold-700 italic font-serif">
            "{product.tagline}"
          </p>

          <p className="text-xs text-darkbrown-700 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Highlights List */}
          <ul className="mt-4 space-y-1.5 text-xs text-darkbrown-800">
            {product.highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & BUY NOW CTA */}
        <div className="pt-4 border-t border-gold-500/20 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-darkbrown-600 font-medium">Box Price:</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown-900">
                  ₹{product.price}
                </span>
                <span className={`text-[11px] font-semibold ${product.deliveryFee === 0 ? 'text-green-700' : 'text-burgundy-600'}`}>
                  {product.deliveryFee === 0 ? '(Free Delivery)' : `(+₹${product.deliveryFee} Delivery)`}
                </span>
              </div>
            </div>
            <div className="wax-seal w-9 h-9 border border-gold-400">
              <span className="text-[10px]">🦁</span>
            </div>
          </div>

          {/* Official BUY NOW Button */}
          <button
            onClick={() => onBuyNow(product)}
            className="w-full bg-burgundy-500 hover:bg-burgundy-600 active:bg-burgundy-700 text-cream-100 font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-burgundy-glow transition-all flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wider uppercase touch-press shimmer-button group/btn"
          >
            <span>BUY NOW</span>
            <ArrowRight className="w-4 h-4 text-gold-300 group-hover/btn:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
}
