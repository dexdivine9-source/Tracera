-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT,
    country TEXT,
    x_handle TEXT,
    website TEXT,
    status TEXT DEFAULT 'Building',
    is_verified BOOLEAN DEFAULT false,
    tvl NUMERIC DEFAULT 0,
    volume_24h NUMERIC DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view projects
CREATE POLICY "Allow public read access" 
ON projects FOR SELECT 
TO public 
USING (true);

-- Allow anyone to submit projects (for the submission form)
CREATE POLICY "Allow public insert access" 
ON projects FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow service role to do everything
CREATE POLICY "Allow service_role full access" 
ON projects FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
