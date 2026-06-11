nav = open("simba-supermarket/src/components/Navbar.jsx", encoding="utf-8").read()

# 1. Add MapPin import
nav = nav.replace(
    'import { ShoppingCart, Search, Menu, X, Sun, Moon, Globe, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";',
    'import { ShoppingCart, Search, Menu, X, Sun, Moon, Globe, User, LogOut, ChevronDown, LayoutDashboard, MapPin, ChevronRight } from "lucide-react";'
)

# 2. Add branch state after existing state declarations
nav = nav.replace(
    'const [q, setQ] = useState("");',
    'const [q, setQ] = useState("");\n  const [branchOpen, setBranchOpen] = useState(false);\n  const [selectedBranch, setSelectedBranch] = useState("");\n  const branchRef = useRef(null);'
)

# 3. Add branchRef to useEffect cleanup
nav = nav.replace(
    'if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);',
    'if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);\n      if (branchRef.current && !branchRef.current.contains(e.target)) setBranchOpen(false);'
)

# 4. Remove Home from links when on home page - handled in render
# Change links to include Home conditionally
nav = nav.replace(
    'const links = [["/","Home"],["/shop",t.shop],["/about",t.about],["/contact",t.contact]];',
    'const links = [["/shop",t.shop],["/about",t.about],["/contact",t.contact]];'
)

# 5. Remove Home from mobile links too (already handled by same array)

open("simba-supermarket/src/components/Navbar.jsx", "w", encoding="utf-8").write(nav)
print("Navbar step 1 done:", len(nav.splitlines()), "lines")
