import glob

OLD = 'className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl">S</div>'
SVG = (
    'className="w-12 h-12 flex-shrink-0">'
    '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">'
    '<rect width="48" height="48" rx="12" fill="#f97316"/>'
    '<path d="M30 14H20a3.5 3.5 0 000 7h8a3.5 3.5 0 010 7H18" stroke="white" strokeWidth="3" strokeLinecap="round"/>'
    '</svg></div>'
)
changed = []
for path in glob.glob("simba-supermarket/src/**/*.jsx", recursive=True):
    t = open(path,encoding="utf-8").read()
    if OLD in t:
        open(path,"w",encoding="utf-8").write(t.replace(OLD, SVG))
        changed.append(path)
print("Fixed:", changed)
