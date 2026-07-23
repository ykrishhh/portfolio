import { Button } from "./Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useGSAP(() => {
    gsap.from("#contact .contact-content", {
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="bg-black py-24 text-blue-50">
        <div className="contact-content flex flex-col items-center text-center">
          <p className="mb-10 font-mono text-[10px] uppercase text-blue-50/60">
            contact
          </p>

          <h2 className="font-display text-6xl md:text-8xl tracking-tighter leading-[1.05]">
            G<b className="text-[#00d4aa]">e</b>t in t<b className="text-[#00d4aa]">o</b>uch
          </h2>

          <p className="font-sans text-base text-blue-50/60 mt-6 max-w-md">
            Signal preferred. DMs open for research collaboration, tool feedback, and responsible disclosures.
          </p>

          <a
            href="mailto:hello@harrydev.one"
            className="mt-10 inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-5 py-2 text-sm font-medium bg-white text-black hover:bg-white/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            hello@harrydev.one
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
