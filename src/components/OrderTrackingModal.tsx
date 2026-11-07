import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Truck, Package, Search, Printer, MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';
import { OrderSubmission, getOrderByID, getWhatsAppOrderLink } from '../services/formService';
import { MOMO_CONFIG } from '../data/products';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: OrderSubmission | null;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  activeOrder: initialOrder,
}) => {
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<OrderSubmission | null>(initialOrder);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync if initialOrder changes
  React.useEffect(() => {
    if (initialOrder) {
      setSearchedOrder(initialOrder);
      setSearchId(initialOrder.orderId);
    }
  }, [initialOrder]);

  if (!isOpen) return null;

  const currentOrder = searchedOrder || initialOrder;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!searchId.trim()) {
      setErrorMsg('Please enter an Order ID (e.g., KF-2026-1234)');
      return;
    }
    const found = getOrderByID(searchId);
    if (found) {
      setSearchedOrder(found);
    } else {
      setErrorMsg(`No order found matching "${searchId}". Please check your Order Reference.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-8">
        
        {/* Header */}
        <div className="p-6 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-700 rounded-xl text-amber-300">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Kerd Farms Order Tracking & Confirmation</h2>
              <p className="text-xs text-emerald-200">Sent to info@kerdfarms.com and kerdfarms@gmail.com for Confirmation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Order Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order Reference (e.g. KF-2026-9814)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Lookup
            </button>
          </form>

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {currentOrder ? (
            <div className="space-y-6">
              
              {/* STATUS SUMMARY BANNER */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                    Order Reference: <strong className="text-emerald-950 dark:text-white font-mono text-sm">{currentOrder.orderId}</strong>
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Submitted: {new Date(currentOrder.createdAt).toLocaleString('en-GB')}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-400 text-emerald-950 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentOrder.paymentStatus}</span>
                </div>
              </div>

              {/* LIVE TRACKING STEPPER */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Order Status Progress
                </h3>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">1. Submitted</div>
                    <div className="text-slate-500">Sent to Email</div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow animate-pulse">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">2. MoMo Verification</div>
                    <div className="text-slate-500">Checking Tx ID</div>
                  </div>

                  <div className="space-y-1.5 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center mx-auto">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">3. Farm Packing</div>
                    <div className="text-slate-500">Harvesting Fresh</div>
                  </div>

                  <div className="space-y-1.5 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center mx-auto">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">4. Delivery</div>
                    <div className="text-slate-500">{currentOrder.deliveryCity}</div>
                  </div>
                </div>
              </div>

              {/* PAYMENT & CUSTOMER DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1">
                    Customer & Shipping
                  </h4>
                  <div><strong>Name:</strong> {currentOrder.customerName}</div>
                  <div><strong>Phone:</strong> {currentOrder.customerPhone}</div>
                  <div><strong>Email:</strong> {currentOrder.customerEmail || 'Not specified'}</div>
                  <div><strong>City/Region:</strong> {currentOrder.deliveryCity}</div>
                  <div><strong>Address:</strong> {currentOrder.deliveryAddress}</div>
                  {currentOrder.specialNotes && (
                    <div className="text-slate-500 italic">"{currentOrder.specialNotes}"</div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1">
                    MoMo Payment Submitted
                  </h4>
                  <div><strong>MoMo Name:</strong> {currentOrder.momoAccountName}</div>
                  <div><strong>MoMo Phone:</strong> {currentOrder.momoPhone}</div>
                  <div><strong>Transaction Ref:</strong> <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{currentOrder.momoTransactionId || 'Pending'}</span></div>
                  <div><strong>Method:</strong> Mobile Money (MTN / Telecel)</div>
                  <div><strong>Payee Account:</strong> KERD FARMS ({MOMO_CONFIG.mtnNumber})</div>
                </div>
              </div>

              {/* ITEMIZED TABLE */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <tr>
                      <th className="p-3">Product Item</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentOrder.items.map((item, idx) => {
                      const itemTotal = (item.product.price || 0) * item.quantity;
                      return (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-medium text-slate-900 dark:text-white">
                            {item.product.name}
                          </td>
                          <td className="p-3 text-center text-slate-600 dark:text-slate-400">
                            {item.quantity}
                          </td>
                          <td className="p-3 text-right font-mono text-slate-600 dark:text-slate-400">
                            GH₵ {(item.product.price || 0).toFixed(2)}
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                            GH₵ {itemTotal.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-slate-50 dark:bg-slate-800/80 font-semibold border-t border-slate-200 dark:border-slate-800">
                    <tr>
                      <td colSpan={3} className="p-2.5 text-right text-slate-600 dark:text-slate-400">Subtotal:</td>
                      <td className="p-2.5 text-right font-mono">GH₵ {currentOrder.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="p-2.5 text-right text-slate-600 dark:text-slate-400">Delivery ({currentOrder.deliveryCity}):</td>
                      <td className="p-2.5 text-right font-mono">GH₵ {currentOrder.deliveryFee.toFixed(2)}</td>
                    </tr>
                    <tr className="text-sm font-bold text-emerald-800 dark:text-emerald-300 border-t border-slate-200 dark:border-slate-700">
                      <td colSpan={3} className="p-3 text-right">GRAND TOTAL:</td>
                      <td className="p-3 text-right font-mono text-base">GH₵ {currentOrder.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppOrderLink(currentOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                  <span>Instant Confirm on WhatsApp ({MOMO_CONFIG.primaryPhone})</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Enter an Order Reference ID above to track your delivery.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
