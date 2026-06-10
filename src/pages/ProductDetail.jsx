import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check, Package, Tag, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import productsData from '../simba_products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const { darkMode, t, addToCart } = useApp();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const dm = darkMode;

  const product = productsData.products.find(p => p.id === parseInt(id));
  const related = productsData.products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0,4);

  if (!product) return (
    <div className={'min-h-screen flex items-center justify-center ' + (dm ? 'bg-zinc-950 text-white' : 'bg-slate-50')}>
      <div className="text-center p-8">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600">{t.backToShop}</Link>
      </div>
    </div>
  );

  const handleAdd = () => {
    for (let i=0; i<qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const card = dm ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm';

  return (
    <div className={'min-h-screen ' + (dm ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/shop" className={'inline-flex items-center gap-2 mb-6 text-sm font-medium hover:text-orange-500 transition-colors ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>
          <ArrowLeft size={16} /> {t.backToShop}
        </Link>

        <div className={'rounded-2xl overflow-hidden border ' + card}>
          <div className="grid md:grid-cols-2">
            <div className={'aspect-square bg-slate-100 ' + (dm ? 'dark:bg-zinc-800' : '')}>
              {!imgErr
                ? <img src={product.image} alt={product.name} onError={() => setImgErr(true)} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-6xl">🛒</div>
              }
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className={'text-xs px-3 py-1 rounded-full font-medium ' + (dm ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-600')}>
                  <Tag size={10} className="inline mr-1" />{product.category}
                </span>
                {product.inStock
                  ? <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">● {t.inStock}</span>
                  : <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 font-medium">● {t.outOfStock}</span>
                }
              </div>
              <h1 className={'text-2xl md:text-3xl font-black mb-3 leading-tight ' + (dm ? 'text-white' : 'text-slate-900')}>{product.name}</h1>
              <div className="mb-6">
                <span className={'text-3xl font-black ' + (dm ? 'text-orange-400' : 'text-orange-500')}>{product.price.toLocaleString()}</span>
                <span className={'text-base ml-1 ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>RWF</span>
              </div>
              <div className={'flex items-center gap-2 mb-5 text-sm ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>
                <Package size={14} /> Unit: {product.unit}
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className={'text-sm font-semibold ' + (dm ? 'text-zinc-300' : 'text-slate-700')}>{t.quantity}:</span>
                <div className={'flex items-center rounded-xl border ' + (dm ? 'border-zinc-700' : 'border-slate-200')}>
                  <button onClick={() => setQty(q => Math.max(1,q-1))} className={'w-9 h-9 flex items-center justify-center hover:text-orange-500 transition-colors ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}><Minus size={14} /></button>
                  <span className={'w-10 text-center font-bold ' + (dm ? 'text-white' : 'text-slate-900')}>{qty}</span>
                  <button onClick={() => setQty(q => q+1)} className={'w-9 h-9 flex items-center justify-center hover:text-orange-500 transition-colors ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}><Plus size={14} /></button>
                </div>
              </div>
              <button onClick={handleAdd} disabled={!product.inStock}
                className={'flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl font-bold text-white transition-all ' + (added ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600 hover:scale-[1.02]') + ' disabled:opacity-40 shadow-md shadow-orange-200'}>
                {added ? <><Check size={18} /> {t.addedToCart}</> : <><ShoppingCart size={18} /> {t.addToCart}</>}
              </button>
              <div className={'mt-5 p-4 rounded-xl text-sm space-y-1.5 ' + (dm ? 'bg-zinc-800' : 'bg-slate-50')}>
                <p className={dm ? 'text-zinc-300' : 'text-slate-600'}>🚚 Free delivery on orders over 50,000 RWF</p>
                <p className={dm ? 'text-zinc-300' : 'text-slate-600'}>💳 Pay with MTN MoMo, Airtel Money or Cash</p>
                <p className={dm ? 'text-zinc-300' : 'text-slate-600'}>🔄 Easy returns within 7 days</p>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className={'text-xl font-black mb-5 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.relatedProducts}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}