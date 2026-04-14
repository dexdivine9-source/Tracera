"use client";

import { TrendingUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Explicit type to avoid 'never' from Supabase generics
interface LeaderRow {
  name: string;
  volume_24h: number | null;
}

const formatCurrency = (val: number | null) => {
  if (!val) return "$0";
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
  return `$${val}`;
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<{name: string, volume: string, trend: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('name, volume_24h')
        .order('volume_24h', { ascending: false })
        .limit(5);

      if (data) {
        const rows = data as unknown as LeaderRow[];
        setLeaders(rows.map(d => ({
          name: d.name,
          volume: formatCurrency(d.volume_24h),
          trend: "+12%"
        })));
      }
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold tracking-tight">Top by Volume (24h)</h3>
        <TrendingUp className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="space-y-3 flex-1 flex flex-col justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
             <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : leaders.length === 0 ? (
           <p className="text-center text-sm text-muted-foreground">No data available.</p>
        ) : (
          leaders.map((leader, i) => (
            <div 
              key={leader.name} 
              className="flex items-center justify-between p-3.5 rounded-lg bg-secondary/30 hover:bg-secondary/80 border border-transparent hover:border-border transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-muted-foreground w-4 text-center group-hover:text-primary transition-colors">
                  {i + 1}
                </span>
                <span className="font-medium">{leader.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold font-mono">{leader.volume}</span>
                <span className={`text-xs font-medium ${leader.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {leader.trend}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
