CREATE TABLE public.favorite_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, template_id)
);
ALTER TABLE public.favorite_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own favorites" ON public.favorite_templates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON public.favorite_templates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON public.favorite_templates FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX idx_favorite_templates_user_id ON public.favorite_templates(user_id);
