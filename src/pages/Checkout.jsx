import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Phone, CreditCard, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Checkout() {
  const { darkMode, t, cart, cartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState('momo');
  const [momoNumber, setMomoNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: 'Kigali',
    notes: ''
  });

  const delivery = cartTotal >= 50000 ? 0 : 2000;
  const total = cartTotal + delivery;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    const ref = 'SMB-' + Date.now().toString().slice(-8);
    setOrderRef(ref);
    setProcessing(false);
    setStep(3);
    clearCart();
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-4">{t.emptyCart}</h2>
          <Link to="/shop" className="bg-orange-500 text-white px-6 py-2 rounded-full">{t.shop}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t.checkout}</h1>

        {/* Steps */}
        {step < 3 && (
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-orange-500 text-white' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                <span className={`text-sm ${step >= s ? 'text-orange-500 font-medium' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {s === 1 ? t.deliveryInfo : t.paymentMethod}
                </span>
                {s < 2 && <div className={`w-12 h-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Success */}
        {step === 3 && (
          <div className={`text-center py-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t.thankYou}</h2>
            <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.orderRef}: <strong className="text-orange-500">{orderRef}</strong></p>
            <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>We'll send a confirmation to your phone. Delivery within 24 hours.</p>
            <Link to="/shop" className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600">{t.continueShopping}</Link>
          </div>
        )}

        {step < 3 && (
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Step 1: Delivery */}
                {step === 1 && (
                  <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Truck size={20} className="text-orange-500" /> {t.deliveryInfo}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[['firstName', t.firstName], ['lastName', t.lastName], ['email', t.email], ['phone', t.phone]].map(([key, label]) => (
                        <div key={key}>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
                          <input type={key === 'email' ? 'email' : 'text'} required value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
                        </div>
                      ))}
                      <div className="sm:col-span-2">
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.address}</label>
                        <input type="text" required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                          className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.city}</label>
                        <input type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                          className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.notes} <span className="text-gray-400">({t.optional})</span></label>
                        <input type="text" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                          className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CreditCard size={20} className="text-orange-500" /> {t.paymentMethod}</h2>
                    <div className="space-y-3 mb-6">
                      {[
                        { id: 'momo', label: t.mobileMoneyMTN, icon: '📱', desc: 'Pay with MTN Mobile Money' },
                        { id: 'airtel', label: t.airtelMoney, icon: '📲', desc: 'Pay with Airtel Money' },
                        { id: 'cod', label: t.cashOnDelivery, icon: '💵', desc: 'Pay when your order arrives' }
                      ].map(m => (
                        <label key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === m.id ? 'border-orange-500 bg-orange-50' : darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                          <input type="radio" name="payment" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} className="hidden" />
                          <span className="text-2xl">{m.icon}</span>
                          <div>
                            <div className="font-semibold">{m.label}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{m.desc}</div>
                          </div>
                          {payMethod === m.id && <Check size={18} className="text-orange-500 ml-auto" />}
                        </label>
                      ))}
                    </div>

                    {(payMethod === 'momo' || payMethod === 'airtel') && (
                      <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <Phone size={14} className="inline mr-1" /> {payMethod === 'momo' ? t.enterPhone : t.enterAirtel}
                        </label>
                        <div className="flex">
                          <span className={`px-3 py-2 rounded-l-lg border text-sm font-medium ${darkMode ? 'bg-gray-600 border-gray-500 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>+250</span>
                          <input type="tel" required={payMethod === 'momo' || payMethod === 'airtel'} value={momoNumber} onChange={e => setMomoNumber(e.target.value)}
                            placeholder={payMethod === 'momo' ? "078 000 0000" : "073 000 0000"} pattern="[0-9]{9,10}"
                            className={`flex-1 px-4 py-2 rounded-r-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`} />
                        </div>
                        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          You will receive a USSD prompt to confirm payment of {total.toLocaleString()} RWF via {payMethod === 'momo' ? 'MTN MoMo' : 'Airtel Money'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Order summary */}
              <div className={`rounded-xl p-6 h-fit sticky top-24 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                <h2 className="text-lg font-bold mb-4">{t.orderSummary}</h2>
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="line-clamp-1 flex-1 mr-2">{item.name} ×{item.qty}</span>
                      <span className="flex-shrink-0">{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className={`border-t pt-3 space-y-2 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex justify-between text-sm"><span>{t.subtotal}</span><span>{cartTotal.toLocaleString()} RWF</span></div>
                  <div className="flex justify-between text-sm"><span>Delivery</span><span className="text-green-500">{delivery === 0 ? 'FREE' : `${delivery.toLocaleString()} RWF`}</span></div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-dashed">
                    <span>{t.total}</span><span className="text-orange-500">{total.toLocaleString()} RWF</span>
                  </div>
                </div>
                <button type="submit" disabled={processing}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                  {processing ? <><span className="animate-spin">⏳</span> {t.processing}</> : step === 1 ? 'Continue to Payment →' : t.confirmOrder}
                </button>
                {step === 2 && (
                  <button type="button" onClick={() => setStep(1)} className={`w-full mt-2 py-2 text-sm hover:text-orange-500 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>← Back</button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
