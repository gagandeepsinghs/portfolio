"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface LanguageChartProps {
  languages: { name: string; count: number }[];
}

const COLORS = ['#8b5cf6', '#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function LanguageChart({ languages }: LanguageChartProps) {
  // Only show top 5, group rest as "Other"
  const topLangs = languages.slice(0, 5);
  const otherCount = languages.slice(5).reduce((acc, curr) => acc + curr.count, 0);
  
  const data = [
    ...topLangs,
    ...(otherCount > 0 ? [{ name: "Other", count: otherCount }] : [])
  ];

  return (
    <Card className="col-span-1 md:col-span-1 lg:col-span-1 h-full min-h-[300px]">
      <CardHeader>
        <CardTitle className="text-sm text-slate-400">Language Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-64 w-full relative">
        {data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
            No language data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#13131a', borderColor: '#1c1c28', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: any, name: any) => [`${value} repo${value > 1 ? 's' : ''}`, name]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
