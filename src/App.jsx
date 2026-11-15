import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ProductGrid from './components/ProductGrid';
import WhyChooseUs from './components/WhyChooseUs';
import ProductDetailsModal from './components/ProductDetailsModal';
import CheckoutModal from './components/CheckoutModal';
import PaymentModal from './components/PaymentModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import TrackOrderModal from './components/TrackOrderModal';
import PoliciesModal from './components/PoliciesModal';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';

export default function App() {
  // Modal states
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [policyTab, setPolicyTab] = useState(null); // 'about', 'privacy', 'refund', etc.

  // Orders list with persistence in LocalStorage
  const [ordersList, setOrdersList] = useState(() => {
    try {
      const saved = localStorage.getItem('sherubai_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    
    // Default pre-loaded demonstration order
    return [{
      orderId: 'SB-882194',
      customerName: 'Priya Sharma',
      customerPhone: '9876543210',
      recipientName: 'Aarav Sharma',
      recipientPhone: '9812345678',
      purchaseType: 'gift',
      product: PRODUCTS[2], // Gold Box
      amount: 499,
      deliveryAddress: {
        addressLine: 'A-304, Royal Palms, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050'
      },
      pinStatus: { state: 'Maharashtra', estimatedDays: '2 - 3 Days' },
      giftMessage: 'Happy Birthday Bhai! May your year be as bright and golden as this Sheru Bai box! ❤️🦁',
      paymentMethod: 'UPI',
      paymentStatus: 'SUCCESS',
      placedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      currentStep: 2,
      courier: 'Bluedart Air Express',
      awbNumber: 'EXP8821943IN'
    }];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sherubai_orders', JSON.stringify(ordersList));
    } catch (e) {}
  }, [ordersList]);

  // Actions
  const handleBuyNow = (product) => {
    setDetailsProduct(null);
    setCheckoutProduct(product);
  };

  const handleProceedToPayment = (orderData) => {
    setCheckoutProduct(null);
    setPendingPaymentOrder(orderData);
  };

  const handlePaymentSuccess = (finalOrder) => {
    setPendingPaymentOrder(null);
    // Add to persisted orders list
    const orderWithTrackingStep = {
      ...finalOrder,
      currentStep: 0, // Order confirmed
      courier: 'Bluedart Express',
      awbNumber: `EXP${Math.floor(1000000 + Math.random() * 9000000)}IN`
    };
    setOrdersList(prev => [orderWithTrackingStep, ...prev]);
    setConfirmedOrder(orderWithTrackingStep);
  };

  const handleOpenTracking = (orderId = '') => {
    setConfirmedOrder(null);
    setTrackingOrderId(orderId);
    setIsTrackingOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-darkbrown-900 selection:bg-gold-500 selection:text-white">
      
      {/* Royal Top Navigation */}
      <Navbar 
        onOpenTrackOrder={() => handleOpenTracking('')}
        onOpenDirectOrder={() => handleBuyNow(PRODUCTS[1])} // Silver Box as sweet default
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection 
          onExploreClick={() => scrollToSection('collection')}
          onOrderClick={() => handleBuyNow(PRODUCTS[2])} // Gold Box
        />

        {/* Section 1: The Heart & Storytelling */}
        <StorySection 
          onSelectBoxClick={() => scrollToSection('collection')}
        />

        {/* Section 2: 4-Tier Gift Box Collection */}
        <ProductGrid 
          onBuyNow={handleBuyNow}
          onViewDetails={(prod) => setDetailsProduct(prod)}
        />

        {/* Section: Why Sheru Bai */}
        <WhyChooseUs 
          onSelectBoxClick={() => scrollToSection('collection')}
        />
      </main>

      {/* Footer & Policies */}
      <Footer 
        onOpenPolicy={(tab) => setPolicyTab(tab)}
        onOpenTrackOrder={() => handleOpenTracking('')}
      />

      {/* MODALS */}
      {/* 1. What's Inside Details Peek Modal */}
      {detailsProduct && (
        <ProductDetailsModal 
          product={detailsProduct}
          onClose={() => setDetailsProduct(null)}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* 2. Order Checkout Modal */}
      {checkoutProduct && (
        <CheckoutModal 
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* 3. Secure Payment Gateway Modal */}
      {pendingPaymentOrder && (
        <PaymentModal 
          orderData={pendingPaymentOrder}
          onClose={() => setPendingPaymentOrder(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* 4. Order Confirmation Modal */}
      {confirmedOrder && (
        <OrderConfirmationModal 
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
          onTrackOrder={handleOpenTracking}
        />
      )}

      {/* 5. Live Order Tracking Modal */}
      {isTrackingOpen && (
        <TrackOrderModal 
          initialOrderId={trackingOrderId}
          ordersList={ordersList}
          onClose={() => setIsTrackingOpen(false)}
        />
      )}

      {/* 6. Legal & Policy Modals */}
      {policyTab && (
        <PoliciesModal 
          initialTab={policyTab}
          onClose={() => setPolicyTab(null)}
        />
      )}

    </div>
  );
}
