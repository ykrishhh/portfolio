interface ProjectProps {
  name: string;
  desc: string;
  detail: string;
  tags: string[];
  url: string;
}

export function ProjectCard({ name, desc, detail, tags, url }: ProjectProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-6 rounded border border-transparent bg-black hover:border-transparent transition-all duration-300 overflow-hidden min-h-[180px] md:min-h-[200px]"
    >
      {/* Glitch gradient border on hover */}
      <div className="absolute inset-[-2px] bg-gradient-to-r from-green-500 via-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[-2] animate-[spin_4s_linear_infinite]" />
      
      {/* Card black inner cover to shield the border gradient */}
      <div className="absolute inset-0 bg-[#070707] z-[-1]" />

      {/* Glow highlight */}
      <div className="absolute inset-0 bg-radial-gradient from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content overlay structure matching the original layout */}
      <div className="flex flex-col items-center justify-center text-center w-full transition-transform duration-300 group-hover:-translate-y-4">
        <h3 className="font-mono text-sm font-bold text-green-500 tracking-widest uppercase mb-2 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">
          {name}
        </h3>
        <p className="text-xs text-gray-500 group-hover:opacity-40 transition-opacity duration-300">
          {desc}
        </p>
        
        {/* Tags appear on hover */}
        <div className="flex flex-wrap gap-1.5 justify-center mt-3 max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-[50px] overflow-hidden transition-all duration-300">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] font-mono rounded bg-green-500/10 text-green-500 border border-green-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Slide up detail text */}
      <p className="absolute bottom-4 left-4 right-4 text-[11px] leading-relaxed text-white text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
        {detail}
      </p>

      {/* Small top right arrow */}
      <span className="absolute top-3 right-3 text-xs text-gray-600 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 font-mono">
        ↗
      </span>
    </a>
  );
}
