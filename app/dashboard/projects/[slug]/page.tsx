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

// Mock data fetcher
async function getProject(slug: string) {
  // In a real app, this would fetch from Supabase:
  // const { data } = await supabase.from('projects').select('*').eq('slug', slug).single();
  
  const projects = {
    "paystack-crypto": {
      name: "Paystack Crypto",
      category: "Payments",
      country: "Nigeria",
      description: "Seamless fiat-to-crypto onramp for African businesses. Accept stablecoins instantly and settle in local fiat currency. Built for scale and compliance across multiple African jurisdictions, enabling merchants to tap into the growing Web3 economy without FX friction.",
      tvl: "$12.5M",
      volume: "$2.1M",
      activeAddresses: "12.4K",
      status: "Active",
      isVerified: true,
      website: "https://paystack.com/crypto",
      twitter: "@paystack",
      programId: "PayStk...39xQ",
      launchedAt: "2024"
    },
    "yellow-card": {
      name: "Yellow Card",
      category: "Gateways",
      country: "Pan-Africa",
      description: "The largest cryptocurrency exchange on the African continent, bringing Solana to the masses. Yellow Card provides a secure, easy-to-use platform for buying, selling, and storing crypto across 20+ African countries.",
      tvl: "$45.2M",
      volume: "$15.4M",
      activeAddresses: "85.2K",
      status: "Active",
      isVerified: true,
      website: "https://yellowcard.io",
      twitter: "@yellowcard_app",
      programId: "YCard...9aZ1",
      launchedAt: "2019"
    }
  };
  
  // Return the matched project, or a dynamically generated fallback for testing other slugs
  return projects[slug as keyof typeof projects] || {
      name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      category: "DeFi",
      country: "Pan-Africa",
      description: "This is a dynamically generated project page for demonstration purposes. In the production version, this will fetch real data from Supabase based on the project slug.",
      tvl: "$5.0M",
      volume: "$1.0M",
      activeAddresses: "5.0K",
      status: "Building",
      isVerified: false,
      website: "https://example.com",
      twitter: "@example",
      programId: "Token...1234",
      launchedAt: "2025"
  };
}

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Next.js 15 requires awaiting params
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

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
                    {project.name}
                  </h1>
                  {project.isVerified && (
                    <BadgeCheck className="w-8 h-8 text-blue-400 mt-1" aria-label="Verified" />
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-sm font-medium text-secondary-foreground border border-border/50">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {project.country}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-sm font-medium text-secondary-foreground border border-border/50">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {project.category}
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border tracking-wide uppercase ${
                    project.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    project.status === 'Building' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a 
                  href={project.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </a>
                <a 
                  href={`https://twitter.com/${project.twitter.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 border border-border transition-colors shadow-sm"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  {project.twitter}
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
                <p className="text-3xl font-mono font-bold text-foreground">{project.tvl}</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">24h Volume</p>
                <p className="text-3xl font-mono font-bold text-foreground">{project.volume}</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Active Users</p>
                <p className="text-3xl font-mono font-bold text-foreground">{project.activeAddresses}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">About {project.name}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold mb-4">Technical Details</h2>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">On-chain Program ID</p>
                <div className="flex items-center justify-between bg-secondary/50 border border-border/50 rounded-md px-3 py-2">
                  <code className="text-sm font-mono text-foreground">{project.programId}</code>
                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Launched</p>
                <p className="text-foreground font-medium">{project.launchedAt}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
