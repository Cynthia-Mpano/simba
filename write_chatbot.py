f = open("simba-supermarket/src/components/Chatbot.jsx", "a", encoding="utf-8")
f.write("""
// ── i18n responses ─────────────────────────────────────────────────────────
const RESPONSES = {
  en: {
    greeting: "Hi! I'm Simba Assistant 🦁 How can I help you shop today?",
    outOfScope: "I'm here to help with Simba Supermarket shopping! Ask me about products, prices, categories, or how to order.",
    noProduct: "I couldn't find that product. Try searching in our shop or ask me for recommendations!",
    recommend: "Here are some popular products you might like:",
    help: "I can help you with: finding products, checking prices, browsing categories, or learning how to order.",
    orderHelp: "To place an order: add items to your cart, then go to checkout. You can pay with MTN MoMo, Airtel Money, or cash on delivery!",
    delivery: "We offer free delivery on orders over 50,000 RWF. Estimated delivery is 24-48 hours to Kigali.",
    branches: "We have 11 branches across Kigali: Centenary, Gishushu, Kimironko, Kicukiro, Kigali Heights, UTC, Gacuriro, Gikondo, Sonatube, Kisimenti, and Rebero.",
    payment: "We accept MTN Mobile Money, Airtel Money, and Cash on Delivery. Payments are secure and confirmed via USSD.",
    categories: "We carry: Food Products, Alcoholic Drinks, Baby Products, Cosmetics, Sports & Wellness, Kitchenware, Cleaning & Sanitary, and more!",
    thanks: "You're welcome! Happy shopping at Simba 🛒",
    bye: "Goodbye! Come back anytime. Happy shopping! 🦁",
  },
  fr: {
    greeting: "Bonjour! Je suis l'assistant Simba 🦁 Comment puis-je vous aider?",
    outOfScope: "Je suis ici pour vous aider avec vos achats chez Simba! Posez-moi des questions sur les produits, les prix ou les commandes.",
    noProduct: "Je n'ai pas trouve ce produit. Essayez de chercher dans notre boutique!",
    recommend: "Voici quelques produits populaires:",
    help: "Je peux vous aider avec: trouver des produits, verifier les prix, parcourir les categories, ou passer une commande.",
    orderHelp: "Pour passer une commande: ajoutez des articles au panier, puis allez a la caisse. Vous pouvez payer avec MTN MoMo, Airtel Money ou en especes!",
    delivery: "Livraison gratuite pour les commandes superieures a 50 000 RWF. Livraison estimee en 24-48 heures a Kigali.",
    branches: "Nous avons 11 succursales a Kigali: Centenary, Gishushu, Kimironko, Kicukiro, Kigali Heights, UTC, Gacuriro, Gikondo, Sonatube, Kisimenti et Rebero.",
    payment: "Nous acceptons MTN Mobile Money, Airtel Money et le paiement en especes a la livraison.",
    categories: "Nous proposons: Alimentation, Boissons, Produits bebe, Cosmetiques, Sport, Cuisine et plus!",
    thanks: "De rien! Bon shopping chez Simba 🛒",
    bye: "Au revoir! Bonne shopping! 🦁",
  },
  rw: {
    greeting: "Muraho! Ndi umufasha wa Simba 🦁 Ni iki nakora kugira ngo ngufashe guterura uyu munsi?",
    outOfScope: "Ndi hano kugufasha guterura kuri Simba Supermarket! Baza ibibazo bijyanye n'ibicuruzwa, ibiciro, cyangwa uburyo bwo gutumiza.",
    noProduct: "Sinabonye igicuruzwa cyo gushaka. Gerageza gushakisha mu isoko ryacu!",
    recommend: "Dore ibicuruzwa bikunzwe:",
    help: "Nshobora kukufasha: gushaka ibicuruzwa, kureba ibiciro, kureba ibyiciro, cyangwa wige uburyo bwo gutumiza.",
    orderHelp: "Kugira ngo utumize: shyira ibicuruzwa mu gasanduku, hanyuma ujye ku kwishyura. Ushobora kwishyura na MTN MoMo, Airtel Money, cyangwa amafaranga iyo bitumijwe!",
    delivery: "Gutumiza ubuntu ku bitumba birenze 50,000 RWF. Gutumizwa kwegerejwe ni amasaha 24-48 i Kigali.",
    branches: "Dufite amashami 11 i Kigali: Centenary, Gishushu, Kimironko, Kicukiro, Kigali Heights, UTC, Gacuriro, Gikondo, Sonatube, Kisimenti, na Rebero.",
    payment: "Twakira MTN Mobile Money, Airtel Money, n'amafaranga iyo bitumijwe.",
    categories: "Turimo: Ibiryo, Inzoga, Ibicuruzwa by'abana, Cosmetique, Siporo, Gikoni n'ibindi!",
    thanks: "Nta kibazo! Guterura neza kuri Simba 🛒",
    bye: "Murabeho! Guterura neza! 🦁",
  }
};

// ── Intent detection ─────────────────────────────────────────────────────────
function detectIntent(msg) {
  const m = msg.toLowerCase();
  if (/hello|hi|hey|muraho|bonjour|salut/.test(m)) return "greeting";
  if (/thank|merci|urakoze/.test(m)) return "thanks";
  if (/bye|goodbye|ciao|murabeho|au revoir/.test(m)) return "bye";
  if (/help|aide|nkundire|what can you/.test(m)) return "help";
  if (/order|command|tumiz|acheter|guter/.test(m)) return "order";
  if (/deliver|livrai|tumiz/.test(m)) return "delivery";
  if (/branch|succursale|aho|location|where/.test(m)) return "branches";
  if (/pay|momo|airtel|cash|kwishyura|paiement/.test(m)) return "payment";
  if (/categor|categ|section|icyiciro/.test(m)) return "categories";
  if (/recommend|suggest|best|popular|ibicuruzwa byiza|meilleur/.test(m)) return "recommend";
  return "search";
}

// ── Product search ────────────────────────────────────────────────────────────
function searchProducts(query) {
  const q = query.toLowerCase();
  return productsData.products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  ).slice(0, 4);
}

function getRecommendations() {
  return productsData.products.filter(p => p.inStock).slice(0, 4);
}

// ── Out-of-scope guard ────────────────────────────────────────────────────────
const OFF_TOPIC = [
  /weather|meteo|ikirere/,
  /politic|election|vot/,
  /sport|football|soccer/,
  /news|actual|amakuru y.isi/,
  /joke|humour|blague/,
  /math|calcul|mathematics/,
  /history|histoire|historia/,
  /science|biology|physics/,
  /code|program|developer/,
];

function isOffTopic(msg) {
  const m = msg.toLowerCase();
  return OFF_TOPIC.some(r => r.test(m));
}

// ── Build bot reply ───────────────────────────────────────────────────────────
function buildReply(msg, lang) {
  const R = RESPONSES[lang] || RESPONSES.en;
  if (isOffTopic(msg)) return { text: R.outOfScope, products: [] };
  const intent = detectIntent(msg);
  switch (intent) {
    case "greeting":   return { text: R.greeting, products: [] };
    case "thanks":     return { text: R.thanks, products: [] };
    case "bye":        return { text: R.bye, products: [] };
    case "help":       return { text: R.help, products: [] };
    case "order":      return { text: R.orderHelp, products: [] };
    case "delivery":   return { text: R.delivery, products: [] };
    case "branches":   return { text: R.branches, products: [] };
    case "payment":    return { text: R.payment, products: [] };
    case "categories": return { text: R.categories, products: [] };
    case "recommend": {
      const recs = getRecommendations();
      return { text: R.recommend, products: recs };
    }
    default: {
      const found = searchProducts(msg);
      if (found.length > 0) return { text: R.recommend, products: found };
      return { text: R.noProduct, products: [] };
    }
  }
}

""")
f.close()
print("part1 ok")
