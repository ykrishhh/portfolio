export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  size: number;
}

export type RepoCategory = 'security' | 'ai' | 'iot' | 'devops' | 'other';

export interface CategorizedRepo extends GitHubRepo {
  category: RepoCategory;
}

export interface RepoStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  lastUpdated: string;
}
