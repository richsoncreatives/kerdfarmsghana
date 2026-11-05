import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, MessageSquare } from 'lucide-react';
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

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    const itemPrice = item.product.price || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 0 ? (deliveryCity === 'Accra' ? 20 : 35) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleCopyMoMo = () => {
    navigator.clipboard.writeText(MOMO_CONFIG.mtnNumber);
    setCopiedMoMo(true);
    setTimeout(() => setCopiedMoMo(false), 2500);
  };

  const handleWhatsAppCheckout = () => {
    const orderId = generateOrderId();
    
    // Build formatted itemized text list for WhatsApp
    const itemsListText = items
      .map((item, idx) => `*${idx + 1}. ${item.product.name}* (${item.product.unit})\n   Qty: ${item.quantity} | Price: GH₵${item.product.price || 0} each | Total: GH₵${((item.product.price || 0) * item.quantity).toFixed(2)}`)
      .join('\n\n');

    // Construct the complete prefilled message
    const message = 
`Hello Kerd Farms, I would like to place an order from my shopping cart.

*Order Ref:* ${orderId}
*Customer Name:* ${customerName.trim() || 'Not specified'}
*Phone Number:* ${customerPhone.trim() || 'Not specified'}
*Delivery City:* ${deliveryCity}
*Delivery Address:* ${deliveryAddress.trim() || 'To be confirmed'}

*--- ORDERED ITEMS ---*
${itemsListText}

*Items Subtotal:* GH₵ ${subtotal.toFixed(2)}
*Estimated Delivery Fee:* GH₵ ${deliveryFee.toFixed(2)}
*Total Payable:* GH₵ ${grandTotal.toFixed(2)}

*Payment Account Name:* ${MOMO_CONFIG.accountName}
*Payment Number:* ${MOMO_CONFIG.mtnNumber}

Please confirm availability, delivery arrangements, and final cost.`;

    // Encode message for URL and open official WhatsApp number (+233 24 013 5545)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/233240135545?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Clear cart and close drawer
    const newOrder: OrderSubmission = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: '',
      deliveryCity,
      deliveryAddress: deliveryAddress.trim(),
      specialNotes: '',
      momoAccountName: MOMO_CONFIG.accountName,
      momoPhone: MOMO_CONFIG.mtnNumber,
      momoTransactionId: '',
      items,
      subtotal,
      deliveryFee,
      totalAmount: grandTotal,
      paymentStatus: 'Submitted via WhatsApp'
    };

    onClearCart();
    onOrderCompleted(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-emerald-800 text-white">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-300" />
              <h2 className="text-lg font-bold">Shopping Cart & WhatsApp Checkout</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-700/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">

            {/* MoMo Highlight Banner */}
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <div className="font-bold">Instant WhatsApp Checkout</div>
                <div>MTN MoMo: <strong>{MOMO_CONFIG.mtnNumber}</strong></div>
                <div>Account Name: <strong>{MOMO_CONFIG.accountName}</strong></div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  Clicking "Confirm & Submit" packages your cart into WhatsApp for our team.
                </div>
              </div>
            </div>

            {/* Items List */}
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBagIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Explore our fresh farm eggs, fruits, vegetables, seedlings, and organic manure.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-xs transition-colors"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                {items.map((item) => {
                  const itemTotal = (item.product.price || 0) * item.quantity;
                  return (
                    <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-slate-200 dark:border-slate-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.product.price ? `GH₵ ${item.product.price.toFixed(2)} / ${item.product.unit}` : 'Custom Quote'}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-5 text-center text-slate-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                            GH₵ {itemTotal.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Delivery & Contact Inputs for WhatsApp Message */}
            {items.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Delivery Details for WhatsApp
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="024 XXX XXXX"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">City / Region</label>
                    <select
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="Accra">Accra (GH₵ 20)</option>
                      <option value="Tema">Tema (GH₵ 25)</option>
                      <option value="Kumasi">Kumasi (GH₵ 35)</option>
                      <option value="Takoradi">Takoradi (GH₵ 35)</option>
                      <option value="Ho">Ho / Volta (GH₵ 30)</option>
                      <option value="Other Region">Other Region (GH₵ 35)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">Address / Landmark</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. East Legon"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Controls & Confirm Button */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 space-y-3">
              
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-mono text-slate-900 dark:text-white">GH₵ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee ({deliveryCity})</span>
                  <span className="font-mono text-slate-900 dark:text-white">GH₵ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Payable</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">GH₵ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                <span>Confirm & Submit via WhatsApp</span>
              </button>

              <div className="text-[11px] text-center text-slate-500">
                💬 Opens WhatsApp with your complete cart summary sent to <strong>+233 24 013 5545</strong>.
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
