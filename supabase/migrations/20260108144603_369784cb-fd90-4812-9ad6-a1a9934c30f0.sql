-- Create interview_sessions table to store interview history
CREATE TABLE public.interview_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  experience TEXT NOT NULL,
  industry TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  feedback TEXT,
  overall_score INTEGER,
  communication_score INTEGER,
  technical_score INTEGER,
  confidence_score INTEGER,
  improvement_areas TEXT[],
  strengths TEXT[],
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own interviews" 
ON public.interview_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interviews" 
ON public.interview_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interviews" 
ON public.interview_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow anonymous users to create interviews (for non-logged-in users)
CREATE POLICY "Anonymous users can create interviews" 
ON public.interview_sessions 
FOR INSERT 
WITH CHECK (user_id IS NULL);

CREATE POLICY "Anonymous users can update their interviews by id" 
ON public.interview_sessions 
FOR UPDATE 
USING (user_id IS NULL);

-- Create index for faster queries
CREATE INDEX idx_interview_sessions_user_id ON public.interview_sessions(user_id);
CREATE INDEX idx_interview_sessions_status ON public.interview_sessions(status);