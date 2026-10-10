import { Card, CardContent } from "@/components/ui/card";
import { Book, Star, Users, Activity } from "lucide-react";

interface StatsGridProps {
  profile: any;
  repos: any[];
  events: any[];
}

export function StatsGrid({ profile, repos, events }: StatsGridProps) {
  if (!profile || !repos) return null;

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const recentContributions = events.filter(e => ['PushEvent', 'PullRequestEvent', 'CreateEvent', 'IssuesEvent'].includes(e.type)).length;
  
  const stats = [
    {
      label: "Total Repos",
      value: profile.public_repos,
      icon: Book,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Total Stars",
      value: totalStars,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Followers",
      value: profile.followers,
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Recent Activity",
      value: recentContributions || "0",
      icon: Activity,
      color: "text-green-400",
      bg: "bg-green-400/10",
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {stats.map((stat) => (
        <Card key={stat.label} className="col-span-1 flex flex-col justify-center">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
