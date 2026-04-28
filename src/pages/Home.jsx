import { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Shield, Clock, ShoppingBag, ArrowRight, Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import productsData from "../simba_products.json";

const PAGE_SIZE = 50;

const CAT_IMGS = {
  "Food Products": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
  "Alcoholic Drinks": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80",
  "Baby Products": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80",
  "Cosmetics & Personal Care": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
  "Sports & Wellness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  "Kitchenware & Electronics": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  "General": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80",
};

export default function Home() {
  const { darkMode, t } = useApp();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const all = productsData.products;
  const cats = [...new Set(all.map(p => p.category))];
  const shown = all.slice(0, visible);
  const dm = darkMode;

  return (
    <div className={dm ? "bg-gray-950 min-h-screen" : "bg-gray-50 min-h-screen"}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)",backgroundSize:"40px 40px"}} />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/30">
              <Star size={11} fill="white" /> Rwanda&apos;s #1 Online Supermarket
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">{t.heroTitle}</h1>
            <p className="text-base text-white/85 mb-7 leading-relaxed">{t.heroSub}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-lg hover:scale-105">
                {t.shopNow} <ArrowRight size={17} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 border-2 border-white/60 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
                {t.learnMore}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-950" />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Truck, title: "Free Delivery", desc: "Orders over 50,000 RWF", c: "text-blue-500", bg: dm?"bg-blue-950/40":"bg-blue-50" },
            { icon: Shield, title: "Secure Payment", desc: "MoMo & Airtel Money", c: "text-green-500", bg: dm?"bg-green-950/40":"bg-green-50" },
            { icon: Clock, title: "Fast Service", desc: "Same-day delivery", c: "text-purple-500", bg: dm?"bg-purple-950/40":"bg-purple-50" },
            { icon: ShoppingBag, title: "11 Branches", desc: "Across Kigali", c: "text-orange-500", bg: dm?"bg-orange-950/40":"bg-orange-50" },
          ].map((f,i) => (
            <div key={i} className={`${dm?"bg-gray-900 border-gray-800":"bg-white border-gray-100"} border rounded-2xl p-4 flex items-center gap-3`}>
              <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <f.icon className={f.c} size={19} />
              </div>
              <div>
                <p className={`font-semibold text-sm ${dm?"text-gray-100":"text-gray-800"}`}>{f.title}</p>
                <p className={`text-xs ${dm?"text-gray-500":"text-gray-500"}`}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-xl font-black ${dm?"text-white":"text-gray-900"}`}>{t.shopByCategory}</h2>
          <Link to="/shop" className="text-orange-500 hover:text-orange-600 text-sm font-semibold flex items-center gap-1">{t.viewAll} <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {cats.map(cat => (
            <Link key={cat} to={"/shop?category="+encodeURIComponent(cat)}
              className="group relative overflow-hidden rounded-2xl aspect-square flex items-end p-3 hover:scale-105 transition-transform duration-200">
              <div className="absolute inset-0">
                <img src={CAT_IMGS[cat]||CAT_IMGS["General"]} alt={cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <span className="relative text-white text-[11px] font-bold leading-tight">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className={`text-xl font-black ${dm?"text-white":"text-gray-900"}`}>{t.featuredProducts}</h2>
            <p className={`text-xs mt-0.5 ${dm?"text-gray-500":"text-gray-500"}`}>{t.showing} {shown.length} {t.of} {all.length} {t.products}</p>
          </div>
          <Link to="/shop" className="text-orange-500 hover:text-orange-600 text-sm font-semibold flex items-center gap-1">{t.viewAll} <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {shown.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {visible < all.length && (
          <div className="text-center mt-10">
            <button onClick={() => setVisible(v => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-md shadow-orange-200">
              {t.seeMore} <ArrowRight size={17} />
            </button>
            <p className={`text-xs mt-2 ${dm?"text-gray-600":"text-gray-400"}`}>{all.length - visible} more products</p>
          </div>
        )}
      </section>
    </div>
  );
}
