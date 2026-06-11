f = open("simba-supermarket/src/components/Footer.jsx", encoding="utf-8").read()
# Find Our Branches section
idx = f.find("Our Branches")
if idx > 0:
    # find the surrounding div start
    div_start = f.rfind("<div>", 0, idx)
    # find div end after idx
    div_end = f.find("</div>", idx) + 6
    old_block = f[div_start:div_end]
    new_block = """<div>
          <h3 className="text-white font-semibold text-sm mb-4">Opening Hours</h3>
          <ul className="space-y-2 text-sm">
            <li>Mon - Fri: 8:00 AM - 9:00 PM</li>
            <li>Saturday: 8:00 AM - 8:00 PM</li>
            <li>Sunday: 9:00 AM - 7:00 PM</li>
            <li className="text-orange-400 font-medium mt-3">11 Branches across Kigali</li>
            <li className="text-xs text-zinc-500 mt-1">Use Branch selector in nav to filter products</li>
          </ul>
        </div>"""
    f = f.replace(old_block, new_block)
    print("footer branches replaced")
else:
    print("not found")
open("simba-supermarket/src/components/Footer.jsx","w",encoding="utf-8").write(f)
print("footer lines:", len(f.splitlines()))
