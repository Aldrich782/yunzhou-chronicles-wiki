-- Create lottery draws table to track daily lottery attempts
CREATE TABLE public.lottery_draws (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  draw_date DATE NOT NULL DEFAULT CURRENT_DATE,
  reward_amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, draw_date)
);

-- Enable Row Level Security
ALTER TABLE public.lottery_draws ENABLE ROW LEVEL SECURITY;

-- Create policies for lottery draws
CREATE POLICY "Users can view their own lottery draws" 
ON public.lottery_draws 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own lottery draws" 
ON public.lottery_draws 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);