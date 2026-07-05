import { useState } from 'react';

interface ContactMethod {
  name: string;
  value: string;
  url: string;
  icon: JSX.Element;
}

const contactMethods: ContactMethod[] = [
  {
    name: 'Email',
    value: 'krishy2122@gmail.com',
    url: 'mailto:krishy2122@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    value: '@ykrishhh',
    url: 'https://x.com/ykrishhh',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    value: '@Mcpaitgbot',
    url: 'https://t.me/Mcpaitgbot',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.74 7.59-3.27 3.61-1.5 4.36-1.76 4.85-1.77.11 0 .35.03.5.15.13.12.17.29.18.41.01.08.02.26.01.34z" />
      </svg>
    ),
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'At least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const mailto = `mailto:krishy2122@gmail.com?subject=Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\n— ' + form.name + ' (' + form.email + ')')}`;
    window.location.href = mailto;
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto w-full">
      {/* Contact Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {contactMethods.map((method) => (
          <a
            key={method.name}
            href={method.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 p-4 rounded-lg border border-[#1a1a1a] border-l-[3px] border-l-green-500/30 bg-[#070707] hover:border-green-500/40 hover:bg-green-950/5 transition-all duration-300"
          >
            {/* Circular icon container */}
            <div className="w-10 h-10 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500/20 group-hover:border-green-500/40 group-hover:scale-110 transition-all duration-300">
              {method.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-xs text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-wider">
                {method.name}
              </span>
              <span className="font-mono text-sm text-gray-300 group-hover:text-green-400 transition-colors truncate">
                {method.value}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
              className={`w-full px-4 py-2.5 rounded bg-black border font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none transition-all duration-200 ${
                errors.name
                  ? 'border-red-500 ring-1 ring-red-500/30'
                  : 'border-[#1a1a1a] focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30'
              }`}
            />
            {errors.name && (
              <div className="mt-1 border-l-[3px] border-l-red-500 pl-3">
                <p className="text-xs text-red-500 font-mono">{errors.name}</p>
              </div>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
              className={`w-full px-4 py-2.5 rounded bg-black border font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none transition-all duration-200 ${
                errors.email
                  ? 'border-red-500 ring-1 ring-red-500/30'
                  : 'border-[#1a1a1a] focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30'
              }`}
            />
            {errors.email && (
              <div className="mt-1 border-l-[3px] border-l-red-500 pl-3">
                <p className="text-xs text-red-500 font-mono">{errors.email}</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <textarea
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
            className={`w-full px-4 py-2.5 rounded bg-black border font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none transition-all duration-200 resize-none ${
              errors.message
                ? 'border-red-500 ring-1 ring-red-500/30'
                : 'border-[#1a1a1a] focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30'
            }`}
          />
          {errors.message && (
            <div className="mt-1 border-l-[3px] border-l-red-500 pl-3">
              <p className="text-xs text-red-500 font-mono">{errors.message}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-layer relative px-6 py-2.5 font-mono text-xs uppercase tracking-wider rounded font-bold text-green-500 hover:bg-green-500/10 transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
