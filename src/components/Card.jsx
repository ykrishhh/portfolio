import { forwardRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SHELL_RADIUS = "var(--radius-3xl)";
const CORE_RADIUS = "calc(var(--radius-3xl) - 0.5rem)";

const shellBase = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  borderRadius: SHELL_RADIUS,
  padding: "var(--space-2)",
  border: "1px solid var(--color-hairline)",
  transition:
    "border-color var(--duration-smooth) var(--ease-smooth), box-shadow var(--duration-smooth) var(--ease-smooth), transform var(--duration-smooth) var(--ease-spring)",
};

const coreBase = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  borderRadius: CORE_RADIUS,
  boxShadow: "var(--shadow-inner-sm)",
  transition:
    "background-color var(--duration-smooth) var(--ease-smooth), box-shadow var(--duration-smooth) var(--ease-smooth)",
};

const shellVariants = {
  default: {
    background: "var(--color-surface)",
    boxShadow: "var(--shadow-sm)",
  },
  interactive: {
    background: "var(--color-surface)",
    boxShadow: "var(--shadow-sm)",
    cursor: "pointer",
  },
  elevated: {
    background: "var(--color-surface-elevated)",
    boxShadow: "var(--shadow-lg)",
  },
  glass: {
    background: "var(--color-surface)",
    backdropFilter: "blur(20px) saturate(1.4)",
    WebkitBackdropFilter: "blur(20px) saturate(1.4)",
    boxShadow: "var(--shadow-md)",
  },
};

const coreVariants = {
  default: { background: "var(--color-surface-elevated)" },
  interactive: { background: "var(--color-surface-elevated)" },
  elevated: { background: "var(--color-void-elevated)" },
  glass: { background: "rgba(255, 255, 255, 0.02)" },
};

export const Card = forwardRef(function Card(
  {
    className = "",
    style,
    children,
    variant = "default",
    interactive: interactiveProp,
    ...props
  },
  ref
) {
  const resolved = shellVariants[variant] ? variant : "default";
  const isInteractive = interactiveProp ?? resolved === "interactive";

  const shellStyle = {
    ...shellBase,
    ...shellVariants[resolved],
    ...style,
  };

  return (
    <div
      ref={ref}
      data-variant={resolved}
      data-interactive={isInteractive ? "" : undefined}
      className={cn("card-doppelrand", `card-doppelrand--${resolved}`, className)}
      style={shellStyle}
      tabIndex={isInteractive ? props.tabIndex ?? 0 : props.tabIndex}
      {...props}
    >
      <span aria-hidden="true" className="card-doppelrand__sheen" />
      <div className="card-doppelrand__core" style={{ ...coreBase, ...coreVariants[resolved] }}>
        {children}
      </div>
    </div>
  );
});
Card.displayName = "Card";

export const CardHeader = forwardRef(function CardHeader(
  { className = "", children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col", className)}
      style={{
        gap: "var(--space-1)",
        padding: "var(--space-6) var(--space-6) var(--space-2)",
      }}
      {...props}
    >
      {children}
    </div>
  );
});
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef(function CardTitle(
  { className = "", children, as: Component = "h3", ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={className}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.125rem",
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
        color: "var(--color-text)",
      }}
      {...props}
    >
      {children}
    </Component>
  );
});
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef(function CardDescription(
  { className = "", children, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={className}
      style={{
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: "var(--color-text-muted)",
      }}
      {...props}
    >
      {children}
    </p>
  );
});
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef(function CardContent(
  { className = "", children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex-1", className)}
      style={{ padding: "var(--space-2) var(--space-6) var(--space-6)" }}
      {...props}
    >
      {children}
    </div>
  );
});
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef(function CardFooter(
  { className = "", children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      style={{
        gap: "var(--space-3)",
        padding: "var(--space-2) var(--space-6) var(--space-6)",
        borderTop: "1px solid var(--color-hairline)",
        marginTop: "auto",
      }}
      {...props}
    >
      {children}
    </div>
  );
});
CardFooter.displayName = "CardFooter";
