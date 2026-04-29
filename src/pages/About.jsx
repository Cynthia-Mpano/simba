import { Award, Users, Target, Heart, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function About() {
  const { darkMode, t } = useApp();
  const dm = darkMode;
  const card = dm ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm';
  const locs = [
    { name:'Simba Centenary', address:'Union Trade Centre, 1 KN 4 Ave, Kigali' },
    { name:'Simba Gishushu', address:'KN 5 Rd, Kigali' },
    { name:'Simba Kimironko', address:'342F+3V5, Kimironko, Kigali' },
    { name:'Simba Kicukiro', address:'24Q5+R2R, Kigali' },
    { name:'Simba Kigali Heights', address:'24XF+XVV, KG 192 St, Kigali' },
    { name:'Simba UTC', address:'23H4+26V, Kigali' },
    { name:'Simba Gacuriro', address:'24G3+MCV, Kigali' },
    { name:'Simba Gikondo', address:'KK 35 Ave, Kigali' },
    { name:'Simba Sonatube', address:'24J3+Q3, Kigali' },
    { name:'Simba Kisimenti', address:'KG 541 St, Kigali' },
    { name:'Simba Rebero', address:'8754+P7W, Gisenyi' },
  ];

  return (
    <div className={'min-h-screen ' + (dm ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900')}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&q=85" alt="Simba" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{t.aboutUs}</h1>
          <p className="text-slate-300 text-lg max-w-xl">Rwanda's largest and most trusted supermarket chain since 2007</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-14">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className={'text-2xl font-black mb-4 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.ourStory}</h2>
            <div className="space-y-4">
              <p className={'text-sm leading-relaxed ' + (dm ? 'text-slate-300' : 'text-slate-600')}>SIMBA SUPERMARKET LTD, established on December 3, 2007, aims to become the region's largest retail outlet. Importing products from Europe, Egypt, Dubai, China, Turkey, and other countries, the company ensures a diverse product range.</p>
              <p className={'text-sm leading-relaxed ' + (dm ? 'text-slate-300' : 'text-slate-600')}>The official launch took place on August 8, 2008, creating over 450 jobs for Rwandese. With branches across Rwanda, the company provides services such as a butchery, bakery, and coffee shop, aiming for a one-stop shopping experience.</p>
              <p className={'text-sm leading-relaxed ' + (dm ? 'text-slate-300' : 'text-slate-600')}>Known for quality products at affordable prices, SIMBA SUPERMARKET LTD serves international organizations, local NGOs, private companies, and government ministries.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=85" alt="Simba Store" className="w-full h-full object-cover" />
          </div>
        </div>

        <div>
          <h2 className={'text-2xl font-black mb-6 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.ourValues}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon:Users, title:'Respect for the Individual', desc:"We're hardworking people who've teamed up to accomplish extraordinary things. We treat each other with dignity and encourage everyone to express their thoughts." },
              { icon:Heart, title:'Service to Customers', desc:"Our customers are the reason we're in business. We offer quality merchandise at the lowest prices with the best customer service possible." },
              { icon:Target, title:'Striving for Excellence', desc:"We're proud of our accomplishments but never satisfied. We constantly reach further to bring new ideas and goals to life." },
            ].map((v,i) => (
              <div key={i} className={'rounded-2xl border p-6 ' + card}>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4"><v.icon className="text-orange-500" size={22} /></div>
                <h3 className={'font-bold mb-2 ' + (dm ? 'text-white' : 'text-slate-900')}>{v.title}</h3>
                <p className={'text-sm leading-relaxed ' + (dm ? 'text-slate-400' : 'text-slate-600')}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={'text-2xl font-black mb-6 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.achievements}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['1st Best Exhibitor Retail & Distribution 2013','Best Exhibitor Retail & Distribution 2014','RRA Best Compliant Taxpayer 2015','1st Merchant Of The Year 2020 in Rwanda'].map((a,i) => (
              <div key={i} className={'rounded-2xl border p-5 text-center ' + card}>
                <Award className="text-orange-500 mx-auto mb-3" size={28} />
                <p className={'text-sm font-semibold ' + (dm ? 'text-slate-200' : 'text-slate-700')}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={'text-2xl font-black mb-6 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.ourLocations}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locs.map((loc,i) => (
              <div key={i} className={'rounded-2xl border p-5 flex items-start gap-3 ' + card}>
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin className="text-orange-500" size={16} /></div>
                <div>
                  <h3 className={'font-semibold text-sm mb-0.5 ' + (dm ? 'text-white' : 'text-slate-900')}>{loc.name}</h3>
                  <p className={'text-xs ' + (dm ? 'text-slate-400' : 'text-slate-500')}>{loc.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}