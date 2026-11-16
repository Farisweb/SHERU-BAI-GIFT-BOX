import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CreditCard, Building2, CheckCircle2, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function PaymentModal({ orderData, onClose, onPaymentSuccess }) {
  const [activeTab, setActiveTab] = useState('upi'); // 'upi', 'card', 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('PhonePe');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(orderData.customerName || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Net banking
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      setCardExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
    } else {
      setCardExpiry(val);
    }
  };

  const handlePay = () => {
    setIsProcessing(true);

    // Simulate realistic bank / gateway round-trip latency
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        ...orderData,
        orderId: randomOrderId,
        paymentMethod: activeTab.toUpperCase(),
        paymentStatus: 'SUCCESS',
        transactionId: `TXN_${Date.now()}`,
        placedAt: new Date().toISOString(),
      };
      onPaymentSuccess(completedOrder);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-darkbrown-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-cream-50 w-full max-w-xl rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-burgundy-500 text-cream-100 p-5 flex items-center justify-between border-b border-gold-400">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-burgundy-700 border border-gold-400 flex items-center justify-center text-lg flex-shrink-0">
              🔒
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">
                Sheru Bai Secure Payment Gateway
              </h3>
              <p className="text-[11px] text-gold-300">
                100% Encrypted • PCI-DSS Compliant
              </p>
            </div>
          </div>

          <button
            disabled={isProcessing}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-cream-100 flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Ribbon */}
        <div className="bg-gold-500/15 border-b border-gold-400/40 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-darkbrown-700 font-medium">Paying for:</span>
            <span className="text-xs font-serif font-bold text-darkbrown-900">{orderData.product.name}</span>
            {orderData.deliveryCharge > 0 ? (
              <span className="text-[11px] text-darkbrown-600 hidden sm:inline">
                (₹{orderData.productPrice || orderData.product.price} + ₹{orderData.deliveryCharge} delivery)
              </span>
            ) : (
              <span className="text-[11px] text-green-700 font-semibold hidden sm:inline">(Free Delivery)</span>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-darkbrown-600 font-medium">Total:</span>
            <span className="font-serif text-xl font-bold text-burgundy-600">₹{orderData.amount}</span>
          </div>
        </div>

        {/* Payment Tabs */}
        <div className="grid grid-cols-3 border-b border-gold-300 bg-cream-100/60">
          <button
            type="button"
            onClick={() => setActiveTab('upi')}
            className={`py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
              activeTab === 'upi'
                ? 'border-burgundy-500 text-burgundy-600 bg-white font-bold'
                : 'border-transparent text-darkbrown-700 hover:text-darkbrown-900'
            }`}
          >
            <QrCode className="w-4 h-4 text-gold-600" />
            <span>UPI / QR</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('card')}
            className={`py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
              activeTab === 'card'
                ? 'border-burgundy-500 text-burgundy-600 bg-white font-bold'
                : 'border-transparent text-darkbrown-700 hover:text-darkbrown-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-gold-600" />
            <span>Cards</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('netbanking')}
            className={`py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border-b-2 ${
              activeTab === 'netbanking'
                ? 'border-burgundy-500 text-burgundy-600 bg-white font-bold'
                : 'border-transparent text-darkbrown-700 hover:text-darkbrown-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-gold-600" />
            <span>Net Banking</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-5">
          
          {/* TAB 1: UPI */}
          {activeTab === 'upi' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Dynamic QR Code Box */}
              <div className="p-4 rounded-2xl bg-white border border-gold-300 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-32 h-32 rounded-xl border-2 border-gold-400 p-2 bg-cream-50 flex flex-col items-center justify-center relative flex-shrink-0 shadow-sm">
                  {/* Decorative QR code mockup */}
                  <div className="w-full h-full bg-darkbrown-900 rounded-lg p-1.5 flex flex-wrap gap-1 items-center justify-center">
                    <div className="w-6 h-6 border-4 border-white bg-transparent rounded-xs m-0.5" />
                    <div className="w-6 h-6 border-4 border-white bg-transparent rounded-xs m-0.5" />
                    <div className="w-4 h-4 bg-white m-0.5" />
                    <div className="w-2 h-2 bg-white m-0.5" />
                    <div className="w-6 h-6 border-4 border-white bg-transparent rounded-xs m-0.5" />
                    <div className="w-3 h-3 bg-white" />
                  </div>
                  {/* Miniature Lion Centerpiece */}
                  <div className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-burgundy-500 border border-gold-300 flex items-center justify-center text-xs">
                    🦁
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-burgundy-600 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-gold-500" />
                    Scan to Pay instantly
                  </div>
                  <h4 className="font-serif font-bold text-sm text-darkbrown-900">
                    Scan with Any UPI App
                  </h4>
                  <p className="text-[11px] text-darkbrown-600 leading-snug">
                    Open Google Pay, PhonePe, Paytm or BHIM on your phone and scan to approve ₹{orderData.amount}.
                  </p>
                </div>
              </div>

              {/* Quick UPI Apps */}
              <div>
                <label className="block text-xs font-semibold text-darkbrown-800 mb-2">
                  Or select your preferred UPI App:
                </label>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { name: 'PhonePe', icon: '🟣' },
                    { name: 'GPay', icon: '🔵' },
                    { name: 'Paytm', icon: '🔷' },
                    { name: 'BHIM', icon: '🇮🇳' }
                  ].map((app) => (
                    <button
                      key={app.name}
                      type="button"
                      onClick={() => setSelectedUpiApp(app.name)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedUpiApp === app.name
                          ? 'border-burgundy-500 bg-burgundy-50 text-burgundy-800 font-bold'
                          : 'border-gold-200 bg-white text-darkbrown-700 hover:bg-gold-50'
                      }`}
                    >
                      <span className="text-base block mb-0.5">{app.icon}</span>
                      <span>{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI ID input */}
              <div>
                <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                  Or enter UPI Virtual ID:
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@okhdfcbank"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold-300 bg-white text-darkbrown-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
              </div>

            </div>
          )}

          {/* TAB 2: CARDS */}
          {activeTab === 'card' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs text-darkbrown-600">
                <span>Credit or Debit Card</span>
                <span className="font-bold text-darkbrown-800">Visa • RuPay • MasterCard</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="4532 8901 2345 6789"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold-300 bg-white text-darkbrown-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Name as printed on card"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold-300 bg-white text-darkbrown-900 text-xs focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold-300 bg-white text-darkbrown-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-darkbrown-800 mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                    placeholder="•••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gold-300 bg-white text-darkbrown-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NET BANKING */}
          {activeTab === 'netbanking' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <label className="block text-xs font-semibold text-darkbrown-800">
                Select your Bank:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                      selectedBank === bank
                        ? 'border-burgundy-500 bg-burgundy-50 text-burgundy-800 font-bold'
                        : 'border-gold-200 bg-white text-darkbrown-700 hover:bg-gold-50'
                    }`}
                  >
                    🏛️ {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action CTA */}
          <div className="pt-3">
            <button
              type="button"
              disabled={isProcessing}
              onClick={handlePay}
              className="w-full bg-burgundy-500 hover:bg-burgundy-600 active:bg-burgundy-700 text-cream-100 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-burgundy-glow transition-all flex items-center justify-center gap-2 text-sm tracking-wider uppercase disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-gold-300" />
                  <span>Authorizing Payment with Bank...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-gold-300" />
                  <span>PAY ₹{orderData.amount} SECURELY</span>
                  <ArrowRight className="w-4 h-4 text-gold-300" />
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-darkbrown-600">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-700" /> 100% Buyer Protection
              </span>
              <span>•</span>
              <span>No Surcharges</span>
              <span>•</span>
              <span>Instant Receipt</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
