interface StatItem {
  count: string;
  label: string;
}

const stats: StatItem[] = [
  { count: '30+', label: 'Repositories' },
  { count: '5+', label: 'CVE PoCs' },
  { count: '12+', label: 'Custom Tools' },
  { count: '6+', label: 'AI Projects' },
];

export function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative flex flex-col items-center justify-center p-6 rounded-lg border border-[#1a1a1a] bg-[#070707] hover:border-green-500/30 transition-all duration-300"
        >
          {/* Subtle green line under card */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          
          <span className="font-mono text-3xl md:text-4xl font-extrabold text-green-500 tracking-tight mb-2 group-hover:text-green-400 transition-colors">
            {stat.count}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-gray-500 group-hover:text-gray-400 transition-colors">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
