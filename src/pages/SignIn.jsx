import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SignIn() {
  const { darkMode, t, login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    // Seed admin account if not exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.find(u => u.email === 'admin@simba.rw')) {
      users.push({ name: 'Admin', email: 'admin@simba.rw', phone: '+250788000000', password: 'admin123', role: 'admin' });
      localStorage.setItem('users', JSON.stringify(users));
    }
    const found = users.find(u => u.email === form.email && u.password === form.password);
    if (found) {
      login({ name: found.name, email: found.email, phone: found.phone, role: found.role || 'user' });
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md rounded-2xl p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white shadow-lg text-gray-900'}`}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">S</div>
          <h1 className="text-2xl font-bold">{t.signIn}</h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back to Simba Supermarket</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.email}</label>
            <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t.password}</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className={`w-full px-4 py-3 pr-12 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
              <button type="button" onClick={() => setShowPw(!showPw)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-70">
            {loading ? 'Signing in...' : t.signIn}
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {t.dontHave}{' '}
          <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-medium">{t.signUp}</Link>
        </p>
        <div className={`mt-4 p-3 rounded-xl text-xs text-center ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
          Admin demo: <strong>admin@simba.rw</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}
