import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import skillGroups from "../../data/skills";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".skill-group").forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll(".skill-item"),
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 82%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section className="section skills" id="skills" ref={root}>
      <p className="eyebrow">What I work with</p>
      <h2 className="skills-title">Tools of the trade</h2>

      <div className="skills-columns">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.group}>
            <h3 className="skill-group-title">{group.group}</h3>
            <ul>
              {group.items.map((item) => (
                <li className="skill-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
