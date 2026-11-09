import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import projects from "../../data/projects";
import ProjectPage from "./ProjectPage";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const root = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

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

  const handleOpenProject = (project) => {
    setActiveProject(project);
  };

  return (
    <section className="section projects" id="projects" ref={root}>
      <p className="eyebrow">Selected work</p>
      <h2 className="projects-title">The index</h2>

      {/* Projects Table List */}
      <div className="project-list" role="list">
        {projects.map((project) => (
          <div
            className="project-row"
            key={project.id}
            role="button"
            tabIndex={0}
            onClick={() => handleOpenProject(project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenProject(project);
              }
            }}
            aria-label={`Open full page for ${project.title}`}
          >
            <span className="project-id">{project.id}</span>
            <span className="project-name">{project.title}</span>
            <span className="project-role">{project.role}</span>
            <span className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
            <span className="project-year">{project.year}</span>

            <span className="project-cta-pill">
              <span>View Case Study</span>
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Full Page Project View */}
      <ProjectPage
        isOpen={Boolean(activeProject)}
        project={activeProject}
        projects={projects}
        onClose={() => setActiveProject(null)}
        onSelectProject={(proj) => setActiveProject(proj)}
      />
    </section>
  );
}