# Write complete new Chatbot.jsx - fixed version
code = open("simba-supermarket/src/components/Chatbot.jsx", "w", encoding="utf-8")
code.write(r"""
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import productsData from "../simba_products.json";

const ALL_PRODUCTS = productsData.products;

const R = {
  en: {
    greeting: "Hi! I'm Simba Assistant 🦁 I can help you find products, check prices, learn about delivery, payment methods, and more. What are you looking for?",
    outOfScope: "I'm specifically designed to help with Simba Supermarket shopping. I can help you find products, check prices, learn about delivery or payment. What would you like to know?",
    noProduct: "I couldn't find that exact product. Try a shorter keyword like 'milk', 'oil', 'flour', or ask me to recommend something!",
    recommend: "Here are some popular products you might like:",
    help: "I can help you with:\n• Finding products by name or category\n• Checking prices\n• Delivery info\n• Payment options (MoMo, Airtel)\n• Branch locations\n\nJust ask me anything!",
    order: "To order: browse products → Add to Cart → Checkout. You can pay with MTN MoMo, Airtel Money, or Cash on Delivery!",
    delivery: "Free delivery on orders over 50,000 RWF. Estimated 24-48 hours to Kigali. We deliver to all areas served by our 11 branches.",
    branches: "We have 11 branches in Kigali: Centenary (UTC, KN 4 Ave), Gishushu, Kimironko, Kicukiro, Kigali Heights, UTC, Gacuriro, Gikondo, Sonatube, Kisimenti, and Rebero.",
    payment: "We accept: 📱 MTN Mobile Money (078/079 numbers), 📲 Airtel Money (073/072 numbers), and 💵 Cash on Delivery. All mobile payments use secure USSD confirmation.",
    categories: "Our categories: 🥦 Food Products, 🍷 Alcoholic Drinks, 👶 Baby Products, 💄 Cosmetics, 🏋️ Sports & Wellness, 🍳 Kitchenware, 🧹 Cleaning & Sanitary, 🐾 Pet Care, and more!",
    thanks: "You're welcome! Happy shopping at Simba 🛒 Is there anything else I can help with?",
    bye: "Goodbye! Come back anytime. Happy shopping! 🦁",
    price: "I can search for specific products with their prices. What product are you looking for?",
  },
  fr: {
    greeting: "Bonjour! Je suis l'assistant Simba 🦁 Je peux vous aider à trouver des produits, vérifier les prix, la livraison et plus. Que recherchez-vous?",
    outOfScope: "Je suis conçu pour aider avec les achats chez Simba. Je peux vous aider à trouver des produits, vérifier les prix ou les livraisons. Que voulez-vous savoir?",
    noProduct: "Je n'ai pas trouvé ce produit. Essayez un mot plus court comme 'lait', 'huile', 'farine', ou demandez-moi une recommandation!",
    recommend: "Voici quelques produits populaires:",
    help: "Je peux vous aider avec:\n• Trouver des produits\n• Vérifier les prix\n• Infos livraison\n• Options de paiement\n• Localisation des succursales",
    order: "Pour commander: parcourez les produits → Ajouter au panier → Commander. Vous pouvez payer avec MTN MoMo, Airtel Money ou espèces!",
    delivery: "Livraison gratuite pour les commandes supérieures à 50 000 RWF. Livraison estimée en 24-48h à Kigali.",
    branches: "Nous avons 11 succursales à Kigali: Centenary, Gishushu, Kimironko, Kicukiro, Kigali Heights, UTC, Gacuriro, Gikondo, Sonatube, Kisimenti et Rebero.",
    payment: "Nous acceptons: 📱 MTN Mobile Money, 📲 Airtel Money, et 💵 Paiement à la livraison.",
    categories: "Nos catégories: Alimentation, Boissons, Produits bébé, Cosmétiques, Sport, Cuisine, Nettoyage, Animaux et plus!",
    thanks: "De rien! Bon shopping chez Simba 🛒 Puis-je vous aider avec autre chose?",
    bye: "Au revoir! Bonne shopping! 🦁",
    price: "Je peux chercher des produits avec leurs prix. Quel produit cherchez-vous?",
  },
  rw: {
    greeting: "Muraho! Ndi umufasha wa Simba 🦁 Nshobora kukufasha gushaka ibicuruzwa, kureba ibiciro, uburyo bwo gutumiza n'ibindi. Ni iki ushaka?",
    outOfScope: "Ndi gufasha guterura kuri Simba Supermarket. Nshobora kukufasha gushaka ibicuruzwa, kureba ibiciro cyangwa uburyo bwo gutumiza. Ni iki ushaka kumenya?",
    noProduct: "Sinabonye icyo gicuruzwa. Gerageza ijambo rigufi nka 'amata', 'amavuta', 'ubufu', cyangwa usabe amaze ashya!",
    recommend: "Dore ibicuruzwa bikunzwe:",
    help: "Nshobora kukufasha:\n• Gushaka ibicuruzwa\n• Kureba ibiciro\n• Amakuru yo gutumiza\n• Uburyo bwo kwishyura\n• Aho amashami abarizwa",
    order: "Kugira ngo utumize: reba ibicuruzwa → Shyira mu gasanduku → Soza kugura. Ushobora kwishyura na MTN MoMo, Airtel Money, cyangwa amafaranga!",
    delivery: "Gutumiza ubuntu ku bitumba birenze 50,000 RWF. Gutumizwa kwegerejwe: amasaha 24-48 i Kigali.",
    branches: "Dufite amashami 11 i Kigali: Centenary, Gishushu, Kimironko, Kicukiro, Kigali Heights, UTC, Gacuriro, Gikondo, Sonatube, Kisimenti, na Rebero.",
    payment: "Twakira: 📱 MTN Mobile Money, 📲 Airtel Money, n'amafaranga iyo bitumijwe.",
    categories: "Ibyiciro byacu: Ibiryo, Inzoga, Ibicuruzwa by'abana, Cosmetique, Siporo, Gikoni, Isukura, Inyamaswa n'ibindi!",
    thanks: "Nta kibazo! Guterura neza kuri Simba 🛒 Hari ikindi nakora?",
    bye: "Murabeho! Guterura neza! 🦁",
    price: "Nshobora gushaka ibicuruzwa n'ibiciro byabyo. Ni ikihe gicuruzwa ushaka?",
  }
};

const OFF_TOPIC = [/weather|climat|ikirere/,/politic|election/,/sport|football|soccer/,/\bnews\b|actualit/,/\bjoke\b|blague/,/math|calcul/,/history|histoire/,/science|biology|physics/,/\bcode\b|programming|developer/,/recipe|recette|iby'indya/,/medical|doctor|health(?! product)/,/\bflight\b|\btrain\b|\bhotel\b/];

function detectIntent(msg) {
  const m = msg.toLowerCase();
  if (/^(hi|hello|hey|muraho|bonjour|salut|good morning|good afternoon)\b/.test(m)) return "greeting";
  if (/thank|merci|urakoze|asante/.test(m)) return "thanks";
  if (/\bbye\b|goodbye|murabeho|au revoir/.test(m)) return "bye";
  if (/help|aide|nkundire|what can you|what do you/.test(m)) return "help";
  if (/how.*order|place.*order|how.*buy|comment.*commander|uburyo.*gura/.test(m)) return "order";
  if (/deliver|livrai|gutumiz|shipping/.test(m)) return "delivery";
  if (/branch|succursale|amashami|location|where.*shop|store/.test(m)) return "branches";
  if (/pay|momo|airtel|cash|kwishyura|paiement|payment/.test(m)) return "payment";
  if (/categor|department|section|icyiciro/.test(m)) return "categories";
  if (/recommend|suggest|popular|best|ibicuruzwa byiza|meilleur|what.*good/.test(m)) return "recommend";
  if (/price|cost|combien|igiciro|how much/.test(m)) return "price";
  return "search";
}

function searchProducts(query) {
  if (!query || query.length < 2) return [];
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if (!words.length) return [];
  return ALL_PRODUCTS.filter(p => {
    const name = p.name.toLowerCase();
    const cat = p.category.toLowerCase();
    return words.some(w => name.includes(w) || cat.includes(w));
  }).filter(p => p.inStock).slice(0, 4);
}

function getRecommendations() {
  const picks = ALL_PRODUCTS.filter(p => p.inStock && p.price < 15000);
  const shuffled = [...picks].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}

function buildReply(msg, lang) {
  const resp = R[lang] || R.en;
  const m = msg.trim();
  if (!m) return { text: resp.greeting, products: [] };
  if (OFF_TOPIC.some(r => r.test(m.toLowerCase()))) return { text: resp.outOfScope, products: [] };
  const intent = detectIntent(m);
  switch (intent) {
    case "greeting":   return { text: resp.greeting, products: [] };
    case "thanks":     return { text: resp.thanks, products: [] };
    case "bye":        return { text: resp.bye, products: [] };
    case "help":       return { text: resp.help, products: [] };
    case "order":      return { text: resp.order, products: [] };
    case "delivery":   return { text: resp.delivery, products: [] };
    case "branches":   return { text: resp.branches, products: [] };
    case "payment":    return { text: resp.payment, products: [] };
    case "categories": return { text: resp.categories, products: [] };
    case "price":      return { text: resp.price, products: searchProducts(m) };
    case "recommend": { const recs = getRecommendations(); return { text: resp.recommend, products: recs }; }
    default: {
      const found = searchProducts(m);
      if (found.length > 0) return { text: resp.recommend, products: found };
      return { text: resp.noProduct, products: [] };
    }
  }
}

const QUICK_REPLIES = {
  en: ["Show recommendations", "Delivery info", "Payment options", "Our branches"],
  fr: ["Recommandations", "Livraison", "Paiement", "Nos succursales"],
  rw: ["Ibicuruzwa byiza", "Gutumiza", "Kwishyura", "Amashami"],
};

export default function Chatbot() {
  const { darkMode, language } = useApp();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const dm = darkMode;

  // Reset greeting when language changes or first open
  useEffect(() => {
    setMsgs([{ id: 1, from: "bot", text: (R[language] || R.en).greeting, products: [] }]);
  }, [language]);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [msgs, open]);

  const reply = useCallback((text) => {
    const result = buildReply(text, language);
    setTyping(true);
    setTimeout(() => {
      setMsgs(prev => [...prev, { id: Date.now(), from: "bot", ...result }]);
      setTyping(false);
    }, 600 + Math.random() * 500);
  }, [language]);

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setMsgs(prev => [...prev, { id: Date.now(), from: "user", text, products: [] }]);
    setInput("");
    reply(text);
  };

  const quickReply = (text) => {
    if (typing) return;
    setMsgs(prev => [...prev, { id: Date.now(), from: "user", text, products: [] }]);
    reply(text);
  };

  const bg = dm ? "bg-zinc-900" : "bg-white";
  const borderC = dm ? "border-zinc-700" : "border-zinc-200";
  const msgsBg = dm ? "bg-zinc-950" : "bg-zinc-50";
  const inputCls = "flex-1 pr-3.5 pl-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 " + (dm ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400");

  return (
    <>
      {/* Floating trigger */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label="Open chat">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className={"fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden " + bg + " " + borderC}
          style={{ height: "520px" }}>

          {/* Header */}
          <div className="bg-orange-500 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <img src="/simba-logo.avif" alt="Simba" className="w-8 h-8 rounded-lg object-contain bg-white/20 p-0.5" onError={e => { e.target.style.display="none"; }} />
            <div className="flex-1">
              <p className="text-white font-bold text-sm leading-none">Simba Assistant</p>
              <p className="text-orange-100 text-xs mt-0.5">🟢 Online · Replies instantly</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1"><X size={17} /></button>
          </div>

          {/* Messages */}
          <div className={"flex-1 overflow-y-auto p-3 space-y-3 " + msgsBg}>
            {msgs.map(msg => (
              <div key={msg.id} className={"flex gap-2 " + (msg.from === "user" ? "justify-end" : "justify-start")}>
                {msg.from === "bot" && (
                  <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={11} className="text-white" />
                  </div>
                )}
                <div className="max-w-[78%]">
                  <div className={"px-3.5 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line " +
                    (msg.from === "user"
                      ? "bg-orange-500 text-white rounded-br-sm"
                      : (dm ? "bg-zinc-800 text-zinc-100 border border-zinc-700" : "bg-white text-zinc-800 border border-zinc-100 shadow-sm") + " rounded-bl-sm")}>
                    {msg.text}
                  </div>
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {msg.products.map(p => (
                        <Link key={p.id} to={"/product/" + p.id} onClick={() => setOpen(false)}
                          className={"flex items-center gap-2.5 p-2 rounded-xl border transition-all hover:border-orange-400 " +
                            (dm ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700" : "bg-white border-zinc-100 hover:shadow-sm")}>
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-zinc-100"
                            onError={e => { e.target.src = "https://via.placeholder.com/40"; }} />
                          <div className="flex-1 min-w-0">
                            <p className={"text-xs font-semibold line-clamp-1 " + (dm ? "text-zinc-200" : "text-zinc-800")}>{p.name}</p>
                            <p className="text-xs text-orange-500 font-bold">{p.price.toLocaleString()} RWF</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {msg.from === "user" && (
                  <div className={"w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 " + (dm ? "bg-zinc-700" : "bg-zinc-200")}>
                    <User size={11} className={dm ? "text-zinc-400" : "text-zinc-500"} />
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot size={11} className="text-white" />
                </div>
                <div className={"px-3.5 py-3 rounded-2xl rounded-bl-sm " + (dm ? "bg-zinc-800 border border-zinc-700" : "bg-white border border-zinc-100 shadow-sm")}>
                  <div className="flex gap-1 items-center">
                    {[0,1,2].map(i => (
                      <span key={i} className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: i * 0.18 + "s" }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className={"flex gap-2 px-3 py-2 overflow-x-auto flex-shrink-0 border-t " + (dm ? "border-zinc-800 bg-zinc-900" : "border-zinc-100 bg-white")}>
            {(QUICK_REPLIES[language] || QUICK_REPLIES.en).map(qr => (
              <button key={qr} onClick={() => quickReply(qr)} disabled={typing}
                className={"flex-shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium transition-colors disabled:opacity-40 " +
                  (dm ? "border-zinc-700 text-zinc-300 hover:border-orange-500 hover:text-orange-400" : "border-zinc-200 text-zinc-600 hover:border-orange-400 hover:text-orange-500")}>
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={send} className={"p-3 border-t flex gap-2 flex-shrink-0 " + (dm ? "border-zinc-800 bg-zinc-900" : "border-zinc-100 bg-white")}>
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              placeholder={language === "rw" ? "Andika hano..." : language === "fr" ? "Tapez votre message..." : "Ask me anything..."}
              className={inputCls} />
            <button type="submit" disabled={!input.trim() || typing}
              className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
""".lstrip("\n"))
code.close()
print("Chatbot written:", len(open("simba-supermarket/src/components/Chatbot.jsx",encoding="utf-8").readlines()), "lines")
