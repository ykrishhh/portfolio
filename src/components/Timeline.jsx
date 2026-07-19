export function Timeline({ items, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10 md:left-1/2" />
      <div className="space-y-8">
        {items.map((item, i) => (
          <TimelineItem key={item.year} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ item, index }) {
  const { year, title, desc, icon: Icon } = item;
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-start gap-6 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <div className="absolute left-[15px] z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black md:left-1/2 md:-translate-x-1/2">
        <Icon className="h-3.5 w-3.5 text-white/50" />
      </div>
      <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
        <span className="text-xs text-white/30">{year}</span>
        <h3 className="mt-1 text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/50">{desc}</p>
      </div>
    </div>
  );
}

export function Stack({ items, className = "", title, subtitle }) {
  return (
    <section className={`border-t border-white/10 px-6 py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {title && (
          <>
            <p className="mb-2 text-xs text-white/50 sm:text-sm">{subtitle}</p>
            <h2 className="mb-6 font-display text-3xl italic tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
          </>
        )}
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-lg bg-white/5 px-3 py-1 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}