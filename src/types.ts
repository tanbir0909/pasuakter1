export type Language = 'en' | 'bn';

export interface AppConfig {
  name: string;
  logoUrl: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface PortfolioItem {
  id: string;
  categoryId: string; // 'certifications' | 'profit' or custom
  imageUrl: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
}

export interface LeadInquiry {
  id: string;
  name: string;
  businessType: string;
  message: string;
  timestamp: string; // ISO date string
}
