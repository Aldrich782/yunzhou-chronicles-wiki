-- Add spirit_stones column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN spirit_stones integer NOT NULL DEFAULT 0;

-- Update the handle_new_user function to give initial spirit stones instead of flowers/eggs
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, nickname, spirit_stones, flowers_balance, eggs_balance)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nickname', '访客'), 10, 0, 0);
  RETURN NEW;
EXCEPTION WHEN unique_violation THEN RETURN NEW;
END;
$function$;