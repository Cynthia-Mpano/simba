import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingCart, Search, Filter, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import productsData from '../simba_products.json';

export default function Shop() {
  const { darkMode, t, addToCart, cart } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('');
  const [added, setAdded] = useState({});

  const categories = useMemo(() => ['', ...new Set(productsData.products.map(p => p.category))], []);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = productsData.products;
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category) list = list.filter(p => p.category === category);
    if (sort === 'priceLow') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'priceHigh') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, category, sort]);

  const handleAdd = (e, product) => {
    e.preventDefault();
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    setSearchParams(params);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.shop}</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{filtered.length} products found</p>
        </div>

        {/* Filters */}
        <div className={`p-4 rounded-xl mb-6 flex flex-wrap gap-3 items-center ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
          <form onSubmit={handleSearch} className="flex flex-1 min-w-48">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}
              className={`flex-1 pl-4 pr-4 py-2 rounded-l-full border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'}`} />
            <button type="submit" className="bg-orange-500 text-white px-4 rounded-r-full hover:bg-orange-600">
              <Search size={16} />
            </button>
          </form>

          <select value={category} onChange={e => { setCategory(e.target.value); setSearchParams(e.target.value ? { category: e.target.value } : {}); }}
            className={`px-4 py-2 rounded-full border text-sm focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}>
            <option value="">{t.allCategories}</option>
            {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={sort} onChange={e => setSort(e.target.value)}
            className={`px-4 py-2 rounded-full border text-sm focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}>
            <option value="">{t.sortBy}</option>
            <option value="priceLow">{t.priceLow}</option>
            <option value="priceHigh">{t.priceHigh}</option>
            <option value="name">{t.name}</option>
          </select>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(c => (
            <button key={c} onClick={() => { setCategory(c); setSearchParams(c ? { category: c } : {}); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-orange-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}>
              {c || t.allCategories}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">{t.noProducts}</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{t.tryDifferent}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(p => (
              <Link key={p.id} to={`/product/${p.id}`}
                className={`rounded-xl overflow-hidden hover:shadow-xl transition-all group ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-100'}`}>
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {!p.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold bg-red-500 px-2 py-1 rounded">{t.outOfStock}</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.category}</p>
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 leading-tight">{p.name}</h3>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-orange-500 font-bold text-sm">{p.price.toLocaleString()}<span className="text-xs font-normal"> RWF</span></span>
                    <button onClick={(e) => handleAdd(e, p)} disabled={!p.inStock}
                      className={`p-1.5 rounded-full transition-all ${added[p.id] ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'} disabled:opacity-40`}>
                      {added[p.id] ? <Check size={14} /> : <ShoppingCart size={14} />}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
