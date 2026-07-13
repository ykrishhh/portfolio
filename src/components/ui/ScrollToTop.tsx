import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scroll > 300);
      setProgress(total > 0 ? Math.min(scroll / total, 1) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const r = 14;
  const circ = 2 * Math.PI * r;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1, borderColor: 'rgba(34,197,94,0.5)' }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[1000] flex items-center justify-center w-11 h-11 rounded-full border border-[#1a1a1a] bg-[#0a0a0a]"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" className="absolute">
            <circle
              cx="18" cy="18" r={r}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            <circle
              cx="18" cy="18" r={r}
              fill="none"
              stroke="#0f0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - progress)}
              transform="rotate(-90 18 18)"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          <svg className="relative" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
