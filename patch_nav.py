nav = open("simba-supermarket/src/components/Navbar.jsx", encoding="utf-8").read()

OLD = """        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 ml-2">
          {links.map(([p,l]) => (
            <Link key={p} to={p} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive(p) ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-50"}`}>{l}</Link>
          ))}
        </div>"""

NEW = """        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 ml-2">
          {location.pathname !== "/" && (
            <Link to="/" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-50"}`}>Home</Link>
          )}
          {links.map(([p,l]) => (
            <Link key={p} to={p} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive(p) ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-50"}`}>{l}</Link>
          ))}
          <div className="relative" ref={branchRef}>
            <button onClick={() => setBranchOpen(!branchOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedBranch ? "text-orange-600 bg-orange-50" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-600 hover:bg-zinc-50"}`}>
              <MapPin size={13} className={selectedBranch ? "text-orange-500" : ""} />
              {selectedBranch || "Branch"}
              <ChevronDown size={12} className={`transition-transform ${branchOpen ? "rotate-180" : ""}`} />
            </button>
            {branchOpen && (
              <div className={`absolute left-0 top-10 w-52 rounded-xl shadow-xl border z-50 overflow-hidden ${dm ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-100"}`}>
                <button onClick={() => { setSelectedBranch(""); setBranchOpen(false); navigate("/shop"); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${!selectedBranch ? "bg-orange-50 text-orange-600" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`}>
                  All Branches
                </button>
                {["Centenary","Gishushu","Kimironko","Kicukiro","Kigali Heights","UTC","Gacuriro","Gikondo","Sonatube","Kisimenti","Rebero"].map(b => (
                  <button key={b} onClick={() => { setSelectedBranch(b); setBranchOpen(false); navigate("/shop?branch="+encodeURIComponent(b)); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${selectedBranch===b ? "bg-orange-50 text-orange-600 font-semibold" : dm ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"}`}>
                    <MapPin size={11} className="text-orange-400 flex-shrink-0" /> {b}
                    {selectedBranch===b && <span className="ml-auto w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>"""

if OLD in nav:
    nav = nav.replace(OLD, NEW)
    print("replaced")
else:
    print("NOT FOUND - trying partial match")
    idx = nav.find("Desktop links")
    print(repr(nav[idx:idx+400]))

open("simba-supermarket/src/components/Navbar.jsx","w",encoding="utf-8").write(nav)
print("nav lines:", len(nav.splitlines()))
