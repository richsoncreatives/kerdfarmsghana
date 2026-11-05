export interface CartItem {
  product: {
    id: string;
    name: string;
    price?: number;
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

export function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'KF-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getWhatsAppEnquiryLink(
  enquiryType: string = 'General',
  details?: {
    fullName?: string;
    phone?: string;
    email?: string;
    organization?: string;
    location?: string;
    message?: string;
  } | string
): string {
  const phoneNumber = '233240135545';
  
  let messageText = '';
  if (typeof details === 'string') {
    messageText = details;
  } else if (details) {
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
