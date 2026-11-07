import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  ShoppingBag,
  Copy,
  Check,
  MapPin,
  Truck,
  Phone,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CartItem, OrderSubmission, generateOrderId } from '../services/formService';
import { MOMO_CONFIG } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderCompleted: (order: OrderSubmission) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted,
}) => {
  const [deliveryCity, setDeliveryCity] = useState('Accra');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [copiedMoMo, setCopiedMoMo] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  // Calculate financials in Ghanaian Cedis (GH₵)
  const subtotal = items.reduce((acc, item) => {
    const itemPrice = typeof item.product.price === 'number' ? item.product.price : 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const getDeliveryCost = (city: string) => {
    if (subtotal === 0) return 0;
    switch (city) {
      case 'Accra':
        return 20;
      case 'Tema':
        return 25;
      case 'Kumasi':
        return 35;
      case 'Takoradi':
        return 35;
      case 'Ho / Volta':
        return 30;
      case 'Farm Pickup / Abokobi':
        return 0;
      default:
        return 35;
    }
  };

  const deliveryFee = getDeliveryCost(deliveryCity);
  const grandTotal = subtotal + deliveryFee;

  const handleCopyMoMoNumber = () => {
    navigator.clipboard.writeText('0240135545');
    setCopiedMoMo(true);
    setTimeout(() => setCopiedMoMo(false), 2500);
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const orderId = generateOrderId();

    // 1. Build itemized breakdown of every product, quantity, package size, unit price and subtotal
    const itemizedBreakdown = items
      .map((item, idx) => {
        const title = item.product.name;
        const packageSize = item.product.unit || 'Standard Unit';
        const category = ('categoryLabel' in item.product && item.product.categoryLabel)
          ? item.product.categoryLabel
          : (item.product.category || 'General Produce');
        const unitPriceStr = typeof item.product.price === 'number'
          ? `GH₵ ${item.product.price.toFixed(2)}`
          : 'Quote on confirmation';
        const lineTotalStr = typeof item.product.price === 'number'
          ? `GH₵ ${(item.product.price * item.quantity).toFixed(2)}`
          : 'Pending quote';

        return `${idx + 1}. *${title}*
   • Package Size: ${packageSize}
   • Category: ${category}
   • Unit Price: ${unitPriceStr}
   • Quantity: ${item.quantity}
   • Line Total: ${lineTotalStr}`;
      })
      .join('\n\n');

    // 2. Build structured WhatsApp message payload matching user requirements
    const messageText = 
`Hello Kerd Farms (+233 24 013 5545), I would like to place an order from kerdfarms.com.

*Order Reference:* ${orderId}
*Customer Name:* ${customerName.trim() || 'Valued Customer'}
*Customer Phone:* ${customerPhone.trim() || 'Provided on chat'}
*Delivery City / Region:* ${deliveryCity}
*Delivery Address / Landmark:* ${deliveryAddress.trim() || 'To be confirmed with dispatch'}
${specialInstructions.trim() ? `*Special Notes:* ${specialInstructions.trim()}\n` : ''}
*--- ORDERED PRODUCTS ---*
${itemizedBreakdown}

*--- ORDER TOTALS (GH₵) ---*
• Items Subtotal: GH₵ ${subtotal.toFixed(2)}
• Estimated Delivery Fee: GH₵ ${deliveryFee.toFixed(2)} (${deliveryCity})
• *TOTAL AMOUNT PAYABLE: GH₵ ${grandTotal.toFixed(2)}*

*--- MOBILE MONEY (MoMo) PAYMENT DETAILS ---*
• MoMo Account Name: ${MOMO_CONFIG.accountName}
• Official MoMo Number: ${MOMO_CONFIG.mtnNumber} (MTN / Telecel)
• Payment Status: Ready for verification upon order review

Please confirm product availability, delivery scheduling, and final arrangements. Thank you!`;

    // 3. Open WhatsApp directly with preloaded summary payload
    const whatsappUrl = 'https://wa.me/233240135545?text=' + encodeURIComponent(messageText);
    window.open(whatsappUrl, '_blank');

    // 4. Save order locally for customer tracking
    const newOrder: OrderSubmission = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim() || 'WhatsApp Customer',
      customerPhone: customerPhone.trim(),
      customerEmail: 'info@kerdfarms.com',
      deliveryCity,
      deliveryAddress: deliveryAddress.trim() || deliveryCity,
      specialNotes: specialInstructions.trim(),
      momoAccountName: MOMO_CONFIG.accountName,
      momoPhone: MOMO_CONFIG.mtnNumber,
      momoTransactionId: `WA-${orderId}`,
      items,
      subtotal,
      deliveryFee,
      totalAmount: grandTotal,
      paymentStatus: 'Submitted via WhatsApp (Pending Confirmation)'
    };

    // 5. Asynchronously log order to server API
    fetch('/api/submit-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch((err) => console.warn('Order background sync fallback:', err));

    // 6. Complete and close cart
    onClearCart();
    onOrderCompleted(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-emerald-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-800 rounded-xl text-amber-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">Your Shopping Cart</h2>
                <p className="text-[11px] text-emerald-200">
                  {items.length} {items.length === 1 ? 'item' : 'items'} · Instant WhatsApp Checkout
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">

            {/* Mobile Money (MoMo) Account Detail Display */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/60 dark:to-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                    Official MoMo Payment Details
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyMoMoNumber}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  {copiedMoMo ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    Official Account Name
                  </div>
                  <div className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-[13px] mt-0.5 tracking-tight text-emerald-950 dark:text-emerald-100">
                    {MOMO_CONFIG.accountName}
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    MTN / Telecel Number
                  </div>
                  <div className="font-mono font-extrabold text-emerald-700 dark:text-amber-300 text-xs sm:text-[13px] mt-0.5">
                    {MOMO_CONFIG.mtnNumber}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Confirm your order via WhatsApp below. You can send payment directly to <strong>{MOMO_CONFIG.accountName}</strong> before or upon delivery confirmation.
              </p>
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Explore fresh eggs by the crate, vibrant fruits and vegetables, seedlings, and organic manure.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold text-xs transition-colors shadow"
                >
                  Browse Fresh Products
                </button>
              </div>
            ) : (
              /* Itemized Product List */
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Selected Items ({items.length})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                  {items.map((item) => {
                    const price = typeof item.product.price === 'number' ? item.product.price : 0;
                    const itemTotal = price * item.quantity;
                    const packageSize = item.product.unit || 'Standard Unit';
                    const categoryLabel = ('categoryLabel' in item.product && item.product.categoryLabel)
                      ? item.product.categoryLabel
                      : (item.product.category || 'Agricultural Supply');

                    return (
                      <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3.5 items-start">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-800"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                {categoryLabel}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {item.product.name}
                              </h4>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="p-1 text-slate-400 hover:text-red-500 transition-colors shrink-0"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Package Size: <strong className="text-slate-700 dark:text-slate-300">{packageSize}</strong>
                          </div>

                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Unit Price:{' '}
                            <strong className="text-slate-900 dark:text-white">
                              {typeof item.product.price === 'number'
                                ? `GH₵ ${item.product.price.toFixed(2)}`
                                : 'Quote on request'}
                            </strong>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                aria-label="Decrease quantity"
                                className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold w-6 text-center text-slate-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                aria-label="Increase quantity"
                                className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300">
                              {typeof item.product.price === 'number'
                                ? `GH₵ ${itemTotal.toFixed(2)}`
                                : 'Pending Quote'}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Delivery & Recipient Details Form */}
            {items.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Delivery Details (For WhatsApp Summary)</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="024 XXX XXXX"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Delivery Region / City
                    </label>
                    <select
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Accra">Accra (GH₵ 20)</option>
                      <option value="Tema">Tema (GH₵ 25)</option>
                      <option value="Kumasi">Kumasi (GH₵ 35)</option>
                      <option value="Takoradi">Takoradi (GH₵ 35)</option>
                      <option value="Ho / Volta">Ho / Volta (GH₵ 30)</option>
                      <option value="Other Region">Other Region (GH₵ 35)</option>
                      <option value="Farm Pickup / Abokobi">Farm Pickup - Abokobi (Free)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Delivery Address / Landmark
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. East Legon / Near Shell"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Special Notes or Preferred Delivery Time (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Deliver before noon / Call before arrival"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Footer Financial Summary & WhatsApp Confirm Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 space-y-3.5">
              
              {/* Itemized Financials */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Products Subtotal</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    GH₵ {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery Fee ({deliveryCity})</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {deliveryFee > 0 ? `GH₵ ${deliveryFee.toFixed(2)}` : 'FREE (Pickup)'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm font-bold text-slate-900 dark:text-white pt-2.5 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Amount (GH₵)</span>
                  <span className="font-mono text-lg font-black text-emerald-800 dark:text-emerald-400">
                    GH₵ {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Prominent WhatsApp Confirm Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5 text-amber-300 shrink-0 fill-current" />
                <span>Confirm &amp; Send Order via WhatsApp</span>
              </button>

              <div className="text-[11px] text-center text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  Opens WhatsApp with pre-filled summary sent directly to <strong>+233 24 013 5545</strong>
                </span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
