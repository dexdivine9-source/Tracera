export default function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="bg-card border border-border rounded-xl p-5 h-[220px] flex flex-col animate-pulse"
        >
          {/* Header Skeleton */}
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 bg-muted rounded-md w-1/2"></div>
            <div className="h-4 w-4 bg-muted rounded-full"></div>
          </div>

          {/* Badges Skeleton */}
          <div className="flex gap-2 mb-5">
            <div className="h-6 bg-muted rounded-md w-20"></div>
            <div className="h-6 bg-muted rounded-md w-24"></div>
            <div className="h-6 bg-muted rounded-md w-16 ml-auto"></div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2 mb-6 flex-1">
            <div className="h-4 bg-muted rounded-md w-full"></div>
            <div className="h-4 bg-muted rounded-md w-4/5"></div>
          </div>

          {/* Metrics Skeleton */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50 mt-auto">
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded-md w-8"></div>
              <div className="h-4 bg-muted rounded-md w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded-md w-12"></div>
              <div className="h-4 bg-muted rounded-md w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded-md w-10"></div>
              <div className="h-4 bg-muted rounded-md w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
