import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BarChart2, ShoppingBag, Users, Package, TrendingUp, AlertCircle, ArrowLeft, Plus, Trash2, Edit3, Check, X } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useApp } from "../context/AppContext";
import productsData from "../simba_products.json";

const SALES_DATA = [
  { day: "Mon", revenue: 245000, orders: 18 },
  { day: "Tue", revenue: 312000, orders: 24 },
  { day: "Wed", revenue: 198000, orders: 15 },
  { day: "Thu", revenue: 425000, orders: 31 },
  { day: "Fri", revenue: 567000, orders: 42 },
  { day: "Sat", revenue: 689000, orders: 51 },
  { day: "Sun", revenue: 534000, orders: 39 },
];

const STATUS_COLORS = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

export default function Admin() {
  const { darkMode, t, user, isAdmin, orders } = useApp();
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState(productsData.products.slice(0, 30));
  const [editId, setEditId] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const dm = darkMode;

  if (!user) return <Navigate to="/signin" />;
  if (!isAdmin) return (
    <div className={`min-h-screen flex items-center justify-center ${dm ? "bg-gray-950 text-white" : "bg-gray-50"}`}>
      <div className="text-center p-8">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-xl font-bold mb-2">Admin Access Required</h2>
        <p className="text-gray-500 mb-4 text-sm">Sign in with an admin account to access this panel.</p>
        <p className="text-xs text-gray-400 mb-6 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg inline-block">
          Tip: Register with email <strong>admin@simba.rw</strong> to get admin access
        </p>
        <Link to="/" className="block bg-orange-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-orange-600">Go Home</Link>
      </div>
    </div>
  );

  const totalRevenue = SALES_DATA.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = orders.length;
  const lowStock = products.filter(p => !p.inStock).length;

  const stats = [
    { label: t.totalRevenue, value: totalRevenue.toLocaleString() + " RWF", icon: TrendingUp, color: "text-green-500", bg: dm ? "bg-green-950/40" : "bg-green-50" },
    { label: t.totalOrders, value: totalOrders, icon: ShoppingBag, color: "text-blue-500", bg: dm ? "bg-blue-950/40" : "bg-blue-50" },
    { label: t.totalProducts, value: productsData.products.length, icon: Package, color: "text-purple-500", bg: dm ? "bg-purple-950/40" : "bg-purple-50" },
    { label: t.lowStock, value: lowStock, icon: AlertCircle, color: "text-red-500", bg: dm ? "bg-red-950/40" : "bg-red-50" },
  ];

  const card = dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
  const tabs = [
    { id: "dashboard", label: t.dashboard, icon: BarChart2 },
    { id: "orders", label: t.orders, icon: ShoppingBag },
    { id: "products", label: t.products, icon: Package },
  ];

  return (
    <div className={`min-h-screen ${dm ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link to="/" className={`text-sm flex items-center gap-1 hover:text-orange-500 transition-colors ${dm ? "text-gray-400" : "text-gray-500"}`}>
                <ArrowLeft size={14} /> Back to site
              </Link>
            </div>
            <h1 className={`text-2xl font-black ${dm ? "text-white" : "text-gray-900"}`}>{t.adminPanel}</h1>
            <p className={`text-sm mt-0.5 ${dm ? "text-gray-500" : "text-gray-500"}`}>Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full">{t.roleAdmin}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 p-1 rounded-xl border mb-6 w-fit ${dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
          {tabs.map(tb => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === tb.id ? "bg-orange-500 text-white shadow-sm" : dm ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"}`}>
              <tb.icon size={15} /> {tb.label}
            </button>
          ))}
        </div>

        {/* DASHBOARD TAB */}
        {tab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className={`rounded-2xl border p-5 ${card}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                      <s.icon className={s.color} size={19} />
                    </div>
                  </div>
                  <p className={`text-2xl font-black ${dm ? "text-white" : "text-gray-900"}`}>{s.value}</p>
                  <p className={`text-xs mt-1 ${dm ? "text-gray-500" : "text-gray-500"}`}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className={`rounded-2xl border p-6 ${card}`}>
                <h3 className={`font-bold mb-4 ${dm ? "text-white" : "text-gray-900"}`}>{t.salesOverview} (This Week)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={SALES_DATA}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={dm ? "#1f2937" : "#f3f4f6"} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: dm ? "#6b7280" : "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: dm ? "#6b7280" : "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => (v/1000)+"k"} />
                    <Tooltip formatter={v => [v.toLocaleString() + " RWF", "Revenue"]} contentStyle={{ background: dm ? "#111827" : "#fff", border: "1px solid " + (dm ? "#374151" : "#e5e7eb"), borderRadius: 12, fontSize: 12 }} />
                    <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2.5} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className={`rounded-2xl border p-6 ${card}`}>
                <h3 className={`font-bold mb-4 ${dm ? "text-white" : "text-gray-900"}`}>Daily Orders</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={SALES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke={dm ? "#1f2937" : "#f3f4f6"} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: dm ? "#6b7280" : "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: dm ? "#6b7280" : "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: dm ? "#111827" : "#fff", border: "1px solid " + (dm ? "#374151" : "#e5e7eb"), borderRadius: 12, fontSize: 12 }} />
                    <Bar dataKey="orders" fill="#f97316" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent orders preview */}
            <div className={`rounded-2xl border ${card}`}>
              <div className="p-5 border-b flex items-center justify-between" style={{borderColor: dm ? "#1f2937" : "#f3f4f6"}}>
                <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{t.recentOrders}</h3>
                <button onClick={() => setTab("orders")} className="text-orange-500 text-sm font-semibold hover:text-orange-600">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={dm ? "bg-gray-800/50" : "bg-gray-50"}>
                      {["Order ID","Customer","Amount","Status","Payment"].map(h => (
                        <th key={h} className={`text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide ${dm ? "text-gray-500" : "text-gray-400"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0,6).map((o, i) => (
                      <tr key={i} className={`border-t ${dm ? "border-gray-800 hover:bg-gray-800/30" : "border-gray-50 hover:bg-gray-50"} transition-colors`}>
                        <td className={`px-5 py-3.5 font-mono text-xs font-semibold ${dm ? "text-orange-400" : "text-orange-500"}`}>{o.id}</td>
                        <td className={`px-5 py-3.5 font-medium ${dm ? "text-gray-200" : "text-gray-800"}`}>{o.customer}</td>
                        <td className={`px-5 py-3.5 font-semibold ${dm ? "text-gray-200" : "text-gray-800"}`}>{o.amount.toLocaleString()} RWF</td>
                        <td className="px-5 py-3.5"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[o.status] || "bg-gray-100 text-gray-600"}`}>{o.status}</span></td>
                        <td className={`px-5 py-3.5 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{o.paymentMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <div className={`rounded-2xl border ${card}`}>
            <div className="p-5 border-b" style={{borderColor: dm ? "#1f2937" : "#f3f4f6"}}>
              <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{t.orders} ({orders.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={dm ? "bg-gray-800/50" : "bg-gray-50"}>
                    {["Order ID","Customer","Product","Amount","Status","Payment","Date"].map(h => (
                      <th key={h} className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide ${dm ? "text-gray-500" : "text-gray-400"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={i} className={`border-t ${dm ? "border-gray-800 hover:bg-gray-800/30" : "border-gray-50 hover:bg-gray-50"} transition-colors`}>
                      <td className={`px-4 py-3 font-mono text-xs font-semibold ${dm ? "text-orange-400" : "text-orange-500"}`}>{o.id}</td>
                      <td className={`px-4 py-3 font-medium text-xs ${dm ? "text-gray-200" : "text-gray-800"}`}>{o.customer}</td>
                      <td className={`px-4 py-3 text-xs ${dm ? "text-gray-400" : "text-gray-600"}`}>{o.product}</td>
                      <td className={`px-4 py-3 font-semibold text-xs ${dm ? "text-gray-200" : "text-gray-800"}`}>{o.amount.toLocaleString()} RWF</td>
                      <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[o.status] || "bg-gray-100 text-gray-600"}`}>{o.status}</span></td>
                      <td className={`px-4 py-3 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{o.paymentMethod}</td>
                      <td className={`px-4 py-3 text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {tab === "products" && (
          <div className={`rounded-2xl border ${card}`}>
            <div className="p-5 border-b flex items-center justify-between" style={{borderColor: dm ? "#1f2937" : "#f3f4f6"}}>
              <h3 className={`font-bold ${dm ? "text-white" : "text-gray-900"}`}>{t.products} (showing 30)</h3>
              <span className={`text-xs ${dm ? "text-gray-500" : "text-gray-400"}`}>Click price to edit</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={dm ? "bg-gray-800/50" : "bg-gray-50"}>
                    {["Product","Category","Price (RWF)","Stock","Actions"].map(h => (
                      <th key={h} className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide ${dm ? "text-gray-500" : "text-gray-400"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.id} className={`border-t ${dm ? "border-gray-800 hover:bg-gray-800/30" : "border-gray-50 hover:bg-gray-50"} transition-colors`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-gray-100 flex-shrink-0" onError={e => e.target.style.display="none"} />
                          <span className={`text-xs font-medium line-clamp-1 max-w-[180px] ${dm ? "text-gray-200" : "text-gray-800"}`}>{p.name}</span>
                        </div>
                      </td>
                      <td className={`px-4 py-3 text-xs ${dm ? "text-gray-400" : "text-gray-500"}`}>{p.category}</td>
                      <td className="px-4 py-3">
                        {editId === p.id ? (
                          <div className="flex items-center gap-1">
                            <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)}
                              className={`w-24 px-2 py-1 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 ${dm ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-200"}`} />
                            <button onClick={() => { setProducts(prev => prev.map(x => x.id === p.id ? {...x, price: Number(editPrice)} : x)); setEditId(null); }}
                              className="w-6 h-6 bg-green-500 text-white rounded flex items-center justify-center"><Check size={11} /></button>
                            <button onClick={() => setEditId(null)} className="w-6 h-6 bg-gray-200 text-gray-600 rounded flex items-center justify-center"><X size={11} /></button>
                          </div>
                        ) : (
                          <span className={`font-semibold text-xs cursor-pointer hover:text-orange-500 transition-colors ${dm ? "text-gray-200" : "text-gray-800"}`}
                            onClick={() => { setEditId(p.id); setEditPrice(p.price); }}>
                            {p.price.toLocaleString()}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setEditId(p.id); setEditPrice(p.price); }}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${dm ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                            <Edit3 size={12} />
                          </button>
                          <button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))}
                            className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
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
        )}
      </div>
    </div>
  );
}
