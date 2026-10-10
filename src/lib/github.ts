import { siteConfig } from "./config";

const GITHUB_USERNAME = siteConfig.githubUsername;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional, but recommended for higher rate limits

const headers: Record<string, string> = GITHUB_TOKEN
  ? { Authorization: `bearer ${GITHUB_TOKEN}` }
  : {};

export async function getGithubProfile() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn("Failed to fetch GitHub profile:", res.status);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGithubRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      console.warn("Failed to fetch GitHub repos:", res.status);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getGithubEvents() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=20`,
      { headers, next: { revalidate: 300 } }
    );
    if (!res.ok) {
      console.warn("Failed to fetch GitHub events:", res.status);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getGithubLanguages(repos: any[]) {
  // Aggregate languages from the repository list (which has a 'language' field for the primary language)
  // For a more complete distribution, we would fetch the languages URL for each repo, 
  // but that's very rate-limit intensive. We will use the primary language of each repo as an approximation.
  const languageCounts: Record<string, number> = {};
  
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  return Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
