import { useState, useEffect, useCallback } from "react";
import BlindsAuroraBackground from "./components/blinds-aurora-background.jsx";
import polishedDashboard from "./assets/Brands.png";
import brandLogo from "./assets/local-logos/brand-logo.svg";
import LogoCloud from "./components/logo-cloud.jsx";
import KeyFeatures from "./components/key-features.jsx";
import HowItWorks from "./components/how-it-works.jsx";
import CustomizeUgc from "./components/customize-ugc.jsx";
import ScaleUgc from "./components/scale-ugc.jsx";
import CreatorShowcase from "./components/creator-showcase.jsx";
import ReadyToScale from "./components/ready-to-scale.jsx";
import ScrollReveal from "./components/ui/scroll-reveal.jsx";

// Avatar and Creator imports for Hero stats badge
import avatar1 from "./assets/features/avatar-1.png";
import avatar2 from "./assets/features/avatar-2.png";
import avatar3 from "./assets/features/avatar-3.png";
import creator1 from "./assets/features/ugc-creator-1.png";
import creator2 from "./assets/features/ugc-creator-2.png";


const navItems = ["Home", "About Us", "Creator Library", "Pricing"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* 导航栏滚动检测：滚动超过 32px 后添加 scrolled 状态 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 移动菜单展开时禁止背景滚动 */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <main className="paico-page">
      <BlindsAuroraBackground />

      <header
        className={`topbar${scrolled ? " topbar--scrolled" : ""}`}
        id="topbar"
      >
        <a className="brand" href="/" aria-label="Paico AI home">
          <img
            src={brandLogo}
            alt=""
            className="brand-mark brand-mark--single"
            aria-hidden="true"
          />
        </a>

        {/* 汉堡菜单按钮（移动端可见） */}
        <button
          className={`hamburger${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          id="hamburger-btn"
        >
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
        </button>

        <nav
          className={`topnav${menuOpen ? " topnav--open" : ""}`}
          aria-label="Primary"
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={index === 0 ? "is-active" : ""}
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <a className="ghost-link" href="#language">
            English
            <span className="ghost-link__chevron" aria-hidden="true">
              ▾
            </span>
          </a>
          <a className="solid-link solid-link--magenta" href="#get-started" id="nav-cta">
            Get Started
          </a>
        </div>

        {/* 移动菜单遮罩层 */}
        {menuOpen && (
          <div
            className="mobile-overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>
            <span className="anim-fade-up" style={{ animationDelay: "0.1s" }}>
              Turn UGC Into Your
            </span>
            <span className="anim-fade-up" style={{ animationDelay: "0.2s" }}>
              Best-Performing Ads
            </span>
          </h1>

          {/* Statistics Badge Row */}
          <div className="hero-stats-row anim-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="hero-stats-avatars">
              <img src={avatar1} alt="" className="hero-stats-avatar" />
              <img src={avatar2} alt="" className="hero-stats-avatar" />
              <img src={avatar3} alt="" className="hero-stats-avatar" />
              <img src={creator1} alt="" className="hero-stats-avatar" />
              <img src={creator2} alt="" className="hero-stats-avatar" />
            </div>
            <span className="hero-stats-text">10K+ Creators Onboard</span>
            <div className="hero-stats-divider" aria-hidden="true" />
            <span className="hero-stats-text">1K+ Videos Delivered</span>
          </div>

          <p className="hero-body anim-fade-up" style={{ animationDelay: "0.4s" }}>
            High-performing UGC that drives real growth.
            <br />
            Pay as you go or subscribe, with vetted creators and full usage
            rights from the start.
          </p>

          <div className="hero-cta-row anim-fade-up" style={{ animationDelay: "0.55s" }}>
            <a className="hero-cta hero-cta--dark" href="#get-started" id="hero-cta-start">
              Get Started
              <span aria-hidden="true">›</span>
            </a>
            <a className="hero-cta hero-cta--light" href="#book-demo" id="hero-cta-demo">
              Book A Demo
              <span aria-hidden="true">›</span>
            </a>
          </div>

          <div className="hero-mockup-shell anim-fade-up" style={{ animationDelay: "0.7s" }}>
            <div className="hero-mockup-shell__frame">
              {/* macOS Window Controls */}
              <div className="hero-mockup-window-controls">
                <span className="hero-mockup-control-dot hero-mockup-control-dot--red" />
                <span className="hero-mockup-control-dot hero-mockup-control-dot--yellow" />
                <span className="hero-mockup-control-dot hero-mockup-control-dot--green" />
              </div>
              <div className="hero-mockup-window-capsule" aria-hidden="true" />
              <div className="hero-mockup-image-wrapper">
                <img
                  src={polishedDashboard}
                  alt="Creatorial brands dashboard mockup"
                  className="hero-mockup-image"
                  fetchPriority="high"
                  width="1320"
                  height="820"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoCloud />
      <KeyFeatures />
      <HowItWorks />
      <CustomizeUgc />
      <ScaleUgc />
      <CreatorShowcase />
      <ReadyToScale />
      
      {/* 
        Scroll boundary buffer / Features section placeholder
        用于彻底远离首屏的 WebGL GPU 边界冲突区，采用无描边、无分割线的极简设计，与白色背景融为一体
      */}
      <ScrollReveal className="reveal-container scroll-buffer-section" as="section">
        <h2 className="scroll-buffer-title anim-fade-up" style={{ animationDelay: "0.1s" }}>More Features Coming Soon</h2>
        <p className="scroll-buffer-text anim-fade-up" style={{ animationDelay: "0.25s" }}>We are continuously expanding the creator library and campaign tools.</p>
      </ScrollReveal>
    </main>
  );
}

export default App;
