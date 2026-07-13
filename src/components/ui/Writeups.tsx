import { motion } from 'motion/react';
import type { CategorizedRepo } from '../../types';
import { staggerContainer, staggerItem } from '../../lib/motion';

interface Writeup {
  title: string;
  desc: string;
  tags: string[];
  url: string;
}

const WRITEUP_KEYWORDS = ['writeup', 'guide', 'masterclass', 'research', 'hardening', 'toolkit', 'poc', 'rooting', 'reversing'];

function isWriteupRepo(repo: CategorizedRepo): boolean {
  const text = `${repo.name} ${repo.description ?? ''}`.toLowerCase();
  return WRITEUP_KEYWORDS.some((kw) => text.includes(kw));
}

function repoToWriteup(repo: CategorizedRepo): Writeup {
  const title = repo.name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title,
    desc: repo.description ?? 'No description',
    tags: repo.topics.length > 0 ? repo.topics.slice(0, 3) : [repo.category],
    url: repo.html_url,
  };
}

interface WriteupsProps {
  repos: CategorizedRepo[];
}

export function Writeups({ repos }: WriteupsProps) {
  const writeups: Writeup[] = repos.filter(isWriteupRepo).map(repoToWriteup);

  if (writeups.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px' }}
      variants={staggerContainer}
      className="py-20 px-4 max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-green-500">
          // research_writeups
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono uppercase text-white mt-1">
          Research & Writeups
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
          Technical deep-dives, guides, and research publications
        </p>
      </div>
      <div className="space-y-4">
        {writeups.map((w) => (
          <motion.a
            key={w.title}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={staggerItem}
            whileHover={{ x: 4, borderColor: 'rgba(34,197,94,0.5)' }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-lg glass-panel glass-card-hover border-l-[3px] border-l-green-500/30"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-sm font-bold text-green-500 group-hover:text-green-400 transition-colors">
                {w.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">
                {w.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {w.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[9px] font-mono rounded bg-green-500/10 text-green-500 border border-green-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              className="link-arrow mt-3 sm:mt-0 sm:ml-4 font-mono text-xs text-gray-600 group-hover:text-green-500 transition-colors"
            >
              Read more →
            </motion.span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
