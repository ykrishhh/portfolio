import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import {
  ParticlesBg,
  MatrixRain,
  Terminal,
  ProjectCard,
  Stats,
  Timeline,
  Contact,
  ProgressBar,
  ScrollToTop,
  Skills,
  Services,
  Writeups,
} from './components/ui';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import type { RepoCategory } from './types';

const categories = [
  { id: 'all' as const, label: 'All Projects' },
  { id: 'security' as const, label: 'Cybersecurity' },
  { id: 'ai' as const, label: 'AI / LLM' },
  { id: 'iot' as const, label: 'Embedded & IoT' },
  { id: 'devops' as const, label: 'Devops / Fullstack' },
];

const techMarqueeData = [
  'Python', 'Java', 'TypeScript', 'JavaScript', 'C', 'Assembly', 'Linux', 'ESP32',
  'Docker', 'Kubernetes', 'Git', 'React', 'Node.js', 'Frida', 'Nmap', 'Wireshark',
  'Metasploit', 'Burp Suite', 'SQL', 'HTML/CSS', 'Ollama', 'eBPF', 'Xposed'
];

function SectionDivider() {
  return <div className="section-divider mx-auto max-w-4xl my-0" />;
}

function AppContent() {
  const [activeFilter, setActiveFilter] = useState<RepoCategory | 'all'>('all');
  const [typedTitle, setTypedTitle] = useState('');
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const fullTitle = 'Security Researcher & Developer';
  const { repos, stats, loading } = useGitHubRepos();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullTitle.substring(0, index));
      index++;
      if (index > fullTitle.length) {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredRepos = repos.filter(
    (r) => activeFilter === 'all' || r.category === activeFilter
  );

  return (
    <div className="relative min-h-screen text-gray-300 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
      <ProgressBar />
      <ScrollToTop />

      <div className="bg-gradient-cyber" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div
        id="mouse-glow"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        aria-hidden="true"
      />

      <ParticlesBg />
      <MatrixRain />
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen pt-20 px-4 max-w-5xl mx-auto text-center"
      >
        {/* Decorative terminal frame behind hero */}
        <div className="absolute right-[5%] top-[25%] w-[280px] opacity-20 pointer-events-none hidden lg:block">
          <div className="terminal-frame">
            <div className="title-bar">
              <div className="dot dot-red" />
              <div className="dot dot-yellow" />
              <div className="dot dot-green" />
              <span className="label">KRI$H — ~/terminal</span>
            </div>
            <div className="p-3 font-mono text-[11px] leading-relaxed text-gray-500">
              <span className="text-green-500">$</span> whoami<br />
              <span className="text-gray-400">&gt; security_researcher<br />
              &gt; exploit_dev<br />
              &gt; ai_orchestrator</span><br />
              <span className="text-green-500">$</span> status<br />
              <span className="text-gray-400">&gt; node_active</span><br />
              <span className="text-green-500 animate-caret-blink">▊</span>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full font-mono text-[10px] uppercase tracking-wider text-green-500 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
          node_status: active
        </div>

        <h1 className="glitch-title mb-2" data-text="KRI$H">
          KRI$H
        </h1>

        <div className="font-mono text-base sm:text-xl text-green-500 min-h-[30px] mb-6">
          {typedTitle}
          <span className="animate-ping">_</span>
        </div>

        <p className="max-w-xl text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
          I build open-source security tools and firmware targeting ESP32, Android kernels, and system vulnerabilities, alongside automated agentic AI workflows.
        </p>

        <div className="flex gap-4">
          <a
            href="#projects"
            className="btn-layer relative px-6 py-2.5 font-mono text-xs uppercase tracking-wider rounded font-bold text-green-500 hover:bg-green-500/10 hover:shadow-glow-green-sm transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="btn-layer relative px-6 py-2.5 font-mono text-xs uppercase tracking-wider rounded text-green-500 hover:bg-green-500/10 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />
      <SectionDivider />

      {/* Stats Section */}
      <section className="py-12 bg-black/40 border-y border-[#1a1a1a] backdrop-blur-sm px-4">
        <Stats totalRepos={stats.totalRepos} totalStars={stats.totalStars} totalForks={stats.totalForks} lastUpdated={stats.lastUpdated} />
      </section>

      {/* Services Section */}
      <Services />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-green-500">
            // index_of_operations
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono uppercase text-white mt-1">
            Featured Projects
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider border transition-all duration-200 ${
                activeFilter === cat.id
                  ? 'bg-green-500 border-green-500 text-black font-bold'
                  : 'bg-transparent border-[#1a1a1a] text-gray-500 hover:text-green-500/80 hover:border-green-500/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full flex items-center justify-center gap-4 md:gap-8">
          <svg className="serpent serpent-left" viewBox="0 0 60 700" fill="none" aria-hidden="true">
            <path className="body-main" d="M30 10 C55 80,5 160,30 230 C55 300,5 380,30 450 C55 520,5 600,30 680" stroke="#0f0" strokeWidth="2.5" strokeLinecap="round" />
            <path className="body-inner" d="M30 18 C52 82,8 158,30 225 C52 295,8 375,30 445 C52 515,8 595,30 672" stroke="#0f0" strokeWidth=".8" opacity=".15" />
            <path d="M30 10 C27 3,34 0,30 -4" stroke="#0f0" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M30 680 C34 688,26 694,32 700" stroke="#0f0" strokeWidth="1.5" strokeLinecap="round" />
            <g className="scales">
              <path d="M36 40 C44 32,50 38,54 30 C57 24,52 18,56 12" stroke="#0f0" strokeWidth=".7" fill="none" strokeLinecap="round" />
              <path d="M44 80 C52 68,54 56,48 50 C46 58,42 68,44 80Z" stroke="#0f0" strokeWidth=".8" fill="rgba(0,255,0,.05)" />
              <circle cx="48" cy="118" r="3.5" stroke="#0f0" strokeWidth=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="53" cy="124" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="43" cy="125" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="48" cy="131" r="3" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <path d="M16 180 C8 168,6 156,12 150 C14 158,18 168,16 180Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <path d="M22 200 C14 192,8 198,4 190 C1 184,6 178,2 172" stroke="#0f0" stroke-width=".7" fill="none" stroke-linecap="round" />
              <circle cx="12" cy="248" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="7" cy="254" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="17" cy="255" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="12" cy="261" r="3" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <path d="M46 310 C54 298,56 286,50 280 C48 288,44 298,46 310Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <path d="M42 348 C50 340,54 346,58 338 C60 332,56 326,58 320" stroke="#0f0" stroke-width=".7" fill="none" stroke-linecap="round" />
              <path d="M14 400 C6 388,4 376,10 370 C12 378,16 388,14 400Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <circle cx="46" cy="455" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="51" cy="461" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="41" cy="462" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="46" cy="468" r="3" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <path d="M20 500 C12 492,6 498,2 490 C0 484,4 478,0 472" stroke="#0f0" stroke-width=".7" fill="none" stroke-linecap="round" />
              <path d="M44 540 C52 528,54 516,48 510 C46 518,42 528,44 540Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <circle cx="14" cy="578" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="9" cy="584" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="19" cy="585" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="14" cy="591" r="3" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <path d="M16 640 C8 628,6 616,12 610 C14 618,18 628,16 640Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <path d="M36 660 C44 652,48 658,52 650 C54 644,50 638,54 632" stroke="#0f0" stroke-width=".7" fill="none" stroke-linecap="round" />
            </g>
          </svg>

          <div className="relative flex-1 max-w-[850px] overflow-hidden">
            <div className="embers" aria-hidden="true">
              <div className="ember" style={{ left: '5%', bottom: '15%', width: '3px', height: '3px', background: '#0f0', animationDuration: '5.5s', '--drift': '12px' } as React.CSSProperties}></div>
              <div className="ember" style={{ left: '92%', bottom: '25%', width: '2px', height: '2px', background: '#ff4400', animationDuration: '6.2s', animationDelay: '1.2s', '--drift': '-18px' } as React.CSSProperties}></div>
              <div className="ember" style={{ left: '8%', bottom: '40%', width: '2px', height: '2px', background: '#0ff', animationDuration: '4.8s', animationDelay: '2.5s', '--drift': '8px' } as React.CSSProperties}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredRepos.map((repo) => (
                <ProjectCard key={repo.id} {...repo} />
              ))}
            </div>
          </div>

          <svg className="serpent serpent-right" viewBox="0 0 60 700" fill="none" aria-hidden="true">
            <path className="body-main" d="M30 10 C55 80,5 160,30 230 C55 300,5 380,30 450 C55 520,5 600,30 680" stroke="#0f0" strokeWidth="2.5" strokeLinecap="round" />
            <path className="body-inner" d="M30 18 C52 82,8 158,30 225 C52 295,8 375,30 445 C52 515,8 595,30 672" stroke="#0f0" strokeWidth=".8" opacity=".15" />
            <path d="M30 10 C27 3,34 0,30 -4" stroke="#0f0" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M30 680 C34 688,26 694,32 700" stroke="#0f0" strokeWidth="1.5" strokeLinecap="round" />
            <g className="scales">
              <path d="M36 40 C44 32,50 38,54 30 C57 24,52 18,56 12" stroke="#0f0" strokeWidth=".7" fill="none" strokeLinecap="round" />
              <path d="M44 80 C52 68,54 56,48 50 C46 58,42 68,44 80Z" stroke="#0f0" strokeWidth=".8" fill="rgba(0,255,0,.05)" />
              <circle cx="48" cy="118" r="3.5" stroke="#0f0" strokeWidth=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="53" cy="124" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="43" cy="125" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="48" cy="131" r="3" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <path d="M16 180 C8 168,6 156,12 150 C14 158,18 168,16 180Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <path d="M22 200 C14 192,8 198,4 190 C1 184,6 178,2 172" stroke="#0f0" stroke-width=".7" fill="none" stroke-linecap="round" />
              <circle cx="12" cy="248" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="7" cy="254" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="17" cy="255" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="12" cy="261" r="3" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <path d="M46 310 C54 298,56 286,50 280 C48 288,44 298,46 310Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <path d="M42 348 C50 340,54 346,58 338 C60 332,56 326,58 320" stroke="#0f0" stroke-width=".7" fill="none" stroke-linecap="round" />
              <path d="M14 400 C6 388,4 376,10 370 C12 378,16 388,14 400Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <circle cx="46" cy="455" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="51" cy="461" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="41" cy="462" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="46" cy="468" r="3" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <path d="M20 500 C12 492,6 498,2 490 C0 484,4 478,0 472" stroke="#0f0" stroke-width=".7" fill="none" stroke-linecap="round" />
              <path d="M44 540 C52 528,54 516,48 510 C46 518,42 528,44 540Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <circle cx="14" cy="578" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="9" cy="584" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="19" cy="585" r="3.5" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <circle cx="14" cy="591" r="3" stroke="#0f0" stroke-width=".7" fill="rgba(0,255,0,.05)" />
              <path d="M16 640 C8 628,6 616,12 610 C14 618,18 628,16 640Z" stroke="#0f0" stroke-width=".8" fill="rgba(0,255,0,.05)" />
              <path d="M36 660 C44 652,48 658,52 650 C54 644,50 638,54 632" stroke="#0f0" stroke-width=".7" fill="none" stroke-linecap="round" />
            </g>
          </svg>
        </div>
      </section>

      {/* Writeups Section */}
      <Writeups repos={repos} />

      {/* Tech Marquee Section */}
      <section className="overflow-hidden py-6 border-y border-[#1a1a1a] bg-[#050505] relative select-none">
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        <div className="flex gap-4 w-max animate-marquee">
          {[...techMarqueeData, ...techMarqueeData].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#1a1a1a] bg-black text-gray-400 font-mono text-xs hover:border-green-500 hover:text-green-500 hover:shadow-[0_0_12px_rgba(0,255,0,0.15)] transition-all duration-300 uppercase tracking-widest"
            >
              <span className="w-1 h-1 bg-green-500/50 rounded-full" />
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* About & Terminal Section */}
      <section id="about" className="py-20 px-4 bg-black/40 border-b border-[#1a1a1a] backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-green-500">
              // identity_verification
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono uppercase text-white mt-1">
              Terminal Profile
            </h2>
          </div>

          <Terminal />
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-green-500">
            // chronological_log
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono uppercase text-white mt-1">
            Research Timeline
          </h2>
        </div>

        <Timeline />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#050505] border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-green-500">
              // communication_link
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono uppercase text-white mt-1">
              Establish Connection
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              If you have projects requiring reverse engineering, hardware security research, or agentic automation, reach out.
            </p>
          </div>

          <Contact />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#1a1a1a] relative">
        {/* Gradient top border */}
        <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-gray-600">
            Built with <span className="text-green-500/80">♥</span> by KRI$H &middot; {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ykrishhh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-500 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://x.com/harry6ez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-500 transition-colors"
              aria-label="Twitter / X"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <span className="font-mono text-[10px] text-gray-700 tracking-wider">Deployed on GitHub Pages</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
