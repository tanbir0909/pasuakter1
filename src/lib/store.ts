import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { AppConfig, Category, PortfolioItem, LeadInquiry } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// PREMIUM LOCAL FALLBACKS (Guarantees the site runs and loads immediately without crashing)
export const DEFAULT_CONFIG: AppConfig = {
  name: "Pashu Akter Riya",
  logoUrl: "https://i.ibb.co.com/cSnfRjFJ/IMG-20260815-135937.jpg"
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'certifications', nameEn: "Certifications", nameBn: "সার্টিফিকেশন সমূহ" },
  { id: 'profit', nameEn: "My Profit", nameBn: "মাই প্রফিট" }
];

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  // Certifications (4 items)
  {
    id: 'cert-1',
    categoryId: 'certifications',
    imageUrl: 'https://i.ibb.co.com/G4MPX0vM/IMG-20260815-152356.jpg',
    titleEn: 'Meta Certified Digital Marketing Associate',
    titleBn: 'মেটা সার্টিফাইড ডিজিটাল মার্কেটিং অ্যাসোসিয়েট',
    descriptionEn: 'Official certification verifying deep strategic knowledge of Facebook platform marketing and campaign optimization.',
    descriptionBn: 'ফেসবুক মার্কেটিং প্ল্যাটফর্ম এবং বিজ্ঞাপনের বাজেট অপ্টিমাইজেশন সম্পর্কিত যাচাইকৃত প্রফেশনাল মেটা সার্টিফিকেট।'
  },
  {
    id: 'cert-2',
    categoryId: 'certifications',
    imageUrl: 'https://i.ibb.co.com/27jw9r1N/IMG-20260815-152342.jpg',
    titleEn: 'Meta Certified Media Planning Professional',
    titleBn: 'মেটা সার্টিফাইড মিডিয়া প্ল্যানিং প্রফেশনাল',
    descriptionEn: 'Advanced certification validating expert knowledge of media planning, demographic analysis, and audience creation.',
    descriptionBn: 'উন্নত কাস্টমার ডেমোগ্রাফিক অ্যানালিসিস এবং টার্গেটেড মিডিয়া প্ল্যানিংয়ের ওপর মেটা সার্টিফাইড প্রফেশনাল স্বীকৃতি।'
  },
  {
    id: 'cert-3',
    categoryId: 'certifications',
    imageUrl: 'https://i.ibb.co.com/Fq36mS8W/IMG-20260815-152332.jpg',
    titleEn: 'CertiProf Digital Marketing Professional',
    titleBn: 'সার্টিপ্রফ ডিজিটাল মার্কেটিং প্রফেশনাল',
    descriptionEn: 'International accreditation demonstrating skills in end-to-end digital branding and high-performance strategy building.',
    descriptionBn: 'ডিজিটাল ব্র্যান্ডিং, বিজ্ঞাপন ও হাই-পারফরম্যান্স কাস্টমার সেলস ফানেল তৈরির আন্তর্জাতিক সার্টিপ্রফ সার্টিফিকেট।'
  },
  {
    id: 'cert-4',
    categoryId: 'certifications',
    imageUrl: 'https://i.ibb.co.com/ynyCJfG7/IMG-20260815-152407.jpg',
    titleEn: 'Advanced Digital Marketing Specialist',
    titleBn: 'অ্যাডভান্সড ডিজিটাল মার্কেটিং স্পেশালিস্ট',
    descriptionEn: 'Specialized credential validating state-of-the-art marketing, tracking setup, and multi-channel campaign executions.',
    descriptionBn: 'অ্যাডভান্সড কনভার্সন ট্র্যাকিং এবং সফল সোশ্যাল মিডিয়া ক্যাম্পেইন সেটআপের স্পেশালিস্ট সার্টিফিকেট।'
  },
  
  // My Profit (3 items)
  {
    id: 'profit-1',
    categoryId: 'profit',
    imageUrl: 'https://i.ibb.co.com/K4kmnfv/IMG-20260815-WA0001.jpg',
    titleEn: 'Campaign Sales Growth Report',
    titleBn: 'ক্যাম্পেইন সেলস ও রেভিনিউ বৃদ্ধি',
    descriptionEn: 'Verified sales revenue dashboard proving high customer acquisition rates and outstanding return on investment.',
    descriptionBn: 'উচ্চ কাস্টমার কনভার্সন এবং বিজ্ঞাপনের মাধ্যমে সরাসরি বিক্রয় ও মুনাফা বাড়ার প্রমাণ।'
  },
  {
    id: 'profit-2',
    categoryId: 'profit',
    imageUrl: 'https://i.ibb.co.com/LzrcdnZf/IMG-20260815-WA0004.jpg',
    titleEn: 'Meta Ads Dashboard Return (ROI)',
    titleBn: 'ফেসবুক বিজ্ঞাপনের রিটার্ন ড্যাশবোর্ড',
    descriptionEn: 'Active Ad Account snapshot showcasing lowest cost per result and optimized conversion budgets.',
    descriptionBn: 'সর্বনিম্ন খরচে সর্বোচ্চ কাস্টমার রেসপন্স এবং বাজেট অপ্টিমাইজেশনের সরাসরি অ্যাড ড্যাশবোর্ড রিপোর্ট।'
  },
  {
    id: 'profit-3',
    categoryId: 'profit',
    imageUrl: 'https://i.ibb.co.com/5gFbvLnD/IMG-20260815-WA0002.jpg',
    titleEn: 'Direct Sales & Messenger Conversions',
    titleBn: 'মেসেঞ্জার কনভার্সন ও সেলস ফানেল',
    descriptionEn: 'Proven chat leads and messenger setups showing automatic client responses converted into direct sales.',
    descriptionBn: 'অটোমেটেড মেসেঞ্জার চ্যাট বক্সে গ্রাহকের সরাসরি মেসেজ এবং সেগুলোকে বিক্রয়ে রূপান্তরের চমৎকার প্রমাণ।'
  }
];

