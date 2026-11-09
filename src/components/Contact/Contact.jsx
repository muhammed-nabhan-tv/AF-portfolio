import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "afnajasminachuthodi@gmail.com";

export default function Contact() {
  const root = useRef(null);
  const btnRef = useRef(null);

  useGSAP(
    () => {
      // Hide the characters via JS right before animating them.
      // If this script never runs for any reason, the text stays visible
      // instead of being stuck hidden by a CSS default.
      // gsap.set(".contact-line .char", { yPercent: 105 });

      // gsap.to(".contact-line .char", {
      //   yPercent: 0,
      //   stagger: 0.02,
      //   duration: 0.9,
      //   ease: "power4.out",
      //   scrollTrigger: {
      //     trigger: root.current,
      //     start: "top 85%",
      //     once: true,
      //   },
      // });

      gsap.fromTo(
        ".contact-meta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        ".contact-btn",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        }
      );

      // Magnetic pull toward the cursor, plus a small punch on click before navigating to mail.
      const btn = btnRef.current;
      if (!btn) return;

      const magnetX = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
      const magnetY = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        magnetX(relX * 0.3);
        magnetY(relY * 0.4);
      };

      const handleLeave = () => {
        magnetX(0);
        magnetY(0);
      };

      const handleClick = (e) => {
        e.preventDefault();
        gsap
          .timeline()
          .to(btn, { scale: 0.94, duration: 0.12, ease: "power2.out" })
          .to(btn, {
            scale: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.4)",
            onComplete: () => {
              window.location.href = `mailto:${EMAIL}`;
            },
          });
      };

      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);
      btn.addEventListener("click", handleClick);

      return () => {
        btn.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", handleLeave);
        btn.removeEventListener("click", handleClick);
      };
    },
    { scope: root }
  );

  return (
    <section className="section contact" id="contact" ref={root}>
      <p className="eyebrow">Get in touch</p>

      <h2 className="contact-headline">
        <span className="contact-line">
          {"Let's make".split("").map((c, i) => (
            <span className="char" key={i}>{c === " " ? "\u00A0" : c}</span>
          ))}
        </span>
        <span className="contact-line">
          {"data talk".split("").map((c, i) => (
            <span className="char" key={i}>{c === " " ? "\u00A0" : c}</span>
          ))}
        </span>
        <span className="contact-line is-accent">
          {"together.".split("").map((c, i) => (
            <span className="char" key={i}>{c === " " ? "\u00A0" : c}</span>
          ))}
        </span>
      </h2>

      <button
        type="button"
        className="contact-btn"
        ref={btnRef}
        aria-label={`Email me at ${EMAIL}`}
      >
        <span className="contact-btn-dot" />
        Get in touch
        <span className="contact-btn-arrow">↗</span>
      </button>

      <div className="contact-meta">
        <a href={`mailto:${EMAIL}`} className="contact-email">
          {EMAIL}
        </a>
        <div className="contact-links">
          <a href="https://www.linkedin.com/in/afna-jasmin-a-t/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/AfnaJasmin" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}