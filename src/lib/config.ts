export const siteConfig = {
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "el-quemra-br", // Using the reference username as default
  techStack: [
    { name: "Python", icon: "SiPython", category: "Primary" },
    { name: "JavaScript", icon: "SiJavascript", category: "Language" },
    { name: "TypeScript", icon: "SiTypescript", category: "Language" },
    { name: "React", icon: "SiReact", category: "Frontend" },
    { name: "Next.js", icon: "SiNextdotjs", category: "Frontend" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", category: "Frontend" },
    { name: "Node.js", icon: "SiNodedotjs", category: "Backend" },
    { name: "Docker", icon: "SiDocker", category: "Tool" },
    { name: "Git", icon: "SiGit", category: "Tool" },
  ],
};
