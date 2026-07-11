// import "./Footer.css";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <span>© {new Date().getFullYear()} Afna Jasmin</span>
//       <span>Built with React &amp; GSAP</span>
//       <a href="#top">Back to top ↑</a>
//     </footer>
//   );
// }



import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./Footer.css";

gsap.registerPlugin(ScrollToPlugin);

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();

    gsap.to(window, {
      duration: 3,
      scrollTo: 0,
      ease: "power3.inOut",
    });
  };

  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Afna Jasmin</span>
      <span>Built with React & GSAP</span>

      <a href="#top" onClick={scrollToTop}>
        Back to top ↑
      </a>
    </footer>
  );
}