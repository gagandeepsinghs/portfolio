import { getGithubProfile, getGithubRepos, getGithubEvents, getGithubLanguages } from "@/lib/github";
import { ProfileCard } from "./ProfileCard";
import { StatsGrid } from "./StatsGrid";
import { ActivityFeed } from "./ActivityFeed";
import { TechStack } from "./TechStack";
import { LanguageChart } from "./LanguageChart";
import { ProjectVelocity } from "./ProjectVelocity";
import { ContributionCalendar } from "./ContributionCalendar";

export async function DeveloperDashboard() {
  const [profile, repos, events] = await Promise.all([
    getGithubProfile(),
    getGithubRepos(),
    getGithubEvents(),
  ]);

  const languages = await getGithubLanguages(repos);

  return (
    <section className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Developer Dashboard</h1>
        <p className="text-slate-400">Real-time metrics and activity from GitHub</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
        {/* Top Row */}
        <ProfileCard profile={profile} />
        
        <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-6">
          <StatsGrid profile={profile} repos={repos} events={events} />
          <ContributionCalendar events={events} />
        </div>
        
        {/* Middle Row */}
        <ActivityFeed events={events} />
        <TechStack />
        
        {/* Bottom Row */}
        <LanguageChart languages={languages} />
        <ProjectVelocity events={events} />
      </div>
    </section>
  );
}
