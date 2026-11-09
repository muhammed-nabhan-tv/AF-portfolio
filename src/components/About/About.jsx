import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-panel",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      gsap.utils.toArray(".about-line").forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: line, start: "top 85%" },
          }
        );
      });

      gsap.utils.toArray(".stat-number").forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = Math.floor(counter.val)),
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="section about" id="about" ref={root}>
      <div className="about-grid">
        <div className="about-panel">
          <div className="about-image-wrapper">
            <img src="/images/afna.jpeg" alt="Afna Jasmin" className="about-image" />
          </div>
        </div>

        <div className="about-copy">
          <p className="eyebrow about-line">About</p>
          <h2 className="about-line">
            Turning complex datasets into insights you can act on.
          </h2>
          <p className="about-line">
            I'm Afna — a data and business analyst bridging the gap between raw
            information and strategic execution. Most projects start by querying
            messy tables, analyzing customer trends, and translating findings into
            interactive dashboards that stakeholders rely on to make key decisions.
          </p>
          <p className="about-line">
            Recent work spans predictive churn models, inventory logistics engines,
            and automated reporting systems for enterprise teams needing analytical support
            at scale.
          </p>

          <div className="about-stats about-line">
            <div className="stat">
              <span className="stat-number" data-value="10">0</span>
              <span className="stat-label">Dashboards Built</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-value="1">0</span>
              <span className="stat-label">Years in practice</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-value="5">0</span>
              <span className="stat-label">Clients &amp; partners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
