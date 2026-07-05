import { useState, useEffect } from 'react';

export function ProgressBar() {
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? `${Math.min((scroll / total) * 100, 100)}%` : '0%');
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[1001] pointer-events-none"
      style={{ width, background: 'linear-gradient(90deg, #0f0, #00d4ff)' }}
    />
  );
}
