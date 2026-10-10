import { DeveloperDashboard } from "@/components/dashboard/DeveloperDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0e] text-slate-100 font-sans selection:bg-cyan-500/30">
      <DeveloperDashboard />
    </main>
  );
}
