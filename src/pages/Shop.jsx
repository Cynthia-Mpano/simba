import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import productsData from '../simba_products.json';

const PAGE = 24;

export default function Shop() {
  const { darkMode, t } = useApp();
  const [sp, setSp] = useSearchParams();
  const [search, setSearch] = useState(sp.get('search') || '');
  const [cat, setCat] = useState(sp.get('category') || '');
  const [sort, setSort] = useState('');
  const [minP, setMinP] = useState('');
  const [maxP, setMaxP] = useState('');
  const [showF, setShowF] = useState(false);
  const [visible, setVisible] = useState(PAGE);
  const [loading, setLoading] = useState(false);
  const dm = darkMode;
  const branch = sp.get('branch') || '';

  const cats = useMemo(() => [...new Set(productsData.products.map(p => p.category))], []);

  useEffect(() => { setSearch(sp.get('search')||''); setCat(sp.get('category')||''); setVisible(PAGE); }, [sp]);

  const filtered = useMemo(() => {
    let list = productsData.products;
    // Branch filter — simulate branch-specific inventory by subcategoryId ranges
    if (branch) {
      const branchSeeds = { "Centenary":0,"Gishushu":1,"Kimironko":2,"Kicukiro":3,"Kigali Heights":4,"UTC":5,"Gacuriro":6,"Gikondo":7,"Sonatube":8,"Kisimenti":9,"Rebero":10 };
      const seed = branchSeeds[branch] ?? 0;
      // Each branch "stocks" ~70% of all products, offset by seed for variety
      list = list.filter((_, i) => (i + seed) % 10 !== 0);
    }
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (cat) list = list.filter(p => p.category === cat);
    if (minP) list = list.filter(p => p.price >= Number(minP));
    if (maxP) list = list.filter(p => p.price <= Number(maxP));
    if (sort === 'priceLow') list = [...list].sort((a,b) => a.price-b.price);
    else if (sort === 'priceHigh') list = [...list].sort((a,b) => b.price-a.price);
    else if (sort === 'name') list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [search, cat, sort, minP, maxP]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const hasF = search || cat || sort || minP || maxP;

  const doSearch = e => { e.preventDefault(); const p = {}; if (search) p.search=search; if (cat) p.category=cat; setSp(p); setVisible(PAGE); };
  const clear = () => { setSearch(''); setCat(''); setSort(''); setMinP(''); setMaxP(''); setSp({}); setVisible(PAGE); };
  const loadMore = () => { setLoading(true); setTimeout(() => { setVisible(v => v+PAGE); setLoading(false); }, 300); };

  const card = dm ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm';
  const inp = 'px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ' + (dm ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-900');

  return (
    <div className={dm ? 'min-h-screen bg-zinc-950' : 'min-h-screen bg-slate-50'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="mb-6">
          <h1 className={'text-2xl font-black ' + (dm ? 'text-white' : 'text-zinc-900')}>{t.shop}</h1>
          <p className={'text-sm mt-1 ' + (dm ? 'text-zinc-500' : 'text-zinc-500')}>
            {filtered.length} {t.products}{cat ? ' in ' + cat : ''}{branch ? ' · ' + branch + ' Branch' : ''}
          </p>
          {branch && (
            <div className="mt-3 inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm px-4 py-2.5 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Showing products at <strong className="ml-1">Simba {branch}</strong>
              <button onClick={() => { const p = {}; if (search) p.search = search; if (cat) p.category = cat; setSp(p); }}
                className="ml-2 text-orange-500 hover:text-orange-700 font-bold">&#x2715;</button>
            </div>
          )}
        </div>

        {/* Filter bar */}
        <div className={'rounded-2xl border p-4 mb-5 ' + card}>
          <div className="flex flex-wrap gap-2 items-center">
            <form onSubmit={doSearch} className="flex flex-1 min-w-48">
              <div className={'relative flex items-center flex-1 rounded-xl border focus-within:border-orange-400 transition-colors ' + (dm ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-50 border-slate-200')}>
                <Search size={14} className={'absolute left-3 ' + (dm ? 'text-zinc-500' : 'text-zinc-400')} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}
                  className={'w-full pl-9 pr-3 py-2.5 bg-transparent text-sm focus:outline-none ' + (dm ? 'text-white placeholder-zinc-500' : 'text-slate-900 placeholder-zinc-400')} />
              </div>
              <button type="submit" className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">{t.filter}</button>
            </form>
            <select value={sort} onChange={e => setSort(e.target.value)} className={inp}>
              <option value="">{t.sortBy}</option>
              <option value="priceLow">{t.priceLow}</option>
              <option value="priceHigh">{t.priceHigh}</option>
              <option value="name">{t.name}</option>
            </select>
            <button onClick={() => setShowF(!showF)} className={'flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ' + (showF ? 'bg-orange-500 text-white border-orange-500' : dm ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100')}>
              <SlidersHorizontal size={14} /> Filters {hasF && <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />}
            </button>
            {hasF && <button onClick={clear} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium"><X size={13} /> {t.clearFilters}</button>}
          </div>
          {showF && (
            <div className={'mt-4 pt-4 border-t ' + (dm ? 'border-zinc-800' : 'border-slate-100')}>
              <p className={'text-xs font-semibold uppercase tracking-wide mb-2 ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>{t.priceRange}</p>
              <div className="flex gap-2 max-w-xs">
                <input type="number" placeholder={t.minPrice} value={minP} onChange={e => setMinP(e.target.value)} className={inp + ' flex-1'} />
                <input type="number" placeholder={t.maxPrice} value={maxP} onChange={e => setMaxP(e.target.value)} className={inp + ' flex-1'} />
              </div>
            </div>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => { setCat(''); setSp(search ? {search} : {}); setVisible(PAGE); }}
            className={'px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ' + (!cat ? 'bg-orange-500 text-white shadow-sm' : dm ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200')}>
            {t.allCategories}
          </button>
          {cats.map(c => (
            <button key={c} onClick={() => { setCat(c); setSp({category:c}); setVisible(PAGE); }}
              className={'px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ' + (cat===c ? 'bg-orange-500 text-white shadow-sm' : dm ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200')}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={'text-center py-24 rounded-2xl border ' + card}>
            <div className="text-5xl mb-4">🔍</div>
            <h3 className={'text-lg font-bold mb-2 ' + (dm ? 'text-white' : 'text-slate-800')}>{t.noProducts}</h3>
            <p className={'mb-5 text-sm ' + (dm ? 'text-zinc-500' : 'text-zinc-500')}>{t.tryDifferent}</p>
            <button onClick={clear} className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600">{t.clearFilters}</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {shown.map(p => <ProductCard key={p.id} product={p} />)}
              {loading && Array.from({length:6}).map((_,i) => <ProductCardSkeleton key={i} />)}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button onClick={loadMore} disabled={loading}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-md disabled:opacity-60">
                  {loading ? <span className="animate-spin">⏳</span> : null}
                  {t.seeMore} ({filtered.length-visible} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}