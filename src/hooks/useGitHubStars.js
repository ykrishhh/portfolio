import { useState, useEffect } from "react";

const CACHE_TTL = 3600000;

export function useGitHubStars(repo) {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    if (!repo) return;

    const key = `gh-stars-${repo}`;
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { value, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setStars(value);
          return;
        }
      }
    } catch {
      localStorage.removeItem(key);
    }

    let cancelled = false;

    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const s = d.stargazers_count ?? 0;
        try {
          localStorage.setItem(
            key,
            JSON.stringify({ value: s, ts: Date.now() })
          );
        } catch {
          /* storage full — silently skip cache */
        }
        setStars(s);
      })
      .catch(() => {
        if (!cancelled) setStars(null);
      });

    return () => {
      cancelled = true;
    };
  }, [repo]);

  return stars;
}
