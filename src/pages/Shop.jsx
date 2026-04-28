import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import productsData from "../simba_products.json";

const PAGE_SIZE = 20;

export default function Shop() {
  const { darkMode, t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const dm = darkMode;

  const categories = useMemo(() => [...new Set(productsData.products.map(p => p.category))], []);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
    setVisible(PAGE_SIZE);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = productsData.products;
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (category) list = list.filter(p => p.category === category);
    if (minPrice) list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    if (sort === "priceLow") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "priceHigh") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, category, sort, minPrice, maxPrice]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const hasFilters = search || category || sort || minPrice || maxPrice;

  const handleSearch = (e) => {
    e.preventDefault();
    const p = {};
    if (search) p.search = search;
    if (category) p.category = category;
    setSearchParams(p);
    setVisible(PAGE_SIZE);
  };

  const clearAll = () => {
    setSearch(""); setCategory(""); setSort(""); setMinPrice(""); setMaxPrice("");
    setSearchParams({});
    setVisible(PAGE_SIZE);
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setVisible(v => v + PAGE_SIZE); setLoading(false); }, 300);
  };

  const card = dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";

  return (
    <div className={`min-h-screen ${dm ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl font-black ${dm ? "text-white" : "text-gray-900"}`}>{t.shop}</h1>
          <p className={`text-sm mt-1 ${dm ? "text-gray-500" : "text-gray-500"}`}>{filtered.length} {t.products}{category ? ` in ${category}` : ""}</p>
        </div>

        {/* Filter bar */}
        <div className={`rounded-2xl border p-4 mb-5 ${card}`}>
          <div className="flex flex-wrap gap-2 items-center">
            <form onSubmit={handleSearch} className="flex flex-1 min-w-48">
              <div className={`relative flex items-center flex-1 rounded-xl border ${dm ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} focus-within:border-orange-400 transition-colors`}>
                <Search size={14} className={`absolute left-3 ${dm ? "text-gray-500" : "text-gray-400"}`} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}
                  className={`w-full pl-9 pr-3 py-2.5 bg-transparent text-sm focus:outline-none ${dm ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"}`} />
              </div>
              <button type="submit" className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">{t.filter}</button>
            </form>

            <select value={sort} onChange={e => setSort(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border text-sm font-medium focus:outline-none ${dm ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-700"}`}>
              <option value="">{t.sortBy}</option>
              <option value="priceLow">{t.priceLow}</option>
              <option value="priceHigh">{t.priceHigh}</option>
              <option value="name">{t.name}</option>
            </select>

            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${showFilters ? "bg-orange-500 text-white border-orange-500" : dm ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"}`}>
              <SlidersHorizontal size={14} /> Filters {hasFilters && <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />}
            </button>

            {hasFilters && (
              <button onClick={clearAll} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium">
                <X size={13} /> {t.clearFilters}
              </button>
            )}
          </div>

          {showFilters && (
            <div className={`mt-4 pt-4 border-t ${dm ? "border-gray-800" : "border-gray-100"}`}>
              <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${dm ? "text-gray-400" : "text-gray-500"}`}>{t.priceRange}</p>
              <div className="flex gap-2 max-w-xs">
                <input type="number" placeholder={t.minPrice} value={minPrice} onChange={e => setMinPrice(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${dm ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200"}`} />
                <input type="number" placeholder={t.maxPrice} value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${dm ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200"}`} />
              </div>
            </div>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => { setCategory(""); setSearchParams(search ? { search } : {}); setVisible(PAGE_SIZE); }}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${!category ? "bg-orange-500 text-white shadow-sm" : dm ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
            {t.allCategories}
          </button>
          {categories.map(c => (
            <button key={c} onClick={() => { setCategory(c); setSearchParams({ category: c }); setVisible(PAGE_SIZE); }}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${category === c ? "bg-orange-500 text-white shadow-sm" : dm ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={`text-center py-24 rounded-2xl border ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="text-5xl mb-4">🔍</div>
            <h3 className={`text-lg font-bold mb-2 ${dm ? "text-white" : "text-gray-800"}`}>{t.noProducts}</h3>
            <p className={`mb-5 text-sm ${dm ? "text-gray-500" : "text-gray-500"}`}>{t.tryDifferent}</p>
            <button onClick={clearAll} className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600">{t.clearFilters}</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {shown.map(p => <ProductCard key={p.id} product={p} />)}
              {loading && Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button onClick={loadMore} disabled={loading}
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-md disabled:opacity-60">
                  {loading ? <span className="animate-spin inline-block">⏳</span> : null}
                  {t.seeMore} ({filtered.length - visible} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
