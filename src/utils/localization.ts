import { Language } from '../types';

export function translateNumber(numStr: string | number, lang: Language): string {
  const str = String(numStr);
  if (lang === 'en') return str;
  
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

export const translations = {
  en: {
    // Nav
    home: "Home",
    services: "Services",
    experience: "Experience",
    benefits: "Benefits",
    workProof: "Work Proof",
    portfolio: "Portfolio & Profits",
    adminLink: "Admin Dashboard",
    languageLabel: "বাংলা",
    
    // Hero
    heroTitle: "Pashu Akter Riya",
    heroSubtitle: "Certified Facebook Ads Expert",
    heroDescription: "Scale your business to new heights with high-converting ad campaigns, optimized budgets, and expert professional page setups designed for maximum sales.",
    btnStartCampaign: "Start Campaign",
    btnWhatsAppConsult: "Get Free Consultation",
    badgeTopExpert: "Top Certified Ads Expert",
    badgeGuaranteed: "Best Work Guaranteed",
    
    // Services
    servicesTitle: "Exclusive Facebook Marketing Services",
    servicesSubtitle: "Premium services designed to skyrocket your brand visibility, engagement, and sales.",
    btnGetStarted: "Order Now / Start Chat",
    
    // Experience
    expYears: "4 Years",
    expTitle: "Proven Experience & High-Converting Results",
    expDesc: "Over 4 years of successful Facebook marketing, budget optimization, and target audience alignment, resulting in massive sales growth for local and international brands.",
    expCard1Title: "Professional Service",
    expCard1Desc: "Custom-made client funnels optimized for your target industry.",
    expCard2Title: "Best Work Provided",
    expCard2Desc: "We provide outstanding digital marketing services that guarantee high satisfaction.",
    expCard3Title: "4 Years Experience",
    expCard3Desc: "Proven record of launching and sustaining profitable campaigns.",
    
    // Benefits
    benefitsTitle: "Why Partner with Me?",
    benefitsSubtitle: "Premium service attributes committed to giving you complete growth and complete peace of mind.",
    benefit1Title: "24/7 Support",
    benefit1Desc: "Continuous communication, campaign performance checks, and real-time adjustments around the clock.",
    benefit2Title: "On-time Delivery",
    benefit2Desc: "Every campaign setup, audit, and creative is delivered precisely when promised, keeping your schedule safe.",
    benefit3Title: "Fast Delivery",
    benefit3Desc: "Quick setups that allow you to launch your ads, capture leads, and witness results immediately.",
    
    // Work Proof
    proofTitle: "Real Work Proof & Campaign Results",
    proofSubtitle: "Actual active screenshots from Facebook Ads Manager, message lead lists, and budget optimization dashboards.",
    proofTag: "Live Evidence",
    viewLarge: "Click to View Full Screenshot",
    
    // Gallery
    galleryTitle: "Our Certifications & Ad Profits",
    gallerySubtitle: "Verified professional training credentials alongside real campaign ROI reports and sales conversions.",
    tabAll: "All Highlights",
    tabCertificates: "Certifications",
    tabProfit: "My Profit",
    
    // Contact Form / Footer
    contactTitle: "Start Your Free Business Consultation",
    contactSubtitle: "Tell me about your business type and sales target. I will build an optimized Facebook Ads strategy for you.",
    labelName: "Your Full Name",
    phName: "Enter your name",
    labelCategory: "Business Category & Goal",
    phCategory: "e.g., E-commerce Clothing, Real Estate Leads",
    labelMessage: "Your Message / Target",
    phMessage: "Describe your products, current challenges, or budget...",
    btnSubmit: "Submit and Chat on WhatsApp",
    submitting: "Saving details...",
    success: "Lead saved! Opening WhatsApp...",
    footerDesc: "Your dedicated partner for high-performing Facebook Marketing. Scale your brand, build authority, and dominate your niche today.",
    adminBtn: "Admin Portal",
    signOut: "Sign Out",
    rightsReserved: "All rights reserved.",
  },
  bn: {
    // Nav
    home: "হোম",
    services: "সার্ভিস সমূহ",
    experience: "অভিজ্ঞতা",
    benefits: "সুবিধাসমূহ",
    workProof: "কাজের প্রমাণ",
    portfolio: "সার্টিফিকেট ও প্রফিট",
    adminLink: "অ্যাডমিন ড্যাশবোর্ড",
    languageLabel: "English",
    
    // Hero
    heroTitle: "পশু আক্তার রিয়া",
    heroSubtitle: "সার্টিফাইড ফেসবুক অ্যাডস বিশেষজ্ঞ",
    heroDescription: "উচ্চ-রূপান্তরকারী অ্যাড ক্যাম্পেইন, সঠিক বাজেট অপ্টিমাইজেশন এবং প্রফেশনাল পেজ সেটআপের মাধ্যমে আপনার ব্যবসাকে নিয়ে যান এক অনন্য উচ্চতায়।",
    btnStartCampaign: "ক্যাম্পেইন শুরু করুন",
    btnWhatsAppConsult: "ফ্রি পরামর্শ নিন",
    badgeTopExpert: "টপ সার্টিফাইড অ্যাডস এক্সপার্ট",
    badgeGuaranteed: "সেরা কাজের নিশ্চয়তা",
    
    // Services
    servicesTitle: "এক্সক্লুসিভ ফেসবুক মার্কেটিং সার্ভিস সমূহ",
    servicesSubtitle: "আপনার ব্র্যান্ডের উপস্থিতি এবং বিক্রি বহুগুণ বাড়িয়ে দেওয়ার জন্য আমাদের প্রিমিয়াম সার্ভিস সমূহ।",
    btnGetStarted: "অর্ডার করুন / চ্যাট শুরু করুন",
    
    // Experience
    expYears: "৪ বছর",
    expTitle: "প্রমাণিত অভিজ্ঞতা এবং চমৎকার সেলস বৃদ্ধি",
    expDesc: "৪ বছরেরও বেশি সময় ধরে সফলভাবে ফেসবুক মার্কেটিং, বাজেট অপ্টিমাইজেশন এবং সঠিক কাস্টমার টার্গেটিংয়ের মাধ্যমে দেশী ও বিদেশী ব্র্যান্ডের জন্য বিপুল সেলস জেনারেট করার অভিজ্ঞতা।",
    expCard1Title: "প্রফেশনাল সার্ভিস",
    expCard1Desc: "আপনার নির্দিষ্ট ব্যবসার ধরনের সাথে মিলিয়ে কাস্টম মার্কেটিং ফানেল তৈরি করি।",
    expCard2Title: "সেরা কাজ প্রদান",
    expCard2Desc: "আমরা এমন প্রফেশনাল ডিজিটাল মার্কেটিং কাজ প্রদান করি যা আপনার সর্বোচ্চ সন্তুষ্টি নিশ্চিত করে।",
    expCard3Title: "৪ বছরের অভিজ্ঞতা",
    expCard3Desc: "দীর্ঘ চার বছর ধরে প্রফিটেবল ক্যাম্পেইন পরিচালনা ও কাস্টমার বৃদ্ধির নির্ভরযোগ্য প্রমাণ।",
    
    // Benefits
    benefitsTitle: "কেন আমাকে বেছে নিবেন?",
    benefitsSubtitle: "আপনার ব্যবসার সর্বোচ্চ সেলস ও বৃদ্ধির নিশ্চয়তা দিতে আমাদের চমৎকার সুবিধাসমূহ।",
    benefit1Title: "২৪/৭ সার্বক্ষণিক সাপোর্ট",
    benefit1Desc: "আপনার ক্যাম্পেইনের যেকোনো প্রয়োজনে সরাসরি আমার থেকে সবসময় লাইভ সাপোর্ট ও আপডেট পাবেন।",
    benefit2Title: "সঠিক সময়ে ডেলিভারি",
    benefit2Desc: "আপনার সময় আমাদের কাছে অত্যন্ত মূল্যবান। প্রতিটি প্রজেক্টের কাজ নিখুঁতভাবে নির্ধারিত সময়ের মধ্যেই শেষ করা হয়।",
    benefit3Title: "দ্রুত ডেলিভারি",
    benefit3Desc: "খুব দ্রুত ও কার্যকরভাবে পেজ ও ক্যাম্পেইন সেটআপ করা হয় যাতে আপনি দ্রুত সেলস দেখা শুরু করতে পারেন।",
    
    // Work Proof
    proofTitle: "কাজের বাস্তব প্রমাণ ও ক্যাম্পেইন রেজাল্ট",
    proofSubtitle: "ফেসবুক অ্যাডস ম্যানেজার, কাস্টমার মেসেজ লিস্ট এবং বাজেট রিপোর্টের সরাসরি স্ক্রিনশট প্রুফ।",
    proofTag: "লাইভ প্রমাণ",
    viewLarge: "সম্পূর্ণ স্ক্রিনশট দেখতে ক্লিক করুন",
    
    // Gallery
    galleryTitle: "আমাদের সার্টিফিকেশন ও ক্যাম্পেইন প্রফিট",
    gallerySubtitle: "ভেরিফাইড মেটা প্রফেশনাল সার্টিফিকেট এবং বাস্তব ক্যাম্পেইন প্রফিট বা আয়ের স্ক্রিনশট সমূহ।",
    tabAll: "সবগুলো ছবি",
    tabCertificates: "সার্টিফিকেশন সমূহ",
    tabProfit: "মাই প্রফিট (My Profit)",
    
    // Contact Form / Footer
    contactTitle: "ফ্রি বিজনেস পরামর্শ শুরু করুন",
    contactSubtitle: "আপনার ব্যবসার ধরণ এবং বিক্রির লক্ষ্য আমাদের জানান। আমি আপনার জন্য একটি লাভজনক ফেসবুক অ্যাডস স্ট্র্যাটেজি তৈরি করে দেব।",
    labelName: "আপনার সম্পূর্ণ নাম",
    phName: "আপনার নাম টাইপ করুন",
    labelCategory: "ব্যবসার ক্যাটাগরি ও লক্ষ্য",
    phCategory: "যেমন: ই-কমার্স পোশাক, রিয়েল এস্টেট লিড",
    labelMessage: "আপনার বার্তা বা লক্ষ্য",
    phMessage: "আপনার প্রোডাক্টের বিবরণ, বর্তমান বাজেট বা কোনো সমস্যার কথা লিখুন...",
    btnSubmit: "সাবমিট করে হোয়াটসঅ্যাপে চ্যাট করুন",
    submitting: "তথ্য সেভ হচ্ছে...",
    success: "তথ্য সেভ হয়েছে! হোয়াটসঅ্যাপ ওপেন হচ্ছে...",
    footerDesc: "আপনার ফেসবুক মার্কেটিং ব্যবসার বিশ্বস্ত পার্টনার। আজই আপনার ব্র্যান্ডকে পরিচিত করুন, কাস্টমার বাড়ান এবং বাজারে নিজের রাজত্ব তৈরি করুন।",
    adminBtn: "অ্যাডমিন পোর্টাল",
    signOut: "লগআউট",
    rightsReserved: "সর্বস্বত্ব সংরক্ষিত।",
  }
};
