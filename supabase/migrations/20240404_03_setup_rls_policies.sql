-- 1. Enable RLS for all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- 2. Create policies for 'users' table
-- Users can view their own profile.
CREATE POLICY "Allow individual user select access" ON public.users
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

-- Users can update their own profile.
CREATE POLICY "Allow individual user update access" ON public.users
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Note: INSERT is handled by the trigger `handle_new_user`. DELETE might be restricted or handled differently later.

-- 3. Create policies for 'messages' table
-- Users can view their own messages.
CREATE POLICY "Allow individual user select access" ON public.messages
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Users can insert their own messages.
CREATE POLICY "Allow individual user insert access" ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- Users can update their own messages.
CREATE POLICY "Allow individual user update access" ON public.messages
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Users can delete their own messages.
CREATE POLICY "Allow individual user delete access" ON public.messages
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- 4. Create policies for 'daily_summaries' table
-- Users can view their own summaries.
CREATE POLICY "Allow individual user select access" ON public.daily_summaries
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Users can insert their own summaries (for MVP).
CREATE POLICY "Allow individual user insert access" ON public.daily_summaries
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- Users can update their own summaries (for MVP).
CREATE POLICY "Allow individual user update access" ON public.daily_summaries
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Users can delete their own summaries (for MVP).
CREATE POLICY "Allow individual user delete access" ON public.daily_summaries
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- 5. Create policies for 'insights' table
-- Users can view their own insights.
CREATE POLICY "Allow individual user select access" ON public.insights
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Users can insert their own insights (for MVP).
CREATE POLICY "Allow individual user insert access" ON public.insights
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- Users can update their own insights (for MVP).
CREATE POLICY "Allow individual user update access" ON public.insights
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Users can delete their own insights (for MVP).
CREATE POLICY "Allow individual user delete access" ON public.insights
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id); 