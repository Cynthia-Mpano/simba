f = open("simba-supermarket/src/components/Chatbot.jsx", "a", encoding="utf-8")
f.write("""
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
""")
f.close()
print("part2 ok")
