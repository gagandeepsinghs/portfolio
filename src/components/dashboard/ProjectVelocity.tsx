"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ProjectVelocityProps {
  events: any[];
}

export function ProjectVelocity({ events }: ProjectVelocityProps) {
  // Generate last 7 days data from events
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        date: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        commits: 0
      });
    }
    return days;
  };

  const data = getLast7Days();

  events.forEach(event => {
    if (event.type === 'PushEvent') {
      const eventDate = event.created_at.split('T')[0];
      const day = data.find(d => d.date === eventDate);
      if (day) {
        day.commits += event.payload.commits?.length || 1;
      }
    }
  });

  const hasData = data.some(d => d.commits > 0);

  return (
    <Card className="col-span-1 md:col-span-1 lg:col-span-1 h-full min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-sm text-slate-400">Project Velocity (7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="h-64 w-full relative">
        {!hasData ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
            No commit activity in the last 7 days
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" vertical={false} />
              <XAxis 
                dataKey="dayName" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', borderColor: '#1c1c28', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#06b6d4' }}
                cursor={{ fill: '#1e1e2d' }}
              />
              <Bar dataKey="commits" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
