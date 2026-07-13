import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 border-b transition-[background,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-[#1a1a1a] shadow-[0_0_30px_rgba(0,0,0,0.5)]'
          : 'bg-black/70 backdrop-blur-lg border-[#1a1a1a]/60'
      }`}
    >
      {/* Subtle green glow aura on the right */}
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-green-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 relative z-10">
        {/* Logo */}
        <a
          href="#home"
          className="font-mono text-sm font-bold text-green-500 tracking-wider hover:text-green-400 hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] transition-all duration-300 uppercase"
        >
          KRI$H //
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="flex gap-6 list-none p-0 m-0 relative">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              return (
                <li key={link.href} className="relative">
                  <motion.a
                    href={link.href}
                    whileHover={{ color: '#22c55e' }}
                    whileTap={{ scale: 0.96 }}
                    className={`font-mono text-xs uppercase tracking-wider transition-colors duration-200 relative py-4 ${
                      activeSection === id
                        ? 'text-green-500 font-semibold'
                        : 'text-gray-500'
                    }`}
                  >
                    {link.label}
                    {activeSection === id && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-green-500 rounded-full shadow-[0_0_8px_rgba(0,255,0,0.5)]"
                      />
                    )}
                  </motion.a>
                </li>
              );
            })}
          </ul>

          {/* Theme Toggle — animated pill */}
          <motion.button
            onClick={toggle}
            aria-label="Toggle theme"
            whileTap={{ scale: 0.9 }}
            className={`relative flex items-center w-[56px] h-[28px] rounded-full border transition-[border-color,background-color] duration-300 ${
              theme === 'dark'
                ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/50'
                : 'border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/50'
            }`}
          >
            <span
              className={`absolute flex items-center justify-center w-[22px] h-[22px] rounded-full transition-[left,background-color,box-shadow] duration-300 ${
                theme === 'dark'
                  ? 'left-[3px] bg-green-500/20 text-green-500 shadow-[0_0_8px_rgba(0,255,0,0.3)]'
                  : 'left-[31px] bg-cyan-500/20 text-cyan-500 shadow-[0_0_8px_rgba(0,200,255,0.3)]'
              }`}
            >
              {theme === 'dark' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </span>
          </motion.button>

          {/* Resume button */}
          <motion.a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-layer relative px-3 py-1.5 font-mono text-xs text-green-500 uppercase tracking-widest rounded hover:bg-green-500/10 hover:shadow-glow-green-sm transition-all duration-300"
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
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
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            <div className="absolute inset-x-8 top-20 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-col gap-6 items-center list-none p-0 m-0"
            >
              {navLinks.map((link) => {
                const id = link.href.substring(1);
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className={`font-mono text-lg uppercase tracking-wider transition-colors duration-200 ${
                        activeSection === id ? 'text-green-500' : 'text-gray-500'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="flex gap-3">
              <motion.button
                onClick={() => { toggle(); closeMobile(); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-green-500/50 text-green-500 font-mono text-xs uppercase tracking-widest rounded hover:bg-green-500 hover:text-black transition-colors duration-300"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </motion.button>
              <motion.a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-green-500/50 text-green-500 font-mono text-sm uppercase tracking-widest rounded hover:bg-green-500 hover:text-black transition-colors duration-300"
              >
                Resume
              </motion.a>
            </div>

            <div className="absolute inset-x-8 bottom-20 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
