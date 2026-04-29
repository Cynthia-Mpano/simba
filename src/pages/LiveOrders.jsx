import { useState, useEffect } from "react";
import { Check, Clock, Truck, Package, Search, RefreshCw, ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext";

const STATUS_COLORS = {
  Delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Processing: "bg-blue-50 text-blue-700 border border-blue-200",
  Shipped:    "bg-violet-50 text-violet-700 border border-violet-200",
  Pending:    "bg-amber-50 text-amber-700 border border-amber-200",
};

const STATUS_ICONS = {
  Delivered: Check,
  Processing: Package,
  Shipped: Truck,
  Pending: Clock,
};

const NEXT_STATUS = {
  Pending:    "Processing",
  Processing: "Shipped",
  Shipped:    "Delivered",
  Delivered:  "Delivered",
};

export default function LiveOrdersTab() {
  const { darkMode, t, orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [updating, setUpdating] = useState({});
  const dm = darkMode;

  // Simulate real-time: auto-advance some Pending orders every 30s
  useEffect(() => {
    const iv = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(iv);
  }, []);

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: orders.length,
    Pending: orders.filter(o => o.status === "Pending").length,
    Processing: orders.filter(o => o.status === "Processing").length,
    Shipped: orders.filter(o => o.status === "Shipped").length,
    Delivered: orders.filter(o => o.status === "Delivered").length,
  };

  const handleAdvance = async (orderId, currentStatus) => {
    const next = NEXT_STATUS[currentStatus];
    if (next === currentStatus) return;
    setUpdating(u => ({ ...u, [orderId]: true }));
    await new Promise(r => setTimeout(r, 600));
    updateOrderStatus(orderId, next);
    setUpdating(u => ({ ...u, [orderId]: false }));
  };

  const card = dm ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className={"text-2xl font-black " + (dm ? "text-white" : "text-gray-900")}>{t.liveOrders || "Live Orders"}</h1>
          <p className={"text-sm mt-0.5 " + (dm ? "text-gray-500" : "text-gray-500")}>
            {t.incomingOrders || "Incoming Orders"} — {t.lastUpdate || "Last updated"}: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <button onClick={() => setLastUpdate(new Date())}
          className={"flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors " +
            (dm ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50")}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        {[["all","All"],["Pending","Pending"],["Processing","Processing"],["Shipped","Shipped"],["Delivered","Delivered"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilterStatus(val)}
            className={"px-4 py-1.5 rounded-xl text-xs font-bold transition-all " +
              (filterStatus === val
                ? "bg-orange-500 text-white shadow-sm"
                : dm ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200")}>
            {label} <span className={"ml-1 " + (filterStatus === val ? "opacity-80" : "opacity-60")}>({counts[val] || 0})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className={"relative " + (dm ? "" : "")}>
        <Search size={14} className={"absolute left-3 top-1/2 -translate-y-1/2 " + (dm ? "text-gray-500" : "text-gray-400")} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder={t.searchOrders || "Search orders..."}
          className={"w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 " +
            (dm ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-900")} />
      </div>

      {/* Orders grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className={"col-span-full text-center py-16 rounded-2xl border " + card}>
            <p className={"text-sm " + (dm ? "text-gray-500" : "text-gray-400")}>No orders match your filter.</p>
          </div>
        ) : filtered.map(order => {
          const StatusIcon = STATUS_ICONS[order.status] || Clock;
          const nextStatus = NEXT_STATUS[order.status];
          const canAdvance = nextStatus !== order.status;
          return (
            <div key={order.id} className={"rounded-2xl border p-5 flex flex-col gap-3 " + card}>
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={"font-mono text-xs font-bold " + (dm ? "text-orange-400" : "text-orange-500")}>{order.id}</p>
                  <p className={"font-semibold text-sm mt-0.5 " + (dm ? "text-white" : "text-gray-900")}>{order.customer}</p>
                </div>
                <span className={"text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 " + (STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600")}>
                  <StatusIcon size={10} /> {order.status}
                </span>
              </div>

              {/* Details */}
              <div className={"text-xs space-y-1 " + (dm ? "text-gray-400" : "text-gray-500")}>
                <p className="line-clamp-1">{order.product}</p>
                <p>{order.address}</p>
                <div className="flex items-center justify-between">
                  <span className={"font-bold text-sm " + (dm ? "text-gray-200" : "text-gray-800")}>{order.amount.toLocaleString()} RWF</span>
                  <span className={"text-[10px] px-2 py-0.5 rounded-full font-semibold " +
                    (order.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>
                    {order.paymentStatus || "Pending"}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-1">
                {["Pending","Processing","Shipped","Delivered"].map((s, i) => {
                  const steps = ["Pending","Processing","Shipped","Delivered"];
                  const currentIdx = steps.indexOf(order.status);
                  const done = i <= currentIdx;
                  return (
                    <div key={s} className={"flex-1 h-1.5 rounded-full transition-colors " +
                      (done ? "bg-orange-500" : dm ? "bg-gray-700" : "bg-gray-200")} />
                  );
                })}
              </div>

              {/* Action button */}
              {canAdvance && (
                <button onClick={() => handleAdvance(order.id, order.status)} disabled={updating[order.id]}
                  className={"w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 " +
                    (updating[order.id]
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white")}>
                  {updating[order.id]
                    ? <><RefreshCw size={11} className="animate-spin" /> Updating...</>
                    : <>Mark as {nextStatus} <ChevronDown size={11} /></>
                  }
                </button>
              )}
              {!canAdvance && (
                <div className="w-full py-2 rounded-xl text-xs font-bold text-center bg-emerald-50 text-emerald-700 flex items-center justify-center gap-1.5">
                  <Check size={11} /> Delivered
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
