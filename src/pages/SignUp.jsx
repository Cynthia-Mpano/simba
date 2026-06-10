import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SignUp() {
  const { darkMode, t, login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirm:'' });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const dm = darkMode;

  const submit = async e => {
    e.preventDefault(); setErr('');
    if (form.password !== form.confirm) { setErr('Passwords do not match.'); return; }
    if (form.password.length < 6) { setErr('Password must be at least 6 characters.'); return; }
    setBusy(true);
    await new Promise(r => setTimeout(r, 600));
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    if (users.find(u => u.email===form.email)) { setErr('An account with this email already exists.'); setBusy(false); return; }
    users.push({ name:form.name, email:form.email, phone:form.phone, password:form.password, role:'user' });
    localStorage.setItem('users', JSON.stringify(users));
    login({ name:form.name, email:form.email, phone:form.phone, role:'user' });
    navigate('/');
    setBusy(false);
  };

  const inp = 'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ' + (dm ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-900');

  return (
    <div className={'min-h-screen flex ' + (dm ? 'bg-zinc-950' : 'bg-slate-50')}>
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85" alt="Simba" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 flex-shrink-0"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"><rect width="48" height="48" rx="12" fill="#f97316"/><path d="M30 14H20a3.5 3.5 0 000 7h8a3.5 3.5 0 010 7H18" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg></div>
            <div><div className="font-black text-white text-xl">SIMBA</div><div className="text-zinc-400 text-xs tracking-widest uppercase">Supermarket</div></div>
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">Join Rwanda's<br/>Favourite Supermarket</h2>
          <p className="text-zinc-300 text-base">Create your account and start shopping today.</p>
        </div>
      </div>
      <div className={'flex flex-col justify-center px-6 py-12 w-full lg:w-[440px] lg:flex-shrink-0 ' + (dm ? 'bg-zinc-900' : 'bg-white')}>
        <div className="max-w-sm mx-auto w-full">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 flex-shrink-0"><svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm"><rect width="36" height="36" rx="9" fill="#f97316"/><path d="M22.5 10.5H15a2.5 2.5 0 000 5h6a2.5 2.5 0 010 5H13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg></div>
            <div className="font-black text-sm text-orange-500">SIMBA Supermarket</div>
          </div>
          <h1 className={'text-2xl font-black mb-1 ' + (dm ? 'text-white' : 'text-slate-900')}>{t.createAccount}</h1>
          <p className={'text-sm mb-7 ' + (dm ? 'text-zinc-500' : 'text-zinc-500')}>Join Simba Supermarket today</p>

          {err && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{err}</div>}

          <form onSubmit={submit} className="space-y-4">
            {[['name',t.fullName,'text'],['email',t.email,'email'],['phone',t.phone,'tel']].map(([k,l,tp]) => (
              <div key={k}>
                <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{l}</label>
                <input type={tp} required value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} className={inp} />
              </div>
            ))}
            {[['password',t.password],['confirm','Confirm Password']].map(([k,l]) => (
              <div key={k}>
                <label className={'block text-xs font-semibold mb-1.5 ' + (dm ? 'text-zinc-400' : 'text-slate-600')}>{l}</label>
                <div className="relative">
                  <input type={show?'text':'password'} required value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} className={inp + ' pr-12'} />
                  {k==='password' && <button type="button" onClick={() => setShow(!show)} className={'absolute right-3 top-1/2 -translate-y-1/2 ' + (dm ? 'text-zinc-500' : 'text-zinc-400')}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
                </div>
              </div>
            ))}
            <button type="submit" disabled={busy} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-70">
              {busy ? 'Creating account...' : t.createAccount}
            </button>
          </form>
          <p className={'text-center text-sm mt-6 ' + (dm ? 'text-zinc-500' : 'text-zinc-500')}>
            {t.alreadyHave} <Link to="/signin" className="text-orange-500 hover:text-orange-600 font-semibold">{t.signIn}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}