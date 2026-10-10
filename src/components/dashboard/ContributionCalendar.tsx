"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip as RechartsTooltip } from "recharts";

interface ContributionCalendarProps {
  events: any[];
}

export function ContributionCalendar({ events }: ContributionCalendarProps) {
  // We'll build a simplified 12-week calendar based on the public events API (max 90 days).
  // For a full year, we would need the GraphQL API and a token.
  
  const generateCalendarData = () => {
    const weeks = 12;
    const daysPerWeek = 7;
    const data = [];
    
    // Start from today and go back
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Adjust to end of the week (Saturday)
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (weeks * daysPerWeek) + (6 - dayOfWeek));

    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < daysPerWeek; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (w * daysPerWeek) + d);
        week.push({
          date: date.toISOString().split('T')[0],
          count: 0
        });
      }
      data.push(week);
    }
    return data;
  };

  const calendarData = generateCalendarData();

  // Populate with events
  events.forEach(event => {
    if (['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type)) {
      const eventDate = event.created_at.split('T')[0];
      calendarData.forEach(week => {
        const day = week.find(d => d.date === eventDate);
        if (day) {
          day.count += event.type === 'PushEvent' ? (event.payload.commits?.length || 1) : 1;
        }
      });
    }
  });

  const getColor = (count: number) => {
    if (count === 0) return "bg-[#1e1e2d]";
    if (count < 3) return "bg-emerald-900";
    if (count < 6) return "bg-emerald-600";
    if (count < 10) return "bg-emerald-400";
    return "bg-emerald-300";
  };

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-sm text-slate-400">Contribution Calendar (Last 12 Weeks)</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto pb-6">
        <div className="flex gap-1 min-w-max">
          <div className="flex flex-col gap-1 text-[10px] text-slate-500 pr-2 pt-5">
            <span className="h-3">Sun</span>
            <span className="h-3"></span>
            <span className="h-3">Tue</span>
            <span className="h-3"></span>
            <span className="h-3">Thu</span>
            <span className="h-3"></span>
            <span className="h-3">Sat</span>
          </div>
          {calendarData.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {/* Note: This simplistic label logic places month label approximately */}
              <div className="h-4 text-[10px] text-slate-500 mb-1">
                {wIdx % 4 === 0 ? new Date(week[0].date).toLocaleString('default', { month: 'short' }) : ''}
              </div>
              {week.map((day, dIdx) => (
                <div
                  key={day.date}
                  title={`${day.count} contributions on ${day.date}`}
                  className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors hover:border hover:border-white`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end text-xs text-slate-400 gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#1e1e2d]" />
            <div className="w-3 h-3 rounded-sm bg-emerald-900" />
            <div className="w-3 h-3 rounded-sm bg-emerald-600" />
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
            <div className="w-3 h-3 rounded-sm bg-emerald-300" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
