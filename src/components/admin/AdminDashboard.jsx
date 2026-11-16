import React, { useState } from 'react';
import { 
  Package, Search, Filter, Download, ArrowLeft, LogOut, CheckCircle2, 
  Clock, Truck, MapPin, Phone, User, Gift, Eye, Edit3, Trash2, Printer, 
  Sparkles, RefreshCw, X, Check, DollarSign, ChevronRight, BellRing
} from 'lucide-react';
import { ORDER_STATUS_STEPS, orderService } from '../../services/orderService';
import ShippingLabelModal from './ShippingLabelModal';
import brandLogo from '../../assets/sheru-baai-logo.jpg';

export default function AdminDashboard({ 
  orders, 
  onUpdateOrder, 
  onDeleteOrder, 
  onClose, 
  onLogout,
  announcementText = '🚀 Sheru Baai Mobile Application Coming Soon! • Handcrafted Luxury Gift Boxes Available for Order Now 🎉',
  onUpdateAnnouncement
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  
  // Announcement Editor State
  const [announcementInput, setAnnouncementInput] = useState(announcementText);
  const [announcementSaved, setAnnouncementSaved] = useState(false);

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (onUpdateAnnouncement) {
      onUpdateAnnouncement(announcementInput);
      setAnnouncementSaved(true);
      setTimeout(() => setAnnouncementSaved(false), 2500);
    }
  };
  
  // Modals inside Admin
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [editingStatusOrder, setEditingStatusOrder] = useState(null);
  const [labelOrder, setLabelOrder] = useState(null);

  // Status edit form state
  const [editStepIndex, setEditStepIndex] = useState(0);
  const [editCourier, setEditCourier] = useState('Bluedart Air Express');
  const [editAwb, setEditAwb] = useState('');

  // Open Status Editor
  const handleOpenStatusEditor = (order) => {
    setEditingStatusOrder(order);
    setEditStepIndex(order.currentStep || 0);
    setEditCourier(order.courier || 'Bluedart Air Express');
    setEditAwb(order.awbNumber || '');
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!editingStatusOrder) return;
    onUpdateOrder(editingStatusOrder.orderId, editStepIndex, editCourier, editAwb);
    setEditingStatusOrder(null);
  };

  // KPI Calculations
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const inPreparation = orders.filter(o => o.currentStep === 1).length;
  const inTransit = orders.filter(o => o.currentStep === 2 || o.currentStep === 3).length;
  const delivered = orders.filter(o => o.currentStep === 4).length;

  // Filter & Search Logic
  const filteredOrders = orders.filter(o => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      o.orderId.toLowerCase().includes(q) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.recipientName && o.recipientName.toLowerCase().includes(q)) ||
      (o.customerPhone && o.customerPhone.includes(q)) ||
      (o.recipientPhone && o.recipientPhone.includes(q)) ||
      (o.deliveryAddress?.city && o.deliveryAddress.city.toLowerCase().includes(q));

    const matchesStatus = 
      selectedStatusFilter === 'ALL' || 
      Number(selectedStatusFilter) === Number(o.currentStep);

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#FBF7F0] text-darkbrown-900 overflow-y-auto flex flex-col font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-darkbrown-950 text-cream-100 border-b-2 border-gold-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400 bg-black flex-shrink-0 shadow-md">
              <img src={brandLogo} alt="Sheru Baai" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-cream-100">
                  SHERU BAAI <span className="text-gold-400">MASTER ADMIN</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 uppercase font-bold tracking-widest hidden sm:inline">
                  Shop Owner Portal
                </span>
              </div>
              <p className="text-xs text-cream-200/70">
                Order fulfillment & live delivery milestone tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-cream-100 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 text-cream-100 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-gold-300 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-darkbrown-600 font-medium">Total Orders</span>
              <span className="text-lg">📦</span>
            </div>
            <div className="font-serif text-2xl font-bold text-darkbrown-900 mt-1">
              {totalOrders}
            </div>
            <span className="text-[10px] text-green-700 font-semibold">100% Tracked</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gold-300 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-darkbrown-600 font-medium">Total Revenue</span>
              <span className="text-lg">💰</span>
            </div>
            <div className="font-serif text-2xl font-bold text-burgundy-700 mt-1">
              ₹{totalRevenue}
            </div>
            <span className="text-[10px] text-darkbrown-500 font-semibold">All Boxes</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gold-300 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-darkbrown-600 font-medium">In Preparation</span>
              <span className="text-lg">🎁</span>
            </div>
            <div className="font-serif text-2xl font-bold text-amber-700 mt-1">
              {inPreparation}
            </div>
            <span className="text-[10px] text-amber-800 font-semibold">Ribbon & Card Tying</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gold-300 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-darkbrown-600 font-medium">In Transit / Courier</span>
              <span className="text-lg">🚚</span>
            </div>
            <div className="font-serif text-2xl font-bold text-indigo-700 mt-1">
              {inTransit}
            </div>
            <span className="text-[10px] text-indigo-800 font-semibold">Air Express Dispatch</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gold-300 shadow-xs col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-darkbrown-600 font-medium">Delivered</span>
              <span className="text-lg">❤️</span>
            </div>
            <div className="font-serif text-2xl font-bold text-green-700 mt-1">
              {delivered}
            </div>
            <span className="text-[10px] text-green-800 font-semibold">Smiles Created</span>
          </div>
        </div>

        {/* Website Top Announcement Bar Manager */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cream-100 via-amber-50/70 to-cream-100 border-2 border-gold-400 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gold-300/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-burgundy-600 text-cream-100 flex items-center justify-center shadow-xs">
                <BellRing className="w-5 h-5 text-gold-300" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-darkbrown-900 flex items-center gap-2">
                  Top Announcement Notification Banner
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-200 text-darkbrown-800 font-sans font-bold uppercase">
                    Live On Website
                  </span>
                </h3>
                <p className="text-xs text-darkbrown-600">
                  Custom message displayed at the very top of the website navbar across all devices.
                </p>
              </div>
            </div>

            {announcementSaved && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 border border-green-300 text-green-800 text-xs font-bold animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-green-600" /> Saved & Updated Live!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveAnnouncement} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={announcementInput}
                onChange={(e) => setAnnouncementInput(e.target.value)}
                placeholder="e.g. 🚀 Application Coming Soon! • Handcrafted Luxury Gift Boxes Available for Order Now 🎉"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gold-400 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-burgundy-500 shadow-xs"
              />
              <button
                type="submit"
                className="bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-cream-100 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 text-gold-300" />
                <span>Save Announcement</span>
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-darkbrown-600">Quick Presets:</span>
              <button
                type="button"
                onClick={() => setAnnouncementInput('🚀 Sheru Baai Mobile Application Coming Soon! • Order Online Now')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-gold-300 hover:bg-gold-50 text-darkbrown-800 font-medium transition-colors"
              >
                🚀 App Coming Soon
              </button>
              <button
                type="button"
                onClick={() => setAnnouncementInput('🎉 Grand Emperor Collection Live • Free Pan-India Delivery on Luxury & Royal Boxes')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-gold-300 hover:bg-gold-50 text-darkbrown-800 font-medium transition-colors"
              >
                🎁 Emperor Collection
              </button>
              <button
                type="button"
                onClick={() => setAnnouncementInput('🦁 Sheru Baai Atelier • Hand-Packed with Love & Personalized Wax-Sealed Letters')}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-gold-300 hover:bg-gold-50 text-darkbrown-800 font-medium transition-colors"
              >
                🦁 Atelier Love
              </button>
            </div>
          </form>
        </div>

        {/* Search, Filter & Action Toolbar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gold-300 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gold-600 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Order ID, Name, Phone, City..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-300 bg-cream-50 text-xs sm:text-sm text-darkbrown-900 focus:outline-none focus:ring-2 focus:ring-burgundy-500"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
            <button
              onClick={() => setSelectedStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedStatusFilter === 'ALL'
                  ? 'bg-burgundy-600 text-cream-100 shadow-xs'
                  : 'bg-cream-100 text-darkbrown-800 hover:bg-gold-100'
              }`}
            >
              All ({orders.length})
            </button>
            {ORDER_STATUS_STEPS.map(st => (
              <button
                key={st.stepIndex}
                onClick={() => setSelectedStatusFilter(String(st.stepIndex))}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  selectedStatusFilter === String(st.stepIndex)
                    ? 'bg-burgundy-600 text-cream-100 shadow-xs'
                    : 'bg-cream-100 text-darkbrown-800 hover:bg-gold-100'
                }`}
              >
                {st.title.split(' ')[0]} ({orders.filter(o => o.currentStep === st.stepIndex).length})
              </button>
            ))}
          </div>

          {/* FEATURE 6: Export to CSV Button */}
          <button
            onClick={() => orderService.exportOrdersToCSV(orders)}
            className="w-full md:w-auto px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-darkbrown-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV</span>
          </button>

        </div>

        {/* Orders List / Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-darkbrown-900 flex items-center gap-2">
              <span>Customer Orders ({filteredOrders.length})</span>
            </h3>
            <span className="text-xs text-darkbrown-600">
              Sorted by newest placement first
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-gold-300 text-darkbrown-600 space-y-2">
              <Package className="w-10 h-10 mx-auto text-gold-500" />
              <p className="font-serif font-bold text-base text-darkbrown-900">No Orders Found</p>
              <p className="text-xs">No orders match your search query or filter selection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredOrders.map((order) => {
                const stepInfo = ORDER_STATUS_STEPS[order.currentStep] || ORDER_STATUS_STEPS[0];

                return (
                  <div 
                    key={order.orderId}
                    className="p-5 rounded-2xl bg-white border border-gold-300/80 shadow-xs hover:border-gold-500 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Left: Order Info & Product */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-sm font-black text-burgundy-700 bg-burgundy-50 px-2.5 py-0.5 rounded border border-burgundy-200">
                          {order.orderId}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${stepInfo.badgeClass}`}>
                          {stepInfo.title}
                        </span>
                        <span className="text-xs text-darkbrown-500">
                          {new Date(order.placedAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                        <div>
                          <span className="text-darkbrown-500 block text-[10px] uppercase font-bold">Box Item:</span>
                          <span className="font-serif font-bold text-darkbrown-900">
                            {order.product?.icon} {order.product?.name} (₹{order.amount})
                          </span>
                        </div>

                        <div>
                          <span className="text-darkbrown-500 block text-[10px] uppercase font-bold">Customer (Sender):</span>
                          <span className="font-bold text-darkbrown-900">{order.customerName}</span>
                          <span className="text-darkbrown-600 ml-1">(+91 {order.customerPhone})</span>
                        </div>

                        <div>
                          <span className="text-darkbrown-500 block text-[10px] uppercase font-bold">Recipient:</span>
                          <span className="font-bold text-burgundy-700">{order.recipientName}</span>
                          {order.recipientPhone && <span className="text-darkbrown-600 ml-1">(+91 {order.recipientPhone})</span>}
                        </div>

                        <div>
                          <span className="text-darkbrown-500 block text-[10px] uppercase font-bold">Destination:</span>
                          <span className="font-semibold text-darkbrown-900">
                            {order.deliveryAddress?.city}, {order.deliveryAddress?.state} ({order.deliveryAddress?.pincode})
                          </span>
                        </div>
                      </div>

                      {order.awbNumber && (
                        <div className="text-[11px] text-indigo-900 bg-indigo-50 px-3 py-1 rounded inline-block font-mono">
                          🚚 Courier: {order.courier} • AWB: <strong>{order.awbNumber}</strong>
                        </div>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100 flex-shrink-0">
                      
                      {/* View Details */}
                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="px-3.5 py-2 rounded-xl bg-cream-100 hover:bg-gold-100 text-darkbrown-900 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-gold-300"
                        title="View Full Order & Gift Note"
                      >
                        <Eye className="w-3.5 h-3.5 text-gold-700" />
                        <span>Details</span>
                      </button>

                      {/* FEATURE 2: Print Shipping Label */}
                      <button
                        onClick={() => setLabelOrder(order)}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 text-darkbrown-900 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-gray-400"
                        title="Print Courier Parcel Sticker"
                      >
                        <Printer className="w-3.5 h-3.5 text-gray-700" />
                        <span>Print Label</span>
                      </button>

                      {/* Update Delivery Status */}
                      <button
                        onClick={() => handleOpenStatusEditor(order)}
                        className="px-4 py-2 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 text-cream-100 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-gold-300" />
                        <span>Update Status</span>
                      </button>

                      {/* Delete Test Order */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete test order ${order.orderId}?`)) {
                            onDeleteOrder(order.orderId);
                          }
                        }}
                        className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

      {/* MODAL 1: Full Order Details Drawer */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-darkbrown-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-cream-50 w-full max-w-2xl rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            
            <div className="bg-burgundy-600 text-cream-100 p-5 flex items-center justify-between border-b border-gold-400">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">📦</span>
                <div>
                  <h4 className="font-serif font-bold text-base">
                    Order Details: {selectedOrderDetails.orderId}
                  </h4>
                  <p className="text-xs text-gold-200">
                    Placed on {new Date(selectedOrderDetails.placedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="w-7 h-7 rounded-full bg-burgundy-800 text-cream-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto text-xs text-darkbrown-800">
              {/* Product & Payment */}
              <div className="p-4 rounded-xl bg-white border border-gold-200 grid grid-cols-2 gap-3">
                <div>
                  <span className="font-bold text-gray-500 uppercase text-[10px]">Box Tier</span>
                  <div className="font-serif font-bold text-sm text-darkbrown-900 mt-0.5">
                    {selectedOrderDetails.product?.icon} {selectedOrderDetails.product?.name}
                  </div>
                  <div className="text-burgundy-700 font-bold">₹{selectedOrderDetails.amount}</div>
                </div>

                <div>
                  <span className="font-bold text-gray-500 uppercase text-[10px]">Payment</span>
                  <div className="font-bold text-darkbrown-900 mt-0.5">
                    {selectedOrderDetails.paymentMethod} • PAID
                  </div>
                  <div className="text-gray-500 text-[11px]">Type: {selectedOrderDetails.purchaseType}</div>
                </div>
              </div>

              {/* Sender & Recipient Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gold-200 space-y-1">
                  <span className="font-bold text-gold-800 uppercase text-[10px] block">Customer (Sender)</span>
                  <div className="font-bold text-darkbrown-900 text-sm">{selectedOrderDetails.customerName}</div>
                  <div className="text-xs">📞 +91 {selectedOrderDetails.customerPhone}</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gold-200 space-y-1">
                  <span className="font-bold text-burgundy-800 uppercase text-[10px] block">Recipient</span>
                  <div className="font-bold text-darkbrown-900 text-sm">{selectedOrderDetails.recipientName}</div>
                  <div className="text-xs">📞 +91 {selectedOrderDetails.recipientPhone || 'N/A'}</div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-4 rounded-xl bg-white border border-gold-200 space-y-1">
                <span className="font-bold text-gray-500 uppercase text-[10px] block">Delivery Address</span>
                <p className="text-darkbrown-900 font-medium">
                  {selectedOrderDetails.deliveryAddress?.addressLine}
                </p>
                {selectedOrderDetails.deliveryAddress?.landmark && (
                  <p className="text-gray-600">Landmark: {selectedOrderDetails.deliveryAddress.landmark}</p>
                )}
                <p className="font-bold">
                  {selectedOrderDetails.deliveryAddress?.city}, {selectedOrderDetails.deliveryAddress?.state} - {selectedOrderDetails.deliveryAddress?.pincode}
                </p>
              </div>

              {/* Wax-Sealed Gift Card Message */}
              {selectedOrderDetails.giftMessage && (
                <div className="p-4 rounded-xl bg-[#FFF8EE] border-2 border-gold-400 space-y-2">
                  <span className="font-serif font-bold text-burgundy-800 uppercase text-[10px] block">
                    💌 Customer's Personal Gift Message (Inside Box):
                  </span>
                  <p className="font-serif italic text-darkbrown-900 text-sm leading-relaxed">
                    "{selectedOrderDetails.giftMessage}"
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-cream-100 border-t border-gold-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  setLabelOrder(selectedOrderDetails);
                  setSelectedOrderDetails(null);
                }}
                className="px-4 py-2 rounded-xl bg-gold-500 text-darkbrown-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Shipping Label</span>
              </button>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-2 rounded-xl bg-darkbrown-900 text-cream-100 text-xs font-semibold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Live Status Editor */}
      {editingStatusOrder && (
        <div className="fixed inset-0 z-50 bg-darkbrown-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-cream-50 w-full max-w-lg rounded-3xl border-2 border-gold-500 shadow-2xl overflow-hidden animate-in fade-in">
            
            <div className="bg-burgundy-600 text-cream-100 p-5 flex items-center justify-between border-b border-gold-400">
              <div>
                <h4 className="font-serif font-bold text-base">
                  Update Delivery Status
                </h4>
                <p className="text-xs text-gold-200">
                  {editingStatusOrder.orderId} • {editingStatusOrder.recipientName}
                </p>
              </div>

              <button
                onClick={() => setEditingStatusOrder(null)}
                className="w-7 h-7 rounded-full bg-burgundy-800 text-cream-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="p-6 space-y-5 text-xs text-darkbrown-900">
              <div>
                <label className="block font-bold text-darkbrown-900 mb-2">
                  Select Delivery Milestone:
                </label>
                <div className="space-y-2">
                  {ORDER_STATUS_STEPS.map((st) => (
                    <label 
                      key={st.stepIndex}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        Number(editStepIndex) === st.stepIndex
                          ? 'bg-burgundy-50 border-burgundy-600 font-bold'
                          : 'bg-white border-gold-200 hover:bg-gold-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="statusStep"
                          checked={Number(editStepIndex) === st.stepIndex}
                          onChange={() => setEditStepIndex(st.stepIndex)}
                          className="accent-burgundy-600"
                        />
                        <div>
                          <div className="text-xs">{st.title}</div>
                          <div className="text-[10px] text-gray-500 font-normal">{st.desc}</div>
                        </div>
                      </div>
                      <span className="text-base">
                        {st.stepIndex === 0 && '✅'}
                        {st.stepIndex === 1 && '🎁'}
                        {st.stepIndex === 2 && '✈️'}
                        {st.stepIndex === 3 && '🚚'}
                        {st.stepIndex === 4 && '❤️'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Courier & AWB fields (Crucial for Dispatched status) */}
              <div className="p-4 rounded-xl bg-white border border-gold-300 space-y-3">
                <div>
                  <label className="block font-bold text-darkbrown-900 mb-1">
                    Courier Partner Name:
                  </label>
                  <input
                    type="text"
                    value={editCourier}
                    onChange={(e) => setEditCourier(e.target.value)}
                    placeholder="e.g. Bluedart Express, Delhivery, DTDC"
                    className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-darkbrown-900 mb-1">
                    AWB / Tracking Number:
                  </label>
                  <input
                    type="text"
                    value={editAwb}
                    onChange={(e) => setEditAwb(e.target.value)}
                    placeholder="e.g. EXP8821943IN"
                    className="w-full px-3 py-2 rounded-lg border border-gold-300 bg-cream-50 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStatusOrder(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-darkbrown-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 text-cream-100 text-xs font-bold shadow-sm"
                >
                  Save & Sync Live Status
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 3: Printable Courier Shipping Label (FEATURE 2) */}
      {labelOrder && (
        <ShippingLabelModal
          order={labelOrder}
          onClose={() => setLabelOrder(null)}
        />
      )}

    </div>
  );
}
