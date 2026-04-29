
import os

BASE = "src"

files = {}

# ─── NAVBAR ───────────────────────────────────────────────────────────────────
files["components/Navbar.jsx"] = r"""
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, Sun, Moon, Globe, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { darkMode, setDarkMode, language, setLanguage, t, cartCount, user, logout, isAdmin } = useApp();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const langRef = useRef(null);
  const userRef = useRef(null);
  const dm = darkMode;

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const fn = e => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const go = e => { e.preventDefault(); if (q.trim()) { navigate(`/shop?search=${encodeURIComponent(q.trim())}`); setQ(""); setOpen(false); } };
  const links = [["/","Home"],["/shop",t.shop],["/about",t.about],["/contact",t.contact]];
  const isActive = p => p === "/" ? location.pathname === "/" : location.pathname.startsWith(p);
  const langs = [{ code:"en", label:"English", flag:"🇬🇧" },{ code:"fr", label:"Français", flag:"🇫🇷" },{ code:"rw", label:"Kinyarwanda", flag:"🇷🇼" }];

  return (
    <nav className={`sticky top-0 z-50 ${dm ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} border-b backdrop-blur-sm`}>
      {/* Promo */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs py-2 text-center font-medium tracking-wide">
        🦁 {t.freeDelivery} &nbsp;·&nbsp; 11 branches across Rwanda
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm shadow-orange-200">S</div>
          <div className="hidden sm:block leading-none">
            <div className="font-black text-sm tracking-tight text-orange-500">SIMBA</div>
            <div className={`text-[10px] tracking-widest uppercase ${dm ? "text-slate-500" : "text-slate-400"}`}>Supermarket</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 ml-2">
          {links.map(([p,l]) => (
            <Link key={p} to={p} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive(p) ? "bg-orange-50 text-orange-600" : dm ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>{l}</Link>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={go} className="flex-1 max-w-md hidden md:flex mx-3">
          <div className={`relative flex items-center w-full rounded-xl border transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 ${dm ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
            <Search size={14} className={`absolute left-3 ${dm ? "text-slate-500" : "text-slate-400"}`} />
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search}
              className={`w-full pl-9 pr-3 py-2.5 bg-transparent text-sm focus:outline-none ${dm ? "text-white placeholder-slate-500" : "text-slate-900 placeholder-slate-400"}`} />
            {q && <button type="submit" className="mr-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors">Go</button>}
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setDarkMode(!dm)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${dm ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {dm ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="relative" ref={langRef}>
            <button onClick={() => { setLangOpen(!langOpen); setUserOpen(false); }} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${dm ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              <Globe size={16} />
            </button>
            {langOpen && (
              <div className={`absolute right-0 top-11 w-44 rounded-xl shadow-xl border z-50 overflow-hidden ${dm ? "bg-slate-900 border-slate-700" : "bg-white border-slate-100"}`}>
                {langs.map(l => (
                  <button key={l.code} onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${language === l.code ? "bg-orange-50 text-orange-600 font-semibold" : dm ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"}`}>
                    <span>{l.flag}</span>{l.label}
                    {language === l.code && <span className="ml-auto w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/cart" className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${dm ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            <ShoppingCart size={17} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-0.5">{cartCount > 99 ? "99+" : cartCount}</span>}
          </Link>

          {user ? (
            <div className="relative" ref={userRef}>
              <button onClick={() => { setUserOpen(!userOpen); setLangOpen(false); }} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl transition-colors ${dm ? "hover:bg-slate-800" : "hover:bg-slate-100"}`}>
                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">{user.name?.[0]?.toUpperCase()}</div>
                <ChevronDown size={13} className={dm ? "text-slate-500" : "text-slate-400"} />
              </button>
              {userOpen && (
                <div className={`absolute right-0 top-11 w-52 rounded-xl shadow-xl border z-50 overflow-hidden ${dm ? "bg-slate-900 border-slate-700" : "bg-white border-slate-100"}`}>
                  <div className={`px-4 py-3 border-b ${dm ? "border-slate-800" : "border-slate-100"}`}>
                    <p className={`text-sm font-semibold ${dm ? "text-white" : "text-slate-900"}`}>{user.name}</p>
                    <p className={`text-xs mt-0.5 ${dm ? "text-slate-500" : "text-slate-400"}`}>{user.email}</p>
                    <span className={`inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-semibold ${isAdmin ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>{isAdmin ? t.roleAdmin : t.roleUser}</span>
                  </div>
                  {isAdmin && <Link to="/admin" onClick={() => setUserOpen(false)} className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${dm ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"}`}><LayoutDashboard size={14} className="text-purple-500" />{t.adminPanel}</Link>}
                  <button onClick={() => { logout(); setUserOpen(false); }} className={`w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 transition-colors ${dm ? "hover:bg-slate-800" : "hover:bg-red-50"}`}><LogOut size={14} />{t.signOut}</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="hidden sm:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-orange-200">
              <User size={14} />{t.signIn}
            </Link>
          )}

          <button onClick={() => setOpen(!open)} className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center ${dm ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`lg:hidden border-t ${dm ? "border-slate-800 bg-slate-900" : "border-slate-100 bg-white"} px-4 py-4 space-y-1`}>
          <form onSubmit={go} className="flex mb-3">
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search}
              className={`flex-1 pl-4 py-2.5 rounded-l-xl border text-sm focus:outline-none ${dm ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200"}`} />
            <button type="submit" className="bg-orange-500 text-white px-4 rounded-r-xl hover:bg-orange-600"><Search size={15} /></button>
          </form>
          {links.map(([p,l]) => (
            <Link key={p} to={p} className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(p) ? "bg-orange-50 text-orange-600" : dm ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"}`}>{l}</Link>
          ))}
          {isAdmin && <Link to="/admin" className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${dm ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"}`}><LayoutDashboard size={14} className="text-purple-500" />{t.adminPanel}</Link>}
          {!user && <Link to="/signin" className="block bg-orange-500 text-white text-center py-2.5 rounded-xl text-sm font-semibold mt-2">{t.signIn}</Link>}
        </div>
      )}
    </nav>
  );
}
"""

