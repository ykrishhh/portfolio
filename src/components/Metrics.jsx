import { githubProfile, topRepos, contributions, skills } from "../data/github";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const Metrics = () => {
  useGSAP(() => {
    // Stagger stat cards
    gsap.from("#metrics .grid > div > div", {
      scrollTrigger: {
        trigger: "#metrics",
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Contribution cards
    gsap.from("#metrics .grid.grid-cols-1.md\\:grid-cols-3 > a", {
      scrollTrigger: {
        trigger: "#metrics .grid.grid-cols-1.md\\:grid-cols-3",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
    });

    // Skills row
    gsap.from("#metrics .flex.flex-wrap > span", {
      scrollTrigger: {
        trigger: "#metrics .flex.flex-wrap",
        start: "top 90%",
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "back.out(1.7)",
    });
  });
  const stats = [
    {
      value: `${githubProfile.stats.repos}`,
      label: "Active Repos",
      containerClass: "bg-blue-600 text-white",
      description: "Original projects in security research and tooling",
    },
    {
      value: `${githubProfile.stats.stars}`,
      label: "GitHub Stars",
      containerClass: "bg-violet-300 text-black",
      description: "Community trust across open source contributions",
    },
    {
      value: `${githubProfile.stats.prsOpen}`,
      label: "PRs Open",
      containerClass: "bg-white text-black border border-black/5",
      description: "Active contributions to upstream repos (73K+ stars)",
    },
  ];

  return (
    <section id="metrics" className="bg-black py-32">
      <div className="container mx-auto px-3 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Stats Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col justify-between rounded-3xl p-10 h-80 ${stat.containerClass} ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div>
                  <p className="font-general text-xs uppercase opacity-70 mb-2">{stat.label}</p>
                  <h2 className="font-zentry text-6xl md:text-8xl uppercase font-black">
                    {stat.value}
                  </h2>
                </div>
                <p className="max-w-64 font-circular-web text-sm opacity-80 uppercase">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Top Repos */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl bg-neutral-900 p-10 text-white">
            <div>
              <p className="font-general text-xs uppercase text-blue-50/50 mb-10">
                Top Repositories
              </p>
              <div className="flex flex-col gap-4">
                {topRepos.slice(0, 6).map((repo, index) => (
                  <a
                    key={index}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between font-general text-sm uppercase tracking-wider opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <span className="truncate">{repo.name}</span>
                    <span className="ml-2 flex items-center gap-1 text-yellow-400 text-xs">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {repo.stars}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-white/10">
              <p className="font-circular-web text-xs uppercase opacity-50">
                {githubProfile.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Contributions Row */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {contributions.map((pr, index) => (
            <a
              key={index}
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl bg-neutral-900 p-8 text-white hover:bg-neutral-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-general text-xs uppercase text-blue-400">{pr.repo}</span>
                <span className="font-general text-xs text-yellow-400">{pr.stars} stars</span>
              </div>
              <p className="font-circular-web text-sm opacity-80 mb-3 line-clamp-2">{pr.title}</p>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                <span className="font-general text-xs uppercase opacity-50">Open</span>
                <span className="font-general text-xs opacity-30 ml-auto">{pr.pr}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Skills Row */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-xs font-general uppercase tracking-wider border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all cursor-default"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
