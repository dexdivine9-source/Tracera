"use client";

import { useState, useEffect, useMemo } from "react";
import { SearchX } from "lucide-react";
import ProjectCard, { Project } from "./ProjectCard";
import ProjectSkeleton from "../ui/ProjectSkeleton";

const DUMMY_PROJECTS: Project[] = [
  { 
    id: "1", 
    slug: "paystack-crypto",
    name: "Paystack Crypto", 
    category: "Payments", 
    country: "Nigeria", 
    description: "Seamless fiat-to-crypto onramp for African businesses. Accept stablecoins instantly.",
    tvl: "$12.5M", 
    volume: "$2.1M", 
    activeAddresses: "12.4K",
    status: "Active",
    isVerified: true
  },
  { 
    id: "2", 
    slug: "yellow-card",
    name: "Yellow Card", 
    category: "Gateways", 
    country: "Pan-Africa", 
    description: "The largest cryptocurrency exchange on the African continent, bringing Solana to the masses.",
    tvl: "$45.2M", 
    volume: "$15.4M", 
    activeAddresses: "85.2K",
    status: "Active",
    isVerified: true
  },
  { 
    id: "3", 
    slug: "ejara",
    name: "Ejara", 
    category: "DeFi", 
    country: "Cameroon", 
    description: "Investment platform allowing Francophone Africa to access tokenized assets and yield.",
    tvl: "$5.1M", 
    volume: "$800K", 
    activeAddresses: "4.1K",
    status: "Active",
    isVerified: false
  },
  { 
    id: "4", 
    slug: "kotani-pay",
    name: "Kotani Pay", 
    category: "Remittances", 
    country: "Kenya", 
    description: "USSD-based crypto wallet enabling unbanked populations to receive Solana remittances.",
    tvl: "$3.2M", 
    volume: "$1.2M", 
    activeAddresses: "22.8K",
    status: "Active",
    isVerified: true
  },
  { 
    id: "5", 
    slug: "lazerpay",
    name: "Lazerpay", 
    category: "Payments", 
    country: "Nigeria", 
    description: "Crypto payment gateway for creators and businesses globally.",
    tvl: "$0", 
    volume: "$0", 
    activeAddresses: "0",
    status: "Inactive",
    isVerified: false
  },
  { 
    id: "6", 
    slug: "fonbnk",
    name: "Fonbnk", 
    category: "Infrastructure", 
    country: "Kenya", 
    description: "Convert prepaid airtime into digital money and Solana tokens instantly.",
    tvl: "$8.4M", 
    volume: "$3.5M", 
    activeAddresses: "15.6K",
    status: "Active",
    isVerified: true
  },
  { 
    id: "7", 
    slug: "canza-finance",
    name: "Canza Finance", 
    category: "DeFi", 
    country: "Nigeria", 
    description: "Open finance portal providing FX and DeFi services to African SMEs.",
    tvl: "$18.9M", 
    volume: "$4.2M", 
    activeAddresses: "3.2K",
    status: "Active",
    isVerified: true
  },
  { 
    id: "8", 
    slug: "mazzuma",
    name: "Mazzuma", 
    category: "Payments", 
    country: "Ghana", 
    description: "Mobile money payment system integrated with Solana for cross-border transactions.",
    tvl: "$2.1M", 
    volume: "$400K", 
    activeAddresses: "1.8K",
    status: "Active",
    isVerified: false
  },
];

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial network delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    return DUMMY_PROJECTS.filter((p) => {
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
