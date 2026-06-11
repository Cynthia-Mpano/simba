import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();
  const branches = ["Simba Centenary","Simba Gishushu","Simba Kimironko","Simba Kicukiro","Simba Kigali Heights","Simba UTC","Simba Gacuriro","Simba Gikondo","Simba Sonatube","Simba Kisimenti","Simba Rebero"];
  return (
    <footer className="bg-zinc-950 text-zinc-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 flex-shrink-0"><svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm"><rect width="36" height="36" rx="9" fill="#f97316"/><path d="M22.5 10.5H15a2.5 2.5 0 000 5h6a2.5 2.5 0 010 5H13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
            <div><div className="font-black text-white text-sm tracking-tight">SIMBA</div><div className="text-[10px] text-zinc-500 tracking-widest uppercase">Supermarket</div></div>
          </div>
          <p className="text-sm leading-relaxed mb-5">Rwanda's largest supermarket chain. Quality products at affordable prices since 2007.</p>
          <div className="flex items-center gap-2 text-xs"><Clock size={13} className="text-orange-400 flex-shrink-0" /><span>Open daily: 8:00 AM – 9:00 PM</span></div>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {[["/",t.home],["/shop",t.shop],["/about",t.about],["/contact",t.contact],["/cart",t.cart]].map(([p,l]) => (
              <li key={p}><Link to={p} className="hover:text-orange-400 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Opening Hours</h3>
          <ul className="space-y-2 text-sm">
            <li>Mon - Fri: 8:00 AM - 9:00 PM</li>
            <li>Saturday: 8:00 AM - 8:00 PM</li>
            <li>Sunday: 9:00 AM - 7:00 PM</li>
            <li className="text-orange-400 font-medium mt-3">11 Branches across Kigali</li>
            <li className="text-xs text-zinc-500 mt-1">Use Branch selector in nav to filter products</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin size={14} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Union Trade Centre, 1 KN 4 Ave, Kigali, Rwanda</span></li>
            <li className="flex items-center gap-2.5"><Phone size={14} className="text-orange-400" /><span>+250 788 000 000</span></li>
            <li className="flex items-center gap-2.5"><Mail size={14} className="text-orange-400" /><span>info@simbasupermarket.rw</span></li>
          </ul>
          <div className="flex gap-2 mt-5">
            {["f","in","𝕏"].map((s,i) => (
              <a key={i} href="#" className="w-8 h-8 bg-zinc-800 hover:bg-orange-500 rounded-lg flex items-center justify-center text-xs transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Simba Supermarket Ltd. All rights reserved. | Kigali, Rwanda
      </div>
    </footer>
  );
}
