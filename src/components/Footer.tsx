import React, { useState } from 'react';
import { Language, AppConfig } from '../types';
import { translations, translateNumber } from '../utils/localization';
import { addInquiry } from '../lib/store';
import { 
  Send, 
  MessageCircle, 
  Mail, 
  Phone, 
  CheckCircle, 
  ShieldAlert, 
  ArrowUp,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  config: AppConfig;
  onOpenAdmin: () => void;
}

export default function Footer({ lang, config, onOpenAdmin }: FooterProps) {
  const t = translations[lang];

  // Lead Form States
  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !businessType || !message) {
      alert(lang === 'en' ? 'Please fill in all details!' : 'অনুগ্রহ করে সবগুলো তথ্য পূরণ করুন!');
      return;
    }

    setStatus('submitting');
    try {
      // 1. Persist lead in Firestore
      await addInquiry(name, businessType, message);
      setStatus('success');

      // 2. Build structured WhatsApp Message redirecting to Pashu Akter Riya's number
      const targetPhone = "8801965338660";
      const leadMessage = `আসসালামু আলাইকুম রিয়া আপু,\n\n` +
                          `আমার নাম: ${name}\n` +
                          `আমার ব্যবসা: ${businessType}\n` +
                          `আমার লক্ষ্য/বার্তা: ${message}\n\n` +
                          `আমি আপনার ডিজিটাল মার্কেটিং ওয়েবসাইট থেকে এই বার্তাটি পাঠাচ্ছি।`;
                          
      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(leadMessage)}`;
      
      // Delay redirect slightly for visual confirmation
      setTimeout(() => {
        window.open(waUrl, '_blank');
        // Clear fields
        setName('');
        setBusinessType('');
        setMessage('');
        setStatus('idle');
      }, 1500);

    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-slate-950 text-slate-100 py-16 md:py-24 border-t border-slate-800 scroll-mt-10">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Form & Brand Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-slate-800">
          
          {/* Left Block: Content & Direct Connect info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-900">
                {lang === 'en' ? 'Get Started Today' : 'আজই শুরু করুন'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {t.contactTitle}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t.contactSubtitle}
              </p>
            </div>

            {/* Support Card details */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="p-3 rounded-lg bg-blue-950 text-blue-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Call / WhatsApp</p>
                  <p className="text-base font-bold text-white tracking-tight">+8801965338660</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="p-3 rounded-lg bg-emerald-950 text-emerald-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email Support</p>
                  <p className="text-base font-bold text-white tracking-tight">tariikiht7@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 text-center lg:text-left">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {lang === 'en' ? 'Verified Official Lead Funnel' : 'অফিসিয়াল নিরাপদ যোগাযোগের মাধ্যম'}
              </p>
            </div>
          </div>

          {/* Right Block: Dynamic Lead Persisting Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t.labelName} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.phName}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                />
              </div>

              {/* Business category and objective */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t.labelCategory} <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder={t.phCategory}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                />
              </div>

              {/* Message / Goal Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t.labelMessage} <span className="text-red-500">*</span>
                </label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.phMessage}
                  required
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons / Loading Feedbacks */}
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-extrabold text-sm tracking-wide shadow-md shadow-blue-900/30 transition-colors cursor-pointer"
              >
                <Send size={16} />
                <span>
                  {status === 'submitting' ? t.submitting : t.btnSubmit}
                </span>
              </button>

              {/* Visual Status Notifications */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle size={14} className="animate-bounce" />
                  <span>{t.success}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-400 text-xs font-bold flex items-center gap-2">
                  <ShieldAlert size={14} />
                  <span>{lang === 'en' ? 'Something went wrong. Please check your network or refresh.' : 'কোনো সমস্যা হয়েছে। দয়া করে রিফ্রেশ করে আবার চেষ্টা করুন।'}</span>
                </div>
              )}

            </form>

          </div>

        </div>

        {/* Footer Brand Bottom Nav */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenAdmin}
              className="relative rounded-full cursor-pointer overflow-hidden p-0.5 border border-slate-800 bg-slate-900 focus:outline-none"
              title="Click here to authenticate as Admin"
            >
              <img 
                src={config.logoUrl} 
                alt="Pashu Akter Riya Logo" 
                className="h-10 w-10 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co.com/cSnfRjFJ/IMG-20260815-135937.jpg';
                }}
              />
            </button>
            
            <div className="text-center md:text-left">
              <p className="text-sm font-black text-white">{config.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t.footerDesc.slice(0, 52)}...</p>
            </div>
          </div>

          {/* Links and Language switch */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
            >
              <ShieldCheck size={13} className="text-blue-500" />
              <span>{t.adminBtn}</span>
            </button>

            <span className="text-slate-800">|</span>

            {/* Copyright */}
            <p className="text-xs text-slate-500 font-semibold text-center">
              &copy; {translateNumber('2026', lang)} {config.name}. {t.rightsReserved}
            </p>
          </div>

          {/* Scroll to Top Trigger */}
          <button
            onClick={handleScrollToTop}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>

        </div>

      </div>

      {/* FLOATING CORNER WHATSAPP CALL ACTION BUTTON */}
      <a
        href="https://wa.me/8801965338660?text=%20%20%20%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%20%E0%A6%B8%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B0%20%0A%E0%A6%86%E0%A6%AA%E0%A6%A8%E0%A6%BE%E0%A6%B0%20%E0%A6%95%E0%A6%bf%20%E0%A6%B8%E0%A6%be%E0%A6%b0%E0%A7%8d%E0%A6%ad%E0%A6%bf%E0%A6%b8%20%E0%A6%b2%E0%A6%be%E0%A6%9b%E0%A6%ac%E0%A7%87%20%E0%A6%86%E0%A6%ae%E0%A6%be%E0%A6%95%E0%A7%87%20%0A%E0%A6%ae%E0%A7%87%E0%A6%b8%E0%A7%87%E0%A6%9c%20%E0%A6%95%E0%A6%b0%E0%A7%81%E0%A6%a8%E0%A5%a4%0a"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:scale-110 hover:-rotate-6 transition-all duration-300"
        title="Live WhatsApp Consultation Chat"
      >
        <MessageCircle size={28} className="animate-pulse" />
      </a>

    </footer>
  );
}
