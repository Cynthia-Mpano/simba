import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>
            <div>
              <div className="font-black text-white text-sm tracking-tight">SIMBA</div>
              <div className="text-[10px] text-gray-500 tracking-widest uppercase">Supermarket</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-5">Rwanda's largest supermarket chain. Quality products at affordable prices since 2007.</p>
          <div className="flex items-center gap-2 text-xs">
            <Clock size={13} className="text-orange-400 flex-shrink-0" />
            <span>Open daily: 8:00 AM – 9:00 PM</span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            {[['/', t.home],['/shop', t.shop],['/about', t.about],['/contact', t.contact],['/cart', t.cart]].map(([p, l]) => (
              <li key={p}><Link to={p} className="hover:text-orange-400 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Our Branches</h3>
          <ul className="space-y-1.5 text-xs">
            {['Simba Centenary','Simba Gishushu','Simba Kimironko','Simba Kicukiro','Simba Kigali Heights','Simba UTC','Simba Gacuriro','Simba Gikondo','Simba Sonatube','Simba Kisimenti','Simba Rebero'].map(b => (
              <li key={b} className="flex items-center gap-1.5"><MapPin size={9} className="text-orange-400 flex-shrink-0" />{b}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5"><MapPin size={14} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Union Trade Centre, 1 KN 4 Ave, Kigali, Rwanda</span></li>
            <li className="flex items-center gap-2.5"><Phone size={14} className="text-orange-400" /><span>+250 788 000 000</span></li>
            <li className="flex items-center gap-2.5"><Mail size={14} className="text-orange-400" /><span>info@simbasupermarket.rw</span></li>
          </ul>
          <div className="mt-5 flex gap-2">
            {['f','in','𝕏'].map((s,i) => (
              <a key={i} href="#" className="w-8 h-8 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center text-xs transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-900 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Simba Supermarket Ltd. All rights reserved. | Kigali, Rwanda
      </div>
    </footer>
  );
}
