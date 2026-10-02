-- Allow users to read their own role (fixes admin login chicken-and-egg issue)
CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);