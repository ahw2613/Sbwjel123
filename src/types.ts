export type Language = 'en' | 'ko';

export type PropertyType = 
  | 'Single Family'
  | 'Condominium'
  | 'Townhouse'
  | 'Multi-Family'
  | 'Luxury Estate'
  | 'Co-op';

export type ListingStatus = 'For Sale' | 'For Rent' | 'Pending' | 'Sold';

export interface Agent {
  id: string;
  name: string;
  nameKo: string;
  title: string;
  titleKo: string;
  license: string;
  phone: string;
  email: string;
  image: string;
  languages: string[];
}

export interface Property {
  id: string;
  mlsNumber: string;
  titleEn: string;
  titleKo: string;
  price: number;
  status: ListingStatus;
  isRental: boolean;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  beds: number;
  baths: number;
  halfBaths?: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  propertyType: PropertyType;
  parking: string;
  parkingKo: string;
  heating: string;
  cooling: string;
  annualTax: number;
  hoaFee?: number;
  descriptionEn: string;
  descriptionKo: string;
  featuresEn: string[];
  featuresKo: string[];
  images: string[];
  latitude: number;
  longitude: number;
  agent: Agent;
  featured?: boolean;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  koreanName: string;
  county: string;
  zipCodes: string[];
  taglineEn: string;
  taglineKo: string;
  overviewEn: string;
  overviewKo: string;
  transitToNycEn: string;
  transitToNycKo: string;
  schoolsEn: string;
  schoolsKo: string;
  housingStyleEn: string;
  housingStyleKo: string;
  medianPriceBuy: string;
  medianRent: string;
  heroImage: string;
  latitude: number;
  longitude: number;
}

export interface SearchFilterState {
  keyword: string;
  intent: 'buy' | 'rent';
  city: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minBaths: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'sqft-desc';
}

export interface ValuationRequest {
  propertyAddress: string;
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: 'Buying' | 'Renting' | 'Selling' | 'Relocation' | 'General';
  preferredLocation: string;
  budget: string;
  message: string;
}

export interface SocialPost {
  id: string;
  platform: 'youtube' | 'instagram';
  titleKo: string;
  titleEn: string;
  channelName: string;
  thumbnail: string;
  date: string;
  metric: string;
  videoDuration?: string;
  videoEmbedUrl?: string;
  externalUrl: string;
  captionKo: string;
  captionEn: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  clientNameKo: string;
  clientTypeKo: string;
  clientTypeEn: string;
  location: string;
  rating: number;
  quoteKo: string;
  quoteEn: string;
  storyKo: string;
  storyEn: string;
  date: string;
  transactionType: 'buy' | 'sell' | 'rent';
}

export interface ServiceProcessStep {
  step: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  keyHighlightKo?: string;
  keyHighlightEn?: string;
}

export interface RealEstateService {
  id: 'sell' | 'rent' | 'buy';
  titleKo: string;
  titleEn: string;
  taglineKo: string;
  taglineEn: string;
  summaryKo: string;
  summaryEn: string;
  steps: ServiceProcessStep[];
  ctaKo: string;
  ctaEn: string;
  targetPage: string;
}
