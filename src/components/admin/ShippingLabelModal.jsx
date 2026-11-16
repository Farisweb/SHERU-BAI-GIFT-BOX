import React from 'react';
import { X, Printer, Package, Truck, AlertTriangle } from 'lucide-react';
import brandLogo from '../../assets/sheru-baai-logo.jpg';

export default function ShippingLabelModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-darkbrown-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 print:p-0 print:bg-white">
      <div 
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-300 overflow-hidden my-4 print:border-none print:shadow-none print:max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-darkbrown-900 text-cream-100 p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gold-400" />
            <span className="font-serif text-sm font-bold">
              Parcel Shipping Label • {order.orderId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-gold-500 hover:bg-gold-600 text-darkbrown-950 font-bold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Label</span>
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-cream-100 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE LABEL AREA (4x6 inch standard courier label style) */}
        <div className="p-6 text-black font-sans space-y-4 print:p-4">
          
          {/* Header with Brand Logo & Courier routing */}
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-black bg-black flex-shrink-0">
                <img src={brandLogo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-serif font-black text-lg tracking-wider text-black leading-none">
                  SHERU BAAI GIFT BOX
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700 block mt-0.5">
                  Priority Air Express Parcel
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-gray-500">Routing Partner</div>
              <div className="font-black text-sm">{order.courier || 'Bluedart Express'}</div>
              <div className="text-xs font-mono font-bold">{order.awbNumber || 'STANDARD AIR'}</div>
            </div>
          </div>

          {/* Barcode Mockup */}
          <div className="text-center py-1 border-b-2 border-dashed border-gray-400">
            <div className="font-mono text-xs font-bold tracking-widest">
              ||| | ||||| |||| || |||||| | |||| ||| |||| |
            </div>
            <div className="text-[11px] font-mono tracking-widest uppercase mt-0.5">
              *{order.orderId}*
            </div>
          </div>

          {/* Box Tier & Fragile Banner */}
          <div className="bg-black text-white p-2 rounded flex items-center justify-between text-xs font-bold uppercase tracking-wider">
            <span>📦 {order.product?.name || 'Gift Box'}</span>
            <span>⚡ FRAGILE • HANDLE WITH CARE</span>
          </div>

          {/* DELIVER TO ADDRESS (Big, clear, bold for courier driver) */}
          <div className="p-3 border-2 border-black rounded-lg space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-gray-600">
              DELIVER TO:
            </div>
            <div className="text-base font-black text-black">
              {order.recipientName}
            </div>
            {order.recipientPhone && (
              <div className="text-xs font-bold text-black">
                📞 Mobile: +91 {order.recipientPhone}
              </div>
            )}
            <div className="text-xs leading-snug pt-1">
              {order.deliveryAddress?.addressLine}
              {order.deliveryAddress?.landmark && `, Near ${order.deliveryAddress.landmark}`}
            </div>
            <div className="text-xs font-semibold">
              {order.deliveryAddress?.city}, {order.deliveryAddress?.state}
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-gray-300 mt-2">
              <span className="text-[11px] font-bold text-gray-600">PIN CODE:</span>
              <span className="font-mono text-xl font-black tracking-widest bg-gray-100 px-2 py-0.5 rounded border border-gray-400">
                {order.deliveryAddress?.pincode}
              </span>
            </div>
          </div>

          {/* RETURN / SHIPPER ADDRESS */}
          <div className="grid grid-cols-2 gap-3 text-[11px] border-t border-black pt-3">
            <div>
              <span className="font-bold text-gray-600 uppercase text-[9px] block">RETURN ADDRESS (SHIPPER):</span>
              <div className="font-bold">Sheru Baai Atelier</div>
              <div className="text-gray-700">Official Gifting Hub, India</div>
              <div className="text-gray-700">Telegram: @sherubaai</div>
            </div>

            <div className="text-right">
              <span className="font-bold text-gray-600 uppercase text-[9px] block">ORDER DATE:</span>
              <div className="font-mono">{new Date(order.placedAt).toLocaleDateString()}</div>
              <div className="text-gray-600 text-[10px]">Payment: {order.paymentMethod} (PAID)</div>
            </div>
          </div>

          {/* Instructions note */}
          <div className="text-[9px] text-gray-500 text-center italic pt-1 print:text-[8px]">
            Please deliver this gift parcel in pristine condition. Contains fragile artisanal keepsakes.
          </div>

        </div>
      </div>
    </div>
  );
}
