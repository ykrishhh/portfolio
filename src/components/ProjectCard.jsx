import { forwardRef } from "react";
import { ArrowUpRight, Star } from "@phosphor-icons/react";
import { Card, CardContent, CardFooter } from "./Card";
import { Button, ButtonIcon } from "./Button";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const iconWrapStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.25rem",
  height: "2.25rem",
  borderRadius: 0,
  background: "var(--color-surface)",
  border: "1px solid var(--color-hairline)",
  transition:
    "border-color var(--duration-smooth) var(--ease-sharp)",
};

const iconInnerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  borderRadius: 0,
  background: "var(--color-surface-elevated)",
  border: "1px solid var(--color-border-accent)",
};

function IconBezel({ icon: Icon }) {
  return (
    <span aria-hidden="true" className="project-icon-bezel" style={iconWrapStyle}>
      <span style={iconInnerStyle}>
        <Icon
          style={{ width: "1rem", height: "1rem", color: "var(--color-accent)" }}
        />
      </span>
    </span>
  );
}

const titleStyle = {
  fontFamily: "var(--font-display)",
  fontSize: "1.0625rem",
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "var(--color-text)",
};

const descStyle = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  fontSize: "0.875rem",
  lineHeight: 1.6,
  color: "var(--color-text-muted)",
};

const starStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-1)",
  marginLeft: "auto",
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "var(--color-text-faint)",
};

export const ProjectCard = forwardRef(function ProjectCard(
  { project, className = "", style, size = "sm", ...props },
  ref
) {
  const { name, desc, url, icon: Icon, tags = [], stars = 0, arch } = project;
  const isLg = size === "lg";

  const lgDescStyle = {
    ...descStyle,
    WebkitLineClamp: isLg ? 4 : 2,
  };

  const lgTitleStyle = {
    ...titleStyle,
    fontSize: isLg ? "1.25rem" : "1.0625rem",
  };

  return (
    <Card
      ref={ref}
      variant="interactive"
      className={cn("group h-full", className)}
      style={style}
      {...props}
    >
      <CardContent
        className="flex flex-col h-full"
        style={{ gap: "var(--space-3)", padding: "var(--space-5)" }}
      >
        <div className="flex items-start justify-between">
          {Icon && <IconBezel icon={Icon} />}
          <ArrowUpRight
            weight="bold"
            aria-hidden="true"
            className="transition-colors group-hover:text-[var(--color-accent)]"
            style={{
              width: "0.875rem",
              height: "0.875rem",
              color: "var(--color-text-faint)",
            }}
          />
        </div>

        <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
          <h3 style={lgTitleStyle}>{name}</h3>
          <p style={lgDescStyle}>{desc}</p>
        </div>

        <div
          className="flex flex-wrap items-center"
          style={{ gap: "var(--space-2)", marginTop: "auto", paddingTop: "var(--space-2)" }}
        >
          {tags.map((tag, i) => (
            <span key={tag} className={cn("tag", i === 0 && "tag-accent")}>
              {tag}
            </span>
          ))}
          {stars > 0 && (
            <span style={starStyle}>
              <Star
                weight="bold"
                aria-hidden="true"
                fill="currentColor"
                style={{ width: "0.75rem", height: "0.75rem" }}
              />
              {stars}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter style={{ padding: "var(--space-2) var(--space-5) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <Button
            asChild
            variant="secondary"
            size="md"
            className="w-full"
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              View on GitHub
              <ButtonIcon>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: "1rem", height: "1rem" }}
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </ButtonIcon>
            </a>
          </Button>
        {arch && (
          <a
            href={arch}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px 12px",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
              color: "var(--color-text-muted)",
              border: "1px solid var(--color-hairline)",
              borderRadius: 0,
              transition: "all var(--duration-fast) var(--ease-sharp)",
              textAlign: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--color-text)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--color-text-muted)"; e.currentTarget.style.borderColor = "var(--color-hairline)"; }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "0.875rem", height: "0.875rem" }}>
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
            View architecture diagram
          </a>
        )}
      </CardFooter>
    </Card>
  );
});
ProjectCard.displayName = "ProjectCard";

const writeupLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-2)",
  marginTop: "var(--space-2)",
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--color-text-muted)",
  transition: "color var(--duration-smooth) var(--ease-sharp)",
};

export const WriteupCard = forwardRef(function WriteupCard(
  { writeup, className = "", style, ...props },
  ref
) {
  const { title, desc, url = "https://harrydev.one", icon: Icon } = writeup;

  return (
    <Card
      ref={ref}
      variant="interactive"
      className={cn("group", className)}
      style={style}
      {...props}
    >
      <CardContent
        className="flex flex-col"
        style={{ gap: "var(--space-3)", padding: "var(--space-5)" }}
      >
        {Icon && <IconBezel icon={Icon} />}

        <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descStyle}>{desc}</p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link hover:text-[var(--color-accent)]"
          style={writeupLinkStyle}
        >
          Read on harrydev.one
          <ButtonIcon
            className="w-6 h-6 bg-[var(--color-accent-dim)] group-hover/link:translate-x-1"
          >
            <ArrowUpRight
              weight="bold"
              style={{
                width: "0.875rem",
                height: "0.875rem",
                color: "var(--color-accent)",
              }}
            />
          </ButtonIcon>
        </a>
      </CardContent>
    </Card>
  );
});
WriteupCard.displayName = "WriteupCard";
