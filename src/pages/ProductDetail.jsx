import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check, Package, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import productsData from '../simba_products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const { darkMode, t, addToCart } = useApp();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = productsData.products.find(p => p.id === parseInt(id));
  const related = productsData.products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-semibold mb-4">Product not found</h2>
        <Link to="/shop" className="bg-orange-500 text-white px-6 py-2 rounded-full">{t.backToShop}</Link>
      </div>
    </div>
  );

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/shop" className={`inline-flex items-center gap-2 mb-6 text-sm hover:text-orange-500 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <ArrowLeft size={16} /> {t.backToShop}
        </Link>

        <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="aspect-square bg-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  <Tag size={10} className="inline mr-1" />{product.category}
                </span>
                {product.inStock
                  ? <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">● {t.inStock}</span>
                  : <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700">● {t.outOfStock}</span>
                }
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

              <div className="text-3xl font-bold text-orange-500 mb-6">
                {product.price.toLocaleString()} <span className="text-lg font-normal">RWF</span>
              </div>

              <div className={`flex items-center gap-2 mb-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Package size={14} /> Unit: {product.unit}
              </div>

              {/* Qty */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">{t.quantity}:</span>
                <div className={`flex items-center rounded-full border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-lg hover:text-orange-500">−</button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-9 h-9 flex items-center justify-center text-lg hover:text-orange-500">+</button>
                </div>
              </div>

              <button onClick={handleAdd} disabled={!product.inStock}
                className={`flex items-center justify-center gap-2 py-3 px-8 rounded-full font-semibold text-white transition-all ${added ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-40`}>
                {added ? <><Check size={18} /> {t.addedToCart}</> : <><ShoppingCart size={18} /> {t.addToCart}</>}
              </button>

              <div className={`mt-6 p-4 rounded-xl text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  🚚 Free delivery on orders over 50,000 RWF<br />
                  💳 Pay with MTN MoMo or Cash on Delivery<br />
                  🔄 Easy returns within 7 days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{t.relatedProducts}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`}
                  className={`rounded-xl overflow-hidden hover:shadow-lg transition-all ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-100'}`}>
                  <div className="aspect-square bg-gray-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium line-clamp-2 mb-1">{p.name}</h3>
                    <span className="text-orange-500 font-bold text-sm">{p.price.toLocaleString()} RWF</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
