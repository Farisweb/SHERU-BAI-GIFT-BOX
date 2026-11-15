import React, { useState } from 'react';
import { X, Search, CheckCircle2, Circle, Clock } from 'lucide-react';

export default function TrackOrderModal({ initialOrderId = '', ordersList = [], onClose }) {
  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState(() => {
    if (initialOrderId) {
      const match = ordersList.find(o => o.orderId.toLowerCase() === initialOrderId.toLowerCase());
      if (match) return match;
    }
    if (ordersList.length > 0) return ordersList[0];
    
    // Default sample demonstration order
    return {
      orderId: 'SB-882194',
      customerName: 'Priya Sharma',
      recipientName: 'Aarav Sharma',
      purchaseType: 'gift',
      product: { name: 'Gold Box', icon: '🥇', price: 499 },
      amount: 499,
      deliveryAddress: {
        addressLine: 'A-304, Royal Palms, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050'
      },
      pinStatus: { estimatedDays: '2 - 3 Days' },
      placedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      currentStep: 3, // 1 to 5
      awbNumber: 'EXP8821943IN',
      courier: 'Bluedart Express'
    };
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) {
      setErrorMessage('Please enter an Order ID or 10-digit Phone Number');
      return;
    }

    const matched = ordersList.find(
      o => o.orderId.toLowerCase() === query || 
           o.customerPhone === query || 
           o.recipientPhone === query
    );

    if (matched) {
      setActiveOrder(matched);
    } else if (query === 'sb-882194' || query.includes('882194')) {
      // Sample tracking order
      setActiveOrder({
        orderId: 'SB-882194',
        customerName: 'Priya Sharma',
        recipientName: 'Aarav Sharma',
        purchaseType: 'gift',
        product: { name: 'Gold Box', icon: '🥇', price: 499 },
        amount: 499,
        deliveryAddress: {
          addressLine: 'A-304, Royal Palms, Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400050'
        },
        pinStatus: { estimatedDays: '2 - 3 Days' },
        placedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        currentStep: 3,
        awbNumber: 'EXP8821943IN',
        courier: 'Bluedart Express'
      });
    } else {
      setErrorMessage(`No order found matching "${searchQuery}". Please check your Order ID (e.g. SB-123456) or phone number.`);
    }
  };

  const steps = [
    {
      title: 'Order Confirmed',
      desc: 'Payment received & order entered into Sheru Bai Atelier schedule',
      icon: '✅',
      time: 'Completed'
    },
    {
      title: 'Handcrafted & Packed with Love',
      desc: 'Box curated, ribbon tied, and personalized wax seal letter added',
      icon: '🎁',
      time: 'Completed'
    },
    {
      title: 'Dispatched via Express Courier',
      desc: 'Air Express transit with priority tracking ID',
      icon: '✈️',
      time: 'In Transit'
    },
    {
      title: 'Out for Delivery',
      desc: 'Delivery executive on the way to recipient doorstep',
      icon: '🚚',
      time: 'Upcoming'
    },
    {
      title: 'Delivered & Smile Created',
      desc: 'Gift handed over, happiness delivered successfully',
      icon: '❤️',
      time: 'Final Step'
    }
  ];

  const currentStepIndex = activeOrder?.currentStep || 2;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-darkbrown-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-cream-50 w-full max-w-2xl rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-burgundy-500 text-cream-100 p-5 sm:p-6 flex items-center justify-between border-b border-gold-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-burgundy-700 border border-gold-400 flex items-center justify-center text-xl flex-shrink-0">
              🚚
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                Live Gift Box Order Tracking
              </h3>
              <p className="text-xs text-gold-300">
                Pan-India Express Delivery Status
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-cream-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 sm:p-6 border-b border-gold-200 bg-gold-50/40">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gold-600 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. SB-882194) or Mobile Number"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-300 bg-white text-darkbrown-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
              />
            </div>
            <button
              type="submit"
              className="bg-burgundy-500 hover:bg-burgundy-600 text-cream-100 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
            >
              Track
            </button>
          </form>

          {errorMessage && (
            <p className="text-red-600 text-xs mt-2">{errorMessage}</p>
          )}

          {/* Quick link hint */}
          <div className="mt-2 flex items-center gap-2 text-[11px] text-darkbrown-600">
            <span>Demo tracking:</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('SB-882194');
                setErrorMessage('');
              }}
              className="text-burgundy-600 underline font-medium hover:text-burgundy-700"
            >
              Load Sample Active Order (SB-882194)
            </button>
          </div>
        </div>

        {/* Active Order Tracking Display */}
        {activeOrder && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Order Overview Header Card */}
            <div className="p-4 rounded-2xl bg-white border border-gold-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-gold-700 uppercase tracking-widest font-serif font-bold">
                  Order Tracking Details
                </span>
                <h4 className="font-serif text-lg font-bold text-darkbrown-900 flex items-center gap-2">
                  <span>{activeOrder.orderId}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gold-100 text-gold-900 font-sans font-semibold">
                    {activeOrder.product.name}
                  </span>
                </h4>
                <p className="text-xs text-darkbrown-600 mt-0.5">
                  Destination: <strong className="text-darkbrown-900">{activeOrder.deliveryAddress.city}, {activeOrder.deliveryAddress.state}</strong>
                </p>
              </div>

              <div className="sm:text-right text-xs">
                <span className="text-darkbrown-600 block">Courier Partner:</span>
                <span className="font-bold text-burgundy-700">{activeOrder.courier || 'Bluedart Express'}</span>
                {activeOrder.awbNumber && (
                  <span className="block text-[11px] text-darkbrown-500 font-mono mt-0.5">
                    AWB: {activeOrder.awbNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-6 pl-2">
              <h5 className="font-serif text-sm font-bold text-darkbrown-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-600" />
                Live Delivery Milestones:
              </h5>

              <div className="relative pl-6 space-y-7 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gold-300">
                {steps.map((st, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={index} className="relative flex items-start gap-4">
                      {/* Milestone Icon Bullet */}
                      <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-burgundy-500 border-gold-400 text-white shadow-xs'
                          : 'bg-white border-gold-300 text-gold-300'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-300" />
                        ) : (
                          <Circle className="w-2 h-2 fill-current" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h6 className={`text-xs sm:text-sm font-bold ${isCurrent ? 'text-burgundy-700 font-serif' : 'text-darkbrown-900'}`}>
                            {st.title} {isCurrent && <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-gold-200 text-gold-900 uppercase">In Progress</span>}
                          </h6>
                          <span className="text-[10px] text-darkbrown-500 font-medium">
                            {st.time}
                          </span>
                        </div>
                        <p className="text-xs text-darkbrown-600 mt-0.5">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Reassurance */}
            <div className="p-3.5 rounded-xl bg-gold-50 border border-gold-300 text-xs text-darkbrown-800 flex items-center gap-2.5">
              <span className="text-lg">🦁</span>
              <span>
                Need help with your gift delivery? Contact Sheru Bai Customer Care on WhatsApp at <strong>+91 98765 43210</strong>.
              </span>
            </div>

          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-cream-100 border-t border-gold-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-darkbrown-900 hover:bg-darkbrown-800 text-cream-100 text-xs font-semibold rounded-xl transition-colors"
          >
            Close Tracking
          </button>
        </div>

      </div>
    </div>
  );
}
