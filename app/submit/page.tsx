import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import ProjectSubmissionForm from "@/components/projects/ProjectSubmissionForm";

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="h-16 border-b border-border flex items-center px-4 lg:px-8 sticky top-0 bg-background/95 backdrop-blur z-30">
        <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-bold">Back to Dashboard</span>
        </Link>
        <div className="h-6 w-px bg-border mx-4" />
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Activity className="w-5 h-5" />
          <span className="text-lg font-extrabold tracking-tight">Tracera</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 flex justify-center">
        <div className="w-full max-w-2xl py-8">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Submit a Project</h1>
            <p className="text-muted-foreground">
              Are you building on Solana in Africa? Add your project to the Tracera directory to get discovered by investors, users, and partners.
            </p>
          </div>
          
          <ProjectSubmissionForm />
        </div>
      </main>
    </div>
  );
}
