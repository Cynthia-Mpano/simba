import glob

# Large logo (w-12 h-12) for auth pages
SVG_BIG = (
    'className="w-12 h-12 flex-shrink-0">'
    '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">'
    '<rect width="48" height="48" rx="12" fill="#f97316"/>'
    '<path d="M30 14H20a3.5 3.5 0 000 7h8a3.5 3.5 0 010 7H18" stroke="white" strokeWidth="3" strokeLinecap="round"/>'
    '</svg></div>'
)

OLD_BIG1 = 'className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black">S</div>'
OLD_BIG2 = "className='w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black'>S</div>"

changed = []
for path in glob.glob("simba-supermarket/src/**/*.jsx", recursive=True):
    text = open(path, encoding="utf-8").read()
    orig = text
    text = text.replace(OLD_BIG1, SVG_BIG).replace(OLD_BIG2, SVG_BIG)
    if text != orig:
        open(path,"w",encoding="utf-8").write(text)
        changed.append(path)
print("Big logo updated:", changed)
