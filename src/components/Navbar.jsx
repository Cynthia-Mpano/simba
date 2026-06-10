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
    <nav className={`sticky top-0 z-50 ${dm ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200"} border-b backdrop-blur-sm`}>
      {/* Promo */}
      <div className="bg-orange-500 text-white text-xs py-2 text-center font-medium tracking-wide">
        {t.freeDelivery} &nbsp;·&nbsp; 11 branches · Kigali, Rwanda
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 flex-shrink-0">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
              <rect width="36" height="36" rx="9" fill="#f97316"/>
              <path d="M22.5 10.5H15a2.5 2.5 0 000 5h6a2.5 2.5 0 010 5H13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="hidden sm:block leading-none">
            <div className="font-black text-sm tracking-tight text-orange-500">SIMBA</div>
            <div className={`text-[10px] tracking-widest uppercase ${dm ? "text-zinc-500" : "text-zinc-400"}`}>Supermarket</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 ml-2">
          {links.map(([p,l]) => (
            <Link key={p} to={p} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive(p) ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-50"}`}>{l}</Link>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={go} className="flex-1 max-w-md hidden md:flex mx-3">
          <div className={`relative flex items-center w-full rounded-xl border transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 ${dm ? "bg-zinc-800 border-zinc-700" : "bg-slate-50 border-slate-200"}`}>
            <Search size={14} className={`absolute left-3 ${dm ? "text-zinc-500" : "text-zinc-400"}`} />
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search}
              className={`w-full pl-9 pr-3 py-2.5 bg-transparent text-sm focus:outline-none ${dm ? "text-white placeholder-zinc-500" : "text-slate-900 placeholder-zinc-400"}`} />
            {q && <button type="submit" className="mr-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors">Go</button>}
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setDarkMode(!dm)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${dm ? "bg-zinc-800 text-yellow-400 hover:bg-zinc-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {dm ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div className="relative" ref={langRef}>
            <button onClick={() => { setLangOpen(!langOpen); setUserOpen(false); }} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${dm ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              <Globe size={16} />
            </button>
            {langOpen && (
              <div className={`absolute right-0 top-11 w-44 rounded-xl shadow-xl border z-50 overflow-hidden ${dm ? "bg-zinc-900 border-zinc-700" : "bg-white border-slate-100"}`}>
                {langs.map(l => (
                  <button key={l.code} onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${language === l.code ? "bg-orange-50 text-orange-600 font-semibold" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-slate-700 hover:bg-slate-50"}`}>
                    <span>{l.flag}</span>{l.label}
                    {language === l.code && <span className="ml-auto w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/cart" className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${dm ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            <ShoppingCart size={17} />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-0.5">{cartCount > 99 ? "99+" : cartCount}</span>}
          </Link>

          {user ? (
            <div className="relative" ref={userRef}>
              <button onClick={() => { setUserOpen(!userOpen); setLangOpen(false); }} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl transition-colors ${dm ? "hover:bg-zinc-800" : "hover:bg-slate-100"}`}>
                <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">{user.name?.[0]?.toUpperCase()}</div>
                <ChevronDown size={13} className={dm ? "text-zinc-500" : "text-zinc-400"} />
              </button>
              {userOpen && (
                <div className={`absolute right-0 top-11 w-52 rounded-xl shadow-xl border z-50 overflow-hidden ${dm ? "bg-zinc-900 border-zinc-700" : "bg-white border-slate-100"}`}>
                  <div className={`px-4 py-3 border-b ${dm ? "border-zinc-800" : "border-slate-100"}`}>
                    <p className={`text-sm font-semibold ${dm ? "text-white" : "text-slate-900"}`}>{user.name}</p>
                    <p className={`text-xs mt-0.5 ${dm ? "text-zinc-500" : "text-zinc-400"}`}>{user.email}</p>
                    <span className={`inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-semibold ${isAdmin ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>{isAdmin ? t.roleAdmin : t.roleUser}</span>
                  </div>
                  {isAdmin && <Link to="/admin" onClick={() => setUserOpen(false)} className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${dm ? "text-zinc-300 hover:bg-zinc-800" : "text-slate-700 hover:bg-slate-50"}`}><LayoutDashboard size={14} className="text-purple-500" />{t.adminPanel}</Link>}
                  <button onClick={() => { logout(); setUserOpen(false); }} className={`w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 transition-colors ${dm ? "hover:bg-zinc-800" : "hover:bg-red-50"}`}><LogOut size={14} />{t.signOut}</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="hidden sm:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-orange-200">
              <User size={14} />{t.signIn}
            </Link>
          )}

          <button onClick={() => setOpen(!open)} className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center ${dm ? "bg-zinc-800 text-zinc-300" : "bg-slate-100 text-slate-600"}`}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`lg:hidden border-t ${dm ? "border-zinc-800 bg-zinc-900" : "border-slate-100 bg-white"} px-4 py-4 space-y-1`}>
          <form onSubmit={go} className="flex mb-3">
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search}
              className={`flex-1 pl-4 py-2.5 rounded-l-xl border text-sm focus:outline-none ${dm ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" : "bg-slate-50 border-slate-200"}`} />
            <button type="submit" className="bg-orange-500 text-white px-4 rounded-r-xl hover:bg-orange-600"><Search size={15} /></button>
          </form>
          {links.map(([p,l]) => (
            <Link key={p} to={p} className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(p) ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-slate-700 hover:bg-slate-100"}`}>{l}</Link>
          ))}
          {isAdmin && <Link to="/admin" className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${dm ? "text-zinc-300 hover:bg-zinc-800" : "text-slate-700 hover:bg-slate-100"}`}><LayoutDashboard size={14} className="text-purple-500" />{t.adminPanel}</Link>}
          {!user && <Link to="/signin" className="block bg-orange-500 text-white text-center py-2.5 rounded-xl text-sm font-semibold mt-2">{t.signIn}</Link>}
        </div>
      )}
    </nav>
  );
}
