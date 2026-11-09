import { useState, useEffect } from "react";
import "./ProjectPage.css";

export default function ProjectPage({ project, isOpen, onClose, onSelectProject, projects }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Keyboard navigation & scroll handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        const currentIndex = projects.findIndex((p) => p.id === project.id);
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        onSelectProject(projects[prevIndex]);
      } else if (e.key === "ArrowRight") {
        const currentIndex = projects.findIndex((p) => p.id === project.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        onSelectProject(projects[nextIndex]);
      }
    };

    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, project, onClose, onSelectProject, projects]);

  if (!isOpen || !project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const activeImage = gallery[activeImageIndex] || project.image;

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <div
      className="project-fullpage-wrapper"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
    >
      {/* Sticky Top Bar */}
      <header className="fullpage-topbar">
        <button
          className="fullpage-back-btn"
          onClick={onClose}
          aria-label="Back to projects index"
        >
          <span className="back-arrow">←</span>
          <span>Back to Projects</span>
        </button>

        <div className="fullpage-topbar-center">
          <span className="project-badge">Project {project.id} / 0{projects.length}</span>
          <span className="project-topbar-title">{project.title}</span>
        </div>

        <div className="fullpage-topbar-actions">
          <button
            className="fullpage-nav-icon-btn"
            onClick={() => onSelectProject(prevProject)}
            title={`Previous: ${prevProject.title}`}
          >
            ← Prev
          </button>
          <button
            className="fullpage-nav-icon-btn"
            onClick={() => onSelectProject(nextProject)}
            title={`Next: ${nextProject.title}`}
          >
            Next →
          </button>
          <button
            className="fullpage-close-x"
            onClick={onClose}
            aria-label="Close project view"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Full Page Scrollable Content */}
      <main className="fullpage-content">
        {/* Project Hero Banner */}
        <section className="fullpage-hero">
          <div className="hero-eyebrow-row">
            <span className="eyebrow">{project.year} // {project.role}</span>
          </div>

          <h1 className="fullpage-title">{project.title}</h1>

          <p className="fullpage-lead">{project.description || project.summary}</p>

          <div className="fullpage-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="fullpage-tag">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* High-Impact Metrics Strip */}
        {project.metrics && (
          <section className="fullpage-metrics-strip">
            {project.metrics.map((metric, idx) => (
              <div className="fullpage-metric-card" key={idx}>
                <span className="metric-card-val">{metric.value}</span>
                <span className="metric-card-lbl">{metric.label}</span>
              </div>
            ))}
          </section>
        )}

        {/* Visual Showcase (Full-width high-res dashboard preview) */}
        <section className="fullpage-visual-showcase">
          <div className="showcase-frame">
            <img
              src={activeImage}
              alt={`${project.title} dashboard display`}
              className="showcase-full-image"
            />
          </div>

          {/* Multiple views switcher if gallery has more than 1 image */}
          {gallery.length > 1 && (
            <div className="gallery-tabs">
              <span className="gallery-tabs-label">Available Views:</span>
              <div className="gallery-buttons">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    className={`gallery-tab-btn ${activeImageIndex === i ? "is-active" : ""}`}
                    onClick={() => setActiveImageIndex(i)}
                  >
                    <span>View {i + 1}: {i === 0 ? "Customer Insights" : "Sales Performance"}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="showcase-caption">
            <span className="telemetry-dot">● Interactive Dashboard Telemetry</span>
            <span className="caption-tools">{project.tags.join(" • ")}</span>
          </div>
        </section>

        {/* In-Depth Case Study Narrative */}
        <section className="fullpage-narrative">
          <div className="narrative-columns">
            {/* Left Column: Context, Challenge, Solution */}
            <div className="narrative-left">
              <article className="narrative-section">
                <span className="section-step">01 // CONTEXT</span>
                <h2>Project Overview</h2>
                <p>{project.description || project.summary}</p>
              </article>

              {project.challenge && (
                <article className="narrative-section">
                  <span className="section-step">02 // THE CHALLENGE</span>
                  <h2>Problem Statement</h2>
                  <p>{project.challenge}</p>
                </article>
              )}

              {project.solution && (
                <article className="narrative-section">
                  <span className="section-step">03 // ARCHITECTURE &amp; METHODOLOGY</span>
                  <h2>Analytical Solution</h2>
                  <p>{project.solution}</p>
                </article>
              )}
            </div>

            {/* Right Column: Key Deliverables & Tech Details */}
            <aside className="narrative-right">
              {project.highlights && (
                <div className="narrative-sidebar-card">
                  <span className="sidebar-eyebrow">Key Deliverables</span>
                  <ul className="deliverables-list">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx}>
                        <span className="check-bullet">✔</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="narrative-sidebar-card">
                <span className="sidebar-eyebrow">Technical Stack</span>
                <div className="tech-stack-cloud">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="narrative-sidebar-card contact-cta-card">
                <span className="sidebar-eyebrow">Interested in this work?</span>
                <p>Have an analytics project or need automated dashboard reporting?</p>
                <button className="btn-stamp fullpage-contact-btn" onClick={handleContactClick}>
                  Discuss this project →
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom Navigation & Next Project Banner */}
        <footer className="fullpage-bottom-nav">
          <button
            className="bottom-nav-card prev-card"
            onClick={() => onSelectProject(prevProject)}
          >
            <span className="nav-dir">← PREVIOUS PROJECT</span>
            <span className="nav-proj-title">{prevProject.title}</span>
            <span className="nav-proj-role">{prevProject.role}</span>
          </button>

          <button
            className="bottom-nav-card next-card"
            onClick={() => onSelectProject(nextProject)}
          >
            <span className="nav-dir">NEXT PROJECT →</span>
            <span className="nav-proj-title">{nextProject.title}</span>
            <span className="nav-proj-role">{nextProject.role}</span>
          </button>
        </footer>
      </main>
    </div>
  );
}
