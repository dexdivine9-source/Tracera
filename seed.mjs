import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read env vars from process (handled by Node 20+ --env-file flag)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Missing environment variables. Make sure you run with the --env-file flag!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function seed() {
  console.log("📦 Loading seed data from seed/projects.json...");
  const projectsData = fs.readFileSync(path.resolve('./seed/projects.json'), 'utf-8');
  let projects = JSON.parse(projectsData);

  // We are stripping the raw string IDs ('1', '2') from the JSON 
  // so Supabase can automatically generate unique UUIDs for us in the id column.
  const projectsToInsert = projects.map(({ id, ...project }) => project);

  console.log(`🚀 Inserting ${projectsToInsert.length} projects into Supabase...`);
  
  const { data, error } = await supabase.from('projects').insert(projectsToInsert);

  if (error) {
    console.error("❌ Error inserting data:", error.message, error.details);
  } else {
    console.log("✅ Successfully seeded 25 projects to Supabase!");
  }
}

seed();
