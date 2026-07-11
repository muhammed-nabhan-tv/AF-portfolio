import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Loader.css";

/**
 * Full-screen preloader. Counts 00 -> 100 while a bar of ink fills,
 * then wipes up and out of view. Calls onComplete when the exit
 * animation finishes so App can reveal the page content in sync.
 */
export default function Loader({ onComplete }) {
  const root = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const counter = useRef({ val: 0 });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => onComplete?.(),
      });

      tl.to(counter.current, {
        val: 100,
        duration: 2.1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(
              Math.floor(counter.current.val)
            ).padStart(3, "0");
          }
        },
      })
        .to(barRef.current, { scaleX: 1, duration: 2.1, ease: "power1.inOut" }, 0)
        .to(".loader-label", { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        // hold briefly on 100, then wipe the whole loader upward
        .to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          delay: 0.15,
        });
    },
    { scope: root }
  );

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-top">
        <span className="loader-label">AFNA JASMIN</span>
        <span className="loader-label">INDEX / 2026</span>
      </div>

      <div className="loader-count">
        <span ref={countRef}>000</span>
        <span className="loader-count-suffix">%</span>
      </div>

      <div className="loader-bar-track">
        <div className="loader-bar-fill" ref={barRef} />
      </div>
    </div>
  );
}
