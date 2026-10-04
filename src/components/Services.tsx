import { Language } from '../types';
import { translations } from '../utils/localization';
import { 
  Facebook, 
  Settings, 
  ShieldAlert, 
  Rocket, 
  TrendingUp, 
  Layers, 
  Megaphone, 
  Award, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface ServicesProps {
  lang: Language;
}

export default function Services({ lang }: ServicesProps) {
  const t = translations[lang];

  // List of the exact 9 services requested by the user, with their dedicated WhatsApp URLs.
  const servicesList = [
    {
      id: 'facebook-ads',
      titleEn: "Facebook Ads",
      titleBn: "ফেসবুক অ্যাডস (Facebook Ads)",
      descriptionEn: "Highly optimized Facebook ad setups, laser-targeted customer profiling, and copy that converts views into active paying clients.",
      descriptionBn: "অত্যন্ত নিখুঁত ফেসবুক বিজ্ঞাপন সেটআপ, সঠিক কাস্টমার টার্গেটিং এবং আকর্ষণীয় রাইটিং যা সরাসরি আপনার বিক্রি বৃদ্ধি করবে।",
      icon: Facebook,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      link: "https://wa.link/q3nip0"
    },
    {
      id: 'page-setup',
      titleEn: "Facebook Page Professional Setup",
      titleBn: "ফেসবুক পেজ প্রফেশনাল সেটআপ",
      descriptionEn: "Complete custom page layout designs, logo configuration, template optimization, SEO keyword descriptions, and full messaging bot creation.",
      descriptionBn: "সম্পূর্ণ প্রফেশনাল ফেসবুক পেজ ডিজাইন, লোগো সেটিং, কাস্টম টেমপ্লেট অপ্টিমাইজেশন, এসইও ডিসক্রিপশন এবং অটো মেসেজিং বট সেটআপ।",
      icon: Settings,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      link: "https://wa.link/f5sqb3"
    },
    {
      id: 'ad-account-setup',
      titleEn: "Add Account Setup",
      titleBn: "অ্যাড অ্যাকাউন্ট সেটআপ (Ad Account)",
      descriptionEn: "Secure business manager configuration, billing setups, pixels integration, custom domain verification, and restriction fixes.",
      descriptionBn: "নিরাপদ বিজনেস ম্যানেজার কনফিগারেশন, পেমেন্ট গেটওয়ে অ্যাড, ফেসবুক পিক্সেল সেটআপ, কাস্টম ডোমেইন ভেরিফিকেশন এবং রেস্ট্রিকশন সমস্যা সমাধান।",
      icon: ShieldAlert,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      link: "https://wa.link/ecwoj3"
    },
    {
      id: 'campaign-boost',
      titleEn: "Ads Campaign & Boost",
      titleBn: "অ্যাড ক্যাম্পেইন ও পেজ বুস্ট",
      descriptionEn: "Launch high-performance ad campaign bursts and instant boosting solutions for posts, targeting customers looking to buy.",
      descriptionBn: "সবচেয়ে কম খরচে নিখুঁত কাস্টমার টার্গেটিংয়ের মাধ্যমে বিজ্ঞাপন চালু এবং ইনস্ট্যান্ট পেজ বুস্টিং সার্ভিস যা তাৎক্ষণিক কাস্টমার এনে দেয়।",
      icon: Rocket,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      link: "https://wa.link/nyyvs1"
    },
    {
      id: 'follow-growth',
      titleEn: "Follow Growth",
      titleBn: "ফলোয়ার ও কাস্টমার বৃদ্ধি",
      descriptionEn: "Organic and structured growth campaigns designed to exponentially increase targeted, highly interested page followers and brand authority.",
      descriptionBn: "অর্গানিক ও টার্গেটেড ক্যাম্পেইনের মাধ্যমে আপনার পেজের অ্যাক্টিভ রিয়েল ফলোয়ার এবং কাস্টমার সংখ্যা বহুগুণ বৃদ্ধি করার সেবা।",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      link: "https://wa.link/b4g34m"
    },
    {
      id: 'all-campaign-service',
      titleEn: "ALL Campaign Service",
      titleBn: "অল-ইন-ওয়ান ক্যাম্পেইন সার্ভিস",
      descriptionEn: "End-to-end full marketing campaigns encompassing catalog setups, dynamic retargeting, custom lookalike audiences, and weekly analytics.",
      descriptionBn: "সম্পূর্ণ ক্যাটালগ সেটআপ, ডাইনামিক রিটার্গেটিং, কাস্টম ও লুক-আলাইক অডিয়েন্স এবং সাপ্তাহিক অ্যাড রিপোর্টসহ অল-ইন-ওয়ান প্যাকেজ।",
      icon: Layers,
      color: "bg-rose-50 text-rose-600 border-rose-100",
      link: "https://wa.link/jdsruh"
    },
    {
      id: 'marketing',
      titleEn: "Marketing",
      titleBn: "মার্কেটিং ও স্ট্র্যাটেজি",
      descriptionEn: "Comprehensive digital sales funnel mapping, competitor analysis, keyword research, and complete budget allocations for organic growth.",
      descriptionBn: "আপনার বিজনেসের পূর্ণাঙ্গ সেলস ফানেল তৈরি, প্রতিদ্বন্দ্বী ব্র্যান্ডের বিজ্ঞাপন বিশ্লেষণ এবং সফল ক্যাম্পেইন বাজেট প্ল্যানিং।",
      icon: Megaphone,
      color: "bg-cyan-50 text-cyan-600 border-cyan-100",
      link: "https://wa.link/mj3o3o"
    },
    {
      id: 'branding',
      titleEn: "Branding",
      titleBn: "ব্র্যান্ডিং ও পরিচিতি",
      descriptionEn: "Create unique online presence with custom visual color structures, high-retention copy strategies, and complete social trust blueprints.",
      descriptionBn: "সোশ্যাল মিডিয়ায় আপনার ব্র্যান্ডের বিশ্বস্ততা বৃদ্ধি, প্রফেশনাল ভিজ্যুয়াল থিম ও কালার ম্যাচিং এবং দীর্ঘস্থায়ী কাস্টমারদের আস্থা অর্জন।",
      icon: Award,
      color: "bg-teal-50 text-teal-600 border-teal-100",
      link: "https://wa.link/vbimdq"
    },
    {
      id: 'professional-service',
      titleEn: "Professional Service",
      titleBn: "প্রফেশনাল সার্ভিস ও কনসালটেন্সি",
      descriptionEn: "One-on-one direct account optimization auditing, live technical issue resolving, and expert suggestions to lower your spend by 40%.",
      descriptionBn: "সরাসরি আপনার বিজ্ঞাপনের অ্যাকাউন্ট ও পেজ অডিট করা, টেকনিক্যাল সমস্যার সমাধান এবং আপনার বিজ্ঞাপনের খরচ ৪০% কমানোর সঠিক পরামর্শ।",
      icon: Sparkles,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      link: "https://wa.link/kswqmp"
    }
  ];

  return (
    <section id="services" className="py-20 bg-stone-50 border-b border-stone-100 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {lang === 'en' ? 'Our Service Catalog' : 'আমাদের সেবা সমূহের তালিকা'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.servicesTitle}
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Services Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div 
                key={srv.id}
                className="group relative bg-white rounded-2xl border border-stone-100 p-8 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Accent Hover Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="space-y-6">
                  {/* Service Icon Box */}
                  <div className={`inline-flex p-3 rounded-xl border ${srv.color} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent size={24} />
                  </div>

                  {/* Service Titles & Descriptions */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {lang === 'en' ? srv.titleEn : srv.titleBn}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {lang === 'en' ? srv.descriptionEn : srv.descriptionBn}
                    </p>
                  </div>
                </div>

                {/* Customized Direct WhatsApp CTA Link Button */}
                <div className="pt-8">
                  <a 
                    href={srv.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-50 group-hover:bg-blue-600 text-slate-800 group-hover:text-white text-xs font-bold tracking-wider uppercase border border-stone-100 group-hover:border-blue-600 shadow-sm transition-all duration-300 hover:scale-102"
                  >
                    <MessageSquare size={14} className="group-hover:animate-bounce" />
                    <span>{t.btnGetStarted}</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
