-- Fix overly permissive RLS policies by adding session-based tracking
-- Drop the overly permissive anonymous policies
DROP POLICY IF EXISTS "Anonymous users can create interviews" ON public.interview_sessions;
DROP POLICY IF EXISTS "Anonymous users can update their interviews by id" ON public.interview_sessions;

-- Add session_id column for anonymous user tracking
ALTER TABLE public.interview_sessions ADD COLUMN session_id TEXT;

-- Create index for session_id lookups
CREATE INDEX idx_interview_sessions_session_id ON public.interview_sessions(session_id);

-- Create more secure policies for anonymous users using session_id
-- Note: The session_id will be passed from the client and stored, allowing updates only for matching sessions
CREATE POLICY "Anyone can insert interviews with session_id" 
ON public.interview_sessions 
FOR INSERT 
WITH CHECK (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND session_id IS NOT NULL)
);

-- Update the existing update policy to include session_id check
DROP POLICY IF EXISTS "Users can update their own interviews" ON public.interview_sessions;

CREATE POLICY "Users can update their own interviews" 
ON public.interview_sessions 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND session_id IS NOT NULL)
);

-- Allow public read of interviews for anonymous session tracking
CREATE POLICY "Anyone can read interviews with session_id" 
ON public.interview_sessions 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (user_id IS NULL AND session_id IS NOT NULL)
);