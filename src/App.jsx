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
import AdminAuthModal from './components/admin/AdminAuthModal';
import AdminDashboard from './components/admin/AdminDashboard';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { orderService } from './services/orderService';

export default function App() {
  // Modal states
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [pendingPaymentOrder, setPendingPaymentOrder] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [policyTab, setPolicyTab] = useState(null); // 'about', 'privacy', 'refund', etc.

  // Admin Portal states (Hidden, accessed via triple-click on brand logo)
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Orders list initialized via orderService (persisted in localStorage)
  const [ordersList, setOrdersList] = useState(() => orderService.getOrders());

  useEffect(() => {
    orderService.saveOrders(ordersList);
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
    const newOrder = orderService.createOrder(finalOrder);
    setOrdersList(orderService.getOrders());
    setConfirmedOrder(newOrder);
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

  // Secret Admin Portal Handlers
  const handleSecretAdminTrigger = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminAuthOpen(false);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminDashboardOpen(false);
  };

  const handleUpdateOrderStatus = (orderId, newStep, courier, awb) => {
    const updated = orderService.updateOrderStatus(orderId, newStep, courier, awb);
    setOrdersList(updated);
  };

  const handleDeleteOrder = (orderId) => {
    const updated = orderService.deleteOrder(orderId);
    setOrdersList(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-darkbrown-900 selection:bg-gold-500 selection:text-white">
      
      {/* Royal Top Navigation with Secret Admin Trigger on Logo */}
      <Navbar 
        onOpenTrackOrder={() => handleOpenTracking('')}
        onOpenDirectOrder={() => handleBuyNow(PRODUCTS[1])} // Silver Box as sweet default
        onSecretAdminTrigger={handleSecretAdminTrigger}
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

      {/* 7. Secret Admin Authentication Modal */}
      <AdminAuthModal 
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* 8. Full Admin Dashboard & Order Management */}
      {isAdminDashboardOpen && (
        <AdminDashboard 
          orders={ordersList}
          onUpdateOrder={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onClose={() => setIsAdminDashboardOpen(false)}
          onLogout={handleAdminLogout}
        />
      )}

    </div>
  );
}
