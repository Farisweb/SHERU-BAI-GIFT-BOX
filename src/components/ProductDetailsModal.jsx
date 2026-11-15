import React from 'react';
import { X, Check, Star, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';

export default function ProductDetailsModal({ product, onClose, onBuyNow }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-darkbrown-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-cream-50 w-full max-w-2xl rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-cream-100 hover:bg-gold-100 border border-gold-400 flex items-center justify-center text-darkbrown-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-cream-200">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-cream-50/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${product.badgeColor}`}>
              {product.badge}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-darkbrown-900 mt-1">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Price & Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gold-200">
            <div>
              <p className="font-serif text-sm italic text-burgundy-700">
                "{product.tagline}"
              </p>
              <p className="text-xs text-darkbrown-600 mt-0.5">
                {product.description}
              </p>
            </div>
            <div className="sm:text-right flex-shrink-0">
              <span className="font-serif text-3xl font-bold text-darkbrown-900">
                ₹{product.price}
              </span>
              <span className="block text-[11px] text-gold-700 font-semibold">
                Free Delivery Included
              </span>
            </div>
          </div>

          {/* Itemized Contents: What's Inside */}
          <div>
            <h4 className="font-serif font-bold text-base text-darkbrown-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" />
              Detailed Box Contents:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.details.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/80 border border-gold-200/80 shadow-xs">
                  <div className="text-xs font-bold text-burgundy-700 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold-600" />
                    <span>{item.name}</span>
                  </div>
                  <p className="text-[11px] text-darkbrown-600 mt-1 pl-5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Guarantees */}
          <div className="p-4 rounded-xl bg-gold-50/70 border border-gold-300 text-xs text-darkbrown-800 space-y-2">
            <div className="font-bold font-serif text-gold-900 flex items-center gap-1.5">
              <span>🦁</span>
              <span>The Sheru Bai Packaging Experience:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every box comes with our signature White Lion wax emblem, personalized parchment greeting card with your message, and protective tamper-evident shipping packaging.
            </p>
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onBuyNow(product);
              }}
              className="w-full bg-burgundy-500 hover:bg-burgundy-600 text-cream-100 font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-burgundy-glow transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
            >
              <span>BUY NOW • ₹{product.price}</span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 border border-darkbrown-300 hover:bg-cream-100 text-darkbrown-800 rounded-xl text-xs font-semibold"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
