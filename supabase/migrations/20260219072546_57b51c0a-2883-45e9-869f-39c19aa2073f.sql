
-- =============================================
-- 1. ENUM for roles
-- =============================================
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- =============================================
-- 2. PROFILES TABLE (synced with auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 3. USER ROLES TABLE (separate from profiles!)
-- =============================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. SITE SETTINGS TABLE
-- =============================================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 5. NEWS ITEMS TABLE
-- =============================================
CREATE TABLE public.news_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('blog', 'press_release', 'speech', 'newsletter', 'communique', 'photo_news', 'made_in_news')),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  image_url TEXT,
  external_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 6. MEDIA UPLOADS TABLE
-- =============================================
CREATE TABLE public.media_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  alt_text TEXT,
  bucket_path TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.media_uploads ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 7. STORAGE BUCKETS
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('site-media', 'site-media', true);

-- =============================================
-- 8. HELPER FUNCTIONS (SECURITY DEFINER)
-- =============================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- =============================================
-- 9. AUTO-CREATE PROFILE ON SIGNUP
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 10. RLS POLICIES — PROFILES
-- =============================================
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- =============================================
-- 11. RLS POLICIES — USER ROLES
-- =============================================
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.is_admin());

-- =============================================
-- 12. RLS POLICIES — SITE SETTINGS
-- =============================================
CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete site settings"
  ON public.site_settings FOR DELETE
  USING (public.is_admin());

-- =============================================
-- 13. RLS POLICIES — NEWS ITEMS
-- =============================================
CREATE POLICY "Anyone can read published news items"
  ON public.news_items FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can insert news items"
  ON public.news_items FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update news items"
  ON public.news_items FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete news items"
  ON public.news_items FOR DELETE
  USING (public.is_admin());

-- =============================================
-- 14. RLS POLICIES — MEDIA UPLOADS
-- =============================================
CREATE POLICY "Anyone can read media uploads"
  ON public.media_uploads FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert media"
  ON public.media_uploads FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update media"
  ON public.media_uploads FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete media"
  ON public.media_uploads FOR DELETE
  USING (public.is_admin());

-- =============================================
-- 15. STORAGE POLICIES
-- =============================================
CREATE POLICY "Public can read site media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

CREATE POLICY "Admins can upload site media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-media' AND public.is_admin());

CREATE POLICY "Admins can update site media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'site-media' AND public.is_admin());

CREATE POLICY "Admins can delete site media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-media' AND public.is_admin());

-- =============================================
-- 16. DEFAULT SITE SETTINGS SEED DATA
-- =============================================
INSERT INTO public.site_settings (key, value) VALUES
  ('logo_url', ''),
  ('site_name', 'Action Impact Bridge'),
  ('tagline', 'Bridging Communities Through Informed Action'),
  ('hero_title', 'Bridging Communities Through Informed Action'),
  ('hero_subtitle', 'We champion evidence-based journalism, community engagement, and inclusive dialogue to drive sustainable development across Africa.'),
  ('contact_email', ''),
  ('contact_phone', ''),
  ('contact_address', ''),
  ('social_twitter', ''),
  ('social_facebook', ''),
  ('social_instagram', ''),
  ('social_linkedin', ''),
  ('social_youtube', '');

-- =============================================
-- 17. TIMESTAMPS TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_items_updated_at
  BEFORE UPDATE ON public.news_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
