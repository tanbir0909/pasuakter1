import { Language } from '../types';
import { translations, translateNumber } from '../utils/localization';
import { Award, Briefcase, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ExperienceProps {
  lang: Language;
}

export default function Experience({ lang }: ExperienceProps) {
  const t = translations[lang];

  return (
    <section id="experience" className="py-20 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {t.experience}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.expTitle}
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
            {t.expDesc}
          </p>
        </div>

        {/* Feature Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Dynamic Info & Trust Factor */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
              {/* background design blob */}
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-600/20 rounded-full blur-2xl"></div>
              
              <div className="space-y-6">
                <div className="inline-flex p-3 rounded-xl bg-blue-600/20 text-blue-400">
                  <ShieldCheck size={28} />
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight">
                  {lang === 'en' ? 'Quality Service Guaranteed' : 'শতভাগ কোয়ালিটি সার্ভিস গ্যারান্টি'}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed">
                  {lang === 'en' 
                    ? 'Our approach focuses completely on your brand profitability. We ensure proper research is conducted before launching any campaign, matching your buyer personas precisely.' 
                    : 'আমাদের মূল লক্ষ্যই হলো আপনার ব্যবসার লাভ বৃদ্ধি করা। যেকোনো ক্যাম্পেইন চালুর আগে আমরা নিখুঁত রিসার্চ সম্পন্ন করি, যা সঠিক ক্রেতার কাছে আপনার পণ্য পৌঁছে দেয়।'}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{lang === 'en' ? 'Highly Targeted Facebook Ads Setup' : 'অত্যন্ত কার্যকরী ফেসবুক অ্যাড সেটআপ'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{lang === 'en' ? 'Lowest Possible Cost Per Conversation' : 'সবচেয়ে কম খরচে বেশি কাস্টমার মেসেজ'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{lang === 'en' ? 'Continuous Retargeting & Scaling' : 'কন্টিনিউয়াস রিটার্গেটিং এবং স্কেলিং'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Metric Indicator */}
            <div className="p-6 rounded-2xl border border-stone-100 bg-stone-50/50 flex items-center gap-6 shadow-sm">
              <div className="text-5xl font-black text-blue-600 tracking-tight">
                {translateNumber('4', lang)}+
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-slate-900">
                  {lang === 'en' ? 'Years of Marketing Excellence' : 'ডিজিটাল মার্কেটিং সফলতার বছর'}
                </h4>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                  {lang === 'en' ? 'Experience 4 Years' : 'অভিজ্ঞতা ৪ বছর'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Process Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Professional Service */}
            <div className="p-6 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-blue-50 text-blue-600">
                <Award size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.expCard1Title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t.expCard1Desc}
              </p>
              <div className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                {lang === 'en' ? 'Professional Service' : 'প্রফেশনাল সার্ভিস'}
              </div>
            </div>

            {/* Card 2: Best Work Provided */}
            <div className="p-6 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-emerald-50 text-emerald-600">
                <Briefcase size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.expCard2Title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t.expCard2Desc}
              </p>
              <div className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
                {lang === 'en' ? 'Best Work Provided' : 'সেরা কাজ প্রদান'}
              </div>
            </div>

            {/* Card 3: Experience 4 Years */}
            <div className="p-6 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-purple-50 text-purple-600">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.expCard3Title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t.expCard3Desc}
              </p>
              <div className="text-xs font-extrabold text-purple-600 uppercase tracking-wider">
                {lang === 'en' ? 'Experience 4 Years' : '৪ বছরের অভিজ্ঞতা'}
              </div>
            </div>

            {/* Card 4: Marketing Strategy */}
            <div className="p-6 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-amber-50 text-amber-600">
                <Award size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {lang === 'en' ? 'Digital Marketing Expert' : 'ডিজিটাল মার্কেটিং এক্সপার্ট'}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {lang === 'en' 
                  ? 'We formulate and execute robust campaigns that drive results and conversions.' 
                  : 'আমরা নিখুঁত ফানেল পরিকল্পনার মাধ্যমে সর্বোচ্চ সেলস ড্রাইভ করতে ক্যাম্পেইন পরিচালনা করি।'}
              </p>
              <div className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">
                {lang === 'en' ? 'We provide digital marketing service' : 'আমরা ডিজিটাল মার্কেটিং সার্ভিস প্রদান করি'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
