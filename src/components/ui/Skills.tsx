import { useState, useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
}

const skillData: Skill[] = [
  { name: 'Penetration Testing', level: 92 },
  { name: 'Reverse Engineering', level: 88 },
  { name: 'AI / LLM Orchestration', level: 85 },
  { name: 'Embedded Systems', level: 82 },
  { name: 'Android Security', level: 78 },
  { name: 'Linux Hardening', level: 90 },
];

function SkillBar({ skill }: { skill: Skill }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(skill.level), 150);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [skill.level]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between font-mono text-xs">
        <span className="text-gray-300">{skill.name}</span>
        <span className="text-green-500">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#1a1a1a] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-500 to-cyan-400 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="py-20 px-4 bg-black/40 border-b border-[#1a1a1a]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-green-500">
            // capability_matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-mono uppercase text-white mt-1">
            Skills & Proficiency
          </h2>
        </div>
        <div className="space-y-5">
          {skillData.map((s) => (
            <SkillBar key={s.name} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
