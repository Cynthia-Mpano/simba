code = """
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
      <div className="skeleton" style={{minHeight:"200px",height:"200px"}} />
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 skeleton rounded w-2/5" />
        <div className="h-4 skeleton rounded w-full" />
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 skeleton rounded w-24" />
          <div className="h-9 skeleton rounded-xl w-28" />
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
      className={`group rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl
        ${dm
          ? "bg-zinc-800 border border-zinc-700/50 hover:border-orange-500/50 hover:shadow-zinc-900"
          : "bg-white border border-zinc-100 hover:border-orange-200 hover:shadow-orange-50"}`}>

      {/* Image */}
      <div className={"relative overflow-hidden " + (dm ? "bg-zinc-700" : "bg-zinc-50")}
        style={{minHeight:"200px",height:"200px"}}>
        {!imgErr
          ? <img src={product.image} alt={product.name}
              onError={() => setImgErr(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              style={{margin:0}} />
          : <div className="w-full h-full flex items-center justify-center text-5xl">🛒</div>
        }
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">{t.outOfStock}</span>
          </div>
        )}
        {/* Light mode: very subtle image border overlay */}
        <div className={"absolute inset-0 rounded-none pointer-events-none border " + (dm ? "border-transparent" : "border-zinc-100/80")} />
      </div>

      {/* Info — 12px padding on all sides */}
      <div className="p-3 flex flex-col flex-1" style={{padding:"12px"}}>
        <p className={"text-[11px] font-semibold uppercase tracking-wider mb-1.5 " + (dm ? "text-zinc-500" : "text-zinc-400")}>
          {product.category}
        </p>
        <h3 className={"text-sm font-semibold line-clamp-2 leading-snug flex-1 mb-3 " + (dm ? "text-zinc-100" : "text-zinc-800")}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <div className="leading-none">
            <span className={"font-black text-base " + (dm ? "text-orange-400" : "text-orange-500")}>
              {product.price.toLocaleString()}
            </span>
            <span className={"text-xs ml-1 " + (dm ? "text-zinc-500" : "text-zinc-400")}>RWF</span>
          </div>
          {/* CTA: padding 12px 24px equivalent, bold, accent color */}
          <button onClick={handleAdd} disabled={!product.inStock}
            className={"flex items-center gap-1.5 rounded-xl text-xs font-bold transition-all "
              + (added
                ? "bg-emerald-500 text-white px-3 py-2.5"
                : product.inStock
                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-200/50 px-3 py-2.5 hover:scale-105"
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed px-3 py-2.5")}>
            {added
              ? <><Check size={12} /><span>{t.addedToCart}</span></>
              : <><ShoppingCart size={12} /><span>{t.addToCart}</span></>}
          </button>
        </div>
      </div>
    </Link>
  );
}
""".lstrip("\\n")

open("simba-supermarket/src/components/ProductCard.jsx","w",encoding="utf-8").write(code)
print("ProductCard done:", len(code.splitlines()), "lines")
