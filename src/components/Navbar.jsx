import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Sun, Moon, Globe, User, LogOut, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { darkMode, setDarkMode, language, setLanguage, t, cartCount, user, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
    }
  };

  const langs = [{ code: 'en', label: 'English' }, { code: 'fr', label: 'Français' }, { code: 'rw', label: 'Kinyarwanda' }];

  return (
    <nav className={`sticky top-0 z-50 shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Top bar */}
      <div className={`text-xs py-1 px-4 text-center ${darkMode ? 'bg-orange-700' : 'bg-orange-500'} text-white`}>
        🦁 Rwanda's #1 Online Supermarket — Free delivery on orders over 50,000 RWF
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">S</div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg leading-tight text-orange-500">SIMBA</div>
            <div className={`text-xs leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Supermarket</div>
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className={`w-full pl-4 pr-12 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500">
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Dark mode */}
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language */}
          <div className="relative">
            <button onClick={() => { setLangOpen(!langOpen); setUserOpen(false); }} className={`p-2 rounded-full flex items-center gap-1 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Globe size={18} />
              <span className="hidden sm:inline uppercase text-xs font-semibold">{language}</span>
            </button>
            {langOpen && (
              <div className={`absolute right-0 mt-1 w-40 rounded-lg shadow-lg border z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                {langs.map(l => (
                  <button key={l.code} onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 ${language === l.code ? 'text-orange-500 font-semibold' : ''} ${darkMode ? 'hover:bg-gray-700' : ''}`}>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={22} className={darkMode ? 'text-white' : 'text-gray-700'} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="relative">
              <button onClick={() => { setUserOpen(!userOpen); setLangOpen(false); }} className={`flex items-center gap-1 p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <ChevronDown size={14} />
              </button>
              {userOpen && (
                <div className={`absolute right-0 mt-1 w-44 rounded-lg shadow-lg border z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className={`px-4 py-2 text-sm font-semibold border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>{user.name}</div>
                  <button onClick={() => { logout(); setUserOpen(false); }} className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-red-500 hover:bg-red-50 ${darkMode ? 'hover:bg-gray-700' : ''}`}>
                    <LogOut size={14} /> {t.signOut}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="hidden sm:flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors">
              <User size={15} /> {t.signIn}
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Nav links */}
      <div className={`hidden md:flex border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 flex gap-6 py-2">
          {[['/', t.home], ['/shop', t.shop], ['/about', t.about], ['/contact', t.contact]].map(([path, label]) => (
            <Link key={path} to={path} className={`text-sm font-medium hover:text-orange-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden border-t px-4 py-4 space-y-3 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}>
          <form onSubmit={handleSearch} className="flex">
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={t.search}
              className={`flex-1 pl-4 pr-4 py-2 rounded-l-full border text-sm focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
            <button type="submit" className="bg-orange-500 text-white px-4 rounded-r-full"><Search size={16} /></button>
          </form>
          {[['/', t.home], ['/shop', t.shop], ['/about', t.about], ['/contact', t.contact]].map(([path, label]) => (
            <Link key={path} to={path} onClick={() => setMenuOpen(false)} className={`block py-2 text-sm font-medium hover:text-orange-500 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</Link>
          ))}
          {!user && <Link to="/signin" onClick={() => setMenuOpen(false)} className="block bg-orange-500 text-white text-center py-2 rounded-full text-sm font-medium">{t.signIn}</Link>}
        </div>
      )}
    </nav>
  );
}
