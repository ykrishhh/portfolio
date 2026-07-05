import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-[#1a1a1a]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-sm font-bold text-green-500 tracking-wider hover:text-green-400 transition-colors uppercase"
        >
          KRI$H //
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="flex gap-6 list-none p-0 m-0">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                      activeSection === id
                        ? 'text-green-500 font-semibold'
                        : 'text-gray-500 hover:text-green-500/80'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-[34px] h-[34px] rounded border border-[#1a1a1a] text-gray-500 hover:text-green-500 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* Resume */}
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-green-500/50 hover:bg-green-500 hover:text-black font-mono text-xs text-green-500 uppercase tracking-widest rounded transition-all duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-0.5 bg-green-500 transition-transform duration-300 origin-center ${
              mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-green-500 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-green-500 transition-transform duration-300 origin-center ${
              mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/98 backdrop-blur-lg flex flex-col items-center justify-center gap-6 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-6 items-center list-none p-0 m-0">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-lg uppercase tracking-wider transition-colors duration-200 ${
                    activeSection === id ? 'text-green-500' : 'text-gray-500'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-3">
          <button
            onClick={() => { toggle(); setMobileMenuOpen(false); }}
            className="px-4 py-2 border border-green-500/50 text-green-500 font-mono text-xs uppercase tracking-widest rounded hover:bg-green-500 hover:text-black transition-all duration-300"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="px-6 py-2 border border-green-500/50 text-green-500 font-mono text-sm uppercase tracking-widest rounded hover:bg-green-500 hover:text-black transition-all duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
