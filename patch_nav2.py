nav = open("simba-supermarket/src/components/Navbar.jsx", encoding="utf-8").read()

OLD = 'className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive(p) ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-slate-600 hover:bg-slate-50"}`}>{l}</Link>\n          ))}\n        </div>'

NEW = 'className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive(p) ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-50"}`}>{l}</Link>\n          ))}\n          <div className="relative" ref={branchRef}>\n            <button onClick={() => setBranchOpen(!branchOpen)}\n              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedBranch ? "text-orange-600 bg-orange-50" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-50"}`}>\n              <MapPin size={13} />\n              {selectedBranch || "Branch"}\n              <ChevronDown size={12} />\n            </button>\n            {branchOpen && (\n              <div className={`absolute left-0 top-10 w-52 rounded-xl shadow-xl border z-50 overflow-hidden ${dm ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-100"}`}>\n                <button onClick={() => { setSelectedBranch(""); setBranchOpen(false); navigate("/shop"); }} className={`w-full text-left px-4 py-2.5 text-sm font-semibold ${!selectedBranch ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`}>All Branches</button>\n                {["Centenary","Gishushu","Kimironko","Kicukiro","Kigali Heights","UTC","Gacuriro","Gikondo","Sonatube","Kisimenti","Rebero"].map(b => (\n                  <button key={b} onClick={() => { setSelectedBranch(b); setBranchOpen(false); navigate("/shop?branch="+encodeURIComponent(b)); }} className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 ${selectedBranch===b ? "bg-orange-50 text-orange-600 font-semibold" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`}><MapPin size={10} className="text-orange-400" />{b}</button>\n                ))}\n              </div>\n            )}\n          </div>\n        </div>'

if OLD in nav:
    nav = nav.replace(OLD, NEW)
    print("replaced branch dropdown")
else:
    print("not found, checking...")
    # show what we have
    idx = nav.find("text-slate-600 hover:bg-slate-50")
    print("slate ref at:", idx)

open("simba-supermarket/src/components/Navbar.jsx","w",encoding="utf-8").write(nav)
print("lines:", len(nav.splitlines()))
