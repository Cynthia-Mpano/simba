import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import productsData from '../simba_products.json';

export default function Home() {
  const { darkMode, t } = useApp();
  const products = productsData.products.slice(0, 8);
  const categories = [...new Set(productsData.products.map(p => p.category))];

  return (
    <div className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      {/* Hero */}
      <div className={`relative ${darkMode ? 'bg-gradient-to-r from-orange-900 to-orange-700' : 'bg-gradient-to-r from-orange-500 to-orange-400'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.heroTitle}</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">{t.heroSub}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                {t.shopNow} <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                {t.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Truck, title: 'Free Delivery', desc: 'On orders over 50,000 RWF' },
          { icon: Shield, title: 'Secure Payment', desc: 'MTN MoMo & Cash on Delivery' },
          { icon: Clock, title: 'Fast Service', desc: 'Same-day delivery available' },
          { icon: ShoppingBag, title: '11 Branches', desc: 'Across Kigali city' }
        ].map((f, i) => (
          <div key={i} className={`p-6 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <f.icon className="text-orange-500" size={24} />
            </div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t.shopByCategory}</h2>
          <Link to="/shop" className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
            {t.viewAll} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map(cat => (
            <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`}
              className={`p-6 rounded-xl text-center hover:shadow-lg transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'}`}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="text-orange-500" size={28} />
              </div>
              <h3 className="font-medium text-sm">{cat}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t.featuredProducts}</h2>
          <Link to="/shop" className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
            {t.viewAll} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(p => (
            <Link key={p.id} to={`/product/${p.id}`}
              className={`rounded-xl overflow-hidden hover:shadow-xl transition-all ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-100'}`}>
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-1 line-clamp-2">{p.name}</h3>
                <p className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-500 font-bold">{p.price.toLocaleString()} RWF</span>
                  {p.inStock && <span className="text-xs text-green-500">● {t.inStock}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
