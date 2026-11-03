import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, CheckCircle2, Truck, MessageSquare, Printer, AlertCircle } from 'lucide-react';
import { OrderSubmission, getOrderByID, getWhatsAppOrderLink } from '../services/formService';
import { MOMO_CONFIG } from '../data/products';

interface TrackOrderViewProps {
  initialOrderId?: string;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({ initialOrderId = '' }) => {
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<OrderSubmission | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Try retrieving recent order from local storage if no input
    const stored = localStorage.getItem('kerdfarms_orders');
    if (stored) {
      try {
        const orders: OrderSubmission[] = JSON.parse(stored);
        if (orders.length > 0) {
          const latest = orders[0];
          setActiveOrder(latest);
          setOrderIdInput(latest.orderId);
        }
      } catch (e) {}
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!orderIdInput.trim()) {
      setErrorMsg('Please enter an Order ID (e.g., KF-2026-9814)');
      return;
    }
    const found = getOrderByID(orderIdInput.trim());
    if (found) {
      setActiveOrder(found);
    } else {
      setErrorMsg(`No order records found for "${orderIdInput}". Please verify your Order Reference ID.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
          <Package className="w-3.5 h-3.5 text-amber-300" />
          <span>ORDER TRACKING & MOMO VERIFICATION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Track Your Delivery
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Enter your Kerd Farms Order Reference ID to view live delivery status, MoMo confirmation progress, and item details.
        </p>
      </div>

      {/* SEARCH CARD */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="Enter Order Reference ID (e.g. KF-2026-9814)"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow"
          >
            Track Order
          </button>
        </form>

        {errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* ACTIVE ORDER DETAILS */}
      {activeOrder ? (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-4xl mx-auto">
          
          {/* BANNER HEADER */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                Order ID: <strong className="text-emerald-950 dark:text-white font-mono text-sm">{activeOrder.orderId}</strong>
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                Submitted to kerdfarms@gmail.com on {new Date(activeOrder.createdAt).toLocaleString('en-GB')}
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-400 text-emerald-950 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeOrder.paymentStatus}</span>
            </div>
          </div>

          {/* STEPPER PROGRESS */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Live Delivery Stepper
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 dark:text-white">1. Submitted</div>
                <div className="text-slate-500">Form to Email</div>
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
                <div className="text-slate-500">Fresh Harvest</div>
              </div>

              <div className="space-y-1.5 opacity-50">
                <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center mx-auto">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 dark:text-white">4. Out for Delivery</div>
                <div className="text-slate-500">{activeOrder.deliveryCity}</div>
              </div>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1">
                Customer & Shipping
              </h4>
              <div><strong>Name:</strong> {activeOrder.customerName}</div>
              <div><strong>Phone:</strong> {activeOrder.customerPhone}</div>
              <div><strong>Email:</strong> {activeOrder.customerEmail || 'Not specified'}</div>
              <div><strong>City:</strong> {activeOrder.deliveryCity}</div>
              <div><strong>Address:</strong> {activeOrder.deliveryAddress}</div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1">
                MoMo Payment Details
              </h4>
              <div><strong>MoMo Name:</strong> {activeOrder.momoAccountName}</div>
              <div><strong>MoMo Phone:</strong> {activeOrder.momoPhone}</div>
              <div><strong>Transaction ID:</strong> <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{activeOrder.momoTransactionId || 'Pending'}</span></div>
              <div><strong>Payee Account:</strong> KERD FARMS ({MOMO_CONFIG.mtnNumber})</div>
            </div>
          </div>

          {/* TABLE */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-900 dark:text-white">{item.product.name}</td>
                    <td className="p-3 text-center text-slate-600 dark:text-slate-400">{item.quantity}</td>
                    <td className="p-3 text-right font-mono text-slate-600 dark:text-slate-400">GH₵ {(item.product.price || 0).toFixed(2)}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900 dark:text-white">GH₵ {((item.product.price || 0) * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-800/80 font-bold border-t border-slate-200 dark:border-slate-800">
                <tr>
                  <td colSpan={3} className="p-2.5 text-right text-slate-600 dark:text-slate-400">Subtotal:</td>
                  <td className="p-2.5 text-right font-mono">GH₵ {activeOrder.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="p-2.5 text-right text-slate-600 dark:text-slate-400">Delivery Fee:</td>
                  <td className="p-2.5 text-right font-mono">GH₵ {activeOrder.deliveryFee.toFixed(2)}</td>
                </tr>
                <tr className="text-sm font-bold text-emerald-800 dark:text-emerald-300 border-t border-slate-200 dark:border-slate-700">
                  <td colSpan={3} className="p-3 text-right">GRAND TOTAL:</td>
                  <td className="p-3 text-right font-mono text-base">GH₵ {activeOrder.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* WHATSAPP & PRINT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={getWhatsAppOrderLink(activeOrder)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>Confirm Order with Farm Manager on WhatsApp</span>
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
        <div className="text-center py-12 text-slate-500 text-xs max-w-md mx-auto">
          No active order selected. Enter an Order Reference ID above to track your delivery.
        </div>
      )}

    </div>
  );
};
