import React from 'react';
import { X, ShieldCheck, RefreshCw, FileText, Truck, Info, Phone, Mail, Send } from 'lucide-react';

export default function PoliciesModal({ initialTab = 'about', onClose }) {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  const tabs = [
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact Us', icon: Phone },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'refund', label: 'Refund Policy', icon: RefreshCw },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-darkbrown-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-cream-50 w-full max-w-3xl rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-burgundy-500 text-cream-100 p-5 sm:p-6 flex items-center justify-between border-b border-gold-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-burgundy-700 border border-gold-400 flex items-center justify-center text-xl flex-shrink-0">
              🦁
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                Sheru Bai Gift Box Information & Policies
              </h3>
              <p className="text-xs text-gold-300">
                Official Brand Guidelines & Terms
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

        {/* Tab Navigation */}
        <div className="flex border-b border-gold-300 bg-cream-100/70 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border-b-2 transition-all ${
                  isActive
                    ? 'border-burgundy-500 text-burgundy-700 bg-white font-bold'
                    : 'border-transparent text-darkbrown-700 hover:text-darkbrown-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-gold-600" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[65vh] overflow-y-auto text-xs sm:text-sm text-darkbrown-800 leading-relaxed">
          
          {/* TAB: ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-serif text-xl font-bold text-darkbrown-900 text-burgundy-700">
                About SHERU BAI GIFT BOX 🦁
              </h4>
              <p className="italic font-serif text-darkbrown-700">
                Tagline: "Not Just a Gift. It's a Feeling."
              </p>
              <p>
                <strong>Sheru Bai Gift Box</strong> was founded with a singular, noble mission: to turn simple, heartfelt gestures into enduring human memories. In a fast-paced world, expressing how much our parents, siblings, teachers, partners, and friends mean to us often gets postponed.
              </p>
              <p>
                Sheru Bai bridges that gap by curating luxurious, thoughtfully tiered gift boxes from ₹99 to ₹999. Every hamper is packaged by hand, sealed with our White Lion wax emblem, accompanied by your personalized words on royal parchment, and safely delivered to any doorstep in India.
              </p>
              <div className="p-4 rounded-xl bg-gold-50 border border-gold-300">
                <h5 className="font-serif font-bold text-darkbrown-900 mb-1">Our Core Standard:</h5>
                <p className="text-xs">
                  We believe in pure e-commerce transparency. We have no hidden subscriptions, no lottery systems, and no digital coin schemes. Only authentic, tangible gifts filled with joy.
                </p>
              </div>
            </div>
          )}

          {/* TAB: CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-serif text-xl font-bold text-burgundy-700">
                Get in Touch with Sheru Bai
              </h4>
              <p>
                Have a question about an existing order or need help with a custom gifting arrangement? Our customer happiness team is available directly on our official social channels.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a 
                  href="https://t.me/sherubaai"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-white border border-gold-300 hover:border-gold-500 hover:shadow-md transition-all space-y-1 block group"
                >
                  <div className="text-xs font-bold text-burgundy-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Send className="w-4 h-4 text-gold-600 group-hover:translate-x-0.5 transition-transform" />
                      <span>Official Telegram Support</span>
                    </span>
                    <span className="text-[10px] bg-gold-100 text-gold-900 px-2 py-0.5 rounded-full font-semibold">Fast Response</span>
                  </div>
                  <p className="text-xs text-darkbrown-900 font-bold">@sherubaai</p>
                  <p className="text-[11px] text-darkbrown-600">t.me/sherubaai • Direct chat & order tracking support</p>
                </a>

                <a 
                  href="https://www.instagram.com/sheru_baaai?vrfl=dHVkOGIxdG10Yjhk"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-white border border-gold-300 hover:border-gold-500 hover:shadow-md transition-all space-y-1 block group"
                >
                  <div className="text-xs font-bold text-burgundy-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="text-sm">📸</span>
                      <span>Official Instagram</span>
                    </span>
                    <span className="text-[10px] bg-gold-100 text-gold-900 px-2 py-0.5 rounded-full font-semibold">Community</span>
                  </div>
                  <p className="text-xs text-darkbrown-900 font-bold">@sheru_baaai</p>
                  <p className="text-[11px] text-darkbrown-600">Direct message for inquiries & unboxing highlights</p>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-gold-50 border border-gold-300 text-xs text-darkbrown-800 space-y-1">
                <div className="font-bold text-darkbrown-900 flex items-center gap-1.5">
                  <span>⏱️</span>
                  <span>Customer Support Hours:</span>
                </div>
                <p className="text-[11px] text-darkbrown-700">
                  Monday to Saturday: 9:00 AM – 8:00 PM IST. We strive to reply to all Telegram and Instagram messages promptly.
                </p>
              </div>
            </div>
          )}

          {/* TAB: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-serif text-xl font-bold text-burgundy-700">
                Privacy Policy
              </h4>
              <p>
                Your privacy is paramount to SHERU BAI GIFT BOX. We only collect the necessary customer and recipient data (names, delivery addresses, telephone numbers, and gift messages) exclusively for fulfilling and delivering your orders.
              </p>
              <h5 className="font-serif font-bold text-darkbrown-900">Payment Data Security</h5>
              <p>
                We do not store your Credit/Debit card numbers or UPI MPIN on our servers. All transactions are securely processed through encrypted, RBI-compliant payment gateways adhering to 256-bit SSL protocols.
              </p>
              <h5 className="font-serif font-bold text-darkbrown-900">Recipient Information</h5>
              <p>
                Recipient contact information provided during "Send as a Gift" checkout is strictly utilized for dispatch alerts, address verification, and delivery coordination by our courier partners. We never market or sell recipient databases to third parties.
              </p>
            </div>
          )}

          {/* TAB: REFUND POLICY */}
          {activeTab === 'refund' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-serif text-xl font-bold text-burgundy-700">
                Refund & Replacement Policy
              </h4>
              <p>
                Because our gift boxes contain personalized wax-sealed cards and delicate gourmet confections, we are committed to 100% satisfaction:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Damaged in Transit:</strong> If your gift box arrives damaged or tampered with, share a picture within 48 hours of delivery to our official Telegram (<code>@sherubaai</code>) or Instagram DM (<code>@sheru_baaai</code>), and we will dispatch a free replacement or initiate an immediate full refund.
                </li>
                <li>
                  <strong>Cancellation Window:</strong> Orders may be cancelled within 2 hours of placement before our atelier prepares and seals the custom message card.
                </li>
                <li>
                  <strong>Refund Processing:</strong> Approved refunds are credited directly back to the original source of payment (UPI / Bank Account / Card) within 3 to 5 banking days.
                </li>
              </ul>
            </div>
          )}

          {/* TAB: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-serif text-xl font-bold text-burgundy-700">
                Terms & Conditions
              </h4>
              <p>
                By placing an order on SHERU BAI GIFT BOX, you agree to our standard terms of service. You certify that all recipient contact and address details supplied during checkout are accurate to ensure smooth delivery.
              </p>
              <p>
                All brand logos, White Lion crest motifs, and marketing taglines are the intellectual property of SHERU BAI GIFT BOX. Any unauthorized reproduction is strictly prohibited.
              </p>
            </div>
          )}

          {/* TAB: SHIPPING */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-serif text-xl font-bold text-burgundy-700">
                Shipping & Delivery Across India
              </h4>
              <p>
                We provide <strong>100% Free Shipping</strong> on every gift box in our collection across all serviceable PIN codes throughout India.
              </p>
              <div className="p-4 rounded-xl bg-gold-50 border border-gold-300 space-y-2">
                <div className="font-bold text-darkbrown-900">Estimated Transit Times:</div>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 Business Days</li>
                  <li><strong>Tier 2 & Tier 3 Cities:</strong> 3 to 4 Business Days</li>
                  <li><strong>North East & Hilly Regions:</strong> 4 to 6 Business Days via Priority Air</li>
                </ul>
              </div>
              <p className="text-xs text-darkbrown-600">
                You can track the live milestone status of your parcel at any time using our "Track Order" feature.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-cream-100 border-t border-gold-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-darkbrown-900 hover:bg-darkbrown-800 text-cream-100 text-xs font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
