s = open("simba-supermarket/src/pages/Shop.jsx", encoding="utf-8").read()

OLD = """        <div className="mb-6">
          <h1 className={'text-2xl font-black ' + (dm ? 'text-white' : 'text-slate-900')}>{t.shop}</h1>
          <p className={'text-sm mt-1 ' + (dm ? 'text-zinc-500' : 'text-zinc-500')}>{filtered.length} {t.products}{cat ? ' in '+cat : ''}</p>
        </div>"""

NEW = """        <div className="mb-6">
          <h1 className={'text-2xl font-black ' + (dm ? 'text-white' : 'text-zinc-900')}>{t.shop}</h1>
          <p className={'text-sm mt-1 ' + (dm ? 'text-zinc-500' : 'text-zinc-500')}>
            {filtered.length} {t.products}{cat ? ' in ' + cat : ''}{branch ? ' \u00b7 ' + branch + ' Branch' : ''}
          </p>
          {branch && (
            <div className="mt-3 inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm px-4 py-2.5 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Showing products at <strong className="ml-1">Simba {branch}</strong>
              <button onClick={() => { const p = {}; if (search) p.search = search; if (cat) p.category = cat; setSp(p); }}
                className="ml-2 text-orange-500 hover:text-orange-700 font-bold">&#x2715;</button>
            </div>
          )}
        </div>"""

if OLD in s:
    s = s.replace(OLD, NEW)
    print("shop header patched")
else:
    print("NOT FOUND")
    print(repr(s[s.find("mb-6"):s.find("mb-6")+250]))

open("simba-supermarket/src/pages/Shop.jsx","w",encoding="utf-8").write(s)
print("lines:", len(s.splitlines()))
