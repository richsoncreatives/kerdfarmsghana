import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, Send, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Copy, Check, MessageSquare } from 'lucide-react';
import { CartItem, OrderSubmission, generateOrderId, getWhatsAppOrderLink } from '../services/formService';
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
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'momo_payment'>('cart');
  const [orderId, setOrderId] = useState<string>('');
  
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Accra');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  // MoMo Payment details
  const [momoAccountName, setMomoAccountName] = useState('');
  const [momoPhone, setMomoPhone] = useState('');
  const [momoTransactionId, setMomoTransactionId] = useState('');
  
  const [copiedMoMo, setCopiedMoMo] = useState(false);
  const [formError, setFormError] = useState('');

  // Generate Order ID when checkout starts
  useEffect(() => {
    if (checkoutStep === 'momo_payment' && !orderId) {
      setOrderId(generateOrderId());
    }
  }, [checkoutStep, orderId]);

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

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!customerPhone.trim()) {
      setFormError('Please enter your phone number');
      return;
    }
    if (!deliveryAddress.trim()) {
      setFormError('Please enter your delivery address/location');
      return;
    }

    // Construct the complete order object
    const newOrder: OrderSubmission = {
      orderId: orderId || generateOrderId(),
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      deliveryCity,
      deliveryAddress: deliveryAddress.trim(),
      specialNotes: specialNotes.trim(),
      momoAccountName: momoAccountName.trim(),
      momoPhone: momoPhone.trim(),
      momoTransactionId: momoTransactionId.trim(),
      items,
      subtotal,
      deliveryFee,
      totalAmount: grandTotal,
      paymentStatus: momoTransactionId.trim() ? 'Paid & Pending Verification' : 'Order Placed (Pay on Delivery / Pending MoMo)'
    };

    // Generate the WhatsApp URL with the full cart summary and customer details
    const whatsappUrl = getWhatsAppOrderLink(newOrder);

    // Open WhatsApp in a new tab pointing to your official number (https://wa.me/233240135545)
    window.open(whatsappUrl, '_blank');

    // Complete order actions
    onClearCart();
    onOrderCompleted(newOrder);
    onClose();
    setCheckoutStep('cart');
    setOrderId('');
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
              <h2 className="text-lg font-bold">
                {checkoutStep === 'cart' ? 'Your Shopping Cart' : 'WhatsApp Checkout & Payment'}
              </h2>
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

            {/* STEP 1: CART ITEMS LIST */}
            {checkoutStep === 'cart' && (
              <>
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
                  <>
                    {/* WhatsApp Highlight Banner */}
                    <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-3">
                      <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                        <div className="font-bold">Instant WhatsApp Checkout</div>
                        <div>Send your entire cart summary directly to our official line: <strong>+233 24 013 5545</strong></div>
                      </div>
                    </div>

                    {/* Items List */}
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
                  </>
                )}
              </>
            )}

            {/* STEP 2: DETAILS & MOMO CONFIRMATION FOR WHATSAPP */}
            {checkoutStep === 'momo_payment' && (
              <form id="whatsapp-checkout-form" onSubmit={handleWhatsAppCheckout} className="space-y-5">
                
                {/* MOMO DETAILS CARD */}
                <div className="p-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-2xl shadow-md border border-emerald-700/50 space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-700/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-400 text-emerald-950 font-black text-[11px] px-2 py-0.5 rounded">
                        MOMO PAYMENT
                      </span>
                      <span className="text-xs font-semibold text-emerald-200">
                        Ref: <strong className="text-white">{orderId}</strong>
                      </span>
                    </div>
                    <span className="text-xs bg-emerald-700/80 px-2 py-0.5 rounded text-emerald-100 font-mono">
                      GH₵ {grandTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/80">
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Official MoMo Number</div>
                    <div className="text-sm font-extrabold font-mono text-amber-300 mt-0.5 flex items-center justify-between">
                      <span>{MOMO_CONFIG.mtnNumber}</span>
                      <button
                        type="button"
                        onClick={handleCopyMoMo}
                        className="p-1 text-emerald-300 hover:text-white"
                        title="Copy MoMo Number"
                      >
                        {copiedMoMo ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="text-[10px] text-emerald-300">Name: {MOMO_CONFIG.accountName}</div>
                  </div>

                  <div className="text-[11px] text-emerald-200 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/50 space-y-1">
                    <div className="font-bold text-amber-300">Instructions:</div>
                    <ol className="list-decimal list-inside space-y-0.5">
                      <li>Transfer <strong>GH₵ {grandTotal.toFixed(2)}</strong> via MoMo (Optional if paying on delivery)</li>
                      <li>Fill your details below and click <strong>"Send Order via WhatsApp"</strong></li>
                    </ol>
                  </div>
                </div>

                {/* ERROR ALERT */}
                {formError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* CUSTOMER CONTACT DETAILS */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    1. Customer Information
                  </h3>

                  <div className="grid grid-cols-1 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Kwame Mensah"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="024 XXX XXXX"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          City / Region *
                        </label>
                        <select
                          value={deliveryCity}
                          onChange={(e) => setDeliveryCity(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        >
                          <option value="Accra">Accra (GH₵ 20 Delivery)</option>
                          <option value="Tema">Tema (GH₵ 25 Delivery)</option>
                          <option value="Kumasi">Kumasi (GH₵ 35 Delivery)</option>
                          <option value="Takoradi">Takoradi (GH₵ 35 Delivery)</option>
                          <option value="Ho">Ho / Volta Region (GH₵ 30 Delivery)</option>
                          <option value="Other Ghana Location">Other Region (GH₵ 35)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Delivery Address / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. East Legon, near Shell"
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* OPTIONAL MOMO TRANSACTION ID */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    2. MoMo Transaction ID (If Paid)
                  </h3>
                  <input
                    type="text"
                    value={momoTransactionId}
                    onChange={(e) => setMomoTransactionId(e.target.value)}
                    placeholder="e.g. 28941029412 (leave blank if paying on delivery)"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

              </form>
            )}

          </div>

          {/* Footer Controls */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 space-y-3">
              
              {/* Summary Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Items Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="font-mono text-slate-900 dark:text-white">GH₵ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery ({deliveryCity})</span>
                  <span className="font-mono text-slate-900 dark:text-white">GH₵ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Payable</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">GH₵ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('momo_payment')}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Proceed to WhatsApp Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="px-4 py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-xs transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="whatsapp-checkout-form"
                    className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-300" />
                    <span>Send Order via WhatsApp</span>
                  </button>
                </div>
              )}

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
