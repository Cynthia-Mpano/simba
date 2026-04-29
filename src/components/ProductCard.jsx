import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
      <div className="aspect-square skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 skeleton rounded w-2/5" />
        <div className="h-3.5 skeleton rounded w-full" />
        <div className="h-3.5 skeleton rounded w-3/4" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 skeleton rounded w-20" />
          <div className="w-20 h-7 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { darkMode, t, addToCart } = useApp();
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const dm = darkMode;

  const handleAdd = e => {
    e.preventDefault(); e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`}
      className={`group rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${dm ? "bg-slate-800 border border-slate-700 hover:border-orange-500/40 hover:shadow-slate-900" : "bg-white border border-slate-100 hover:border-orange-200 hover:shadow-orange-50/80"}`}>
      <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-700">
        {!imgErr
          ? <img src={product.image} alt={product.name} onError={() => setImgErr(true)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          : <div className="w-full h-full flex items-center justify-center text-4xl">🛒</div>
        }
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t.outOfStock}</span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${dm ? "text-slate-500" : "text-slate-400"}`}>{product.category}</p>
        <h3 className={`text-xs font-semibold line-clamp-2 leading-snug flex-1 mb-2.5 ${dm ? "text-slate-100" : "text-slate-800"}`}>{product.name}</h3>
        <div className="flex items-center justify-between gap-1">
          <div className="leading-none">
            <span className={`font-bold text-sm ${dm ? "text-orange-400" : "text-orange-500"}`}>{product.price.toLocaleString()}</span>
            <span className={`text-[10px] ml-0.5 ${dm ? "text-slate-500" : "text-slate-400"}`}>RWF</span>
          </div>
          <button onClick={handleAdd} disabled={!product.inStock}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${added ? "bg-emerald-500 text-white" : product.inStock ? "bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-200" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
            {added ? <><Check size={11} />{t.addedToCart}</> : <><ShoppingCart size={11} />{t.addToCart}</>}
          </button>
        </div>
      </div>
    </Link>
  );
}
