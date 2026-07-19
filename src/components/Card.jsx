import { forwardRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const shellBase = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  border: "1px solid var(--color-hairline)",
  background: "var(--color-surface)",
  transition:
    "border-color var(--duration-smooth) var(--ease-sharp), background-color var(--duration-smooth) var(--ease-sharp)",
};

const shellVariants = {
  default: {},
  interactive: {},
  elevated: { background: "var(--color-surface-elevated)" },
  glass: { background: "var(--color-surface)" },
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
      className={cn("card-brutal", `card-brutal--${resolved}`, className)}
      style={shellStyle}
      tabIndex={props.tabIndex}
      {...props}
    >
      {children}
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
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
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
        fontFamily: "var(--font-mono)",
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
