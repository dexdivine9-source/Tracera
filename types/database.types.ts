export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
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
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          slug: string;
          description?: string | null;
          category?: string | null;
          country?: string | null;
          x_handle?: string | null;
          website?: string | null;
          status?: string | null;
          is_verified?: boolean | null;
          tvl?: number | null;
          volume_24h?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          category?: string | null;
          country?: string | null;
          x_handle?: string | null;
          website?: string | null;
          status?: string | null;
          is_verified?: boolean | null;
          tvl?: number | null;
          volume_24h?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
