import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function clampStagger(index) {
  return Math.min(Math.max(index, 1), 6);
}

/* ========================================================================== */
/*  useInView — IntersectionObserver hook for scroll-triggered reveal          */
/* ========================================================================== */

function useInView({ threshold = 0.25, rootMargin = "0px 0px -12% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/* ========================================================================== */
/*  Style tokens                                                               */
/* ========================================================================== */

const lineTrackStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "1px",
  background: "var(--color-hairline)",
  zIndex: 0,
};

const lineDrawStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "var(--progress, 0%)",
  background: "var(--color-accent)",
  transition:
    "height var(--duration-smooth) var(--ease-sharp)",
  willChange: "height",
};

const dotOuterStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "12px",
  height: "12px",
  borderRadius: 0,
  background: "var(--color-void)",
  border: "1px solid var(--color-hairline)",
  transition:
    "border-color var(--duration-smooth) var(--ease-sharp)",
};

const dotOuterActiveStyle = {
  borderColor: "var(--color-border-accent)",
};

const dotInnerBase = {
  width: "8px",
  height: "8px",
  borderRadius: 0,
  background: "var(--color-surface-elevated)",
  transition:
    "background-color var(--duration-smooth) var(--ease-sharp)",
};

const dotInnerActiveStyle = {
  background: "var(--color-accent)",
};

const yearTagStyle = {
  color: "var(--color-accent)",
  borderColor: "var(--color-border-accent)",
  background: "var(--color-accent-dim)",
};

const titleStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "1.0625rem",
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  textTransform: "uppercase",
  color: "var(--color-text)",
};

const descStyle = {
  fontSize: "0.875rem",
  lineHeight: 1.6,
  color: "var(--color-text-muted)",
  fontFamily: "var(--font-mono)",
};

/* ========================================================================== */
/*  TimelineItem (internal)                                                    */
/* ========================================================================== */

const TimelineItem = forwardRef(function TimelineItem(
  { item, index = 0, active = false, className = "", style, ...props },
  ref
) {
  const { year, title, desc, icon: Icon } = item;
  const isEven = index % 2 === 0;
  const stagger = `stagger-${clampStagger(index + 1)}`;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-start gap-6",
        isEven ? "md:flex-row" : "md:flex-row-reverse",
        className
      )}
      style={style}
      {...props}
    >
      {/* Dot: double-bezel, aligned to line (left on mobile, center on desktop) */}
      <span
        aria-hidden="true"
        className="absolute left-[13px] top-[6px] z-10 -translate-x-1/2 md:left-1/2"
        style={{ ...dotOuterStyle, ...(active ? dotOuterActiveStyle : null) }}
      >
        <span style={{ ...dotInnerBase, ...(active ? dotInnerActiveStyle : null) }} />
      </span>

      {/* Content card */}
      <div
        className={cn(
          "reveal ml-10 md:ml-0 md:w-[calc(50%-2.5rem)]",
          stagger,
          isEven ? "md:pr-12 md:text-right" : "md:pl-12",
          active && "visible"
        )}
      >
        <div
          className="card-brutal flex flex-col"
          style={{ gap: "var(--space-2)", padding: "var(--space-5)" }}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              isEven && "md:flex-row-reverse"
            )}
          >
            <span className="tag" style={yearTagStyle}>
              {year}
            </span>
            {Icon && (
              <Icon
                aria-hidden="true"
                style={{
                  width: "1rem",
                  height: "1rem",
                  color: "var(--color-text-faint)",
                }}
              />
            )}
          </div>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descStyle}>{desc}</p>
        </div>
      </div>
    </div>
  );
});
TimelineItem.displayName = "TimelineItem";

/* ========================================================================== */
/*  Timeline                                                                   */
/* ========================================================================== */

