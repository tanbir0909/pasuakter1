import { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../utils/localization';
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: 'https://i.ibb.co.com/ZpTp7mQ6/IMG-20260815-204231.jpg',
      alt: 'Pashu Akter Riya Digital Marketing Core Poster'
    },
    {
      url: 'https://i.ibb.co.com/GDc1Qdk/IMG-20260815-151306.jpg',
      alt: 'Meta Verified Certificate & Digital Marketing Banner'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50 py-16 lg:py-24 border-b border-stone-100">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content & Call to Actions */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            {/* Badges Stack */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={11} className="animate-pulse" />
                {t.badgeTopExpert}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <CheckCircle size={11} />
                {t.badgeGuaranteed}
              </span>
            </div>

            {/* Main Title & Professional Pitch */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
                {t.heroTitle}
              </h1>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-wide">
                {t.heroSubtitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {t.heroDescription}
              </p>
            </div>

            {/* Direct Interaction Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Primary Call to Action */}
              <a 
                href="https://wa.link/q3nip0" 
                target="_blank" 
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold tracking-wide text-sm shadow-lg shadow-blue-600/20 hover:scale-105 transition duration-200"
              >
                <MessageCircle size={18} />
                <span>{t.btnStartCampaign}</span>
              </a>

              {/* Secondary Consult Action */}
              <a 
                href="#contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm border border-stone-200 shadow-sm transition duration-200"
              >
                <span>{t.btnWhatsAppConsult}</span>
              </a>
            </div>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-100 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-slate-900">৪+ বছর</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">অভিজ্ঞতা</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-slate-900">১০০%</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">সেরা সার্ভিস</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-extrabold text-slate-900">২৪/৭</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">লাইভ সাপোর্ট</p>
              </div>
            </div>

          </div>

          {/* Right Side: Interactive Image Slider (Banner) */}
          <div className="lg:col-span-6 relative group">
            
            {/* Banner Backdrop Box */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition duration-500"></div>
            
            {/* Image Container with precise aspect-ratio preservation */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-100 bg-stone-950/5 p-2 h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center">
              
              {/* Image element with object-contain */}
              <img 
                src={slides[currentSlide].url} 
                alt={slides[currentSlide].alt} 
                className="max-h-full max-w-full rounded-xl object-contain transition-all duration-700 ease-in-out"
                onError={(e) => {
                  // Keep images loading flawlessly
                  const currentImage = e.target as HTMLImageElement;
                  if (currentSlide === 0) {
                    currentImage.src = 'https://i.ibb.co.com/ZpTp7mQ6/IMG-20260815-204231.jpg';
                  } else {
                    currentImage.src = 'https://i.ibb.co.com/GDc1Qdk/IMG-20260815-151306.jpg';
                  }
                }}
              />

              {/* Slider Controls */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md hover:scale-110 active:scale-95 transition cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} />
              </button>

              <button 
                onClick={nextSlide}
                className="absolute right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md hover:scale-110 active:scale-95 transition cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-6 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === index ? 'w-8 bg-blue-600' : 'w-2.5 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
