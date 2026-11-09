import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Navbar.css";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Index", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useGSAP(() => {
    // Reveal the bar itself once the loader clears (handled by App's timing)
    gsap.fromTo(
      navRef.current,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.8, ease: "power3.out", delay: 2.6 }
    );
  }, []);

  useGSAP(
    () => {
      if (!menuRef.current) return;
      if (open) {
        gsap.set(menuRef.current, { display: "flex" });
        gsap.fromTo(
          menuRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" }
        );
        gsap.fromTo(
          ".mobile-link",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, delay: 0.15 }
        );
      } else {
        gsap.to(menuRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => gsap.set(menuRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  const handleLink = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="navbar" ref={navRef}>
        <a href="#top" className="nav-mark" onClick={(e) => handleLink(e, "#top")}>
          AJ<span className="nav-mark-dot">.</span>
        </a>

        <nav className="nav-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleLink(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? (
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a href="#contact" className="nav-cta" onClick={(e) => handleLink(e, "#contact")}>
            Start a project
          </a>
        </div>

        <button
          className={`nav-burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </header>

      <div className="mobile-menu" ref={menuRef}>
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link"
            onClick={(e) => handleLink(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" className="mobile-link is-accent" onClick={(e) => handleLink(e, "#contact")}>
          Start a project
        </a>
      </div>
    </>
  );
}
