/**
 * Shared type definitions for the Tracera database.
 * These match the Supabase 'projects' table schema defined in
 * supabase/migrations/0001_initial_schema.sql
 */

export interface ProjectRow {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  country: string | null;
  x_handle: string | null;
  website: string | null;
  status: string | null;
  is_verified: boolean | null;
  tvl: number | null;
  volume_24h: number | null;
}

export interface ProjectInsert {
  name: string;
  slug: string;
  description?: string;
  category?: string;
  country?: string;
  x_handle?: string;
  website?: string;
  status?: string;
  is_verified?: boolean;
  tvl?: number;
  volume_24h?: number;
}
