export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order_index: number;
  seo_title?: string;
  seo_description?: string;
}

export interface Author {
  id: string;
  user_id?: string;
  name: string;
  slug: string;
  bio?: string;
  photo_url?: string;
  role: 'admin' | 'editor' | 'author';
  social_links?: Record<string, string>;
  email_internal?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  summary?: string;
  content: string;
  category_id?: string;
  author_id?: string;
  main_image_url?: string;
  image_caption?: string;
  image_credit?: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  is_featured: boolean;
  is_urgent: boolean;
  featured_priority: number;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  og_image_url?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  
  // Joins
  category?: Category;
  author?: Author;
}

export interface SiteSettings {
  site_name: string;
  site_description: string;
  logo_url?: string;
  favicon_url?: string;
  contact_email?: string;
  contact_phone?: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
    telegram?: string;
  };
}

export interface AdSlot {
  id: string;
  name: string;
  ad_unit_id?: string;
  is_active: boolean;
}
