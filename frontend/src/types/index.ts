export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  displayOrder: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string; // wedding, portrait, fashion, event, commercial, couples, travel, lifestyle
  description: string;
  cloudinaryPublicId: string;
  imageUrl: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  isFeatured: boolean;
  displayOrder: number;
  clientName?: string;
  location?: string;
  year?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startingPrice: string;
  numericPrice: number;
  imageUrl: string;
  iconName: string;
  features: string[];
  categorySlug: string;
}

export interface Package {
  id: string;
  name: string;
  tagline: string;
  price: string;
  numericPrice: number;
  isPopular: boolean;
  badge?: string;
  duration: string;
  editedPhotos: string;
  deliverables: string[];
  accentColor?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  category: string;
  eventDate: string;
  location: string;
  rating: number;
  quote: string;
  clientAvatar: string;
  featuredPhotoUrl?: string;
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photographyType: string;
  preferredDate: string;
  location: string;
  budget: string;
  message: string;
  status: 'pending' | 'contacted' | 'booked' | 'archived';
  createdAt: string;
  emailNotificationSent?: boolean;
}

export interface DjangoAdminStats {
  totalEnquiries: number;
  pendingEnquiries: number;
  totalGalleryImages: number;
  featuredImages: number;
  totalServices: number;
  totalPackages: number;
}
