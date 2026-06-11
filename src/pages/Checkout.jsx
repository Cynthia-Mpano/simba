import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Phone, CreditCard, Truck, ArrowRight, CheckCircle, XCircle, Loader, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

/* ── Simulated MoMo / Airtel payment flow ─────────────────
   Steps: initiate → USSD sent → PIN wait → processing → verify → result
   Each step has a realistic delay to mimic real USSD flow.
   ──────────────────────────────────────────────────────── */
async function simulateMobilePayment(phone, amount, provider, onStep) {
  const steps = [
    { key: 'step1', delay: 1200 },
    { key: 'step2', delay: 2000 },
    { key: 'step3', delay: 1500 },
    { key: 'step4', delay: 1000 },
  ];
  for (const s of steps) {
    onStep(s.key);
    await new Promise(r => setTimeout(r, s.delay));
  }
  // 90% success rate simulation
  return Math.random() > 0.1
    ? { success: true,  ref: 'PAY' + Date.now().toString().slice(-10) }
    : { success: false, ref: null };
}

export default function Checkout() {
  const { darkMode, t, cart, cartTotal, clearCart, user, addOrder } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);          // 1=delivery 2=payment 3=processing 4=done
  const [pay, setPay] = useState('momo');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [payStep, setPayStep] = useState('');   // which USSD step we're on
  const [payResult, setPayResult] = useState(null); // {success, ref}
  const [orderData, setOrderData] = useState(null);
  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName:  user?.name?.split(' ')[1] || '',
    email:     user?.email  || '',
    phone:     user?.phone  || '',
    address:   '',
    city:      'Kigali',
    notes:     '',
  });

  const dm = darkMode;
  const delivery = cartTotal >= 50000 ? 0 : 2000;
  const total = cartTotal + delivery;
  const card = dm ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm';
  const inp  = 'w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ' +
               (dm ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-900');

  const STEP_LABELS = {
    step1: t.paymentStep1 + ' +250' + phone.replace(/\s/g,'').slice(-9) + '...',
    step2: t.paymentStep2,
    step3: t.paymentStep3,
    step4: t.paymentStep4,
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }

    setBusy(true);
    const orderId = 'SMB-' + Date.now().toString().slice(-8);

    if (pay === 'momo' || pay === 'airtel') {
      setStep(3);
      const result = await simulateMobilePayment(phone, total, pay, setPayStep);
      setPayResult(result);

      const newOrder = {
        id: orderId,
        customer: form.firstName + ' ' + form.lastName,
        product: cart[0]?.name || '',
        items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
        amount: total,
        status: result.success ? 'Processing' : 'Pending',
        paymentStatus: result.success ? 'Paid' : 'Failed',
        paymentRef: result.ref,
        date: new Date().toLocaleDateString(),
        paymentMethod: pay === 'momo' ? 'MTN MoMo' : 'Airtel Money',
        phone: '+250' + phone.replace(/\s/g,''),
        address: form.address + ', ' + form.city,
        email: form.email,
      };
      setOrderData(newOrder);
      if (result.success) { addOrder(newOrder); clearCart(); }
      setStep(4);
    } else {
      // Cash on delivery — instant
      await new Promise(r => setTimeout(r, 800));
      const newOrder = {
        id: orderId,
        customer: form.firstName + ' ' + form.lastName,
        product: cart[0]?.name || '',
        items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
        amount: total,
        status: 'Processing',
        paymentStatus: 'Pending (COD)',
        paymentRef: 'COD-' + orderId,
        date: new Date().toLocaleDateString(),
        paymentMethod: 'Cash on Delivery',
        phone: form.phone,
        address: form.address + ', ' + form.city,
        email: form.email,
      };
      setOrderData(newOrder);
      addOrder(newOrder);
      clearCart();
      setPayResult({ success: true, ref: newOrder.paymentRef });
      setStep(4);
    }
    setBusy(false);
  };

  if (!user) return (
    <div className={'min-h-screen flex items-center justify-center px-4 ' + (dm ? 'bg-zinc-950' : 'bg-zinc-50')}>
      <div className={'w-full max-w-sm rounded-2xl border p-8 text-center ' + (dm ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-sm')}>
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="text-orange-500" size={30} />
        </div>
        <h2 className={'text-xl font-black mb-2 ' + (dm ? 'text-white' : 'text-zinc-900')}>Sign in to Checkout</h2>
        <p className={'text-sm mb-6 leading-relaxed ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>
          You need an account to place an order. Sign in or create a free account to continue.
        </p>
        <Link to="/signin" className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-colors mb-3">
          Sign In
        </Link>
        <Link to="/signup" className={'block w-full py-3 rounded-xl font-semibold text-sm border transition-colors ' + (dm ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50')}>
          Create Account
        </Link>
        <Link to="/cart" className={'block mt-4 text-xs hover:text-orange-500 transition-colors ' + (dm ? 'text-zinc-500' : 'text-zinc-400')}>
          ← Back to Cart
        </Link>
      </div>
    </div>
  );

  if (cart.length === 0 && step < 3) return (
    <div className={'min-h-screen flex items-center justify-center ' + (dm ? 'bg-zinc-950 text-white' : 'bg-slate-50')}>
      <div className="text-center p-8">
        <ShoppingBag className="mx-auto mb-4 text-zinc-300" size={56} />
        <h2 className={'text-xl font-bold mb-4 ' + (dm ? 'text-white' : 'text-slate-800')}>{t.emptyCart}</h2>
        <Link to="/shop" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600">{t.shop}</Link>
      </div>
    </div>
  );

  return (
    <div className={'min-h-screen ' + (dm ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900')}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Step indicator ── */}
        {step < 3 && (
          <div className="mb-8">
            <h1 className={'text-2xl font-black mb-6 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.checkout}</h1>
            <div className="flex items-center gap-2">
              {[
                { n:1, label: t.deliveryInfo },
                { n:2, label: t.paymentMethod },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-2">
                  <div className={'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ' +
                    (step >= s.n ? 'bg-orange-500 text-white' : dm ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-200 text-zinc-500')}>
                    {step > s.n ? <Check size={14} /> : s.n}
                  </div>
                  <span className={'text-sm font-medium ' + (step >= s.n ? 'text-orange-500' : dm ? 'text-zinc-500' : 'text-zinc-400')}>{s.label}</span>
                  {i < 1 && <div className={'w-12 h-0.5 ' + (dm ? 'bg-zinc-800' : 'bg-slate-200')} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Payment processing ── */}
        {step === 3 && (
          <div className={'rounded-2xl border p-10 text-center max-w-md mx-auto ' + card}>
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader className="text-orange-500 animate-spin" size={36} />
            </div>
            <h2 className={'text-xl font-black mb-2 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.paymentPending}</h2>
            <p className={'text-sm mb-6 ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>{t.ussdPrompt}</p>
            <div className={'rounded-xl p-4 text-left space-y-3 ' + (dm ? 'bg-zinc-800' : 'bg-slate-50')}>
              {['step1','step2','step3','step4'].map((s, i) => {
                const steps = ['step1','step2','step3','step4'];
                const currentIdx = steps.indexOf(payStep);
                const thisIdx = i;
                const done = currentIdx > thisIdx;
                const active = currentIdx === thisIdx;
                return (
                  <div key={s} className="flex items-center gap-3">
                    <div className={'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ' +
                      (done ? 'bg-emerald-500 text-white' : active ? 'bg-orange-500 text-white' : dm ? 'bg-zinc-700 text-zinc-500' : 'bg-slate-200 text-zinc-400')}>
                      {done ? <Check size={12} /> : active ? <Loader size={12} className="animate-spin" /> : i+1}
                    </div>
                    <span className={'text-xs ' + (done ? 'text-emerald-500 font-medium' : active ? (dm?'text-white':'text-slate-800') + ' font-medium' : dm ? 'text-zinc-500' : 'text-zinc-400')}>
                      {STEP_LABELS[s]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 4: Order confirmation ── */}
        {step === 4 && orderData && (
          <div className="max-w-2xl mx-auto space-y-5">
            {/* Result banner */}
            <div className={'rounded-2xl border p-8 text-center ' + card}>
              {payResult?.success ? (
                <>
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-emerald-500" size={40} />
                  </div>
                  <h2 className={'text-2xl font-black mb-1 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.thankYou}</h2>
                  <p className={'text-sm mb-1 ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>{t.orderSuccess}</p>
                  <p className={'text-sm ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>{t.deliveryTime}</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="text-red-500" size={40} />
                  </div>
                  <h2 className={'text-2xl font-black mb-1 text-red-500'}>{t.paymentFailed}</h2>
                  <p className={'text-sm mb-4 ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>Your order was not placed. Please try again.</p>
                  <button onClick={() => { setStep(2); setPayResult(null); setBusy(false); }}
                    className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600">
                    Try Again
                  </button>
                </>
              )}
            </div>

            {payResult?.success && (
              <>
                {/* Order details card */}
                <div className={'rounded-2xl border p-6 ' + card}>
                  <h3 className={'font-bold text-lg mb-4 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.orderConfirmed}</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {[
                      { label: t.orderRef,      value: orderData.id,            highlight: true },
                      { label: t.paymentRef,     value: orderData.paymentRef,    highlight: false },
                      { label: t.paymentStatus,  value: orderData.paymentStatus, highlight: false },
                      { label: t.orderStatus,    value: orderData.status,        highlight: false },
                      { label: t.paymentMethod,  value: orderData.paymentMethod, highlight: false },
                      { label: t.orderDate,      value: orderData.date,          highlight: false },
                    ].map((row, i) => (
                      <div key={i} className={'p-3 rounded-xl ' + (dm ? 'bg-zinc-800' : 'bg-slate-50')}>
                        <p className={'text-xs font-semibold mb-0.5 ' + (dm ? 'text-zinc-500' : 'text-zinc-400')}>{row.label}</p>
                        <p className={'text-sm font-bold ' + (row.highlight ? 'text-orange-500' : dm ? 'text-zinc-200' : 'text-slate-800')}>{row.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Items ordered */}
                  <h4 className={'font-semibold text-sm mb-3 ' + (dm ? 'text-zinc-300' : 'text-slate-700')}>{t.orderItems}</h4>
                  <div className={'rounded-xl overflow-hidden border ' + (dm ? 'border-zinc-700' : 'border-slate-100')}>
                    {orderData.items.map((item, i) => (
                      <div key={i} className={'flex justify-between items-center px-4 py-3 text-sm ' +
                        (i > 0 ? 'border-t ' + (dm ? 'border-zinc-700' : 'border-slate-100') : '') +
                        (dm ? ' bg-zinc-800/50' : ' bg-white')}>
                        <span className={dm ? 'text-zinc-300' : 'text-slate-700'}>{item.name} <span className="text-zinc-400">x{item.qty}</span></span>
                        <span className={'font-semibold ' + (dm ? 'text-zinc-200' : 'text-slate-800')}>{(item.price * item.qty).toLocaleString()} RWF</span>
                      </div>
                    ))}
                    <div className={'flex justify-between items-center px-4 py-3 border-t font-black ' +
                      (dm ? 'border-zinc-700 bg-zinc-800' : 'border-slate-100 bg-slate-50')}>
                      <span className={dm ? 'text-white' : 'text-slate-900'}>{t.total}</span>
                      <span className="text-orange-500">{orderData.amount.toLocaleString()} RWF</span>
                    </div>
                  </div>
                </div>

                {/* Delivery info */}
                <div className={'rounded-2xl border p-6 ' + card}>
                  <h3 className={'font-bold text-base mb-3 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.deliveryInfo}</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className={dm ? 'text-zinc-500' : 'text-zinc-400'}>Name: </span><span className={dm ? 'text-zinc-200' : 'text-slate-800'}>{orderData.customer}</span></div>
                    <div><span className={dm ? 'text-zinc-500' : 'text-zinc-400'}>Phone: </span><span className={dm ? 'text-zinc-200' : 'text-slate-800'}>{orderData.phone}</span></div>
                    <div className="sm:col-span-2"><span className={dm ? 'text-zinc-500' : 'text-zinc-400'}>Address: </span><span className={dm ? 'text-zinc-200' : 'text-slate-800'}>{orderData.address}</span></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Link to="/shop" className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-colors">
                    {t.continueShopping} <ArrowRight size={17} />
                  </Link>
                  <Link to="/" className={'flex-1 flex items-center justify-center py-3 rounded-xl font-semibold border transition-colors ' +
                    (dm ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50')}>
                    {t.backToHome}
                  </Link>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Steps 1 & 2: form ── */}
        {step < 3 && (
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">

                {/* Step 1: Delivery */}
                {step === 1 && (
                  <div className={'rounded-2xl border p-6 ' + card}>
                    <h2 className={'text-lg font-bold mb-5 flex items-center gap-2 ' + (dm ? 'text-white' : 'text-slate-900')}>
                      <Truck size={19} className="text-orange-500" /> {t.deliveryInfo}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[['firstName',t.firstName,'text'],['lastName',t.lastName,'text'],['email',t.email,'email'],['phone',t.phone,'tel']].map(([k,l,tp]) => (
                        <div key={k}>
                          <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{l}</label>
                          <input type={tp} required value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} className={inp} />
                        </div>
                      ))}
                      <div className="sm:col-span-2">
                        <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{t.address}</label>
                        <input type="text" required value={form.address} onChange={e => setForm(f=>({...f,address:e.target.value}))} className={inp} />
                      </div>
                      <div>
                        <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{t.city}</label>
                        <input type="text" value={form.city} onChange={e => setForm(f=>({...f,city:e.target.value}))} className={inp} />
                      </div>
                      <div>
                        <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{t.notes} <span className="text-zinc-400">({t.optional})</span></label>
                        <input type="text" value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))} className={inp} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className={'rounded-2xl border p-6 ' + card}>
                    <h2 className={'text-lg font-bold mb-5 flex items-center gap-2 ' + (dm ? 'text-white' : 'text-slate-900')}>
                      <CreditCard size={19} className="text-orange-500" /> {t.paymentMethod}
                    </h2>
                    <div className="space-y-3 mb-5">
                      {[
                        { id:'momo',   label:t.mobileMoneyMTN, icon:'📱', desc:'Pay with MTN Mobile Money — USSD *182#' },
                        { id:'airtel', label:t.airtelMoney,    icon:'📲', desc:'Pay with Airtel Money — USSD *185#' },
                        { id:'cod',    label:t.cashOnDelivery, icon:'💵', desc:'Pay cash when your order arrives' },
                      ].map(m => (
                        <label key={m.id} className={'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ' +
                          (pay===m.id ? 'border-orange-500 ' + (dm ? 'bg-orange-950/30' : 'bg-orange-50') : dm ? 'border-zinc-700 bg-zinc-800' : 'border-slate-200 bg-slate-50')}>
                          <input type="radio" name="pay" value={m.id} checked={pay===m.id} onChange={() => setPay(m.id)} className="hidden" />
                          <span className="text-2xl">{m.icon}</span>
                          <div className="flex-1">
                            <div className={'font-semibold text-sm ' + (dm ? 'text-slate-100' : 'text-slate-800')}>{m.label}</div>
                            <div className={'text-xs mt-0.5 ' + (dm ? 'text-zinc-500' : 'text-zinc-500')}>{m.desc}</div>
                          </div>
                          {pay===m.id && <Check size={17} className="text-orange-500 flex-shrink-0" />}
                        </label>
                      ))}
                    </div>

                    {(pay==='momo'||pay==='airtel') && (
                      <div className={'p-5 rounded-xl border ' + (dm ? 'bg-zinc-800 border-zinc-700' : 'bg-orange-50 border-orange-100')}>
                        <p className={'text-xs font-bold uppercase tracking-wide mb-3 ' + (dm ? 'text-orange-400' : 'text-orange-600')}>
                          {pay==='momo' ? '📱 MTN Mobile Money' : '📲 Airtel Money'} — {t.enterUssd}
                        </p>
                        <label className={'block text-xs font-semibold mb-2 ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>
                          <Phone size={13} className="inline mr-1" />
                          {pay==='momo' ? t.enterPhone : t.enterAirtel}
                        </label>
                        <div className="flex">
                          <span className={'px-3 py-2.5 rounded-l-xl border text-sm font-semibold ' +
                            (dm ? 'bg-zinc-700 border-slate-600 text-zinc-300' : 'bg-white border-slate-200 text-slate-600')}>+250</span>
                          <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                            placeholder={pay==='momo' ? '078 000 0000' : '073 000 0000'}
                            pattern="[0-9 ]{9,12}"
                            className={'flex-1 px-4 py-2.5 rounded-r-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ' +
                              (dm ? 'bg-zinc-800 border-slate-600 text-white' : 'bg-white border-slate-200')} />
                        </div>
                        <p className={'text-xs mt-2.5 leading-relaxed ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>
                          {t.paymentInitiated.replace('...', '')} — you will receive a USSD prompt on <strong>+250{phone.replace(/\s/g,'')}</strong> to confirm <strong>{total.toLocaleString()} RWF</strong>.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Order summary sidebar */}
              <div className={'rounded-2xl border p-6 h-fit sticky top-24 ' + card}>
                <h2 className={'text-base font-bold mb-4 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.orderSummary}</h2>
                <div className="space-y-2 mb-4 max-h-44 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-xs gap-2">
                      <span className={'line-clamp-1 flex-1 ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{item.name} x{item.qty}</span>
                      <span className={'flex-shrink-0 font-medium ' + (dm ? 'text-zinc-300' : 'text-slate-700')}>{(item.price*item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className={'border-t pt-3 space-y-2 ' + (dm ? 'border-zinc-800' : 'border-slate-100')}>
                  <div className="flex justify-between text-sm">
                    <span className={dm?'text-zinc-400':'text-slate-600'}>{t.subtotal}</span>
                    <span className={dm?'text-zinc-200':'text-slate-800'}>{cartTotal.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={dm?'text-zinc-400':'text-slate-600'}>{t.delivery}</span>
                    <span className={delivery===0 ? 'text-emerald-500 font-semibold' : dm?'text-zinc-200':'text-slate-800'}>
                      {delivery===0 ? t.free : delivery.toLocaleString()+' RWF'}
                    </span>
                  </div>
                  <div className={'flex justify-between font-black text-base pt-2 border-t ' + (dm ? 'border-zinc-800' : 'border-slate-100')}>
                    <span className={dm?'text-white':'text-slate-900'}>{t.total}</span>
                    <span className="text-orange-500">{total.toLocaleString()} RWF</span>
                  </div>
                </div>
                <button type="submit" disabled={busy}
                  className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {busy
                    ? <><Loader size={16} className="animate-spin" /> {t.processing}</>
                    : step===1
                      ? <>{t.continueToPayment} <ArrowRight size={16} /></>
                      : <>{t.confirmOrder} <Check size={16} /></>
                  }
                </button>
                {step===2 && (
                  <button type="button" onClick={() => setStep(1)}
                    className={'w-full mt-2 py-2 text-sm hover:text-orange-500 transition-colors ' + (dm?'text-zinc-500':'text-zinc-400')}>
                    {t.backToDelivery}
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
