import { Language } from '../types';
import { translations } from '../utils/localization';
import { Clock, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

interface BuyersBenefitsProps {
  lang: Language;
}

export default function BuyersBenefits({ lang }: BuyersBenefitsProps) {
  const t = translations[lang];

  const benefits = [
    {
      id: 'support',
      title: t.benefit1Title,
      description: t.benefit1Desc,
      icon: Clock,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      pill: lang === 'en' ? "Continuous Live Help" : "২৪/৭ সার্বক্ষণিক সাহায্য"
    },
    {
      id: 'ontime',
      title: t.benefit2Title,
      description: t.benefit2Desc,
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      pill: lang === 'en' ? "Zero Delay Guarantee" : "দেরি না করার গ্যারান্টি"
    },
    {
      id: 'fast',
      title: t.benefit3Title,
      description: t.benefit3Desc,
      icon: Zap,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      pill: lang === 'en' ? "Instant Setup Action" : "তাত্ক্ষণিক সেটআপ সুবিধা"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white border-b border-stone-100 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {t.benefits}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.benefitsTitle}
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
            {t.benefitsSubtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={benefit.id}
                className="group relative bg-stone-50/50 rounded-2xl border border-stone-100 p-8 hover:bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-300"
              >
                {/* Decorative Hover Dot */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="space-y-6">
                  {/* Icon Box */}
                  <div className={`inline-flex p-3 rounded-xl border ${benefit.color} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent size={24} />
                  </div>

                  {/* Benefit Details */}
                  <div className="space-y-3">
                    <span className="inline-block text-[10px] font-bold text-slate-400 group-hover:text-blue-600 uppercase tracking-widest">
                      {benefit.pill}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Additional Small trust badge at footer */}
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-slate-400 font-bold group-hover:text-slate-600">
                  <span>{lang === 'en' ? 'Verified Expert' : 'যাচাইকৃত সুবিধা'}</span>
                  <HelpCircle size={14} className="text-stone-300" />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
