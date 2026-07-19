import { forwardRef, isValidElement, cloneElement, Children } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const base = cn(
  "group relative inline-flex items-center justify-center gap-2 select-none whitespace-nowrap align-middle",
  "min-h-[44px] min-w-[44px] rounded-full font-medium leading-none",
  "outline-none [transition:transform_var(--duration-fast)_var(--ease-sharp),background-color_var(--duration-smooth)_var(--ease-spring),border-color_var(--duration-smooth)_var(--ease-smooth),box-shadow_var(--duration-smooth)_var(--ease-smooth),color_var(--duration-smooth)_var(--ease-smooth)]",
  "focus-visible:[box-shadow:0_0_0_2px_var(--color-void),0_0_0_4px_var(--color-accent)]",
  "active:scale-[0.98] active:[transition:transform_var(--duration-instant)_var(--ease-sharp)]",
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
);

const variants = {
  primary: cn(
    "bg-white text-black shadow-[var(--shadow-glow-sm)]",
    "hover:bg-white/90 hover:shadow-[var(--shadow-lg),var(--shadow-glow-md)]",
  ),
  secondary: cn(
    "text-white bg-[var(--color-surface)] border border-[var(--color-hairline)]",
    "backdrop-blur-md",
    "hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-hairline-hover)] hover:shadow-[var(--shadow-md)]",
  ),
  outline: cn(
    "text-white/80 border-2 border-white/20 bg-transparent",
    "hover:text-white hover:border-white/40 hover:bg-white/[0.02]",
  ),
  ghost: cn(
    "text-[var(--color-text-muted)] bg-transparent",
    "hover:text-white hover:bg-[var(--color-surface)]",
  ),
  destructive: cn(
    "text-white bg-[var(--color-error)] shadow-[0_0_16px_rgba(239,68,68,0.18)]",
    "hover:bg-[#dc2626] hover:shadow-[var(--shadow-lg),0_0_28px_rgba(239,68,68,0.28)]",
  ),
};

const iconWrapVariants = {
  primary: "bg-black/5",
  secondary: "bg-white/5",
  outline: "bg-white/5",
  ghost: "bg-white/5",
  destructive: "bg-black/15",
};

const sizes = {
  sm: "h-11 min-h-[44px] px-4 text-xs gap-1.5",
  md: "h-11 min-h-[44px] px-6 text-sm gap-2",
  lg: "h-12 min-h-[48px] px-8 text-base gap-2.5",
  icon: "h-11 w-11 min-h-[44px] min-w-[44px] p-0",
};

const trailingPadding = {
  sm: "pr-1",
  md: "pr-1.5",
  lg: "pr-2",
  icon: "",
};

function isIconChild(child) {
  return isValidElement(child) && child.type === ButtonIcon;
}

export const ButtonIcon = forwardRef(function ButtonIcon(
  { className = "", children, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-button-icon=""
      className={cn(
        "inline-flex shrink-0 items-center justify-center w-8 h-8 rounded-full",
        "[transition:transform_var(--duration-smooth)_var(--ease-spring),background-color_var(--duration-smooth)_var(--ease-smooth)]",
        "group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ButtonIcon.displayName = "ButtonIcon";

function decorateChildren(children, variant) {
  const iconWrapClass = iconWrapVariants[variant] ?? iconWrapVariants.primary;
  return Children.map(children, (child) => {
    if (isIconChild(child)) {
      return cloneElement(child, {
        className: cn(iconWrapClass, child.props.className),
      });
    }
    return child;
  });
}

export const Button = forwardRef(function Button(
  {
    className = "",
    variant = "primary",
    size = "md",
    asChild = false,
    children,
    ...props
  },
  ref
) {
  const resolvedVariant = variants[variant] ? variant : "primary";
  const resolvedSize = sizes[size] ? size : "md";

  const hasTrailingIcon =
    resolvedSize !== "icon" &&
    Children.toArray(children).some(isIconChild);

  const composed = cn(
    base,
    variants[resolvedVariant],
    sizes[resolvedSize],
    hasTrailingIcon && trailingPadding[resolvedSize],
    className
  );

  if (asChild) {
    const child = Children.only(children);
    return cloneElement(child, {
      ref,
      className: cn("group", composed, child.props.className),
      ...props,
      children: decorateChildren(child.props.children, resolvedVariant),
    });
  }

  return (
    <button ref={ref} className={composed} {...props}>
      {decorateChildren(children, resolvedVariant)}
    </button>
  );
});
Button.displayName = "Button";

export const ButtonGroup = forwardRef(function ButtonGroup(
  { children, className = "", ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
});
ButtonGroup.displayName = "ButtonGroup";
