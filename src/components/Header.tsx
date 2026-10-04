import { useState } from 'react';
import { Language, AppConfig } from '../types';
import { translations } from '../utils/localization';
import { Shield, Menu, X, Globe, Layers } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  config: AppConfig;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export default function Header({ lang, setLang, config, onOpenAdmin, isAdminLoggedIn }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const handleLogoClick = () => {
    onOpenAdmin();
  };

  const navItems = [
    { label: t.services, href: "#services" },
    { label: t.experience, href: "#experience" },
    { label: t.benefits, href: "#benefits" },
    { label: t.workProof, href: "#work-proof" },
    { label: t.portfolio, href: "#portfolio" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLogoClick}
              title="Click to open Admin Panel"
              className="group relative cursor-pointer focus:outline-none"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-40 blur-sm group-hover:opacity-100 transition duration-300"></div>
              <img 
                src={config.logoUrl} 
                alt="Pashu Akter Riya Logo" 
                className="relative h-12 w-12 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  // Fallback if user's image is blocked or offline
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co.com/cSnfRjFJ/IMG-20260815-135937.jpg';
                }}
              />
              {isAdminLoggedIn && (
                <div className="absolute -top-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border border-white">
                  <Shield size={10} />
                </div>
              )}
            </button>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {config.name}
              </span>
              <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
                {t.heroSubtitle}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 text-xs font-semibold text-slate-700 hover:bg-stone-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              <Globe size={13} className="text-blue-600" />
              <span>{t.languageLabel}</span>
            </button>

            {/* Direct Start Button */}
            <a 
              href="https://wa.link/q3nip0" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-all"
            >
              <span>{t.btnStartCampaign}</span>
            </a>
          </div>

          {/* Mobile Hamburguer Menu */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-stone-200 text-xs font-semibold text-slate-700 hover:bg-stone-50"
            >
              <Globe size={12} className="text-blue-600" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-stone-50"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white/95 backdrop-blur-md px-4 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
            <a 
              href="https://wa.link/q3nip0" 
              target="_blank" 
              rel="noreferrer"
              className="w-full text-center py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md"
            >
              {t.btnStartCampaign}
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-1 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              <Shield size={13} />
              <span>{t.adminBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
