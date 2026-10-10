import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Link as LinkIcon, Users } from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
  profile: any;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  if (!profile) return <Card className="col-span-1 h-full min-h-[300px] flex items-center justify-center text-slate-500">Profile Data Unavailable</Card>;

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#1e1e2d] to-transparent opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
      
      <CardContent className="pt-6 relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          <Image
            src={profile.avatar_url}
            alt={profile.login}
            width={120}
            height={120}
            className="rounded-full relative border-2 border-[#2a2a3c] bg-[#0a0a0e]"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-1">{profile.name || profile.login}</h2>
        <a 
          href={profile.html_url} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-4"
        >
          <svg className="w-4 h-4 mr-1.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          @{profile.login}
        </a>
        
        {profile.bio && (
          <p className="text-sm text-slate-300 mb-6 max-w-xs">{profile.bio}</p>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400 mt-auto">
          {profile.location && (
            <div className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {profile.location}
            </div>
          )}
          {profile.blog && (
            <div className="flex items-center">
              <LinkIcon className="w-3.5 h-3.5 mr-1" />
              <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400">Website</a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
