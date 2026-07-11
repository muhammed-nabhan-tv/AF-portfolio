// import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import useIsMobile from "../../hooks/useIsMobile";
// import "./Marquee.css";

// gsap.registerPlugin(ScrollTrigger);

// const WORDS = ["DATA", "ANALYTICS", "SQL", "PYTHON", "INSIGHTS", "STRATEGY", "DASHBOARDS", "BI"];

// /**
//  * Signature moment of the page: on desktop the section pins while a long
//  * strip of words is dragged across the screen by vertical scroll — the
//  * page's own scrollbar becomes the ticker's engine, like feeding a strip
//  * of type through a press. On mobile (no pin, easy to fight momentum
//  * scroll) it becomes a lightweight self-running marquee instead.
//  */
// export default function Marquee() {
//   const root = useRef(null);
//   const trackRef = useRef(null);
//   const isMobile = useIsMobile();

//   useGSAP(
//     () => {
//       if (!trackRef.current) return;

//       if (isMobile) {
//         const track = trackRef.current;
//         const width = track.scrollWidth / 2;
//         gsap.to(track, {
//           x: -width,
//           duration: 18,
//           ease: "none",
//           repeat: -1,
//         });
//         return;
//       }

//       const track = trackRef.current;
//       const distance = track.scrollWidth - window.innerWidth;

//       gsap.to(track, {
//         x: -distance,
//         ease: "none",
//         scrollTrigger: {
//           trigger: root.current,
//           start: "top top",
//           end: () => `+=${distance + window.innerHeight}`,
//           scrub: 0.6,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });
//     },
//     { scope: root, dependencies: [isMobile] }
//   );

//   const words = [...WORDS, ...WORDS];

//   return (
//     <section className="marquee" ref={root}>
//       <div className="marquee-track" ref={trackRef}>
//         {words.map((word, i) => (
//           <span className="marquee-word" key={`${word}-${i}`}>
//             {word}
//             <span className="marquee-dot">·</span>
//           </span>
//         ))}
//       </div>
//     </section>
//   );
// }



import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Marquee.css";

gsap.registerPlugin(ScrollTrigger);

const ROW_1 = ["DATA", "ANALYTICS", "SQL", "PYTHON", "INSIGHTS", "STRATEGY"];
const ROW_2 = ["DASHBOARDS", "FORECASTING", "REPORTING", "MODELS", "METRICS", "AUTOMATION"];

/**
 * Signature moment of the page: two rows of type run continuously in
 * opposite directions (never static), and scroll velocity pushes their
 * speed and skew — scroll fast and the strip whooshes, stop scrolling
 * and it settles back to its resting pace. Hovering slows it to a near
 * stop so the words are easy to read. No pinning, so it's smooth on
 * touch devices too.
 */
export default function Marquee() {
  const root = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useGSAP(
    () => {
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (!row1 || !row2) return;

      const width1 = row1.scrollWidth / 2;
      const width2 = row2.scrollWidth / 2;

      // Two seamless infinite loops moving in opposite directions.
      const loop1 = gsap.to(row1, {
        x: -width1,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      const loop2 = gsap.fromTo(
        row2,
        { x: -width2 },
        { x: 0, duration: 20, ease: "none", repeat: -1 }
      );

      // Scroll velocity drives speed + a skew "whoosh" on both rows.
      const skewTo1 = gsap.quickTo(row1, "skewX", { duration: 0.5, ease: "power3.out" });
      const skewTo2 = gsap.quickTo(row2, "skewX", { duration: 0.5, ease: "power3.out" });
      let resetTimeout;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity() / -1000;
          const scale = gsap.utils.clamp(-3.5, 3.5, v === 0 ? 1 : v * 2.2);

          loop1.timeScale(scale === 0 ? 1 : scale);
          loop2.timeScale(scale === 0 ? 1 : -scale);

          const skew = gsap.utils.clamp(-14, 14, v * 7);
          skewTo1(skew);
          skewTo2(-skew);

          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(() => {
            loop1.timeScale(1);
            loop2.timeScale(1);
            skewTo1(0);
            skewTo2(0);
          }, 180);
        },
      });

      // Entrance: rows slide/fade in as the section reaches the viewport.
      gsap.fromTo(
        [row1, row2],
        { opacity: 0, yPercent: (i) => (i === 0 ? 20 : -20) },
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        }
      );

      // Hover: ease both rows down to a near-stop so the words are readable.
      const handleEnter = () => {
        gsap.to(loop1, { timeScale: 0.1, duration: 0.5, overwrite: "auto" });
        gsap.to(loop2, { timeScale: 0.1, duration: 0.5, overwrite: "auto" });
      };
      const handleLeave = () => {
        gsap.to(loop1, { timeScale: 1, duration: 0.6, overwrite: "auto" });
        gsap.to(loop2, { timeScale: 1, duration: 0.6, overwrite: "auto" });
      };
      root.current.addEventListener("mouseenter", handleEnter);
      root.current.addEventListener("mouseleave", handleLeave);

      return () => {
        clearTimeout(resetTimeout);
        st.kill();
        root.current?.removeEventListener("mouseenter", handleEnter);
        root.current?.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: root }
  );

  const row1Words = [...ROW_1, ...ROW_1];
  const row2Words = [...ROW_2, ...ROW_2];

  return (
    <section className="marquee" ref={root}>
      <div className="marquee-row row-1" ref={row1Ref}>
        {row1Words.map((word, i) => (
          <span className="marquee-word" key={`r1-${word}-${i}`}>
            {word}
            <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>

      <div className="marquee-row row-2" ref={row2Ref}>
        {row2Words.map((word, i) => (
          <span className="marquee-word is-outline" key={`r2-${word}-${i}`}>
            {word}
            <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}