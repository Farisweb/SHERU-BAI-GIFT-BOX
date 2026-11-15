import React, { useState, useEffect } from 'react';
import { X, Gift, User, Phone, MapPin, MessageSquare, ShieldCheck, Truck, Sparkles, Check, ArrowRight } from 'lucide-react';
import { STATES_OF_INDIA } from '../data/products';
import { checkPinCodeServiceability } from '../data/pincodes';

export default function CheckoutModal({ product, onClose, onProceedToPayment }) {
  const [purchaseType, setPurchaseType] = useState('gift'); // 'self' or 'gift'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  
  // Delivery address fields
  const [addressLine, setAddressLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');

  // Gift message
  const [giftMessage, setGiftMessage] = useState('Wishing you endless smiles, love, and happiness! Enjoy this special surprise from the heart.');
  const [showCardPreview, setShowCardPreview] = useState(false);

  // Delivery status feedback
  const [pinStatus, setPinStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Pincode watcher
  useEffect(() => {
    if (pincode.length === 6) {
      const res = checkPinCodeServiceability(pincode);
      setPinStatus(res);
      if (res.isValid && res.state && res.state !== 'India') {
        // Auto-select matching state if found
        const matched = STATES_OF_INDIA.find(s => res.state.includes(s) || s.includes(res.state));
        if (matched) setState(matched);
      }
    } else if (pincode.length > 0 && pincode.length < 6) {
      setPinStatus({ isValid: false, message: 'Entering 6-digit PIN code...' });
    } else {
      setPinStatus(null);
    }
  }, [pincode]);

  const presetMessages = [
    "A small surprise for someone who makes every day brighter! ❤️",
    "Sending you the biggest smile and warmest hug today! 🦁🎁",
    "Thank you for being such an incredible presence in my life.",
    "No occasion needed to celebrate you! Enjoy your treats. ✨"
  ];

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your name';
    if (!/^\d{10}$/.test(customerPhone.trim())) errs.customerPhone = 'Enter valid 10-digit mobile number';

    if (purchaseType === 'gift') {
      if (!recipientName.trim()) errs.recipientName = 'Please enter recipient name';
      if (recipientPhone && !/^\d{10}$/.test(recipientPhone.trim())) {
        errs.recipientPhone = 'Enter valid 10-digit mobile number';
      }
    }

    if (!addressLine.trim()) errs.addressLine = 'Delivery address is required';
    if (!/^\d{6}$/.test(pincode.trim())) errs.pincode = 'Valid 6-digit PIN code is required';
    if (!city.trim()) errs.city = 'City is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderData = {
      product,
      purchaseType,
      customerName,
      customerPhone,
      recipientName: purchaseType === 'gift' ? recipientName : customerName,
      recipientPhone: purchaseType === 'gift' ? recipientPhone : customerPhone,
      deliveryAddress: {
        addressLine,
        landmark,
        pincode,
        city,
        state,
      },
      giftMessage: purchaseType === 'gift' ? giftMessage : '',
      amount: product.price,
      shipping: 0,
      pinStatus: pinStatus?.isValid ? pinStatus : { state, estimatedDays: '3 - 5 Days' }
    };

    onProceedToPayment(orderData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-darkbrown-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-cream-50 w-full max-w-3xl rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-burgundy-500 text-cream-100 p-5 sm:p-6 flex items-center justify-between border-b border-gold-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-burgundy-700 border border-gold-400 flex items-center justify-center text-xl flex-shrink-0">
              🦁
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                Complete Your Sheru Bai Order
              </h3>
              <p className="text-xs text-gold-300">
                {product.name} • ₹{product.price} (Free Pan-India Express Delivery)
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

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7 max-h-[80vh] overflow-y-auto">
          
          {/* Step 1: Purchase Mode Toggle */}
          <div className="space-y-2">
            <label className="font-serif text-sm font-bold text-darkbrown-900 block">
              Who is this gift box for?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPurchaseType('gift')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                  purchaseType === 'gift' 
                    ? 'border-burgundy-500 bg-burgundy-50 text-burgundy-900 shadow-sm' 
                    : 'border-gold-300/60 bg-white/70 text-darkbrown-700 hover:bg-gold-50/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${purchaseType === 'gift' ? 'bg-burgundy-500 text-white' : 'bg-gold-100 text-gold-700'}`}>
                  🎁
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Send as a Gift</div>
                  <div className="text-[10px] text-darkbrown-600">Surprise a loved one directly</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPurchaseType('self')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                  purchaseType === 'self' 
                    ? 'border-burgundy-500 bg-burgundy-50 text-burgundy-900 shadow-sm' 
                    : 'border-gold-300/60 bg-white/70 text-darkbrown-700 hover:bg-gold-50/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${purchaseType === 'self' ? 'bg-burgundy-500 text-white' : 'bg-gold-100 text-gold-700'}`}>
                  🏠
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Self Purchase</div>
                  <div className="text-[10px] text-darkbrown-600">Deliver to my own doorstep</div>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Customer (Sender) Details */}
          <div className="space-y-3 pt-2 border-t border-gold-200">
            <h4 className="font-serif text-sm font-bold text-darkbrown-900 flex items-center gap-2">
              <User className="w-4 h-4 text-gold-600" />
              <span>Customer Information (Sender)</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
                {errors.customerName && <p className="text-red-600 text-xs mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                  Your Mobile Number (10 Digits) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-darkbrown-600 font-bold">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  />
                </div>
                {errors.customerPhone && <p className="text-red-600 text-xs mt-1">{errors.customerPhone}</p>}
              </div>
            </div>
          </div>

          {/* Step 3: Recipient Details (Only when sending as gift) */}
          {purchaseType === 'gift' && (
            <div className="space-y-3 pt-2 border-t border-gold-200 animate-in fade-in duration-200">
              <h4 className="font-serif text-sm font-bold text-burgundy-700 flex items-center gap-2">
                <Gift className="w-4 h-4 text-burgundy-600" />
                <span>Recipient Details (Who will receive the surprise?)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Ananya Patel"
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  />
                  {errors.recipientName && <p className="text-red-600 text-xs mt-1">{errors.recipientName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                    Recipient Phone Number (For delivery updates)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-darkbrown-600 font-bold">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9812345678"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                    />
                  </div>
                  {errors.recipientPhone && <p className="text-red-600 text-xs mt-1">{errors.recipientPhone}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Delivery Address */}
          <div className="space-y-3 pt-2 border-t border-gold-200">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-sm font-bold text-darkbrown-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-600" />
                <span>Delivery Address (Across India)</span>
              </h4>
              <span className="text-[11px] text-gold-700 font-semibold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> All-India Delivery
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                  House / Flat / Block / Street Address *
                </label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="e.g. Flat 402, Golden Crest Heights, MG Road"
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
                {errors.addressLine && <p className="text-red-600 text-xs mt-1">{errors.addressLine}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                    PIN Code (6 Digits) *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 400001"
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  />
                  {errors.pincode && <p className="text-red-600 text-xs mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  />
                  {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  >
                    {STATES_OF_INDIA.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Serviceability Feedback */}
              {pinStatus && (
                <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                  pinStatus.isValid 
                    ? 'bg-green-50 border border-green-300 text-green-900' 
                    : 'bg-amber-50 border border-amber-300 text-amber-900'
                }`}>
                  <Truck className="w-4 h-4 flex-shrink-0" />
                  <span>{pinStatus.message}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near City Central Park"
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-300 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
              </div>
            </div>
          </div>

          {/* Step 5: Personal Gift Message with Interactive Preview */}
          <div className="space-y-3 pt-2 border-t border-gold-200">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-sm font-bold text-darkbrown-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gold-600" />
                <span>Personal Gift Message (Optional)</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowCardPreview(!showCardPreview)}
                className="text-xs text-burgundy-600 hover:text-burgundy-700 font-semibold underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                {showCardPreview ? 'Hide Card Preview' : 'Preview Royal Greeting Card'}
              </button>
            </div>

            <textarea
              rows={3}
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="Write your heartfelt note here. We will print it onto a sealed parchment card inside the box..."
              className="w-full p-3.5 rounded-xl border border-gold-400 bg-white text-darkbrown-900 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500 leading-relaxed"
            />

            {/* Quick preset message pills */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] text-darkbrown-600 font-medium self-center mr-1">Inspirations:</span>
              {presetMessages.map((msg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setGiftMessage(msg)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-gold-100 hover:bg-gold-200 text-darkbrown-800 transition-colors"
                >
                  "{msg.slice(0, 26)}..."
                </button>
              ))}
            </div>

            {/* Live Interactive Royal Card Preview */}
            {showCardPreview && (
              <div className="p-6 rounded-2xl bg-[#FFF8EE] border-2 border-gold-500 shadow-md relative mt-4 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-gold-300 pb-2">
                  <div className="flex items-center gap-2">
                    <img src="/lion-crest.svg" alt="Sheru Bai" className="w-6 h-6" />
                    <span className="font-serif text-xs font-bold text-darkbrown-900 tracking-wider">
                      SHERU BAI ROYAL GREETINGS
                    </span>
                  </div>
                  <span className="text-[10px] text-gold-700 uppercase tracking-widest font-serif font-bold">
                    Official Wax Seal Card
                  </span>
                </div>

                <div className="py-2 text-center">
                  <p className="text-xs text-darkbrown-600">To: <strong className="text-burgundy-700 font-serif">{recipientName || customerName || 'Special Someone'}</strong></p>
                  <p className="font-serif text-sm italic text-darkbrown-900 my-3 leading-relaxed px-4">
                    "{giftMessage || 'Not Just a Gift. It\'s a Feeling.'}"
                  </p>
                  <p className="text-xs text-darkbrown-600">With all my love, <strong className="text-darkbrown-900 font-serif">{customerName || 'Your Well-Wisher'}</strong></p>
                </div>

                <div className="flex items-center justify-center pt-2">
                  <div className="wax-seal w-10 h-10 border border-gold-400">
                    <span className="text-xs">🦁</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown & CTA */}
          <div className="pt-4 border-t border-gold-300/80 bg-gold-50/50 p-4 rounded-2xl space-y-3">
            <div className="flex justify-between text-xs text-darkbrown-700">
              <span>{product.name} ({product.icon})</span>
              <span>₹{product.price}</span>
            </div>
            <div className="flex justify-between text-xs text-darkbrown-700">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                Sheru Bai Royal Packaging & Custom Ribbon
              </span>
              <span className="text-green-700 font-semibold">FREE (₹0)</span>
            </div>
            <div className="flex justify-between text-xs text-darkbrown-700">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-gold-500" />
                All-India Air Express Delivery
              </span>
              <span className="text-green-700 font-semibold">FREE (₹0)</span>
            </div>
            <div className="pt-2 border-t border-gold-300 flex justify-between items-baseline font-bold">
              <span className="font-serif text-sm text-darkbrown-900">Total Payable Amount:</span>
              <span className="font-serif text-2xl text-burgundy-600">₹{product.price}</span>
            </div>

            <button
              type="submit"
              className="w-full mt-3 bg-burgundy-500 hover:bg-burgundy-600 active:bg-burgundy-700 text-cream-100 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-burgundy-glow transition-all flex items-center justify-center gap-2 text-sm tracking-wider uppercase"
            >
              <span>PROCEED TO SECURE PAYMENT • ₹{product.price}</span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </button>
            
            <p className="text-center text-[11px] text-darkbrown-600 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
              256-Bit SSL Encrypted • Instant Confirmation via SMS & WhatsApp
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
