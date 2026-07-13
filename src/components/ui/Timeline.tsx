import { useTiltEffect } from '../../hooks/useTiltEffect';

interface TimelineItem {
  date: string;
  title: string;
  desc: string;
}

const timelineData: TimelineItem[] = [
  {
    date: '2025',
    title: 'AI Agent Automation',
    desc: 'Building autonomous content agents, LLM comparisons, and self-hosted AI setups on Android/Termux.',
  },
  {
    date: '2025',
    title: 'ESP32 Security Research',
    desc: 'Deep-dive into ESP32 firmware analysis, WiFi/BLE exploitation, and building pentesting telemetry tools.',
  },
  {
    date: '2024',
    title: 'Android Reverse Engineering',
    desc: 'Mastering APK analysis, Frida hooking, Xposed/LSPosed modules, and KernelPatch/eBPF kernel patching.',
  },
  {
    date: '2024',
    title: 'CVE Research & PoC Development',
    desc: 'Discovering and documenting vulnerabilities with responsible disclosure and proof-of-concept exploits.',
  },
  {
    date: '2024',
    title: 'Linux Security Hardening',
    desc: 'Building automated hardening scripts with CIS benchmarks, firewall rules, and kernel parameter tuning.',
  },
  {
    date: '2023',
    title: 'Web & Network Security',
    desc: 'Penetration testing, network scanning tools, and building security monitoring for Telegram bots.',
  },
];

export function Timeline() {
  const tiltRefs = timelineData.map(() => useTiltEffect<HTMLDivElement>({ maxTilt: 4, scale: 1.01 }));
  return (
    <div className="relative max-w-2xl mx-auto pl-6 md:pl-8 border-l border-green-500/20 py-4 space-y-8">
      {/* Decorative vertical glowing line */}
      <div className="absolute top-0 bottom-0 left-[-1px] w-[1px] bg-gradient-to-b from-green-500/80 via-green-500/20 to-transparent shadow-[0_0_8px rgba(0,255,0,0.5)]" />

      {timelineData.map((item, index) => (
        <div key={index} ref={tiltRefs[index]} className="relative group transition-all duration-300 hover:translate-x-1 tilt-card">
          {/* Node dot with pulse ring */}
          <div className="absolute left-[-29px] md:left-[-37px] top-1.5">
            {/* Pulse ring */}
            <div className="absolute inset-[-4px] rounded-full border border-green-500/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
            {/* Core dot */}
            <div className="relative w-3 h-3 rounded-full border border-green-500 bg-black group-hover:bg-green-500 transition-colors duration-300 shadow-[0_0_8px_rgba(0,255,0,0.3)] group-hover:shadow-[0_0_12px_rgba(0,255,0,0.8)]" />
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
            <span className="font-mono text-sm font-bold text-green-500 bg-green-500/10 border border-green-500/20 pl-3 pr-2 py-0.5 rounded w-max border-l-[3px] border-l-green-500">
              {item.date}
            </span>
            <h4 className="text-base font-bold text-gray-200 group-hover:text-green-400 transition-colors">
              {item.title}
            </h4>
          </div>
          
          <p className="mt-2 text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
