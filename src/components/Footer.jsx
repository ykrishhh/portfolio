import { GithubLogo, XLogo, Envelope, ChatCircleText } from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const socialLinks = [
  { href: "https://github.com/harry", icon: <GithubLogo size={18} />, label: "GitHub" },
  { href: "https://twitter.com", icon: <XLogo size={18} />, label: "X" },
  { href: "mailto:hello@harrydev.one", icon: <Envelope size={18} />, label: "Email" },
  { href: "https://signal.me", icon: <ChatCircleText size={18} />, label: "Signal" },
];

const Footer = () => {
  useGSAP(() => {
    gsap.from("footer > div > *", {
      scrollTrigger: {
        trigger: "footer",
        start: "top 95%",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    });
  });

  return (
    <footer className="w-full bg-void border-t border-[rgba(234,234,234,0.08)] py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <p className="text-sm text-[#eaeaea] md:text-left">
          Foldcraft 2026. All rights reserved.
        </p>

        <div className="flex justify-center gap-5 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8a8a9e] transition-colors duration-300 hover:text-[#eaeaea]"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#colophon"
          className="text-sm text-[#8a8a9e] hover:text-[#eaeaea] transition-colors duration-300"
        >
          Colophon
        </a>
      </div>
    </footer>
  );
};

export default Footer;