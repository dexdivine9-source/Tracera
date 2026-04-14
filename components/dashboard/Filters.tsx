"use client";
import { useState } from "react";
import { Filter, X, RotateCcw } from "lucide-react";

const COUNTRIES = ["Nigeria", "Kenya", "South Africa", "Ghana", "Others"];
const CATEGORIES = ["Payments", "DeFi", "RWA", "Loyalty", "Remittances", "Gateways", "Infrastructure", "Others"];

interface FiltersProps {
  selectedCountries: string[];
  selectedCategories: string[];
  onToggleCountry: (country: string) => void;
  onToggleCategory: (category: string) => void;
  onClear: () => void;
}

export default function Filters({
  selectedCountries,
  selectedCategories,
  onToggleCountry,
  onToggleCategory,
  onClear,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeFilterCount = selectedCountries.length + selectedCategories.length;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
      >
        <Filter className="w-6 h-6" />
        {activeFilterCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar / Drawer */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight">Filters</h2>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Country Filters */}
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Country
              </h3>
              <div className="space-y-3">
                {COUNTRIES.map((country) => {
                  const isChecked = selectedCountries.includes(country);
                  return (
                    <label key={country} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`relative flex items-center justify-center w-4 h-4 border rounded transition-colors ${isChecked ? 'bg-primary border-primary' : 'bg-background border-border group-hover:border-primary'}`}>
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={isChecked}
                          onChange={() => onToggleCountry(country)}
                        />
                        {isChecked && <div className="w-2 h-2 bg-primary-foreground rounded-sm" />}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'}`}>
                        {country}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Category
              </h3>
              <div className="space-y-3">
                {CATEGORIES.map((category) => {
                  const isChecked = selectedCategories.includes(category);
                  return (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`relative flex items-center justify-center w-4 h-4 border rounded transition-colors ${isChecked ? 'bg-primary border-primary' : 'bg-background border-border group-hover:border-primary'}`}>
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={isChecked}
                          onChange={() => onToggleCategory(category)}
                        />
                        {isChecked && <div className="w-2 h-2 bg-primary-foreground rounded-sm" />}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'}`}>
                        {category}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        {activeFilterCount > 0 && (
          <div className="p-4 border-t border-border bg-card/50 backdrop-blur">
            <button
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
