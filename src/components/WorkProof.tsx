import { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/localization';
import { STATIC_WORK_PROOFS } from '../lib/store';
import { Maximize2, X, MessageCircle, BarChart3, HelpCircle } from 'lucide-react';

interface WorkProofProps {
  lang: Language;
}

export default function WorkProof({ lang }: WorkProofProps) {
  const t = translations[lang];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const openLightbox = (url: string, title: string) => {
    setSelectedImage(url);
    setSelectedTitle(title);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedTitle(null);
  };

  return (
    <section id="work-proof" className="py-20 bg-stone-50 border-b border-stone-100 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {t.workProof}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.proofTitle}
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
            {t.proofSubtitle}
          </p>
        </div>

        {/* Work Proof screenshots 3-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STATIC_WORK_PROOFS.map((proof, idx) => {
            const displayTitle = lang === 'en' ? proof.titleEn : proof.titleBn;
            return (
              <div 
                key={proof.id}
                className="group relative bg-white rounded-2xl border border-stone-100 p-4 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Wrap Frame */}
                <div className="relative rounded-xl overflow-hidden bg-slate-950/5 flex items-center justify-center border border-stone-100 aspect-[3/4] h-[340px] md:h-[400px] w-full mx-auto">
                  
                  {/* Real screenshot with object-contain to prevent cropping */}
                  <img 
                    src={proof.url} 
                    alt={displayTitle} 
                    className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Hover Overlay Button to open Lightbox */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openLightbox(proof.url, displayTitle)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      <Maximize2 size={13} className="text-blue-600" />
                      <span>{lang === 'en' ? 'Zoom Screenshot' : 'বড় করে দেখুন'}</span>
                    </button>
                  </div>

                  {/* Absolute Badge showing number */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider">
                    {lang === 'en' ? 'Evidence' : 'প্রমাণ'} #{idx + 1}
                  </span>
                </div>

                {/* Text Context */}
                <div className="pt-4 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                    {displayTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <BarChart3 size={12} className="text-emerald-500" />
                    <span>{lang === 'en' ? 'Verified Meta Ads Manager Output' : 'ভেরিফাইড ফেসবুক অ্যাডস আউটপুট'}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Lightbox (Zoom Modal) */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-center items-center p-4">
            
            {/* Top Bar inside modal */}
            <div className="w-full max-w-4xl flex justify-between items-center text-white mb-4">
              <h4 className="text-sm sm:text-base font-bold tracking-tight">
                {selectedTitle}
              </h4>
              <button 
                onClick={closeLightbox}
                className="p-2 rounded-full bg-slate-800 hover:bg-red-600 hover:text-white text-stone-300 transition cursor-pointer"
                aria-label="Close zoomed view"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main zoomed image container */}
            <div className="relative w-full max-w-4xl h-[75vh] flex items-center justify-center">
              <img 
                src={selectedImage} 
                alt="Zoomed screenshot proof" 
                className="max-h-full max-w-full object-contain rounded-lg border border-slate-800 shadow-2xl"
              />
            </div>

            {/* Bottom info */}
            <div className="text-center text-stone-400 text-xs font-semibold mt-4 flex items-center gap-1.5">
              <MessageCircle size={14} className="text-emerald-500" />
              <span>{lang === 'en' ? 'All stats are completely authentic. Ready to start your campaign?' : 'সকল তথ্য ১০০% আসল। আপনার ক্যাম্পেইন শুরু করতে নিচের বাটনে চাপুন।'}</span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
