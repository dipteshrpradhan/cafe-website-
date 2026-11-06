import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { X, Trash2, Plus, Minus, CheckCircle, Receipt, UtensilsCrossed } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartGst,
    cartTotal,
    triggerCMSNotice,
  } = useCafe();

  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 04 (Cabin Lounge)');
  const [customerName, setCustomerName] = useState('');
  const [placedOrder, setPlacedOrder] = useState<{
    token: string;
    type: string;
    tableOrPickup: string;
    time: string;
  } | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `CAP-${Math.floor(100 + Math.random() * 900)}`;
    setPlacedOrder({
      token,
      type: orderType === 'dine-in' ? 'Dine-In Table Order' : 'Takeaway Express',
      tableOrPickup: orderType === 'dine-in' ? tableNumber : `Pickup for ${customerName || 'Voyager Guest'}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    triggerCMSNotice(`New Order #${token} received from ${tableNumber}`);
  };

  const handleFinish = () => {
    setPlacedOrder(null);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#0E1B2B] border-l border-[#1E2E42] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1E2E42] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 flex items-center justify-center text-[#F5C249]">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Your Order Tray</h3>
              <p className="text-xs text-[#94A3B8]">The Captain’s Cafe Digital Service</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E2E42] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {placedOrder ? (
            /* Receipt / Placed Order View */
            <div className="py-6 text-center space-y-4 bg-[#122338] border border-[#334A65] rounded-2xl p-6">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Order Dispatched to Galley
                </span>
                <h4 className="font-serif text-3xl font-bold text-white mt-1">
                  Token #{placedOrder.token}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {placedOrder.type} · {placedOrder.tableOrPickup}
                </p>
              </div>

              <div className="border-t border-b border-[#1E2E42] py-3 text-left space-y-1.5 text-xs text-[#CBD5E1]">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Items Count:</span>
                  <span className="font-medium text-white">{cart.reduce((a, b) => a + b.quantity, 0)} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Total Amount:</span>
                  <span className="font-bold text-[#F5C249] tabular-nums">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Estimated Prep:</span>
                  <span className="text-emerald-400 font-medium">12–15 mins</span>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] italic">
                Our crew is preparing your plates & brews fresh. Your table server will arrive shortly!
              </p>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] font-semibold text-sm transition-colors"
              >
                Close & Return to Cafe
              </button>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-20 space-y-3">
              <Receipt className="w-12 h-12 text-[#334A65] mx-auto" />
              <p className="text-base font-semibold text-white">Your tray is empty</p>
              <p className="text-xs text-[#94A3B8] max-w-xs mx-auto">
                Explore our signature flat whites, burgers, and blueberry cheesecake from the menu to populate your tray.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2 rounded-xl bg-[#1E2E42] text-xs font-semibold text-white hover:bg-[#C89B3C] hover:text-[#0B1522] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-3">
              {cart.map(({ item, quantity, customization }) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#122338] border border-[#1E2E42] flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          item.dietary === 'veg'
                            ? 'bg-emerald-400'
                            : item.dietary === 'vegan'
                            ? 'bg-teal-400'
                            : 'bg-red-400'
                        }`}
                      />
                      <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                    </div>
                    
                    <p className="text-xs font-serif text-[#C89B3C] font-semibold mt-0.5 tabular-nums">
                      ₹{item.price * quantity}
                      <span className="text-[11px] text-[#64748B] font-sans font-normal ml-1">
                        (₹{item.price} each)
                      </span>
                    </p>

                    {/* Customization notes */}
                    {customization && (
                      <p className="text-[11px] text-[#94A3B8] mt-1 truncate">
                        {[
                          customization.milkChoice,
                          customization.sugarLevel,
                          customization.extraNote ? `Note: "${customization.extraNote}"` : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-[#0B1522] border border-[#243B55] rounded-lg p-1 shrink-0">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1 rounded text-[#94A3B8] hover:text-white hover:bg-[#1E2E42]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-4 text-center tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 rounded text-[#94A3B8] hover:text-white hover:bg-[#1E2E42]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#64748B] hover:text-red-400 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex justify-end pt-1">
                <button
                  onClick={clearCart}
                  className="text-xs text-[#94A3B8] hover:text-red-400 underline underline-offset-2"
                >
                  Clear all items
                </button>
              </div>

              {/* Order Mode Configuration */}
              <div className="pt-4 border-t border-[#1E2E42] space-y-3">
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase">
                  Order Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                      orderType === 'dine-in'
                        ? 'bg-[#C89B3C] text-[#0B1522] border-[#C89B3C]'
                        : 'bg-[#122338] text-[#94A3B8] border-[#243B55]'
                    }`}
                  >
                    Dine-In Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                      orderType === 'takeaway'
                        ? 'bg-[#C89B3C] text-[#0B1522] border-[#C89B3C]'
                        : 'bg-[#122338] text-[#94A3B8] border-[#243B55]'
                    }`}
                  >
                    Takeaway Express
                  </button>
                </div>

                {orderType === 'dine-in' ? (
                  <div>
                    <label className="block text-xs text-[#94A3B8] mb-1">Select Your Table</label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-[#0B1522] border border-[#243B55] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C89B3C]"
                    >
                      <option value="Table 01 (Cabin Lounge)">Table 01 (Cabin Lounge)</option>
                      <option value="Table 04 (Cabin Lounge)">Table 04 (Cabin Lounge)</option>
                      <option value="Table 08 (Sun Deck Garden)">Table 08 (Sun Deck Garden)</option>
                      <option value="Table 12 (Library Work Nook)">Table 12 (Library Work Nook)</option>
                      <option value="Table 16 (Outdoor Terrace)">Table 16 (Outdoor Terrace)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs text-[#94A3B8] mb-1">Pickup Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul S."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#0B1522] border border-[#243B55] rounded-xl px-3 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                    />
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Footer / Bill Summary */}
        {!placedOrder && cart.length > 0 && (
          <div className="p-5 border-t border-[#1E2E42] bg-[#0B1522] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Items Subtotal:</span>
                <span className="text-white font-medium tabular-nums">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Cafe GST (5%):</span>
                <span className="text-white font-medium tabular-nums">₹{cartGst}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#1E2E42]">
                <span>Total Due:</span>
                <span className="text-[#F5C249] font-serif tabular-nums">₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] font-semibold text-sm transition-all shadow-lg shadow-[#C89B3C]/20 hover:shadow-xl"
            >
              Send Order to Kitchen (₹{cartTotal})
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
