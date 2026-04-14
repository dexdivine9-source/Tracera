import Link from "next/link";
import { ExternalLink, Activity, Users, BadgeCheck, MapPin, Tag } from "lucide-react";

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  country: string;
  description: string;
  tvl: string;
  volume: string;
  activeAddresses: string;
  status: "Active" | "Inactive" | "Building";
  isVerified: boolean;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group flex flex-col h-full relative overflow-hidden">
      {/* Top Header: Name & Verified Badge */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/projects/${project.slug}`} className="font-bold text-lg hover:text-primary transition-colors flex items-center gap-2">
            {project.name}
          </Link>
          {project.isVerified && (
            <BadgeCheck className="w-4 h-4 text-blue-400" aria-label="Verified" />
          )}
        </div>
        <Link href={`/dashboard/projects/${project.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Badges: Country & Category */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50 text-xs font-medium text-secondary-foreground border border-border/50">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          {project.country}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50 text-xs font-medium text-secondary-foreground border border-border/50">
          <Tag className="w-3 h-3 text-muted-foreground" />
          {project.category}
        </span>
        <span className={`ml-auto px-2 py-1 rounded-md text-[10px] font-bold border tracking-wide uppercase ${
          project.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
          project.status === 'Building' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
          'bg-red-500/10 text-red-500 border-red-500/20'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
        {project.description}
      </p>

      {/* Metrics Footer */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50 mt-auto">
        <div>
          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest font-bold">TVL</p>
          <p className="font-mono font-medium text-foreground text-sm">{project.tvl}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest font-bold">24h Vol</p>
          <p className="font-mono font-medium flex items-center gap-1.5 text-foreground text-sm">
            {project.volume !== "$0" && <Activity className="w-3 h-3 text-primary" />}
            {project.volume}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest font-bold">Users</p>
          <p className="font-mono font-medium flex items-center gap-1.5 text-foreground text-sm">
            {project.activeAddresses !== "0" && <Users className="w-3 h-3 text-blue-400" />}
            {project.activeAddresses}
          </p>
        </div>
      </div>
    </div>
  );
}
