import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "./Card";

export function ProjectCard({ project, className = "" }) {
  const { name, desc, url, icon: Icon, tags, stars } = project;

  return (
    <Card className={`group transition-all duration-200 ${className}`}>
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
            <Icon className="h-4.5 w-4.5 text-white/70" />
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-white/70" />
        </div>
        <h3 className="mb-1.5 text-base font-medium text-white">{name}</h3>
        <p className="mb-3 text-sm leading-relaxed text-white/50">{desc}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/40"
            >
              {t}
            </span>
          ))}
          {stars > 0 && (
            <span className="ml-auto text-xs text-white/30">★ {stars}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-0 pt-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white/50 transition-colors hover:text-white hover:bg-white/[0.03]"
        >
          View on GitHub
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  );
}

export function WriteupCard({ writeup, className = "" }) {
  const { title, desc, icon: Icon } = writeup;

  return (
    <Card className={`group transition-all duration-200 ${className}`}>
      <CardContent className="p-5">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
          <Icon className="h-4.5 w-4.5 text-white/70" />
        </div>
        <h3 className="mb-1.5 text-base font-medium text-white">{title}</h3>
        <p className="mb-3 text-sm leading-relaxed text-white/50">{desc}</p>
        <span className="inline-flex items-center gap-1 text-xs text-white/40 transition-colors group-hover:text-white/70">
          Read on harrydev.one
          <ArrowUpRight className="h-2.5 w-2.5" />
        </span>
      </CardContent>
    </Card>
  );
}