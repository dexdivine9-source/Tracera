import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="flex items-center justify-center mb-6">
        <Activity className="h-12 w-12 text-primary mr-4" />
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
          Tracera
        </h1>
      </div>
      <p className="mt-4 text-xl text-muted-foreground max-w-[600px] mb-8">
        Real-time Solana pulse across Africa.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/dashboard"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Open Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <a
          href="/api/download"
          className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Download Source Code (ZIP)
        </a>
      </div>
    </main>
  );
}
