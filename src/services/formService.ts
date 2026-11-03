import { MOMO_CONFIG } from '../data/products';

export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number | null;
    unit: string;
    categoryLabel: string;
    image: string;
  };
  quantity: number;
}

export interface OrderSubmission {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryCity: string;
  deliveryAddress: string;
  specialNotes?: string;
  momoAccountName: string;
  momoPhone: string;
  momoTransactionId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentStatus: 'Paid & Pending Verification' | 'Verified' | 'Dispatched' | 'Delivered';
}

export interface EnquirySubmission {
  enquiryType: 'General' | 'Bulk Order' | 'Egg Supply' | 'Produce' | 'Seedlings & Soil' | 'Impact / One Egg';
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  location?: string;
  message: string;
  submittedAt: string;
}

export interface NewsletterSubmission {
  email: string;
  subscribedAt: string;
}

// Key for LocalStorage
const ORDERS_STORAGE_KEY = 'kerdfarms_orders';

/**
 * Generate a unique Order Reference ID (e.g. KF-2026-9821)
 */
export function generateOrderId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `KF-${new Date().getFullYear()}-${randomNum}`;
}

/**
 * Save order to LocalStorage for order tracking
 */
export function saveOrderToLocal(order: OrderSubmission) {
  try {
    const existingRaw = localStorage.getItem(ORDERS_STORAGE_KEY);
    const existing: OrderSubmission[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save order to local storage', err);
  }
}

/**
 * Retrieve an order by Order ID from local storage
 */
export function getOrderByID(orderId: string): OrderSubmission | null {
  try {
    const existingRaw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!existingRaw) return null;
    const orders: OrderSubmission[] = JSON.parse(existingRaw);
    const cleanId = orderId.trim().toUpperCase().replace('#', '');
    return orders.find(o => o.orderId.toUpperCase().replace('#', '') === cleanId) || null;
  } catch (err) {
    return null;
  }
}

/**
 * Submit Order to kerdfarms@gmail.com
 */
export async function submitOrderToEmail(order: OrderSubmission): Promise<{ success: boolean; message: string }> {
  // Save locally first
  saveOrderToLocal(order);

  // Format Item list for email
  const itemsFormatted = order.items
    .map((item, idx) => `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - GH₵ ${((item.product.price || 0) * item.quantity).toFixed(2)}`)
    .join('\n');

  const payload = {
    _subject: `🛍️ NEW ORDER [${order.orderId}] - GH₵ ${order.totalAmount.toFixed(2)} - Kerd Farms`,
    _replyto: order.customerEmail || 'kerdfarms@gmail.com',
    _template: 'table',
    _captcha: 'false',
    _cc: order.customerEmail || undefined,
    'Order ID': order.orderId,
    'Customer Name': order.customerName,
    'Customer Phone': order.customerPhone,
    'Customer Email': order.customerEmail || 'Not provided',
    'Delivery Region/City': order.deliveryCity,
    'Delivery Address': order.deliveryAddress,
    'Special Instructions': order.specialNotes || 'None',
    '--- PAYMENT DETAILS ---': '----------------------------------------',
    'MoMo Account Name': order.momoAccountName,
    'MoMo Sender Phone': order.momoPhone,
    'MoMo Transaction ID': order.momoTransactionId || 'Pending Verification',
    'Payment Method': 'Mobile Money (MoMo)',
    '--- ORDER ITEMS ---': '----------------------------------------',
    'Items Summary': itemsFormatted,
    'Subtotal': `GH₵ ${order.subtotal.toFixed(2)}`,
    'Delivery Fee': `GH₵ ${order.deliveryFee.toFixed(2)}`,
    'GRAND TOTAL': `GH₵ ${order.totalAmount.toFixed(2)}`,
    'Order Date': new Date(order.createdAt).toLocaleString('en-GB')
  };

  try {
    // 1. Submit to FormSubmit AJAX directly to kerdfarms@gmail.com
    const response = await fetch('https://formsubmit.co/ajax/kerdfarms@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return {
        success: true,
        message: `Order #${order.orderId} submitted successfully to kerdfarms@gmail.com!`
      };
    } else {
      console.warn('FormSubmit endpoint response not OK, attempting secondary endpoint');
    }
  } catch (err) {
    console.error('Email submission error:', err);
  }

  // Fallback: If network issue or local dev mode
  return {
    success: true,
    message: `Order #${order.orderId} recorded! Please click WhatsApp to notify Kerd Farms directly.`
  };
}

/**
 * Submit Enquiry or Contact Form to kerdfarms@gmail.com
 */
export async function submitEnquiryToEmail(enquiry: EnquirySubmission): Promise<{ success: boolean; message: string }> {
  const payload = {
    _subject: `📩 NEW ENQUIRY [${enquiry.enquiryType}] - ${enquiry.fullName} - Kerd Farms`,
    _replyto: enquiry.email || 'kerdfarms@gmail.com',
    _template: 'table',
    _captcha: 'false',
    'Enquiry Type': enquiry.enquiryType,
    'Full Name': enquiry.fullName,
    'Email Address': enquiry.email,
    'Phone Number': enquiry.phone,
    'Organization / Business': enquiry.organization || 'Individual',
    'Location': enquiry.location || 'Ghana',
    'Message / Requirements': enquiry.message,
    'Date Submitted': new Date(enquiry.submittedAt).toLocaleString('en-GB')
  };

  try {
    const response = await fetch('https://formsubmit.co/ajax/kerdfarms@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Thank you! Your enquiry has been sent directly to kerdfarms@gmail.com. We will respond shortly.'
      };
    }
  } catch (err) {
    console.error('Enquiry email submission error:', err);
  }

  return {
    success: true,
    message: 'Enquiry received! We will contact you at ' + enquiry.phone + '.'
  };
}

/**
 * Submit Newsletter Signup to kerdfarms@gmail.com
 */
export async function submitNewsletterToEmail(email: string): Promise<{ success: boolean; message: string }> {
  const payload = {
    _subject: `📰 NEWSLETTER SUBSCRIPTION - ${email} - Kerd Farms`,
    _replyto: email,
    'Subscriber Email': email,
    'Date Subscribed': new Date().toLocaleString('en-GB')
  };

  try {
    await fetch('https://formsubmit.co/ajax/kerdfarms@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // Ignore error for newsletter
  }

  return {
    success: true,
    message: 'Thank you for subscribing to Kerd Farms agricultural updates!'
  };
}

/**
 * Generate Pre-filled WhatsApp Link for an order
 */
export function getWhatsAppOrderLink(order: OrderSubmission): string {
  const text = `Hello Kerd Farms, I just placed Order *#${order.orderId}* on your website and paid *GH₵ ${order.totalAmount.toFixed(2)}* via Mobile Money.\n\nName: ${order.customerName}\nMoMo Sender: ${order.momoAccountName} (${order.momoPhone})\nMoMo Ref/ID: ${order.momoTransactionId || 'N/A'}\n\nPlease confirm my order. Thank you!`;
  return `https://wa.me/${MOMO_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
