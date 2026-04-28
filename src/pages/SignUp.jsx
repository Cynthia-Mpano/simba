import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SignUp() {
  const { darkMode, t, login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === form.email)) {
      setError('An account with this email already exists.');
      setLoading(false);
      return;
    }
    users.push({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    localStorage.setItem('users', JSON.stringify(users));
    login({ name: form.name, email: form.email, phone: form.phone });
    navigate('/');
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md rounded-2xl p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white shadow-lg text-gray-900'}`}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">S</div>
          <h1 className="text-2xl font-bold">{t.createAccount}</h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Join Simba Supermarket today</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ['name', t.fullName, 'text'],
            ['email', t.email, 'email'],
            ['phone', t.phone, 'tel']
          ].map(([key, label, type]) => (
            <div key={key}>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
              <input type={type} required value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
            </div>
          ))}
          {[['password', t.password], ['confirm', 'Confirm Password']].map(([key, label]) => (
            <div key={key}>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
                {key === 'password' && (
                  <button type="button" onClick={() => setShowPw(!showPw)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-70">
            {loading ? 'Creating account...' : t.createAccount}
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {t.alreadyHave}{' '}
          <Link to="/signin" className="text-orange-500 hover:text-orange-600 font-medium">{t.signIn}</Link>
        </p>
      </div>
    </div>
  );
}
