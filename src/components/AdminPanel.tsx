import React, { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { 
  updateAppConfig, 
  addCategory, 
  deleteCategory, 
  addPortfolioItem, 
  deletePortfolioItem, 
  deleteInquiry,
  seedDefaultData
} from '../lib/store';
import { Language, AppConfig, Category, PortfolioItem, LeadInquiry } from '../types';
import { 
  X, 
  Settings, 
  FolderPlus, 
  Image, 
  Mail, 
  Trash2, 
  LogOut, 
  Lock, 
  Sparkles, 
  UserPlus, 
  ShieldCheck, 
  CheckCircle,
  Database,
  ArrowLeft
} from 'lucide-react';

interface AdminPanelProps {
  lang: Language;
  onClose: () => void;
  config: AppConfig;
  categories: Category[];
  portfolioItems: PortfolioItem[];
}

export default function AdminPanel({ lang, onClose, config, categories, portfolioItems }: AdminPanelProps) {
  // Authentication states
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Inquiry List State
  const [inquiries, setInquiries] = useState<LeadInquiry[]>([]);

  // Sub-forms local states
  const [newName, setNewName] = useState(config.name);
  const [newLogoUrl, setNewLogoUrl] = useState(config.logoUrl);
  const [configStatus, setConfigStatus] = useState('');

  const [newCatId, setNewCatId] = useState('');
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatBn, setNewCatBn] = useState('');
  const [catStatus, setCatStatus] = useState('');

  const [itemCat, setItemCat] = useState('certifications');
  const [itemUrl, setItemUrl] = useState('');
  const [itemTitleEn, setItemTitleEn] = useState('');
  const [itemTitleBn, setItemTitleBn] = useState('');
  const [itemDescEn, setItemDescEn] = useState('');
  const [itemDescBn, setItemDescBn] = useState('');
  const [itemStatus, setItemStatus] = useState('');

  const [seedStatus, setSeedStatus] = useState('');

  // Track authenticated state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sync inquiries in real-time if authenticated
  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      const items: LeadInquiry[] = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        items.push({
          id: doc.id,
          name: d.name || '',
          businessType: d.businessType || '',
          message: d.message || '',
          timestamp: d.timestamp || ''
        });
      });
      // Sort newest inquiries first
      items.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      setInquiries(items);
    });
    return unsubscribe;
  }, [user]);

  // Sync state values with global config updates
  useEffect(() => {
    setNewName(config.name);
    setNewLogoUrl(config.logoUrl);
  }, [config]);

  // Authenticate (Login or Register)
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error(err);
      const errorCode = err?.code || '';
      
      if (errorCode === 'auth/invalid-credential') {
        setAuthError(
          lang === 'en'
            ? 'Incorrect password or email. If you have not created your admin account yet, please click "First Setup? Create Admin Account" below first!'
            : 'ভুল ইমেইল বা পাসওয়ার্ড। আপনি যদি এখনো অ্যাকাউন্ট তৈরি না করে থাকেন, তবে দয়া করে প্রথমে নিচে "First Setup? Create Admin Account" এ ক্লিক করে রেজিস্ট্রেশন করুন!'
        );
      } else if (errorCode === 'auth/weak-password') {
        setAuthError(
          lang === 'en'
            ? 'Weak password. The password must be at least 6 characters long.'
            : 'দুর্বল পাসওয়ার্ড। পাসওয়ার্ডটি অবশ্যই কমপক্ষে ৬ অক্ষরের হতে হবে।'
        );
      } else if (errorCode === 'auth/email-already-in-use') {
        setAuthError(
          lang === 'en'
            ? 'This email address is already registered. Please switch to Login mode.'
            : 'এই ইমেইলটি ইতিমধ্যে রেজিস্টার করা রয়েছে। দয়া করে লগইন করার মোডে চলে যান।'
        );
      } else {
        setAuthError(err?.message || 'Authentication failed. Please check credentials.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  // Submit Global Config
  const handleConfigUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigStatus('Updating...');
    try {
      await updateAppConfig(newName, newLogoUrl);
      setConfigStatus('Global Configuration updated successfully!');
      setTimeout(() => setConfigStatus(''), 3000);
    } catch (err: any) {
      setConfigStatus(`Error: ${err?.message || err}`);
    }
  };

  // Create Category
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatId || !newCatEn || !newCatBn) return;
    setCatStatus('Adding...');
    try {
      await addCategory(newCatId, newCatEn, newCatBn);
      setCatStatus('Category successfully created!');
      setNewCatId('');
      setNewCatEn('');
      setNewCatBn('');
      setTimeout(() => setCatStatus(''), 3000);
    } catch (err: any) {
      setCatStatus(`Error: ${err?.message || err}`);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category? All related elements may lose visibility.')) return;
    try {
      await deleteCategory(id);
    } catch (err: any) {
      alert(`Error deleting category: ${err?.message || err}`);
    }
  };

  // Create Portfolio Item
  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemUrl || !itemTitleEn || !itemTitleBn) {
      alert('Please fill in image URL and titles!');
      return;
    }
    setItemStatus('Creating highlight...');
    try {
      await addPortfolioItem(itemCat, itemUrl, itemTitleEn, itemTitleBn, itemDescEn, itemDescBn);
      setItemStatus('Portfolio item uploaded and stored!');
      setItemUrl('');
      setItemTitleEn('');
      setItemTitleBn('');
      setItemDescEn('');
      setItemDescBn('');
      setTimeout(() => setItemStatus(''), 3000);
    } catch (err: any) {
      setItemStatus(`Error: ${err?.message || err}`);
    }
  };

  // Delete Portfolio Item
  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Delete this highlight from the gallery?')) return;
    try {
      await deletePortfolioItem(id);
    } catch (err: any) {
      alert(`Error: ${err?.message || err}`);
    }
  };

  // Delete Inquiry Lead
  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Remove this lead inquiry?')) return;
    try {
      await deleteInquiry(id);
    } catch (err: any) {
      alert(`Error: ${err?.message || err}`);
    }
  };

  // Seeding trigger
  const handleSeed = async () => {
    if (!window.confirm('This will load all the default certifications and profit graphics onto your database. Proceed?')) return;
    setSeedStatus('Seeding database content...');
    try {
      await seedDefaultData();
      setSeedStatus('Database seeded successfully! All default layout loaded.');
      setTimeout(() => setSeedStatus(''), 4000);
    } catch (err: any) {
      setSeedStatus(`Seeding Error: ${err?.message || err}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-5 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>{lang === 'en' ? 'Pashu Akter Riya Admin Portal' : 'পশু আক্তার রিয়া অ্যাডমিন প্যানেল'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/25 border border-blue-500 text-blue-400 uppercase font-black tracking-widest">
                PRO
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'en' ? 'Full interactive database configuration & lead tracking controls' : 'ওয়েবসাইট এবং গ্রাহকদের মেসেজ নিয়ন্ত্রণের ড্যাশবোর্ড'}
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>{lang === 'en' ? 'Back to Site' : 'ওয়েবসাইটে ফিরুন'}</span>
        </button>
      </div>

      {/* RENDER LOGIN / REGISTER VIEW IF NOT LOGGED IN */}
      {!user ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
          
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
            
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-slate-950 border border-slate-800 text-blue-400">
                <Lock size={28} className="animate-pulse" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {isRegistering ? 'Create Admin Account' : 'Administrator Secure Login'}
              </h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                {isRegistering 
                  ? 'Set up your master credentials to start configuring and managing your website' 
                  : 'Enter your administrator credentials to open your real-time dashboard'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., tariikiht7@gmail.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-400 text-xs font-semibold">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white text-sm font-bold shadow-lg shadow-blue-900/30 tracking-wide transition-colors cursor-pointer"
              >
                {authLoading ? 'Authenticating...' : (isRegistering ? 'Register Account' : 'Verify Credentials')}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
              <button
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setAuthError('');
                }}
                className="text-slate-400 hover:text-white font-bold transition flex items-center gap-1 cursor-pointer"
              >
                {isRegistering ? <Lock size={12} /> : <UserPlus size={12} />}
                <span>{isRegistering ? 'Already have credentials? Sign In' : 'First Setup? Create Admin Account'}</span>
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* RENDER MASTER DASHBOARD VIEW IF AUTHENTICATED */
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 bg-slate-950 overflow-y-auto">
          
          {/* LEFT 5 COLS: CONTROLS & CONFIGURATIONS */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Admin Header Info & Logout */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 font-bold uppercase text-sm">
                  {user.email?.slice(0, 2) || 'AD'}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">Logged In As</p>
                  <p className="text-sm font-extrabold text-white">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-red-600/20 hover:border-red-800 hover:text-red-400 text-slate-400 transition cursor-pointer"
                title="Log Out Account"
              >
                <LogOut size={16} />
              </button>
            </div>

            {/* Config System: Seeding Tool (Database Bootstrapper) */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-white">
                <Database size={18} className="text-blue-400" />
                <h3 className="text-sm font-black uppercase tracking-wider">Database Bootstrapper</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                If your database is completely empty, click this button to instantly seed all default certifications and profits highlights screens onto your portfolio.
              </p>
              
              <button
                onClick={handleSeed}
                className="w-full py-3 rounded-xl bg-slate-950 border border-slate-800 hover:bg-blue-600 hover:border-blue-600 hover:text-white text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={13} className="animate-spin" />
                <span>Seed Original Layout Content</span>
              </button>

              {seedStatus && (
                <p className="text-xs font-bold text-blue-400">{seedStatus}</p>
              )}
            </div>

            {/* Form 1: Website Global Config */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-md">
              <div className="flex items-center gap-2 text-white border-b border-slate-800 pb-3">
                <Settings size={18} className="text-slate-400" />
                <h3 className="text-sm font-black uppercase tracking-wider">Global branding settings</h3>
              </div>

              <form onSubmit={handleConfigUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">App Owner Name</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logo URL (Live ImgBB/Web Link)</label>
                  <input 
                    type="text" 
                    value={newLogoUrl}
                    onChange={(e) => setNewLogoUrl(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Save Global Configurations
                </button>

                {configStatus && (
                  <p className="text-xs font-bold text-emerald-400">{configStatus}</p>
                )}
              </form>
            </div>

            {/* Form 2: Category Creator & Manager */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-md">
              <div className="flex items-center gap-2 text-white border-b border-slate-800 pb-3">
                <FolderPlus size={18} className="text-blue-400" />
                <h3 className="text-sm font-black uppercase tracking-wider">Interactive Tabs & Categories</h3>
              </div>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Unique ID</label>
                    <input 
                      type="text" 
                      value={newCatId}
                      onChange={(e) => setNewCatId(e.target.value)}
                      placeholder="e.g., stats"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-[11px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Name (EN)</label>
                    <input 
                      type="text" 
                      value={newCatEn}
                      onChange={(e) => setNewCatEn(e.target.value)}
                      placeholder="e.g., Statistics"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-[11px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Name (BN)</label>
                    <input 
                      type="text" 
                      value={newCatBn}
                      onChange={(e) => setNewCatBn(e.target.value)}
                      placeholder="e.g., পরিসংখ্যান"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-[11px]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Create Custom Tab Category
                </button>

                {catStatus && (
                  <p className="text-xs font-bold text-emerald-400">{catStatus}</p>
                )}
              </form>

              {/* Active list of categories */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Category Lists</p>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex justify-between items-center px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-900 text-xs">
                      <div>
                        <span className="font-bold text-white">{cat.nameEn}</span>
                        <span className="text-slate-500 text-[10px] ml-1.5">({cat.id})</span>
                      </div>
                      
                      {/* Only allow deleting custom ones if needed, keeping safety */}
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT 7 COLS: PORTFOLIO LIST, CLIENT LEADS LIST */}
          <div className="lg:col-span-7 space-y-8 overflow-y-auto">
            
            {/* LEAD INQUIRIES LIST (The proper lead tracker system!) */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white">
                  <Mail size={18} className="text-emerald-400 animate-bounce" />
                  <h3 className="text-sm font-black uppercase tracking-wider">Client Leads & Inquiries</h3>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400">
                  {inquiries.length} Active
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
                  <p className="text-xs text-slate-500 font-bold">No leads received yet from the footer consultation form.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-extrabold text-white tracking-tight">{inq.name}</p>
                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-0.5">{inq.businessType}</p>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="text-slate-500 hover:text-red-400 transition p-1"
                            title="Delete Lead Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-850 whitespace-pre-wrap">
                          {inq.message}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold border-t border-slate-900 pt-2.5">
                        <span>Submitted Live on Website</span>
                        <span>{new Date(inq.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PORTFOLIO HIGHLIGHTS MANAGER */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-md">
              <div className="flex items-center gap-2 text-white border-b border-slate-800 pb-3">
                <Image size={18} className="text-blue-400" />
                <h3 className="text-sm font-black uppercase tracking-wider">Portfolio highlights upload manager</h3>
              </div>

              {/* Uploader Form */}
              <form onSubmit={handleCreateItem} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Category Tab</label>
                    <select
                      value={itemCat}
                      onChange={(e) => setItemCat(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs cursor-pointer focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nameEn} ({cat.nameBn})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Image URL (ImgBB / Live Link)</label>
                    <input 
                      type="text" 
                      value={itemUrl}
                      onChange={(e) => setItemUrl(e.target.value)}
                      required
                      placeholder="https://i.ibb.co.com/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-700"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Highlight Title (EN)</label>
                    <input 
                      type="text" 
                      value={itemTitleEn}
                      onChange={(e) => setItemTitleEn(e.target.value)}
                      required
                      placeholder="Meta Certified Consultant"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Highlight Title (BN)</label>
                    <input 
                      type="text" 
                      value={itemTitleBn}
                      onChange={(e) => setItemTitleBn(e.target.value)}
                      required
                      placeholder="মেটা সার্টিফাইড কনসালটেন্ট"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Short description (EN)</label>
                    <input 
                      type="text" 
                      value={itemDescEn}
                      onChange={(e) => setItemDescEn(e.target.value)}
                      placeholder="Official credentials validating campaign optimizations..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Short description (BN)</label>
                    <input 
                      type="text" 
                      value={itemDescBn}
                      onChange={(e) => setItemDescBn(e.target.value)}
                      placeholder="ফেসবুক মার্কেটিং এর যোগ্যতা অর্জনের সার্টিফিকেট..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow shadow-blue-900 cursor-pointer"
                >
                  Save and Add Image highlight to User View
                </button>

                {itemStatus && (
                  <p className="text-xs font-bold text-emerald-400">{itemStatus}</p>
                )}
              </form>

              {/* Highlights visual lists */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Gallery Highlights ({portfolioItems.length})</p>
                
                {portfolioItems.length === 0 ? (
                  <div className="text-center py-6 bg-slate-950 border border-slate-850 rounded-xl text-slate-500 text-xs font-semibold">
                    No highlights uploaded yet. Seed default content or add items.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {portfolioItems.map((item) => (
                      <div key={item.id} className="p-3 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.imageUrl} 
                            alt={item.titleEn} 
                            className="h-12 w-12 rounded object-contain bg-white border border-slate-800"
                          />
                          <div>
                            <p className="text-xs font-extrabold text-white line-clamp-1">{item.titleEn}</p>
                            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-900 mt-1 inline-block">
                              Category: {item.categoryId}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition"
                          title="Delete Highlight"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
