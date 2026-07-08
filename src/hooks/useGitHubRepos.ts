import { useState, useEffect } from 'react';
import type { GitHubRepo, CategorizedRepo, RepoStats, RepoCategory } from '../types';

const GITHUB_USERNAME = 'ykrishhh';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`;

const SECURITY_KEYWORDS = [
  'security', 'pentest', 'cve', 'exploit', 'hardening', 'frida', 'scanner',
  'privacy', 'encryption', 'firewall', 'cis', 'nmap', 'burp', 'metasploit',
  'poc', 'payload', 'reverse', 'malware', 'forensic',
];
const AI_KEYWORDS = [
  'ai', 'llm', 'agent', 'ollama', 'openai', 'anthropic', 'langchain',
  'crewai', 'autogpt', 'rag', 'embedding', 'gpt', 'claude', 'tensorflow',
  'pytorch', 'machine-learning', 'deep-learning', 'nlp',
];
const IOT_KEYWORDS = [
  'esp32', 'iot', 'firmware', 'embedded', 'arduino', 'rf24', 'rtos',
  'microcontroller', 'sensor', 'mcu',
];
const DEVOPS_KEYWORDS = [
  'devops', 'docker', 'kubernetes', 'ci/cd', 'deploy', 'ansible',
  'terraform', 'monitoring', 'panel', 'hosting', 'authentication',
];

function categorizeRepo(repo: GitHubRepo): RepoCategory {
  const name = repo.name.toLowerCase();
  const desc = (repo.description ?? '').toLowerCase();
  const topics = repo.topics.map((t) => t.toLowerCase());

  const text = `${name} ${desc} ${topics.join(' ')}`;

  const securityScore = SECURITY_KEYWORDS.filter((k) => text.includes(k)).length;
  const aiScore = AI_KEYWORDS.filter((k) => text.includes(k)).length;
  const iotScore = IOT_KEYWORDS.filter((k) => text.includes(k)).length;
  const devopsScore = DEVOPS_KEYWORDS.filter((k) => text.includes(k)).length;

  const max = Math.max(securityScore, aiScore, iotScore, devopsScore);
  if (max === 0) return 'other';
  if (max === securityScore) return 'security';
  if (max === aiScore) return 'ai';
  if (max === iotScore) return 'iot';
  return 'devops';
}

// Fallback repos for when API is unavailable
const FALLBACK_REPOS: CategorizedRepo[] = [
  {
    id: 1, name: 'cve-pocs', description: 'Proof-of-concept exploits for CVEs — security research, vulnerability analysis, and responsible disclosure.',
    html_url: 'https://github.com/ykrishhh/cve-pocs', stargazers_count: 0, forks_count: 0,
    language: 'Python', topics: ['cve', 'exploit', 'poc'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 100, category: 'security',
  },
  {
    id: 2, name: 'ESP32-HARNESS', description: 'Advanced ESP32 pentesting & telemetry firmware — 2.4 GHz research, RF24 experimentation, and on-device forensic capture.',
    html_url: 'https://github.com/ykrishhh/ESP32-HARNESS', stargazers_count: 0, forks_count: 0,
    language: 'C', topics: ['esp32', 'firmware', 'rf'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 100, category: 'iot',
  },
  {
    id: 3, name: 'awesome-esp32-security', description: 'Curated list of ESP32 security tools, firmware, and resources.',
    html_url: 'https://github.com/ykrishhh/awesome-esp32-security', stargazers_count: 0, forks_count: 0,
    language: null, topics: ['esp32', 'iot', 'pentesting'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 50, category: 'iot',
  },
  {
    id: 4, name: 'HarryPanel', description: 'Advanced web hosting control panel — server management, database admin, file manager, and deployment tools.',
    html_url: 'https://github.com/ykrishhh/HarryPanel', stargazers_count: 0, forks_count: 0,
    language: 'Python', topics: ['python', 'flask', 'devops'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 200, category: 'devops',
  },
  {
    id: 5, name: 'content-agent', description: 'Autonomous AI content agent for Termux — SEO-optimized posts, social media automation.',
    html_url: 'https://github.com/ykrishhh/content-agent', stargazers_count: 0, forks_count: 0,
    language: 'Python', topics: ['ai', 'automation', 'termux'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 150, category: 'ai',
  },
  {
    id: 6, name: 'pypentest-ai', description: 'AI-powered security automation scanner for pentesting, exploit analysis, and vulnerability detection.',
    html_url: 'https://github.com/ykrishhh/pypentest-ai', stargazers_count: 0, forks_count: 0,
    language: 'Python', topics: ['ai', 'pentesting', 'python'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 120, category: 'ai',
  },
  {
    id: 7, name: 'esp32-smart-cam', description: 'Low-cost AI-powered security camera on ESP32 with face detection and computer vision.',
    html_url: 'https://github.com/ykrishhh/esp32-smart-cam', stargazers_count: 0, forks_count: 0,
    language: 'C', topics: ['esp32', 'ai', 'iot'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 80, category: 'ai',
  },
  {
    id: 8, name: 'awesome-ai-security-tools', description: 'Curated list of AI-powered security tools and resources.',
    html_url: 'https://github.com/ykrishhh/awesome-ai-security-tools', stargazers_count: 0, forks_count: 0,
    language: null, topics: ['ai', 'security', 'awesome'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 40, category: 'ai',
  },
  {
    id: 9, name: 'android-rooting-masterclass', description: 'Complete guide to Android rooting and hooking — from DEX editing to kernel patching.',
    html_url: 'https://github.com/ykrishhh/android-rooting-masterclass', stargazers_count: 0, forks_count: 0,
    language: null, topics: ['android', 'frida', 'kernel'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 60, category: 'security',
  },
  {
    id: 10, name: 'linux-hardening', description: 'Security hardening scripts for Linux — firewall config, audit rules, CIS benchmarks.',
    html_url: 'https://github.com/ykrishhh/linux-hardening', stargazers_count: 0, forks_count: 0,
    language: 'Shell', topics: ['linux', 'firewall', 'cis'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 90, category: 'security',
  },
  {
    id: 11, name: 'termux-security-toolkit', description: 'Security tools and scripts for Termux — network scanning, password auditing, and ethical hacking.',
    html_url: 'https://github.com/ykrishhh/termux-security-toolkit', stargazers_count: 0, forks_count: 0,
    language: 'Shell', topics: ['termux', 'pentesting', 'android'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 110, category: 'security',
  },
  {
    id: 12, name: 'self-hosted-ai-termux', description: 'Run AI models on your phone — self-hosted AI setup guide for Termux with Ollama.',
    html_url: 'https://github.com/ykrishhh/self-hosted-ai-termux', stargazers_count: 0, forks_count: 0,
    language: null, topics: ['ollama', 'local-llm', 'privacy'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 30, category: 'ai',
  },
  {
    id: 13, name: 'ai-agent-comparison', description: 'Honest comparison of AI agent frameworks — LangChain, CrewAI, AutoGPT, Swarm.',
    html_url: 'https://github.com/ykrishhh/ai-agent-comparison', stargazers_count: 0, forks_count: 0,
    language: null, topics: ['llm', 'agents', 'benchmark'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 45, category: 'ai',
  },
  {
    id: 14, name: 'network-scanner', description: 'Fast Python network scanner — port scanning, service detection, OS fingerprinting.',
    html_url: 'https://github.com/ykrishhh/network-scanner', stargazers_count: 0, forks_count: 0,
    language: 'Python', topics: ['python', 'scapy', 'networking'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 70, category: 'security',
  },
  {
    id: 15, name: 'privacy-tools', description: 'Encryption and privacy utilities — file encryption, secure messaging, password generation.',
    html_url: 'https://github.com/ykrishhh/privacy-tools', stargazers_count: 0, forks_count: 0,
    language: 'Python', topics: ['encryption', 'privacy', 'python'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: false, size: 50, category: 'security',
  },
  {
    id: 16, name: 'krkn', description: 'AI agent orchestration framework.',
    html_url: 'https://github.com/ykrishhh/krkn', stargazers_count: 0, forks_count: 0,
    language: 'Python', topics: ['ai', 'agents'], updated_at: '2025-01-01T00:00:00Z',
    pushed_at: '2025-01-01T00:00:00Z', fork: true, size: 5000, category: 'ai',
  },
];

const FALLBACK_STATS: RepoStats = {
  totalRepos: 28,
  totalStars: 12,
  totalForks: 8,
  lastUpdated: '2025-01-01',
};

export function useGitHubRepos() {
  const [repos, setRepos] = useState<CategorizedRepo[]>([]);
  const [stats, setStats] = useState<RepoStats>(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

        const data: GitHubRepo[] = await res.json();

        if (cancelled) return;

        const filtered = data
          .filter((r) => !r.fork && r.name !== 'ykrishhh')
          .map((r) => ({
            ...r,
            category: categorizeRepo(r),
          }));

        const totalStars = filtered.reduce((s, r) => s + r.stargazers_count, 0);
        const totalForks = filtered.reduce((s, r) => s + r.forks_count, 0);

        setRepos(filtered);
        setStats({
          totalRepos: filtered.length,
          totalStars,
          totalForks,
          lastUpdated: filtered.length > 0
            ? new Date(filtered[0].pushed_at).toLocaleDateString()
            : 'N/A',
        });
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.warn('GitHub API fetch failed, using fallback data:', err);
        setRepos(FALLBACK_REPOS.filter((r) => !r.fork));
        setStats(FALLBACK_STATS);
        setError(err instanceof Error ? err.message : 'Failed to fetch repos');
        setLoading(false);
      }
    }

    fetchRepos();
    return () => { cancelled = true; };
  }, []);

  return { repos, stats, loading, error };
}
