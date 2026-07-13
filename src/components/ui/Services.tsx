import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTiltEffect } from '../../hooks/useTiltEffect';

interface Service {
  title: string;
  desc: string;
  icon: JSX.Element;
}

const services: Service[] = [
  {
    title: 'Penetration Testing',
    desc: 'Web, mobile, network, and hardware penetration testing with detailed reporting. Identify vulnerabilities before adversaries do.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-14.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m15.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
      </svg>
    ),
  },
  {
    title: 'Security Research',
    desc: 'CVE research, exploit development, and responsible disclosure. Deep-dive analysis of embedded systems, kernels, and firmware.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10h-2m0 0H9m2 0V8m0 2v2" />
      </svg>
    ),
  },
  {
    title: 'AI Automation',
    desc: 'Build autonomous AI agents for content generation, security automation, and workflow orchestration using local and cloud LLMs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: 'Reverse Engineering',
    desc: 'APK analysis, firmware extraction, binary exploitation, and protocol reverse engineering. Android, ESP32, and ARM targets.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.16 5.16a2.25 2.25 0 01-3.18-3.18l5.16-5.16m4.08-4.08l5.16-5.16a2.25 2.25 0 013.18 3.18l-5.16 5.16m-4.08 4.08l3.06 3.06m-3.06-3.06l-3.06-3.06m7.5 7.5l-4.08-4.08" />
      </svg>
    ),
  },
];

export function Services() {
  const ref = useScrollReveal<HTMLElement>();
  const tiltRefs = services.map(() => useTiltEffect<HTMLDivElement>({ maxTilt: 6 }));
  return (
    <section ref={ref} className="animate-on-scroll py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-green-500">
          // service_offerings
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-mono uppercase text-white mt-1">
          What I Do
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {services.map((s, idx) => (
          <div
            key={s.title}
            ref={tiltRefs[idx]}
            className="stagger-item group relative p-6 rounded-lg glass-panel glass-card-hover tilt-card"
            style={{ ['--stagger-index' as string]: idx.toString() }}
          >
            <div className="tilt-glow" />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            
            {/* SVG icon in circular container */}
            <div className="w-12 h-12 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-500 mb-4 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all duration-300">
              {s.icon}
            </div>

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