# ─── FOOTER ───────────────────────────────────────────────────────────────────
files["components/Footer.jsx"] = r"""
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();
  const branches = ["Simba Centenary","Simba Gishushu","Simba Kimironko","Simba Kicukiro","Simba Kigali Heights","Simba UTC","Simba Gacuriro","Simba Gikondo","Simba Sonatube","Simba Kisimenti","Simba Rebero"];
  return (
    <footer className="bg-slate-950 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>
            <div><div className="font-black text-white text-sm tracking-tight">SIMBA</div><div className="text-[10px] text-slate-500 tracking-widest uppercase">Supermarket</div></div>
          </div>
          <p className="text-sm leading-relaxed mb-5">Rwanda's largest supermarket chain. Quality products at affordable prices since 2007.</p>
          <div className="flex items-center gap-2 text-xs"><Clock size={13} className="text-orange-400 flex-shrink-0" /><span>Open daily: 8:00 AM – 9:00 PM</span></div>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {[["/",t.home],["/shop",t.shop],["/about",t.about],["/contact",t.contact],["/cart",t.cart]].map(([p,l]) => (
              <li key={p}><Link to={p} className="hover:text-orange-400 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Our Branches</h3>
          <ul className="space-y-1.5 text-xs">
            {branches.map(b => (
              <li key={b} className="flex items-center gap-1.5"><MapPin size={9} className="text-orange-400 flex-shrink-0" />{b}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin size={14} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Union Trade Centre, 1 KN 4 Ave, Kigali, Rwanda</span></li>
            <li className="flex items-center gap-2.5"><Phone size={14} className="text-orange-400" /><span>+250 788 000 000</span></li>
            <li className="flex items-center gap-2.5"><Mail size={14} className="text-orange-400" /><span>info@simbasupermarket.rw</span></li>
          </ul>
          <div className="flex gap-2 mt-5">
            {["f","in","𝕏"].map((s,i) => (
              <a key={i} href="#" className="w-8 h-8 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center text-xs transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-900 py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Simba Supermarket Ltd. All rights reserved. | Kigali, Rwanda
      </div>
    </footer>
  );
}
"""

# ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
files["components/ProductCard.jsx"] = r"""
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
"""

for path, content in files.items():
    full = os.path.join("simba-supermarket", BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8").write(content.lstrip("\n"))
    print(f"wrote {full}")
