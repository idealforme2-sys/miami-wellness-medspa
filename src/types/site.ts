export type Locale = "en" | "es";

export interface BusinessHour {
  day: string;
  hours: string;
}

export interface BookingConfig {
  embedCode?: string;
  fallbackUrl: string;
  iframeUrl: string;
  ctaLabel: string;
  serviceContext: string;
}

export interface SiteSettings {
  locale: Locale;
  siteName: string;
  brandTagline: string;
  phoneDisplay: string;
  phoneHref: string;
  smsHref: string;
  email?: string;
  fullAddress: string;
  cityStateZip: string;
  mapEmbedUrl: string;
  mapUrl: string;
  instagramUrl: string;
  googleReviewsUrl: string;
  classpassUrl: string;
  vagaroUrl: string;
  hours: BusinessHour[];
  disclaimer: string;
  booking: BookingConfig;
}

export interface HeroBlock {
  eyebrow: string;
  heading: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface ServiceCategory {
  _id?: string;
  title: string;
  slug: string;
  order: number;
  icon: string;
  seoIntro: string;
}

export interface ServiceItem {
  _id?: string;
  name: string;
  slug: string;
  categorySlug: string;
  duration: string;
  startingPrice: string;
  bestFor: string;
  shortDescription: string;
  benefits: string[];
  contraindicationNote?: string;
  order: number;
}

export type ReviewSource = "Google" | "ClassPass" | "Vagaro";

export interface Testimonial {
  _id?: string;
  quote: string;
  source: ReviewSource;
  reviewerName: string;
  date: string;
  rating: number;
  sourceUrl: string;
  order: number;
}

export interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  order: number;
}

export interface GalleryItem {
  _id?: string;
  title: string;
  treatmentType: string;
  disclaimer: string;
  altText: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  order: number;
}

export interface Announcement {
  _id?: string;
  message: string;
  label?: string;
  href?: string;
  active: boolean;
  order: number;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  description: string;
}

export interface SiteContent {
  siteSettings: SiteSettings;
  heroBlock: HeroBlock;
  serviceCategories: ServiceCategory[];
  serviceItems: ServiceItem[];
  testimonials: Testimonial[];
  faqItems: FaqItem[];
  galleryItems: GalleryItem[];
  announcements: Announcement[];
  stats: StatItem[];
  whyChooseUsBullets: string[];
}

export interface SitePayload {
  siteSettings?: Partial<SiteSettings>;
  heroBlock?: Partial<HeroBlock>;
  serviceCategories?: ServiceCategory[];
  serviceItems?: ServiceItem[];
  testimonials?: Testimonial[];
  faqItems?: FaqItem[];
  galleryItems?: GalleryItem[];
  announcements?: Announcement[];
  stats?: StatItem[];
  whyChooseUsBullets?: string[];
}
