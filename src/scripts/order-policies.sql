ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products: select for service_role"
  ON public.products
  FOR SELECT
--   WITH CHECK (auth.role() = 'service_role');
  USING (auth.role() = 'service_role');

CREATE POLICY "products: insert for service_role"
  ON public.products
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "products: update for service_role"
  ON public.products
  FOR UPDATE
--   USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "products: delete for service_role"
  ON public.products
  FOR DELETE
  USING (auth.role() = 'service_role');
--   WITH CHECK (auth.role() = 'service_role');
