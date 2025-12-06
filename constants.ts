import { BusinessCategory, BusinessListing, SubscriptionPlan, SubscriptionTier, UserRole } from './types';

export const APP_NAME = "FaithBiz";
export const THEME_COLOR = "red-600";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: SubscriptionTier.REGULAR,
    name: "Regular",
    price: 300,
    period: 'year',
    features: ["Listing on FaithBiz App", "Basic Profile"],
    platforms: ["FaithBiz"],
    color: "bg-gray-100 border-gray-200 text-gray-800"
  },
  {
    id: SubscriptionTier.SILVER,
    name: "Silver",
    price: 500,
    period: 'year',
    features: ["FaithBiz Listing", "Pick 3 External Platforms", "Priority Support"],
    platforms: ["FaithBiz", "Facebook*", "Instagram*", "TikTok*", "Website*"],
    color: "bg-slate-100 border-slate-300 text-slate-800"
  },
  {
    id: SubscriptionTier.GOLD,
    name: "Gold",
    price: 1000,
    period: 'year',
    features: ["FaithBiz Listing", "Social Media Blast", "Video Ad Hosting"],
    platforms: ["FaithBiz", "Facebook", "Instagram", "TikTok"],
    color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    recommended: true
  },
  {
    id: SubscriptionTier.PLATINUM,
    name: "Platinum",
    price: 5000,
    period: 'year',
    features: ["All Platforms", "Homepage Feature", "Dedicated Account Manager", "Website SEO"],
    platforms: ["FaithBiz", "Facebook", "Instagram", "TikTok", "Website"],
    color: "bg-slate-900 border-slate-800 text-white"
  }
];

export const MOCK_LISTINGS: BusinessListing[] = [
  {
    id: '1',
    name: "Grace & Truth Bookstore",
    category: BusinessCategory.RETAIL,
    description: "A wide selection of bibles, study guides, and gifts for the whole family. Join us for weekly reading groups.",
    phone: "555-0101",
    address: "123 Gospel Way, Nashville, TN",
    imageUrl: "https://picsum.photos/400/300?random=1",
    subscriptionTier: SubscriptionTier.GOLD,
    status: 'active',
    ownerId: 'owner1',
    createdAt: new Date()
  },
  {
    id: '2',
    name: "Daily Bread Bakery",
    category: BusinessCategory.FOOD,
    description: "Freshly baked sourdough and pastries every morning. A portion of all proceeds goes to the local food bank.",
    phone: "555-0102",
    address: "456 Market St, Nashville, TN",
    imageUrl: "https://picsum.photos/400/300?random=2",
    subscriptionTier: SubscriptionTier.PLATINUM,
    status: 'active',
    ownerId: 'owner2',
    createdAt: new Date()
  },
  {
    id: '3',
    name: "Shepherd's Counseling",
    category: BusinessCategory.COMMUNITY,
    description: "Faith-based family and individual counseling services. We are here to listen and guide.",
    phone: "555-0103",
    address: "789 Quiet Ln, Nashville, TN",
    imageUrl: "https://picsum.photos/400/300?random=3",
    subscriptionTier: SubscriptionTier.REGULAR,
    status: 'active',
    ownerId: 'owner3',
    createdAt: new Date()
  },
   {
    id: '4',
    name: "Carpenter's Hands Construction",
    category: BusinessCategory.SERVICES,
    description: "Honest, reliable home renovation and repair. Specializing in historic home restoration.",
    phone: "555-0104",
    address: "321 Build Ave, Nashville, TN",
    imageUrl: "https://picsum.photos/400/300?random=4",
    subscriptionTier: SubscriptionTier.SILVER,
    status: 'pending',
    ownerId: 'owner4',
    createdAt: new Date()
  }
];

export const ADMIN_USER = {
  id: 'admin1',
  name: 'System Admin',
  email: 'admin@faithbiz.com',
  role: UserRole.ADMIN
};

export const MOCK_OWNER = {
  id: 'owner_new',
  name: 'John Doe',
  email: 'john@example.com',
  role: UserRole.BUSINESS_OWNER
};