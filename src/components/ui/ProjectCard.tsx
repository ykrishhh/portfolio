import { useTiltEffect } from '../../hooks/useTiltEffect';
import type { CategorizedRepo } from '../../types';

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  'C++': '#F34B7D',
  C: '#555555',
  Shell: '#89E051',
  Java: '#B07219',
  Rust: '#DEA584',
  Go: '#00ADD8',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Dockerfile: '#384D54',
};

export function ProjectCard({ name, description, html_url, stargazers_count, forks_count, language, topics, category }: CategorizedRepo) {
  const langColor = LANGUAGE_COLORS[language ?? ''] ?? '#6b7280';
  const tiltRef = useTiltEffect<HTMLAnchorElement>({ maxTilt: 6, scale: 1.02 });

  return (
    <a
      ref={tiltRef}
      href={html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-6 rounded glass-panel glass-card-hover min-h-[180px] md:min-h-[200px] stagger-item tilt-card"
      style={{ ['--stagger-index' as string]: '0' }}
    >
      {/* Outer glitch gradient border on hover */}
      <div className="absolute inset-[-2px] bg-gradient-to-r from-green-500 via-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[-2] animate-[spin_4s_linear_infinite] rounded" />

      {/* Card dark inner cover */}
      <div className="absolute inset-0 bg-[#070707] z-[-1] rounded" />

      {/* Inner double-bezel border */}
      <div className="absolute inset-[3px] border border-green-500/5 rounded pointer-events-none z-[-1]" />

      {/* Glow highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/8 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Badges row */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        {language && (
          <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono rounded bg-black/80 border border-[#1a1a1a] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: langColor }} />
            {language}
          </span>
        )}
        {stargazers_count > 0 && (
          <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono rounded bg-black/80 border border-[#1a1a1a] text-yellow-500">
            ★ {stargazers_count}
          </span>
        )}
        {forks_count > 0 && (
          <span className="flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono rounded bg-black/80 border border-[#1a1a1a] text-gray-400">
            ⑂ {forks_count}
          </span>
        )}
      </div>

      {/* Content overlay */}
      <div className="flex flex-col items-center justify-center text-center w-full transition-all duration-400 group-hover:-translate-y-4 relative z-10">
        <h3 className="font-mono text-sm font-bold text-green-500 tracking-widest uppercase mb-2 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">
          {name}
        </h3>
        <p className="text-xs text-gray-500 group-hover:opacity-40 transition-opacity duration-300 line-clamp-2">
          {description ?? 'No description'}
        </p>

        {/* Tags appear on hover */}
        <div className="flex flex-wrap gap-1.5 justify-center mt-3 max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-[50px] overflow-hidden transition-all duration-400">
          {topics.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] font-mono rounded bg-green-500/10 text-green-500 border border-green-500/20"
            >
              {tag}
            </span>
          ))}
          {topics.length === 0 && (
            <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-green-500/10 text-green-500 border border-green-500/20">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Slide up detail text */}
      <p className="absolute bottom-4 left-4 right-4 text-[11px] leading-relaxed text-white text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-10">
        {description ?? 'No description available'}
      </p>

      {/* Persistent subtle arrow in top-right */}
      <span className="absolute top-3 right-3 text-xs text-gray-600 opacity-30 group-hover:opacity-0 transition-all duration-300 font-mono">
        ↗
      </span>
    </a>
  );
}
