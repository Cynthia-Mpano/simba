import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { darkMode, t, cart, updateQty, removeFromCart, cartTotal } = useApp();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t.yourCart}</h1>

        {cart.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">{t.emptyCart}</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.continueShopping}</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600">
              <ShoppingBag size={18} /> {t.shop}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className={`rounded-xl p-4 flex gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`} className="font-semibold hover:text-orange-500 line-clamp-1">{item.name}</Link>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.category}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className={`flex items-center rounded-full border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:text-orange-500">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:text-orange-500">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-orange-500 font-bold">{(item.price * item.qty).toLocaleString()} RWF</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className={`rounded-xl p-6 h-fit sticky top-24 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-bold mb-4">{t.orderSummary}</h2>
              <div className={`space-y-2 pb-4 mb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex justify-between text-sm">
                  <span>{t.subtotal}</span>
                  <span>{cartTotal.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span className="text-green-500">{cartTotal >= 50000 ? 'FREE' : '2,000 RWF'}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>{t.total}</span>
                <span className="text-orange-500">{(cartTotal >= 50000 ? cartTotal : cartTotal + 2000).toLocaleString()} RWF</span>
              </div>
              <Link to="/checkout" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-full font-semibold transition-colors">
                {t.checkout}
              </Link>
              <Link to="/shop" className={`block text-center mt-3 text-sm hover:text-orange-500 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.continueShopping}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
