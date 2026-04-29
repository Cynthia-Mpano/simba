import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Package, TrendingUp, AlertCircle, ArrowLeft, Trash2, Edit3, Check, X, Users, Lock, Eye, EyeOff, LogOut, Bell, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useApp } from "../context/AppContext";
import productsData from "../simba_products.json";
import LiveOrdersTab from "./LiveOrders";

const DASHBOARD_PHOTOS = [
  { img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&q=85", label: "Supermarket Aisle" },
  { img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=85", label: "Fresh Produce" },
  { img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85", label: "Kitchen & Electronics" },
  { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85", label: "Sports & Wellness" },
  { img: "https://images.unsplash.com/photo-1510812431401-41a2bd2722f3?w=1400&q=85", label: "Beverages" },
];

const SALES = [
  { day: "Mon", revenue: 245000, orders: 18 },
  { day: "Tue", revenue: 312000, orders: 24 },
  { day: "Wed", revenue: 198000, orders: 15 },
  { day: "Thu", revenue: 425000, orders: 31 },
  { day: "Fri", revenue: 567000, orders: 42 },
  { day: "Sat", revenue: 689000, orders: 51 },
  { day: "Sun", revenue: 534000, orders: 39 },
];

const MONTHLY = [
  { month: "Jan", revenue: 4200000 }, { month: "Feb", revenue: 3800000 },
  { month: "Mar", revenue: 5100000 }, { month: "Apr", revenue: 4700000 },
  { month: "May", revenue: 6200000 }, { month: "Jun", revenue: 5800000 },
  { month: "Jul", revenue: 7100000 }, { month: "Aug", revenue: 6500000 },
  { month: "Sep", revenue: 5900000 }, { month: "Oct", revenue: 7800000 },
  { month: "Nov", revenue: 8200000 }, { month: "Dec", revenue: 9100000 },
];

const PIE_DATA = [
  { name: "Food Products", value: 35, color: "#f97316" },
  { name: "Alcoholic Drinks", value: 28, color: "#3b82f6" },
  { name: "Cosmetics", value: 18, color: "#8b5cf6" },
  { name: "Baby Products", value: 10, color: "#22c55e" },
  { name: "Other", value: 9, color: "#f59e0b" },
];

const STATUS = {
  Delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Processing: "bg-blue-50 text-blue-700 border border-blue-200",
  Shipped: "bg-violet-50 text-violet-700 border border-violet-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
};

function PasswordSetup({ onSave, dm }) {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setErr("");
    if (pw.length < 6) { setErr("Password must be at least 6 characters."); return; }
    if (pw !== confirm) { setErr("Passwords do not match."); return; }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex(u => u.email === "admin@simba.rw");
    if (idx >= 0) { users[idx].password = pw; } else { users.push({ name: "Admin", email: "admin@simba.rw", phone: "+250788000000", password: pw, role: "admin" }); }
    localStorage.setItem("users", JSON.stringify(users));
    setSaved(true);
    onSave(pw);
    setTimeout(() => setSaved(false), 3000);
  };

  const inp = `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${dm ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-900"}`;

  return (
    <div className={`rounded-2xl border p-6 ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
          <Lock size={18} className="text-orange-500" />
        </div>
        <div>
          <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>Admin Password</h3>
          <p className={`text-xs mt-0.5 ${dm ? "text-gray-500" : "text-gray-500"}`}>Set or update your admin login password</p>
        </div>
      </div>
      {saved && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-2.5 rounded-xl mb-4">
          <Check size={15} /> Password saved successfully!
        </div>
      )}
      {err && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl mb-4">{err}</div>}
      <form onSubmit={handleSave} className="space-y-3">
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${dm ? "text-gray-400" : "text-gray-600"}`}>New Password</label>
          <div className="relative">
            <input type={show ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 6 characters" className={inp} />
            <button type="button" onClick={() => setShow(!show)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${dm ? "text-gray-500" : "text-gray-400"}`}>
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${dm ? "text-gray-400" : "text-gray-600"}`}>Confirm Password</label>
          <input type={show ? "text" : "password"} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" className={inp} />
        </div>
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors mt-1">
          Save Password
        </button>
      </form>
      <div className={`mt-4 p-3 rounded-xl text-xs ${dm ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
        <p className="font-semibold mb-1">Admin login credentials:</p>
        <p>Email: <span className="font-mono text-orange-500">admin@simba.rw</span></p>
        <p>Password: <span className="font-mono">{pw ? "••••••••" : "(not set)"}</span></p>
      </div>
    </div>
  );
}

export default function Admin() {
  const { darkMode, t, user, isAdmin, orders, logout } = useApp();
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState(productsData.products.slice(0, 40));
  const [editId, setEditId] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [adminPw, setAdminPw] = useState(() => { const u = JSON.parse(localStorage.getItem("users")||"[]").find(x=>x.email==="admin@simba.rw"); return u?.password||""; });
  const [dbSlide, setDbSlide] = useState(0);
  const [dbFade, setDbFade] = useState(true);
  const dm = darkMode;

  useEffect(() => {
    const iv = setInterval(() => {
      setDbFade(false);
      setTimeout(() => { setDbSlide(i => (i+1)%DASHBOARD_PHOTOS.length); setDbFade(true); }, 500);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const goDb = (dir) => {
    setDbFade(false);
    setTimeout(() => { setDbSlide(i => (i+dir+DASHBOARD_PHOTOS.length)%DASHBOARD_PHOTOS.length); setDbFade(true); }, 500);
  };
  const photo = DASHBOARD_PHOTOS[dbSlide];
  const totalRevenue = SALES.reduce((s,d)=>s+d.revenue,0);
  const lowStock = products.filter(p=>!p.inStock).length;
  const card = dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm";
  const txt = dm ? "text-white" : "text-gray-900";
  const sub = dm ? "text-gray-500" : "text-gray-500";

  if (!user) return <Navigate to="/signin" />;
  if (!isAdmin) return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${dm ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className={`w-full max-w-sm rounded-2xl border p-8 text-center ${card}`}>
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><Lock className="text-red-500" size={28} /></div>
        <h2 className={`text-xl font-black mb-2 ${txt}`}>Admin Access Only</h2>
        <p className={`text-sm mb-6 ${sub}`}>You need an admin account to view this page.</p>
        <div className={`text-xs p-3 rounded-xl mb-5 text-left ${dm ? "bg-gray-800" : "bg-orange-50"}`}>
          <p className="font-semibold text-orange-500 mb-1">Demo credentials</p>
          <p className={sub}>Email: <span className="font-mono">admin@simba.rw</span></p>
          <p className={sub}>Password: <span className="font-mono">admin123</span></p>
        </div>
        <Link to="/signin" className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors">Sign In as Admin</Link>
        <Link to="/" className={`block mt-3 text-sm hover:text-orange-500 transition-colors ${sub}`}>← Back to store</Link>
      </div>
    </div>
  );

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "products", label: "Products", icon: Package },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "live", label: t.liveOrders || "Live Orders", icon: Users },
  ];

  return (
    <div className={`min-h-screen flex ${dm ? "bg-gray-950" : "bg-gray-50"}`}>

      {/* ── SIDEBAR ── */}
      <aside className={`hidden lg:flex flex-col w-60 flex-shrink-0 border-r ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`} style={{minHeight:"100vh"}}>
        {/* Logo */}
        <div className={`px-6 py-5 border-b ${dm ? "border-gray-800" : "border-gray-100"}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>
            <div>
              <p className="font-black text-sm text-orange-500 leading-none">SIMBA</p>
              <p className={`text-[10px] tracking-widest uppercase ${sub}`}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === item.id
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : dm ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
              <item.icon size={17} />
              {item.label}
              {item.id === "orders" && <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab === "orders" ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"}`}>{orders.length}</span>}
            </button>
          ))}
        </nav>

        {/* User card */}
        <div className={`px-3 py-4 border-t ${dm ? "border-gray-800" : "border-gray-100"}`}>
          <div className={`flex items-center gap-3 p-3 rounded-xl ${dm ? "bg-gray-800" : "bg-gray-50"}`}>
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{user.name?.[0]?.toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold truncate ${txt}`}>{user.name}</p>
              <p className={`text-[10px] truncate ${sub}`}>{user.email}</p>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors"><LogOut size={14} /></button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className={`flex items-center justify-between px-6 py-4 border-b ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
          <div className="flex items-center gap-3">
            <Link to="/" className={`flex items-center gap-1.5 text-xs font-medium hover:text-orange-500 transition-colors ${sub}`}>
              <ArrowLeft size={13} /> Back to store
            </Link>
            <span className={`text-xs ${dm ? "text-gray-700" : "text-gray-300"}`}>/</span>
            <span className={`text-xs font-semibold capitalize ${txt}`}>{tab}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-700 text-[11px] font-bold px-2.5 py-1 rounded-full">Administrator</span>
            <button className={`w-8 h-8 rounded-xl flex items-center justify-center ${dm ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}><Bell size={15} /></button>
          </div>
        </header>

        {/* Mobile nav */}
        <div className={`lg:hidden flex gap-1 px-4 py-3 border-b overflow-x-auto ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === item.id ? "bg-orange-500 text-white" : dm ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>
              <item.icon size={13} />{item.label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-6 overflow-auto">


          {/* ===== DASHBOARD TAB ===== */}
          {tab === 'dashboard' && (
            <div className='space-y-6'>

              {/* Page title */}
              <div>
                <h1 className={'text-2xl font-black ' + (darkMode ? 'text-white' : 'text-gray-900')}>Dashboard</h1>
                <p className={'text-sm mt-1 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>Welcome back, {user.name}. Here is what is happening today.</p>
              </div>

               {/* Photo Slideshow Banner */}
               <div className='relative rounded-2xl overflow-hidden h-48 md:h-64'>
                 <div className={`absolute inset-0 transition-opacity duration-500 ${dbFade ? 'opacity-100' : 'opacity-0'}`}>
                   <img src={photo.img} alt={photo.label} className='w-full h-full object-cover hero-img' />
                   <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent' />
                 </div>
                 <div className='absolute inset-0 flex flex-col justify-center px-8'>
                   <p className='text-orange-400 text-xs font-bold uppercase tracking-widest mb-2'>Simba Supermarket</p>
                   <h2 className={`text-white text-2xl md:text-3xl font-black leading-tight mb-1 transition-all duration-500 ${dbFade ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Rwanda&apos;s Largest<br/>Supermarket Chain</h2>
                   <p className={`text-white/70 text-sm transition-all duration-500 delay-75 ${dbFade ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>11 branches across Kigali &bull; {productsData.products.length} products &bull; Est. 2007</p>
                 </div>
                 <div className='absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1'>
                   <span className='w-1.5 h-1.5 bg-white rounded-full animate-pulse' /> Live Dashboard
                 </div>
                 <button onClick={() => goDb(-1)} className='absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all'>
                   <ChevronLeft size={16} />
                 </button>
                 <button onClick={() => goDb(1)} className='absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all'>
                   <ChevronRight size={16} />
                 </button>
                 <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
                   {DASHBOARD_PHOTOS.map((p,i) => (
                     <button key={i} onClick={() => { setDbFade(false); setTimeout(() => { setDbSlide(i); setDbFade(true); }, 500); }}
                       className={`h-1 rounded-full transition-all duration-300 ${i===dbSlide ? 'w-6 bg-white' : 'w-1 bg-white/40 hover:bg-white/60'}`} />
                   ))}
                 </div>
               </div>

              {/* Stats grid */}
              <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
                {[
                  { label: 'Weekly Revenue', value: SALES.reduce((s,d)=>s+d.revenue,0).toLocaleString() + ' RWF', icon: TrendingUp, color: 'text-emerald-500', bg: darkMode ? 'bg-emerald-950/50' : 'bg-emerald-50', border: darkMode ? 'border-emerald-900' : 'border-emerald-100', change: '+12%' },
                  { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-500', bg: darkMode ? 'bg-blue-950/50' : 'bg-blue-50', border: darkMode ? 'border-blue-900' : 'border-blue-100', change: '+8%' },
                  { label: 'Total Products', value: productsData.products.length, icon: Package, color: 'text-violet-500', bg: darkMode ? 'bg-violet-950/50' : 'bg-violet-50', border: darkMode ? 'border-violet-900' : 'border-violet-100', change: '789' },
                  { label: 'Low Stock Items', value: lowStock, icon: AlertCircle, color: 'text-red-500', bg: darkMode ? 'bg-red-950/50' : 'bg-red-50', border: darkMode ? 'border-red-900' : 'border-red-100', change: 'Alert' },
                ].map((s,i) => (
                  <div key={i} className={'rounded-2xl border p-5 ' + card}>
                    <div className='flex items-start justify-between mb-4'>
                      <div className={'w-11 h-11 rounded-xl flex items-center justify-center ' + s.bg}>
                        <s.icon className={s.color} size={20} />
                      </div>
                      <span className={'text-xs font-semibold px-2 py-1 rounded-lg ' + s.bg + ' ' + s.color}>{s.change}</span>
                    </div>
                    <p className={'text-xl font-black mb-1 ' + (darkMode ? 'text-white' : 'text-gray-900')}>{s.value}</p>
                    <p className={'text-xs font-medium ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className='grid lg:grid-cols-3 gap-6'>
                {/* Revenue area chart */}
                <div className={'lg:col-span-2 rounded-2xl border p-6 ' + card}>
                  <div className='flex items-center justify-between mb-5'>
                    <div>
                      <h3 className={'font-bold ' + (darkMode ? 'text-white' : 'text-gray-900')}>Revenue This Week</h3>
                      <p className={'text-xs mt-0.5 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>Daily revenue in RWF</p>
                    </div>
                    <span className='text-xs bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-1 rounded-lg border border-emerald-100'>+12% vs last week</span>
                  </div>
                  <ResponsiveContainer width='100%' height={200}>
                    <AreaChart data={SALES}>
                      <defs>
                        <linearGradient id='grad' x1='0' y1='0' x2='0' y2='1'>
                          <stop offset='5%' stopColor='#f97316' stopOpacity={0.25}/>
                          <stop offset='95%' stopColor='#f97316' stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray='3 3' stroke={darkMode ? '#1f2937' : '#f3f4f6'} />
                      <XAxis dataKey='day' tick={{fontSize:11, fill: darkMode ? '#6b7280' : '#9ca3af'}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize:11, fill: darkMode ? '#6b7280' : '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={v => (v/1000)+'k'} />
                      <Tooltip formatter={v => [v.toLocaleString()+' RWF','Revenue']} contentStyle={{background: darkMode ? '#111827' : '#fff', border:'1px solid '+(darkMode?'#374151':'#e5e7eb'), borderRadius:12, fontSize:12}} />
                      <Area type='monotone' dataKey='revenue' stroke='#f97316' strokeWidth={2.5} fill='url(#grad)' />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div className={'rounded-2xl border p-6 ' + card}>
                  <h3 className={'font-bold mb-1 ' + (darkMode ? 'text-white' : 'text-gray-900')}>Sales by Category</h3>
                  <p className={'text-xs mb-4 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>Revenue distribution</p>
                  <ResponsiveContainer width='100%' height={140}>
                    <PieChart>
                      <Pie data={PIE_DATA} cx='50%' cy='50%' innerRadius={40} outerRadius={65} paddingAngle={3} dataKey='value'>
                        {PIE_DATA.map((entry,i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={v => [v+'%','Share']} contentStyle={{background: darkMode ? '#111827' : '#fff', border:'1px solid '+(darkMode?'#374151':'#e5e7eb'), borderRadius:10, fontSize:11}} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className='space-y-1.5 mt-2'>
                    {PIE_DATA.map((d,i) => (
                      <div key={i} className='flex items-center justify-between text-xs'>
                        <div className='flex items-center gap-2'>
                          <span className='w-2.5 h-2.5 rounded-full flex-shrink-0' style={{background:d.color}} />
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{d.name}</span>
                        </div>
                        <span className={'font-semibold ' + (darkMode ? 'text-gray-300' : 'text-gray-700')}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monthly bar chart */}
              <div className={'rounded-2xl border p-6 ' + card}>
                <div className='flex items-center justify-between mb-5'>
                  <div>
                    <h3 className={'font-bold ' + (darkMode ? 'text-white' : 'text-gray-900')}>Monthly Revenue 2024</h3>
                    <p className={'text-xs mt-0.5 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>Full year overview</p>
                  </div>
                </div>
                <ResponsiveContainer width='100%' height={180}>
                  <BarChart data={MONTHLY}>
                    <CartesianGrid strokeDasharray='3 3' stroke={darkMode ? '#1f2937' : '#f3f4f6'} />
                    <XAxis dataKey='month' tick={{fontSize:11, fill: darkMode ? '#6b7280' : '#9ca3af'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fontSize:11, fill: darkMode ? '#6b7280' : '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={v => (v/1000000).toFixed(1)+'M'} />
                    <Tooltip formatter={v => [v.toLocaleString()+' RWF','Revenue']} contentStyle={{background: darkMode ? '#111827' : '#fff', border:'1px solid '+(darkMode?'#374151':'#e5e7eb'), borderRadius:12, fontSize:12}} />
                    <Bar dataKey='revenue' fill='#f97316' radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent orders */}
              <div className={'rounded-2xl border overflow-hidden ' + card}>
                <div className={'flex items-center justify-between px-6 py-4 border-b ' + (darkMode ? 'border-gray-800' : 'border-gray-100')}>
                  <div>
                    <h3 className={'font-bold ' + (darkMode ? 'text-white' : 'text-gray-900')}>Recent Orders</h3>
                    <p className={'text-xs mt-0.5 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>Latest {Math.min(orders.length,6)} transactions</p>
                  </div>
                  <button onClick={() => setTab('orders')} className='text-orange-500 hover:text-orange-600 text-xs font-semibold transition-colors'>View all {orders.length} →</button>
                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className={darkMode ? 'bg-gray-800/60' : 'bg-gray-50'}>
                        {['Order ID','Customer','Amount','Status','Payment','Date'].map(h => (
                          <th key={h} className={'text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide ' + (darkMode ? 'text-gray-500' : 'text-gray-400')}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0,6).map((o,i) => (
                        <tr key={i} className={'border-t transition-colors ' + (darkMode ? 'border-gray-800 hover:bg-gray-800/40' : 'border-gray-50 hover:bg-gray-50/80')}>
                          <td className={'px-5 py-3.5 font-mono text-xs font-bold ' + (darkMode ? 'text-orange-400' : 'text-orange-500')}>{o.id}</td>
                          <td className={'px-5 py-3.5 text-sm font-medium ' + (darkMode ? 'text-gray-200' : 'text-gray-800')}>{o.customer}</td>
                          <td className={'px-5 py-3.5 text-sm font-semibold ' + (darkMode ? 'text-gray-200' : 'text-gray-800')}>{o.amount.toLocaleString()} RWF</td>
                          <td className='px-5 py-3.5'><span className={'text-xs font-semibold px-2.5 py-1 rounded-full ' + (STATUS[o.status] || 'bg-gray-100 text-gray-600')}>{o.status}</span></td>
                          <td className={'px-5 py-3.5 text-xs ' + (darkMode ? 'text-gray-400' : 'text-gray-500')}>{o.paymentMethod}</td>
                          <td className={'px-5 py-3.5 text-xs ' + (darkMode ? 'text-gray-500' : 'text-gray-400')}>{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===== ORDERS TAB ===== */}
          {tab === 'orders' && (
            <div className='space-y-5'>
              <div>
                <h1 className={'text-2xl font-black ' + (darkMode ? 'text-white' : 'text-gray-900')}>Orders</h1>
                <p className={'text-sm mt-1 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>{orders.length} total orders</p>
              </div>
              <div className={'rounded-2xl border overflow-hidden ' + card}>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className={darkMode ? 'bg-gray-800/60' : 'bg-gray-50'}>
                        {['Order ID','Customer','Product','Amount','Status','Payment','Date'].map(h => (
                          <th key={h} className={'text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wide ' + (darkMode ? 'text-gray-500' : 'text-gray-400')}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o,i) => (
                        <tr key={i} className={'border-t transition-colors ' + (darkMode ? 'border-gray-800 hover:bg-gray-800/40' : 'border-gray-50 hover:bg-gray-50/80')}>
                          <td className={'px-4 py-3 font-mono text-xs font-bold ' + (darkMode ? 'text-orange-400' : 'text-orange-500')}>{o.id}</td>
                          <td className={'px-4 py-3 text-sm font-medium ' + (darkMode ? 'text-gray-200' : 'text-gray-800')}>{o.customer}</td>
                          <td className={'px-4 py-3 text-xs max-w-[160px] ' + (darkMode ? 'text-gray-400' : 'text-gray-600')}><span className='line-clamp-1'>{o.product}</span></td>
                          <td className={'px-4 py-3 text-sm font-semibold ' + (darkMode ? 'text-gray-200' : 'text-gray-800')}>{o.amount.toLocaleString()} RWF</td>
                          <td className='px-4 py-3'><span className={'text-xs font-semibold px-2.5 py-1 rounded-full ' + (STATUS[o.status] || 'bg-gray-100 text-gray-600')}>{o.status}</span></td>
                          <td className={'px-4 py-3 text-xs ' + (darkMode ? 'text-gray-400' : 'text-gray-500')}>{o.paymentMethod}</td>
                          <td className={'px-4 py-3 text-xs ' + (darkMode ? 'text-gray-500' : 'text-gray-400')}>{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===== PRODUCTS TAB ===== */}
          {tab === 'products' && (
            <div className='space-y-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className={'text-2xl font-black ' + (darkMode ? 'text-white' : 'text-gray-900')}>Products</h1>
                  <p className={'text-sm mt-1 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>Showing first 40 of {productsData.products.length} products</p>
                </div>
                <span className={'text-xs px-3 py-1.5 rounded-lg ' + (darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500')}>Click price to edit inline</span>
              </div>
              <div className={'rounded-2xl border overflow-hidden ' + card}>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className={darkMode ? 'bg-gray-800/60' : 'bg-gray-50'}>
                        {['Product','Category','Price (RWF)','Unit','Stock','Actions'].map(h => (
                          <th key={h} className={'text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wide ' + (darkMode ? 'text-gray-500' : 'text-gray-400')}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className={'border-t transition-colors ' + (darkMode ? 'border-gray-800 hover:bg-gray-800/40' : 'border-gray-50 hover:bg-gray-50/80')}>
                          <td className='px-4 py-3'>
                            <div className='flex items-center gap-3'>
                              <img src={p.image} alt={p.name} className='w-10 h-10 rounded-xl object-cover bg-gray-100 flex-shrink-0' onError={e => { e.target.style.display='none'; }} />
                              <span className={'text-xs font-semibold line-clamp-2 max-w-[180px] leading-snug ' + (darkMode ? 'text-gray-200' : 'text-gray-800')}>{p.name}</span>
                            </div>
                          </td>
                          <td className={'px-4 py-3 text-xs ' + (darkMode ? 'text-gray-400' : 'text-gray-500')}>{p.category}</td>
                          <td className='px-4 py-3'>
                            {editId === p.id ? (
                              <div className='flex items-center gap-1'>
                                <input type='number' value={editPrice} onChange={e => setEditPrice(e.target.value)} autoFocus
                                  className={'w-24 px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 ' + (darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200')} />
                                <button onClick={() => { setProducts(prev => prev.map(x => x.id === p.id ? {...x, price: Number(editPrice)} : x)); setEditId(null); }}
                                  className='w-6 h-6 bg-emerald-500 text-white rounded-lg flex items-center justify-center hover:bg-emerald-600'><Check size={11} /></button>
                                <button onClick={() => setEditId(null)}
                                  className={'w-6 h-6 rounded-lg flex items-center justify-center ' + (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500')}><X size={11} /></button>
                              </div>
                            ) : (
                              <button onClick={() => { setEditId(p.id); setEditPrice(p.price); }}
                                className={'text-xs font-bold hover:text-orange-500 transition-colors ' + (darkMode ? 'text-gray-200' : 'text-gray-800')}>
                                {p.price.toLocaleString()}
                              </button>
                            )}
                          </td>
                          <td className={'px-4 py-3 text-xs ' + (darkMode ? 'text-gray-500' : 'text-gray-400')}>{p.unit}</td>
                          <td className='px-4 py-3'>
                            <span className={'text-xs font-semibold px-2.5 py-1 rounded-full ' + (p.inStock ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200')}>
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex items-center gap-1.5'>
                              <button onClick={() => { setEditId(p.id); setEditPrice(p.price); }}
                                className={'w-7 h-7 rounded-lg flex items-center justify-center transition-colors ' + (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
                                <Edit3 size={12} />
                              </button>
                              <button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))}
                                className='w-7 h-7 rounded-lg flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100'>
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}


          {/* ===== LIVE ORDERS TAB ===== */}
          {tab === 'live' && (
            <LiveOrdersTab />
          )}

          {/* ===== SETTINGS TAB ===== */}
          {tab === 'settings' && (
            <div className='space-y-5 max-w-2xl'>
              <div>
                <h1 className={'text-2xl font-black ' + (darkMode ? 'text-white' : 'text-gray-900')}>Settings</h1>
                <p className={'text-sm mt-1 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>Manage your admin account and preferences</p>
              </div>

              {/* Admin profile card */}
              <div className={'rounded-2xl border p-6 ' + card}>
                <div className='flex items-center gap-4 mb-5'>
                  <div className='w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-md shadow-orange-200'>
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className={'text-lg font-black ' + (darkMode ? 'text-white' : 'text-gray-900')}>{user.name}</p>
                    <p className={'text-sm ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>{user.email}</p>
                    <span className='inline-block mt-1 bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full'>Administrator</span>
                  </div>
                </div>
                <div className={'grid grid-cols-2 gap-3 p-4 rounded-xl text-sm ' + (darkMode ? 'bg-gray-800' : 'bg-gray-50')}>
                  <div>
                    <p className={'text-xs font-semibold mb-0.5 ' + (darkMode ? 'text-gray-500' : 'text-gray-400')}>Login Email</p>
                    <p className={'font-mono text-xs ' + (darkMode ? 'text-gray-300' : 'text-gray-700')}>admin@simba.rw</p>
                  </div>
                  <div>
                    <p className={'text-xs font-semibold mb-0.5 ' + (darkMode ? 'text-gray-500' : 'text-gray-400')}>Role</p>
                    <p className={'text-xs font-semibold text-purple-600'}>Administrator</p>
                  </div>
                </div>
              </div>

              {/* Password setup */}
              <PasswordSetup onSave={pw => setAdminPw(pw)} dm={darkMode} />

              {/* Danger zone */}
              <div className={'rounded-2xl border border-red-200 p-6 ' + (darkMode ? 'bg-red-950/20' : 'bg-red-50/50')}>
                <h3 className='font-bold text-red-600 mb-1'>Sign Out</h3>
                <p className={'text-xs mb-4 ' + (darkMode ? 'text-gray-500' : 'text-gray-500')}>Sign out of the admin panel and return to the store.</p>
                <button onClick={logout} className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors'>
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
