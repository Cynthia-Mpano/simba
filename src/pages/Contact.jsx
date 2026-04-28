import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { darkMode, t } = useApp();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const locations = [
    { name: 'Simba Centenary (HQ)', address: 'Union Trade Centre, 1 KN 4 Ave, Kigali', phone: '+250 788 000 001' },
    { name: 'Simba Gishushu', address: 'KN 5 Rd, Kigali', phone: '+250 788 000 002' },
    { name: 'Simba Kimironko', address: '342F+3V5, Kimironko, Kigali', phone: '+250 788 000 003' },
    { name: 'Simba Kicukiro', address: '24Q5+R2R, Kigali', phone: '+250 788 000 004' },
    { name: 'Simba Kigali Heights', address: '24XF+XVV, KG 192 St, Kigali', phone: '+250 788 000 005' },
    { name: 'Simba UTC', address: '23H4+26V, Kigali', phone: '+250 788 000 006' },
    { name: 'Simba Gacuriro', address: '24G3+MCV, Kigali', phone: '+250 788 000 007' },
    { name: 'Simba Gikondo', address: 'KK 35 Ave, Kigali', phone: '+250 788 000 008' },
    { name: 'Simba Sonatube', address: '24J3+Q3, Kigali', phone: '+250 788 000 009' },
    { name: 'Simba Kisimenti', address: 'KG 541 St, Kigali', phone: '+250 788 000 010' },
    { name: 'Simba Rebero', address: '8754+P7W, Gisenyi', phone: '+250 788 000 011' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-orange-900 to-orange-700' : 'bg-gradient-to-r from-orange-500 to-orange-400'} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">{t.contact}</h1>
          <p className="text-lg opacity-90">We're here to help — reach out anytime</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Contact form */}
          <div className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-green-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[['name', 'Your Name', 'text'], ['email', 'Email Address', 'email'], ['subject', 'Subject', 'text']].map(([key, placeholder, type]) => (
                  <div key={key}>
                    <input type={type} required placeholder={placeholder} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'}`} />
                  </div>
                ))}
                <textarea required rows={5} placeholder="Your message..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'}`} />
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium">Head Office</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Union Trade Centre, 1 KN 4 Ave, Kigali, Rwanda</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-orange-500" size={20} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>+250 788 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-orange-500" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>info@simbasupermarket.rw</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-orange-500" size={20} />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monday – Sunday: 8:00 AM – 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All locations */}
        <h2 className="text-2xl font-bold mb-6">{t.ourLocations}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((loc, i) => (
            <div key={i} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h3 className="font-semibold mb-2 text-orange-500">{loc.name}</h3>
              <div className="flex items-start gap-2 mb-2">
                <MapPin size={14} className={`flex-shrink-0 mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{loc.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{loc.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
