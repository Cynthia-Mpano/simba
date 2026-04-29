import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Phone, CreditCard, Truck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Checkout() {
  const { darkMode, t, cart, cartTotal, clearCart, user, addOrder } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [pay, setPay] = useState('momo');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState('');
  const [form, setForm] = useState({ firstName:user?.name?.split(' ')[0]||'', lastName:user?.name?.split(' ')[1]||'', email:user?.email||'', phone:user?.phone||'', address:'', city:'Kigali', notes:'' });
  const dm = darkMode;
  const delivery = cartTotal >= 50000 ? 0 : 2000;
  const total = cartTotal + delivery;
  const card = dm ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm';
  const inp = 'w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ' + (dm ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900');

  const submit = async e => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setBusy(true);
    await new Promise(r => setTimeout(r, 1800));
    const r = 'SMB-' + Date.now().toString().slice(-8);
    setRef(r);
    addOrder && addOrder({ id:r, customer:form.firstName+' '+form.lastName, product:cart[0]?.name||'', amount:total, status:'Processing', date:new Date().toLocaleDateString(), paymentMethod: pay==='momo'?'MTN MoMo':pay==='airtel'?'Airtel Money':'Cash' });
    clearCart();
    setBusy(false);
    setStep(3);
  };

  if (cart.length === 0 && step !== 3) return (
    <div className={'min-h-screen flex items-center justify-center ' + (dm ? 'bg-slate-950 text-white' : 'bg-slate-50')}>
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-bold mb-4">{t.emptyCart}</h2>
        <Link to="/shop" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600">{t.shop}</Link>
      </div>
    </div>
  );

  return (
    <div className={'min-h-screen ' + (dm ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900')}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className={'text-2xl font-black mb-8 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.checkout}</h1>

        {step < 3 && (
          <div className="flex items-center gap-3 mb-8">
            {[1,2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ' + (step>=s ? 'bg-orange-500 text-white' : dm ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-500')}>{s}</div>
                <span className={'text-sm font-medium ' + (step>=s ? 'text-orange-500' : dm ? 'text-slate-500' : 'text-slate-400')}>{s===1 ? t.deliveryInfo : t.paymentMethod}</span>
                {s < 2 && <div className={'w-16 h-0.5 ' + (dm ? 'bg-slate-800' : 'bg-slate-200')} />}
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className={'text-center py-16 rounded-2xl border ' + card}>
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="text-emerald-500" size={40} /></div>
            <h2 className={'text-2xl font-black mb-2 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.thankYou}</h2>
            <p className={'mb-1 ' + (dm ? 'text-slate-400' : 'text-slate-600')}>{t.orderRef} <strong className="text-orange-500">{ref}</strong></p>
            <p className={'text-sm mb-8 ' + (dm ? 'text-slate-500' : 'text-slate-500')}>{t.deliveryTime}</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">{t.continueShopping} <ArrowRight size={17} /></Link>
          </div>
        )}

        {step < 3 && (
          <form onSubmit={submit}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {step === 1 && (
                  <div className={'rounded-2xl border p-6 ' + card}>
                    <h2 className={'text-lg font-bold mb-5 flex items-center gap-2 ' + (dm ? 'text-white' : 'text-slate-900')}><Truck size={19} className="text-orange-500" /> {t.deliveryInfo}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[['firstName',t.firstName],['lastName',t.lastName],['email',t.email],['phone',t.phone]].map(([k,l]) => (
                        <div key={k}>
                          <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-slate-400' : 'text-slate-600')}>{l}</label>
                          <input type={k==='email'?'email':'text'} required value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} className={inp} />
                        </div>
                      ))}
                      <div className="sm:col-span-2">
                        <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-slate-400' : 'text-slate-600')}>{t.address}</label>
                        <input type="text" required value={form.address} onChange={e => setForm(f=>({...f,address:e.target.value}))} className={inp} />
                      </div>
                      <div>
                        <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-slate-400' : 'text-slate-600')}>{t.city}</label>
                        <input type="text" value={form.city} onChange={e => setForm(f=>({...f,city:e.target.value}))} className={inp} />
                      </div>
                      <div>
                        <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-slate-400' : 'text-slate-600')}>{t.notes} <span className="text-slate-400">({t.optional})</span></label>
                        <input type="text" value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))} className={inp} />
                      </div>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className={'rounded-2xl border p-6 ' + card}>
                    <h2 className={'text-lg font-bold mb-5 flex items-center gap-2 ' + (dm ? 'text-white' : 'text-slate-900')}><CreditCard size={19} className="text-orange-500" /> {t.paymentMethod}</h2>
                    <div className="space-y-3 mb-5">
                      {[
                        {id:'momo',label:t.mobileMoneyMTN,icon:'📱',desc:'Pay with MTN Mobile Money'},
                        {id:'airtel',label:t.airtelMoney,icon:'📲',desc:'Pay with Airtel Money'},
                        {id:'cod',label:t.cashOnDelivery,icon:'💵',desc:'Pay when your order arrives'},
                      ].map(m => (
                        <label key={m.id} className={'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ' + (pay===m.id ? 'border-orange-500 bg-orange-50' : dm ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50')}>
                          <input type="radio" name="pay" value={m.id} checked={pay===m.id} onChange={() => setPay(m.id)} className="hidden" />
                          <span className="text-2xl">{m.icon}</span>
                          <div className="flex-1">
                            <div className={'font-semibold text-sm ' + (dm ? 'text-slate-100' : 'text-slate-800')}>{m.label}</div>
                            <div className={'text-xs ' + (dm ? 'text-slate-500' : 'text-slate-500')}>{m.desc}</div>
                          </div>
                          {pay===m.id && <Check size={17} className="text-orange-500" />}
                        </label>
                      ))}
                    </div>
                    {(pay==='momo'||pay==='airtel') && (
                      <div className={'p-4 rounded-xl ' + (dm ? 'bg-slate-800' : 'bg-orange-50')}>
                        <label className={'block text-xs font-semibold mb-2 ' + (dm ? 'text-slate-400' : 'text-slate-600')}><Phone size={13} className="inline mr-1" />{pay==='momo'?t.enterPhone:t.enterAirtel}</label>
                        <div className="flex">
                          <span className={'px-3 py-2.5 rounded-l-xl border text-sm font-medium ' + (dm ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600')}>+250</span>
                          <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder={pay==='momo'?'078 000 0000':'073 000 0000'} pattern="[0-9]{9,10}"
                            className={'flex-1 px-4 py-2.5 rounded-r-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ' + (dm ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-slate-200')} />
                        </div>
                        <p className={'text-xs mt-2 ' + (dm ? 'text-slate-500' : 'text-slate-500')}>You will receive a USSD prompt to confirm {total.toLocaleString()} RWF</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className={'rounded-2xl border p-6 h-fit sticky top-24 ' + card}>
                <h2 className={'text-base font-bold mb-4 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.orderSummary}</h2>
                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className={'line-clamp-1 flex-1 mr-2 ' + (dm ? 'text-slate-400' : 'text-slate-600')}>{item.name} x{item.qty}</span>
                      <span className={'flex-shrink-0 ' + (dm ? 'text-slate-300' : 'text-slate-700')}>{(item.price*item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className={'border-t pt-3 space-y-2 ' + (dm ? 'border-slate-800' : 'border-slate-100')}>
                  <div className="flex justify-between text-sm"><span className={dm?'text-slate-400':'text-slate-600'}>{t.subtotal}</span><span>{cartTotal.toLocaleString()} RWF</span></div>
                  <div className="flex justify-between text-sm"><span className={dm?'text-slate-400':'text-slate-600'}>{t.delivery}</span><span className={delivery===0?'text-emerald-500 font-semibold':''}>{delivery===0?t.free:delivery.toLocaleString()+' RWF'}</span></div>
                  <div className={'flex justify-between font-black text-base pt-2 border-t ' + (dm ? 'border-slate-800' : 'border-slate-100')}>
                    <span>{t.total}</span><span className="text-orange-500">{total.toLocaleString()} RWF</span>
                  </div>
                </div>
                <button type="submit" disabled={busy}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-70 flex items-center justify-center gap-2">
                  {busy ? <><span className="animate-spin">⏳</span> {t.processing}</> : step===1 ? <>{t.continueToPayment} <ArrowRight size={16} /></> : t.confirmOrder}
                </button>
                {step===2 && <button type="button" onClick={() => setStep(1)} className={'w-full mt-2 py-2 text-sm hover:text-orange-500 transition-colors ' + (dm?'text-slate-500':'text-slate-400')}>{t.backToDelivery}</button>}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}