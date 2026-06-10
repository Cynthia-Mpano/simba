import glob

SVG = (
    'className="w-9 h-9 flex-shrink-0">'
    '<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">'
    '<rect width="36" height="36" rx="9" fill="#f97316"/>'
    '<path d="M22.5 10.5H15a2.5 2.5 0 000 5h6a2.5 2.5 0 010 5H13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>'
    '</svg></div>'
)

OLD1 = 'className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>'
OLD2 = "className='w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl'>S</div>"

changed = []
for path in glob.glob("simba-supermarket/src/**/*.jsx", recursive=True):
    text = open(path, encoding="utf-8").read()
    orig = text
    text = text.replace(OLD1, SVG).replace(OLD2, SVG)
    if text != orig:
        open(path,"w",encoding="utf-8").write(text)
        changed.append(path)
print("Updated:", changed)
