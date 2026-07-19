import {
  forwardRef,
  createContext,
  useContext,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FilterTabsContext = createContext(null);

function useFilterTabsContext() {
  return useContext(FilterTabsContext);
}

/* ========== Container ========== */
export const FilterTabs = forwardRef(function FilterTabs(
  { className = "", children, ariaLabel = "Filter projects", ...props },
  ref
) {
  const listRef = useRef(null);
  const tabRefs = useRef(new Map());
  const [indicator, setIndicator] = useState(null);
  const [ready, setReady] = useState(false);

  const registerTab = useCallback((value, node) => {
    if (node) {
      tabRefs.current.set(value, node);
    } else {
      tabRefs.current.delete(value);
    }
  }, []);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector('[data-active="true"]');
    if (!active) {
      setIndicator(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    setIndicator({
      x: rect.left - listRect.left,
      y: rect.top - listRect.top,
      width: rect.width,
      height: rect.height,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  useLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);

  const focusByOffset = useCallback((currentValue, offset, values) => {
    if (!values.length) return;
    const idx = values.indexOf(currentValue);
    const nextIdx = ((idx === -1 ? 0 : idx) + offset + values.length) % values.length;
    const node = tabRefs.current.get(values[nextIdx]);
    node?.focus();
  }, []);

  const focusEdge = useCallback((edge, values) => {
    const value = edge === "start" ? values[0] : values[values.length - 1];
    tabRefs.current.get(value)?.focus();
  }, []);

  const ctx = {
    registerTab,
    measure,
    focusByOffset,
    focusEdge,
  };

  return (
    <FilterTabsContext.Provider value={ctx}>
      <div
        ref={(node) => {
          listRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="tablist"
        aria-label={ariaLabel}
        className={cn("relative inline-flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {indicator && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-0 rounded-none",
              "bg-[var(--color-accent)]",
              ready &&
                "[transition:transform_var(--duration-smooth)_var(--ease-sharp),width_var(--duration-smooth)_var(--ease-sharp),height_var(--duration-smooth)_var(--ease-sharp)]"
            )}
            style={{
              width: `${indicator.width}px`,
              height: `${indicator.height}px`,
              transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
            }}
          />
        )}
        {children}
      </div>
    </FilterTabsContext.Provider>
  );
});
FilterTabs.displayName = "FilterTabs";

/* ========== Tab button ========== */
export const FilterTab = forwardRef(function FilterTab(
  { className = "", children, value, active = false, onKeyDown, ...props },
  ref
) {
  const ctx = useFilterTabsContext();
  const localRef = useRef(null);

  const setRefs = useCallback(
    (node) => {
      localRef.current = node;
      ctx?.registerTab(value, node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ctx, ref, value]
  );

  const handleKeyDown = useCallback(
    (event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !ctx) return;
      const values = props["data-tab-values"];
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          ctx.focusByOffset(value, 1, values || []);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          ctx.focusByOffset(value, -1, values || []);
          break;
        case "Home":
          event.preventDefault();
          ctx.focusEdge("start", values || []);
          break;
        case "End":
          event.preventDefault();
          ctx.focusEdge("end", values || []);
          break;
        default:
          break;
      }
    },
    [ctx, onKeyDown, props, value]
  );

  const { "data-tab-values": _tabValues, ...rest } = props;

  return (
    <button
      ref={setRefs}
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      data-active={active ? "true" : "false"}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative z-[1] inline-flex select-none items-center justify-center whitespace-nowrap",
        "min-h-[44px] min-w-[44px] rounded-none px-4 py-2",
        "font-mono text-[0.7rem] font-semibold uppercase tracking-[0.08em] leading-none outline-none",
        "[transition:color_var(--duration-smooth)_var(--ease-sharp),background-color_var(--duration-smooth)_var(--ease-sharp),border-color_var(--duration-smooth)_var(--ease-sharp)]",
        "focus-visible:[box-shadow:0_0_0_2px_var(--color-void),0_0_0_4px_var(--color-accent)]",
        active
          ? "text-white"
          : cn(
              "bg-[var(--color-surface)] text-[var(--color-text-muted)]",
              "border border-[var(--color-hairline)]",
              "hover:border-[var(--color-hairline-hover)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
            ),
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
FilterTab.displayName = "FilterTab";

/* ========== Array-based compound ========== */
export const FilterTabList = forwardRef(function FilterTabList(
  { options = [], value, onChange, className = "", ariaLabel, ...props },
  ref
) {
  const values = options.map((o) => o.value);

  return (
    <FilterTabs ref={ref} className={className} ariaLabel={ariaLabel} {...props}>
      {options.map((opt) => (
        <FilterTab
          key={opt.value}
          value={opt.value}
          active={value === opt.value}
          data-tab-values={values}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </FilterTab>
      ))}
    </FilterTabs>
  );
});
FilterTabList.displayName = "FilterTabList";
