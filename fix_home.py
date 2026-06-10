h = open("simba-supermarket/src/pages/Home.jsx", encoding="utf-8").read()
h = h.replace("import { Truck, Shield, Clock, ShoppingBag, ArrowRight, Star, ChevronRight } from","import { Truck, Shield, Clock, ShoppingBag, ArrowRight, ChevronRight } from")
idx = h.find("Rwanda")
if idx >= 0:
    span_start = h.rfind("<span", 0, idx)
    span_end = h.find("</span>", idx) + 7
    badge_old = h[span_start:span_end]
    badge_new = '<div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide">Simba Supermarket</div>'
    h = h.replace(badge_old, badge_new)
    print("replaced")
open("simba-supermarket/src/pages/Home.jsx","w",encoding="utf-8").write(h)
print("done", len(h.splitlines()))
