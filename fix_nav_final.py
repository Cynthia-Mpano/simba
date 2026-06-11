nav = open("simba-supermarket/src/components/Navbar.jsx", encoding="utf-8").read()

# 1. Fix search bar: icon RIGHT, no "Go" button, click magnifier to search
OLD_SEARCH = """        {/* Search */}
        <form onSubmit={go} className="flex-1 max-w-md hidden md:flex mx-3">
          <div className={`relative flex items-center w-full rounded-xl border transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 ${dm ? "bg-zinc-800 border-zinc-700" : "bg-slate-50 border-slate-200"}`}>
            <Search size={14} className={`absolute left-3 ${dm ? "text-zinc-500" : "text-zinc-400"}`} />
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search}
              className={`w-full pl-9 pr-3 py-2.5 bg-transparent text-sm focus:outline-none ${dm ? "text-white placeholder-zinc-500" : "text-slate-900 placeholder-zinc-400"}`} />
            {q && <button type="submit" className="mr-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors">Go</button>}
          </div>
        </form>"""

NEW_SEARCH = """        {/* Search */}
        <form onSubmit={go} className="flex-1 max-w-md hidden md:flex mx-3">
          <div className={`relative flex items-center w-full rounded-xl border-2 transition-all ${q ? "border-orange-400" : dm ? "border-zinc-700" : "border-zinc-200"} ${dm ? "bg-zinc-800" : "bg-white"}`}>
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search}
              className={`w-full pl-4 pr-11 py-2.5 bg-transparent text-sm focus:outline-none leading-none ${dm ? "text-white placeholder-zinc-500" : "text-zinc-900 placeholder-zinc-400"}`} />
            <button type="submit" className={`absolute right-0 top-0 bottom-0 w-11 flex items-center justify-center rounded-r-xl transition-colors ${q ? "text-orange-500 hover:bg-orange-50" : dm ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`}>
              <Search size={16} />
            </button>
          </div>
        </form>"""

if OLD_SEARCH in nav:
    nav = nav.replace(OLD_SEARCH, NEW_SEARCH)
    print("search fixed")
else:
    print("search OLD not found")
    # try partial
    idx = nav.find("Search size={14}")
    print("Search at:", idx)

# 2. Polish branch dropdown - larger font, better padding, polished UI
OLD_BRANCH_BTN = """            <button onClick={() => setBranchOpen(!branchOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedBranch ? "text-orange-600 bg-orange-50" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-50"}`}>
              <MapPin size={13} />
              {selectedBranch || "Branch"}
              <ChevronDown size={12} />
            </button>"""

NEW_BRANCH_BTN = """            <button onClick={() => setBranchOpen(!branchOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all border ${selectedBranch ? "text-orange-600 bg-orange-50 border-orange-200" : dm ? "text-zinc-300 bg-zinc-800 border-zinc-700 hover:border-zinc-500" : "text-zinc-700 bg-white border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"}`}>
              <MapPin size={13} className={selectedBranch ? "text-orange-500" : dm ? "text-zinc-400" : "text-zinc-500"} />
              <span className="max-w-[90px] truncate">{selectedBranch || "Branch"}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${branchOpen ? "rotate-180" : ""}`} />
            </button>"""

if OLD_BRANCH_BTN in nav:
    nav = nav.replace(OLD_BRANCH_BTN, NEW_BRANCH_BTN)
    print("branch btn fixed")
else:
    print("branch btn not found")

# 3. Polish branch dropdown items - larger font (1rem = 16px), padding 8px 12px, rounded
OLD_BRANCH_ITEM = """                {["Centenary","Gishushu","Kimironko","Kicukiro","Kigali Heights","UTC","Gacuriro","Gikondo","Sonatube","Kisimenti","Rebero"].map(b => (
                  <button key={b} onClick={() => { setSelectedBranch(b); setBranchOpen(false); navigate("/shop?branch="+encodeURIComponent(b)); }} className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 ${selectedBranch===b ? "bg-orange-50 text-orange-600 font-semibold" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`}><MapPin size={10} className="text-orange-400" />{b}</button>
                ))}"""

NEW_BRANCH_ITEM = """                {["Centenary","Gishushu","Kimironko","Kicukiro","Kigali Heights","UTC","Gacuriro","Gikondo","Sonatube","Kisimenti","Rebero"].map(b => (
                  <button key={b} onClick={() => { setSelectedBranch(b); setBranchOpen(false); navigate("/shop?branch="+encodeURIComponent(b)); }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 transition-colors rounded-lg mx-1 my-0.5 ${selectedBranch===b ? "bg-orange-500 text-white font-semibold" : dm ? "text-zinc-200 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`}>
                    <MapPin size={12} className={selectedBranch===b ? "text-white" : "text-orange-400"} />
                    <span>{b}</span>
                    {selectedBranch===b && <span className="ml-auto text-white text-xs">✓</span>}
                  </button>
                ))}"""

if OLD_BRANCH_ITEM in nav:
    nav = nav.replace(OLD_BRANCH_ITEM, NEW_BRANCH_ITEM)
    print("branch items fixed")
else:
    print("branch items not found")

# 4. Fix All Branches button styling to match
OLD_ALL = """                <button onClick={() => { setSelectedBranch(""); setBranchOpen(false); navigate("/shop"); }} className={`w-full text-left px-4 py-2.5 text-sm font-semibold ${!selectedBranch ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 ho"""
idx_all = nav.find(OLD_ALL[:60])
if idx_all >= 0:
    # find this button end
    btn_end = nav.find(">All Branches</button>", idx_all) + len(">All Branches</button>")
    old_all_btn = nav[idx_all:btn_end]
    new_all_btn = """                <button onClick={() => { setSelectedBranch(""); setBranchOpen(false); navigate("/shop"); }}
                  className={`w-full text-left px-3 py-2.5 text-sm font-bold border-b transition-colors ${!selectedBranch ? "text-orange-600 bg-orange-50" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"} ${dm ? "border-zinc-800" : "border-zinc-100"}`}>
                  All Branches
                </button>"""
    nav = nav.replace(old_all_btn, new_all_btn)
    print("all branches btn fixed")
else:
    print("all branches not found")

open("simba-supermarket/src/components/Navbar.jsx","w",encoding="utf-8").write(nav)
print("Navbar done:", len(nav.splitlines()), "lines")
