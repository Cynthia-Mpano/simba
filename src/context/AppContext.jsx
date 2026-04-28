import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const translations = {
  en: {
    home: 'Home', shop: 'Shop', about: 'About', contact: 'Contact',
    cart: 'Cart', signIn: 'Sign In', signUp: 'Sign Up', signOut: 'Sign Out',
    search: 'Search products...', allCategories: 'All Categories',
    addToCart: 'Add to Cart', addedToCart: 'Added!', viewCart: 'View Cart',
    checkout: 'Checkout', continueShopping: 'Continue Shopping',
    yourCart: 'Your Cart', emptyCart: 'Your cart is empty',
    total: 'Total', subtotal: 'Subtotal', placeOrder: 'Place Order',
    orderSuccess: 'Order placed successfully!', payWith: 'Pay with MoMo',
    enterMomo: 'Enter MoMo Number', confirmPayment: 'Confirm Payment',
    processing: 'Processing...', paymentSuccess: 'Payment Successful!',
    quantity: 'Quantity', remove: 'Remove', inStock: 'In Stock',
    outOfStock: 'Out of Stock', price: 'Price', category: 'Category',
    filter: 'Filter', sortBy: 'Sort by', newest: 'Newest', priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low', name: 'Name', featuredProducts: 'Featured Products',
    shopByCategory: 'Shop by Category', viewAll: 'View All', welcome: 'Welcome back',
    email: 'Email', password: 'Password', fullName: 'Full Name', phone: 'Phone',
    createAccount: 'Create Account', alreadyHave: 'Already have an account?',
    dontHave: "Don't have an account?", tagline: "Rwanda's Online Supermarket",
    heroTitle: 'Fresh Products Delivered to Your Door', heroSub: 'Shop from Rwanda\'s largest supermarket with 11 branches across Kigali',
    shopNow: 'Shop Now', learnMore: 'Learn More', ourLocations: 'Our Locations',
    aboutUs: 'About Us', ourStory: 'Our Story', ourValues: 'Our Values',
    ourServices: 'Our Services', achievements: 'Achievements', productDetail: 'Product Details',
    relatedProducts: 'Related Products', backToShop: 'Back to Shop',
    darkMode: 'Dark Mode', lightMode: 'Light Mode', language: 'Language',
    momoPayment: 'Mobile Money Payment', enterPhone: 'Enter your MTN MoMo number',
    orderSummary: 'Order Summary', deliveryInfo: 'Delivery Information',
    firstName: 'First Name', lastName: 'Last Name', address: 'Delivery Address',
    city: 'City', notes: 'Order Notes', optional: 'Optional',
    paymentMethod: 'Payment Method', cashOnDelivery: 'Cash on Delivery',
    mobileMoneyMTN: 'MTN Mobile Money', confirmOrder: 'Confirm Order',
    thankYou: 'Thank you for your order!', orderRef: 'Order Reference',
    noProducts: 'No products found', tryDifferent: 'Try a different search or category',
  },
  fr: {
    home: 'Accueil', shop: 'Boutique', about: 'À propos', contact: 'Contact',
    cart: 'Panier', signIn: 'Connexion', signUp: "S'inscrire", signOut: 'Déconnexion',
    search: 'Rechercher des produits...', allCategories: 'Toutes les catégories',
    addToCart: 'Ajouter au panier', addedToCart: 'Ajouté!', viewCart: 'Voir le panier',
    checkout: 'Commander', continueShopping: 'Continuer les achats',
    yourCart: 'Votre panier', emptyCart: 'Votre panier est vide',
    total: 'Total', subtotal: 'Sous-total', placeOrder: 'Passer la commande',
    orderSuccess: 'Commande passée avec succès!', payWith: 'Payer avec MoMo',
    enterMomo: 'Entrez le numéro MoMo', confirmPayment: 'Confirmer le paiement',
    processing: 'Traitement...', paymentSuccess: 'Paiement réussi!',
    quantity: 'Quantité', remove: 'Supprimer', inStock: 'En stock',
    outOfStock: 'Rupture de stock', price: 'Prix', category: 'Catégorie',
    filter: 'Filtrer', sortBy: 'Trier par', newest: 'Plus récent', priceLow: 'Prix croissant',
    priceHigh: 'Prix décroissant', name: 'Nom', featuredProducts: 'Produits vedettes',
    shopByCategory: 'Acheter par catégorie', viewAll: 'Voir tout', welcome: 'Bienvenue',
    email: 'Email', password: 'Mot de passe', fullName: 'Nom complet', phone: 'Téléphone',
    createAccount: 'Créer un compte', alreadyHave: 'Vous avez déjà un compte?',
    dontHave: "Vous n'avez pas de compte?", tagline: 'Supermarché en ligne du Rwanda',
    heroTitle: 'Produits frais livrés à votre porte', heroSub: 'Achetez dans le plus grand supermarché du Rwanda avec 11 succursales à Kigali',
    shopNow: 'Acheter maintenant', learnMore: 'En savoir plus', ourLocations: 'Nos emplacements',
    aboutUs: 'À propos de nous', ourStory: 'Notre histoire', ourValues: 'Nos valeurs',
    ourServices: 'Nos services', achievements: 'Réalisations', productDetail: 'Détails du produit',
    relatedProducts: 'Produits similaires', backToShop: 'Retour à la boutique',
    darkMode: 'Mode sombre', lightMode: 'Mode clair', language: 'Langue',
    momoPayment: 'Paiement Mobile Money', enterPhone: 'Entrez votre numéro MTN MoMo',
    orderSummary: 'Résumé de la commande', deliveryInfo: 'Informations de livraison',
    firstName: 'Prénom', lastName: 'Nom', address: 'Adresse de livraison',
    city: 'Ville', notes: 'Notes de commande', optional: 'Optionnel',
    paymentMethod: 'Mode de paiement', cashOnDelivery: 'Paiement à la livraison',
    mobileMoneyMTN: 'MTN Mobile Money', confirmOrder: 'Confirmer la commande',
    thankYou: 'Merci pour votre commande!', orderRef: 'Référence de commande',
    noProducts: 'Aucun produit trouvé', tryDifferent: 'Essayez une autre recherche ou catégorie',
  },
  rw: {
    home: 'Ahabanza', shop: 'Guterura', about: 'Abo turi bo', contact: 'Twandikire',
    cart: 'Agasanduku', signIn: 'Injira', signUp: 'Iyandikishe', signOut: 'Sohoka',
    search: 'Shakisha ibicuruzwa...', allCategories: 'Ibyiciro byose',
    addToCart: 'Shyira mu gasanduku', addedToCart: 'Byashyizwe!', viewCart: 'Reba agasanduku',
    checkout: 'Soza kugura', continueShopping: 'Komeza guterura',
    yourCart: 'Agasanduku kawe', emptyCart: 'Agasanduku kawe kararimo ubusa',
    total: 'Igiteranyo', subtotal: 'Igice cy\'igiteranyo', placeOrder: 'Ohereza itumba',
    orderSuccess: 'Itumba ryoherejwe neza!', payWith: 'Tanga amafaranga na MoMo',
    enterMomo: 'Injiza nimero ya MoMo', confirmPayment: 'Emeza kwishyura',
    processing: 'Birimo gutunganywa...', paymentSuccess: 'Kwishyura byagenze neza!',
    quantity: 'Umubare', remove: 'Gukuraho', inStock: 'Biraboneka',
    outOfStock: 'Ntibiraboneka', price: 'Igiciro', category: 'Icyiciro',
    filter: 'Shungura', sortBy: 'Shyira mu murongo', newest: 'Bishya', priceLow: 'Igiciro: Gito kugeza Kinini',
    priceHigh: 'Igiciro: Kinini kugeza Gito', name: 'Izina', featuredProducts: 'Ibicuruzwa byihariye',
    shopByCategory: 'Gura ukurikije icyiciro', viewAll: 'Reba byose', welcome: 'Murakaza neza',
    email: 'Imeyili', password: 'Ijambo ry\'ibanga', fullName: 'Amazina yose', phone: 'Telefoni',
    createAccount: 'Fungura konti', alreadyHave: 'Usanzwe ufite konti?',
    dontHave: 'Nta konti ufite?', tagline: 'Isoko rya interineti mu Rwanda',
    heroTitle: 'Ibicuruzwa bishya bitumwa ku rugi rwawe', heroSub: 'Gura mu isoko rinini mu Rwanda rifite amashami 11 i Kigali',
    shopNow: 'Gura ubu', learnMore: 'Menya byinshi', ourLocations: 'Aho tubarizwa',
    aboutUs: 'Abo turi bo', ourStory: 'Inkuru yacu', ourValues: 'Indangagaciro zacu',
    ourServices: 'Serivisi zacu', achievements: 'Ibyagezweho', productDetail: 'Amakuru y\'igicuruzwa',
    relatedProducts: 'Ibicuruzwa bisa', backToShop: 'Garuka ku isoko',
    darkMode: 'Uburyo bw\'ijoro', lightMode: 'Uburyo bw\'umunsi', language: 'Ururimi',
    momoPayment: 'Kwishyura na Mobile Money', enterPhone: 'Injiza nimero yawe ya MTN MoMo',
    orderSummary: 'Incamake y\'itumba', deliveryInfo: 'Amakuru yo gutumiza',
    firstName: 'Izina rya mbere', lastName: 'Irindi zina', address: 'Aderesi yo gutumizirwa',
    city: 'Umujyi', notes: 'Ibisobanuro by\'itumba', optional: 'Si ngombwa',
    paymentMethod: 'Uburyo bwo kwishyura', cashOnDelivery: 'Kwishyura iyo bitumijwe',
    mobileMoneyMTN: 'MTN Mobile Money', confirmOrder: 'Emeza itumba',
    thankYou: 'Urakoze ku itumba ryawe!', orderRef: 'Nimero y\'itumba',
    noProducts: 'Nta bicuruzwa bibonetse', tryDifferent: 'Gerageza gushakisha ukundi',
  }
};

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
  });
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
  });

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => { localStorage.setItem('language', language); }, [language]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('user', JSON.stringify(user)); }, [user]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode, language, setLanguage, t,
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
      user, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
