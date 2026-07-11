import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Afna Sherin</span>
      <span>Built with React &amp; GSAP</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
