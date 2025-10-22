-- Add flowers and eggs balance to profiles table
ALTER TABLE public.profiles 
ADD COLUMN flowers_balance INTEGER NOT NULL DEFAULT 0,
ADD COLUMN eggs_balance INTEGER NOT NULL DEFAULT 0;

-- Create check_ins table for daily sign-in tracking
CREATE TABLE public.check_ins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  check_in_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, check_in_date)
);

-- Enable RLS for check_ins
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;

-- RLS policies for check_ins
CREATE POLICY "Users can view their own check-ins"
ON public.check_ins
FOR SELECT
USING (true);

CREATE POLICY "Users can create their own check-ins"
ON public.check_ins
FOR INSERT
WITH CHECK (true);

-- Create character_votes table for flowers and eggs
CREATE TABLE public.character_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  character_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('flower', 'egg')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for character_votes
ALTER TABLE public.character_votes ENABLE ROW LEVEL SECURITY;

-- RLS policies for character_votes
CREATE POLICY "Anyone can view character votes"
ON public.character_votes
FOR SELECT
USING (true);

CREATE POLICY "Users can create votes"
ON public.character_votes
FOR INSERT
WITH CHECK (true);