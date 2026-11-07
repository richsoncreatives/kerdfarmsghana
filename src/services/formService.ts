import type { Product } from '../data/products';

export interface CartItem {
  product: Product | {
    id: string;
    name: string;
    price?: number | null;
    unit: string;
    image: string;
    category: string;
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
  specialNotes: string;
  momoAccountName: string;
  momoPhone: string;
  momoTransactionId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentStatus: string;
}

export interface EnquirySubmission {
  enquiryType: 'General' | 'Bulk Order' | 'Egg Supply' | 'Produce' | 'Seedlings & Soil' | 'Impact / One Egg' | string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  organization?: string;
  location?: string;
  submittedAt: string;
}

export type EnquiryDetails = {
  enquiryType?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  organization?: string;
  location?: string;
  message?: string;
  submittedAt?: string;
};

export function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'KF-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getOrders(): OrderSubmission[] {
  try {
    const raw = localStorage.getItem('kerdfarms_orders');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: OrderSubmission): void {
  try {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('kerdfarms_orders', JSON.stringify(orders));
  } catch {}
}

export function getOrderByID(id: string): OrderSubmission | null {
  try {
    const orders = getOrders();
    const cleanId = id.trim().toLowerCase();
    const found = orders.find(
      (o) => o.orderId && o.orderId.trim().toLowerCase() === cleanId
    );
    return found || null;
  } catch {
    return null;
  }
}

export function getWhatsAppOrderLink(order: OrderSubmission): string {
  const phoneNumber = '233240135545';
  
  const itemLines = (order.items || [])
    .map((item, idx) => {
      const name = item.product?.name || 'Produce Item';
      const unit = item.product?.unit || 'Standard Unit';
      const price = typeof item.product?.price === 'number' ? `GH₵ ${item.product.price.toFixed(2)}` : 'Quote';
      return `${idx + 1}. ${name} (${unit}) - Qty: ${item.quantity} - ${price}`;
    })
    .join('\n');

  const text = `Hello Kerd Farms (+233 24 013 5545), I would like to inquire about my Order #${order.orderId}.

*Customer Name:* ${order.customerName || 'Valued Customer'}
*Customer Phone:* ${order.customerPhone || 'N/A'}
*Delivery Location:* ${order.deliveryCity || 'Ghana'} - ${order.deliveryAddress || ''}

*--- ORDERED ITEMS ---*
${itemLines || 'No items listed'}

*Total Amount:* GH₵ ${order.totalAmount}
*Payment Method:* Mobile Money (MoMo)
*MoMo Account Name:* DANIEL KERDMOTT ESSIEN
*Payment Status:* ${order.paymentStatus || 'Pending Confirmation'}

Please confirm product availability and delivery arrangements. Thank you!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppEnquiryLink(
  enquiryTypeOrDetails: string | EnquiryDetails = 'General',
  maybeDetails?: EnquiryDetails | string
): string {
  const phoneNumber = '233240135545';
  let enquiryType = 'General';
  let details: EnquiryDetails | undefined;

  if (typeof enquiryTypeOrDetails === 'object' && enquiryTypeOrDetails !== null) {
    details = enquiryTypeOrDetails;
    enquiryType = details.enquiryType || 'General';
  } else {
    enquiryType = enquiryTypeOrDetails || 'General';
    if (typeof maybeDetails === 'object' && maybeDetails !== null) {
      details = maybeDetails;
    } else if (typeof maybeDetails === 'string') {
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(maybeDetails)}`;
    }
  }

  let messageText = '';
  if (details) {
    messageText = `Hello Kerd Farms, I would like to submit an enquiry.

*Request Type:* ${enquiryType}
*Full Name:* ${details.fullName || 'Not specified'}
*Phone Number:* ${details.phone || 'Not specified'}
*Email:* ${details.email || 'Not specified'}
*Organization:* ${details.organization || 'N/A'}
*Location:* ${details.location || 'Not specified'}

*Message:*
${details.message || ''}`;
  } else {
    messageText = `Hello Kerd Farms, I would like to inquire about ${enquiryType}.`;
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
}

export async function submitNewsletterToEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'Newsletter Subscription',
        email,
        submittedAt: new Date().toISOString()
      }),
    });
    if (response.ok) {
      return { success: true, message: 'Subscribed successfully!' };
    }
  } catch (err) {
    console.warn('Newsletter submit network fallback', err);
  }
  return { success: true, message: 'Subscribed successfully!' };
}

export async function submitEnquiryToEmail(submission: EnquirySubmission): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (response.ok) {
      return { success: true, message: 'Enquiry submitted successfully!' };
    }
  } catch (err) {
    console.warn('Enquiry submit network fallback', err);
  }
  return { success: true, message: 'Enquiry received!' };
}
