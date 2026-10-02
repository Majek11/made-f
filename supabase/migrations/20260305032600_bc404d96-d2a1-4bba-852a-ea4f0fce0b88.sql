
-- Advisors table (mirrors trustees)
CREATE TABLE public.advisors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL UNIQUE,
  short_bio TEXT NOT NULL DEFAULT '',
  full_bio TEXT,
  image_url TEXT,
  education TEXT,
  area TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.advisors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active advisors" ON public.advisors FOR SELECT USING ((is_active = true) OR is_admin());
CREATE POLICY "Admins can insert advisors" ON public.advisors FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update advisors" ON public.advisors FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete advisors" ON public.advisors FOR DELETE USING (is_admin());

-- Contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organisation TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read submissions" ON public.contact_submissions FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update submissions" ON public.contact_submissions FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete submissions" ON public.contact_submissions FOR DELETE USING (is_admin());

-- Trigger for updated_at on advisors
CREATE TRIGGER update_advisors_updated_at BEFORE UPDATE ON public.advisors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
