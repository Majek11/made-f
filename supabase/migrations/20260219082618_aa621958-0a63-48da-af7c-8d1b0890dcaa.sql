-- Create hero_slides table
CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_order integer NOT NULL DEFAULT 0,
  tag text NOT NULL DEFAULT '',
  heading text NOT NULL DEFAULT '',
  sub_heading text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read hero slides"
  ON public.hero_slides FOR SELECT USING (true);

CREATE POLICY "Admins can insert hero slides"
  ON public.hero_slides FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update hero slides"
  ON public.hero_slides FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete hero slides"
  ON public.hero_slides FOR DELETE USING (is_admin());

-- Auto-update updated_at
CREATE TRIGGER update_hero_slides_updated_at
  BEFORE UPDATE ON public.hero_slides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed the 4 existing slides
INSERT INTO public.hero_slides (display_order, tag, heading, sub_heading, image_url) VALUES
  (1, 'Social Enterprise · Nigeria', 'Media for Development & Change.', 'MADE Foundation deploys data-driven insights, strategic communication and evidence-based media programmes to drive sustainable development across Nigeria.', ''),
  (2, 'Community First', 'Building Informed Communities.', 'Through Risk Communication & Community Engagement, we empower communities with the knowledge they need to thrive and respond to challenges.', ''),
  (3, 'Journalism Lab', 'Growing the Next Generation of Journalists.', 'MADE-F is a laboratory for budding journalism and communication professionals — bridging the gap between classroom and industry.', ''),
  (4, 'Evidence-Driven', 'Data-Driven Media Action for Nigeria.', 'Every programme we run is powered by robust data, rigorous analysis and social & behavioural change communication frameworks.', '');
