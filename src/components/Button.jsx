import { forwardRef } from "react";

const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  variants: {
    variant: {
      primary: "bg-white text-black hover:bg-white/90 shadow-[0_0_24px_rgba(78,133,191,0.25)]",
      secondary: "bg-white/[0.03] text-white/80 border border-white/10 hover:bg-white/[0.05] hover:text-white hover:border-white/20",
      outline: "border-2 border-white/20 text-white/80 hover:border-white/40 hover:text-white hover:bg-white/[0.02]",
      ghost: "text-white/70 hover:text-white hover:bg-white/[0.03]",
      destructive: "bg-red-600 text-white hover:bg-red-500",
    },
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2 text-sm",
      lg: "px-7 py-3 text-base",
      icon: "h-10 w-10 px-0",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Button = forwardRef(function Button(
  { className = "", variant = "primary", size = "md", asChild = false, children, ...props },
  ref
) {
  const Comp = asChild ? "a" : "button";
  const base = buttonVariants.base;
  const variantClass = buttonVariants.variants.variant[variant] || "";
  const sizeClass = buttonVariants.variants.size[size] || "";

  return (
    <Comp
      ref={ref}
      className={cn(base, variantClass, sizeClass, className)}
      {...props}
    >
      {children}
    </Comp>
  );
});
Button.displayName = "Button";

export function ButtonIcon({ className = "", children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded transition-all duration-150",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function ButtonGroup({ children, className = "", ...props }) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

const OldButton = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={cn(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
        containerClass
      )}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default OldButton;
