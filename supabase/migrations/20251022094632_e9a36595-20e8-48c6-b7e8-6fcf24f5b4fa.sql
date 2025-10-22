-- Clean up and rebuild database structure for auth

-- Step 1: Drop existing constraints if any
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_key;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;

-- Step 2: Clean invalid data
DELETE FROM public.profiles 
WHERE user_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

DELETE FROM public.character_votes 
WHERE user_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

DELETE FROM public.check_ins 
WHERE user_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

DELETE FROM public.chat_messages 
WHERE user_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- Step 3: Convert to UUID
ALTER TABLE public.profiles ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE public.character_votes ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE public.check_ins ALTER COLUMN user_id TYPE uuid USING user_id::uuid;
ALTER TABLE public.chat_messages ALTER COLUMN user_id TYPE uuid USING user_id::uuid;

-- Step 4: Delete orphaned records
DELETE FROM public.profiles WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.character_votes WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.check_ins WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM public.chat_messages WHERE user_id NOT IN (SELECT id FROM auth.users);

-- Step 5: Add constraints
ALTER TABLE public.profiles 
  ADD CONSTRAINT profiles_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.profiles 
  ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);

-- Step 6: Update RLS policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create votes" ON public.character_votes;
CREATE POLICY "Users can create votes" 
  ON public.character_votes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own check-ins" ON public.check_ins;
DROP POLICY IF EXISTS "Users can view their own check-ins" ON public.check_ins;

CREATE POLICY "Users can create their own check-ins" 
  ON public.check_ins FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own check-ins" 
  ON public.check_ins FOR SELECT 
  USING (auth.uid() = user_id);

-- Step 7: Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nickname, flowers_balance, eggs_balance)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nickname', '访客'), 10, 10);
  RETURN NEW;
EXCEPTION WHEN unique_violation THEN RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();