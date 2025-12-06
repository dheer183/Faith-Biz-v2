export enum UserRole {
  GUEST = 'GUEST',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  ADMIN = 'ADMIN'
}

export enum BusinessCategory {
  SERVICES = 'Faith & Fellowship Services',
  FOOD = 'Daily Bread (Food & Dining)',
  RETAIL = 'Kingdom Retail',
  COMMUNITY = 'Community Support'
}

export enum SubscriptionTier {
  PLATINUM = 'Platinum',
  GOLD = 'Gold',
  SILVER = 'Silver',
  REGULAR = 'Regular'
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  period: 'year';
  features: string[];
  platforms: string[];
  color: string;
  recommended?: boolean;
}

export interface BusinessListing {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  phone: string;
  address: string;
  website?: string;
  imageUrl: string;
  videoUrl?: string; // Placeholder for uploaded video
  subscriptionTier: SubscriptionTier;
  status: 'pending' | 'active' | 'rejected';
  ownerId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}