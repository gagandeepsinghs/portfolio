import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/config";
import { Terminal, Code2, Database, Layout, Server, Cpu, Globe, Boxes, GitBranch } from "lucide-react";

// Mapping generic icons since lucide doesn't have brand icons
const iconMap: Record<string, any> = {
  SiPython: Terminal,
  SiJavascript: Code2,
  SiTypescript: Code2,
  SiReact: Layout,
  SiNextdotjs: Globe,
  SiTailwindcss: Layout,
  SiNodedotjs: Server,
  SiDocker: Boxes,
  SiGit: GitBranch,
  default: Cpu
};

export function TechStack() {
  const technologies = siteConfig.techStack;

  return (
    <Card className="col-span-1 md:col-span-1 lg:col-span-1 h-full">
      <CardHeader>
        <CardTitle className="text-sm text-slate-400">Tech Stack Popularity (Configured)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {technologies.map((tech) => {
            const IconComponent = iconMap[tech.icon] || iconMap.default;
            return (
              <div 
                key={tech.name} 
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1e1e2d] border border-[#2a2a3c] hover:border-cyan-500/50 hover:bg-[#252538] transition-all group"
              >
                <IconComponent className="w-6 h-6 mb-2 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span className="text-[10px] font-medium text-slate-300 text-center">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