// WORK PROOF SECTION (Always static as requested by the user, representing their 6 specific screenshots)
export const STATIC_WORK_PROOFS = [
  {
    id: 'proof-1',
    url: 'https://i.ibb.co.com/m5FzzSq3/Screenshot-2026-08-15-15-27-25-757-com-facebook-katana.jpg',
    titleEn: 'Active Meta Campaign Delivery Proof',
    titleBn: 'অ্যাক্টিভ মেটা ক্যাম্পেইন ডেলিভারি প্রুফ'
  },
  {
    id: 'proof-2',
    url: 'https://i.ibb.co.com/cKQfw63T/Screenshot-2026-08-15-15-27-19-813-com-facebook-katana.jpg',
    titleEn: 'Ad Manager Budget & Conversion Tracking',
    titleBn: 'অ্যাড ম্যানেজার বাজেট ও কনভার্সন ট্র্যাকিং'
  },
  {
    id: 'proof-3',
    url: 'https://i.ibb.co.com/39WYt1c8/Screenshot-2026-08-15-15-27-12-809-com-facebook-katana.jpg',
    titleEn: 'Customer Conversations & Direct Sales Increases',
    titleBn: 'কাস্টমার মেসেজ ও সরাসরি সেলস বৃদ্ধির প্রমাণ'
  },
  {
    id: 'proof-4',
    url: 'https://i.ibb.co.com/vv155YBR/Screenshot-2026-08-15-15-26-59-592-com-facebook-katana.jpg',
    titleEn: 'Page Promotion & Precise Audience Targeting',
    titleBn: 'পেজ প্রোমোশন এবং নিখুঁত অডিয়েন্স টার্গেটিংয়ের প্রমাণ'
  },
  {
    id: 'proof-5',
    url: 'https://i.ibb.co.com/ZzvZhZGc/IMG-20260815-152531.jpg',
    titleEn: 'Budget Optimization & Live Cost Specifications',
    titleBn: 'বাজেট অপ্টিমাইজেশন ও বিজ্ঞাপনের লাইভ খরচ বিবরণী'
  },
  {
    id: 'proof-6',
    url: 'https://i.ibb.co.com/FLnwZFXm/IMG-20260815-152612.jpg',
    titleEn: 'Automated Customer Response Dashboard Setup',
    titleBn: 'অটোমেটেড কাস্টমার রেসপন্স ড্যাশবোর্ড সেটআপ'
  }
];

// FIRESTORE SYNC & OPERATION SERVICES
export async function addInquiry(name: string, businessType: string, message: string): Promise<string> {
  const path = 'inquiries';
  try {
    const docRef = await addDoc(collection(db, path), {
      name,
      businessType,
      message,
      timestamp: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return '';
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  const path = `inquiries/${id}`;
  try {
    await deleteDoc(doc(db, 'inquiries', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function updateAppConfig(name: string, logoUrl: string): Promise<void> {
  const path = 'configs/global';
  try {
    await setDoc(doc(db, 'configs', 'global'), { name, logoUrl }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function addCategory(id: string, nameEn: string, nameBn: string): Promise<void> {
  const path = `categories/${id}`;
  try {
    await setDoc(doc(db, 'categories', id), { id, nameEn, nameBn });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteCategory(id: string): Promise<void> {
  const path = `categories/${id}`;
  try {
    await deleteDoc(doc(db, 'categories', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function addPortfolioItem(
  categoryId: string, 
  imageUrl: string, 
  titleEn: string, 
  titleBn: string,
  descriptionEn: string = '',
  descriptionBn: string = ''
): Promise<void> {
  const path = 'portfolioItems';
  try {
    const customId = `item-${Date.now()}`;
    await setDoc(doc(db, 'portfolioItems', customId), {
      id: customId,
      categoryId,
      imageUrl,
      titleEn,
      titleBn,
      descriptionEn,
      descriptionBn
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const path = `portfolioItems/${id}`;
  try {
    await deleteDoc(doc(db, 'portfolioItems', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// SEED SCRIPT: Easy way to populate the Firestore with original metadata, categories, and images!
export async function seedDefaultData(): Promise<void> {
  try {
    // 1. Seed global config
    await updateAppConfig(DEFAULT_CONFIG.name, DEFAULT_CONFIG.logoUrl);
    
    // 2. Seed default categories
    for (const cat of DEFAULT_CATEGORIES) {
      await addCategory(cat.id, cat.nameEn, cat.nameBn);
    }
    
    // 3. Seed default portfolio highlights
    for (const item of DEFAULT_PORTFOLIO) {
      await setDoc(doc(db, 'portfolioItems', item.id), item);
    }
    
    console.log("Seeding complete successfully!");
  } catch (error) {
    console.error("Error seeding default configurations:", error);
    throw error;
  }
}
