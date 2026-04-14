import { Activity } from "lucide-react";

export default function AfricaHeatmap() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold tracking-tight">Activity Heatmap</h3>
        <Activity className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 flex items-center justify-center relative py-4">
        {/* Stylized SVG Map Placeholder */}
        <svg viewBox="0 0 200 200" className="w-full max-w-[280px] h-auto text-secondary drop-shadow-xl">
          <path
            fill="currentColor"
            d="M50,40 Q80,20 120,40 T160,90 Q170,140 120,170 Q80,190 60,150 Q30,120 40,80 Z"
          />
          {/* Hotspots */}
          <g className="text-primary">
            {/* Nigeria */}
            <circle cx="80" cy="90" r="6" fill="currentColor" className="animate-pulse" />
            <circle cx="80" cy="90" r="12" fill="currentColor" className="opacity-20 animate-ping" />
            
            {/* Kenya */}
            <circle cx="140" cy="110" r="5" fill="currentColor" className="animate-pulse delay-75" />
            <circle cx="140" cy="110" r="10" fill="currentColor" className="opacity-20 animate-ping delay-75" />
            
            {/* South Africa */}
            <circle cx="110" cy="160" r="4" fill="currentColor" className="animate-pulse delay-150" />
            <circle cx="110" cy="160" r="8" fill="currentColor" className="opacity-20 animate-ping delay-150" />
            
            {/* Ghana */}
            <circle cx="65" cy="95" r="3" fill="currentColor" className="animate-pulse delay-300" />
          </g>
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-0 left-0 text-xs text-muted-foreground flex flex-col gap-2 bg-background/50 p-3 rounded-lg backdrop-blur-sm border border-border/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span> 
            High Activity
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/50"></span> 
            Moderate
          </div>
        </div>
      </div>
    </div>
  );
}