export const Timeline = forwardRef(function Timeline(
  { items = [], className = "", style, ...props },
  ref
) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const drawRef = useRef(null);
  const [activeCount, setActiveCount] = useState(0);

  const setContainer = useCallback(
    (node) => {
      containerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setActiveCount(items.length);
      if (drawRef.current) drawRef.current.style.setProperty("--progress", "100%");
      return undefined;
    }

    const seen = new Set();

    const updateProgress = () => {
      if (!drawRef.current || !items.length) return;
      const ratio = Math.min(seen.size / items.length, 1);
      drawRef.current.style.setProperty(
        "--progress",
        `${(ratio * 100).toFixed(2)}%`
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.dataset.timelineIndex);
          seen.add(idx);
          observer.unobserve(entry.target);
        });
        setActiveCount(seen.size);
        updateProgress();
      },
      { threshold: 0.4, rootMargin: "0px 0px -20% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div
      ref={setContainer}
      className={cn("relative", className)}
      style={style}
      {...props}
    >
      {/* Central line: static track + animated draw */}
      <div className="absolute left-[13px] top-0 bottom-0 md:left-1/2 md:-translate-x-1/2">
        <div style={lineTrackStyle} />
        <div ref={drawRef} style={lineDrawStyle} />
      </div>

      <div className="flex flex-col" style={{ gap: "var(--space-10)" }}>
        {items.map((item, i) => (
          <div
            key={item.year ?? i}
            ref={(node) => {
              itemRefs.current[i] = node;
            }}
            data-timeline-index={i}
          >
            <TimelineItem item={item} index={i} active={i < activeCount} />
          </div>
        ))}
      </div>
    </div>
  );
});
Timeline.displayName = "Timeline";

/* ========================================================================== */
/*  Stack — magnetic tag pills                                                 */
/* ========================================================================== */

const eyebrowStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-2)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--color-text-faint)",
  padding: "var(--space-1) var(--space-3)",
  borderRadius: 0,
  background: "var(--color-surface)",
  border: "1px solid var(--color-hairline)",
  marginBottom: "var(--space-5)",
};

const stackTitleStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.875rem, 4vw, 3rem)",
  fontWeight: 700,
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  textTransform: "uppercase",
  color: "var(--color-text)",
  marginBottom: "var(--space-8)",
};

function StackPill({ label, index, active }) {
  const [lift, setLift] = useState({ x: 0, y: 0, hovering: false });
  const stagger = `stagger-${clampStagger(index + 1)}`;

  const handleMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    setLift({
      x: (relX / rect.width) * 8,
      y: (relY / rect.height) * 6,
      hovering: true,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setLift({ x: 0, y: 0, hovering: false });
  }, []);

  return (
    <span
      className={cn("tag reveal", stagger, active && "visible")}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        cursor: "default",
        transform: `translate(${lift.x}px, ${lift.y}px) scale(${
          lift.hovering ? 1.05 : 1
        })`,
        borderColor: lift.hovering
          ? "var(--color-border-accent)"
          : "var(--color-hairline)",
        color: lift.hovering ? "var(--color-text)" : "var(--color-text-muted)",
        boxShadow: "none",
        transition:
          "transform var(--duration-smooth) var(--ease-sharp), border-color var(--duration-fast) var(--ease-sharp), color var(--duration-fast) var(--ease-sharp), opacity var(--duration-slower) var(--ease-expo)",
        willChange: "transform",
      }}
    >
      {label}
    </span>
  );
}

export const Stack = forwardRef(function Stack(
  { items = [], className = "", title, subtitle, style, ...props },
  ref
) {
  const [inViewRef, inView] = useInView({ threshold: 0.2 });

  const setRefs = useCallback(
    (node) => {
      inViewRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, inViewRef]
  );

  return (
    <section
      ref={setRefs}
      className={cn("border-t border-white/10 px-6 py-24", className)}
      style={style}
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        {subtitle && <span style={eyebrowStyle}>{subtitle}</span>}
        {title && <h2 style={stackTitleStyle}>{title}</h2>}

        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <StackPill key={item} label={item} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
});
Stack.displayName = "Stack";

export { TimelineItem };
