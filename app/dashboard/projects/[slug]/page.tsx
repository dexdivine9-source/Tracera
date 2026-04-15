import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Activity, 
  Users, 
  BadgeCheck, 
  MapPin, 
  Tag, 
  Globe, 
  Twitter, 
  ExternalLink,
  Wallet
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { getProtocolMetrics } from "@/lib/defillama";
import ProjectChart from "@/components/projects/ProjectChart";
import type { ProjectRow } from "@/types/project";

const formatCurrency = (val: number | null) => {
  if (!val || isNaN(val)) return "$0";
  if (val >= 1000000000) return `$${(val / 1000000000).toFixed(2)}B`;
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
  return `$${val.toFixed(2)}`;
};

async function getProjectData(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  // Cast to our explicit type to avoid 'never'
  const dbProject = data as unknown as ProjectRow;

  // Try to get live metrics from DefiLlama (graceful fallback if not found)
  const liveMetrics = await getProtocolMetrics(slug.toLowerCase());

  return {
    live: liveMetrics,
    display: {
      name: dbProject.name,
      category: dbProject.category || "Others",
      country: dbProject.country || "Others",
      description: dbProject.description || "",
      tvl: liveMetrics ? formatCurrency(liveMetrics.tvl) : formatCurrency(dbProject.tvl),
      volume: liveMetrics?.volume24h ? formatCurrency(liveMetrics.volume24h) : formatCurrency(dbProject.volume_24h),
      activeAddresses: "Active User",
      status: dbProject.status || "Building",
      isVerified: !!dbProject.is_verified,
      website: dbProject.website || "#",
      twitter: dbProject.x_handle || "@tracera",
      programId: "N/A",
      launchedAt: new Date(dbProject.created_at).getFullYear().toString()
    }
  };
}


export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const projectData = await getProjectData(slug);

  if (!projectData) {
    notFound();
  }

  const { display, live } = projectData;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Simple Navbar */}
      <header className="h-16 border-b border-border flex items-center px-4 lg:px-8 sticky top-0 bg-background/95 backdrop-blur z-30">
        <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-bold">Back to Directory</span>
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Hero Section */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    {display.name}
                  </h1>
                  {display.isVerified && (
                    <BadgeCheck className="w-8 h-8 text-blue-400 mt-1" aria-label="Verified" />
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-sm font-medium text-secondary-foreground border border-border/50">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {display.country}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-sm font-medium text-secondary-foreground border border-border/50">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {display.category}
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border tracking-wide uppercase ${
                    display.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    display.status === 'Building' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {display.status}
                  </span>
                  {live && (
                    <span className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-400/20 tracking-wide uppercase">
                      Live Data
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a 
                  href={display.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </a>
                <a 
                  href={`https://twitter.com/${display.twitter.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 border border-border transition-colors shadow-sm"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  {display.twitter}
                </a>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Value Locked</p>
                <p className="text-3xl font-mono font-bold text-foreground">{display.tvl}</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">24h Volume</p>
                <p className="text-3xl font-mono font-bold text-foreground">{display.volume}</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Active Users</p>
                <p className="text-3xl font-mono font-bold text-foreground">{display.activeAddresses}</p>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          {live && live.historicalTvl.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">TVL History (30 Days)</h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  Solana Chain TVL
                </div>
              </div>
              <ProjectChart data={live.historicalTvl} />
            </div>
          )}

          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">About {display.name}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {display.description}
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold mb-4">Technical Details</h2>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">On-chain Program ID</p>
                <div className="flex items-center justify-between bg-secondary/50 border border-border/50 rounded-md px-3 py-2">
                  <code className="text-sm font-mono text-foreground">{display.programId}</code>
                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Launched</p>
                <p className="text-foreground font-medium">{display.launchedAt}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
