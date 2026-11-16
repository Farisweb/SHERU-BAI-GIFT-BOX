import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Truck, Gift, Printer } from 'lucide-react';
import brandLogo from '../assets/sheru-baai-logo.jpg';

export default function OrderConfirmationModal({ order, onClose, onTrackOrder }) {
  useEffect(() => {
    // Launch celebratory gold and burgundy confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C6A15B', '#681C32', '#FFF9F0', '#EAD6AA', '#30251F']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#C6A15B', '#681C32']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#C6A15B', '#681C32']
        });
      }, 300);
    } catch (e) {
      // fallback if confetti blocked
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-darkbrown-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-cream-50 w-full max-w-2xl rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className="bg-gradient-to-r from-burgundy-600 via-burgundy-500 to-burgundy-700 text-cream-100 p-6 sm:p-8 text-center relative overflow-hidden border-b-2 border-gold-400">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none rounded-full overflow-hidden">
            <img src={brandLogo} alt="crest" className="w-full h-full object-cover" />
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full overflow-hidden border-2 border-gold-400 mb-3 shadow-lg bg-black">
            <img src={brandLogo} alt="Sheru Baai" className="w-full h-full object-cover" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/20 border border-gold-300 text-gold-300 text-xs font-serif font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Order Placed Successfully!
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Thank You, {order.customerName}!
          </h2>
          <p className="text-xs sm:text-sm text-gold-200 mt-1 max-w-md mx-auto">
            Your heartfelt gift has been received at the Sheru Bai Atelier. We are now preparing to make someone smile!
          </p>

          <div className="mt-4 inline-block bg-burgundy-800/80 border border-gold-400/60 rounded-xl px-4 py-2">
            <span className="text-[11px] text-cream-200 uppercase tracking-widest block">Your Order ID</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-gold-300 tracking-wider">
              {order.orderId}
            </span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Status & Estimated Delivery */}
          <div className="p-4 rounded-2xl bg-gold-50 border border-gold-300/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-gold-900 font-bold uppercase tracking-wider">
                  Estimated Delivery
                </span>
                <div className="font-serif text-base font-bold text-darkbrown-900">
                  {order.pinStatus?.estimatedDays || '3 - 5 Business Days'}
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800 border border-green-300">
              Paid • {order.paymentMethod}
            </span>
          </div>

          {/* Product & Recipient Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-gold-200 space-y-2">
              <span className="text-gold-700 font-bold uppercase tracking-wider text-[10px] block">
                Gift Box Details
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{order.product.icon}</span>
                <div>
                  <div className="font-serif font-bold text-sm text-darkbrown-900">{order.product.name}</div>
                  <div className="text-burgundy-600 font-bold">
                    {order.deliveryCharge && order.deliveryCharge > 0 ? (
                      <span>₹{order.product.price} + ₹{order.deliveryCharge} Del. (Total: ₹{order.amount})</span>
                    ) : (
                      <span>₹{order.amount} (Free Express Delivery)</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-darkbrown-600">
                {order.purchaseType === 'gift' ? 'Surprise Gift for someone special' : 'Self Purchase for yourself'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gold-200 space-y-2">
              <span className="text-gold-700 font-bold uppercase tracking-wider text-[10px] block">
                Deliver To
              </span>
              <div className="font-bold text-darkbrown-900 text-xs">
                {order.recipientName} {order.recipientPhone && `(+91 ${order.recipientPhone})`}
              </div>
              <p className="text-[11px] text-darkbrown-600 leading-tight">
                {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </p>
            </div>
          </div>

          {/* Wax-Sealed Gift Card Display if message present */}
          {order.giftMessage && (
            <div className="p-5 rounded-2xl bg-[#FFF8EE] border-2 border-gold-400 relative space-y-2">
              <div className="flex items-center justify-between border-b border-gold-300/80 pb-1.5">
                <span className="text-[10px] font-serif font-bold tracking-widest text-burgundy-800 uppercase flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-gold-600" />
                  Your Custom Gift Message Card
                </span>
                <span className="text-[10px] text-gold-700">Wax-Sealed in Box</span>
              </div>
              <p className="font-serif text-sm italic text-darkbrown-900 py-1">
                "{order.giftMessage}"
              </p>
              <div className="text-right text-[11px] text-darkbrown-700 font-serif">
                — {order.customerName}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onTrackOrder(order.orderId)}
              className="w-full bg-burgundy-500 hover:bg-burgundy-600 text-cream-100 font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-burgundy-glow transition-all flex items-center justify-center gap-2 text-sm tracking-wide"
            >
              <Truck className="w-4 h-4 text-gold-300" />
              <span>Track Delivery Live</span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </button>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-3.5 border border-gold-500 bg-white hover:bg-gold-50 text-darkbrown-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-gold-600" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3.5 border border-darkbrown-300 hover:bg-cream-100 text-darkbrown-800 rounded-xl text-xs font-semibold"
            >
              Back to Store
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
