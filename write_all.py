
import os

def w(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w', encoding='utf-8').write(content)
    print(f"wrote {path} ({len(content.splitlines())} lines)")

# ─── AppContext ────────────────────────────────────────────────────────────────
w("simba-supermarket/src/context/AppContext.jsx", r"""
import { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext();

const EN = {
  home:"Home",shop:"Shop",about:"About",contact:"Contact",
  cart:"Cart",signIn:"Sign In",signUp:"Sign Up",signOut:"Sign Out",
  search:"Search products...",allCategories:"All Categories",
  addToCart:"Add to Cart",addedToCart:"Added!",
  checkout:"Checkout",continueShopping:"Continue Shopping",
  yourCart:"Your Cart",emptyCart:"Your cart is empty",
  total:"Total",subtotal:"Subtotal",processing:"Processing...",
  quantity:"Quantity",remove:"Remove",inStock:"In Stock",outOfStock:"Out of Stock",
  sortBy:"Sort by",priceLow:"Price: Low to High",priceHigh:"Price: High to Low",name:"Name",
  featuredProducts:"Featured Products",shopByCategory:"Shop by Category",viewAll:"View All",
  email:"Email",password:"Password",fullName:"Full Name",phone:"Phone",
  createAccount:"Create Account",alreadyHave:"Already have an account?",dontHave:"Don't have an account?",
  heroTitle:"Fresh Groceries Delivered to Your Door",
  heroSub:"Rwanda's largest supermarket — 11 branches across Kigali. Shop online, save time.",
  shopNow:"Shop Now",learnMore:"Learn More",ourLocations:"Our Locations",
  aboutUs:"About Us",ourStory:"Our Story",ourValues:"Our Values",
  achievements:"Achievements",relatedProducts:"Related Products",backToShop:"Back to Shop",
  momoPayment:"Mobile Money Payment",enterPhone:"Enter your MTN MoMo number",
  orderSummary:"Order Summary",deliveryInfo:"Delivery Information",
  firstName:"First Name",lastName:"Last Name",address:"Delivery Address",
  city:"City",notes:"Order Notes",optional:"Optional",
  paymentMethod:"Payment Method",cashOnDelivery:"Cash on Delivery",
  mobileMoneyMTN:"MTN Mobile Money",airtelMoney:"Airtel Money",
  confirmOrder:"Confirm Order",thankYou:"Order Confirmed!",orderRef:"Order #",
  noProducts:"No products found",tryDifferent:"Try a different search or category",
  seeMore:"Load More Products",showing:"Showing",of:"of",products:"products",
  minPrice:"Min (RWF)",maxPrice:"Max (RWF)",priceRange:"Price Range",
  freeDelivery:"Free delivery on orders over 50,000 RWF",
  dashboard:"Dashboard",orders:"Orders",customers:"Customers",analytics:"Analytics",inventory:"Inventory",
  totalRevenue:"Total Revenue",totalOrders:"Total Orders",totalProducts:"Total Products",totalCustomers:"Total Customers",
  recentOrders:"Recent Orders",salesOverview:"Sales Overview",topProducts:"Top Products",lowStock:"Low Stock Alert",
  addProduct:"Add Product",save:"Save",cancel:"Cancel",
  adminPanel:"Admin Panel",roleAdmin:"Admin",roleUser:"Customer",
  enterAirtel:"Enter your Airtel Money number",
  filter:"Filter",clearFilters:"Clear filters",delivery:"Delivery",free:"FREE",
  orderPlaced:"Your order has been placed successfully!",
  deliveryTime:"Estimated delivery: 24-48 hours",
  continueToPayment:"Continue to Payment",backToDelivery:"Back",
  paymentPending:"Awaiting payment confirmation...",
  paymentSuccess:"Payment confirmed!",paymentFailed:"Payment failed. Please try again.",
  ussdPrompt:"Check your phone for the USSD prompt",
  paymentStatus:"Payment Status",orderStatus:"Order Status",
  orderConfirmed:"Order Confirmed",orderItems:"Items Ordered",
  viewOrder:"View Order Details",liveOrders:"Live Orders",
  updateStatus:"Update Status",assignRep:"Assign Rep",
  repDashboard:"Rep Dashboard",incomingOrders:"Incoming Orders",
  markDelivered:"Mark as Delivered",markShipped:"Mark as Shipped",
  markProcessing:"Mark as Processing",allOrders:"All Orders",
  filterByStatus:"Filter by Status",searchOrders:"Search orders...",
  payWith:"Pay with",confirmPayment:"Confirm Payment",
  orderDate:"Order Date",paymentRef:"Payment Ref",
  downloadReceipt:"Download Receipt",backToHome:"Back to Home",
  orderSuccess:"Order placed successfully!",
  paymentInitiated:"Payment initiated. Waiting for confirmation...",
  paymentStep1:"Sending USSD request to",
  paymentStep2:"Waiting for PIN confirmation...",
  paymentStep3:"Processing payment...",
  paymentStep4:"Verifying transaction...",
};

const FR = {
  home:"Accueil",shop:"Boutique",about:"A propos",contact:"Contact",
  cart:"Panier",signIn:"Connexion",signUp:"S'inscrire",signOut:"Deconnexion",
  search:"Rechercher des produits...",allCategories:"Toutes les categories",
  addToCart:"Ajouter",addedToCart:"Ajoute!",
  checkout:"Commander",continueShopping:"Continuer",
  yourCart:"Mon Panier",emptyCart:"Votre panier est vide",
  total:"Total",subtotal:"Sous-total",processing:"Traitement...",
  quantity:"Quantite",remove:"Supprimer",inStock:"En stock",outOfStock:"Rupture de stock",
  sortBy:"Trier par",priceLow:"Prix croissant",priceHigh:"Prix decroissant",name:"Nom",
  featuredProducts:"Produits vedettes",shopByCategory:"Par categorie",viewAll:"Voir tout",
  email:"Email",password:"Mot de passe",fullName:"Nom complet",phone:"Telephone",
  createAccount:"Creer un compte",alreadyHave:"Deja un compte?",dontHave:"Pas de compte?",
  heroTitle:"Produits frais livres chez vous",
  heroSub:"Le plus grand supermarche du Rwanda — 11 succursales a Kigali.",
  shopNow:"Acheter",learnMore:"En savoir plus",ourLocations:"Nos emplacements",
  aboutUs:"A propos",ourStory:"Notre histoire",ourValues:"Nos valeurs",
  achievements:"Realisations",relatedProducts:"Produits similaires",backToShop:"Retour",
  momoPayment:"Paiement Mobile Money",enterPhone:"Numero MTN MoMo",
  orderSummary:"Resume",deliveryInfo:"Livraison",
  firstName:"Prenom",lastName:"Nom",address:"Adresse",city:"Ville",
  notes:"Notes",optional:"Optionnel",
  paymentMethod:"Paiement",cashOnDelivery:"Paiement a la livraison",
  mobileMoneyMTN:"MTN Mobile Money",airtelMoney:"Airtel Money",
  confirmOrder:"Confirmer",thankYou:"Commande confirmee!",orderRef:"Commande #",
  noProducts:"Aucun produit",tryDifferent:"Essayez une autre recherche",
  seeMore:"Voir plus",showing:"Affichage",of:"sur",products:"produits",
  minPrice:"Min (RWF)",maxPrice:"Max (RWF)",priceRange:"Fourchette de prix",
  freeDelivery:"Livraison gratuite des 50 000 RWF",
  dashboard:"Tableau de bord",orders:"Commandes",customers:"Clients",analytics:"Analytique",inventory:"Inventaire",
  totalRevenue:"Revenu total",totalOrders:"Commandes",totalProducts:"Produits",totalCustomers:"Clients",
  recentOrders:"Commandes recentes",salesOverview:"Apercu des ventes",topProducts:"Meilleurs produits",lowStock:"Stock faible",
  addProduct:"Ajouter",save:"Enregistrer",cancel:"Annuler",
  adminPanel:"Admin",roleAdmin:"Administrateur",roleUser:"Client",
  enterAirtel:"Numero Airtel Money",
  filter:"Filtrer",clearFilters:"Effacer",delivery:"Livraison",free:"GRATUIT",
  orderPlaced:"Votre commande a ete passee avec succes!",
  deliveryTime:"Livraison estimee: 24-48 heures",
  continueToPayment:"Continuer",backToDelivery:"Retour",
  paymentPending:"En attente de confirmation...",
  paymentSuccess:"Paiement confirme!",paymentFailed:"Paiement echoue. Veuillez reessayer.",
  ussdPrompt:"Verifiez votre telephone pour le code USSD",
  paymentStatus:"Statut du paiement",orderStatus:"Statut de la commande",
  orderConfirmed:"Commande confirmee",orderItems:"Articles commandes",
  viewOrder:"Voir la commande",liveOrders:"Commandes en direct",
  updateStatus:"Mettre a jour",assignRep:"Assigner",
  repDashboard:"Tableau Rep",incomingOrders:"Commandes entrantes",
  markDelivered:"Marquer livre",markShipped:"Marquer expedie",
  markProcessing:"Marquer en traitement",allOrders:"Toutes les commandes",
  filterByStatus:"Filtrer par statut",searchOrders:"Rechercher...",
  payWith:"Payer avec",confirmPayment:"Confirmer le paiement",
  orderDate:"Date de commande",paymentRef:"Ref. paiement",
  downloadReceipt:"Telecharger le recu",backToHome:"Retour a l'accueil",
  orderSuccess:"Commande passee avec succes!",
  paymentInitiated:"Paiement initie. En attente de confirmation...",
  paymentStep1:"Envoi de la demande USSD a",
  paymentStep2:"En attente de confirmation du PIN...",
  paymentStep3:"Traitement du paiement...",
  paymentStep4:"Verification de la transaction...",
};

const RW = {
  home:"Ahabanza",shop:"Guterura",about:"Abo turi bo",contact:"Twandikire",
  cart:"Agasanduku",signIn:"Injira",signUp:"Iyandikishe",signOut:"Sohoka",
  search:"Shakisha ibicuruzwa...",allCategories:"Ibyiciro byose",
  addToCart:"Shyira mu gasanduku",addedToCart:"Byashyizwe!",
  checkout:"Soza kugura",continueShopping:"Komeza guterura",
  yourCart:"Agasanduku kawe",emptyCart:"Agasanduku kawe kararimo ubusa",
  total:"Igiteranyo",subtotal:"Igice cy'igiteranyo",processing:"Birimo...",
  quantity:"Umubare",remove:"Gukuraho",inStock:"Biraboneka",outOfStock:"Ntibiraboneka",
  sortBy:"Shyira mu murongo",priceLow:"Igiciro: Gito kugeza Kinini",priceHigh:"Igiciro: Kinini kugeza Gito",name:"Izina",
  featuredProducts:"Ibicuruzwa byihariye",shopByCategory:"Gura ukurikije icyiciro",viewAll:"Reba byose",
  email:"Imeyili",password:"Ijambo ry'ibanga",fullName:"Amazina yose",phone:"Telefoni",
  createAccount:"Fungura konti",alreadyHave:"Usanzwe ufite konti?",dontHave:"Nta konti ufite?",
  heroTitle:"Ibicuruzwa bishya bitumwa ku rugi rwawe",
  heroSub:"Isoko rinini mu Rwanda rifite amashami 11 i Kigali.",
  shopNow:"Gura ubu",learnMore:"Menya byinshi",ourLocations:"Aho tubarizwa",
  aboutUs:"Abo turi bo",ourStory:"Inkuru yacu",ourValues:"Indangagaciro zacu",
  achievements:"Ibyagezweho",relatedProducts:"Ibicuruzwa bisa",backToShop:"Garuka",
  momoPayment:"Kwishyura na Mobile Money",enterPhone:"Nimero ya MTN MoMo",
  orderSummary:"Incamake y'itumba",deliveryInfo:"Amakuru yo gutumiza",
  firstName:"Izina rya mbere",lastName:"Irindi zina",address:"Aderesi",city:"Umujyi",
  notes:"Ibisobanuro",optional:"Si ngombwa",
  paymentMethod:"Uburyo bwo kwishyura",cashOnDelivery:"Kwishyura iyo bitumijwe",
  mobileMoneyMTN:"MTN Mobile Money",airtelMoney:"Airtel Money",
  confirmOrder:"Emeza itumba",thankYou:"Itumba ryemejwe!",orderRef:"Itumba #",
  noProducts:"Nta bicuruzwa bibonetse",tryDifferent:"Gerageza ukundi",
  seeMore:"Reba byinshi",showing:"Werekana",of:"muri",products:"ibicuruzwa",
  minPrice:"Igiciro gito",maxPrice:"Igiciro kinini",priceRange:"Urugero rw'igiciro",
  freeDelivery:"Gutumiza ubuntu ku bitumba birenze 50,000 RWF",
  dashboard:"Ikibaho",orders:"Amabwiriza",customers:"Abakiriya",analytics:"Isesengura",inventory:"Ububiko",
  totalRevenue:"Amafaranga yose",totalOrders:"Amabwiriza yose",totalProducts:"Ibicuruzwa byose",totalCustomers:"Abakiriya bose",
  recentOrders:"Amabwiriza mashya",salesOverview:"Incamake y'inyungu",topProducts:"Ibicuruzwa byiza",lowStock:"Ububiko buke",
  addProduct:"Ongeraho",save:"Bika",cancel:"Hagarika",
  adminPanel:"Ubuyobozi",roleAdmin:"Umuyobozi",roleUser:"Umukiriya",
  enterAirtel:"Nimero ya Airtel Money",
  filter:"Shungura",clearFilters:"Siba",delivery:"Gutumiza",free:"UBUNTU",
  orderPlaced:"Itumba ryawe ryoherejwe neza!",
  deliveryTime:"Gutumizwa: amasaha 24-48",
  continueToPayment:"Komeza",backToDelivery:"Subira",
  paymentPending:"Tegereza kwemeza kwishyura...",
  paymentSuccess:"Kwishyura byemejwe!",paymentFailed:"Kwishyura ntibyagenze. Gerageza ukundi.",
  ussdPrompt:"Reba telefoni yawe kugira ngo ubone ubutumwa bwa USSD",
  paymentStatus:"Imimerere yo kwishyura",orderStatus:"Imimerere y'itumba",
  orderConfirmed:"Itumba ryemejwe",orderItems:"Ibicuruzwa byatumijwe",
  viewOrder:"Reba itumba",liveOrders:"Amabwiriza azaza",
  updateStatus:"Hindura imimerere",assignRep:"Shyira umuhagarariye",
  repDashboard:"Ikibaho cy'umuhagarariye",incomingOrders:"Amabwiriza ashya",
  markDelivered:"Emeza ko byatumijwe",markShipped:"Emeza ko byoherejwe",
  markProcessing:"Emeza ko birimo gutunganywa",allOrders:"Amabwiriza yose",
  filterByStatus:"Shungura ukurikije imimerere",searchOrders:"Shakisha amabwiriza...",
  payWith:"Ishyura na",confirmPayment:"Emeza kwishyura",
  orderDate:"Itariki y'itumba",paymentRef:"Nimero yo kwishyura",
  downloadReceipt:"Kuramo inyemezabuguzi",backToHome:"Garuka ahabanza",
  orderSuccess:"Itumba ryoherejwe neza!",
  paymentInitiated:"Kwishyura gutangiye. Tegereza kwemeza...",
  paymentStep1:"Kohereza ubusabe bwa USSD kuri",
  paymentStep2:"Tegereza kwemeza PIN...",
  paymentStep3:"Gutunganya kwishyura...",
  paymentStep4:"Gusuzuma ibikorwa...",
};

export const translations = { en: EN, fr: FR, rw: RW };

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; } });
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("user")) || null; } catch { return null; } });
  const [orders, setOrders] = useState(() => { try { return JSON.parse(localStorage.getItem("orders")) || generateMockOrders(); } catch { return generateMockOrders(); } });

  const t = translations[language];

  useEffect(() => { localStorage.setItem("darkMode", darkMode); document.documentElement.classList.toggle("dark", darkMode); }, [darkMode]);
  useEffect(() => { localStorage.setItem("language", language); }, [language]);
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("orders", JSON.stringify(orders)); }, [orders]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => { if (qty < 1) return removeFromCart(id); setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i)); };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const addOrder = (order) => setOrders(prev => [order, ...prev]);
  const updateOrderStatus = (id, status) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  const isAdmin = user?.role === "admin";

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode, language, setLanguage, t,
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
      user, login, logout, isAdmin, orders, setOrders, addOrder, updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
}

function generateMockOrders() {
  const statuses = ["Delivered","Processing","Shipped","Pending"];
  const names = ["Alice Uwimana","Bob Nkurunziza","Claire Mukamana","David Habimana","Eve Ingabire","Frank Bizimana","Grace Uwase","Henry Niyonzima"];
  const prods = ["Inyange Milk 1L","Jambo Sunflower Oil 1L","Azam Wheat Flour 2kg","American Garden Ketchup","Crystal Cooking Oil 5L"];
  return Array.from({ length: 24 }, (_, i) => ({
    id: `SMB-${(10000+i).toString()}`,
    customer: names[i % names.length],
    product: prods[i % prods.length],
    amount: Math.floor(Math.random() * 80000) + 5000,
    status: statuses[i % statuses.length],
    date: new Date(Date.now() - i * 86400000 * Math.random() * 3).toLocaleDateString(),
    paymentMethod: i % 3 === 0 ? "MTN MoMo" : i % 3 === 1 ? "Airtel Money" : "Cash",
    paymentStatus: i % 4 === 3 ? "Pending" : "Paid",
    phone: "+250 78" + String(Math.floor(Math.random()*9000000+1000000)),
    address: ["KG 541 St, Kigali","KN 5 Rd, Kigali","KK 35 Ave, Kigali"][i%3],
    items: [{ name: prods[i % prods.length], qty: Math.ceil(Math.random()*3), price: Math.floor(Math.random()*15000)+1000 }],
  }));
}

export const useApp = () => useContext(AppContext);
""".lstrip("\n"))

print("AppContext done")
