import { useEffect, useState, useCallback, useRef } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode({ duration = 10000 } = {}) {
  const [active, setActive] = useState(false);
  const bufferRef = useRef([]);

  const activate = useCallback(() => {
    setActive(true);
    const timer = setTimeout(() => setActive(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    let cleanupTimer = null;

    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) {
        return;
      }

      // Prevent browser back/forward from Konami arrows
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      const next = [...bufferRef.current, e.key].slice(-KONAMI_SEQUENCE.length);
      bufferRef.current = next;

      // Check if the buffer matches the Konami sequence
      if (next.length === KONAMI_SEQUENCE.length &&
          next.every((k, i) => k === KONAMI_SEQUENCE[i])) {
        bufferRef.current = [];
        cleanupTimer = activate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (cleanupTimer) cleanupTimer();
    };
  }, [activate]);

  return active;
}
