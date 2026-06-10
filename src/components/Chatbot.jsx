import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import productsData from "../simba_products.json";

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


// ── Chat UI Component ─────────────────────────────────────────────────────────
export default function Chatbot() {
  const { darkMode, language } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: RESPONSES[language]?.greeting || RESPONSES.en.greeting, products: [] }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const dm = darkMode;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), from: "user", text, products: [] };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise(r => setTimeout(r, 700 + Math.random() * 400));
    const reply = buildReply(text, language);
    setMessages(prev => [...prev, { id: Date.now() + 1, from: "bot", ...reply }]);
    setTyping(false);
  };

  const bg = dm ? "bg-zinc-900" : "bg-white";
  const border = dm ? "border-zinc-700" : "border-zinc-200";
  const inputBg = dm ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400";

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl shadow-orange-300/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className={"fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl border shadow-2xl flex flex-col overflow-hidden " + bg + " " + border}
          style={{ height: "480px" }}>

          {/* Header */}
          <div className="bg-orange-500 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Simba Assistant</p>
              <p className="text-orange-100 text-xs">Online · Ready to help</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className={"flex-1 overflow-y-auto p-4 space-y-3 " + (dm ? "bg-zinc-950" : "bg-zinc-50")}>
            {messages.map(msg => (
              <div key={msg.id} className={"flex gap-2 " + (msg.from === "user" ? "justify-end" : "justify-start")}>
                {msg.from === "bot" && (
                  <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={12} className="text-white" />
                  </div>
                )}
                <div className={"max-w-[75%]"}>
                  <div className={"px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed " +
                    (msg.from === "user"
                      ? "bg-orange-500 text-white rounded-br-sm"
                      : (dm ? "bg-zinc-800 text-zinc-100" : "bg-white text-zinc-800 border border-zinc-100") + " rounded-bl-sm")}>
                    {msg.text}
                  </div>
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {msg.products.map(p => (
                        <Link key={p.id} to={"/product/" + p.id} onClick={() => setOpen(false)}
                          className={"flex items-center gap-2.5 p-2 rounded-xl border transition-all hover:border-orange-300 hover:shadow-sm " +
                            (dm ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-100")}>
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" onError={e => e.target.style.display="none"} />
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
                  <div className="w-6 h-6 bg-zinc-300 dark:bg-zinc-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={12} className={dm ? "text-zinc-300" : "text-zinc-600"} />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot size={12} className="text-white" />
                </div>
                <div className={"px-3.5 py-2.5 rounded-2xl rounded-bl-sm " + (dm ? "bg-zinc-800" : "bg-white border border-zinc-100")}>
                  <div className="flex gap-1 items-center h-4">
                    {[0,1,2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: i*0.15+"s"}} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={send} className={"p-3 border-t flex gap-2 " + (dm ? "border-zinc-800 bg-zinc-900" : "border-zinc-100 bg-white")}>
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder={language === "rw" ? "Andika hano..." : language === "fr" ? "Tapez votre message..." : "Type a message..."}
              className={"flex-1 px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 " + inputBg} />
            <button type="submit" disabled={!input.trim()}
              className="w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
