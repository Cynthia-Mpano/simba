n = open("simba-supermarket/src/components/Navbar.jsx", encoding="utf-8").read()
idx = n.find("flex mb-3")
if idx >= 0:
    form_start = n.rfind("<form", 0, idx)
    form_end = n.find("</form>", idx) + 7
    old_form = n[form_start:form_end]
    new_form = """<form onSubmit={go} className="mb-3">
            <div className={`relative flex items-center rounded-xl border-2 transition-all ${q ? "border-orange-400" : dm ? "border-zinc-700" : "border-zinc-200"} ${dm ? "bg-zinc-800" : "bg-white"}`}>
              <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search}
                className={`w-full pl-4 pr-11 py-2.5 bg-transparent text-sm focus:outline-none ${dm ? "text-white placeholder-zinc-500" : "text-zinc-900 placeholder-zinc-400"}`} />
              <button type="submit" className={`absolute right-0 top-0 bottom-0 w-11 flex items-center justify-center rounded-r-xl transition-colors ${q ? "text-orange-500 hover:bg-orange-50" : dm ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-400 hover:text-zinc-600"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
            </div>
          </form>"""
    n = n.replace(old_form, new_form)
    print("mobile search fixed")
else:
    print("flex mb-3 not found")
open("simba-supermarket/src/components/Navbar.jsx","w",encoding="utf-8").write(n)
print("lines:", len(n.splitlines()))
