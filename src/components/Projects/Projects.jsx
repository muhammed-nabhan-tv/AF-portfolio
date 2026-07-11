import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import projects from "../../data/projects";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".project-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section className="section projects" id="projects" ref={root}>
      <p className="eyebrow">Selected work</p>
      <h2 className="projects-title">The index</h2>

      <div className="project-list">
        {projects.map((project) => (
          <a className="project-row" href="#contact" key={project.id}>
            <span className="project-id">{project.id}</span>
            <span className="project-name">{project.title}</span>
            <span className="project-role">{project.role}</span>
            <span className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
            <span className="project-year">{project.year}</span>
            <span className="project-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
