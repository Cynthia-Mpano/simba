import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { darkMode, t } = useApp();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const dm = darkMode;
  const card = dm ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm';
  const inp = 'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ' + (dm ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-900');

  const submit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name:'', email:'', subject:'', message:'' }); };

  const locs = [
    { name:'Simba Centenary (HQ)', address:'Union Trade Centre, 1 KN 4 Ave, Kigali', phone:'+250 788 000 001' },
    { name:'Simba Gishushu', address:'KN 5 Rd, Kigali', phone:'+250 788 000 002' },
    { name:'Simba Kimironko', address:'342F+3V5, Kimironko, Kigali', phone:'+250 788 000 003' },
    { name:'Simba Kicukiro', address:'24Q5+R2R, Kigali', phone:'+250 788 000 004' },
    { name:'Simba Kigali Heights', address:'24XF+XVV, KG 192 St, Kigali', phone:'+250 788 000 005' },
    { name:'Simba UTC', address:'23H4+26V, Kigali', phone:'+250 788 000 006' },
    { name:'Simba Gacuriro', address:'24G3+MCV, Kigali', phone:'+250 788 000 007' },
    { name:'Simba Gikondo', address:'KK 35 Ave, Kigali', phone:'+250 788 000 008' },
    { name:'Simba Sonatube', address:'24J3+Q3, Kigali', phone:'+250 788 000 009' },
    { name:'Simba Kisimenti', address:'KG 541 St, Kigali', phone:'+250 788 000 010' },
    { name:'Simba Rebero', address:'8754+P7W, Gisenyi', phone:'+250 788 000 011' },
  ];

  return (
    <div className={'min-h-screen ' + (dm ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900')}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85" alt="Contact" className="w-full h-full object-cover hero-img" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-4xl font-black text-white mb-2">{t.contact}</h1>
          <p className="text-zinc-300 text-base">We're here to help — reach out anytime</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <div className={'rounded-2xl border p-8 ' + card}>
            <h2 className={'text-xl font-black mb-6 ' + (dm ? 'text-white' : 'text-slate-900')}>Send us a message</h2>
            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="text-emerald-500" size={30} /></div>
                <h3 className={'text-lg font-bold mb-1 ' + (dm ? 'text-white' : 'text-slate-900')}>Message sent!</h3>
                <p className={'text-sm ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                {[['name','Your Name','text'],['email','Email Address','email'],['subject','Subject','text']].map(([k,ph,tp]) => (
                  <div key={k}><input type={tp} required placeholder={ph} value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} className={inp} /></div>
                ))}
                <textarea required rows={5} placeholder="Your message..." value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))}
                  className={inp + ' resize-none'} />
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          <div className={'rounded-2xl border p-8 ' + card}>
            <h2 className={'text-xl font-black mb-6 ' + (dm ? 'text-white' : 'text-slate-900')}>Get in Touch</h2>
            <div className="space-y-5">
              {[
                { icon:MapPin, label:'Head Office', val:'Union Trade Centre, 1 KN 4 Ave, Kigali, Rwanda' },
                { icon:Phone, label:'Phone', val:'+250 788 000 000' },
                { icon:Mail, label:'Email', val:'info@simbasupermarket.rw' },
                { icon:Clock, label:'Opening Hours', val:'Monday – Sunday: 8:00 AM – 9:00 PM' },
              ].map((item,i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0"><item.icon className="text-orange-500" size={17} /></div>
                  <div>
                    <p className={'text-xs font-semibold mb-0.5 ' + (dm ? 'text-zinc-400' : 'text-zinc-500')}>{item.label}</p>
                    <p className={'text-sm font-medium ' + (dm ? 'text-zinc-200' : 'text-slate-800')}>{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className={'text-2xl font-black mb-6 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.ourLocations}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locs.map((loc,i) => (
            <div key={i} className={'rounded-2xl border p-5 ' + card}>
              <h3 className={'font-semibold text-sm mb-2 text-orange-500'}>{loc.name}</h3>
              <div className="flex items-start gap-2 mb-1.5">
                <MapPin size={13} className={'flex-shrink-0 mt-0.5 ' + (dm ? 'text-zinc-500' : 'text-zinc-400')} />
                <p className={'text-xs ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{loc.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className={dm ? 'text-zinc-500' : 'text-zinc-400'} />
                <p className={'text-xs ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{loc.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}