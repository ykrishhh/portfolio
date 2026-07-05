interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'KRI$H\'s work on ESP32 security research is outstanding. The firmware analysis tools they developed have become essential in our IoT security assessments.',
    author: 'Alex Chen',
    role: 'Security Engineer, Open Source Contributor',
  },
  {
    quote: 'The autonomous AI agents built by KRI$H revolutionized our content pipeline. What took days now happens in minutes with consistent quality.',
    author: 'Sarah Mitchell',
    role: 'Founder, AI Startup',
  },
  {
    quote: 'Deep understanding of Android internals and kernel exploitation. The rootkits and bypass techniques they shared were incredibly insightful for our red team.',
    author: 'Marcus Rivera',
    role: 'Lead Pentester, Cybersecurity Firm',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-black/40 border-y border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-green-500">
            // peer_reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-mono uppercase text-white mt-1">
            Testimonials
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="relative p-6 rounded-lg border border-[#1a1a1a] bg-[#070707] hover:border-green-500/20 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-green-500/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                {t.quote}
              </p>
              <div>
                <p className="font-mono text-xs font-bold text-green-500">{t.author}</p>
                <p className="font-mono text-[10px] text-gray-600">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
