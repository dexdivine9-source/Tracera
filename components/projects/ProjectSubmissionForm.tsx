"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "Payments",
  "DeFi",
  "Gateways",
  "Infrastructure",
  "RWA",
  "Loyalty",
  "Remittances",
  "Others",
];

const COUNTRIES = ["Nigeria", "Kenya", "South Africa", "Ghana", "Others"];

export default function ProjectSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    country: "",
    website: "",
    twitter: "",
    programId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.country) newErrors.country = "Country is required";

    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!formData.website.trim()) {
      newErrors.website = "Website URL is required";
    } else if (!urlPattern.test(formData.website)) {
      newErrors.website = "Please enter a valid URL";
    }

    if (!formData.twitter.trim()) newErrors.twitter = "X (Twitter) handle is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call to Supabase
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-card border border-border rounded-xl shadow-sm">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-2">Project Submitted!</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Thank you for submitting <strong>{formData.name}</strong>. Our team will review the details and add it to the Tracera directory shortly.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({ name: "", description: "", category: "", country: "", website: "", twitter: "", programId: "" });
          }}
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          Submit Another Project
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
      <div className="space-y-4">
        {/* Project Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Project Name <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Paystack Crypto"
            className={`flex h-10 w-full rounded-md border ${errors.name ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
          />
          {errors.name && <p className="text-xs text-destructive font-medium">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium leading-none">
            Short Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What does this project do? (1-2 sentences)"
            rows={3}
            className={`flex w-full rounded-md border ${errors.description ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'} bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none`}
          />
          {errors.description && <p className="text-xs text-destructive font-medium">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium leading-none">
              Category <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`flex h-10 w-full appearance-none rounded-md border ${errors.category ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'} bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
            {errors.category && <p className="text-xs text-destructive font-medium">{errors.category}</p>}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium leading-none">
              Primary Country <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`flex h-10 w-full appearance-none rounded-md border ${errors.country ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'} bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
              >
                <option value="" disabled>Select a country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
            {errors.country && <p className="text-xs text-destructive font-medium">{errors.country}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Website */}
          <div className="space-y-2">
            <label htmlFor="website" className="text-sm font-medium leading-none">
              Website URL <span className="text-destructive">*</span>
            </label>
            <input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://..."
              className={`flex h-10 w-full rounded-md border ${errors.website ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
            />
            {errors.website && <p className="text-xs text-destructive font-medium">{errors.website}</p>}
          </div>

          {/* Twitter */}
          <div className="space-y-2">
            <label htmlFor="twitter" className="text-sm font-medium leading-none">
              X (Twitter) Handle <span className="text-destructive">*</span>
            </label>
            <input
              id="twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="@projecthandle"
              className={`flex h-10 w-full rounded-md border ${errors.twitter ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring'} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
            />
            {errors.twitter && <p className="text-xs text-destructive font-medium">{errors.twitter}</p>}
          </div>
        </div>

        {/* Program ID (Optional) */}
        <div className="space-y-2">
          <label htmlFor="programId" className="text-sm font-medium leading-none flex items-center gap-2">
            On-chain Program ID <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
          </label>
          <input
            id="programId"
            name="programId"
            value={formData.programId}
            onChange={handleChange}
            placeholder="e.g. TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          />
          <p className="text-xs text-muted-foreground">
            If your project has a main smart contract on Solana, provide the address here.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Project
          </>
        )}
      </button>
    </form>
  );
}
