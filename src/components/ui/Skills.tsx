import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { fadeSlideUp } from '../../lib/motion';

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

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(skill.level);
            const steps = 30;
            const increment = skill.level / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= skill.level) {
                setCount(skill.level);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, 40);
          }, 150);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [skill.level]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-1.5"
    >
      <div className="flex justify-between font-mono text-xs">
        <span className="text-gray-300">{skill.name}</span>
        <span className="text-green-500">{count}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#1a1a1a] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-500 to-cyan-400 transition-all duration-1000 ease-out shadow-[0_0_6px_rgba(0,255,0,0.3)]"
          style={{ width: `${width}%` }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px' }}
      variants={fadeSlideUp}
      className="py-20 px-4 bg-black/40 border-b border-[#1a1a1a]"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-green-500">
            // capability_matrix
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono uppercase text-white mt-1">
            Skills & Proficiency
          </h2>
        </div>
        <div className="space-y-5">
          {skillData.map((s, i) => (
            <SkillBar key={s.name} skill={s} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
