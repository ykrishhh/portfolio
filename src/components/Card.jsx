import { forwardRef } from "react";

export const Card = forwardRef(function Card(
  { className = "", children, variant = "default", ...props },
  ref
) {
  const variants = {
    default:
      "rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-200",
    hover:
      "rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.05]",
    interactive:
      "rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.05] cursor-pointer active:bg-white/[0.08]",
  };

  return (
    <div
      ref={ref}
      className={`${variants[variant]} ${className}`}
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
      className={`px-5 pt-5 pb-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef(function CardTitle(
  { className = "", children, ...props },
  ref
) {
  return (
    <h3
      ref={ref}
      className={`text-lg font-medium text-white ${className}`}
      {...props}
    >
      {children}
    </h3>
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
      className={`mt-1 text-sm text-white/50 ${className}`}
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
      className={`px-5 pb-5 ${className}`}
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
      className={`flex items-center gap-3 px-5 pb-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
CardFooter.displayName = "CardFooter";