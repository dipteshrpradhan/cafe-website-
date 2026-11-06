export type DietaryType = 'veg' | 'non-veg' | 'vegan';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  dietary: DietaryType;
  description: string;
  image: string;
  isPopular?: boolean;
  isSeasonal?: boolean;
  isChefSpecial?: boolean;
  inStock: boolean;
  prepTimeMinutes?: number;
  calories?: number;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customization?: {
    milkChoice?: string;
    sugarLevel?: string;
    extraNote?: string;
  };
}

export type OutletLocation = 'Nayapalli (Ekamra Kanan Road)' | 'Saheed Nagar (Bhubaneswar Central)';
export type SeatingZone = 'Captain\'s Cabin (Indoor AC Lounge)' | 'The Sun Deck (Lush Garden Terrace)' | 'The Library Nook (Quiet Work Corner)';

export interface Reservation {
  id: string;
  outlet: OutletLocation;
  zone: SeatingZone;
  guestName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  occasion?: string;
  specialRequests?: string;
  status: 'Confirmed' | 'Seated' | 'Cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  date: string;
  visitType: 'Work & Coffee' | 'Friends Hangout' | 'Date Night' | 'Weekend Brunch' | 'Quick Bite';
  comment: string;
  dishRecommended?: string;
  verifiedDiner: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ambiance' | 'coffee' | 'food' | 'community';
  image: string;
  caption: string;
  likes: number;
  instagramTag: string;
  date: string;
}

export interface Announcement {
  id: string;
  badge: string;
  headline: string;
  subtext: string;
  isActive: boolean;
  actionText?: string;
  actionTarget?: string;
}

export interface LoyaltyMember {
  memberId: string;
  name: string;
  phone: string;
  tier: 'Cabin Crew' | 'First Mate' | 'Quartermaster' | 'Captain';
  points: number;
  stampsCollected: number; // 0 to 6
  freeRewardAvailable: boolean;
  joinDate: string;
}
