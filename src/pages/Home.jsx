import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Shield, Clock, ShoppingBag, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import productsData from '../simba_products.json';

const PAGE = 50;
const IMGS = {
  'Food Products':'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
  'Alcoholic Drinks':'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
  'Baby Products':'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
  'Cosmetics':'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
  'Sports':'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
  'Kitchenware':'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
  'General':'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
  'Cleaning':'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
  'Kitchen Storage':'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400',
  'Pet Care':'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
};
const getImg = cat => IMGS[Object.keys(IMGS).find(k => cat.includes(k))] || IMGS['General'];

export default function Home() {
  const { darkMode, t } = useApp();
  const [visible, setVisible] = useState(PAGE);
  const all = productsData.products;
  const cats = [...new Set(all.map(p => p.category))];
  const dm = darkMode;
  const card = dm ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm';

  return (
    <div className={dm ? 'bg-slate-950 min-h-screen' : 'bg-slate-50 min-h-screen'}>

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[520px] flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600&q=85" alt="Simba Supermarket" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/65 to-transparent" />
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              <Star size={11} fill="currentColor" /> Rwanda's #1 Online Supermarket
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] mb-4">{t.heroTitle}</h1>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">{t.heroSub}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                {t.shopNow} <ArrowRight size={17} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                {t.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Truck, title: 'Free Delivery', desc: 'Orders over 50,000 RWF', c: 'text-blue-500' },
            { icon: Shield, title: 'Secure Payment', desc: 'MoMo + Airtel Money', c: 'text-emerald-500' },
            { icon: Clock, title: 'Fast Service', desc: 'Same-day delivery', c: 'text-violet-500' },
            { icon: ShoppingBag, title: '11 Branches', desc: 'Across Kigali', c: 'text-orange-500' },
          ].map((f,i) => (
            <div key={i} className={'rounded-2xl border p-4 flex items-center gap-3 ' + card}>
              <div className={'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ' + (dm ? 'bg-slate-800' : 'bg-slate-50')}>
                <f.icon className={f.c} size={19} />
              </div>
              <div>
                <p className={'font-semibold text-sm ' + (dm ? 'text-slate-100' : 'text-slate-800')}>{f.title}</p>
                <p className={'text-xs ' + (dm ? 'text-slate-500' : 'text-slate-500')}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className={'text-xl font-black ' + (dm ? 'text-white' : 'text-slate-900')}>{t.shopByCategory}</h2>
          <Link to="/shop" className="flex items-center gap-1 text-orange-500 text-sm font-semibold hover:text-orange-600">{t.viewAll} <ChevronRight size={15} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10 gap-3">
          {cats.map(cat => (
            <Link key={cat} to={'/shop?category='+encodeURIComponent(cat)}
              className="group relative overflow-hidden rounded-2xl aspect-square flex items-end p-2.5 hover:scale-105 transition-transform duration-200 shadow-sm">
              <div className="absolute inset-0">
                <img src={getImg(cat)} alt={cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <span className="relative text-white text-[10px] font-bold leading-tight line-clamp-2">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className={'text-xl font-black ' + (dm ? 'text-white' : 'text-slate-900')}>{t.featuredProducts}</h2>
            <p className={'text-xs mt-0.5 ' + (dm ? 'text-slate-500' : 'text-slate-500')}>{t.showing} {Math.min(visible,all.length)} {t.of} {all.length} {t.products}</p>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-orange-500 text-sm font-semibold hover:text-orange-600">{t.viewAll} <ChevronRight size={15} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {all.slice(0,visible).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {visible < all.length && (
          <div className="text-center mt-10">
            <button onClick={() => setVisible(v => v+PAGE)}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-orange-200">
              {t.seeMore} <ArrowRight size={17} />
            </button>
            <p className={'text-xs mt-2 ' + (dm ? 'text-slate-600' : 'text-slate-400')}>{all.length-visible} more products</p>
          </div>
        )}
      </section>
    </div>
  );
}