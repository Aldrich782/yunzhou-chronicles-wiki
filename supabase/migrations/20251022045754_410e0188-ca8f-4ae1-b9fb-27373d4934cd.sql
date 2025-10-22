-- Add length constraints to prevent storage abuse
ALTER TABLE public.comments 
ADD CONSTRAINT author_length CHECK (char_length(author) > 0 AND char_length(author) <= 50),
ADD CONSTRAINT content_length CHECK (char_length(content) > 0 AND char_length(content) <= 2000);

-- Comments are intentionally immutable (no UPDATE/DELETE policies)
-- This prevents vandalism and content manipulation
-- Once posted, comments cannot be changed or deleted