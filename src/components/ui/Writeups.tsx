interface Writeup {
  title: string;
  desc: string;
  tags: string[];
  url: string;
}

const writeups: Writeup[] = [
  {
    title: 'Android Rooting Masterclass',
    desc: 'Complete guide from user-space DEX editing to Xposed/LSPosed modules to KernelPatch/eBPF kernel patching on Android.',
    tags: ['android', 'rooting', 'kernel'],
    url: 'https://github.com/ykrishhh/android-rooting-masterclass',
  },
  {
    title: 'Self-Hosted AI on Termux',
    desc: 'Step-by-step guide to running Ollama, Open WebUI, and local LLMs entirely on your Android phone via Termux.',
    tags: ['ai', 'termux', 'privacy'],
    url: 'https://github.com/ykrishhh/self-hosted-ai-termux',
  },
  {
    title: 'ESP32 Pentesting Firmware',
    desc: 'Building an advanced ESP32 pentesting and telemetry firmware with 2.4 GHz research, RF24, and forensic capture.',
    tags: ['esp32', 'firmware', 'iot'],
    url: 'https://github.com/ykrishhh/ESP32-HARNESS',
  },
  {
    title: 'Linux Hardening Scripts',
    desc: 'Automated CIS benchmark hardening, firewall rules, auditd policies, kernel parameter tuning, and SELinux configurations.',
    tags: ['linux', 'security', 'automation'],
    url: 'https://github.com/ykrishhh/linux-hardening',
  },
];

export function Writeups() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
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
          <a
            key={w.title}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-lg border border-[#1a1a1a] border-l-[3px] border-l-green-500/30 bg-[#070707] hover:border-green-500/30 hover:bg-green-950/5 hover:shadow-glow-green-sm transition-all duration-300"
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
            <span className="link-arrow mt-3 sm:mt-0 sm:ml-4 font-mono text-xs text-gray-600 group-hover:text-green-500 transition-colors">
              Read more →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
