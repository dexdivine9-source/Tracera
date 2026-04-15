"use client";

import { useState, useEffect, useMemo } from "react";
import { SearchX } from "lucide-react";
import ProjectCard, { Project } from "./ProjectCard";
import ProjectSkeleton from "../ui/ProjectSkeleton";

import { supabase } from "@/lib/supabase";
import type { ProjectRow } from "@/types/project";


const formatCurrency = (val: number | null) => {
  if (!val) return "$0";
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
  return `$${val}`;
};

const MAIN_COUNTRIES = ["Nigeria", "Kenya", "South Africa", "Ghana"];
const MAIN_CATEGORIES = ["Payments", "DeFi", "RWA", "Loyalty", "Remittances", "Gateways", "Infrastructure"];

interface ProjectDirectoryProps {
  searchQuery: string;
  selectedCountries: string[];
  selectedCategories: string[];
  onClearFilters: () => void;
}

export default function ProjectDirectory({
  searchQuery,
  selectedCountries,
  selectedCategories,
  onClearFilters
}: ProjectDirectoryProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      
      if (error) {
        console.error(error);
        setError("Failed to load projects.");
        setIsLoading(false);
        return;
      }

      if (data) {
        const rows = data as unknown as ProjectRow[];
        const formatted = rows.map(db => ({
          id: db.id,
          slug: db.slug,
          name: db.name,
          category: db.category || 'Others',
          country: db.country || 'Others',
          description: db.description || '',
          tvl: formatCurrency(db.tvl),
          volume: formatCurrency(db.volume_24h),
          activeAddresses: "Active",
          status: (db.status as "Active" | "Inactive" | "Building") || "Building",
          isVerified: !!db.is_verified
        }));
        setProjects(formatted);
      }
      setIsLoading(false);
    }
    
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // 1. Search Query Filter
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query || 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query);

      // 2. Country Filter
      const matchesCountry = selectedCountries.length === 0 || 
        selectedCountries.includes(p.country) || 
        (selectedCountries.includes("Others") && !MAIN_COUNTRIES.includes(p.country));

      // 3. Category Filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(p.category) || 
        (selectedCategories.includes("Others") && !MAIN_CATEGORIES.includes(p.category));

      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [searchQuery, selectedCountries, selectedCategories]);

  if (isLoading) {
    return <ProjectSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card border border-destructive/50 rounded-xl">
        <h3 className="text-xl font-bold tracking-tight mb-2 text-destructive">Oops! Data Fetch Error</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card border border-border border-dashed rounded-xl">
        <div className="bg-secondary/50 p-4 rounded-full mb-4">
          <SearchX className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold tracking-tight mb-2">No projects found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any projects matching your current filters. Try adjusting your search criteria or clearing filters.
        </p>
        <button 
          onClick={onClearFilters}
          className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
