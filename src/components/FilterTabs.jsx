import { forwardRef } from "react";

export const FilterTabs = forwardRef(function FilterTabs(
  { className = "", children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={`flex flex-wrap gap-2 ${className}`}
      role="tablist"
      aria-label="Filter projects"
      {...props}
    >
      {children}
    </div>
  );
});
FilterTabs.displayName = "FilterTabs";

export const FilterTab = forwardRef(function FilterTab(
  { className = "", children, ...props },
  ref
) {
  const isActive = props["data-active"] === "true";

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      className={`
        relative inline-flex items-center gap-1.5 min-h-[44px] min-w-[44px]
        px-4 py-2 text-sm font-medium rounded-lg
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
        ${isActive
          ? "bg-accent text-black shadow-glow"
          : "bg-white/[0.03] text-white/60 border border-white/10 hover:bg-white/[0.05] hover:text-white hover:border-white/20"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});
FilterTab.displayName = "FilterTab";

/* Compound component for simple array-based usage */
export function FilterTabList({ options, value, onChange, className = "" }) {
  return (
    <FilterTabs className={className} role="tablist" aria-label="Filter projects">
      {options.map((opt) => (
        <FilterTab
          key={opt.value}
          value={opt.value}
          data-active={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </FilterTab>
      ))}
    </FilterTabs>
  );
}