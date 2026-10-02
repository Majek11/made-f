
CREATE TABLE public.trustees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL DEFAULT '',
  slug text NOT NULL UNIQUE,
  short_bio text NOT NULL DEFAULT '',
  full_bio text,
  image_url text,
  education text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.trustees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active trustees" ON public.trustees
  FOR SELECT USING (is_active = true OR is_admin());

CREATE POLICY "Admins can insert trustees" ON public.trustees
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update trustees" ON public.trustees
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete trustees" ON public.trustees
  FOR DELETE USING (is_admin());

CREATE TRIGGER update_trustees_updated_at
  BEFORE UPDATE ON public.trustees
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
