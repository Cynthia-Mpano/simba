import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Cart() {
  const { darkMode, t, cart, updateQty, removeFromCart, cartTotal } = useApp();
  const dm = darkMode;
  const delivery = cartTotal >= 50000 ? 0 : 2000;
  const total = cartTotal + delivery;
  return (
    <div className={`min-h-screen ${dm?"bg-gray-950 text-white":"bg-gray-50 text-gray-900"}`}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className={`text-2xl font-black mb-8 ${dm?"text-white":"text-gray-900"}`}>{t.yourCart}</h1>
        {cart.length === 0 ? (
          <div className={`text-center py-24 rounded-2xl border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"}`}>
            <div className="text-6xl mb-4">🛒</div>
            <h3 className={`text-xl font-bold mb-2 ${dm?"text-white":"text-gray-800"}`}>{t.emptyCart}</h3>
            <p className={`mb-6 text-sm ${dm?"text-gray-500":"text-gray-500"}`}>{t.continueShopping}</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"><ShoppingBag size={17}/>{t.shop}</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-3">
              {cart.map(item => (
                <div key={item.id} className={`rounded-2xl p-4 flex gap-4 border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100 shadow-sm"}`}>
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className={`font-semibold text-sm hover:text-orange-500 line-clamp-2 ${dm?"text-gray-100":"text-gray-800"}`}>{item.name}</Link>
                    <p className={`text-xs mt-1 ${dm?"text-gray-500":"text-gray-400"}`}>{item.category}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className={`flex items-center rounded-xl border ${dm?"border-gray-700":"border-gray-200"}`}>
                        <button onClick={()=>updateQty(item.id,item.qty-1)} className="w-7 h-7 flex items-center justify-center hover:text-orange-500"><Minus size={12}/></button>
                        <span className={`w-8 text-center text-sm font-bold ${dm?"text-white":"text-gray-800"}`}>{item.qty}</span>
                        <button onClick={()=>updateQty(item.id,item.qty+1)} className="w-7 h-7 flex items-center justify-center hover:text-orange-500"><Plus size={12}/></button>
                      </div>
                      <span className="text-orange-500 font-bold text-sm">{(item.price*item.qty).toLocaleString()} RWF</span>
                    </div>
                  </div>
                  <button onClick={()=>removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
            <div className={`lg:col-span-2 rounded-2xl p-6 h-fit sticky top-24 border ${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100 shadow-sm"}`}>
              <h2 className={`text-lg font-bold mb-5 ${dm?"text-white":"text-gray-900"}`}>{t.orderSummary}</h2>
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {cart.map(item=>(
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className={`line-clamp-1 flex-1 mr-2 ${dm?"text-gray-400":"text-gray-600"}`}>{item.name} x{item.qty}</span>
                    <span className={`flex-shrink-0 font-medium ${dm?"text-gray-300":"text-gray-700"}`}>{(item.price*item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className={`border-t pt-4 space-y-2.5 ${dm?"border-gray-800":"border-gray-100"}`}>
                <div className="flex justify-between text-sm"><span className={dm?"text-gray-400":"text-gray-600"}>{t.subtotal}</span><span className={dm?"text-gray-200":"text-gray-800"}>{cartTotal.toLocaleString()} RWF</span></div>
                <div className="flex justify-between text-sm"><span className={dm?"text-gray-400":"text-gray-600"}>{t.delivery}</span><span className={delivery===0?"text-green-500 font-semibold":dm?"text-gray-200":"text-gray-800"}>{delivery===0?t.free:`${delivery.toLocaleString()} RWF`}</span></div>
                {cartTotal<50000&&<p className="text-xs text-orange-500 bg-orange-50 px-3 py-2 rounded-lg">Add {(50000-cartTotal).toLocaleString()} RWF more for free delivery!</p>}
              </div>
              <div className={`flex justify-between font-black text-lg mt-4 pt-4 border-t ${dm?"border-gray-800 text-white":"border-gray-100 text-gray-900"}`}>
                <span>{t.total}</span><span className="text-orange-500">{total.toLocaleString()} RWF</span>
              </div>
              <Link to="/checkout" className="mt-5 flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold transition-all shadow-md shadow-orange-200">{t.checkout}<ArrowRight size={17}/></Link>
              <Link to="/shop" className={`block text-center mt-3 text-sm hover:text-orange-500 ${dm?"text-gray-500":"text-gray-400"}`}>{t.continueShopping}</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
