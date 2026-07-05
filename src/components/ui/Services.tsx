interface Service {
  title: string;
  desc: string;
  icon: string;
}

const services: Service[] = [
  {
    title: 'Penetration Testing',
    desc: 'Web, mobile, network, and hardware penetration testing with detailed reporting. Identify vulnerabilities before adversaries do.',
    icon: '🛡️',
  },
  {
    title: 'Security Research',
    desc: 'CVE research, exploit development, and responsible disclosure. Deep-dive analysis of embedded systems, kernels, and firmware.',
    icon: '🔬',
  },
  {
    title: 'AI Automation',
    desc: 'Build autonomous AI agents for content generation, security automation, and workflow orchestration using local and cloud LLMs.',
    icon: '🤖',
  },
  {
    title: 'Reverse Engineering',
    desc: 'APK analysis, firmware extraction, binary exploitation, and protocol reverse engineering. Android, ESP32, and ARM targets.',
    icon: '⚙️',
  },
];

export function Services() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-green-500">
          // service_offerings
        </span>
        <h2 className="text-2xl sm:text-3xl font-mono uppercase text-white mt-1">
          What I Do
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="group relative p-6 rounded-lg border border-[#1a1a1a] bg-[#070707] hover:border-green-500/30 transition-all duration-300"
          >
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            <div className="text-2xl mb-3">{s.icon}</div>
            <h3 className="font-mono text-sm font-bold text-green-500 mb-2 uppercase tracking-wider">
              {s.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
