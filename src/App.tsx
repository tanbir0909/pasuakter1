import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { 
  Language, 
  AppConfig, 
  Category, 
  PortfolioItem 
} from './types';
import { 
  DEFAULT_CONFIG, 
  DEFAULT_CATEGORIES, 
  DEFAULT_PORTFOLIO 
} from './lib/store';

// Importing Custom Sections & Components
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Services from './components/Services';
import BuyersBenefits from './components/BuyersBenefits';
import WorkProof from './components/WorkProof';
import ImageGallery from './components/ImageGallery';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [lang, setLang] = useState<Language>('bn'); // Standard default as requested
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Dynamic States synced with Firestore
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO);

  // 1. Listen to Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdminLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-time Subscription to Global Brand Configurations
  useEffect(() => {
    const docRef = doc(db, 'configs', 'global');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const d = docSnap.data();
        setConfig({
          name: d.name || DEFAULT_CONFIG.name,
          logoUrl: d.logoUrl || DEFAULT_CONFIG.logoUrl
        });
      } else {
        setConfig(DEFAULT_CONFIG);
      }
    }, (err) => {
      console.warn("Using local configuration fallback:", err.message);
      setConfig(DEFAULT_CONFIG);
    });
    return unsubscribe;
  }, []);

  // 3. Real-time Subscription to Custom Categories
  useEffect(() => {
    const colRef = collection(db, 'categories');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const items: Category[] = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        items.push({
          id: doc.id,
          nameEn: d.nameEn || '',
          nameBn: d.nameBn || ''
        });
      });
      
      if (items.length > 0) {
        setCategories(items);
      } else {
        setCategories(DEFAULT_CATEGORIES);
      }
    }, (err) => {
      console.warn("Using local categories fallback:", err.message);
      setCategories(DEFAULT_CATEGORIES);
    });
    return unsubscribe;
  }, []);

  // 4. Real-time Subscription to Portfolio Highlights
  useEffect(() => {
    const colRef = collection(db, 'portfolioItems');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const items: PortfolioItem[] = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        items.push({
          id: doc.id,
          categoryId: d.categoryId || '',
          imageUrl: d.imageUrl || '',
          titleEn: d.titleEn || '',
          titleBn: d.titleBn || '',
          descriptionEn: d.descriptionEn || '',
          descriptionBn: d.descriptionBn || ''
        });
      });

      if (items.length > 0) {
        setPortfolioItems(items);
      } else {
        setPortfolioItems(DEFAULT_PORTFOLIO);
      }
    }, (err) => {
      console.warn("Using local portfolio fallback:", err.message);
      setPortfolioItems(DEFAULT_PORTFOLIO);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fdfdfc] text-slate-800 selection:bg-blue-600 selection:text-white">
      
      {/* 1. Header Navigation Bar */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        config={config} 
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Interactive Banners Slider & Introduction */}
        <Hero lang={lang} />

        {/* 3. Services Directory List (The 9 Facebook Ads Services with customized wa.link funnels) */}
        <Services lang={lang} />

        {/* 4. Experience Statistics & Quality Badges */}
        <Experience lang={lang} />

        {/* 5. Benefits Summary (24/7 Live Support, Accurate on-time delivery, Fast setup) */}
        <BuyersBenefits lang={lang} />

        {/* 6. Static Screenshots Evidence Proof Container with zoom lightbox functionality */}
        <WorkProof lang={lang} />

        {/* 7. Image Gallery tabs showcasing Meta Certifications & Campaign Ad Profits reports */}
        <ImageGallery 
          lang={lang} 
          categories={categories} 
          portfolioItems={portfolioItems} 
        />

      </main>

      {/* 8. Direct Consultation Submission Footer & Floating Chat elements */}
      <Footer 
        lang={lang} 
        config={config} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 9. Administrative Settings Panel (Conditional overlay) */}
      {isAdminOpen && (
        <AdminPanel 
          lang={lang} 
          onClose={() => setIsAdminOpen(false)}
          config={config}
          categories={categories}
          portfolioItems={portfolioItems}
        />
      )}

    </div>
  );
}
