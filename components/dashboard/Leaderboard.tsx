import { TrendingUp } from "lucide-react";

const LEADERS = [
  { name: "Yellow Card", volume: "$15.4M", trend: "+12%" },
  { name: "Canza Finance", volume: "$4.2M", trend: "+8%" },
  { name: "Fonbnk", volume: "$3.5M", trend: "+15%" },
  { name: "Paystack Crypto", volume: "$2.1M", trend: "-2%" },
  { name: "Kotani Pay", volume: "$1.2M", trend: "+5%" },
];

export default function Leaderboard() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold tracking-tight">Top by Volume (24h)</h3>
        <TrendingUp className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {LEADERS.map((leader, i) => (
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
        ))}
      </div>
    </div>
  );
}
