-- MOÇAMBIQUE AGORA - Database Schema
-- Run this in the Supabase SQL Editor

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Authors Table
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  bio TEXT,
  photo_url TEXT,
  role TEXT DEFAULT 'author', -- 'admin', 'editor', 'author'
  social_links JSONB DEFAULT '{}'::jsonb,
  email_internal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Articles Table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  summary TEXT,
  content TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  main_image_url TEXT,
  image_caption TEXT,
  image_credit TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'review', 'published', 'archived'
  is_featured BOOLEAN DEFAULT false,
  is_urgent BOOLEAN DEFAULT false,
  featured_priority INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Tags Table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

-- 6. Create Article_Tags Junction Table
CREATE TABLE article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- 7. Create Article Views (for trending news)
CREATE TABLE article_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  session_id TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create Comments Table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  is_admin_reply BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create Newsletter Table
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create Site Settings Table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Create Ad Slots Table
CREATE TABLE ad_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL, -- 'header', 'home_top', etc.
  ad_unit_id TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles
  SET view_count = view_count + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- INDEXES for performance
CREATE INDEX idx_articles_published_at ON articles(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_article_views_at ON article_views(viewed_at);

-- RLS POLICIES

-- Categories: Public read, Admin write
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);

-- Authors: Public read, Admin write
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read authors" ON authors FOR SELECT USING (true);

-- Articles: Public read only if published, Admin write all
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access articles" ON articles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM authors WHERE user_id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Comments: Public insert, Admin manage
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read approved comments" ON comments FOR SELECT USING (status = 'approved');

-- Newsletter: Public insert, Admin manage
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Site Settings & Ads: Public read, Admin write
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);
ALTER TABLE ad_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read ad_slots" ON ad_slots FOR SELECT USING (true);
