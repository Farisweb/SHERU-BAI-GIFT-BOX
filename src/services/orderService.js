import { PRODUCTS } from '../data/products';

const STORAGE_KEY = 'sherubai_orders';

export const ORDER_STATUS_STEPS = [
  {
    stepIndex: 0,
    title: 'Order Confirmed',
    desc: 'Payment received & order entered into Sheru Baai Atelier schedule',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  {
    stepIndex: 1,
    title: 'Handcrafted & Packed with Love',
    desc: 'Box curated, ribbon tied, and personalized wax seal letter added',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    stepIndex: 2,
    title: 'Dispatched via Express Courier',
    desc: 'Air Express transit with priority tracking ID',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-300'
  },
  {
    stepIndex: 3,
    title: 'Out for Delivery',
    desc: 'Delivery executive on the way to recipient doorstep',
    badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-300'
  },
  {
    stepIndex: 4,
    title: 'Delivered & Smile Created',
    desc: 'Gift handed over, happiness delivered successfully',
    badgeClass: 'bg-green-100 text-green-900 border-green-300'
  }
];

export const getInitialOrders = () => {
  return [
    {
      orderId: 'SB-1001',
      customerName: 'Priya Sharma',
      customerPhone: '9000000000',
      recipientName: 'Aarav Sharma',
      recipientPhone: '9111111111',
      purchaseType: 'gift',
      product: PRODUCTS[2], // Gold Box
      productPrice: 499,
      deliveryCharge: 49,
      amount: 548,
      deliveryAddress: {
        addressLine: 'A-304, Royal Palms, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        landmark: 'Near Bandra Lake'
      },
      pinStatus: { state: 'Maharashtra', estimatedDays: '2 - 3 Days' },
      giftMessage: 'Happy Birthday Bhai! May your year be as bright and golden as this Sheru Baai box! ❤️🦁',
      paymentMethod: 'UPI',
      paymentStatus: 'SUCCESS',
      placedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      currentStep: 2, // Dispatched
      courier: 'Bluedart Air Express',
      awbNumber: 'EXP8821943IN'
    },
    {
      orderId: 'SB-1002',
      customerName: 'Rohit Varma',
      customerPhone: '9222222222',
      recipientName: 'Sneha Menon',
      recipientPhone: '9333333333',
      purchaseType: 'gift',
      product: PRODUCTS[3], // Premium Box
      productPrice: 999,
      deliveryCharge: 0,
      amount: 999,
      deliveryAddress: {
        addressLine: '12B, Palm Grove Residency, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038',
        landmark: 'Behind Metro Station'
      },
      pinStatus: { state: 'Karnataka', estimatedDays: '2 - 3 Days' },
      giftMessage: 'To the most wonderful teacher and mentor. Thank you for always believing in me!',
      paymentMethod: 'CARDS',
      paymentStatus: 'SUCCESS',
      placedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
      currentStep: 1, // Packed
      courier: 'Delhivery Express',
      awbNumber: ''
    }
  ];
};

export const orderService = {
  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read orders from localStorage:', e);
    }
    const initial = getInitialOrders();
    this.saveOrders(initial);
    return initial;
  },

  saveOrders(orders) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  },

  getNextOrderId() {
    const SEQ_KEY = 'sherubai_order_sequence';
    let currentSeq = 1002;

    try {
      const saved = localStorage.getItem(SEQ_KEY);
      if (saved) {
        currentSeq = parseInt(saved, 10);
      }
    } catch (e) {}

    // Cross-verify with existing orders so sequence never repeats or regresses
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const orders = JSON.parse(data);
        if (Array.isArray(orders)) {
          orders.forEach(o => {
            const matches = (o.orderId || '').match(/\d+/g);
            if (matches) {
              const num = parseInt(matches[matches.length - 1], 10);
              if (!isNaN(num) && num >= 1000 && num > currentSeq && num < 100000) {
                currentSeq = num;
              }
            }
          });
        }
      }
    } catch (e) {}

    const nextSeq = currentSeq + 1;
    try {
      localStorage.setItem(SEQ_KEY, nextSeq.toString());
    } catch (e) {}

    return `SB-${nextSeq}`;
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const orderId = orderData.orderId || this.getNextOrderId();
    const newOrder = {
      ...orderData,
      orderId,
      currentStep: 0, // Order Confirmed
      courier: 'Bluedart Air Express',
      awbNumber: `EXP${Math.floor(1000000 + Math.random() * 9000000)}IN`,
      placedAt: new Date().toISOString()
    };
    const updated = [newOrder, ...orders];
    this.saveOrders(updated);
    return newOrder;
  },

  updateOrderStatus(orderId, newStepIndex, courierName, awbNumber) {
    const orders = this.getOrders();
    const updated = orders.map(order => {
      if (order.orderId === orderId) {
        return {
          ...order,
          currentStep: Number(newStepIndex),
          courier: courierName !== undefined ? courierName : order.courier,
          awbNumber: awbNumber !== undefined ? awbNumber : order.awbNumber,
          lastUpdatedAt: new Date().toISOString()
        };
      }
      return order;
    });
    this.saveOrders(updated);
    return updated;
  },

  deleteOrder(orderId) {
    const orders = this.getOrders();
    const updated = orders.filter(o => o.orderId !== orderId);
    this.saveOrders(updated);
    return updated;
  },

  exportOrdersToCSV(orders) {
    const headers = [
      'Order ID',
      'Placed At',
      'Box Tier',
      'Box Price (INR)',
      'Delivery Charge (INR)',
      'Total Amount (INR)',
      'Payment Method',
      'Payment Status',
      'Delivery Status',
      'Courier Partner',
      'AWB Number',
      'Purchase Type',
      'Customer Name',
      'Customer Phone',
      'Recipient Name',
      'Recipient Phone',
      'Delivery Address',
      'City',
      'State',
      'PIN Code',
      'Personal Gift Message'
    ];

    const rows = orders.map(o => {
      const statusTitle = ORDER_STATUS_STEPS[o.currentStep]?.title || 'Confirmed';
      const cleanAddress = (o.deliveryAddress?.addressLine || '').replace(/[\n\r,]/g, ' ');
      const cleanMessage = (o.giftMessage || '').replace(/[\n\r,]/g, ' ');
      const boxPrice = o.productPrice || o.product?.price || o.amount;
      const deliveryCharge = o.deliveryCharge !== undefined ? o.deliveryCharge : (o.product?.deliveryFee ?? 0);

      return [
        o.orderId,
        new Date(o.placedAt).toLocaleString(),
        o.product?.name || 'Box',
        boxPrice,
        deliveryCharge,
        o.amount,
        o.paymentMethod || 'UPI',
        o.paymentStatus || 'SUCCESS',
        statusTitle,
        o.courier || '',
        o.awbNumber || '',
        o.purchaseType || 'gift',
        `"${o.customerName || ''}"`,
        `"${o.customerPhone || ''}"`,
        `"${o.recipientName || ''}"`,
        `"${o.recipientPhone || ''}"`,
        `"${cleanAddress}"`,
        `"${o.deliveryAddress?.city || ''}"`,
        `"${o.deliveryAddress?.state || ''}"`,
        o.deliveryAddress?.pincode || '',
        `"${cleanMessage}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sheru_Baai_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
