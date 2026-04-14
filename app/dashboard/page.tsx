"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Home, Activity } from "lucide-react";
import Filters from "@/components/dashboard/Filters";
import AfricaHeatmap from "@/components/dashboard/AfricaHeatmap";
import Leaderboard from "@/components/dashboard/Leaderboard";
import ProjectDirectory from "@/components/projects/ProjectDirectory";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggleCountry = (country: string) => {
    setSelectedCountries((prev) => 
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) => 
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCountries([]);
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 bg-background/95 backdrop-blur z-30">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-bold">Back to Home</span>
          </Link>
          <div className="h-6 w-px bg-border mx-2" />
          <div className="flex items-center gap-2 text-primary">
            <Activity className="w-5 h-5" />
            <h1 className="text-xl font-extrabold tracking-tight">Tracera</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, countries, categories..."
              className="w-full bg-secondary/50 border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/70"
            />
          </div>
          <Link 
            href="/submit" 
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Submit Project
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Filters */}
        <Filters 
          selectedCountries={selectedCountries}
          selectedCategories={selectedCategories}
          onToggleCountry={handleToggleCountry}
          onToggleCategory={handleToggleCategory}
          onClear={handleClearFilters}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Mobile Search */}
          <div className="md:hidden relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-secondary/50 border border-border rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            />
          </div>

          {/* Top Section: Map & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2">
              <AfricaHeatmap />
            </div>
            <div>
              <Leaderboard />
            </div>
          </div>

          {/* Bottom Section: Directory */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight">Project Directory</h2>
              {/* Dynamic count could be added here if we lifted the filtered count up, but for now we'll let the directory handle its own display */}
            </div>
            <ProjectDirectory 
              searchQuery={searchQuery}
              selectedCountries={selectedCountries}
              selectedCategories={selectedCategories}
              onClearFilters={handleClearFilters}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
