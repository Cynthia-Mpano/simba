import { Award, Users, Target, Heart, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function About() {
  const { darkMode, t } = useApp();

  const locations = [
    { name: 'Simba Centenary', address: 'Union Trade Centre, 1 KN 4 Ave, Kigali' },
    { name: 'Simba Gishushu', address: 'KN 5 Rd, Kigali' },
    { name: 'Simba Kimironko', address: '342F+3V5, Kimironko, Kigali' },
    { name: 'Simba Kicukiro', address: '24Q5+R2R, Kigali' },
    { name: 'Simba Kigali Heights', address: '24XF+XVV, KG 192 St, Kigali' },
    { name: 'Simba UTC', address: '23H4+26V, Kigali' },
    { name: 'Simba Gacuriro', address: '24G3+MCV, Kigali' },
    { name: 'Simba Gikondo', address: 'KK 35 Ave, Kigali' },
    { name: 'Simba Sonatube', address: '24J3+Q3, Kigali' },
    { name: 'Simba Kisimenti', address: 'KG 541 St, Kigali' },
    { name: 'Simba Rebero', address: '8754+P7W, Gisenyi' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-orange-900 to-orange-700' : 'bg-gradient-to-r from-orange-500 to-orange-400'} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.aboutUs}</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">Rwanda's largest and most trusted supermarket chain since 2007</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.ourStory}</h2>
          <div className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              SIMBA SUPERMARKET LTD, established on December 3, 2007, as a Limited Liability Company, aims to become the region's largest retail outlet. Importing products from Europe, Egypt, Dubai, China, Turkey, and other countries, the company ensures a diverse product range.
            </p>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The official launch took place on August 8, 2008, creating over 450 jobs for Rwandese. SIMBA SUPERMARKET LTD offers a variety of products, including food, furniture, clothing, stationary, cosmetics, and toys. With branches across Rwanda, including the latest one in Kigali, the company provides services such as a butchery, bakery, and coffee shop, aiming for a one-stop shopping experience.
            </p>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Known for quality products at affordable prices, SIMBA SUPERMARKET LTD serves international organizations, local NGOs, private companies, and government ministries, earning a reputation as one of Rwanda's most admired supermarkets.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.ourValues}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Respect for the Individual', desc: "We're hardworking, ordinary people who've teamed up to accomplish extraordinary things. We treat each other with dignity and encourage everyone to express their thoughts and ideas." },
              { icon: Heart, title: 'Service to Customers', desc: 'Our customers are the reason we\'re in business. We offer quality merchandise at the lowest prices with the best customer service possible, always looking to exceed expectations.' },
              { icon: Target, title: 'Striving for Excellence', desc: "We're proud of our accomplishments but never satisfied. We constantly reach further to bring new ideas and goals to life, always asking: Is this the best I can do?" }
            ].map((v, i) => (
              <div key={i} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <v.icon className="text-orange-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t.achievements}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '1st Best Exhibitor Retail & Distribution 2013',
              'Best Exhibitor Retail & Distribution 2014',
              'RRA Best Compliant Taxpayer 2015',
              '1st Merchant Of The Year 2020 in Rwanda'
            ].map((a, i) => (
              <div key={i} className={`p-6 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-orange-50'}`}>
                <Award className="text-orange-500 mx-auto mb-3" size={32} />
                <p className="text-sm font-medium">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h2 className="text-3xl font-bold mb-6">{t.ourLocations}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((loc, i) => (
              <div key={i} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-3">
                  <MapPin className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h3 className="font-semibold mb-1">{loc.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{loc.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
