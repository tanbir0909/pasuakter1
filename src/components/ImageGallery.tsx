import { useState } from 'react';
import { Language, Category, PortfolioItem } from '../types';
import { translations } from '../utils/localization';
import { Maximize2, X, GraduationCap, Coins, CheckCircle } from 'lucide-react';

interface ImageGalleryProps {
  lang: Language;
  categories: Category[];
  portfolioItems: PortfolioItem[];
}

export default function ImageGallery({ lang, categories, portfolioItems }: ImageGalleryProps) {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<string>('all');
  const [zoomedItem, setZoomedItem] = useState<PortfolioItem | null>(null);

  // Filter items based on selected category tab
  const filteredItems = activeTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.categoryId === activeTab);

  return (
    <section id="portfolio" className="py-20 bg-white border-b border-stone-100 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {lang === 'en' ? 'Credentials & Returns' : 'যোগ্যতা ও প্রফিট রিপোর্ট'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.galleryTitle}
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {/* Default 'All' Tab */}
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-stone-50 border border-stone-200 text-slate-600 hover:bg-stone-100 hover:text-slate-950'
            }`}
          >
            {t.tabAll}
          </button>

          {/* Dynamic Categories Tabs (Certifications, My Profit, etc.) */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-stone-50 border border-stone-200 text-slate-600 hover:bg-stone-100 hover:text-slate-950'
              }`}
            >
              {lang === 'en' ? cat.nameEn : cat.nameBn}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
            <p className="text-slate-500 font-medium">
              {lang === 'en' ? 'No items in this category yet.' : 'এই ক্যাটাগরিতে এখনো কোনো ফাইল বা ছবি যোগ করা হয়নি।'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const displayTitle = lang === 'en' ? item.titleEn : item.titleBn;
              const displayDesc = lang === 'en' ? item.descriptionEn : item.descriptionBn;
              
              return (
                <div 
                  key={item.id}
                  className="group relative bg-stone-50/30 rounded-2xl border border-stone-100 p-4 hover:bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Image wrap frame */}
                    <div className="relative rounded-xl overflow-hidden bg-slate-950/5 flex items-center justify-center border border-stone-100 aspect-video h-[200px] w-full">
                      <img 
                        src={item.imageUrl} 
                        alt={displayTitle} 
                        className="max-h-full max-w-full object-contain group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Zoom Trigger Button on Hover */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => setZoomedItem(item)}
                          className="p-2.5 rounded-full bg-white text-slate-900 shadow-md hover:scale-110 active:scale-95 transition cursor-pointer"
                        >
                          <Maximize2 size={16} className="text-blue-600" />
                        </button>
                      </div>

                      {/* Absolute Badge showing category */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-sm border border-stone-200 text-[9px] font-bold tracking-wider text-slate-700 flex items-center gap-1">
                        {item.categoryId === 'certifications' ? (
                          <GraduationCap size={10} className="text-blue-600" />
                        ) : (
                          <Coins size={10} className="text-emerald-500" />
                        )}
                        {item.categoryId === 'certifications' 
                          ? (lang === 'en' ? 'Certificate' : 'সার্টিফিকেট') 
                          : (lang === 'en' ? 'Profit Model' : 'মুনাফার প্রমাণ')}
                      </span>
                    </div>

                    {/* Meta Title & Descriptions */}
                    <div className="space-y-2 px-1">
                      <h3 className="text-lg font-bold text-slate-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                        {displayTitle}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">
                        {displayDesc}
                      </p>
                    </div>
                  </div>

                  {/* Trust indicator */}
                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1 text-xs text-blue-600 font-bold">
                    <CheckCircle size={12} className="text-emerald-500" />
                    <span>{lang === 'en' ? 'Verified Credential' : 'যাচাইকৃত যোগ্যতা'}</span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Full-screen Zoom Modal */}
        {zoomedItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-center items-center p-4">
            
            {/* Modal header details */}
            <div className="w-full max-w-4xl flex justify-between items-center text-white mb-4">
              <div>
                <h4 className="text-base font-bold tracking-tight">
                  {lang === 'en' ? zoomedItem.titleEn : zoomedItem.titleBn}
                </h4>
                <p className="text-xs text-stone-400 mt-1 max-w-xl">
                  {lang === 'en' ? zoomedItem.descriptionEn : zoomedItem.descriptionBn}
                </p>
              </div>
              
              <button 
                onClick={() => setZoomedItem(null)}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-red-600 text-stone-300 hover:text-white transition cursor-pointer"
                aria-label="Close image preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Image viewport */}
            <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center bg-stone-900/50 rounded-xl p-2">
              <img 
                src={zoomedItem.imageUrl} 
                alt="Zoomed Portfolio highlight" 
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="text-stone-500 text-xs mt-4">
              {lang === 'en' ? 'Pashu Akter Riya - Authentic Campaign Output Record' : 'পশু আক্তার রিয়া - ভেরিফাইড প্রফেশনাল ডাটা'}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
