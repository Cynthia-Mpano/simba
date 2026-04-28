import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { darkMode, t } = useApp();
  return (
    <footer className={`mt-16 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-300'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">S</div>
            <div>
              <div className="font-bold text-white text-lg">SIMBA</div>
              <div className="text-xs text-gray-400">Supermarket</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">Rwanda's largest supermarket chain. Quality products at affordable prices since 2007.</p>
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors text-xs">f</a>
            <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors text-xs">📷</a>
            <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors text-xs">𝕏</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[['/', t.home], ['/shop', t.shop], ['/about', t.about], ['/contact', t.contact], ['/cart', t.cart]].map(([path, label]) => (
              <li key={path}><Link to={path} className="hover:text-orange-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Branches */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Branches</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            {['Simba Centenary', 'Simba Gishushu', 'Simba Kimironko', 'Simba Kicukiro', 'Simba Kigali Heights', 'Simba UTC', 'Simba Gacuriro', 'Simba Gikondo', 'Simba Sonatube', 'Simba Kisimenti', 'Simba Rebero'].map(b => (
              <li key={b} className="flex items-center gap-1"><MapPin size={10} className="text-orange-400 flex-shrink-0" />{b}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={14} className="text-orange-400 mt-0.5 flex-shrink-0" /><span>Union Trade Centre, 1 KN 4 Ave, Kigali, Rwanda</span></li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-orange-400" /><span>+250 788 000 000</span></li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-orange-400" /><span>info@simbasupermarket.rw</span></li>
          </ul>
          <div className="mt-4">
            <p className="text-xs text-gray-500">Open daily: 8:00 AM – 9:00 PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Simba Supermarket Ltd. All rights reserved. | Kigali, Rwanda
      </div>
    </footer>
  );
}
