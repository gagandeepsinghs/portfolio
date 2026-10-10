import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GitCommit, GitPullRequest, GitMerge, CircleDot } from "lucide-react";

interface ActivityFeedProps {
  events: any[];
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  const getEventDetails = (event: any) => {
    switch (event.type) {
      case "PushEvent":
        return {
          icon: GitCommit,
          color: "text-blue-400",
          text: `Pushed ${event.payload.commits?.length || 1} commit(s) to`,
          repo: event.repo.name,
        };
      case "PullRequestEvent":
        return {
          icon: event.payload.action === 'closed' && event.payload.pull_request.merged ? GitMerge : GitPullRequest,
          color: event.payload.action === 'closed' && event.payload.pull_request.merged ? "text-purple-400" : "text-green-400",
          text: `${event.payload.action === 'closed' && event.payload.pull_request.merged ? 'Merged' : 'Opened'} PR #${event.payload.number} in`,
          repo: event.repo.name,
        };
      case "CreateEvent":
        return {
          icon: GitCommit,
          color: "text-yellow-400",
          text: `Created ${event.payload.ref_type} in`,
          repo: event.repo.name,
        };
      default:
        return null;
    }
  };

  const filteredEvents = events
    .map(event => ({ id: event.id, ...getEventDetails(event), raw: event }))
    .filter(event => event.text !== undefined)
    .slice(0, 5); // Take top 5 recent events

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm text-slate-400">Recent Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredEvents.length === 0 ? (
          <div className="text-slate-500 text-sm">No recent public activity found.</div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => {
              const Icon = event.icon as any;
              return (
                <div key={event.id} className="flex items-start text-sm">
                  {Icon && <Icon className={`w-4 h-4 mt-0.5 mr-3 flex-shrink-0 ${event.color}`} />}
                  <div className="text-slate-300">
                    <span className="opacity-80">{event.text}</span>{" "}
                    <a
                      href={`https://github.com/${event.repo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      "{event.repo?.split('/')[1] || event.repo}"
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
