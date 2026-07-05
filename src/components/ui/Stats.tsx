import { useState, useEffect, useRef } from 'react';

interface StatItem {
  count: string;
  label: string;
  numeric: number;
}

const stats: StatItem[] = [
  { count: '30+', label: 'Repositories', numeric: 30 },
  { count: '5+', label: 'CVE PoCs', numeric: 5 },
  { count: '12+', label: 'Custom Tools', numeric: 12 },
  { count: '6+', label: 'AI Projects', numeric: 6 },
];

function AnimatedStat({ stat }: { stat: StatItem }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 1500;
        const steps = 60;
        const increment = stat.numeric / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.numeric) {
            setVal(stat.numeric);
            clearInterval(timer);
          } else {
            setVal(Math.floor(current));
          }
        }, duration / steps);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.numeric]);

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center justify-center p-6 rounded-lg border border-[#1a1a1a] bg-[#070707]/80 backdrop-blur-sm hover:border-green-500/30 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
      <span className="font-mono text-3xl md:text-4xl font-extrabold text-green-500 tracking-tight mb-2 group-hover:text-green-400 transition-colors">
        {val}{stat.count.endsWith('+') ? '+' : ''}
      </span>
      <span className="text-xs font-mono uppercase tracking-wider text-gray-500 group-hover:text-gray-400 transition-colors">
        {stat.label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
      {stats.map((stat) => (
        <AnimatedStat key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
