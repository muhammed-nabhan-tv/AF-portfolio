import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Hero.css";

const LINE_1 = "AFNA";
const LINE_2 = "JASMIN";

/** Splits a word into one span per character for a staggered reveal. */
function splitChars(word, keyPrefix) {
  return word.split("").map((char, i) => (
    <span className="char" key={`${keyPrefix}-${i}`}>
      {char}
    </span>
  ));
}

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 2.9, defaults: { ease: "power4.out" } });

      tl.to(".hero-line .char", {
        yPercent: 0,
        stagger: 0.03,
        duration: 1,
      })
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, "-=0.6")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(".hero-scroll-cue", { opacity: 1, duration: 0.6 }, "-=0.3")
        .to(".hero-frame span", { scaleX: 1, duration: 0.9, stagger: 0.05 }, "-=1.1");

      // Ambient parallax: the ghost word behind the name drifts on scroll
      gsap.to(".hero-ghost", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section className="hero" id="top" ref={root}>
      <span className="hero-ghost" aria-hidden="true">
        AFNA JASMIN
      </span>

      <div className="hero-frame">
        <span />
        <span />
        <span />
        <span />
      </div>

      <p className="eyebrow hero-eyebrow">Data Analytics / Business Analysis</p>

      <h1 className="hero-name">
        <span className="hero-line">{splitChars(LINE_1, "l1")}</span>
        <span className="hero-line">{splitChars(LINE_2, "l2")}</span>
      </h1>

      <div className="hero-sub">
        <p>
          I translate complex datasets into clear, actionable business strategies.
          Designing interactive dashboards and building statistical models that drive growth.
        </p>
        <a href="#projects" className="btn-stamp">
          View the index →
        </a>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
