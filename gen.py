import os

def w(path, code):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w', encoding='utf-8').write(code)
    print('wrote', path)

B = 'simba-supermarket/src/pages/'
w(B+"Shop.jsx", r"""import { useState, useMemo, useEffect } from 'react';""")
